import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { buildDashboardPayload } from "./dashboard.js";
import { buildScoreDetail, buildScoringAnalytics, buildScoringWorkshop } from "./scoringViews.js";
import { buildLocationView } from "./locationViews.js";
import { fetchNearbyPlaces } from "../services/neshanPlaces.js";
import { buildDataQualityBaseline } from "./dataQuality.js";
import { ScoringScenario } from "../models/scoringScenario.js";
import { calculateSavedScenario, scenarioDocument } from "../scoring/scenarioService.js";
import { BUYER_MATCH_AMENITIES, normalizeBuyerMatchRequest } from "../search/buyerMatcher.js";
import { normalizeListingPage } from "../storage/listingPagination.js";
import { OpenAIVoiceService } from "../services/openaiVoice.js";

function sendJson(response, status, value) {
  const body = JSON.stringify(value, null, 2);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
  });
  response.end(body);
}

const STATIC_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

async function readJson(file, fallback = null) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

function createCachedJsonReader(file, fallback = null) {
  let cachedSignature = null;
  let cachedValue = fallback;
  let pending = null;

  return async function readCachedJson() {
    let metadata;
    try {
      metadata = await stat(file);
    } catch (error) {
      if (error.code === "ENOENT") return fallback;
      throw error;
    }

    const signature = `${metadata.mtimeMs}:${metadata.size}`;
    if (signature === cachedSignature) return cachedValue;
    if (pending?.signature === signature) return pending.promise;

    const promise = readJson(file, fallback)
      .then((value) => {
        cachedSignature = signature;
        cachedValue = value;
        return value;
      })
      .finally(() => {
        if (pending?.promise === promise) pending = null;
      });
    pending = { signature, promise };
    return promise;
  };
}

async function sendStatic(response, file, type) {
  try {
    const body = await readFile(file);
    response.writeHead(200, {
      "Content-Type": type,
      "Content-Length": body.length,
      "Cache-Control": file.pathname.endsWith("index.html")
        ? "no-cache"
        : "public, max-age=31536000, immutable",
      "Content-Security-Policy": "default-src 'self'; style-src 'self' 'unsafe-inline' https://static.neshan.org; script-src 'self' https://static.neshan.org; img-src 'self' data: blob: https:; connect-src 'self' https://*.neshan.org; worker-src blob:",
    });
    response.end(body);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

function numberParam(value, fallback, minimum, maximum) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? Math.min(maximum, Math.max(minimum, parsed)) : fallback;
}

async function readJsonBody(request, maximumBytes = 1_000_000) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maximumBytes) throw Object.assign(new Error("Request body is too large"), { status: 413 });
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    throw Object.assign(new Error("Request body must be valid JSON"), { status: 400 });
  }
}

async function readBinaryBody(request, maximumBytes = 12_000_000) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maximumBytes) throw Object.assign(new Error("Audio is too large"), { status: 413, code: "audio-too-large" });
    chunks.push(chunk);
  }
  if (!size) throw Object.assign(new Error("Audio is required"), { status: 400, code: "audio-required" });
  return Buffer.concat(chunks);
}

function matchesListingQuery(listing, url) {
  const value = (name) => url.searchParams.get(name);
  const numeric = (name) => {
    const number = Number(value(name));
    return value(name) !== null && Number.isFinite(number) ? number : null;
  };
  const districts = url.searchParams.getAll("district").filter((item) => item && item !== "all");
  if (districts.length && !districts.some((district) => listing.neighborhood === district
    || listing.district === district
    || listing.crawlPartition?.area?.name === district
    || listing.crawlPartition?.area?.slug === district
    || listing.crawlPartition?.area?.municipalDistricts?.includes(Number(district)))) return false;
  const category = value("category");
  if (category && category !== "all" && listing.subcategory !== category && listing.crawlPartition?.category !== category) return false;
  const advertiser = value("advertiserType");
  if (advertiser && advertiser !== "all" && listing.advertiserType !== advertiser) return false;
  const readiness = value("readiness");
  if (readiness && readiness !== "all" && listing.quality?.outcome !== readiness) return false;
  const status = value("status");
  if (status && status !== "all" && listing.lifecycle?.status !== status) return false;
  const query = String(value("q") || "").trim().toLocaleLowerCase("fa");
  if (query && !`${listing.title} ${listing.description || ""} ${listing.neighborhood || ""} ${listing.token}`
    .toLocaleLowerCase("fa").includes(query)) return false;
  const ranges = [
    [listing.pricing?.price, numeric("minPrice"), numeric("maxPrice")],
    [listing.pricing?.pricePerMeter, numeric("minPricePerMeter"), numeric("maxPricePerMeter")],
    [listing.property?.area, numeric("minArea"), numeric("maxArea")],
  ];
  if (ranges.some(([item, minimum, maximum]) => (minimum !== null && item < minimum) || (maximum !== null && item > maximum))) return false;
  if (numeric("minRooms") !== null && listing.property?.rooms < numeric("minRooms")) return false;
  if (numeric("minYear") !== null && listing.property?.constructionYear < numeric("minYear")) return false;
  if (url.searchParams.getAll("amenity").some((key) => listing.amenities?.[key] !== true)) return false;
  return true;
}

function matchesScoreQuery(score, url, { scenario = false } = {}) {
  const numeric = (name) => {
    const raw = url.searchParams.get(name);
    const number = Number(raw);
    return raw !== null && Number.isFinite(number) ? number : null;
  };
  const recommendation = scenario ? score?.scenario?.recommendation : score?.scores?.recommendation;
  const band = scenario ? score?.scenario?.band : score?.scores?.band;
  const minimum = numeric("minScore");
  const maximum = numeric("maxScore");
  if (minimum !== null && recommendation < minimum) return false;
  if (maximum !== null && recommendation > maximum) return false;
  const requestedBand = url.searchParams.get("scoreBand");
  if (requestedBand && requestedBand !== "all" && band !== requestedBand) return false;
  const minimumConfidence = numeric("minConfidence");
  if (minimumConfidence !== null && score?.scores?.confidence < minimumConfidence) return false;
  const maximumRisk = numeric("maxRisk");
  if (maximumRisk !== null && score?.scores?.risk > maximumRisk) return false;
  return true;
}

function plainScenario(document) {
  const value = typeof document?.toObject === "function" ? document.toObject({ flattenMaps: true }) : document;
  const { _id, ...scenario } = JSON.parse(JSON.stringify(value));
  return scenario;
}

function externalListing(listing) {
  const latitude = listing.coordinates?.latitude;
  const longitude = listing.coordinates?.longitude;
  return {
    ...listing,
    coordinates: {
      ...listing.coordinates,
      latitude: Number.isFinite(latitude) ? Number(latitude.toFixed(4)) : null,
      longitude: Number.isFinite(longitude) ? Number(longitude.toFixed(4)) : null,
    },
  };
}

export const _catalogFilterHelpers = { matchesListingQuery, matchesScoreQuery };

export function createAnalyticsServer({ config, store, analytics, crawler, logger, resourceMonitor = null }) {
  let recommendationAnalysisCache = { key: null, value: new Map() };
  let activeBuyerSearches = 0;
  const readScoredSnapshot = createCachedJsonReader(config.paths.scoredListings, null);
  const scoredDocumentCache = { value: null, expiresAt: 0, pending: null };
  const scenarioCalculationCache = new Map();
  const openaiVoice = new OpenAIVoiceService({ apiKey: config.openaiApiKey, options: config.openai });
  const loadScoredDocument = async () => {
    if (typeof store.latestScoredListings === "function") {
      const latest = await store.latestScoredListings();
      if (latest.listings.length) return {
        schemaVersion: "1.0.0",
        scoringVersion: latest.model.version,
        generatedAt: latest.model.generatedAt,
        modelValidation: latest.model.metrics?.modelValidation || {},
        summary: latest.model.metrics?.scoring || {},
        valuationValidation: latest.model.metrics?.scoring?.valuationValidation || {},
        listings: latest.listings,
        source: { type: "mongodb", modelId: latest.model.modelId },
      };
    }
    return readScoredSnapshot();
  };
  const readScoredDocument = async () => {
    const now = Date.now();
    if (scoredDocumentCache.value && scoredDocumentCache.expiresAt > now) {
      return scoredDocumentCache.value;
    }
    if (scoredDocumentCache.pending) return scoredDocumentCache.pending;
    scoredDocumentCache.pending = loadScoredDocument()
      .then((value) => {
        scoredDocumentCache.value = value;
        scoredDocumentCache.expiresAt = Date.now() + 15_000;
        return value;
      })
      .finally(() => {
        scoredDocumentCache.pending = null;
      });
    return scoredDocumentCache.pending;
  };
  const calculateScenario = (scoredDocument, stored) => {
    const scenario = plainScenario(stored);
    const scoreVersion = [
      scoredDocument?.source?.modelId,
      scoredDocument?.scoringVersion,
      scoredDocument?.generatedAt,
      scoredDocument?.listings?.length,
    ].join(":");
    const scenarioVersion = stored?.updatedAt || stored?.createdAt || scenario.updatedAt || "unversioned";
    const key = `${scenario.scenarioId}:${scenarioVersion}:${scoreVersion}`;
    if (scenarioCalculationCache.has(key)) return scenarioCalculationCache.get(key);
    const calculated = calculateSavedScenario(scoredDocument, scenario);
    scenarioCalculationCache.set(key, calculated);
    while (scenarioCalculationCache.size > 24) {
      scenarioCalculationCache.delete(scenarioCalculationCache.keys().next().value);
    }
    return calculated;
  };
  const server = http.createServer(async (request, response) => {
    const startedAt = Date.now();
    const requestId = randomUUID();
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    let status = 200;
    response.once("finish", () => {
      logger.info("http.request", "JSON API request completed", {
        requestId,
        method: request.method,
        path: url.pathname,
        status: response.statusCode,
        elapsedMs: Date.now() - startedAt,
      });
    });

    try {
      if (request.method === "GET" && url.pathname === "/health") {
        return sendJson(response, 200, {
          status: "ok",
          service: "owj-market-analytics",
          mode: config.mongoUri ? "public-only-mongodb" : "public-only-json",
          time: new Date().toISOString(),
          process: resourceMonitor?.snapshot() || null,
          listingCount: store.getListings().length,
          crawl: crawler.snapshot(),
          guardrails: {
            contactEndpointAttempts: crawler.snapshot().contactEndpointAttempts,
            authenticatedTokenAccess: 0,
          },
          derivedFiles: {
            listings: config.paths.listings,
            analytics: config.paths.analytics,
            models: config.paths.model,
            scoringReady: config.paths.scoringReady,
            scoredListings: config.paths.scoredListings,
            scoringReport: config.paths.scoringReport,
            logs: config.paths.logFile,
          },
        });
      }

      if (request.method === "GET" && url.pathname === "/map-config") {
        return sendJson(response, 200, {
          provider: "neshan",
          key: config.neshanMapKey,
          mapEnabled: Boolean(config.neshanMapKey),
          nearbyServicesConfigured: Boolean(config.neshanServiceKey),
        });
      }

      if (request.method === "GET" && url.pathname === "/listing-facets") {
        const facets = typeof store.listingFacets === "function" ? await store.listingFacets() : { districts: [], categories: [], bounds: {} };
        return sendJson(response, 200, facets);
      }

      if (request.method === "GET" && url.pathname === "/ai/voice/status") {
        return sendJson(response, 200, {
          enabled: openaiVoice.enabled,
          transcriptionModel: openaiVoice.enabled ? config.openai?.transcriptionModel : null,
          filterModel: openaiVoice.enabled ? config.openai?.filterModel : null,
          speechModel: openaiVoice.enabled ? config.openai?.realtimeModel : null,
        });
      }

      if (request.method === "POST" && url.pathname === "/ai/voice/catalog-filters") {
        const mimeType = String(request.headers["content-type"] || "").split(";")[0].trim().toLowerCase();
        if (!new Set(["audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg", "audio/wav", "audio/x-wav"]).has(mimeType)) {
          throw Object.assign(new Error("Unsupported audio format"), { status: 415, code: "unsupported-audio" });
        }
        const audio = await readBinaryBody(request);
        const [facets, scenarios] = await Promise.all([
          typeof store.listingFacets === "function"
            ? store.listingFacets() : Promise.resolve({ districts: [], categories: [] }),
          config.mongoUri
            ? ScoringScenario.find({ active: true }).select({ _id: 0, scenarioId: 1, name: 1 }).lean()
            : Promise.resolve([]),
        ]);
        const result = await openaiVoice.voiceToFilters(audio, {
          mimeType,
          districts: facets.districts || [],
          categories: facets.categories || [],
          scenarios,
        });
        logger.info("openai.voice.catalog-filters", "Voice catalog filters created", {
          requestId,
          audioBytes: audio.length,
          transcriptCharacters: result.transcript.length,
          districtCount: result.filters.districts.length,
          scenarioSelected: Boolean(result.filters.scenarioId),
        });
        return sendJson(response, 200, result);
      }

      if (request.method === "POST" && url.pathname === "/ai/voice/speech") {
        const body = await readJsonBody(request, 8_000);
        const text = typeof body.text === "string" ? body.text.trim() : "";
        if (!text || text.length > 800) {
          throw Object.assign(new Error("Speech text must contain 1 to 800 characters"), { status: 400, code: "invalid-speech-text" });
        }
        const audio = await openaiVoice.synthesize(text);
        response.writeHead(200, {
          "Content-Type": "audio/wav",
          "Content-Length": audio.length,
          "Cache-Control": "no-store",
          "X-Audio-Generated-By": "OpenAI",
        });
        response.end(audio);
        return;
      }

      if (request.method === "GET" && url.pathname === "/buyer-matches/options") {
        const facets = typeof store.listingFacets === "function"
          ? await store.listingFacets() : { districts: [], categories: [], bounds: {} };
        return sendJson(response, 200, {
          schemaVersion: "1.0.0",
          transactionTypes: ["buy", "rent"],
          propertyTypes: facets.categories,
          locations: facets.districts,
          amenities: BUYER_MATCH_AMENITIES,
          bounds: facets.bounds,
        });
      }

      if (request.method === "POST" && url.pathname === "/buyer-matches/search") {
        if (typeof store.matchBuyerRequirement !== "function") {
          return sendJson(response, 503, { error: "mongodb-required" });
        }
        const maximumConcurrent = config.search?.maxConcurrent || 4;
        if (activeBuyerSearches >= maximumConcurrent) {
          response.setHeader("Retry-After", "2");
          return sendJson(response, 503, { error: "buyer-search-busy", message: "Search capacity is busy; retry shortly." });
        }
        activeBuyerSearches += 1;
        const searchStartedAt = Date.now();
        try {
          const body = await readJsonBody(request, 64_000);
          const requirement = normalizeBuyerMatchRequest(body.requirement || body);
          const limit = numberParam(body.page?.limit, 30, 1, 50);
          const result = await store.matchBuyerRequirement(requirement, {
            limit,
            cursor: body.page?.cursor || null,
            candidateLimit: config.search?.maxCandidates || 500,
            queryMaxTimeMs: config.search?.queryMaxTimeMs || 2_000,
          });
          logger.info("buyer-match.search", "Buyer requirement search completed", {
            requestId, elapsedMs: Date.now() - searchStartedAt,
            total: result.total, evaluated: result.evaluated, returned: result.matches.length,
            truncated: result.truncated, transactionType: requirement.transactionType,
            locationCount: requirement.locations.length,
            requiredAmenityCount: requirement.requiredAmenities.length,
          });
          return sendJson(response, 200, {
          schemaVersion: "1.0.0",
          generatedAt: new Date().toISOString(),
          requirement,
          total: result.total,
          evaluated: result.evaluated,
          truncated: result.truncated,
          nextCursor: result.nextCursor,
          model: result.model,
            matches: result.matches.map((row) => ({
            matchScore: row.matchScore,
            components: row.components,
            reasons: row.reasons,
            marketScore: row.market ? {
              rank: row.market.rank,
              recommendation: row.market.recommendation,
              confidence: row.market.confidence,
              propertyQuality: row.market.propertyQuality,
              risk: row.market.risk,
              band: row.market.band,
            } : null,
            listing: externalListing(row.listing),
            })),
          });
        } finally {
          activeBuyerSearches -= 1;
        }
      }

      const isDataQualityRequest = url.pathname === "/data-quality-data" || (
        url.pathname === "/data-quality" && !request.headers.accept?.includes("text/html")
      );
      if (request.method === "GET" && isDataQualityRequest) {
        const [scoredDocument, scoringReport] = await Promise.all([
          readScoredDocument(), readJson(config.paths.scoringReport, null),
        ]);
        return sendJson(response, 200, buildDataQualityBaseline({
          listings: store.getListings(), scoredDocument, scoringReport,
        }));
      }

      if (request.method === "GET" && url.pathname === "/dashboard") {
        const [analyticsDocument, savedServiceState, scoredDocument] = await Promise.all([
          readJson(config.paths.analytics, analytics.publicSnapshot()),
          store.readServiceState(),
          readScoredDocument(),
        ]);
        const liveCrawl = crawler.snapshot();
        const dashboardCrawl = liveCrawl.status === "idle" && savedServiceState?.crawl
          ? savedServiceState.crawl
          : liveCrawl;
        const sourceRecommendations = Array.isArray(analyticsDocument.recommendations)
          ? analyticsDocument.recommendations
          : scoredDocument?.listings
            ? []
            : analytics.recommendations(100);
        if (!scoredDocument?.listings) {
          const analysisCacheKey = [
            analyticsDocument.generatedAt || analyticsDocument.updatedAt || "unknown",
            sourceRecommendations.length,
            Math.floor(Date.now() / 3_600_000),
          ].join(":");
          if (recommendationAnalysisCache.key !== analysisCacheKey) {
            recommendationAnalysisCache = {
              key: analysisCacheKey,
              value: new Map(sourceRecommendations.map((item) => [
                item.token,
                item.components ? item : analytics.analyzeListing(item.token),
              ])),
            };
          }
        }
        return sendJson(response, 200, buildDashboardPayload({
          crawl: dashboardCrawl,
          analyticsDocument,
          listings: store.getListings(),
          recommendations: sourceRecommendations,
          recommendationAnalyses: recommendationAnalysisCache.value,
          scoredDocument,
          recentEvents: logger.getRecent(40),
        }));
      }

      if (request.method === "GET" && url.pathname === "/scores") {
        const document = await readScoredDocument();
        if (!document?.listings) {
          return sendJson(response, 404, {
            error: "scores-not-generated",
            message: "Run npm run score inside owj-market-analytics.",
          });
        }
        const offset = numberParam(url.searchParams.get("offset"), 0, 0, 1_000_000);
        const limit = numberParam(url.searchParams.get("limit"), 100, 1, 500);
        const query = (url.searchParams.get("query") || "").trim().toLocaleLowerCase("fa");
        const band = url.searchParams.get("band") || "all";
        const direction = url.searchParams.get("direction") === "asc" ? 1 : -1;
        const sort = url.searchParams.get("sort") || "recommendation";
        const numericValue = (item) => ({
          rank: item.rank,
          recommendation: item.scores.recommendation,
          dealValue: item.scores.dealValue,
          modelValue: item.scores.modelValue,
          nearbyValue: item.scores.nearbyValue,
          localPosition: item.scores.localPosition,
          confidence: item.scores.confidence,
          dataQuality: item.scores.dataQuality,
          propertyQuality: item.scores.propertyQuality,
          risk: item.scores.risk,
          modelDiscountPct: item.valuation.modelDiscountPct,
          nearbyDiscountPct: item.valuation.nearbyDiscountPct,
          askingPrice: item.asking.askingPrice,
        })[sort] ?? item.scores.recommendation;
        const filtered = document.listings
          .filter((item) => band === "all" || item.scores.band === band)
          .filter((item) => !query || `${item.title} ${item.token} ${item.neighborhood}`
            .toLocaleLowerCase("fa").includes(query))
          .sort((left, right) => {
            if (sort === "listing") {
              return left.title.localeCompare(right.title, "fa") * direction || left.rank - right.rank;
            }
            return (numericValue(left) - numericValue(right)) * direction || left.rank - right.rank;
          });
        return sendJson(response, 200, {
          schemaVersion: "1.0.0",
          scoringVersion: document.scoringVersion,
          generatedAt: document.generatedAt,
          total: document.listings.length,
          filteredTotal: filtered.length,
          offset,
          limit,
          summary: document.summary,
          modelValidation: document.modelValidation,
          valuationValidation: document.valuationValidation || document.summary?.valuationValidation,
          listings: filtered.slice(offset, offset + limit),
        });
      }

      const scoreDetailMatch = url.pathname.match(/^\/score-details\/([A-Za-z0-9_-]+)$/);
      if (request.method === "GET" && scoreDetailMatch) {
        const document = await readScoredDocument();
        if (!document?.listings) {
          return sendJson(response, 404, { error: "scores-not-generated" });
        }
        const fullListing = typeof store.scoredListingSnapshot === "function"
          ? await store.scoredListingSnapshot(scoreDetailMatch[1], { modelId: document.source?.modelId })
          : null;
        const detail = buildScoreDetail(document, scoreDetailMatch[1], fullListing);
        return detail
          ? sendJson(response, 200, detail)
          : sendJson(response, 404, { error: "scored-listing-not-found", token: scoreDetailMatch[1] });
      }

      if (request.method === "GET" && url.pathname === "/score-analytics-data") {
        const [document, report] = await Promise.all([
          readScoredDocument(),
          readJson(config.paths.scoringReport, {}),
        ]);
        if (!document?.listings) {
          return sendJson(response, 404, { error: "scores-not-generated" });
        }
        return sendJson(response, 200, buildScoringAnalytics(document, report));
      }

      if (request.method === "GET" && url.pathname === "/score-workshop-data") {
        const document = await readScoredDocument();
        if (!document?.listings) return sendJson(response, 404, { error: "scores-not-generated" });
        return sendJson(response, 200, buildScoringWorkshop(document));
      }

      if (request.method === "GET" && url.pathname === "/model-versions") {
        if (typeof store.queryModelVersions !== "function") return sendJson(response, 503, { error: "mongodb-required" });
        const kind = url.searchParams.get("kind") || undefined;
        const limit = numberParam(url.searchParams.get("limit"), 50, 1, 500);
        return sendJson(response, 200, { models: await store.queryModelVersions({ kind, limit }) });
      }

      if (request.method === "GET" && url.pathname === "/training-runs") {
        if (typeof store.queryTrainingRuns !== "function") return sendJson(response, 503, { error: "mongodb-required" });
        const limit = numberParam(url.searchParams.get("limit"), 50, 1, 500);
        return sendJson(response, 200, { runs: await store.queryTrainingRuns({ limit }) });
      }

      if (request.method === "GET" && url.pathname === "/model-drift") {
        if (typeof store.queryDriftMetrics !== "function") return sendJson(response, 503, { error: "mongodb-required" });
        const limit = numberParam(url.searchParams.get("limit"), 50, 1, 500);
        return sendJson(response, 200, { metrics: await store.queryDriftMetrics({ limit }) });
      }

      const modelPromotionMatch = url.pathname.match(/^\/model-versions\/([A-Za-z0-9_-]+)\/promote$/);
      if (request.method === "POST" && modelPromotionMatch) {
        if (typeof store.promoteModel !== "function") return sendJson(response, 503, { error: "mongodb-required" });
        return sendJson(response, 200, { model: await store.promoteModel(modelPromotionMatch[1]) });
      }

      if (request.method === "POST" && url.pathname === "/model-versions/rollback") {
        if (typeof store.rollbackModel !== "function") return sendJson(response, 503, { error: "mongodb-required" });
        const body = await readJsonBody(request);
        if (!['batch-price', 'online-ridge'].includes(body.kind)) {
          throw Object.assign(new Error("kind must be batch-price or online-ridge"), { status: 400 });
        }
        return sendJson(response, 200, { model: await store.rollbackModel(body.kind) });
      }

      const scoreHistoryMatch = url.pathname.match(/^\/listings\/([A-Za-z0-9_-]+)\/score-history$/);
      if (request.method === "GET" && scoreHistoryMatch) {
        if (typeof store.listingScoreHistory !== "function") return sendJson(response, 503, { error: "mongodb-required" });
        const limit = numberParam(url.searchParams.get("limit"), 50, 1, 500);
        return sendJson(response, 200, {
          token: scoreHistoryMatch[1],
          scores: await store.listingScoreHistory(scoreHistoryMatch[1], { limit }),
        });
      }

      if (request.method === "GET" && url.pathname === "/scoring-scenarios") {
        if (!config.mongoUri) return sendJson(response, 503, { error: "mongodb-required" });
        const scenarios = await ScoringScenario.find({ active: true }).sort({ updatedAt: -1 }).lean({ flattenMaps: true });
        return sendJson(response, 200, { scenarios: scenarios.map(plainScenario) });
      }

      if (request.method === "POST" && url.pathname === "/scoring-scenarios") {
        if (!config.mongoUri) return sendJson(response, 503, { error: "mongodb-required" });
        const body = await readJsonBody(request);
        const scoredDocument = await readScoredDocument();
        const scenario = scenarioDocument(body, scoredDocument?.scoringVersion);
        await ScoringScenario.create(scenario);
        return sendJson(response, 201, plainScenario(scenario));
      }

      const scenarioUpdateMatch = url.pathname.match(/^\/scoring-scenarios\/([A-Za-z0-9_-]+)$/);
      if (request.method === "PUT" && scenarioUpdateMatch) {
        if (!config.mongoUri) return sendJson(response, 503, { error: "mongodb-required" });
        const existing = await ScoringScenario.findOne({ scenarioId: scenarioUpdateMatch[1] }).lean({ flattenMaps: true });
        if (!existing) return sendJson(response, 404, { error: "scenario-not-found" });
        const body = await readJsonBody(request);
        const scoredDocument = await readScoredDocument();
        const scenario = scenarioDocument(body, scoredDocument?.scoringVersion, plainScenario(existing));
        await ScoringScenario.replaceOne({ scenarioId: scenario.scenarioId }, scenario, { runValidators: true });
        return sendJson(response, 200, plainScenario(scenario));
      }

      const scenarioScoresMatch = url.pathname.match(/^\/scoring-scenarios\/([A-Za-z0-9_-]+)\/scores$/);
      if (request.method === "GET" && scenarioScoresMatch) {
        const [stored, scoredDocument] = await Promise.all([
          ScoringScenario.findOne({ scenarioId: scenarioScoresMatch[1], active: true }).lean({ flattenMaps: true }),
          readScoredDocument(),
        ]);
        if (!stored) return sendJson(response, 404, { error: "scenario-not-found" });
        if (!scoredDocument?.listings) return sendJson(response, 404, { error: "scores-not-generated" });
        const calculated = calculateScenario(scoredDocument, stored);
        const { offset, limit } = normalizeListingPage({
          offset: url.searchParams.get("offset") ?? undefined,
          limit: url.searchParams.get("limit") ?? undefined,
        });
        const rows = calculated.rows.flatMap((row) => {
          const listing = store.getListing(row.token);
          if (!listing || !matchesListingQuery(listing, url)
            || !matchesScoreQuery(row, url, { scenario: true })) return [];
          return [{
            ...externalListing(listing),
            scenarioScore: {
              scenarioId: calculated.scenarioId, scenarioName: calculated.name,
              rank: row.scenario.rank, recommendation: row.scenario.recommendation,
              band: row.scenario.band, dealValue: row.scenario.dealValue,
              propertyQuality: row.scenario.property.score,
              neighborhoodScore: row.scenario.neighborhoodScore,
              confidenceGate: Number(row.scenario.confidenceGate.toFixed(4)),
              riskGate: Number(row.scenario.riskGate.toFixed(4)),
            },
          }];
        });
        return sendJson(response, 200, {
          scenario: { scenarioId: calculated.scenarioId, name: calculated.name, description: calculated.description },
          summary: calculated.summary, total: rows.length, offset, limit,
          listings: rows.slice(offset, offset + limit),
        });
      }

      const listingScenarioScoresMatch = url.pathname.match(/^\/listings\/([A-Za-z0-9_-]+)\/scenario-scores$/);
      if (request.method === "GET" && listingScenarioScoresMatch) {
        const scoredDocument = await readScoredDocument();
        if (!scoredDocument?.listings) return sendJson(response, 404, { error: "scores-not-generated" });
        const scenarios = await ScoringScenario.find({ active: true }).sort({ updatedAt: -1 }).lean({ flattenMaps: true });
        const scores = scenarios.flatMap((stored) => {
          const calculated = calculateScenario(scoredDocument, stored);
          const row = calculated.rows.find((item) => item.token === listingScenarioScoresMatch[1]);
          return row ? [{
            scenarioId: calculated.scenarioId, name: calculated.name,
            rank: row.scenario.rank, recommendation: row.scenario.recommendation,
            band: row.scenario.band, dealValue: row.scenario.dealValue,
            propertyQuality: row.scenario.property.score,
            neighborhoodScore: row.scenario.neighborhoodScore,
          }] : [];
        });
        return sendJson(response, 200, { scores });
      }

      if (request.method === "GET" && url.pathname === "/scoring-report") {
        const report = await readJson(config.paths.scoringReport, null);
        return report
          ? sendJson(response, 200, report)
          : sendJson(response, 404, { error: "scoring-report-not-generated" });
      }

      if (request.method === "POST" && url.pathname === "/crawl") {
        const result = await Promise.resolve(crawler.start());
        status = result.started ? 202 : 409;
        return sendJson(response, status, result);
      }

      if (request.method === "GET" && url.pathname === "/crawl") {
        return sendJson(response, 200, crawler.snapshot());
      }

      if (request.method === "POST" && url.pathname === "/area-crawl-jobs") {
        const body = await readJsonBody(request, 2_000);
        const areaId = Number(body.areaId);
        if (!Number.isInteger(areaId)) {
          return sendJson(response, 400, { error: "invalid-area-id" });
        }
        const result = await Promise.resolve(crawler.startAreaJob(areaId));
        const statusByReason = {
          "area-not-found": 404,
          "full-crawl-running": 409,
          "crawler-busy": 409,
          "platform-cooldown": 429,
          "area-job-cooldown": 429,
        };
        const statusCode = result.started || result.accepted ? 202
          : result.deduplicated && result.reason === "area-job-already-running" ? 200
            : statusByReason[result.reason] || 409;
        return sendJson(response, statusCode, result);
      }

      const areaJobMatch = url.pathname.match(/^\/area-crawl-jobs\/([A-Za-z0-9-]+)$/);
      if (request.method === "GET" && areaJobMatch) {
        const job = await Promise.resolve(crawler.getAreaJob(areaJobMatch[1]));
        return job
          ? sendJson(response, 200, { job })
          : sendJson(response, 404, { error: "area-job-not-found" });
      }

      if (request.method === "GET" && url.pathname === "/crawl-runs") {
        const limit = numberParam(url.searchParams.get("limit"), 20, 1, 200);
        const runs = typeof store.queryCrawlRuns === "function" ? await store.queryCrawlRuns({ limit }) : [];
        return sendJson(response, 200, { schemaVersion: "1.0.0", total: runs.length, runs });
      }

      if (request.method === "GET" && url.pathname === "/listings") {
        const { offset, limit } = normalizeListingPage({
          offset: url.searchParams.get("offset") ?? undefined,
          limit: url.searchParams.get("limit") ?? undefined,
        });
        const districts = url.searchParams.getAll("district").filter((value) => value && value !== "all");
        const area = url.searchParams.get("area");
        const category = url.searchParams.get("category");
        const advertiserType = url.searchParams.get("advertiserType");
        const query = url.searchParams.get("q");
        const readiness = url.searchParams.get("readiness");
        const lifecycleStatus = url.searchParams.get("status");
        const numeric = (name) => { const value = Number(url.searchParams.get(name)); return Number.isFinite(value) && url.searchParams.has(name) ? value : undefined; };
        const amenities = url.searchParams.getAll("amenity").filter((value) => /^[a-zA-Z]+$/.test(value));
        if (typeof store.queryListings === "function") {
          const result = await store.queryListings({ offset, limit, districts, area, category, advertiserType, query, readiness, status: lifecycleStatus,
            minPrice: numeric("minPrice"), maxPrice: numeric("maxPrice"), minPricePerMeter: numeric("minPricePerMeter"), maxPricePerMeter: numeric("maxPricePerMeter"),
            minArea: numeric("minArea"), maxArea: numeric("maxArea"), minRooms: numeric("minRooms"), minYear: numeric("minYear"), amenities,
            minScore: numeric("minScore"), maxScore: numeric("maxScore"), minConfidence: numeric("minConfidence"), maxRisk: numeric("maxRisk"),
            scoreBand: url.searchParams.get("scoreBand") || undefined });
          return sendJson(response, 200, {
            schemaVersion: "1.0.0", generatedAt: new Date().toISOString(), total: result.total,
            offset, limit, hasMore: offset + result.listings.length < result.total,
            listings: result.listings.map(externalListing),
          });
        }
        const all = store.getListings().filter((listing) => {
          const matchesDistrict = !districts.length || districts.some((district) =>
            listing.district === district || listing.neighborhood === district ||
            listing.crawlPartition?.area?.name === district || listing.crawlPartition?.area?.slug === district ||
            listing.crawlPartition?.area?.municipalDistricts?.includes(Number(district)));
          const partitionArea = listing.crawlPartition?.area;
          const matchesArea = !area || [partitionArea?.slug, partitionArea?.name, String(partitionArea?.id)]
            .filter(Boolean)
            .includes(area);
          const matchesCategory = !category ||
            listing.crawlPartition?.category === category ||
            listing.subcategory === category;
          const matchesAdvertiser = !advertiserType || listing.advertiserType === advertiserType;
          return matchesDistrict && matchesArea && matchesCategory && matchesAdvertiser;
        });
        return sendJson(response, 200, {
          schemaVersion: "1.0.0",
          generatedAt: new Date().toISOString(),
          total: all.length,
          offset,
          limit,
          hasMore: offset + Math.min(limit, Math.max(0, all.length - offset)) < all.length,
          listings: all.slice(offset, offset + limit).map(externalListing),
        });
      }

      const publicListingMatch = url.pathname.match(/^\/listings\/([A-Za-z0-9_-]+)$/);
      if (request.method === "GET" && publicListingMatch) {
        const listing = store.getListing(publicListingMatch[1]);
        return listing
          ? sendJson(response, 200, externalListing(listing))
          : sendJson(response, 404, { error: "listing-not-found", token: publicListingMatch[1] });
      }

      const refetchListingMatch = url.pathname.match(/^\/listings\/([A-Za-z0-9_-]+)\/refetch$/);
      if (request.method === "POST" && refetchListingMatch) {
        try {
          const result = await crawler.refetchListing(refetchListingMatch[1]);
          return result
            ? sendJson(response, 200, { changed: result.changed, listing: externalListing(result.listing) })
            : sendJson(response, 404, { error: "listing-not-found", token: refetchListingMatch[1] });
        } catch (error) {
          logger.warn("http.listing.refetch.failed", "Manual public listing refetch failed", {
            token: refetchListingMatch[1], status: error.status ?? null, error: error.message,
          });
          return sendJson(response, error.status === 404 ? 404 : 502, { error: "listing-refetch-failed", message: error.message });
        }
      }

      const nearbyMatch = url.pathname.match(/^\/listings\/([A-Za-z0-9_-]+)\/nearby-places$/);
      if (request.method === "POST" && nearbyMatch) {
        const listing = store.getListing(nearbyMatch[1]);
        if (!listing) return sendJson(response, 404, { error: "listing-not-found" });
        try {
          const nearbyPlaces = await fetchNearbyPlaces({
            latitude: listing.coordinates?.latitude,
            longitude: listing.coordinates?.longitude,
            apiKey: config.neshanServiceKey,
            radiusMeters: config.neshanNearbyRadiusMeters,
            resultsPerLayer: config.neshanNearbyResultsPerLayer,
          });
          const updated = await store.updateNearbyPlaces(listing.token, nearbyPlaces);
          return sendJson(response, 200, { nearbyPlaces, listing: externalListing(updated) });
        } catch (error) {
          logger.warn("http.listing.nearby.failed", "Nearby place lookup failed", { token: listing.token, error: error.message });
          const missingKey = error.code === "missing-api-key";
          return sendJson(response, missingKey ? 503 : 502, {
            error: missingKey ? "neshan-services-not-configured" : "nearby-place-lookup-failed",
            message: error.message,
          });
        }
      }

      const locationMatch = url.pathname.match(/^\/locations(?:\/([a-z0-9-]+))?$/i);
      if (request.method === "GET" && locationMatch) {
        const scoredDocument = await readScoredDocument();
        const view = buildLocationView({
          identifier: locationMatch[1] || "iran",
          listings: store.getListings(),
          scoredListings: scoredDocument?.listings || [],
        });
        return view
          ? sendJson(response, 200, view)
          : sendJson(response, 404, { error: "location-not-found", identifier: locationMatch[1] });
      }

      const listingMatch = url.pathname.match(/^\/listings\/([A-Za-z0-9_-]+)\/analysis$/);
      if (request.method === "GET" && listingMatch) {
        const analysis = analytics.analyzeListing(listingMatch[1]);
        if (!analysis) return sendJson(response, 404, { error: "listing-not-found", token: listingMatch[1] });
        return sendJson(response, 200, analysis);
      }

      if (request.method === "GET" && url.pathname === "/areas") {
        return sendJson(response, 200, {
          schemaVersion: "1.1.0",
          generatedAt: new Date().toISOString(),
          spatialCellSizeMeters: analytics.spatialCellSizeMeters,
          areas: analytics.spatialMetrics(),
        });
      }

      const areaMatch = url.pathname.match(/^\/areas\/(.+)$/);
      if (request.method === "GET" && areaMatch) {
        const areaId = decodeURIComponent(areaMatch[1]);
        return sendJson(response, 200, {
          schemaVersion: "1.1.0",
          generatedAt: new Date().toISOString(),
          areaId,
          metrics: analytics.spatialMetrics().filter((item) => item.area.id === areaId),
        });
      }

      if (request.method === "GET" && url.pathname === "/recommendations") {
        const limit = numberParam(url.searchParams.get("limit"), 20, 1, 100);
        return sendJson(response, 200, {
          schemaVersion: "1.0.0",
          generatedAt: new Date().toISOString(),
          disclaimer: "Experimental market ranking only; not investment advice.",
          recommendations: analytics.recommendations(limit),
        });
      }

      if (request.method === "GET" && url.pathname === "/analytics") {
        return sendJson(response, 200, await readJson(
          config.paths.analytics,
          analytics.publicSnapshot(),
        ));
      }

      if (request.method === "GET" && url.pathname === "/events") {
        const limit = numberParam(url.searchParams.get("limit"), 100, 1, 500);
        return sendJson(response, 200, { events: logger.getRecent(limit) });
      }

      if (request.method === "GET" && url.pathname === "/schemas/public-listing") {
        const schema = JSON.parse(await readFile(new URL("../../schemas/public-listing.schema.json", import.meta.url), "utf8"));
        return sendJson(response, 200, schema);
      }

      if (request.method === "GET" && url.pathname === "/schemas/scoring-ready") {
        const schema = JSON.parse(await readFile(new URL("../../schemas/scoring-ready.schema.json", import.meta.url), "utf8"));
        return sendJson(response, 200, schema);
      }

      if (request.method === "GET" && url.pathname === "/schemas/scored-listings") {
        const schema = JSON.parse(await readFile(new URL("../../schemas/scored-listings.schema.json", import.meta.url), "utf8"));
        return sendJson(response, 200, schema);
      }

      if (request.method === "GET" && url.pathname === "/schemas/buyer-match-request") {
        const schema = JSON.parse(await readFile(new URL("../../schemas/buyer-match-request.schema.json", import.meta.url), "utf8"));
        return sendJson(response, 200, schema);
      }

      const isDashboardRoute = url.pathname === "/" ||
        url.pathname === "/score-analytics" ||
        url.pathname === "/score-workshop" ||
        url.pathname === "/data-quality" ||
        url.pathname === "/catalog" ||
        url.pathname === "/buyer-matching" ||
        /^\/explore(?:\/[a-z0-9-]+)?$/i.test(url.pathname) ||
        /^\/listing\/[A-Za-z0-9_-]+$/.test(url.pathname);
      if (request.method === "GET" && isDashboardRoute) {
        const sent = await sendStatic(
          response,
          new URL("../../public/index.html", import.meta.url),
          STATIC_TYPES[".html"],
        );
        if (sent) return;
        return sendJson(response, 503, {
          error: "dashboard-not-built",
          message: "Run npm run dashboard:build inside owj-market-analytics.",
        });
      }

      const assetMatch = url.pathname.match(/^\/assets\/([A-Za-z0-9_.-]+)$/);
      if (request.method === "GET" && assetMatch) {
        const extension = assetMatch[1].match(/\.[A-Za-z0-9]+$/)?.[0] || "";
        const sent = await sendStatic(
          response,
          new URL(`../../public/assets/${assetMatch[1]}`, import.meta.url),
          STATIC_TYPES[extension] || "application/octet-stream",
        );
        if (sent) return;
      }

      return sendJson(response, 404, {
        error: "not-found",
        method: request.method,
        path: url.pathname,
        routes: [
          "GET /health",
          "GET /dashboard",
          "GET /scores",
          "GET /score-details/:token",
          "GET /score-analytics-data",
          "GET /score-workshop-data",
          "GET /buyer-matches/options",
          "POST /buyer-matches/search",
          "GET /ai/voice/status",
          "POST /ai/voice/catalog-filters",
          "POST /ai/voice/speech",
          "GET /scoring-report",
          "POST /crawl",
          "GET /crawl",
          "POST /area-crawl-jobs",
          "GET /area-crawl-jobs/:jobId",
          "GET /crawl-runs",
          "GET /listings",
          "GET /listings/:token/analysis",
          "GET /areas",
          "GET /areas/:areaId",
          "GET /recommendations",
          "GET /analytics",
          "GET /events",
          "GET /schemas/public-listing",
          "GET /schemas/scoring-ready",
          "GET /schemas/scored-listings",
        ],
      });
    } catch (error) {
      logger.error("http.failure", "JSON API request failed", {
        requestId,
        method: request.method,
        path: url.pathname,
        error: error.stack || error.message,
      });
      const errorStatus = Number.isInteger(error.status) && error.status >= 400 && error.status < 600
        ? error.status : 500;
      return sendJson(response, errorStatus, {
        error: errorStatus === 500 ? "internal-error" : error.code || "invalid-request",
        message: errorStatus === 500 ? undefined : error.message,
        requestId,
      });
    }
  });
  return server;
}
