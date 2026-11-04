export function getListingHighlights(listing) {
  const property = listing?.property || {};
  const amenities = listing?.amenities || {};
  const highlights = [];
  const missing = [];

  if (amenities.parking === false) highlights.push("پارکینگ ندارد");
  if (amenities.elevator === false && Number.isFinite(property.floor) && property.floor > 0) {
    highlights.push("طبقه بالای همکف بدون آسانسور");
  } else if (amenities.elevator === false) {
    highlights.push("آسانسور ندارد");
  }
  if (!Number.isFinite(property.area) || property.area <= 0) missing.push("متراژ");
  if (!Number.isFinite(property.constructionYear)) missing.push("سال ساخت");
  if (!Number.isFinite(property.floor)) missing.push("طبقه");
  if (!listing?.propertyDetails?.deedType?.trim()) missing.push("نوع سند");
  if (typeof amenities.parking !== "boolean") missing.push("وضعیت پارکینگ");
  if (typeof amenities.elevator !== "boolean") missing.push("وضعیت آسانسور");
  return { highlights, missing };
}

// Use the stored analysis snapshot, never mix its baseline with a newer listing price.
export function getComparablePrice(scoreDetail) {
  const scored = scoreDetail?.listing;
  const sampleCount = scored?.evidence?.comparableCount;
  const reference = scored?.valuation?.nearbyPricePerMeter;
  const asking = scored?.asking?.askingPricePerMeter;
  if (!Number.isInteger(sampleCount) || sampleCount < 5 ||
      !Number.isFinite(reference) || reference <= 0 ||
      !Number.isFinite(asking) || asking <= 0) return null;
  const difference = asking - reference;
  return { sampleCount, reference, asking, difference, percent: difference / reference * 100 };
}
