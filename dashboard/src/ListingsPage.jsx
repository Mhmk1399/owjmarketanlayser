import { useEffect, useMemo, useState } from "react";
import { AppFooter, AppHeader, Icon, formatMoney, formatNumber, injectGlobalCSS } from "./shared.jsx";

const lifecycleLabels = { active: "فعال", "not-seen": "دیده‌نشده", "possibly-removed": "احتمال حذف", removed: "حذف‌شده" };
const readinessLabels = { "scoring-ready": "آماده امتیازدهی", "history-only": "فقط سابقه" };
const advertiserLabels = { personal: "شخصی", "real-estate-business": "مشاور املاک", unknown: "نامشخص" };

function SelectFilter({ id, label, value, onChange, children }) {
  return <label className="listing-filter" htmlFor={id}>
    <span>{label}</span>
    <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>{children}</select>
  </label>;
}

function ListingCard({ listing }) {
  const details = listing.propertyDetails || {};
  const amenities = Object.entries(listing.amenities || {}).filter(([, value]) => value === true);
  return <article className="catalog-card">
    <div className="catalog-card__top">
      <div className="catalog-card__identity">
        <span className="catalog-card__location"><Icon name="location" size={15} />{listing.neighborhood || listing.district || "مکان نامشخص"}</span>
        <h2><a href={`/listing/${listing.token}`}>{listing.title}</a></h2>
        <p>{listing.description || "توضیح عمومی برای این آگهی ثبت نشده است."}</p>
      </div>
      <div className="catalog-card__price">
        <strong>{formatMoney(listing.pricing?.price)}</strong>
        <span>هر متر {formatMoney(listing.pricing?.pricePerMeter)}</span>
      </div>
    </div>
    <dl className="catalog-facts">
      <div><dt>متراژ</dt><dd>{formatNumber(listing.property?.area)} متر</dd></div>
      <div><dt>اتاق</dt><dd>{formatNumber(listing.property?.rooms)}</dd></div>
      <div><dt>سال ساخت</dt><dd>{formatNumber(listing.property?.constructionYear)}</dd></div>
      <div><dt>طبقه</dt><dd>{formatNumber(listing.property?.floor)}</dd></div>
      <div><dt>نوع ملک</dt><dd>{details.propertyType || "—"}</dd></div>
      <div><dt>تصاویر</dt><dd>{formatNumber(listing.imageCount || 0)}</dd></div>
    </dl>
    <div className="catalog-card__foot">
      <div className="catalog-tags" aria-label="ویژگی‌های آگهی">
        <span className={`status-pill status-pill--${listing.lifecycle?.status || "unknown"}`}>{lifecycleLabels[listing.lifecycle?.status] || "نامشخص"}</span>
        <span className="status-pill">{readinessLabels[listing.quality?.outcome] || "طبقه‌بندی‌نشده"}</span>
        <span className={`status-pill status-pill--advertiser-${listing.advertiserType}`}>{advertiserLabels[listing.advertiserType] || "نامشخص"}</span>
        {amenities.slice(0, 4).map(([name]) => <span className="detail-chip" key={name}>{name}</span>)}
      </div>
      <a className="catalog-detail-link" href={`/listing/${listing.token}`}>مشاهده جزئیات <Icon name="arrow" size={16} /></a>
    </div>
  </article>;
}

export default function ListingsPage() {
  injectGlobalCSS();
  const initial = new URLSearchParams(window.location.search);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(initial.get("q") || "");
  const [district, setDistrict] = useState(initial.get("district") || "all");
  const [category, setCategory] = useState(initial.get("category") || "all");
  const [readiness, setReadiness] = useState(initial.get("readiness") || "all");
  const [lifecycle, setLifecycle] = useState(initial.get("status") || "active");
  const [advertiserType, setAdvertiserType] = useState(initial.get("advertiserType") || "all");
  const [facets, setFacets] = useState({ districts: [], categories: [], bounds: {} });
  const [total, setTotal] = useState(0);
  const [minPrice, setMinPrice] = useState(initial.get("minPrice") || ""); const [maxPrice, setMaxPrice] = useState(initial.get("maxPrice") || "");
  const [minPricePerMeter, setMinPricePerMeter] = useState(initial.get("minPricePerMeter") || ""); const [maxPricePerMeter, setMaxPricePerMeter] = useState(initial.get("maxPricePerMeter") || "");
  const [minArea, setMinArea] = useState(initial.get("minArea") || ""); const [maxArea, setMaxArea] = useState(initial.get("maxArea") || "");
  const [minRooms, setMinRooms] = useState(initial.get("minRooms") || ""); const [minYear, setMinYear] = useState(initial.get("minYear") || "");
  const [amenities, setAmenities] = useState(initial.getAll("amenity"));

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      const params = new URLSearchParams({ limit: "100" });
      const add = (key, value) => { if (value && value !== "all") params.set(key, value); };
      add("q", query.trim()); add("district", district); add("category", category); add("readiness", readiness); add("status", lifecycle); add("advertiserType", advertiserType);
      add("minPrice", minPrice); add("maxPrice", maxPrice); add("minPricePerMeter", minPricePerMeter); add("maxPricePerMeter", maxPricePerMeter); add("minArea", minArea); add("maxArea", maxArea); add("minRooms", minRooms); add("minYear", minYear);
      amenities.forEach((value) => params.append("amenity", value)); setLoading(true);
      fetch(`/listings?${params}`, { signal: controller.signal, headers: { accept: "application/json" } }).then((response) => response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`)))
      .then((payload) => { setListings(payload.listings || []); setTotal(payload.total || 0); })
      .catch((caught) => { if (caught.name !== "AbortError") setError(caught.message); })
      .finally(() => setLoading(false));
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, district, category, readiness, lifecycle, advertiserType, minPrice, maxPrice, minPricePerMeter, maxPricePerMeter, minArea, maxArea, minRooms, minYear, amenities]);

  useEffect(() => { fetch("/listing-facets").then((response) => response.json()).then(setFacets).catch(() => {}); }, []);

  const filtered = listings;

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query); if (district !== "all") params.set("district", district);
    if (category !== "all") params.set("category", category); if (readiness !== "all") params.set("readiness", readiness);
    if (advertiserType !== "all") params.set("advertiserType", advertiserType);
    if (lifecycle !== "active") params.set("status", lifecycle);
    [["minPrice",minPrice],["maxPrice",maxPrice],["minPricePerMeter",minPricePerMeter],["maxPricePerMeter",maxPricePerMeter],["minArea",minArea],["maxArea",maxArea],["minRooms",minRooms],["minYear",minYear]].forEach(([key,value])=>{if(value)params.set(key,value)}); amenities.forEach((value)=>params.append("amenity",value));
    window.history.replaceState(null, "", `/catalog${params.size ? `?${params}` : ""}`);
  }, [query, district, category, readiness, lifecycle, advertiserType, minPrice, maxPrice, minPricePerMeter, maxPricePerMeter, minArea, maxArea, minRooms, minYear, amenities]);

  const reset = () => { setQuery(""); setDistrict("all"); setCategory("all"); setReadiness("all"); setLifecycle("active"); setAdvertiserType("all"); setMinPrice(""); setMaxPrice(""); setMinPricePerMeter(""); setMaxPricePerMeter(""); setMinArea(""); setMaxArea(""); setMinRooms(""); setMinYear(""); setAmenities([]); };
  const toggleAmenity = (name) => setAmenities((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  return <div className="listings-page" dir="rtl">
    <AppHeader active="listings" />
    <main className="listings-main" id="main-content">
      <header className="listings-hero">
        <div><span className="location-kicker"><Icon name="database" size={17} /> فهرست داده‌های عمومی</span><h1>آگهی‌های جمع‌آوری‌شده</h1><p>جزئیات عمومی ملک‌ها، دسته‌بندی‌شده بر اساس مکان، نوع آگهی، وضعیت انتشار و آمادگی تحلیل.</p></div>
        <div className="listing-total"><strong>{formatNumber(total)}</strong><span>آگهی منطبق</span></div>
      </header>
      <section className="listing-filters" aria-label="فیلتر آگهی‌ها">
        <label className="listing-filter listing-filter--search" htmlFor="listing-search"><span>جستجو</span><input id="listing-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="عنوان، محله یا شناسه آگهی" /></label>
        <SelectFilter id="district-filter" label="محله" value={district} onChange={setDistrict}><option value="all">همه محله‌ها</option>{facets.districts.map((value) => <option key={value}>{value}</option>)}</SelectFilter>
        <SelectFilter id="category-filter" label="دسته" value={category} onChange={setCategory}><option value="all">همه دسته‌ها</option>{facets.categories.map((value) => <option key={value}>{value}</option>)}</SelectFilter>
        <SelectFilter id="readiness-filter" label="پوشش داده" value={readiness} onChange={setReadiness}><option value="all">همه وضعیت‌ها</option><option value="scoring-ready">آماده امتیازدهی</option><option value="history-only">فقط سابقه</option></SelectFilter>
        <SelectFilter id="advertiser-filter" label="نوع آگهی‌دهنده" value={advertiserType} onChange={setAdvertiserType}><option value="all">همه آگهی‌دهندگان</option><option value="personal">فایل شخصی</option><option value="real-estate-business">مشاور املاک</option><option value="unknown">نامشخص</option></SelectFilter>
        <SelectFilter id="lifecycle-filter" label="وضعیت انتشار" value={lifecycle} onChange={setLifecycle}><option value="all">همه</option><option value="active">فعال</option><option value="not-seen">دیده‌نشده</option><option value="possibly-removed">احتمال حذف</option><option value="removed">حذف‌شده</option></SelectFilter>
        <button className="listing-reset" type="button" onClick={reset}>پاک‌کردن فیلترها</button>
        <div className="listing-range-card"><strong>قیمت کل</strong><label>از<input inputMode="numeric" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} placeholder="حداقل تومان" /></label><label>تا<input inputMode="numeric" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} placeholder="حداکثر تومان" /></label></div>
        <div className="listing-range-card"><strong>قیمت هر متر</strong><label>از<input inputMode="numeric" value={minPricePerMeter} onChange={(e)=>setMinPricePerMeter(e.target.value)} placeholder="حداقل" /></label><label>تا<input inputMode="numeric" value={maxPricePerMeter} onChange={(e)=>setMaxPricePerMeter(e.target.value)} placeholder="حداکثر" /></label></div>
        <div className="listing-range-card"><strong>متراژ</strong><label>از<input inputMode="numeric" value={minArea} onChange={(e)=>setMinArea(e.target.value)} placeholder="حداقل متر" /></label><label>تا<input inputMode="numeric" value={maxArea} onChange={(e)=>setMaxArea(e.target.value)} placeholder="حداکثر متر" /></label></div>
        <label className="listing-filter"><span>حداقل اتاق</span><input inputMode="numeric" value={minRooms} onChange={(e)=>setMinRooms(e.target.value)} placeholder="مثلاً ۲" /></label>
        <label className="listing-filter"><span>حداقل سال ساخت</span><input inputMode="numeric" value={minYear} onChange={(e)=>setMinYear(e.target.value)} placeholder="مثلاً ۱۳۹۵" /></label>
        <fieldset className="amenity-filter"><legend>امکانات الزامی</legend>{[["elevator","آسانسور"],["parking","پارکینگ"],["storage","انباری"],["balcony","بالکن"]].map(([key,label])=><button type="button" aria-pressed={amenities.includes(key)} className={amenities.includes(key)?"is-active":""} onClick={()=>toggleAmenity(key)} key={key}>{label}</button>)}</fieldset>
      </section>
      <div className="listing-results" role="status" aria-live="polite">نمایش {formatNumber(filtered.length)} مورد نخست از {formatNumber(total)} آگهی منطبق</div>
      {loading && <div className="location-state">در حال بارگذاری آگهی‌ها…</div>}
      {error && <div className="location-state location-state--error">بارگذاری ناموفق بود: {error}</div>}
      {!loading && !error && <section className="catalog-grid" aria-label="نتایج آگهی‌ها">
        {filtered.map((listing) => <ListingCard listing={listing} key={listing.token} />)}
        {!filtered.length && <div className="catalog-empty"><Icon name="database" size={32} /><h2>آگهی منطبقی پیدا نشد</h2><p>فیلترها را تغییر دهید یا پاک کنید.</p><button type="button" onClick={reset}>نمایش آگهی‌های فعال</button></div>}
      </section>}
    </main>
    <AppFooter />
  </div>;
}
