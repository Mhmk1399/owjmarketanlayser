import { useEffect, useMemo, useState } from "react";
import { AppFooter, AppHeader, injectGlobalCSS } from "./shared.jsx";

const amenityLabels = {
  elevator: "آسانسور", parking: "پارکینگ", storage: "انباری", balcony: "بالکن",
  rooftop: "روف‌گاردن", lobby: "لابی", doorman: "سرایدار", security: "نگهبانی",
  pool: "استخر", sauna: "سونا", gym: "باشگاه", centralAntenna: "آنتن مرکزی",
  airConditioning: "سرمایش", heating: "گرمایش",
};

const initialRequirement = {
  transactionType: "buy", propertyTypes: ["buy-residential-apartment"], locations: [],
  minPrice: "", maxPrice: "", minDeposit: "", maxDeposit: "", minRent: "", maxRent: "",
  minArea: "", maxArea: "", minRooms: "", maxBuildingAge: "",
  requiredAmenities: [], optionalAmenities: [], urgency: "normal", financingStatus: "unknown",
};

const numberOrNull = (value) => value === "" ? null : Number(value);
const formatNumber = (value) => Number.isFinite(Number(value))
  ? new Intl.NumberFormat("fa-IR").format(Number(value)) : "—";

function SelectField({ label, value, onChange, children }) {
  return <label className="buyer-field"><span>{label}</span><select value={value} onChange={onChange}>{children}</select></label>;
}

function NumberField({ label, value, onChange, placeholder }) {
  return <label className="buyer-field"><span>{label}</span><input inputMode="numeric" min="0" type="number" value={value} onChange={onChange} placeholder={placeholder} /></label>;
}

function MatchCard({ match }) {
  const { listing, marketScore } = match;
  const image = listing.images?.[0];
  return <article className="buyer-result-card">
    <div className="buyer-result-score" aria-label={`امتیاز تطبیق ${match.matchScore} از ۱۰۰`}>
      <strong>{formatNumber(match.matchScore)}</strong><span>تطبیق</span>
    </div>
    <div className="buyer-result-image">
      {image ? <img src={image.thumbnailUrl || image.url} alt={image.alt || listing.title} loading="lazy" /> : <span>بدون تصویر</span>}
    </div>
    <div className="buyer-result-copy">
      <div className="buyer-result-heading"><div><small>{listing.neighborhood || "محله نامشخص"}</small><h2>{listing.title}</h2></div>
        <strong>{formatNumber(listing.pricing?.price)} تومان</strong></div>
      <dl className="buyer-result-facts">
        <div><dt>متراژ</dt><dd>{formatNumber(listing.property?.area)} متر</dd></div>
        <div><dt>اتاق</dt><dd>{formatNumber(listing.property?.rooms)}</dd></div>
        <div><dt>سال ساخت</dt><dd>{formatNumber(listing.property?.constructionYear)}</dd></div>
        <div><dt>امتیاز بازار</dt><dd>{formatNumber(marketScore?.recommendation)}</dd></div>
      </dl>
      <div className="buyer-result-reasons">
        {match.reasons.length ? match.reasons.map((reason) => <span key={reason}>{reason.replaceAll("-", " ")}</span>) : <span>مطابق فیلترهای الزامی</span>}
      </div>
      <a href={`/listing/${listing.token}`}>مشاهده جزئیات آگهی</a>
    </div>
  </article>;
}

export default function BuyerMatchingPage() {
  const [requirement, setRequirement] = useState(initialRequirement);
  const [options, setOptions] = useState({ propertyTypes: [], locations: [], amenities: [] });
  const [locationInput, setLocationInput] = useState("");
  const [matches, setMatches] = useState([]);
  const [summary, setSummary] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    injectGlobalCSS();
    fetch("/buyer-matches/options", { headers: { accept: "application/json" } })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`)))
      .then(setOptions).catch((caught) => setError(caught.message));
  }, []);

  const payload = useMemo(() => ({
    ...requirement,
    minPrice: numberOrNull(requirement.minPrice), maxPrice: numberOrNull(requirement.maxPrice),
    minDeposit: numberOrNull(requirement.minDeposit), maxDeposit: numberOrNull(requirement.maxDeposit),
    minRent: numberOrNull(requirement.minRent), maxRent: numberOrNull(requirement.maxRent),
    minArea: numberOrNull(requirement.minArea), maxArea: numberOrNull(requirement.maxArea),
    minRooms: numberOrNull(requirement.minRooms), maxBuildingAge: numberOrNull(requirement.maxBuildingAge),
  }), [requirement]);

  const change = (key) => (event) => setRequirement((current) => ({ ...current, [key]: event.target.value }));
  const toggleAmenity = (key, target) => setRequirement((current) => {
    const other = target === "requiredAmenities" ? "optionalAmenities" : "requiredAmenities";
    const exists = current[target].includes(key);
    return {
      ...current,
      [target]: exists ? current[target].filter((item) => item !== key) : [...current[target], key],
      [other]: current[other].filter((item) => item !== key),
    };
  });
  const addLocation = () => {
    const value = locationInput.trim();
    if (!value || requirement.locations.includes(value)) return;
    setRequirement((current) => ({ ...current, locations: [...current.locations, value] }));
    setLocationInput("");
  };

  const search = async ({ append = false } = {}) => {
    setLoading(true); setError(null);
    try {
      const response = await fetch("/buyer-matches/search", {
        method: "POST", headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify({ requirement: payload, page: { limit: 30, cursor: append ? cursor : null } }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.message || body.error || `HTTP ${response.status}`);
      setMatches((current) => append ? [...current, ...body.matches] : body.matches);
      setSummary({ total: body.total, evaluated: body.evaluated, truncated: body.truncated, model: body.model });
      setCursor(body.nextCursor);
    } catch (caught) { setError(caught.message); } finally { setLoading(false); }
  };

  return <><AppHeader active="matching" /><main className="buyer-page" dir="rtl">
    <header className="buyer-header">
      <div><a href="/catalog">بازگشت به آگهی‌ها</a><p>تطبیق تقاضای خریدار</p><h1>فایل مناسب را از میان داده‌های بازار پیدا کنید</h1>
        <span>فیلترهای الزامی در MongoDB اجرا می‌شوند و فقط حداکثر ۵۰۰ نامزد برای امتیاز تطبیق بررسی می‌شود.</span></div>
      {summary && <div className="buyer-summary"><strong>{formatNumber(summary.total)}</strong><span>فایل منطبق با شروط اصلی</span><small>{formatNumber(summary.evaluated)} فایل امتیازدهی شد</small></div>}
    </header>

    <form className="buyer-form" onSubmit={(event) => { event.preventDefault(); void search(); }}>
      <section><h2>نوع معامله و بودجه</h2><div className="buyer-grid">
        <SelectField label="نوع معامله" value={requirement.transactionType} onChange={change("transactionType")}><option value="buy">خرید</option><option value="rent">رهن و اجاره</option></SelectField>
        <SelectField label="نوع ملک" value={requirement.propertyTypes[0] || ""} onChange={(event) => setRequirement((current) => ({ ...current, propertyTypes: event.target.value ? [event.target.value] : [] }))}>
          <option value="">همه انواع</option>{options.propertyTypes.map((item) => <option key={item} value={item}>{item}</option>)}
        </SelectField>
        {requirement.transactionType === "buy" ? <><NumberField label="حداقل قیمت" value={requirement.minPrice} onChange={change("minPrice")} placeholder="تومان" /><NumberField label="حداکثر قیمت" value={requirement.maxPrice} onChange={change("maxPrice")} placeholder="تومان" /></> : <>
          <NumberField label="حداقل ودیعه" value={requirement.minDeposit} onChange={change("minDeposit")} placeholder="تومان" /><NumberField label="حداکثر ودیعه" value={requirement.maxDeposit} onChange={change("maxDeposit")} placeholder="تومان" />
          <NumberField label="حداقل اجاره" value={requirement.minRent} onChange={change("minRent")} placeholder="تومان" /><NumberField label="حداکثر اجاره" value={requirement.maxRent} onChange={change("maxRent")} placeholder="تومان" /></>}
      </div></section>

      <section><h2>موقعیت و مشخصات ملک</h2><div className="buyer-location-row"><label className="buyer-field"><span>افزودن محله</span><input list="buyer-locations" value={locationInput} onChange={(event) => setLocationInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addLocation(); } }} /></label><button type="button" onClick={addLocation}>افزودن</button></div>
        <datalist id="buyer-locations">{options.locations.map((item) => <option value={item} key={item} />)}</datalist>
        <div className="buyer-chips">{requirement.locations.map((item) => <button type="button" key={item} onClick={() => setRequirement((current) => ({ ...current, locations: current.locations.filter((value) => value !== item) }))}>{item}<span aria-hidden="true">×</span></button>)}</div>
        <div className="buyer-grid"><NumberField label="حداقل متراژ" value={requirement.minArea} onChange={change("minArea")} /><NumberField label="حداکثر متراژ" value={requirement.maxArea} onChange={change("maxArea")} /><NumberField label="حداقل اتاق" value={requirement.minRooms} onChange={change("minRooms")} /><NumberField label="حداکثر سن بنا" value={requirement.maxBuildingAge} onChange={change("maxBuildingAge")} /></div>
      </section>

      <section><h2>امکانات</h2><p className="buyer-help">هر امکان را می‌توانید الزامی یا ترجیحی کنید.</p><div className="buyer-amenities">{options.amenities.map((key) => <div key={key}><strong>{amenityLabels[key] || key}</strong><button type="button" className={requirement.requiredAmenities.includes(key) ? "is-active" : ""} onClick={() => toggleAmenity(key, "requiredAmenities")}>الزامی</button><button type="button" className={requirement.optionalAmenities.includes(key) ? "is-active is-optional" : ""} onClick={() => toggleAmenity(key, "optionalAmenities")}>ترجیحی</button></div>)}</div></section>

      <section><h2>وضعیت تقاضا</h2><div className="buyer-grid"><SelectField label="فوریت" value={requirement.urgency} onChange={change("urgency")}><option value="low">کم</option><option value="normal">عادی</option><option value="high">زیاد</option><option value="immediate">فوری</option></SelectField><SelectField label="وضعیت تأمین مالی" value={requirement.financingStatus} onChange={change("financingStatus")}><option value="unknown">نامشخص</option><option value="ready">آماده</option><option value="needs_financing">نیازمند تأمین مالی</option><option value="not_ready">آماده نیست</option></SelectField></div></section>
      {error && <p className="buyer-error" role="alert">خطا: {error}</p>}
      <div className="buyer-actions"><button type="submit" disabled={loading}>{loading ? "در حال جست‌وجو…" : "پیدا کردن فایل‌ها"}</button><button type="button" onClick={() => { setRequirement(initialRequirement); setMatches([]); setSummary(null); setCursor(null); }}>پاک کردن فرم</button></div>
    </form>

    <section className="buyer-results" aria-live="polite">
      {matches.map((match) => <MatchCard key={match.listing.token} match={match} />)}
      {!loading && summary && !matches.length && <div className="buyer-empty"><h2>فایلی پیدا نشد</h2><p>محدوده بودجه، محله یا امکانات الزامی را کمی بازتر کنید.</p></div>}
      {cursor && <button className="buyer-load-more" type="button" disabled={loading} onClick={() => void search({ append: true })}>نمایش نتایج بیشتر</button>}
    </section>
  </main><AppFooter /></>;
}
