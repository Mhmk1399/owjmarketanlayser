"use client";

import { useEffect, useState } from "react";
import {
  AppFooter,
  AppHeader,
  Icon,
  formatNumber,
  injectGlobalCSS,
} from "./shared.jsx";

/*
 * OWJ / Data quality
 * Presentation-only redesign. No changes to the API, state, fetched data,
 * business calculations, or routing. All styles are scoped to this JSX file.
 */

const coverageLabels = {
  description: "توضیحات عمومی",
  coordinates: "مختصات معتبر",
  images: "تصویر",
  "advertiser-classified": "نوع آگهی‌دهنده مشخص",
  "nearby-places": "مکان‌های اطراف",
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

const advertiserLabels = {
  personal: "شخصی",
  "real-estate-business": "مشاور املاک",
  unknown: "نامشخص",
};

// Only formats the existing toFixed(1) value for display. Does not change math.
function displayFixedPersian(fixedValue) {
  const asNumber = Number(fixedValue);
  return Number.isFinite(asNumber)
    ? new Intl.NumberFormat("fa-IR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(asNumber)
    : "—";
}

const QUALITY_CSS = `
.owj-quality {
  --quality-bg: #f7f8fa;
  --quality-surface: #ffffff;
  --quality-ink: #1d2028;
  --quality-muted: #6b707a;
  --quality-subtle: #9298a2;
  --quality-border: #e9ebf0;
  --quality-primary: #66308d;
  --quality-teal: #01ae9b;
  --quality-success: #137e67;
  --quality-warn: #a36b25;
  --quality-shadow: 0 3px 22px rgba(23,31,44,.035), 0 1px 4px rgba(23,31,44,.02);
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--quality-bg);
  color: var(--quality-ink);
  direction: rtl;
  font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
  font-size: 14px;
  line-height: 1.75;
  overflow-x: clip;
}
.owj-quality *, .owj-quality *::before, .owj-quality *::after { box-sizing: border-box; }
.owj-quality :is(h1,h2,h3,p,dl,dt,dd) { margin: 0; }
.owj-quality .quality-main { width: min(100%, 1392px); margin-inline: auto; padding: 34px 30px 90px; }
.owj-quality .quality-hero {
  background: var(--quality-surface);
  border: 1px solid var(--quality-border);
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
  padding: 30px 34px;
  position: relative;
  box-shadow: var(--quality-shadow);
  overflow: hidden;
}
.owj-quality .quality-hero::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: linear-gradient(90deg,#e5e8ed 0%, #e5e8ed 60%, #66308d 100%);
}
.owj-quality .quality-hero__content { min-width: 0; flex: 1; }
.owj-quality .quality-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #66308d;
  background: #f5eff9;
  padding: 5px 12px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 13px;
}
.owj-quality .quality-hero h1 {
  font-size: clamp(23px, 2.2vw, 34px);
  font-weight: 900;
  line-height: 1.45;
  letter-spacing: -.5px;
  color: #16191f;
}
.owj-quality .quality-hero p {
  color: var(--quality-muted);
  font-size: 13px;
  font-weight: 500;
  line-height: 2;
  margin-top: 8px;
  max-width: 650px;
}
.owj-quality .quality-updated {
  flex: none;
  min-width: 236px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 16px;
  padding: 16px 18px;
  background: #f8f9fb;
  border: 1px solid #eef0f3;
}
.owj-quality .quality-updated__label {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--quality-muted);
  font-size: 11px;
  font-weight: 650;
}
.owj-quality .quality-updated__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--quality-teal); }
.owj-quality .quality-updated time { color: #30333d; font-size: 13px; font-weight: 800; unicode-bidi: plaintext; }
.owj-quality .quality-quicknav {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  padding: 16px 2px 2px;
  margin-bottom: 26px;
}
.owj-quality .quality-quicknav::-webkit-scrollbar { display: none; }
.owj-quality .quality-quicknav a {
  flex: none;
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 8px 14px;
  border: 1px solid #e6e8ee;
  background: #fff;
  border-radius: 11px;
  text-decoration: none;
  color: #626773;
  font-size: 12px;
  font-weight: 700;
  transition: color .16s, border-color .16s, background .16s;
}
.owj-quality .quality-quicknav a:hover { color: var(--quality-primary); border-color: #d9c8e3; background: #faf7fc; }
.owj-quality .quality-section-intro { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 15px; }
.owj-quality .quality-section-intro h2 { font-size: 17px; font-weight: 850; color: #242630; }
.owj-quality .quality-section-intro p { font-size: 12px; color: #858a94; }
.owj-quality .quality-metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-bottom: 26px; }
.owj-quality .quality-metric {
  min-width: 0;
  min-height: 146px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  padding: 19px 20px;
  border: 1px solid var(--quality-border);
  border-radius: 18px;
  background: var(--quality-surface);
  box-shadow: var(--quality-shadow);
  position: relative;
}
.owj-quality .quality-metric::before {
  content: '';
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  top: 25px;
  left: 20px;
  background: #d0d3da;
}
.owj-quality .quality-metric--good::before { background: var(--quality-teal); }
.owj-quality .quality-metric--warn::before { background: #e6ac5c; }
.owj-quality .quality-metric__label { padding-left: 9px; color: #626873; font-size: 12px; font-weight: 700; line-height: 1.8; }
.owj-quality .quality-metric__value { color: #17191f; font-size: clamp(26px, 2.4vw, 34px); font-weight: 900; line-height: 1.3; font-variant-numeric: tabular-nums; letter-spacing: -.5px; }
.owj-quality .quality-metric__note { color: #7c818b; font-size: 11px; font-weight: 500; line-height: 1.85; overflow-wrap: anywhere; }
.owj-quality .quality-layout { display: grid; grid-template-columns: minmax(0,1.35fr) minmax(0,1fr); gap: 16px; align-items: stretch; }
.owj-quality .quality-panel {
  min-width: 0;
  background: #fff;
  border: 1px solid var(--quality-border);
  border-radius: 21px;
  padding: 25px;
  box-shadow: var(--quality-shadow);
  scroll-margin-top: 104px;
}
.owj-quality .quality-panel--wide { grid-column: 1 / -1; }
.owj-quality .quality-panel__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 23px;
}
.owj-quality .quality-panel__head h2 { color: #22252e; font-size: 17px; font-weight: 850; line-height: 1.5; }
.owj-quality .quality-panel__head p { color: #8a8f98; font-size: 12px; line-height: 1.9; margin-top: 4px; }
.owj-quality .quality-panel__icon {
  width: 39px;
  height: 39px;
  border-radius: 12px;
  border: 1px solid #ede9f0;
  color: #66308d;
  background: #f9f6fb;
  display: grid;
  place-items: center;
  flex: none;
}
.owj-quality .quality-coverage { display: flex; flex-direction: column; gap: 18px; }
.owj-quality .quality-coverage__row { display: grid; grid-template-columns: 1fr auto; gap: 8px 12px; align-items: center; }
.owj-quality .quality-coverage__label { display: block; color: #353944; font-size: 13px; font-weight: 750; line-height: 1.8; }
.owj-quality .quality-coverage__meta { display: block; color: #9297a0; font-size: 11px; margin-top: 1px; }
.owj-quality .quality-coverage__percent { align-self: center; color: #252936; font-size: 16px; font-weight: 900; white-space: nowrap; }
.owj-quality .quality-bar { width: 100%; height: 9px; background: #eef0f4; border-radius: 99px; overflow: hidden; grid-column: 1/-1; }
.owj-quality .quality-bar > span { display: block; height: 100%; background: #01ae9b; border-radius: inherit; transition: width .35s ease; }
.owj-quality .quality-classifications { display: flex; flex-direction: column; gap: 12px; }
.owj-quality .quality-classifications__item { background: #fbfcfd; border: 1px solid #edf0f3; border-radius: 14px; padding: 15px 16px; }
.owj-quality .quality-classifications__top { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.owj-quality .quality-classifications__title { color: #444a54; font-size: 12px; font-weight: 750; }
.owj-quality .quality-classifications__count { font-size: 20px; font-weight: 850; color: #21252d; line-height: 1.4; }
.owj-quality .quality-classifications__footer { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 10px; }
.owj-quality .quality-classifications__percentage { font-size: 11px; color: #7c838f; font-weight: 700; white-space: nowrap; }
.owj-quality .quality-classifications__bar { height: 7px; flex: 1; background: #eaeef2; border-radius: 99px; overflow: hidden; }
.owj-quality .quality-classifications__bar > i { display: block; height: 100%; background: #818995; border-radius: inherit; }
.owj-quality .quality-classifications__item:nth-child(2) .quality-classifications__bar > i { background: #66308d; }
.owj-quality .quality-classifications__item:nth-child(3) .quality-classifications__bar > i { background: #e1a962; }
.owj-quality .quality-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  border-radius: 99px;
  padding: 7px 12px;
  background: #f5f6f8;
  border: 1px solid #edeef1;
  color: #626773;
  font-size: 11px;
  font-weight: 700;
  overflow-wrap: anywhere;
}
.owj-quality .quality-status::before { content: ''; width: 7px; height: 7px; border-radius: 50%; flex: none; background: #01ae9b; }
.owj-quality .quality-table-wrap { border: 1px solid #eceef1; border-radius: 15px; overflow: hidden; }
.owj-quality .quality-table { width: 100%; border-collapse: collapse; font-size: 13px; text-align: right; }
.owj-quality .quality-table th {
  background: #f8f9fb;
  border-bottom: 1px solid #eaedf1;
  color: #6b717c;
  padding: 14px 19px;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}
.owj-quality .quality-table th:first-child { width: 67%; }
.owj-quality .quality-table td { padding: 16px 19px; border-bottom: 1px solid #edf0f3; color: #414750; vertical-align: middle; }
.owj-quality .quality-table tbody tr:last-child td { border-bottom: 0; }
.owj-quality .quality-table tbody tr:hover { background: #fbfafc; }
.owj-quality .quality-table__reason { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
.owj-quality .quality-table__reason strong { color: #30333d; font-size: 13px; font-weight: 750; }
.owj-quality .quality-table__reason code {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 10px;
  color: #8c929c;
  direction: ltr;
  text-align: right;
  unicode-bidi: plaintext;
  max-width: 100%;
  overflow-wrap: anywhere;
}
.owj-quality .quality-table__number { font-weight: 850; color: #292d36; font-size: 14px; }
.owj-quality .quality-table__percent { font-weight: 750; color: #616874; }
.owj-quality .quality-empty { padding: 28px 16px; text-align: center; color: #8b919d; font-size: 13px; }
.owj-quality .quality-facts { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 12px; }
.owj-quality .quality-facts__item { min-width:0; display: flex; flex-direction: column; justify-content: space-between; gap: 9px; padding: 17px 18px; border: 1px solid #ecedf2; border-radius: 14px; background: #fbfcfd; }
.owj-quality .quality-facts dt { color: #7a808a; font-size: 11px; font-weight: 650; line-height: 1.75; }
.owj-quality .quality-facts dd { color: #292d35; font-size: 15px; font-weight: 850; line-height: 1.85; overflow-wrap: anywhere; }
.owj-quality .quality-state { display: flex; flex-direction: column; gap: 14px; align-items: center; justify-content: center; text-align: center; min-height: 390px; background: #fff; border: 1px solid #edf0f3; border-radius: 22px; margin-top: 22px; padding: 30px; }
.owj-quality .quality-state__icon { width: 60px; height:60px; display:grid;place-items:center; border:1px solid #e6dcef; color:#66308d; background:#f6f1f9; border-radius:18px; }
.owj-quality .quality-state h1 { font-size: 19px; font-weight: 850; line-height: 1.5; }
.owj-quality .quality-state p { font-size: 13px; color: #7e858f; max-width: 460px; overflow-wrap: anywhere; }
.owj-quality .quality-state--error .quality-state__icon { background:#fff3f3; color:#ba4853; border-color:#f6dce1; }
.owj-quality .quality-state__spinner { width: 24px; height: 24px; border-radius: 50%; border: 3px solid #e8dff0; border-top-color: #66308d; animation: owjQualitySpin 1s linear infinite; }
@keyframes owjQualitySpin { to { transform: rotate(360deg); } }
.owj-quality :is(a,button,input,summary):focus-visible { outline: 3px solid rgba(102,48,141,.34); outline-offset: 3px; }
@media (max-width: 1100px) {
  .owj-quality .quality-main { padding-inline: 24px; }
  .owj-quality .quality-facts { grid-template-columns: repeat(2,minmax(0,1fr)); }
}
@media (max-width: 860px) {
  .owj-quality .quality-layout { grid-template-columns: minmax(0,1fr); }
  .owj-quality .quality-panel--wide { grid-column: auto; }
  .owj-quality .quality-metrics { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .owj-quality .quality-panel__head { margin-bottom: 17px; }
}
@media (max-width: 600px) {
  .owj-quality .quality-main { padding: 15px 16px 64px; }
  .owj-quality .quality-hero { padding: 23px 20px; flex-direction: column; align-items: stretch; gap: 16px; border-radius: 20px; }
  .owj-quality .quality-hero h1 { font-size: 25px; }
  .owj-quality .quality-hero p { font-size: 12px; margin-top: 7px; }
  .owj-quality .quality-updated { min-width: 0; padding: 11px 13px; border-radius: 12px; }
  .owj-quality .quality-updated time { font-size: 12px; }
  .owj-quality .quality-quicknav { margin-bottom: 22px; padding-top: 13px; }
  .owj-quality .quality-section-intro { align-items: center; }
  .owj-quality .quality-section-intro h2 { font-size: 16px; }
  .owj-quality .quality-section-intro p { font-size: 11px; }
  .owj-quality .quality-metrics { gap: 10px; margin-bottom: 18px; }
  .owj-quality .quality-metric { min-height: 142px; padding: 15px 14px; border-radius: 15px; }
  .owj-quality .quality-metric::before { top: 19px; left: 13px; }
  .owj-quality .quality-metric__label { font-size: 11px; line-height: 1.7; }
  .owj-quality .quality-metric__value { font-size: clamp(23px, 6.6vw, 30px); }
  .owj-quality .quality-metric__note { font-size: 10px; line-height: 1.8; }
  .owj-quality .quality-layout { gap: 12px; }
  .owj-quality .quality-panel { padding: 20px 16px; border-radius: 18px; }
  .owj-quality .quality-panel__head h2 { font-size: 16px; }
  .owj-quality .quality-panel__head p { font-size: 11px; }
  .owj-quality .quality-panel__icon { width: 36px; height: 36px; border-radius: 11px; }
  .owj-quality .quality-coverage { gap: 17px; }
  .owj-quality .quality-coverage__label { font-size: 12px; }
  .owj-quality .quality-coverage__meta { font-size: 10px; }
  .owj-quality .quality-coverage__percent { font-size: 15px; }
  .owj-quality .quality-panel__head--wrap { flex-direction: column; align-items: stretch; }
  .owj-quality .quality-status { align-self: flex-start; }
  .owj-quality .quality-table-wrap { border: 0; border-radius: 0; overflow: visible; }
  .owj-quality .quality-table,
  .owj-quality .quality-table tbody { display: block; width: 100%; }
  .owj-quality .quality-table thead { display:none; }
  .owj-quality .quality-table tbody { display:flex; flex-direction:column; gap: 9px; }
  .owj-quality .quality-table tbody tr { display: grid; grid-template-columns: 1fr 1fr; border:1px solid #e9ebf0; border-radius: 13px; overflow: hidden; background: #fff; }
  .owj-quality .quality-table tbody td { display:flex; flex-direction:column; gap: 3px; padding: 12px 14px; border: 0; min-width:0; }
  .owj-quality .quality-table tbody td:first-child { grid-column: 1 / -1; border-bottom: 1px solid #eff0f3; padding: 12px 14px; background: #fafbfc; }
  .owj-quality .quality-table tbody td:nth-child(2) { border-left:1px solid #eff0f3; }
  .owj-quality .quality-table tbody td[data-label]::before { content:attr(data-label); color:#8b919a; font-size:10px; font-weight:650; }
  .owj-quality .quality-table__reason strong { font-size: 12px; }
  .owj-quality .quality-table__reason code { font-size: 9px; }
  .owj-quality .quality-facts { gap: 9px; }
  .owj-quality .quality-facts__item { padding: 13px; border-radius: 12px; }
  .owj-quality .quality-facts dt { font-size: 10px; }
  .owj-quality .quality-facts dd { font-size: 12px; }
  .owj-quality .quality-state { margin-top: 14px; min-height: 320px; }
}
@media (max-width: 370px) {
  .owj-quality .quality-main { padding-inline: 12px; }
  .owj-quality .quality-metric { padding: 14px 12px; }
  .owj-quality .quality-facts__item { padding: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  .owj-quality *, .owj-quality *::before, .owj-quality *::after { animation: none !important; scroll-behavior: auto !important; transition-duration: .01ms !important; }
}
`;

function QualityShell({ children }) {
  return (
    <div className="owj-quality" dir="rtl">
      <style>{QUALITY_CSS}</style>
      <AppHeader active="quality" />
      {children}
    </div>
  );
}

function Metric({ label, value, note, tone = "neutral" }) {
  return (
    <article className={`quality-metric quality-metric--${tone}`}>
      <span className="quality-metric__label">{label}</span>
      <strong className="quality-metric__value">{formatNumber(value)}</strong>
      <small className="quality-metric__note">{note}</small>
    </article>
  );
}

export default function DataQualityPage() {
  injectGlobalCSS();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/data-quality-data", { signal: controller.signal })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(new Error(`HTTP ${response.status}`)),
      )
      .then(setData)
      .catch((caught) => {
        if (caught.name !== "AbortError") setError(caught.message);
      });
    return () => controller.abort();
  }, []);

  if (!data && !error)
    return (
      <QualityShell>
        <main className="quality-main" id="main-content">
          <div className="quality-state" role="status" aria-busy="true">
            <span className="quality-state__icon" aria-hidden="true">
              <span className="quality-state__spinner" />
            </span>
            <h1>در حال محاسبه خط پایه کیفیت داده…</h1>
            <p>اطلاعات پوشش و کیفیت آگهی‌ها در حال بارگذاری است.</p>
          </div>
        </main>
      </QualityShell>
    );

  if (error)
    return (
      <QualityShell>
        <main className="quality-main" id="main-content">
          <div className="quality-state quality-state--error" role="alert">
            <span className="quality-state__icon" aria-hidden="true">
              <Icon name="alert" size={26} />
            </span>
            <h1>محاسبه کیفیت داده ناموفق بود</h1>
            <p>{error}</p>
          </div>
        </main>
      </QualityShell>
    );

  const advertiser = Object.fromEntries(
    data.classifications.advertiser.map((item) => [item.key, item.count]),
  );

  return (
    <QualityShell>
      <main className="quality-main" id="main-content">
        <header className="quality-hero">
          <div className="quality-hero__content">
            <span className="quality-kicker">
              <Icon name="activity" size={16} /> خط پایه فاز صفر
            </span>
            <h1>کنترل کیفیت و پوشش داده</h1>
            <p>
              این صفحه منبع واحد اندازه‌گیری برای بک‌فیل، طبقه‌بندی و افزایش
              پوشش امتیازدهی است.
            </p>
          </div>
          <div className="quality-updated">
            <span className="quality-updated__label">
              <span className="quality-updated__dot" aria-hidden="true" />
              آخرین محاسبه
            </span>
            <time dateTime={data.generatedAt}>
              {new Date(data.generatedAt).toLocaleString("fa-IR")}
            </time>
          </div>
        </header>

        <nav
          className="quality-quicknav"
          aria-label="دسترسی سریع به بخش‌های گزارش"
        >
          <a href="#quality-summary">شاخص‌های اصلی</a>
          <a href="#quality-coverage">پوشش فیلدها</a>
          <a href="#quality-advertisers">نوع آگهی‌دهنده</a>
          <a href="#quality-blockers">موانع امتیازدهی</a>
          <a href="#quality-health">سلامت خروجی</a>
        </nav>

        <div className="quality-section-intro" id="quality-summary">
          <h2>وضعیت داده‌ها در یک نگاه</h2>
          <p>شاخص‌های اصلی کیفیت</p>
        </div>
        <section className="quality-metrics" aria-label="شاخص‌های اصلی">
          <Metric
            label="کل آگهی‌ها"
            value={data.inventory.total}
            note={`${formatNumber(data.inventory.active)} آگهی فعال`}
          />
          <Metric
            label="واجد شرایط امتیاز"
            value={data.scoring.eligible}
            note="طبق قوانین فعلی پاک‌سازی"
            tone="good"
          />
          <Metric
            label="امتیاز ثبت‌شده"
            value={data.scoring.totalScored}
            note={`${formatNumber(data.scoring.populationCoveragePercent)}٪ از کل داده · ${formatNumber(data.scoring.coveragePercent)}٪ از واجدین`}
            tone={
              data.scoring.populationCoveragePercent >= 95 ? "good" : "warn"
            }
          />
          <Metric
            label="کل آگهی‌های بدون امتیاز"
            value={data.scoring.unscoredTotal}
            note={`${displayFixedPersian((100 - data.scoring.populationCoveragePercent).toFixed(1))}٪ از کل داده`}
            tone={data.scoring.unscoredTotal ? "warn" : "good"}
          />
          <Metric
            label="واجد شرایط ولی بدون امتیاز"
            value={data.scoring.eligibleUnscored}
            note="خطای همگام‌سازی پایپ‌لاین"
            tone={data.scoring.eligibleUnscored ? "warn" : "good"}
          />
          <Metric
            label="تغییر از آخرین امتیازدهی"
            value={data.scoring.staleListingsSinceScore}
            note="آگهی جدید یا به‌روزشده"
            tone={data.scoring.staleListingsSinceScore ? "warn" : "good"}
          />
        </section>

        <div className="quality-layout">
          <section
            className="quality-panel"
            id="quality-coverage"
            aria-labelledby="coverage-title"
          >
            <div className="quality-panel__head">
              <div>
                <h2 id="coverage-title">پوشش فیلدهای کلیدی</h2>
                <p>فاصله دقیق هر بخش تا پوشش کامل</p>
              </div>
              <span className="quality-panel__icon" aria-hidden="true">
                <Icon name="check" size={19} />
              </span>
            </div>
            <div className="quality-coverage">
              {data.coverage.map((item) => (
                <article className="quality-coverage__row" key={item.key}>
                  <div>
                    <strong className="quality-coverage__label">
                      {coverageLabels[item.key] || item.key}
                    </strong>
                    <span className="quality-coverage__meta">
                      {formatNumber(item.count)} موجود ·{" "}
                      {formatNumber(item.missing)} مفقود
                    </span>
                  </div>
                  <b className="quality-coverage__percent">
                    {formatNumber(item.percent)}٪
                  </b>
                  <div
                    className="quality-bar"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={item.percent}
                    aria-label={`${coverageLabels[item.key] || item.key}: ${formatNumber(item.percent)} درصد`}
                  >
                    <span style={{ width: `${item.percent}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className="quality-panel"
            id="quality-advertisers"
            aria-labelledby="advertiser-title"
          >
            <div className="quality-panel__head">
              <div>
                <h2 id="advertiser-title">نوع آگهی‌دهنده</h2>
                <p>هدف فاز طبقه‌بندی: کاهش موارد نامشخص</p>
              </div>
              <span className="quality-panel__icon" aria-hidden="true">
                <Icon name="building" size={19} />
              </span>
            </div>
            <div className="quality-classifications">
              {["personal", "real-estate-business", "unknown"].map((key) => {
                const percentage = (
                  ((advertiser[key] || 0) / data.inventory.total) *
                  100
                ).toFixed(1);
                return (
                  <div className="quality-classifications__item" key={key}>
                    <div className="quality-classifications__top">
                      <span className="quality-classifications__title">
                        {advertiserLabels[key]}
                      </span>
                      <strong className="quality-classifications__count">
                        {formatNumber(advertiser[key] || 0)}
                      </strong>
                    </div>
                    <div className="quality-classifications__footer">
                      <span className="quality-classifications__percentage">
                        {displayFixedPersian(percentage)}٪ از کل
                      </span>
                      <div
                        className="quality-classifications__bar"
                        aria-hidden="true"
                      >
                        <i
                          style={{
                            width: `${Number.isFinite(Number(percentage)) ? percentage : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section
            className="quality-panel quality-panel--wide"
            id="quality-blockers"
            aria-labelledby="blockers-title"
          >
            <div className="quality-panel__head quality-panel__head--wrap">
              <div>
                <h2 id="blockers-title">دلایل حذف از امتیازدهی</h2>
                <p>یک آگهی ممکن است بیش از یک مانع داشته باشد.</p>
              </div>
              <span className="quality-status">
                وضعیت پایپ‌لاین: <b dir="auto">{data.scoring.pipelineStatus}</b>
              </span>
            </div>
            <div className="quality-table-wrap">
              <table className="quality-table">
                <thead>
                  <tr>
                    <th scope="col">مانع</th>
                    <th scope="col">تعداد</th>
                    <th scope="col">درصد کل داده</th>
                  </tr>
                </thead>
                <tbody>
                  {data.blockers.map((item) => (
                    <tr key={item.reason}>
                      <td>
                        <div className="quality-table__reason">
                          <strong>
                            {blockerLabels[item.reason] || item.reason}
                          </strong>
                          <code>{item.reason}</code>
                        </div>
                      </td>
                      <td data-label="تعداد">
                        <span className="quality-table__number">
                          {formatNumber(item.count)}
                        </span>
                      </td>
                      <td data-label="درصد کل داده">
                        <span className="quality-table__percent">
                          {formatNumber(item.percent)}٪
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!data.blockers.length && (
                    <tr>
                      <td colSpan={3} className="quality-empty">
                        مانعی برای نمایش ثبت نشده است.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section
            className="quality-panel quality-panel--wide"
            id="quality-health"
            aria-labelledby="health-title"
          >
            <div className="quality-panel__head">
              <div>
                <h2 id="health-title">سلامت خروجی امتیازدهی</h2>
                <p>اختلاف میان وضعیت فعلی MongoDB و آخرین فایل امتیازدهی</p>
              </div>
              <span className="quality-panel__icon" aria-hidden="true">
                <Icon name="database" size={19} />
              </span>
            </div>
            <dl className="quality-facts">
              <div className="quality-facts__item">
                <dt>زمان آخرین امتیازدهی</dt>
                <dd>
                  {data.scoring.generatedAt
                    ? new Date(data.scoring.generatedAt).toLocaleString("fa-IR")
                    : "اجرا نشده"}
                </dd>
              </div>
              <div className="quality-facts__item">
                <dt>واجد شرایط و امتیازدار</dt>
                <dd>{formatNumber(data.scoring.eligibleScored)}</dd>
              </div>
              <div className="quality-facts__item">
                <dt>امتیاز قدیمی ولی اکنون غیرواجد</dt>
                <dd>
                  {formatNumber(data.scoring.scoredButCurrentlyIneligible)}
                </dd>
              </div>
              <div className="quality-facts__item">
                <dt>آخرین مشاهده داده</dt>
                <dd>
                  {data.inventory.latestListingAt
                    ? new Date(data.inventory.latestListingAt).toLocaleString(
                        "fa-IR",
                      )
                    : "—"}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </main>
      <AppFooter />
    </QualityShell>
  );
}
