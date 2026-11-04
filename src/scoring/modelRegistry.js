import { createHash, randomUUID } from "node:crypto";
import mongoose from "mongoose";
import {
  DriftMetric,
  ListingScore,
  ModelVersion,
  TrainingRun,
} from "../models/scoringState.js";

function finite(value, fallback = 0) {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function datasetFingerprint(listings) {
  return createHash("sha256")
    .update(listings.map((item) => item.token).sort().join("\n"))
    .digest("hex");
}

export function calculateDrift(baseline, current) {
  if (!baseline) return {
    severity: "none",
    metrics: { baselineAvailable: false },
  };
  const beforeValidation = baseline.metrics?.modelValidation || {};
  const afterValidation = current.metrics?.modelValidation || {};
  const beforeScores = baseline.metrics?.scoring?.scoreDistribution || {};
  const afterScores = current.metrics?.scoring?.scoreDistribution || {};
  const metrics = {
    baselineAvailable: true,
    medianScoreDelta: finite(afterScores.median) - finite(beforeScores.median),
    p90ScoreDelta: finite(afterScores.p90) - finite(beforeScores.p90),
    medianAbsolutePercentageErrorDelta:
      finite(afterValidation.medianAbsolutePercentageError)
      - finite(beforeValidation.medianAbsolutePercentageError),
    qualityScoreDelta: finite(afterValidation.qualityScore) - finite(beforeValidation.qualityScore),
    sampleCountDelta: finite(afterValidation.sampleCount) - finite(beforeValidation.sampleCount),
  };
  const critical = Math.abs(metrics.medianScoreDelta) >= 15
    || metrics.medianAbsolutePercentageErrorDelta >= 10
    || metrics.qualityScoreDelta <= -15;
  const warning = Math.abs(metrics.medianScoreDelta) >= 8
    || metrics.medianAbsolutePercentageErrorDelta >= 5
    || metrics.qualityScoreDelta <= -8;
  return { severity: critical ? "critical" : warning ? "warning" : "none", metrics };
}

function scoreDocument(row, { runId, modelId, scoringVersion, generatedAt }) {
  const snapshot = structuredClone(row);
  if (Array.isArray(snapshot.evidence?.comparables)) {
    snapshot.evidence.comparables = snapshot.evidence.comparables.slice(0, 8);
  }
  return {
    token: row.token,
    runId,
    modelId,
    scoringVersion,
    generatedAt,
    rank: row.rank,
    recommendation: finite(row.scores?.recommendation),
    dealValue: finite(row.scores?.dealValue),
    confidence: finite(row.scores?.confidence),
    propertyQuality: finite(row.scores?.propertyQuality),
    risk: finite(row.scores?.risk),
    band: row.scores?.band || null,
    snapshot,
  };
}

async function inTransaction(connection, operation) {
  if (typeof connection?.transaction === "function") return connection.transaction(operation);
  return operation(null);
}

export async function persistScoringGeneration({ report, modelDocument, scoredDocument }, {
  connection = mongoose.connection,
  modelVersionModel = ModelVersion,
  trainingRunModel = TrainingRun,
  listingScoreModel = ListingScore,
  driftMetricModel = DriftMetric,
  chunkSize = 500,
  runId = randomUUID(),
  modelId = randomUUID(),
} = {}) {
  const generatedAt = scoredDocument.generatedAt;
  const rows = scoredDocument.listings || [];
  const baseline = await modelVersionModel.findOne({ kind: "batch-price", status: "active" }).lean();
  const model = {
    modelId,
    kind: "batch-price",
    version: modelDocument.model?.modelVersion || scoredDocument.scoringVersion,
    status: "candidate",
    generatedAt: modelDocument.generatedAt,
    promotedAt: null,
    archivedAt: null,
    parentModelId: baseline?.modelId || null,
    trainingRunId: runId,
    dataset: {
      count: rows.length,
      fingerprint: datasetFingerprint(rows),
      sourceUpdatedAt: scoredDocument.generatedAt,
    },
    metrics: {
      modelValidation: report.modelValidation,
      scoring: report.scoring,
    },
    artifact: modelDocument,
  };
  const training = {
    runId,
    pipelineVersion: report.pipelineVersion,
    scoringVersion: scoredDocument.scoringVersion,
    status: "running",
    startedAt: report.startedAt,
    endedAt: null,
    durationMs: null,
    sourceListingCount: report.cleaning.inputCount,
    acceptedCount: report.cleaning.acceptedCount,
    rejectedCount: report.cleaning.rejectedCount,
    modelId,
    metrics: { cleaning: report.cleaning, modelValidation: report.modelValidation, scoring: report.scoring },
    error: null,
  };
  await modelVersionModel.create(model);
  await trainingRunModel.create(training);
  try {
    for (let offset = 0; offset < rows.length; offset += chunkSize) {
      const batch = rows.slice(offset, offset + chunkSize).map((row) => ({
        insertOne: { document: scoreDocument(row, { runId, modelId, scoringVersion: scoredDocument.scoringVersion, generatedAt }) },
      }));
      if (batch.length) await listingScoreModel.bulkWrite(batch, { ordered: false });
    }
    const drift = calculateDrift(baseline, model);
    const driftDocument = {
      driftId: randomUUID(),
      modelId,
      baselineModelId: baseline?.modelId || null,
      evaluatedAt: new Date(),
      severity: drift.severity,
      metrics: drift.metrics,
    };
    await inTransaction(connection, async (session) => {
      const options = session ? { session } : {};
      if (baseline) await modelVersionModel.updateOne(
        { modelId: baseline.modelId, status: "active" },
        { $set: { status: "archived", archivedAt: new Date() } },
        options,
      );
      await modelVersionModel.updateOne(
        { modelId, status: "candidate" },
        { $set: { status: "active", promotedAt: new Date(), archivedAt: null } },
        options,
      );
      await trainingRunModel.updateOne(
        { runId },
        { $set: { status: "completed", endedAt: report.endedAt, durationMs: report.durationMs } },
        options,
      );
      await driftMetricModel.create([driftDocument], options);
    });
    if (baseline) {
      await listingScoreModel.updateMany(
        { modelId: baseline.modelId },
        { $unset: {
          "snapshot.property": 1,
          "snapshot.amenities": 1,
          "snapshot.location": 1,
          "snapshot.source": 1,
          "snapshot.cleaning": 1,
          "snapshot.evidence": 1,
          "snapshot.formula": 1,
          "snapshot.warnings": 1,
          "snapshot.explanations": 1,
        } },
      ).catch(() => {});
    }
    return { runId, modelId, drift: driftDocument, scoreCount: rows.length };
  } catch (error) {
    await Promise.allSettled([
      modelVersionModel.updateOne({ modelId }, { $set: { status: "failed" } }),
      trainingRunModel.updateOne({ runId }, { $set: { status: "failed", endedAt: new Date(), error: error.message } }),
    ]);
    throw error;
  }
}

export async function promoteModel(modelId, {
  connection = mongoose.connection,
  modelVersionModel = ModelVersion,
} = {}) {
  const target = await modelVersionModel.findOne({ modelId }).lean();
  if (!target) throw new Error("model-version-not-found");
  if (target.status === "failed") throw new Error("failed-model-cannot-be-promoted");
  await inTransaction(connection, async (session) => {
    const options = session ? { session } : {};
    await modelVersionModel.updateMany(
      { kind: target.kind, status: "active", modelId: { $ne: modelId } },
      { $set: { status: "archived", archivedAt: new Date() } },
      options,
    );
    await modelVersionModel.updateOne(
      { modelId },
      { $set: { status: "active", promotedAt: new Date(), archivedAt: null } },
      options,
    );
  });
  return modelVersionModel.findOne({ modelId }).lean();
}

export async function rollbackModel(kind, options = {}) {
  const modelVersionModel = options.modelVersionModel || ModelVersion;
  const active = await modelVersionModel.findOne({ kind, status: "active" }).lean();
  const previous = await modelVersionModel.findOne({
    kind,
    status: "archived",
    ...(active ? { modelId: { $ne: active.modelId } } : {}),
  }).sort({ archivedAt: -1, generatedAt: -1 }).lean();
  if (!previous) throw new Error("rollback-model-not-found");
  return promoteModel(previous.modelId, { ...options, modelVersionModel });
}
