import test from "node:test";
import assert from "node:assert/strict";
import { getComparablePrice, getListingHighlights } from "../dashboard/src/decisionSummary.js";

test("summary distinguishes absent and unknown amenities and accepts ground floor", () => {
  const result = getListingHighlights({
    property: { area: 80, constructionYear: 1400, floor: 0 },
    propertyDetails: { deedType: "سند رسمی" },
    amenities: { parking: false, elevator: null },
  });
  assert.deepEqual(result.highlights, ["پارکینگ ندارد"]);
  assert.deepEqual(result.missing, ["وضعیت آسانسور"]);
  assert.deepEqual(getListingHighlights({ property: { floor: 3 }, amenities: { elevator: false } }).highlights,
    ["طبقه بالای همکف بدون آسانسور"]);
});

test("comparison uses only the existing scored snapshot with at least five samples", () => {
  const score = { listing: {
    asking: { askingPricePerMeter: 120 },
    valuation: { nearbyPricePerMeter: 100 },
    evidence: { comparableCount: 5 },
  } };
  assert.deepEqual(getComparablePrice(score), { sampleCount: 5, reference: 100, asking: 120, difference: 20, percent: 20 });
  assert.equal(getComparablePrice({ listing: { ...score.listing, evidence: { comparableCount: 4 } } }), null);
  assert.equal(getComparablePrice({ listing: { ...score.listing, asking: { askingPricePerMeter: 0 } } }), null);
  assert.equal(getComparablePrice({ listing: { ...score.listing, valuation: { nearbyPricePerMeter: 0 } } }), null);
  assert.equal(getComparablePrice(null), null);
});
