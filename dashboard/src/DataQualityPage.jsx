import { useEffect, useState } from "react";
import { AppFooter, AppHeader, Icon, formatNumber, injectGlobalCSS } from "./shared.jsx";

const coverageLabels = {
  description: "توضیحات عمومی", coordinates: "مختصات معتبر", images: "تصویر",
  "advertiser-classified": "نوع آگهی‌دهنده مشخص", "nearby-places": "مکان‌های اطراف",
};
const blockerLabels = {
  "not-scoring-ready": "کیفیت داده برای امتیازدهی کافی نیست",
  "missing-or-out-of-bounds-coordinates": "مختصات مفقود یا خارج از تهران",
  "invalid-or-implausible-area": "متراژ نامعتبر یا غیرمنطقی",
  "invalid-or-implausible-price": "قیمت نامعتبر یا غیرمنطقی",
  "invalid-or-implausible-price-per-meter": "قیمت هر متر نامعتبر یا غیرمنطقی",
  "subcategory-out-of-scope": "نوع ملک خارج از محدوده مدل",
  "listing-removed": "آگهی حذف شده",
};
const advertiserLabels = { personal: "شخصی", "real-estate-business": "مشاور املاک", unknown: "نامشخص" };

function Metric({ label, value, note, tone = "neutral" }) {
  return <article className={`quality-metric quality-metric--${tone}`}><span>{label}</span><strong>{formatNumber(value)}</strong><small>{note}</small></article>;
}

export default function DataQualityPage() {
  injectGlobalCSS();
  const [data, setData] = useState(null); const [error, setError] = useState("");
  useEffect(() => { const controller = new AbortController(); fetch("/data-quality", { signal: controller.signal }).then((response) => response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`))).then(setData).catch((caught) => { if (caught.name !== "AbortError") setError(caught.message); }); return () => controller.abort(); }, []);
  if (!data && !error) return <div className="listings-page" dir="rtl"><AppHeader active="quality" /><main className="quality-main"><div className="location-state">در حال محاسبه خط پایه کیفیت داده…</div></main></div>;
  if (error) return <div className="listings-page" dir="rtl"><AppHeader active="quality" /><main className="quality-main"><div className="location-state location-state--error">محاسبه کیفیت داده ناموفق بود: {error}</div></main></div>;
  const advertiser = Object.fromEntries(data.classifications.advertiser.map((item) => [item.key, item.count]));
  return <div className="listings-page" dir="rtl"><AppHeader active="quality" /><main className="quality-main" id="main-content">
    <header className="quality-hero"><div><span className="location-kicker"><Icon name="activity" size={17} /> خط پایه فاز صفر</span><h1>کنترل کیفیت و پوشش داده</h1><p>این صفحه منبع واحد اندازه‌گیری برای بک‌فیل، طبقه‌بندی و افزایش پوشش امتیازدهی است.</p></div><div className="quality-updated"><span>آخرین محاسبه</span><time dateTime={data.generatedAt}>{new Date(data.generatedAt).toLocaleString("fa-IR")}</time></div></header>
    <section className="quality-metrics" aria-label="شاخص‌های اصلی"><Metric label="کل آگهی‌ها" value={data.inventory.total} note={`${formatNumber(data.inventory.active)} آگهی فعال`} /><Metric label="واجد شرایط امتیاز" value={data.scoring.eligible} note="طبق قوانین فعلی پاک‌سازی" tone="good" /><Metric label="امتیاز ثبت‌شده" value={data.scoring.totalScored} note={`${formatNumber(data.scoring.populationCoveragePercent)}٪ از کل داده · ${formatNumber(data.scoring.coveragePercent)}٪ از واجدین`} tone={data.scoring.populationCoveragePercent >= 95 ? "good" : "warn"} /><Metric label="کل آگهی‌های بدون امتیاز" value={data.scoring.unscoredTotal} note={`${formatNumber((100 - data.scoring.populationCoveragePercent).toFixed(1))}٪ از کل داده`} tone={data.scoring.unscoredTotal ? "warn" : "good"} /><Metric label="واجد شرایط ولی بدون امتیاز" value={data.scoring.eligibleUnscored} note="خطای همگام‌سازی پایپ‌لاین" tone={data.scoring.eligibleUnscored ? "warn" : "good"} /><Metric label="تغییر از آخرین امتیازدهی" value={data.scoring.staleListingsSinceScore} note="آگهی جدید یا به‌روزشده" tone={data.scoring.staleListingsSinceScore ? "warn" : "good"} /></section>
    <div className="quality-layout">
      <section className="quality-panel"><div className="quality-panel__head"><div><h2>پوشش فیلدهای کلیدی</h2><p>فاصله دقیق هر بخش تا پوشش کامل</p></div></div><div className="quality-coverage">{data.coverage.map((item) => <article key={item.key}><div><strong>{coverageLabels[item.key] || item.key}</strong><span>{formatNumber(item.count)} موجود · {formatNumber(item.missing)} مفقود</span></div><b>{formatNumber(item.percent)}٪</b><div className="quality-bar" aria-label={`${coverageLabels[item.key]} ${item.percent} درصد`}><span style={{ width: `${item.percent}%` }} /></div></article>)}</div></section>
      <section className="quality-panel"><div className="quality-panel__head"><div><h2>نوع آگهی‌دهنده</h2><p>هدف فاز طبقه‌بندی: کاهش موارد نامشخص</p></div></div><div className="quality-classifications">{["personal", "real-estate-business", "unknown"].map((key) => <div key={key}><span>{advertiserLabels[key]}</span><strong>{formatNumber(advertiser[key] || 0)}</strong><small>{formatNumber(((advertiser[key] || 0) / data.inventory.total * 100).toFixed(1))}٪</small></div>)}</div></section>
      <section className="quality-panel quality-panel--wide"><div className="quality-panel__head"><div><h2>دلایل حذف از امتیازدهی</h2><p>یک آگهی ممکن است بیش از یک مانع داشته باشد.</p></div><span className="quality-status">وضعیت پایپ‌لاین: {data.scoring.pipelineStatus}</span></div><div className="quality-table-wrap"><table className="quality-table"><thead><tr><th>مانع</th><th>تعداد</th><th>درصد کل داده</th></tr></thead><tbody>{data.blockers.map((item) => <tr key={item.reason}><td><strong>{blockerLabels[item.reason] || item.reason}</strong><code>{item.reason}</code></td><td>{formatNumber(item.count)}</td><td>{formatNumber(item.percent)}٪</td></tr>)}</tbody></table></div></section>
      <section className="quality-panel quality-panel--wide"><div className="quality-panel__head"><div><h2>سلامت خروجی امتیازدهی</h2><p>اختلاف میان وضعیت فعلی MongoDB و آخرین فایل امتیازدهی</p></div></div><dl className="quality-facts"><div><dt>زمان آخرین امتیازدهی</dt><dd>{data.scoring.generatedAt ? new Date(data.scoring.generatedAt).toLocaleString("fa-IR") : "اجرا نشده"}</dd></div><div><dt>واجد شرایط و امتیازدار</dt><dd>{formatNumber(data.scoring.eligibleScored)}</dd></div><div><dt>امتیاز قدیمی ولی اکنون غیرواجد</dt><dd>{formatNumber(data.scoring.scoredButCurrentlyIneligible)}</dd></div><div><dt>آخرین مشاهده داده</dt><dd>{data.inventory.latestListingAt ? new Date(data.inventory.latestListingAt).toLocaleString("fa-IR") : "—"}</dd></div></dl></section>
    </div>
  </main><AppFooter /></div>;
}
