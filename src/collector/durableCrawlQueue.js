import { randomUUID } from "node:crypto";
import { AreaCrawlJob, CrawlCycle } from "../models/crawlJob.js";

const SCOPE = "tehran-buy-apartment";
const LEASE_MS = 120_000;
const plain = (value) => value ? JSON.parse(JSON.stringify(value)) : null;
const leaseError = () => Object.assign(new Error("Crawler lease was lost"), { code: "crawl-lease-lost" });

export function queuePartition(partition) {
  const { id, name, slug, municipalDistricts = [], secondSlugs = [] } = partition.area;
  return {
    area: { id, name, slug, municipalDistricts, secondSlugs },
    limit: Math.min(100, Math.max(1, Math.floor(partition.limit))),
  };
}

export function publicAreaJob(job) {
  if (!job) return null;
  const candidates = job.candidates || [];
  return {
    jobId: job.jobId, cycleId: job.cycleId, area: job.area,
    status: job.status === "completed" && candidates.some((item) => item.outcome === "failed") ? "failed"
      : job.status === "running" ? job.stage === "discovery" ? "discovering" : "processing" : job.status,
    stage: job.stage, requestedAt: job.requestedAt, startedAt: job.startedAt, endedAt: job.endedAt,
    discovered: candidates.length,
    processed: candidates.filter((item) => item.outcome !== "pending").length,
    successful: candidates.filter((item) => !["pending", "failed"].includes(item.outcome)).length,
    failed: candidates.filter((item) => item.outcome === "failed").length,
    newListings: candidates.filter((item) => item.outcome === "new-listing").length,
    refreshedListings: candidates.filter((item) => item.outcome === "refreshed").length,
    unchangedListings: candidates.filter((item) => item.outcome === "unchanged").length,
    confirmedListings: candidates.filter((item) => item.outcome === "confirmed").length,
    error: job.errorCode,
  };
}

// One cycle lease protects the shared browser/request budget. Each area has a
// fenced lease too, so an expired worker cannot overwrite a recovered checkpoint.
export class DurableCrawlQueue {
  constructor({ jobModel = AreaCrawlJob, cycleModel = CrawlCycle, now = () => new Date() } = {}) {
    this.jobs = jobModel;
    this.cycles = cycleModel;
    this.now = now;
  }

  async init() {
    await Promise.all([this.jobs.init(), this.cycles.init()]);
    const indexes = await this.cycles.collection.indexes();
    if (!indexes.some((index) => index.unique && index.key.scope === 1
      && index.partialFilterExpression?.status === "active")) {
      throw new Error("Durable crawl indexes are missing. Run npm run migrate:crawl-jobs -- --apply before starting the crawler.");
    }
  }

  async active() { return plain(await this.cycles.findOne({ scope: SCOPE, status: "active" }).select({ cycleId: 1, cooldownUntil: 1 }).lean()); }

  async open({ partitions, mode = "full", nextAreaOffset = 0, owner }) {
    let cycle = await this.cycles.findOne({ scope: SCOPE, status: "active" }).lean();
    if (!cycle) {
      try {
        cycle = plain(await this.cycles.create({
          cycleId: randomUUID(), scope: SCOPE, mode, status: "active",
          partitions: partitions.map(queuePartition), nextAreaOffset,
        }));
      } catch (error) {
        if (error.code !== 11000) throw error;
        cycle = await this.cycles.findOne({ scope: SCOPE, status: "active" }).lean();
      }
    }
    const now = this.now();
    const acquired = await this.cycles.findOneAndUpdate({
      cycleId: cycle.cycleId, status: "active",
      $and: [
        { $or: [{ owner }, { owner: null }, { leaseUntil: { $lte: now } }] },
        { $or: [{ cooldownUntil: null }, { cooldownUntil: { $lte: now } }] },
      ],
    }, { $set: { owner, leaseUntil: new Date(now.getTime() + LEASE_MS) } }, { returnDocument: "after" }).lean();
    if (!acquired) throw Object.assign(new Error("Crawl cycle is leased or in platform cooldown"), { code: "crawl-cycle-unavailable" });
    // Manifest is durable before jobs are seeded; a crash between the two is
    // repaired idempotently on the next open.
    await this.jobs.bulkWrite(acquired.partitions.map((partition) => ({ updateOne: {
      filter: { cycleId: acquired.cycleId, "area.id": partition.area.id },
      update: { $setOnInsert: {
        jobId: randomUUID(), cycleId: acquired.cycleId, ...queuePartition(partition),
        stage: "discovery", stagePriority: 300, priority: 0, status: "queued",
        requestedAt: now, availableAt: now, attempts: 0, cursor: 0,
        candidates: [], discoveryComplete: false,
      } }, upsert: true,
    } })), { ordered: false });
    return plain(acquired);
  }

  async renew(cycleId, owner) {
    const now = this.now();
    const leaseUntil = new Date(now.getTime() + LEASE_MS);
    const result = await this.cycles.updateOne({ cycleId, owner, status: "active", leaseUntil: { $gt: now } }, { $set: { leaseUntil } });
    if (!result.matchedCount) throw leaseError();
    await this.jobs.updateMany({ cycleId, leaseOwner: owner, status: "running" }, { $set: { leaseUntil } });
  }

  async claim(cycleId, owner) {
    await this.renew(cycleId, owner);
    const now = this.now();
    return plain(await this.jobs.findOneAndUpdate({
      cycleId,
      $or: [
        { status: "queued", availableAt: { $lte: now } },
        { status: "running", leaseUntil: { $lte: now } },
      ],
    }, {
      $set: { status: "running", leaseOwner: owner, leaseUntil: new Date(now.getTime() + LEASE_MS), startedAt: now },
      $inc: { attempts: 1 },
    }, { sort: { stagePriority: -1, priority: -1, requestedAt: 1, jobId: 1 }, returnDocument: "after" }).lean());
  }

  async checkpoint(job, owner, fields) {
    const result = await this.jobs.updateOne({
      jobId: job.jobId, status: "running", leaseOwner: owner, leaseUntil: { $gt: this.now() },
    }, { $set: fields }, { runValidators: true });
    if (!result.matchedCount) throw leaseError();
  }

  async retry(job, owner, errorCode, { terminal = false, delayMs = 1_000 } = {}) {
    await this.checkpoint(job, owner, {
      status: terminal ? "failed" : "queued", errorCode,
      availableAt: new Date(this.now().getTime() + delayMs),
      endedAt: terminal ? this.now() : null, leaseOwner: null, leaseUntil: null,
    });
  }

  async release(cycleId, owner, cooldownUntil = null) {
    await this.jobs.updateMany({ cycleId, status: "running", leaseOwner: owner }, {
      $set: { status: "queued", leaseOwner: null, leaseUntil: null },
      $inc: { attempts: -1 },
    });
    await this.cycles.updateOne({ cycleId, owner, status: "active" }, {
      $set: { owner: null, leaseUntil: null, cooldownUntil },
    });
  }

  async complete(cycleId, owner) {
    if (await this.jobs.countDocuments({ cycleId, status: { $in: ["queued", "running"] } })) throw new Error("crawl-cycle-has-pending-jobs");
    const persist = async (session = null) => {
      const options = session ? { session } : {};
      const now = this.now();
      const result = await this.cycles.updateOne({ cycleId, owner, leaseUntil: { $gt: now } }, {
        $set: { status: "completed", completedAt: now, owner: null, leaseUntil: null,
          expiresAt: new Date(now.getTime() + 35 * 86_400_000) },
      }, options);
      if (!result.matchedCount) throw leaseError();
      await this.jobs.updateMany({ cycleId }, { $set: { expiresAt: new Date(now.getTime() + 30 * 86_400_000) } }, options);
    };
    if (this.cycles.db?.transaction) await this.cycles.db.transaction(persist);
    else await persist();
  }

  async cycleJobs(cycleId) {
    return plain(await this.jobs.find({ cycleId }).sort({ requestedAt: 1, jobId: 1 }).limit(168).lean());
  }

  async get(jobId) { return publicAreaJob(plain(await this.jobs.findOne({ jobId }).lean())); }

  async prioritize(areaId) {
    const cycle = await this.cycles.findOne({ scope: SCOPE, status: "active" }).select({ cycleId: 1 }).lean();
    if (!cycle) return null;
    const job = await this.jobs.findOneAndUpdate({
      cycleId: cycle.cycleId, "area.id": Number(areaId), status: { $in: ["queued", "running"] },
    }, { $set: { priority: 100, availableAt: this.now() } }, { returnDocument: "after" }).lean();
    return publicAreaJob(plain(job));
  }

  async latest(areaId) {
    return publicAreaJob(plain(await this.jobs.findOne({ "area.id": Number(areaId) }).sort({ requestedAt: -1 }).lean()));
  }

  async coverage() {
    return this.jobs.aggregate([
      { $project: { area: 1, status: 1, discoveryComplete: 1, stopReason: 1, requestedAt: 1, startedAt: 1, endedAt: 1 } },
      { $sort: { requestedAt: -1, _id: -1 } },
      { $group: { _id: "$area.id", area: { $first: "$area" }, status: { $first: "$status" },
        discoveryComplete: { $first: "$discoveryComplete" }, stopReason: { $first: "$stopReason" },
        lastAttemptAt: { $first: "$startedAt" },
        lastCompletedAt: { $max: { $cond: [{ $eq: ["$status", "completed"] }, "$endedAt", null] } } } },
      { $sort: { _id: 1 } },
    ]).option({ maxTimeMS: 5_000 });
  }
}
