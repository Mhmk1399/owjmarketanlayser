import test from "node:test";
import assert from "node:assert/strict";
import {
  adaptPublicPostDocument,
  fetchPublicPostDocument,
  publicPostUrl,
} from "../src/collector/divarPost.js";
import {
  _publicListingHelpers,
  crawlPublicListing,
} from "../src/collector/publicListing.js";

function postDocument() {
  return {
    sections: [{
      section_name: "POST_PAGE",
      widgets: [
        {
          widget_type: "BREADCRUMB",
          data: {
            parent_items: [{ title: "املاک" }, { title: "فروش مسکونی" }],
            current_page_title: "فروش آپارتمان",
          },
        },
        {
          widget_type: "LEGEND_TITLE_ROW",
          data: { title: "آپارتمان ۷۰ متری" },
        },
        {
          widget_type: "EXPANDABLE_SECTION",
          data: { title: "هفته پیش در تهران، جنت‌آباد جنوبی" },
        },
        {
          widget_type: "DESCRIPTION_ROW",
          data: { text: "توضیحات عمومی آگهی" },
        },
        {
          widget_type: "GROUP_INFO_ROW",
          data: {
            items: [
              { title: "متراژ", value: "۷۰" },
              { title: "ساخت", value: "۱۳۹۳" },
              { title: "اتاق", value: "۲" },
            ],
          },
        },
        { widget_type: "UNEXPANDABLE_ROW", data: { title: "قیمت کل", value: "۱۷,۰۰۰,۰۰۰,۰۰۰ تومان" } },
        { widget_type: "UNEXPANDABLE_ROW", data: { title: "قیمت هر متر", value: "۲۴۲,۸۵۷,۰۰۰ تومان" } },
        { widget_type: "UNEXPANDABLE_ROW", data: { title: "طبقه", value: "۳" } },
        {
          widget_type: "GROUP_FEATURE_ROW",
          data: {
            items: [
              { title: "آسانسور", available: true },
              { title: "پارکینگ", available: true },
              { title: "انباری", available: false },
            ],
          },
        },
        {
          widget_type: "IMAGE_CAROUSEL",
          data: {
            items: [
              { image: { url: "https://postimage.divarcdn.com/one.webp" } },
              { image: { url: "https://postimage.divarcdn.com/two.webp" } },
            ],
          },
        },
        {
          widget_type: "MAP_ROW",
          data: {
            location: {
              type: "FUZZY",
              fuzzy_data: {
                point: { latitude: 35.749241390960364, longitude: 51.310919680468345 },
                radius: 500,
              },
            },
          },
        },
      ],
    }],
    seo: {
      web_info: {
        title: "آپارتمان ۷۰ متری جنت آباد",
        city_persian: "تهران",
        district_persian: "جنت‌آباد جنوبی",
        category_slug_persian: "فروش آپارتمان",
      },
    },
    analytics: {
      cat1: "real-estate",
      cat2: "residential-sell",
      cat3: "apartment-sell",
    },
    webengage: { business_type: "personal" },
    share: { web_url: "https://divar.ir/v/ga5V5az7" },
    contact: {
      phone: "09121111111",
      access_token: "must-not-be-retained",
    },
  };
}

const discovered = {
  token: "ga5V5az7",
  url: "https://divar.ir/v/ga5V5az7",
  category: "buy-apartment",
  expectedSubcategory: "buy-residential-apartment",
  area: { id: 148, name: "جنت‌آباد جنوبی", slug: "south-janat-abad" },
};

test("posts-v2 adapter extracts public housing fields and drops contact metadata", () => {
  const raw = adaptPublicPostDocument(postDocument(), discovered);
  assert.equal(raw.title, "آپارتمان ۷۰ متری جنت آباد");
  assert.equal(raw.structuredAttributes["متراژ"], "۷۰");
  assert.deepEqual(raw.amenities, { elevator: true, parking: true, storage: false });
  assert.equal(raw.images.length, 2);
  assert.equal(raw.advertiserSignals.type, "personal");
  assert.equal(Object.hasOwn(raw, "contact"), false);
  assert.doesNotMatch(JSON.stringify(raw), /09121111111|must-not-be-retained/);

  const listing = _publicListingHelpers.normalizePublicListing(raw, null);
  assert.equal(listing.subcategory, "buy-residential-apartment");
  assert.equal(listing.city, "تهران");
  assert.equal(listing.neighborhood, "جنت‌آباد جنوبی");
  assert.deepEqual(listing.property, {
    area: 70,
    constructionYear: 1393,
    rooms: 2,
    floor: 3,
    totalFloors: null,
    unitsPerFloor: null,
  });
  assert.equal(listing.pricing.price, 17_000_000_000);
  assert.equal(listing.pricing.pricePerMeter, 242_857_143);
  assert.deepEqual(listing.coordinates, {
    latitude: 35.749241390960364,
    longitude: 51.310919680468345,
    accuracy: "approximate",
    radiusMeters: 500,
    source: "posts-v2",
  });
  assert.equal(listing.imageCount, 2);
});

test("posts-v2 adapter retains an explicitly public business display name", () => {
  const document = postDocument();
  document.analytics.business_type = "real_estate_agency";
  document.business_data = { is_business: true, name: "املاک نمونه" };
  const raw = adaptPublicPostDocument(document, discovered);
  assert.equal(raw.advertiserSignals.type, "real-estate-business");
  assert.equal(raw.advertiserSignals.isBusiness, true);
  assert.equal(raw.advertiserSignals.businessDisplayName, "املاک نمونه");
  assert.equal(raw.advertiserSignals.panelType, "real_estate_agency");
});

test("premium panel, business reference presence and image claim are extracted without retaining the reference", () => {
  const document = postDocument();
  document.analytics.cat3 = "plot-old";
  document.webengage = {
    business_type: "premium-panel",
    business_ref: "public-reference-that-must-not-be-retained",
  };
  document.sections.push({
    section_name: "BUSINESS_SECTION",
    widgets: [{ widget_type: "LAZY_SECTION", data: { request_data: { post_business_type: "premium-panel" } } }],
  }, {
    section_name: "DESCRIPTION",
    widgets: [{ widget_type: "DESCRIPTION_ROW", data: { text: "توضیحات اصلی ملک" } }],
  });
  document.sections[0].widgets.push({
    widget_type: "UNEXPANDABLE_ROW",
    data: { title: "تصویر‌ها برای همین ملک است؟", value: "خیر" },
  });
  const raw = adaptPublicPostDocument(document, discovered);
  assert.equal(raw.subcategory, "buy-residential-land");
  assert.equal(raw.description, "توضیحات اصلی ملک");
  assert.equal(raw.advertiserSignals.type, "real-estate-business");
  assert.equal(raw.advertiserSignals.panelType, "premium-panel");
  assert.equal(raw.advertiserSignals.hasBusinessReference, true);
  assert.deepEqual(raw.mediaSignals, {
    samePropertyImageClaim: false,
    claimSource: "poster-declared-public-field",
  });
  assert.doesNotMatch(JSON.stringify(raw), /public-reference-that-must-not-be-retained/);

  const listing = _publicListingHelpers.normalizePublicListing(raw, null);
  assert.equal(listing.schemaVersion, "2.0.0");
  assert.equal(listing.media.samePropertyImageClaim, false);
  assert.equal(listing.advertiserSignals.hasBusinessReference, true);
});

test("absence of explicit advertiser evidence remains unknown", () => {
  const document = postDocument();
  delete document.webengage;
  assert.equal(adaptPublicPostDocument(document, discovered).advertiserSignals.type, "unknown");
});

test("description extraction ignores publication-history rows", () => {
  const document = postDocument();
  const widgets = document.sections[0].widgets;
  widgets.find((widget) => widget.widget_type === "DESCRIPTION_ROW").data.text = "انتشار آگهی: دیروز\nآخرین به‌روزرسانی: امروز";
  widgets.push({ widget_type: "EXPANDABLE_TEXT", data: { text: "توضیحات واقعی ثبت‌شده توسط آگهی‌دهنده" } });
  assert.equal(adaptPublicPostDocument(document, discovered).description, "توضیحات واقعی ثبت‌شده توسط آگهی‌دهنده");
});

test("public post request uses the token path and minimal unauthenticated headers", async () => {
  let captured;
  const requestContext = {
    get: async (url, options) => {
      captured = { url, options };
      return {
        status: () => 200,
        json: async () => postDocument(),
        url: () => url,
      };
    },
  };

  const result = await fetchPublicPostDocument(requestContext, discovered.token);
  assert.equal(captured.url, "https://api.divar.ir/v8/posts-v2/web/ga5V5az7");
  assert.deepEqual(Object.keys(captured.options.headers).sort(), ["accept", "accept-language"]);
  assert.equal(captured.url.includes("tracker_session_id"), false);
  assert.doesNotMatch(JSON.stringify(captured.options), /cookie|authorization|access.?token/i);
  assert.equal(result.status, 200);
  assert.equal(result.document.sections.length, 1);
  assert.throws(() => publicPostUrl("bad/token"), /token is invalid/);
});

test("crawl uses posts-v2 first and only invokes HTML after a non-limit API failure", async () => {
  let htmlCalls = 0;
  const apiListing = await crawlPublicListing(null, discovered, null, {
    apiFetcher: async () => ({ document: postDocument(), status: 200 }),
    htmlExtractor: async () => {
      htmlCalls += 1;
      throw new Error("HTML should not be called");
    },
  });
  assert.equal(apiListing.coordinates.source, "posts-v2");
  assert.deepEqual(apiListing.crawlPartition, {
    category: "buy-apartment",
    expectedSubcategory: "buy-residential-apartment",
    area: { id: 148, name: "جنت‌آباد جنوبی", slug: "south-janat-abad", municipalDistricts: [] },
  });
  assert.equal(htmlCalls, 0);

  const rawFallback = adaptPublicPostDocument(postDocument(), discovered);
  const fallbackListing = await crawlPublicListing(null, discovered, null, {
    apiFetcher: async () => {
      throw new Error("temporary malformed response");
    },
    htmlExtractor: async () => {
      htmlCalls += 1;
      return rawFallback;
    },
  });
  assert.equal(fallbackListing.token, discovered.token);
  assert.equal(htmlCalls, 1);
});

test("crawl does not make an HTML request after a platform-limit response", async () => {
  let htmlCalls = 0;
  const error = Object.assign(new Error("rate limited"), { status: 429 });
  await assert.rejects(
    crawlPublicListing(null, discovered, null, {
      apiFetcher: async () => { throw error; },
      htmlExtractor: async () => { htmlCalls += 1; },
    }),
    /rate limited/,
  );
  assert.equal(htmlCalls, 0);
});
