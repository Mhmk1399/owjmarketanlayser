import { canonicalizeDivarUrl } from "../utils/divarUrl.js";
import { parseRetryAfter } from "./retry.js";

const PUBLIC_POST_ENDPOINT = "https://api.divar.ir/v8/posts-v2/web";
const TOKEN = /^[A-Za-z0-9_-]+$/;

export class DivarPublicPostError extends Error {
  constructor(message, { status = null, code = "public-post-error" } = {}) {
    super(message);
    this.name = "DivarPublicPostError";
    this.status = status;
    this.code = code;
  }
}

export function publicPostUrl(token) {
  if (!TOKEN.test(String(token || ""))) {
    throw new DivarPublicPostError("Public post token is invalid", { code: "invalid-token" });
  }
  return `${PUBLIC_POST_ENDPOINT}/${encodeURIComponent(token)}`;
}

export async function fetchPublicPostDocument(requestSource, token, { timeoutMs = 15_000 } = {}) {
  const request = typeof requestSource?.get === "function"
    ? requestSource
    : requestSource?.context?.()?.request;
  if (typeof request?.get !== "function") {
    throw new DivarPublicPostError("Public request context is unavailable", {
      code: "request-context-unavailable",
    });
  }
  const url = publicPostUrl(token);
  let response;
  try {
    response = await request.get(url, {
      failOnStatusCode: false,
      timeout: timeoutMs,
      headers: {
        accept: "application/json-filled",
        "accept-language": "fa-IR,fa;q=0.9,en;q=0.5",
      },
    });
  } catch (error) {
    throw new DivarPublicPostError(`Public post request failed: ${error.message}`, {
      code: "request-failed",
    });
  }

  const status = response.status();
  if (status !== 200) {
    const error = new DivarPublicPostError(`Public post request returned HTTP ${status}`, {
      status,
      code: "unexpected-status",
    });
    error.retryAfterMs = parseRetryAfter(response.headers?.()["retry-after"]);
    throw error;
  }

  let document;
  try {
    document = await response.json();
  } catch (error) {
    throw new DivarPublicPostError(`Public post response was not valid JSON: ${error.message}`, {
      status,
      code: "invalid-json",
    });
  }
  if (!document || !Array.isArray(document.sections)) {
    throw new DivarPublicPostError("Public post response has no sections array", {
      status,
      code: "invalid-shape",
    });
  }
  return { document, status, url: response.url?.() || url };
}

function collectWidgets(input, output = [], seen = new Set()) {
  if (!input || typeof input !== "object" || seen.has(input)) return output;
  seen.add(input);
  if (typeof input.widget_type === "string" && input.data && typeof input.data === "object") {
    output.push(input);
  }
  for (const value of Object.values(input)) collectWidgets(value, output, seen);
  return output;
}

function firstWidget(widgets, type) {
  return widgets.find((widget) => widget.widget_type === type) || null;
}

function text(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function subcategoryFor(document, breadcrumbs) {
  const cat2 = String(document.analytics?.cat2 || document.webengage?.cat_2 || "").toLowerCase();
  const cat3 = String(
    document.analytics?.cat3 || document.webengage?.cat_3 || document.webengage?.category || "",
  ).toLowerCase();
  const joined = `${cat2} ${cat3}`;
  if (/temporary|daily|villa-suite|short.?term/.test(joined)) return "short-term-rent";
  if (/apartment.*sell|sell.*apartment/.test(joined)) return "buy-residential-apartment";
  if (/(house|villa).*sell|sell.*(house|villa)/.test(joined)) return "buy-residential-villa";
  if (/(land|old-house|plot-old).*sell|sell.*(land|old-house|plot-old)|plot-old/.test(joined)) return "buy-residential-land";
  if (/apartment.*rent|rent.*apartment/.test(joined)) return "rent-residential-apartment";
  if (/(house|villa).*rent|rent.*(house|villa)/.test(joined)) return "rent-residential-villa";
  if (/commercial|office|shop|industrial|agricultural/.test(joined) && /sell/.test(joined)) return "buy-commercial";
  if (/commercial|office|shop|industrial|agricultural/.test(joined) && /rent/.test(joined)) return "rent-commercial";
  if (/residential.*sell|sell.*residential/.test(joined)) return "buy-residential";
  if (/residential.*rent|rent.*residential/.test(joined)) return "rent-residential";

  const labels = breadcrumbs.join(" ");
  if (/اجاره(?:ٔ| )?کوتاه|اجاره روزانه/.test(labels)) return "short-term-rent";
  if (/فروش آپارتمان/.test(labels)) return "buy-residential-apartment";
  if (/اجاره آپارتمان|اجارهٔ آپارتمان/.test(labels)) return "rent-residential-apartment";
  if (/فروش مسکونی/.test(labels)) return "buy-residential";
  if (/اجاره مسکونی|اجارهٔ مسکونی/.test(labels)) return "rent-residential";
  return null;
}

function attributesFrom(widgets) {
  const attributes = {};
  const add = (label, value) => {
    label = text(label);
    value = text(value);
    if (label && value) attributes[label] ??= value;
  };
  for (const widget of widgets) {
    const data = widget.data || {};
    if (widget.widget_type === "GROUP_INFO_ROW") {
      for (const item of data.items || []) add(item.title, item.value);
    } else if (widget.widget_type === "UNEXPANDABLE_ROW") {
      add(data.title, data.value);
    }
  }
  return attributes;
}

function amenitiesFrom(widgets) {
  const amenities = {};
  const labels = {
    elevator: /آسانسور/,
    parking: /پارکینگ/,
    storage: /انباری/,
    balcony: /بالکن/,
    rooftop: /روف|پشت.?بام/,
    lobby: /لابی/,
    doorman: /سرایدار|نگهبان/,
    security: /امنیت|دوربین/,
    pool: /استخر/,
    sauna: /سونا/,
    gym: /باشگاه|سالن ورزشی/,
    centralAntenna: /آنتن مرکزی/,
    airConditioning: /تهویه/,
    heating: /گرمایش/,
  };
  const accept = (item) => {
    const title = text(item?.title);
    if (!title) return;
    for (const [key, pattern] of Object.entries(labels)) {
      if (!pattern.test(title)) continue;
      amenities[key] = item.available === false || item.disabled === true || /ندارد|بدون/.test(title)
        ? false
        : true;
    }
  };
  for (const widget of widgets) {
    if (widget.widget_type === "GROUP_FEATURE_ROW") {
      for (const item of widget.data?.items || []) accept(item);
    } else if (widget.widget_type === "FEATURE_ROW") {
      accept(widget.data);
    }
  }
  return amenities;
}

function imagesFrom(widgets) {
  const images = [];
  for (const widget of widgets) {
    if (widget.widget_type !== "IMAGE_CAROUSEL") continue;
    for (const item of widget.data?.items || []) {
      const image = item.image || {};
      const url = text(image.url) || text(item.image_url);
      if (url) images.push({
        url,
        width: Number.isFinite(Number(image.width ?? item.width)) ? Number(image.width ?? item.width) : null,
        height: Number.isFinite(Number(image.height ?? item.height)) ? Number(image.height ?? item.height) : null,
        alt: text(item.alt) || text(item.title),
      });
    }
  }
  return [...new Map(images.map((image) => [image.url, image])).values()];
}

function advertiserSignalsFrom(widgets, document) {
  const businessWidgets = widgets.filter((widget) =>
    /BUSINESS|AGENCY|DEALER|PRO|SELLER|POSTER|LAZY_SECTION/.test(widget.widget_type));
  const widgetPanelType = businessWidgets
    .map((widget) => text(widget.data?.request_data?.post_business_type)
      || text(widget.data?.business_type)
      || text(widget.data?.post_business_type))
    .find(Boolean);
  const panelType = text(document.analytics?.business_type)
    || text(document.webengage?.business_type)
    || text(document.analytics?.user_type)
    || widgetPanelType;
  const businessFlag = document.business_data?.is_business
    ?? document.business?.is_business
    ?? widgets.map((widget) => widget.data?.is_business).find((value) => typeof value === "boolean");
  const hasBusinessReference = Boolean(text(document.webengage?.business_ref)
    || text(document.analytics?.business_ref)
    || text(document.business_ref));
  const searchable = businessWidgets
    .map((widget) => `${widget.widget_type} ${widget.data?.title || ""} ${widget.data?.subtitle || ""} ${widget.data?.business_type || ""}`)
    .join(" ");
  const explicitPersonal = /^(?:personal|private|individual)$/i.test(panelType || "");
  const businessMatch = /املاک|آژانس|بنگاه|agency|business|dealer|professional|premium(?:-|_)?panel|(?:^|[-_])panel$/i
    .test(`${panelType || ""} ${searchable}`);
  const hasBusinessSection = businessWidgets.some((widget) =>
    /BUSINESS|AGENCY|DEALER|PRO/.test(widget.widget_type)
      || Boolean(text(widget.data?.request_data?.post_business_type)));
  const isBusiness = typeof businessFlag === "boolean"
    ? businessFlag
    : businessMatch || hasBusinessReference || hasBusinessSection
      ? true
      : explicitPersonal ? false : null;
  const classificationSource = [
    typeof businessFlag === "boolean" ? "public-business-flag" : null,
    panelType ? "public-business-type" : null,
    hasBusinessReference ? "public-business-reference-present" : null,
    hasBusinessSection ? "public-business-section" : null,
  ].filter(Boolean);
  const explicitBusiness = isBusiness === true;
  const businessDisplayName = explicitBusiness
    ? text(document.business_data?.name)
      || text(document.business?.name)
      || businessWidgets.map((widget) => text(widget.data?.business_name)).find(Boolean)
      || null
    : null;
  return {
    type: isBusiness === true ? "real-estate-business" : isBusiness === false ? "personal" : "unknown",
    isBusiness,
    hasBusinessBadge: hasBusinessSection ? true : explicitPersonal ? false : null,
    panelType,
    hasBusinessReference,
    classificationSource,
    confidence: classificationSource.length ? "high" : "low",
    businessDisplayName,
  };
}

function breadcrumbsFrom(widgets, document) {
  const breadcrumb = firstWidget(widgets, "BREADCRUMB")?.data;
  return [...new Set([
    ...(breadcrumb?.parent_items || []).map((item) => text(item.title)),
    text(document.seo?.web_info?.category_slug_persian),
  ].filter(Boolean))];
}

function mapLocationFrom(widgets) {
  return firstWidget(widgets, "MAP_ROW")?.data?.location || null;
}

function descriptionFrom(sections, widgets, document) {
  const descriptionSection = sections.find((section) => section?.section_name === "DESCRIPTION");
  for (const widget of collectWidgets(descriptionSection || {})) {
    if (!/^(?:POST_DESCRIPTION|EXPANDABLE_TEXT|DESCRIPTION|DESCRIPTION_ROW)$/.test(widget.widget_type)) continue;
    const value = text(widget.data?.text) || text(widget.data?.description) || text(widget.data?.value);
    if (value) return value;
  }
  const priority = ["POST_DESCRIPTION", "EXPANDABLE_TEXT", "DESCRIPTION", "DESCRIPTION_ROW"];
  for (const type of priority) for (const widget of widgets) {
    if (widget.widget_type !== type) continue;
    const value = text(widget.data?.text) || text(widget.data?.description) || text(widget.data?.value);
    if (value && !/انتشار آگهی|آخرین به.?روز.?رسانی|تاریخ انتشار/.test(value)) return value;
  }
  return text(document.seo?.web_info?.description) || text(document.seo?.description) || null;
}

function mediaSignalsFrom(attributes) {
  const entry = Object.entries(attributes).find(([label]) =>
    /تصویر(?:ها|‌ها)?\s+برای\s+همین\s+ملک\s+است/.test(label.replace(/\u200c/g, "‌")));
  if (!entry) return { samePropertyImageClaim: null, claimSource: null };
  const value = String(entry[1]).trim();
  const claim = /^(?:بله|آری|yes)$/i.test(value) ? true : /^(?:خیر|نه|no)$/i.test(value) ? false : null;
  return {
    samePropertyImageClaim: claim,
    claimSource: claim === null ? null : "poster-declared-public-field",
  };
}

export function adaptPublicPostDocument(document, discovered) {
  if (!document || !Array.isArray(document.sections)) {
    throw new DivarPublicPostError("Cannot adapt a public post without sections", {
      code: "invalid-shape",
    });
  }
  const token = String(discovered?.token || document.webengage?.token || "");
  if (!TOKEN.test(token)) {
    throw new DivarPublicPostError("Cannot adapt a public post without a valid token", {
      code: "invalid-token",
    });
  }
  const widgets = collectWidgets(document.sections);
  const structuredAttributes = attributesFrom(widgets);
  const breadcrumbs = breadcrumbsFrom(widgets, document);
  const titleWidget = firstWidget(widgets, "LEGEND_TITLE_ROW")?.data;
  const breadcrumbWidget = firstWidget(widgets, "BREADCRUMB")?.data;
  const publishedWidget = firstWidget(widgets, "EXPANDABLE_SECTION")?.data;
  const mapLocation = mapLocationFrom(widgets);
  const url = canonicalizeDivarUrl(discovered?.url || document.share?.web_url || `https://divar.ir/v/${token}`);

  return {
    token,
    url,
    title: text(document.seo?.web_info?.title) || text(titleWidget?.title) || text(breadcrumbWidget?.current_page_title),
    category: text(document.analytics?.cat1) || "real-estate",
    subcategory: subcategoryFor(document, breadcrumbs),
    city: text(document.seo?.web_info?.city_persian) || text(document.city?.name),
    district: null,
    neighborhood: text(document.seo?.web_info?.district_persian),
    sourceNeighborhoodSlug: text(document.seo?.web_info?.district_slug),
    publishedText: text(publishedWidget?.title),
    description: descriptionFrom(document.sections, widgets, document),
    breadcrumbs,
    structuredAttributes,
    mediaSignals: mediaSignalsFrom(structuredAttributes),
    amenities: amenitiesFrom(widgets),
    images: imagesFrom(widgets),
    advertiserSignals: advertiserSignalsFrom(widgets, document),
    apiCoordinates: mapLocation ? [mapLocation] : [],
    extractionSource: "posts-v2",
  };
}

export const _divarPostHelpers = {
  collectWidgets,
  subcategoryFor,
  attributesFrom,
  amenitiesFrom,
  imagesFrom,
  advertiserSignalsFrom,
  descriptionFrom,
};
