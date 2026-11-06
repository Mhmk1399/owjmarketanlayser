import OpenAI, { toFile } from "openai";
import { OpenAIRealtimeWebSocket } from "openai/realtime/websocket";

const AMENITIES = ["elevator", "parking", "storage", "balcony"];
const STATUSES = ["active", "not-seen", "possibly-removed", "removed"];
const ADVERTISERS = ["personal", "real-estate-business", "unknown"];
const READINESS = ["scoring-ready", "history-only"];
const SCORE_BANDS = ["strong-value", "promising", "fair", "weak-value"];

const nullableString = { anyOf: [{ type: "string" }, { type: "null" }] };
const nullableNumber = { anyOf: [{ type: "number" }, { type: "null" }] };
const nullableEnum = (values) => ({ anyOf: [{ type: "string", enum: values }, { type: "null" }] });

export const CATALOG_FILTER_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "query", "districts", "category", "status", "advertiserType", "readiness", "scenarioId",
    "minPrice", "maxPrice", "minPricePerMeter", "maxPricePerMeter", "minArea", "maxArea",
    "minRooms", "minYear", "minScore", "maxScore", "minConfidence", "maxRisk", "scoreBand",
    "amenities",
  ],
  properties: {
    query: nullableString,
    districts: { type: "array", items: { type: "string" }, maxItems: 30 },
    category: nullableString,
    status: nullableEnum(STATUSES),
    advertiserType: nullableEnum(ADVERTISERS),
    readiness: nullableEnum(READINESS),
    scenarioId: nullableString,
    minPrice: nullableNumber,
    maxPrice: nullableNumber,
    minPricePerMeter: nullableNumber,
    maxPricePerMeter: nullableNumber,
    minArea: nullableNumber,
    maxArea: nullableNumber,
    minRooms: nullableNumber,
    minYear: nullableNumber,
    minScore: nullableNumber,
    maxScore: nullableNumber,
    minConfidence: nullableNumber,
    maxRisk: nullableNumber,
    scoreBand: nullableEnum(SCORE_BANDS),
    // Structured Outputs does not support JSON Schema's uniqueItems keyword.
    // normalizeCatalogVoiceFilters de-duplicates this array after generation.
    amenities: { type: "array", items: { type: "string", enum: AMENITIES } },
  },
};

function finiteOrNull(value, { minimum = 0, maximum = Number.MAX_SAFE_INTEGER } = {}) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(maximum, Math.max(minimum, number)) : null;
}

function allowedOrNull(value, allowed) {
  return allowed.has(value) ? value : null;
}

export function normalizeCatalogVoiceFilters(value, { districts = [], categories = [], scenarios = [] } = {}) {
  const allowedDistricts = new Set(districts);
  const allowedCategories = new Set(categories);
  const allowedScenarios = new Set(scenarios.map((item) => item.scenarioId));
  const normalized = {
    query: typeof value?.query === "string" ? value.query.trim().slice(0, 200) || null : null,
    districts: [...new Set(Array.isArray(value?.districts) ? value.districts : [])]
      .filter((item) => allowedDistricts.has(item)).slice(0, 30),
    category: allowedOrNull(value?.category, allowedCategories),
    status: allowedOrNull(value?.status, new Set(STATUSES)),
    advertiserType: allowedOrNull(value?.advertiserType, new Set(ADVERTISERS)),
    readiness: allowedOrNull(value?.readiness, new Set(READINESS)),
    scenarioId: allowedOrNull(value?.scenarioId, allowedScenarios),
    minPrice: finiteOrNull(value?.minPrice),
    maxPrice: finiteOrNull(value?.maxPrice),
    minPricePerMeter: finiteOrNull(value?.minPricePerMeter),
    maxPricePerMeter: finiteOrNull(value?.maxPricePerMeter),
    minArea: finiteOrNull(value?.minArea),
    maxArea: finiteOrNull(value?.maxArea),
    minRooms: finiteOrNull(value?.minRooms, { maximum: 20 }),
    minYear: finiteOrNull(value?.minYear, { maximum: 1600 }),
    minScore: finiteOrNull(value?.minScore, { maximum: 100 }),
    maxScore: finiteOrNull(value?.maxScore, { maximum: 100 }),
    minConfidence: finiteOrNull(value?.minConfidence, { maximum: 100 }),
    maxRisk: finiteOrNull(value?.maxRisk, { maximum: 100 }),
    scoreBand: allowedOrNull(value?.scoreBand, new Set(SCORE_BANDS)),
    amenities: [...new Set(Array.isArray(value?.amenities) ? value.amenities : [])]
      .filter((item) => AMENITIES.includes(item)),
  };
  return normalized;
}

function pcmToWav(pcm, sampleRate = 24_000) {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

export class OpenAIVoiceService {
  constructor({ apiKey, options = {}, client = null } = {}) {
    this.apiKey = apiKey || null;
    this.options = options;
    this.client = client || (apiKey ? new OpenAI({ apiKey, timeout: options.timeoutMs, maxRetries: 1 }) : null);
    this.active = 0;
  }

  get enabled() { return Boolean(this.client); }

  async withCapacity(operation) {
    if (!this.enabled) throw Object.assign(new Error("OpenAI voice service is not configured"), { status: 503, code: "openai-not-configured" });
    if (this.active >= (this.options.maxConcurrent || 2)) {
      throw Object.assign(new Error("OpenAI voice service is busy"), { status: 429, code: "openai-busy" });
    }
    this.active += 1;
    try {
      return await operation();
    } finally {
      this.active -= 1;
    }
  }

  async transcribe(audio, { mimeType = "audio/webm" } = {}) {
    const extension = mimeType.includes("ogg") ? "ogg" : mimeType.includes("mp4") ? "m4a" : "webm";
    const file = await toFile(audio, `catalog-voice.${extension}`, { type: mimeType });
    const result = await this.client.audio.transcriptions.create({
      file,
      model: this.options.transcriptionModel || "gpt-4o-mini-transcribe",
      language: "fa",
      response_format: "json",
    });
    return String(result.text || "").trim();
  }

  async extractFilters(transcript, context) {
    const optionContext = {
      districts: context.districts,
      categories: context.categories,
      scenarios: context.scenarios.map(({ scenarioId, name }) => ({ scenarioId, name })),
    };
    const response = await this.client.responses.create({
      model: this.options.filterModel || "gpt-5-mini",
      instructions: [
        "Convert a Persian real-estate catalog request into the supplied strict filter schema.",
        "Only use exact district, category, and scenario identifiers present in AVAILABLE_OPTIONS.",
        "Amounts are Iranian toman unless the speaker explicitly says otherwise; convert millions and billions to numbers.",
        "Do not infer filters the speaker did not request. Use null or an empty array for absent filters.",
        "Personal means advertiserType personal; agency or real-estate consultant means real-estate-business.",
      ].join(" "),
      input: `AVAILABLE_OPTIONS=${JSON.stringify(optionContext)}\nVOICE_TRANSCRIPT=${JSON.stringify(transcript)}`,
      text: {
        format: {
          type: "json_schema",
          name: "catalog_filters",
          strict: true,
          schema: CATALOG_FILTER_SCHEMA,
        },
      },
    });
    return normalizeCatalogVoiceFilters(JSON.parse(response.output_text), context);
  }

  async voiceToFilters(audio, options) {
    return this.withCapacity(async () => {
      const transcript = await this.transcribe(audio, options);
      if (!transcript) throw Object.assign(new Error("No speech was detected"), { status: 422, code: "speech-not-detected" });
      const filters = await this.extractFilters(transcript, options);
      return { transcript, filters };
    });
  }

  async synthesize(text) {
    return this.withCapacity(() => new Promise((resolve, reject) => {
      const realtime = new OpenAIRealtimeWebSocket({
        model: this.options.realtimeModel || "gpt-realtime-2.1-mini",
      }, this.client);
      const chunks = [];
      let settled = false;
      const timeout = setTimeout(() => {
        if (settled) return;
        settled = true;
        realtime.close({ code: 1000, reason: "timeout" });
        reject(Object.assign(new Error("OpenAI speech request timed out"), { status: 504 }));
      }, this.options.timeoutMs || 30_000);
      const finish = (callback) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        realtime.close({ code: 1000, reason: "complete" });
        callback();
      };
      realtime.on("error", (error) => finish(() => reject(error)));
      realtime.on("response.output_audio.delta", (event) => chunks.push(Buffer.from(event.delta, "base64")));
      realtime.on("response.done", (event) => {
        if (event.response?.status !== "completed") {
          return finish(() => reject(new Error(`OpenAI speech response ${event.response?.status || "failed"}`)));
        }
        if (!chunks.length) return finish(() => reject(new Error("OpenAI speech response contained no audio")));
        return finish(() => resolve(pcmToWav(Buffer.concat(chunks))));
      });
      realtime.socket.addEventListener("open", () => {
        realtime.send({
          type: "response.create",
          response: {
            conversation: "none",
            output_modalities: ["audio"],
            instructions: "Read the supplied Persian text naturally and clearly. Do not add any words.",
            input: [{ type: "message", role: "user", content: [{ type: "input_text", text }] }],
            audio: { output: { format: { type: "audio/pcm", rate: 24_000 }, voice: this.options.voice || "marin" } },
          },
        });
      }, { once: true });
    }));
  }
}
