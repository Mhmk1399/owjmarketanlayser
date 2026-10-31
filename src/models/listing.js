import mongoose from "mongoose";

const { Schema } = mongoose;
const nullable = (type, extra = {}) => ({ type, default: null, ...extra });
const strict = { _id: false, strict: "throw" };

const propertySchema = new Schema({
  area: nullable(Number, { min: 0 }), constructionYear: nullable(Number), rooms: nullable(Number, { min: 0 }),
  floor: nullable(Number), totalFloors: nullable(Number, { min: 0 }), unitsPerFloor: nullable(Number, { min: 0 }),
}, strict);
const detailsSchema = new Schema({
  deedType: nullable(String), buildingDirection: nullable(String), unitPosition: nullable(String),
  landWidth: nullable(String), buildingDensity: nullable(String),
  propertyType: nullable(String), buildingCondition: nullable(String), heating: nullable(String), cooling: nullable(String),
}, strict);
const pricingSchema = new Schema({
  currency: { type: String, required: true, enum: ["TOMAN"] }, price: nullable(Number, { min: 0 }),
  pricePerMeter: nullable(Number, { min: 0 }), deposit: nullable(Number, { min: 0 }), rent: nullable(Number, { min: 0 }),
  isFullMortgage: nullable(Boolean), isNegotiable: nullable(Boolean),
}, strict);
const amenityFields = ["elevator", "parking", "storage", "balcony", "rooftop", "lobby", "doorman", "security", "pool", "sauna", "gym", "centralAntenna", "airConditioning", "heating"];
const amenitiesSchema = new Schema(Object.fromEntries(amenityFields.map((key) => [key, nullable(Boolean)])), strict);
const imageSchema = new Schema({
  url: { type: String, required: true, match: /^https?:\/\// }, width: nullable(Number, { min: 1 }),
  height: nullable(Number, { min: 1 }), alt: nullable(String), format: nullable(String), isPrimary: { type: Boolean, required: true },
}, strict);
const crawlAreaSchema = new Schema({ id: nullable(Number), name: nullable(String), slug: nullable(String), municipalDistricts: { type: [Number], default: [] } }, strict);
const crawlPartitionSchema = new Schema({ category: nullable(String), expectedSubcategory: nullable(String), area: { type: crawlAreaSchema, default: null } }, strict);
const qualitySchema = new Schema({
  score: { type: Number, required: true, min: 0, max: 100 }, missingFields: { type: [String], default: [] },
  outcome: { type: String, required: true, enum: ["scoring-ready", "history-only"] }, outcomeReasons: { type: [String], default: [] },
}, strict);
const lifecycleSchema = new Schema({
  status: { type: String, required: true, enum: ["active", "not-seen", "possibly-removed", "removed"] },
  detailFetchedAt: nullable(Date), lastDiscoveredAt: nullable(Date), lastConfirmedRunId: nullable(String),
  lastContentChangedAt: nullable(Date), consecutiveMisses: { type: Number, required: true, min: 0 }, removedAt: nullable(Date),
}, strict);
const nearbyPlaceSchema = new Schema({
  category: { type: String, required: true, enum: ["bus-station", "metro-station"] },
  title: { type: String, required: true, trim: true }, address: nullable(String),
  coordinates: { type: new Schema({ latitude: { type: Number, required: true, min: -90, max: 90 }, longitude: { type: Number, required: true, min: -180, max: 180 } }, strict), required: true },
  distanceMeters: { type: Number, required: true, min: 0 }, source: { type: String, required: true, enum: ["neshan-search"] },
  fetchedAt: { type: Date, required: true },
}, strict);

export const listingSchema = new Schema({
  schemaVersion: { type: String, required: true, enum: ["1.0.0", "2.0.0"] },
  token: { type: String, required: true, immutable: true, match: /^[A-Za-z0-9_-]+$/ },
  url: { type: String, required: true, match: /^https?:\/\// }, title: { type: String, required: true, trim: true },
  description: nullable(String), category: nullable(String), subcategory: nullable(String), city: nullable(String),
  district: nullable(String), neighborhood: nullable(String), sourceNeighborhoodSlug: nullable(String), publishedText: nullable(String),
  resolvedLocation: { type: new Schema({ provinceId: nullable(Number), cityId: nullable(Number), neighborhoodId: nullable(Number), slug: nullable(String), name: nullable(String), matchConfidence: { type: String, required: true, enum: ["exact-slug", "exact-name", "crawl-partition", "unmatched"] } }, strict), required: true },
  crawlPartition: { type: crawlPartitionSchema, required: true },
  property: { type: propertySchema, required: true }, propertyDetails: { type: detailsSchema, required: true },
  pricing: { type: pricingSchema, required: true }, amenities: { type: amenitiesSchema, required: true },
  attributes: { type: [new Schema({ key: { type: String, required: true }, label: { type: String, required: true }, value: { type: String, required: true } }, strict)], default: [] },
  images: { type: [imageSchema], default: [] }, imageCount: { type: Number, required: true, min: 0 },
  advertiserType: { type: String, required: true, enum: ["personal", "real-estate-business", "unknown"] }, advertiserSignals: { type: new Schema({
    type: { type: String, required: true, enum: ["personal", "real-estate-business", "unknown"] },
    isBusiness: nullable(Boolean), hasBusinessBadge: nullable(Boolean), panelType: nullable(String, { match: /^[A-Za-z0-9_-]+$/ }),
    hasBusinessReference: nullable(Boolean), classificationSource: { type: [String], default: [] },
    confidence: { type: String, required: true, enum: ["high", "medium", "low"], default: "low" },
    businessDisplayName: nullable(String),
  }, strict), required: true },
  media: { type: new Schema({
    samePropertyImageClaim: nullable(Boolean),
    claimSource: nullable(String, { enum: ["poster-declared-public-field", null] }),
  }, strict), required: true, default: () => ({ samePropertyImageClaim: null, claimSource: null }) },
  coordinates: { type: new Schema({ latitude: nullable(Number, { min: -90, max: 90 }), longitude: nullable(Number, { min: -180, max: 180 }), accuracy: nullable(String), radiusMeters: nullable(Number, { min: 0 }), source: nullable(String) }, strict), required: true },
  nearbyPlaces: { type: [nearbyPlaceSchema], default: [] },
  publication: { type: new Schema({ text: nullable(String), source: nullable(String) }, strict), required: true },
  locationProvenance: { type: new Schema({ source: nullable(String), sourceNeighborhoodSlug: nullable(String), crawlAreaId: nullable(Number) }, strict), required: true },
  extraction: { type: new Schema({ source: nullable(String), presentFields: { type: [String], default: [] }, missingFields: { type: [String], default: [] }, coveragePercent: { type: Number, required: true, min: 0, max: 100 } }, strict), required: true },
  quality: { type: qualitySchema, required: true }, lifecycle: { type: lifecycleSchema, required: true },
  firstSeenAt: { type: Date, required: true }, lastSeenAt: { type: Date, required: true },
  contentFingerprint: { type: String, required: true, match: /^[a-f0-9]{64}$/ },
}, { strict: "throw", versionKey: false, minimize: false });

listingSchema.index({ token: 1 }, { unique: true });
listingSchema.index({ subcategory: 1, neighborhood: 1, "pricing.price": 1 });
listingSchema.index({ "resolvedLocation.neighborhoodId": 1, lastSeenAt: -1 });
listingSchema.index({ "lifecycle.status": 1, "quality.outcome": 1, lastSeenAt: -1 });
listingSchema.index({ advertiserType: 1, "lifecycle.status": 1, lastSeenAt: -1 });
listingSchema.index({ "crawlPartition.area.id": 1, subcategory: 1, lastSeenAt: -1 });
listingSchema.index({ "coordinates.latitude": 1, "coordinates.longitude": 1 });
listingSchema.index({ "nearbyPlaces.category": 1, "nearbyPlaces.distanceMeters": 1 });

export const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);
export default Listing;
