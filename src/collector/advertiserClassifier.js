const BUSINESS_TYPE = /real-estate-business|business|agency|dealer|professional|premium(?:-|_)?panel|(?:^|[-_])panel$|املاک|آژانس|بنگاه|مشاور/i;
const PERSONAL_TYPE = /personal|private|individual|شخصی|مالک/i;
const EXPLICIT_BUSINESS_SOURCES = new Set([
  "public-business-flag",
  "public-business-reference-present",
  "public-business-section",
]);

const NEGATED_BUSINESS_PATTERNS = [
  /(?:^|\s)(?:املاک|آژانس|بنگاه|مشاور(?:ان|ین)?|همکار(?:ان)?)(?:\s+(?:محترم|عزیز|لطفا)){0,3}\s+(?:تماس|زنگ|پیام)(?:\s+لطفا)?\s+(?:نگیر(?:د|ید|ند)|نزن(?:د|ید|ند)|نده(?:د|ید|ند))(?=\s|$)/gu,
  /(?:^|\s)بدون\s+(?:واسطه|مشاور|املاک)(?:\s+و\s+(?:واسطه|مشاور|املاک))*(?=\s|$)/gu,
  /(?:^|\s)(?:نیازی|احتیاجی)\s+به\s+(?:مشاور|املاک|واسطه)\s+(?:نیست|ندارم|نداریم)(?=\s|$)/gu,
  /(?:^|\s)(?:به\s+)?(?:املاک|مشاور(?:ان|ین)?)\s+پاسخ\s+(?:داده\s+)?نمی\s+شود(?=\s|$)/gu,
  /(?:^|\s)(?:از\s+)?(?:املاک|مشاور(?:ان|ین)?)\s+(?:عذرخواهی|معذوریم)(?=\s|$)/gu,
  /(?:^|\s)(?:املاک|مشاور(?:ان|ین)?)\s+مزاحم\s+نشو(?:د|ید|ند)(?=\s|$)/gu,
  /(?:^|\s)مشاور(?:ان|ین)?\s+(?:نیاور(?:ید|ند)?|نیای(?:د|ید|ند)|نفرست(?:ید|ند))(?=\s|$)/gu,
  /(?:^|\s)همکاری\s+با\s+(?:املاک|مشاور(?:ان|ین)?)\s+(?:ندارم|نداریم|نمی\s+کنم|نمی\s+کنیم)(?=\s|$)/gu,
];

const BUSINESS_DESCRIPTION_PATTERNS = Object.freeze([
  ["advisor-language", /(?:^|\s)مشاور(?:ان|ین)?(?=\s|$)/u],
  ["real-estate-office-language", /(?:^|\s)(?:املاک|بنگاه)(?=\s|$)|(?:^|\s)آژانس\s+(?:املاک|مسکن)(?=\s|$)/u],
  ["sales-expert-language", /(?:^|\s)کارشناس(?:ان)?\s+(?:فروش|خرید|ملک|املاک|منطقه)(?=\s|$)/u],
  ["office-language", /(?:^|\s)(?:دفتر|مجموعه)\s+(?:املاک|مسکن|مشاور(?:ان|ین)?)(?=\s|$)/u],
  ["file-code-language", /(?:^|\s)کد\s+(?:فایل|ملک|آگهی)(?=\s|$)/u],
  ["listing-inventory-language", /(?:^|\s)(?:فایلینگ|فایل\s+های\s+مشابه|فایلهای\s+مشابه)(?=\s|$)/u],
  ["agent-visit-language", /(?:^|\s)بازدید\s+(?:با\s+)?هماهنگی\s+(?:مشاور|کارشناس)(?=\s|$)/u],
]);

export function normalizeClassificationText(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[ۀة]/g, "ه")
    .replace(/[ؤ]/g, "و")
    .replace(/[إأٱ]/g, "ا")
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    .replace(/ـ/g, " ")
    .replace(/[\u200c\u200d]/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function descriptionBusinessEvidence(description) {
  const normalized = normalizeClassificationText(description);
  let searchable = ` ${normalized} `;
  let hasNegatedBusinessLanguage = false;
  for (const pattern of NEGATED_BUSINESS_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(searchable)) hasNegatedBusinessLanguage = true;
    pattern.lastIndex = 0;
    searchable = searchable.replace(pattern, " ");
  }
  searchable = searchable.replace(/\s+/g, " ");
  const matchedSignals = BUSINESS_DESCRIPTION_PATTERNS
    .filter(([, pattern]) => pattern.test(searchable))
    .map(([signal]) => signal);
  return { matchedSignals, hasNegatedBusinessLanguage };
}

function uniqueSources(values) {
  return [...new Set(values.filter((value) => typeof value === "string" && value.trim()).map((value) => value.trim()))];
}

export function classifyAdvertiser(advertiser = {}, description = null) {
  const originalSources = Array.isArray(advertiser.classificationSource)
    ? advertiser.classificationSource : [];
  const descriptionDerived = originalSources.some((source) => source.startsWith("description-"));
  const previousBusinessLanguage = originalSources
    .filter((source) => source.startsWith("description-business-language:"));
  const previousBusinessNegation = originalSources.includes("description-business-negation");
  const type = String(advertiser.type || "");
  const panelType = String(advertiser.panelType || "");
  const explicitBusiness = advertiser.hasBusinessReference === true
    || advertiser.hasBusinessBadge === true
    || originalSources.some((source) => EXPLICIT_BUSINESS_SOURCES.has(source))
    || (!descriptionDerived && advertiser.isBusiness === true)
    || (!descriptionDerived && BUSINESS_TYPE.test(type))
    || BUSINESS_TYPE.test(panelType);
  const explicitPersonal = (!descriptionDerived && advertiser.isBusiness === false)
    || (!descriptionDerived && PERSONAL_TYPE.test(type))
    || PERSONAL_TYPE.test(panelType);
  const evidence = descriptionBusinessEvidence(description);

  if (explicitBusiness) return {
    type: "real-estate-business",
    isBusiness: true,
    confidence: "high",
    classificationSource: uniqueSources(originalSources),
  };
  if (evidence.matchedSignals.length || previousBusinessLanguage.length) return {
    type: "real-estate-business",
    isBusiness: true,
    confidence: "medium",
    classificationSource: uniqueSources([
      ...originalSources.filter((source) => !source.startsWith("description-")),
      ...previousBusinessLanguage,
      ...evidence.matchedSignals.map((signal) => `description-business-language:${signal}`),
    ]),
  };
  if (explicitPersonal) return {
    type: "personal",
    isBusiness: false,
    confidence: "high",
    classificationSource: uniqueSources(originalSources),
  };
  if (evidence.hasNegatedBusinessLanguage || previousBusinessNegation) return {
    type: "personal",
    isBusiness: false,
    confidence: "medium",
    classificationSource: uniqueSources([
      ...originalSources.filter((source) => !source.startsWith("description-")),
      "description-business-negation",
    ]),
  };
  return {
    type: "personal",
    isBusiness: false,
    confidence: "low",
    classificationSource: uniqueSources([
      ...originalSources.filter((source) => !source.startsWith("description-")),
      "description-no-business-language",
    ]),
  };
}
