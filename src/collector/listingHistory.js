import { createHash } from "node:crypto";

export function possiblePropertyLink(subject, candidate) {
  if (!subject?.token || subject.token === candidate?.token || subject.subcategory !== candidate?.subcategory) return null;
  const images = new Set((subject.images || []).map((image) => image.url).filter(Boolean));
  const sharedImageCount = new Set((candidate.images || []).map((image) => image.url).filter((url) => images.has(url))).size;
  const same = (key) => Number.isFinite(subject.property?.[key]) && subject.property[key] === candidate.property?.[key];
  const sameArea = same("area");
  const sameRooms = same("rooms");
  const sameBuildingYear = same("constructionYear");
  if (sharedImageCount < 2 || !sameArea || !sameRooms || !sameBuildingYear) return null;
  const tokens = [subject.token, candidate.token].sort();
  return {
    linkId: createHash("sha256").update(tokens.join(":" )).digest("hex"), tokens,
    relation: ["removed", "possibly-removed"].includes(candidate.lifecycle?.status) ? "repost" : "same-property",
    status: "candidate",
    evidence: { sharedImageCount: Math.min(20, sharedImageCount), sameArea, sameRooms, sameBuildingYear },
    verificationRef: null,
  };
}

export function listingActivities(existing, listing, runId, { confirmationOnly = false, observedAt = listing.lastSeenAt } = {}) {
  const changed = !existing || existing.contentFingerprint !== listing.contentFingerprint;
  const price = Number.isFinite(listing.pricing?.price) ? listing.pricing.price : null;
  const previousPrice = Number.isFinite(existing?.pricing?.price) ? existing.pricing.price : null;
  const types = [confirmationOnly ? "seen" : !existing ? "new-listing" : changed ? "refreshed" : "unchanged"];
  if (existing && ["removed", "possibly-removed"].includes(existing.lifecycle?.status)) types.push("reappeared");
  if (!confirmationOnly && existing && previousPrice !== price) types.push("price-changed");
  return types.map((type) => ({
    eventId: createHash("sha256").update(JSON.stringify([
      runId, listing.token, type, listing.contentFingerprint,
      type === "price-changed" ? previousPrice : null,
    ])).digest("hex"),
    token: listing.token, runId, observedAt, type,
    contentFingerprint: listing.contentFingerprint,
    price, previousPrice: type === "price-changed" ? previousPrice : null,
    propertyIdentity: "unresolved",
  }));
}

export function lifecycleActivities(existing, listing, runId, observedAt) {
  const type = listing.lifecycle?.status;
  if (existing.lifecycle?.status === type || !["not-seen", "possibly-removed", "removed"].includes(type)) return [];
  const event = listingActivities(existing, listing, runId, { observedAt })[0];
  return [{ ...event, type, basis: "coverage-inference",
    eventId: createHash("sha256").update(JSON.stringify([runId, listing.token, type])).digest("hex") }];
}
