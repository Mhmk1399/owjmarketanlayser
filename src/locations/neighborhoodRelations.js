import { normalizePersianText } from "../utils/persian.js";

// These are deliberately curated containment relationships, not fuzzy-name
// guesses. Additions require public geographic evidence and a regression test.
const RELATIONS = Object.freeze([
  {
    requested: "بوستان جنگلی لویزان",
    actual: "لویزان",
    kind: "landmark-within-neighborhood",
    evidence: "public-place-name-containment",
  },
]);

const relationKeys = new Set(RELATIONS.map((item) => (
  `${normalizePersianText(item.requested)}\u0000${normalizePersianText(item.actual)}`
)));

export function approvedNeighborhoodRelation(requested, actual) {
  const key = `${normalizePersianText(requested)}\u0000${normalizePersianText(actual)}`;
  return relationKeys.has(key);
}

export const neighborhoodRelations = RELATIONS;
