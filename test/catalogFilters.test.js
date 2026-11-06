import test from "node:test";
import assert from "node:assert/strict";
import { _catalogFilterHelpers } from "../src/api/server.js";

test("catalog accepts any selected area and rejects listings outside all selected areas", () => {
  const listing = {
    neighborhood: "قلهک", district: "منطقه ۳",
    crawlPartition: { area: { name: "قلهک", slug: "gholhak", municipalDistricts: [3] } },
    title: "خانه", token: "one", pricing: {}, property: {}, amenities: {}, quality: {}, lifecycle: {},
  };
  assert.equal(_catalogFilterHelpers.matchesListingQuery(
    listing, new URL("http://local/catalog?district=ونک&district=قلهک"),
  ), true);
  assert.equal(_catalogFilterHelpers.matchesListingQuery(
    listing, new URL("http://local/catalog?district=ونک&district=تجریش"),
  ), false);
});

test("score filters target scenario recommendation while confidence and risk use model evidence", () => {
  const row = {
    scenario: { recommendation: 78, band: "promising" },
    scores: { recommendation: 55, confidence: 72, risk: 20, band: "fair" },
  };
  const accepted = new URL("http://local/catalog?minScore=70&scoreBand=promising&minConfidence=70&maxRisk=25");
  assert.equal(_catalogFilterHelpers.matchesScoreQuery(row, accepted, { scenario: true }), true);
  assert.equal(_catalogFilterHelpers.matchesScoreQuery(row, accepted, { scenario: false }), false);
});
