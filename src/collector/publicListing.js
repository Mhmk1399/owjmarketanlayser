import { createHash } from "node:crypto";
import {
  adaptPublicPostDocument,
  fetchPublicPostDocument,
} from "./divarPost.js";
import { resolveListingLocation } from "../locations/hierarchy.js";
import { classifyListingQuality } from "./listingPolicy.js";

const PHONE_LIKE = /(?<!\d)(?:(?:\+98|0098|0)[\d -]{9,16}\d)(?!\d)/g;
const EMAIL_LIKE = /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g;
const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

// The public post payload changes frequently. Only these non-identifying labels
// may cross the collection boundary; unknown rows are deliberately discarded.
const ATTRIBUTE_ALLOWLIST = Object.freeze({
  "متراژ": "area", "مساحت": "area", "ساخت": "constructionYear", "سال ساخت": "constructionYear",
  "اتاق": "rooms", "تعداد اتاق": "rooms", "طبقه": "floor", "تعداد طبقات": "totalFloors",
  "تعداد واحد در طبقه": "unitsPerFloor", "سند": "deedType", "نوع سند": "deedType",
  "جهت ساختمان": "buildingDirection", "موقعیت واحد": "unitPosition", "نوع ملک": "propertyType",
  "وضعیت بنا": "buildingCondition", "سیستم گرمایش": "heating", "سیستم سرمایش": "cooling",
  "قیمت کل": "price", "قیمت فروش": "price", "قیمت هر متر": "pricePerMeter",
  "ودیعه": "deposit", "رهن": "deposit", "اجاره": "rent",
});
const AMENITY_ALLOWLIST = Object.freeze([
  "elevator", "parking", "storage", "balcony", "rooftop", "lobby", "doorman",
  "security", "pool", "sauna", "gym", "centralAntenna", "airConditioning", "heating",
]);

function latinDigits(value) {
  return String(value ?? "")
    .replace(/[۰-۹]/g, (digit) => PERSIAN_DIGITS.indexOf(digit))
    .replace(/[٠-٩]/g, (digit) => ARABIC_DIGITS.indexOf(digit));
}

function numberFrom(value) {
  const match = latinDigits(value).replace(/[,٬،\s]/g, "").match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function moneyFrom(value) {
  const number = numberFrom(value);
  if (!Number.isFinite(number)) return null;
  const text = String(value);
  if (text.includes("میلیارد")) return number * 1_000_000_000;
  if (text.includes("میلیون")) return number * 1_000_000;
  return number;
}

function attribute(raw, pattern) {
  const entry = Object.entries(raw.structuredAttributes || raw.attributes || {})
    .find(([label]) => pattern.test(label));
  return entry?.[1] ?? null;
}

function coordinatesFrom(raw) {
  const location = raw.apiCoordinates?.[0];
  const point = location?.fuzzy_data?.point || location?.exact_data?.point || location?.point || location;
  const latitude = Number(point?.latitude ?? point?.lat);
  const longitude = Number(point?.longitude ?? point?.lng);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)
    || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return { latitude: null, longitude: null, accuracy: null, radiusMeters: null, source: null };
  }
  const approximate = location?.type === "FUZZY" || location?.fuzzy_data;
  return {
    latitude, longitude,
    accuracy: approximate ? "approximate" : "exact",
    radiusMeters: Number.isFinite(Number(location?.fuzzy_data?.radius))
      ? Number(location.fuzzy_data.radius) : null,
    source: raw.extractionSource || "public-html",
  };
}

function safeText(value, maxLength = 10_000) {
  if (typeof value !== "string") return null;
  const clean = redactContactText(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  return clean ? clean.slice(0, maxLength) : null;
}

function safeDescription(value) {
  const clean = safeText(value, 10_000);
  if (!clean) return null;
  const contactLine = /(?:https?:\/\/|www\.|t\.me|@\w|تلگرام|واتساپ|اینستاگرام|شماره تماس|آدرس دفتر|نشانی دفتر|هستم[_\s:].*[A-Za-z])/i;
  const lines = clean.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const safeLines = lines.filter((line) => !contactLine.test(line));
  return safeLines.length ? safeLines.join("\n") : null;
}

function safeImage(image, index) {
  const source = typeof image === "string" ? { url: image } : image;
  if (!source || typeof source !== "object") return null;
  try {
    const url = new URL(source.url);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (url.username || url.password) return null;
    // Query strings occasionally contain delivery signatures. They are neither
    // analytics inputs nor stable identifiers, so never persist them.
    url.search = "";
    url.hash = "";
    const width = Number(source.width);
    const height = Number(source.height);
    const pathname = url.pathname.toLowerCase();
    const format = pathname.match(/\.([a-z0-9]{2,5})$/)?.[1] || null;
    return {
      url: url.toString(),
      width: Number.isInteger(width) && width > 0 ? width : null,
      height: Number.isInteger(height) && height > 0 ? height : null,
      alt: safeText(source.alt, 300),
      format,
      isPrimary: index === 0,
    };
  } catch {
    return null;
  }
}

function allowlistedAttributes(raw) {
  const source = raw.structuredAttributes || raw.attributes || {};
  return Object.entries(source).flatMap(([label, value]) => {
    const key = ATTRIBUTE_ALLOWLIST[String(label).trim()];
    const cleanValue = safeText(String(value), 500);
    return key && cleanValue ? [{ key, label: String(label).trim(), value: cleanValue }] : [];
  });
}

function normalizePublicRaw(raw) {
  const floorNumbers = latinDigits(attribute(raw, /^طبقه$/)).match(/\d+/g)?.map(Number) || [];
  const normalized = {
    token: raw.token, url: raw.url, title: raw.title, category: raw.category || "real-estate",
    subcategory: raw.subcategory, city: raw.city, district: raw.district,
    neighborhood: raw.neighborhood, sourceNeighborhoodSlug: raw.sourceNeighborhoodSlug,
    description: safeDescription(raw.description), publishedText: safeText(raw.publishedText, 500),
    extractionSource: safeText(raw.extractionSource, 100),
    attributes: allowlistedAttributes(raw),
    property: {
      area: numberFrom(attribute(raw, /^(متراژ|مساحت)$/)),
      constructionYear: numberFrom(attribute(raw, /^(ساخت|سال ساخت)$/)),
      rooms: numberFrom(attribute(raw, /^(اتاق|تعداد اتاق)$/)),
      floor: floorNumbers[0] ?? null,
      totalFloors: floorNumbers[1] ?? numberFrom(attribute(raw, /^تعداد طبقات$/)),
      unitsPerFloor: numberFrom(attribute(raw, /^تعداد واحد در طبقه$/)),
      deedType: safeText(attribute(raw, /^(سند|نوع سند)$/), 200),
      buildingDirection: safeText(attribute(raw, /^جهت ساختمان$/), 200),
      unitPosition: safeText(attribute(raw, /^موقعیت واحد$/), 200),
      propertyType: safeText(attribute(raw, /^نوع ملک$/), 200),
      buildingCondition: safeText(attribute(raw, /^وضعیت بنا$/), 200),
      heating: safeText(attribute(raw, /^سیستم گرمایش$/), 200),
      cooling: safeText(attribute(raw, /^سیستم سرمایش$/), 200),
    },
    pricing: {
      price: moneyFrom(attribute(raw, /^(قیمت کل|قیمت فروش)$/)),
      pricePerMeter: moneyFrom(attribute(raw, /^قیمت هر متر$/)),
      deposit: moneyFrom(attribute(raw, /^(ودیعه|رهن)/)),
      rent: moneyFrom(attribute(raw, /^اجاره/)),
      isFullMortgage: null, isNegotiable: null,
    },
    amenities: Object.fromEntries(AMENITY_ALLOWLIST.map((key) => [key,
      typeof raw.amenities?.[key] === "boolean" ? raw.amenities[key] : null])),
    advertiser: raw.advertiserSignals || { type: null, isBusiness: null, hasBusinessBadge: null },
    images: Array.isArray(raw.images) ? raw.images.map(safeImage).filter(Boolean) : [],
    coordinates: coordinatesFrom(raw), quality: { score: 0, missingFields: [] },
  };
  if (!normalized.token || !normalized.url || !normalized.title) {
    throw new Error("Public listing is missing token, URL, or title");
  }
  if (normalized.pricing.deposit !== null || normalized.pricing.rent !== null) normalized.pricing.price = null;
  const required = { title: normalized.title, subcategory: normalized.subcategory, city: normalized.city,
    neighborhood: normalized.neighborhood, area: normalized.property.area, rooms: normalized.property.rooms,
    pricing: normalized.pricing.price ?? normalized.pricing.deposit ?? normalized.pricing.rent };
  normalized.quality.missingFields = Object.entries(required).filter(([, value]) => value == null).map(([key]) => key);
  normalized.quality.score = Math.round(((Object.keys(required).length - normalized.quality.missingFields.length)
    / Object.keys(required).length) * 100);
  return normalized;
}

async function extractPublicHtmlListing(page, discovered) {
  await page.goto(discovered.url, { waitUntil: "domcontentloaded" });
  const raw = await page.evaluate(() => {
    const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
    const attributes = {};
    for (const row of document.querySelectorAll("tr, .kt-base-row")) {
      const values = [...row.children].map((node) => clean(node.textContent)).filter(Boolean);
      if (values.length === 2) attributes[values[0]] ??= values[1];
    }
    const publicPageText = clean(document.querySelector("main")?.textContent);
    const isBusiness = /مشاور املاک|آژانس املاک|بنگاه معاملات/.test(publicPageText)
      ? true
      : /آگهی‌دهنده شخصی|فروشنده شخصی|مالک/.test(publicPageText) ? false : null;
    return {
      title: clean(document.querySelector("h1")?.textContent || document.querySelector('meta[property="og:title"]')?.content),
      description: clean(document.querySelector('[data-testid="description"], .kt-description-row')?.textContent
        || document.querySelector('meta[name="description"]')?.content),
      attributes,
      images: [...document.querySelectorAll("main img")].map((image) => ({
        url: image.currentSrc || image.src,
        width: image.naturalWidth || null,
        height: image.naturalHeight || null,
        alt: clean(image.alt),
      })).filter((image) => image.url),
      advertiserSignals: {
        type: isBusiness === true ? "real-estate-business" : isBusiness === false ? "personal" : "unknown",
        isBusiness,
        hasBusinessBadge: Boolean(document.querySelector('[class*="business"], [data-testid*="business"]')) || null,
      },
    };
  });
  return { ...raw, token: discovered.token, url: discovered.url, category: "real-estate",
    subcategory: discovered.expectedSubcategory, city: "تهران", neighborhood: discovered.area?.name,
    sourceNeighborhoodSlug: discovered.area?.slug, extractionSource: "public-html", amenities: {} };
}

export function redactContactText(value) {
  if (typeof value !== "string") return value;
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(PHONE_LIKE, "[redacted-phone]")
    .replace(EMAIL_LIKE, "[redacted-email]");
}

function finite(value) {
  return Number.isFinite(value) ? value : null;
}

function nullableBoolean(value) {
  return typeof value === "boolean" ? value : null;
}

function advertiserClassification(advertiser = {}) {
  const value = String(advertiser.type || "").toLowerCase();
  if (advertiser.isBusiness === true || /real-estate-business|business|agency|dealer|professional|املاک|مشاور|بنگاه/.test(value)) {
    return "real-estate-business";
  }
  if (advertiser.isBusiness === false || /personal|private|individual|شخصی|مالک/.test(value)) return "personal";
  return "unknown";
}

function fingerprintFor(listing) {
  const source = JSON.stringify({
    title: listing.title,
    description: listing.description,
    images: listing.images,
    attributes: listing.attributes,
    subcategory: listing.subcategory,
    city: listing.city,
    district: listing.district,
    neighborhood: listing.neighborhood,
    resolvedLocation: listing.resolvedLocation,
    coordinates: listing.coordinates,
    property: listing.property,
    pricing: listing.pricing,
    amenities: listing.amenities,
    advertiserType: listing.advertiserType,
    advertiserSignals: listing.advertiserSignals,
    imageCount: listing.imageCount,
    publishedText: listing.publishedText,
    quality: listing.quality,
  });
  return createHash("sha256").update(source).digest("hex");
}

export function validatePublicMarketListing(listing) {
  const required = [
    "schemaVersion", "token", "url", "title", "description", "images", "attributes", "property",
    "propertyDetails", "pricing", "amenities", "advertiserSignals", "coordinates", "resolvedLocation",
    "crawlPartition", "publication", "locationProvenance", "extraction", "quality", "lifecycle",
    "firstSeenAt", "lastSeenAt", "contentFingerprint",
  ];
  for (const key of required) {
    if (listing?.[key] === undefined) {
      throw new Error(`Public listing schema violation: ${key} is required`);
    }
  }
  for (const forbidden of ["contact", "publicPhones", "authenticatedPhone", "advertiser", "credentials", "tokenData", "chatActions"]) {
    if (Object.hasOwn(listing, forbidden)) {
      throw new Error(`Public listing schema violation: forbidden field ${forbidden}`);
    }
  }
  const forbiddenKeys = /^(?:contact|contacts|phone|phones|phoneNumber|publicPhones|authenticatedPhone|advertiserName|agencyName|credentials?|accessToken|refreshToken|authorization|cookie|chat|chatActions)$/i;
  const inspect = (value) => {
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (forbiddenKeys.test(key)) throw new Error(`Public listing schema violation: forbidden field ${key}`);
      inspect(child);
    }
  };
  inspect(listing);
  if (listing.schemaVersion !== "1.0.0") throw new Error("Public listing schema version is unsupported");
  if (!/^[A-Za-z0-9_-]+$/.test(listing.token)) throw new Error("Public listing token is invalid");
  if (listing.pricing.currency !== "TOMAN") throw new Error("Public listing currency must be TOMAN");
  if (!Array.isArray(listing.images) || listing.imageCount !== listing.images.length) {
    throw new Error("Public listing image metadata is inconsistent");
  }
  if (!/^[a-f0-9]{64}$/.test(listing.contentFingerprint)) {
    throw new Error("Public listing fingerprint is invalid");
  }
  return listing;
}

export function toPublicMarketListing(
  normalized,
  existing = null,
  now = new Date().toISOString(),
  discovered = null,
) {
  const area = finite(normalized.property?.area);
  const price = finite(normalized.pricing?.price);
  const advertisedPricePerMeter = finite(normalized.pricing?.pricePerMeter);
  const derivedPricePerMeter = price !== null && area !== null && area > 0
    ? Math.round(price / area)
    : null;
  const pricePerMeter = derivedPricePerMeter ?? advertisedPricePerMeter;

  const listing = {
    schemaVersion: "1.0.0",
    token: normalized.token,
    url: normalized.url,
    title: redactContactText(normalized.title),
    description: safeDescription(normalized.description),
    images: Array.isArray(normalized.images) ? normalized.images.map(safeImage).filter(Boolean) : [],
    attributes: Array.isArray(normalized.attributes) ? normalized.attributes.map(({ key, label, value }) => ({
      key: String(key), label: safeText(label, 200), value: safeText(value, 500),
    })).filter((item) => Object.values(ATTRIBUTE_ALLOWLIST).includes(item.key) && item.label && item.value) : [],
    category: normalized.category ?? null,
    subcategory: normalized.subcategory ?? null,
    city: normalized.city ?? null,
    district: normalized.district ?? null,
    neighborhood: normalized.neighborhood ?? null,
    sourceNeighborhoodSlug: normalized.sourceNeighborhoodSlug ?? null,
    resolvedLocation: null,
    publishedText: normalized.publishedText ?? null,
    crawlPartition: {
      category: discovered?.category ?? null,
      expectedSubcategory: discovered?.expectedSubcategory ?? null,
      area: discovered?.area
        ? {
            id: Number.isInteger(discovered.area.id) ? discovered.area.id : null,
            name: discovered.area.name ?? null,
            slug: discovered.area.slug ?? null,
            municipalDistricts: Array.isArray(discovered.area.municipalDistricts)
              ? discovered.area.municipalDistricts.filter(Number.isInteger)
              : [],
          }
        : null,
    },
    property: {
      area,
      constructionYear: Number.isInteger(normalized.property?.constructionYear)
        ? normalized.property.constructionYear
        : null,
      rooms: finite(normalized.property?.rooms),
      floor: finite(normalized.property?.floor),
      totalFloors: finite(normalized.property?.totalFloors),
      unitsPerFloor: finite(normalized.property?.unitsPerFloor),
    },
    propertyDetails: {
      deedType: safeText(normalized.property?.deedType, 200),
      buildingDirection: safeText(normalized.property?.buildingDirection, 200),
      unitPosition: safeText(normalized.property?.unitPosition, 200),
      propertyType: safeText(normalized.property?.propertyType, 200),
      buildingCondition: safeText(normalized.property?.buildingCondition, 200),
      heating: safeText(normalized.property?.heating, 200),
      cooling: safeText(normalized.property?.cooling, 200),
    },
    pricing: {
      currency: "TOMAN",
      price,
      pricePerMeter,
      deposit: finite(normalized.pricing?.deposit),
      rent: finite(normalized.pricing?.rent),
      isFullMortgage: nullableBoolean(normalized.pricing?.isFullMortgage),
      isNegotiable: nullableBoolean(normalized.pricing?.isNegotiable),
    },
    amenities: Object.fromEntries(AMENITY_ALLOWLIST.map((key) => [key, nullableBoolean(normalized.amenities?.[key])])),
    advertiserType: advertiserClassification(normalized.advertiser),
    advertiserSignals: {
      type: advertiserClassification(normalized.advertiser),
      isBusiness: nullableBoolean(normalized.advertiser?.isBusiness),
      hasBusinessBadge: nullableBoolean(normalized.advertiser?.hasBusinessBadge),
    },
    coordinates: {
      latitude: finite(normalized.coordinates?.latitude),
      longitude: finite(normalized.coordinates?.longitude),
      accuracy: normalized.coordinates?.accuracy ?? null,
      radiusMeters: finite(normalized.coordinates?.radiusMeters),
      source: normalized.coordinates?.source ?? null,
    },
    imageCount: 0,
    publication: { text: normalized.publishedText ?? null, source: normalized.extractionSource ?? null },
    locationProvenance: {
      source: normalized.coordinates?.source ?? null,
      sourceNeighborhoodSlug: normalized.sourceNeighborhoodSlug ?? null,
      crawlAreaId: Number.isInteger(discovered?.area?.id) ? discovered.area.id : null,
    },
    quality: {
      score: finite(normalized.quality?.score) ?? 0,
      missingFields: Array.isArray(normalized.quality?.missingFields)
        ? normalized.quality.missingFields
        : [],
      outcome: null,
      outcomeReasons: [],
    },
    firstSeenAt: existing?.firstSeenAt || now,
    lastSeenAt: now,
    contentFingerprint: "",
    lifecycle: {
      status: "active",
      detailFetchedAt: now,
      lastDiscoveredAt: now,
      lastConfirmedRunId: null,
      lastContentChangedAt: null,
      consecutiveMisses: 0,
      removedAt: null,
    },
  };
  listing.resolvedLocation = resolveListingLocation(listing);
  listing.imageCount = listing.images.length;
  const classification = classifyListingQuality(listing);
  listing.quality.outcome = classification.outcome;
  listing.quality.outcomeReasons = classification.reasons;
  const coverageFields = ["description", "property.area", "property.constructionYear", "property.rooms",
    "pricing.price", "coordinates.latitude", "coordinates.longitude", "images"];
  const present = coverageFields.filter((path) => {
    const value = path.split(".").reduce((item, key) => item?.[key], listing);
    return Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined;
  });
  listing.extraction = {
    source: normalized.extractionSource ?? normalized.coordinates?.source ?? null,
    presentFields: present,
    missingFields: coverageFields.filter((field) => !present.includes(field)),
    coveragePercent: Math.round((present.length / coverageFields.length) * 100),
  };
  listing.contentFingerprint = fingerprintFor(listing);
  listing.lifecycle.lastContentChangedAt = existing?.contentFingerprint === listing.contentFingerprint
    ? existing?.lifecycle?.lastContentChangedAt ?? existing?.lastSeenAt ?? now
    : now;
  return validatePublicMarketListing(listing);
}

function normalizePublicListing(raw, existing, discovered = null) {
  // Public text can accidentally contain personal contact details. The analytics
  // record does not retain descriptions, names, contact state, or phone fields.
  const normalized = normalizePublicRaw(raw);
  return toPublicMarketListing(normalized, existing, new Date().toISOString(), discovered);
}

function publicCoverage(listing) {
  return {
    hasCoordinates: listing.coordinates.latitude !== null && listing.coordinates.longitude !== null,
    coordinateAccuracy: listing.coordinates.accuracy,
    coordinateRadiusMeters: listing.coordinates.radiusMeters,
    hasArea: listing.property.area !== null,
    hasSalePrice: listing.pricing.price !== null,
    hasDeposit: listing.pricing.deposit !== null,
    hasRent: listing.pricing.rent !== null,
    imageCount: listing.imageCount,
    qualityScore: listing.quality.score,
    missingFieldCount: listing.quality.missingFields.length,
  };
}

export async function crawlPublicListing(
  page,
  discovered,
  existing = null,
  {
    logger = null,
    apiFetcher = fetchPublicPostDocument,
    apiRequestContext = null,
    htmlExtractor = extractPublicHtmlListing,
  } = {},
) {
  const apiStartedAt = Date.now();
  try {
    logger?.debug("crawl.detail.api.request", "Requesting public listing JSON", {
      token: discovered.token,
    });
    const { document, status } = await apiFetcher(
      apiRequestContext || page,
      discovered.token,
    );
    const listing = normalizePublicListing(
      adaptPublicPostDocument(document, discovered),
      existing,
      discovered,
    );
    logger?.info("crawl.detail.api.success", "Public listing JSON extracted", {
      token: discovered.token,
      status,
      elapsedMs: Date.now() - apiStartedAt,
      ...publicCoverage(listing),
    });
    return listing;
  } catch (apiError) {
    logger?.warn("crawl.detail.api.fallback", "Public listing JSON failed; using HTML fallback", {
      token: discovered.token,
      status: apiError.status ?? null,
      code: apiError.code ?? null,
      elapsedMs: Date.now() - apiStartedAt,
      error: apiError.message,
    });

    // Do not turn an explicit platform-limit response into another request.
    if (apiError.status === 403 || apiError.status === 429) throw apiError;

    const htmlStartedAt = Date.now();
    try {
      const listing = normalizePublicListing(
        await htmlExtractor(page, discovered),
        existing,
        discovered,
      );
      logger?.info("crawl.detail.html.success", "HTML fallback extracted public listing", {
        token: discovered.token,
        elapsedMs: Date.now() - htmlStartedAt,
        ...publicCoverage(listing),
      });
      return listing;
    } catch (htmlError) {
      logger?.error("crawl.detail.html.failure", "Public JSON and HTML extraction both failed", {
        token: discovered.token,
        elapsedMs: Date.now() - htmlStartedAt,
        apiError: apiError.message,
        error: htmlError.message,
      });
      throw htmlError;
    }
  }
}

export const _publicListingHelpers = {
  fingerprintFor,
  finite,
  nullableBoolean,
  normalizePublicListing,
  publicCoverage,
};
