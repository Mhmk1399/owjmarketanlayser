import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AppFooter,
  AppHeader,
  Icon,
  T,
  formatMoney,
  formatNumber,
  formatYear,
  injectGlobalCSS,
} from "./shared.jsx";
import NeshanListingMap from "./NeshanListingMap.jsx";
import ListingImageGallery from "./ListingImageGallery.jsx";
import ListingDecisionSummary from "./ListingDecisionSummary.jsx";
const advertiserLabels = {
  personal: "فایل شخصی",
  "real-estate-business": "مشاور املاک",
  unknown: "نامشخص",
};
const amenityLabels = {
  elevator: "آسانسور",
  parking: "پارکینگ",
  storage: "انباری",
  balcony: "بالکن",
  rooftop: "روف‌گاردن",
  lobby: "لابی",
  doorman: "سرایدار",
  security: "امنیت",
  pool: "استخر",
  sauna: "سونا",
  gym: "باشگاه",
  centralAntenna: "آنتن مرکزی",
  airConditioning: "تهویه",
  heating: "گرمایش",
};
const detailLabels = {
  deedType: "نوع سند",
  buildingDirection: "جهت ساختمان",
  unitPosition: "موقعیت واحد",
  propertyType: "نوع ملک",
  buildingCondition: "وضعیت بنا",
  heating: "گرمایش",
  cooling: "سرمایش",
};
const scoreBandLabels = {
  "strong-value": "فرصت خرید بسیار خوب",
  promising: "ارزش بررسی دارد",
  fair: "قیمت نسبتاً منصفانه",
  "weak-value": "ارزش خرید پایین",
};
/** Only translate digits in rendered text, never mutate API data or URL IDs. */
function persianText(value) {
  if (value === null || value === undefined) return value;
  if (typeof value !== "string" && typeof value !== "number") return value;
  return String(value).replace(/[0-9\u0660-\u0669]/g, (digit) => {
    const code = digit.charCodeAt(0);
    const numeric = code >= 0x0660 ? code - 0x0660 : code - 48;
    return String.fromCharCode(0x06f0 + numeric);
  });
}

/** Localize ISO publication timestamps only; keep relative server text intact. */
const publicationDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  dateStyle: "medium",
  timeZone: "Asia/Tehran",
});
const publicationDateTime = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});
function displayPublication(value) {
  if (!value) return "زمان انتشار نامشخص";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}(?:T|\s|$)/.test(value)) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.valueOf())) {
      return /[T\s]\d{2}:\d{2}/.test(value)
        ? publicationDateTime.format(parsed)
        : publicationDate.format(parsed);
    }
  }
  return persianText(value);
}

function nearbyTravel(place) {
  const distance = Number.isFinite(place.routeDistanceMeters)
    ? place.routeDistanceMeters
    : place.distanceMeters;
  const duration = Number.isFinite(place.routeDurationSeconds)
    ? Math.max(1, Math.round(place.routeDurationSeconds / 60))
    : null;
  return {
    distance: `${formatNumber(distance)} متر`,
    duration:
      duration === null ? null : `${formatNumber(duration)} دقیقه پیاده`,
  };
}

/* Presentation-only, component-scoped styles; no external CSS file. */
const DETAIL_CSS = `
/* All presentation rules are intentionally embedded in SavedListingDetailPage.jsx.
   They are scoped to .owj-detail-page to avoid affecting other OWJ screens. */
.owj-detail-page {
  min-height: 100svh;
  min-width: 0;
  background: ${T.bg};
  color: ${T.text};
  font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
  direction: rtl;
  overflow-x: clip;
  text-align: right;
  -webkit-font-smoothing: antialiased;
}
.owj-detail-page *, .owj-detail-page *::before, .owj-detail-page *::after {
  box-sizing: border-box;
}
.owj-detail-page :where(a, button, summary):focus-visible {
  outline: 3px solid rgba(102,48,141,.28);
  outline-offset: 3px;
}
.owj-detail-page :where(button, a) { -webkit-tap-highlight-color: transparent; }
.owj-detail-page a { color: inherit; }
.owj-detail-page button { font: inherit; }
.owj-detail-page .saved-detail-main {
  width: min(100%, 1360px);
  min-width: 0;
  margin-inline: auto;
  padding: 24px clamp(16px, 3vw, 36px) 88px;
}
.owj-detail-page .saved-detail-breadcrumb {
  display: flex;
  align-items: center;
  gap: 9px;
  overflow: auto hidden;
  min-height: 44px;
  margin: 0 0 16px;
  color: ${T.textMuted};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  scrollbar-width: none;
}
.owj-detail-page .saved-detail-breadcrumb::-webkit-scrollbar { display: none; }
.owj-detail-page .saved-detail-breadcrumb a {
  display: inline-flex;
  align-items: center;
  padding: 8px 0;
  text-decoration: none;
  color: ${T.textSec};
  transition: color .18s ease;
}
.owj-detail-page .saved-detail-breadcrumb a:hover { color: ${T.primary}; }
.owj-detail-page .saved-detail-breadcrumb span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${T.text};
}
.owj-detail-page .saved-detail-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 365px);
  gap: clamp(20px, 3vw, 40px);
  align-items: start;
  padding: clamp(22px, 3vw, 38px);
  margin: 0 0 20px;
  background: ${T.surface};
  border: 1px solid ${T.border};
  border-radius: 24px;
  box-shadow: ${T.shadow};
  overflow: hidden;
}
.owj-detail-page .saved-detail-hero::before {
  content: '';
  position: absolute;
  right: 0;
  top: 27px;
  bottom: 27px;
  width: 3px;
  border-radius: 4px 0 0 4px;
  background: ${T.primary};
}
.owj-detail-page .saved-detail-hero > div { min-width: 0; }
.owj-detail-page .saved-detail-hero .catalog-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  margin-bottom: 17px;
}
.owj-detail-page .status-pill, .owj-detail-page .score-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  max-width: 100%;
  padding: 6px 11px;
  border: 1px solid ${T.borderMed};
  border-radius: 999px;
  background: ${T.raised};
  color: ${T.textSec};
  font-size: 11px;
  font-weight: 650;
  line-height: 1.65;
  white-space: normal;
  overflow-wrap: anywhere;
}
.owj-detail-page .status-pill--active {
  background: ${T.secondaryBg};
  color: ${T.secondaryDark};
  border-color: ${T.secondaryBg2};
}
.owj-detail-page .score-tag {
  background: ${T.primaryBg};
  color: ${T.primary};
  border-color: ${T.primaryBg2};
}
.owj-detail-page .score-tag--strong-value {
  background: ${T.greenBg}; color: ${T.green}; border-color: ${T.greenBg2};
}
.owj-detail-page .score-tag--fair,
.owj-detail-page .score-tag--weak-value {
  background: ${T.orangeBg}; color: ${T.orange}; border-color: ${T.orangeBg2};
}
.owj-detail-page .score-tag--scenario {
  background: ${T.raised}; color: ${T.textSec}; border-color: ${T.border};
}
.owj-detail-page .saved-detail-hero h1 {
  max-width: 760px;
  margin: 0 0 13px;
  color: ${T.text};
  font-size: clamp(23px, 3vw, 35px);
  font-weight: 900;
  letter-spacing: -.5px;
  line-height: 1.65;
  overflow-wrap: anywhere;
}
.owj-detail-page .saved-description__text {
  margin: 0;
  max-width: 750px;
  color: ${T.textSec};
  font-size: 13px;
  line-height: 2.15;
  white-space: pre-line;
  overflow-wrap: anywhere;
}
.owj-detail-page .saved-description__text--collapsed {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.owj-detail-page .saved-description__toggle {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  margin-top: 4px;
  padding: 4px 0;
  border: 0;
  background: transparent;
  color: ${T.primary};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}
.owj-detail-page .saved-description__toggle:hover { text-decoration: underline; }
.owj-detail-page .saved-detail-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 22px;
  padding-top: 17px;
  border-top: 1px solid ${T.border};
}
.owj-detail-page .saved-detail-highlights > span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 13px;
  background: ${T.raised};
  border: 1px solid ${T.border};
  border-radius: 12px;
  font-size: 12px;
  color: ${T.textSec};
}
.owj-detail-page .saved-detail-highlights strong {
  font-size: 13px; color: ${T.text}; font-weight: 800;
}
.owj-detail-page .saved-detail-price {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 11px;
  align-self: stretch;
  padding: 24px 21px;
  border-radius: 20px;
  background: ${T.raised};
  border: 1px solid ${T.borderMed};
}
.owj-detail-page .saved-detail-price > span {
  color: ${T.textMuted}; font-size: 12px; font-weight: 650;
}
.owj-detail-page .saved-detail-price > strong {
  color: ${T.text};
  font-size: clamp(25px, 2.3vw, 31px);
  font-weight: 900;
  line-height: 1.65;
  letter-spacing: -.55px;
  overflow-wrap: anywhere;
}
.owj-detail-page .saved-detail-price > small {
  color: ${T.textSec};
  font-size: 12px;
  line-height: 1.9;
  padding-bottom: 19px;
  margin-bottom: 6px;
  border-bottom: 1px solid ${T.borderMed};
}
.owj-detail-page .saved-detail-price > a,
.owj-detail-page .saved-detail-price > button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  width: 100%;
  padding: 11px 13px;
  gap: 9px;
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  transition: background .18s ease, border-color .18s ease, transform .18s ease;
}
.owj-detail-page .saved-detail-price > a {
  order: 0;
  background: ${T.primary};
  border: 1px solid ${T.primary};
  color: #fff;
}
.owj-detail-page .saved-detail-price > a:hover { background: ${T.primaryLight}; transform: translateY(-1px); }
.owj-detail-page .saved-detail-price > button {
  order: 1;
  background: ${T.surface};
  border: 1px solid ${T.borderLight};
  color: ${T.text};
}
.owj-detail-page .saved-detail-price > button:hover:not(:disabled) { background: ${T.surfaceHover}; }
.owj-detail-page :where(.saved-detail-price button, .nearby-refresh):disabled {
  opacity: .58; cursor: not-allowed;
}
.owj-detail-page .saved-refetch-status {
  order: 2;
  margin: 0;
  color: ${T.textSec};
  font-size: 12px;
  line-height: 1.9;
  overflow-wrap: anywhere;
}
.owj-detail-page .saved-refetch-status:empty { display: none; }
.owj-detail-page .saved-detail-jumps {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 22px;
  padding: 2px 0 6px;
  overflow: auto hidden;
  scrollbar-width: none;
  white-space: nowrap;
}
.owj-detail-page .saved-detail-jumps::-webkit-scrollbar { display: none; }
.owj-detail-page .saved-detail-jumps a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 41px;
  flex: none;
  padding: 8px 17px;
  border-radius: 12px;
  border: 1px solid ${T.borderMed};
  background: ${T.surface};
  color: ${T.textSec};
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: color .18s ease, background .18s ease, border-color .18s ease;
}
.owj-detail-page .saved-detail-jumps a:hover,
.owj-detail-page .saved-detail-jumps a:focus-visible {
  border-color: ${T.primaryBg2};
  background: ${T.primaryBg};
  color: ${T.primary};
}
.owj-detail-page .saved-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 19px;
  min-width: 0;
}
.owj-detail-page .saved-panel {
  display: block;
  position: relative;
  min-width: 0;
  padding: clamp(19px, 2.3vw, 27px);
  background: ${T.surface};
  border: 1px solid ${T.border};
  border-radius: 21px;
  box-shadow: ${T.shadow};
  scroll-margin-top: 100px;
}
.owj-detail-page .saved-panel--wide,
.owj-detail-page .saved-panel--map {
  grid-column: 1 / -1;
}
.owj-detail-page .saved-panel h2 {
  margin: 0 0 15px;
  color: ${T.text};
  font-size: clamp(16px, 1.7vw, 19px);
  font-weight: 850;
  line-height: 1.65;
}
.owj-detail-page .saved-panel > p,
.owj-detail-page .saved-panel__head p {
  margin: 5px 0 0;
  color: ${T.textSec};
  font-size: 12px;
  line-height: 1.95;
}
.owj-detail-page .saved-panel__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 22px;
  margin-bottom: 21px;
}
.owj-detail-page .saved-panel__head > div { min-width: 0; }
.owj-detail-page .saved-panel__head h2 { margin: 0 0 5px; }
.owj-detail-page .score-detail-panel {
  background: linear-gradient(180deg, #fff 0%, #fff 75%, #fefcff 100%);
  border-color: ${T.primaryBg2};
}
.owj-detail-page .score-final {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3px;
  flex: none;
  min-width: 122px;
  padding: 10px 15px 12px;
  border-radius: 16px;
  border: 1px solid ${T.primaryBg2};
  background: ${T.primaryBg};
  color: ${T.primary};
  font-size: 31px;
  font-weight: 900;
  line-height: 1.4;
  text-align: center;
}
.owj-detail-page .score-final small {
  color: ${T.primary};
  font-size: 10px;
  font-weight: 750;
  line-height: 1.6;
  text-align: center;
}
.owj-detail-page .score-final--strong-value {
  color: ${T.green}; border-color: ${T.greenBg2}; background: ${T.greenBg};
}
.owj-detail-page .score-final--strong-value small { color: ${T.green}; }
.owj-detail-page .score-final--weak-value {
  color: ${T.red}; border-color: ${T.redBg2}; background: ${T.redBg};
}
.owj-detail-page .score-final--weak-value small { color: ${T.red}; }
.owj-detail-page .score-component-grid,
.owj-detail-page .score-valuation-grid,
.owj-detail-page .saved-facts {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
}
.owj-detail-page .score-component-grid > div,
.owj-detail-page .score-valuation-grid > div,
.owj-detail-page .saved-facts > div {
  min-width: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 15px 14px;
  background: ${T.raised};
  border: 1px solid ${T.border};
  border-radius: 13px;
}
.owj-detail-page :where(.saved-facts, .score-component-grid, .score-valuation-grid) dt,
.owj-detail-page .saved-stack dt {
  margin: 0;
  color: ${T.textMuted};
  font-size: 11px;
  font-weight: 650;
  line-height: 1.7;
}
.owj-detail-page :where(.saved-facts, .score-component-grid, .score-valuation-grid) dd,
.owj-detail-page .saved-stack dd {
  margin: 0;
  color: ${T.text};
  font-size: 15px;
  font-weight: 800;
  line-height: 1.75;
  overflow-wrap: anywhere;
}
.owj-detail-page .score-equation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  max-width: 100%;
  min-height: 71px;
  padding: 16px;
  margin: 19px 0;
  border-radius: 15px;
  background: ${T.primaryBg};
  border: 1px dashed ${T.primaryBg2};
  color: ${T.textSec};
  overflow-x: auto;
  scrollbar-width: thin;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.owj-detail-page .score-equation span {
  color: ${T.text}; font-size: 16px; font-weight: 800; background:white;
}
.owj-detail-page .score-equation b { color: ${T.textMuted}; font-size: 17px; }
.owj-detail-page .score-equation strong {
  color: ${T.primary}; font-size: 20px; font-weight: 900;
}
.owj-detail-page .score-valuation-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.owj-detail-page .score-valuation-grid > div { background: ${T.surface}; border-color: ${T.borderMed}; }
.owj-detail-page .score-explanations {
  display: grid;
  gap: 9px;
  list-style: none;
  margin: 19px 0 0;
  padding: 0;
}
.owj-detail-page .score-explanations li {
  position: relative;
  padding: 11px 27px 11px 12px;
  border-radius: 12px;
  background: ${T.raised};
  color: ${T.textSec};
  font-size: 12px;
  line-height: 1.95;
  overflow-wrap: anywhere;
}
.owj-detail-page .score-explanations li::before {
  content: '•';
  position: absolute;
  top: 10px;
  right: 12px;
  color: ${T.secondaryDark};
  font-weight: 900;
}
.owj-detail-page .comparable-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 12px;
}
.owj-detail-page .comparable-list article {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 14px;
  padding: 18px;
  border-radius: 15px;
  background: ${T.raised};
  border: 1px solid ${T.border};
  min-width: 0;
}
.owj-detail-page .comparable-list article > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
}
.owj-detail-page .comparable-list article > div:last-child {
  align-items: flex-end;
  justify-content: space-between;
  flex: none;
  text-align: left;
}
.owj-detail-page .comparable-list article span {
  color: ${T.textMuted}; font-size: 11px; font-weight: 650;
}
.owj-detail-page .comparable-list article a {
  color: ${T.text}; font-size: 13px; font-weight: 800;
  line-height: 1.8; text-decoration: none;
  overflow-wrap: anywhere;
}
.owj-detail-page .comparable-list article a:hover { color: ${T.primary}; }
.owj-detail-page .comparable-list article small {
  color: ${T.textSec}; font-size: 11px; line-height: 1.8;
}
.owj-detail-page .comparable-list article strong {
  color: ${T.text}; font-size: 14px; font-weight: 850;
  white-space: nowrap;
}
.owj-detail-page .comparable-list article b {
  display: inline-flex;
  padding: 4px 10px;
  border: 1px solid ${T.secondaryBg2};
  background: ${T.secondaryBg};
  color: ${T.secondaryDark};
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
}
.owj-detail-page .saved-panel--map .saved-panel__head { align-items: center; }
.owj-detail-page .nearby-refresh {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 43px;
  flex: none;
  padding: 9px 16px;
  border: 1px solid ${T.borderLight};
  background: ${T.surface};
  color: ${T.text};
  border-radius: 11px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  transition: background .18s ease;
}
.owj-detail-page .nearby-refresh:hover:not(:disabled) { background: ${T.raised}; }
.owj-detail-page .saved-panel--map > div:not(.saved-panel__head):not(.nearby-place-list) {
  min-width: 0;
  border-radius: 15px;
}
.owj-detail-page .nearby-place-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 10px;
  margin-top: 16px;
}
.owj-detail-page .nearby-place-list article {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 14px;
  border: 1px solid ${T.border};
  background: ${T.raised};
  border-radius: 13px;
}
.owj-detail-page .nearby-place-list article > span {
  flex: none;
  display: grid;
  place-items: center;
  min-width: 53px;
  min-height: 38px;
  padding: 7px 10px;
  color: ${T.secondaryDark};
  background: ${T.secondaryBg};
  border-radius: 10px;
  font-size: 11px;
  font-weight: 750;
}
.owj-detail-page .nearby-place-list article > div {
  display: flex; flex: 1; min-width: 0; flex-direction: column; gap: 4px;
}
.owj-detail-page .nearby-place-list article strong {
  color: ${T.text}; font-size: 12px; font-weight: 800; line-height: 1.7;
}
.owj-detail-page .nearby-place-list article small {
  color: ${T.textMuted}; font-size: 11px; line-height: 1.6; overflow-wrap: anywhere;
}
.owj-detail-page .nearby-place-list article b {
  display: flex; flex-direction: column; align-items: flex-end; gap: 3px;
  color: ${T.text}; flex: none; font-size: 12px; font-weight: 800;
  white-space: nowrap;
}
.owj-detail-page .nearby-place-list article b small {
  color: ${T.secondaryDark}; font-size: 10px; font-weight: 750;
}
.owj-detail-page .nearby-place-list > p {
  grid-column: 1/-1;
  margin: 0;
  color: ${T.textMuted};
  padding: 15px;
  border-radius: 13px;
  background: ${T.raised};
  font-size: 12px;
  line-height: 2;
}
.owj-detail-page .saved-stack {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  margin: 0;
}
.owj-detail-page .saved-stack > div {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${T.border};
}
.owj-detail-page .saved-stack > div:last-child { border-bottom: none; }
.owj-detail-page .saved-stack dd { text-align: left; max-width: 67%; }
.owj-detail-page .saved-panel--facts,
.owj-detail-page .saved-panel--facts .saved-stack,
.owj-detail-page .saved-panel--facts .saved-stack > div {
  background: #fff;
}
.owj-detail-page .saved-panel--facts h2,
.owj-detail-page .saved-panel--facts dt,
.owj-detail-page .saved-panel--facts dd {
  color: #000;
}
.owj-detail-page .saved-advertiser {
  display: inline-flex;
  align-items: center;
  min-height: 39px;
  padding: 8px 13px;
  background: ${T.secondaryBg};
  color: ${T.secondaryDark};
  border: 1px solid ${T.secondaryBg2};
  border-radius: 11px;
  font-size: 13px;
  font-weight: 850;
}
.owj-detail-page .saved-amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}
.owj-detail-page .saved-amenity {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 39px;
  padding: 8px 12px;
  border: 1px solid ${T.borderMed};
  border-radius: 11px;
  background: ${T.raised};
  color: ${T.textSec};
  font-size: 12px;
  font-weight: 650;
  line-height: 1.7;
}
.owj-detail-page .saved-amenity::before {
  content: '•'; font-size: 14px; font-weight: 900; line-height: 1;
}
.owj-detail-page .saved-amenity--yes {
  color: ${T.green}; background: ${T.greenBg}; border-color: ${T.greenBg2};
}
.owj-detail-page .saved-amenity--yes::before { content: '✓'; }
.owj-detail-page .saved-amenity--no {
  color: ${T.textMuted}; background: ${T.raised}; border-color: ${T.border};
}
.owj-detail-page .saved-amenity--no::before { content: '−'; }
.owj-detail-page .saved-amenity--unknown::before { content: none; }
.owj-detail-page .coverage-meter {
  display: block;
  height: 9px;
  width: 100%;
  margin: 8px 0 17px;
  overflow: hidden;
  background: ${T.borderLight};
  border-radius: 999px;
}
.owj-detail-page .coverage-meter > span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: ${T.secondary};
  transition: width .5s ease;
}
.owj-detail-page .saved-panel > strong:not(.saved-advertiser) {
  color: ${T.text}; font-size: 26px; font-weight: 900;
}
.owj-detail-page .owj-detail-state {
  display: grid;
  place-items: center;
  min-height: min(67vh, 650px);
  margin: 20px 0;
  padding: 28px 16px;
  border: 1px solid ${T.border};
  border-radius: 22px;
  background: ${T.surface};
  box-shadow: ${T.shadow};
  text-align: center;
}
.owj-detail-page .owj-detail-state > div { max-width: 450px; }
.owj-detail-page .owj-detail-state__icon {
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  width: 66px;
  height: 66px;
  border-radius: 20px;
  background: ${T.primaryBg};
  color: ${T.primary};
}
.owj-detail-page .owj-detail-state--error .owj-detail-state__icon {
  background: ${T.redBg}; color: ${T.red};
}
.owj-detail-page .owj-detail-state h1 {
  font-size: 21px;
  line-height: 1.7;
  margin: 0 0 8px;
  font-weight: 900;
  color: ${T.text};
}
.owj-detail-page .owj-detail-state p {
  color: ${T.textSec};
  margin: 0 0 20px;
  font-size: 13px;
  line-height: 2;
  overflow-wrap: anywhere;
}
.owj-detail-page .owj-detail-state a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 10px 19px;
  border-radius: 12px;
  border: 1px solid ${T.primaryBg2};
  background: ${T.primaryBg};
  color: ${T.primary};
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
}
@media (max-width: 1020px) {
  .owj-detail-page .saved-detail-hero { grid-template-columns: minmax(0, 1fr); }
  .owj-detail-page .saved-detail-price { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: center; }
  .owj-detail-page .saved-detail-price > span,
  .owj-detail-page .saved-detail-price > strong,
  .owj-detail-page .saved-detail-price > small,
  .owj-detail-page .saved-refetch-status { grid-column: 1 / -1; }
  .owj-detail-page .saved-detail-price > small { margin: -2px 0 6px; padding-bottom: 13px; }
  .owj-detail-page .score-component-grid,
  .owj-detail-page .score-valuation-grid,
  .owj-detail-page .saved-facts { grid-template-columns: repeat(3, minmax(0,1fr)); }
}
@media (max-width: 760px) {
  .owj-detail-page .saved-detail-main { padding: 15px 15px 64px; }
  .owj-detail-page .saved-detail-breadcrumb { margin-bottom: 12px; }
  .owj-detail-page .saved-detail-hero { padding: 22px; border-radius: 20px; gap: 22px; }
  .owj-detail-page .saved-detail-hero h1 { font-size: 25px; }
  .owj-detail-page .saved-detail-price { padding: 19px; }
  .owj-detail-page .saved-detail-grid { grid-template-columns: 1fr; gap: 14px; }
  .owj-detail-page .saved-panel--wide,
  .owj-detail-page .saved-panel--map { grid-column: auto; }
  .owj-detail-page .saved-panel { padding: 20px; border-radius: 19px; scroll-margin-top: 120px; }
  .owj-detail-page .score-component-grid,
  .owj-detail-page .score-valuation-grid,
  .owj-detail-page .saved-facts { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .owj-detail-page .comparable-list,
  .owj-detail-page .nearby-place-list { grid-template-columns: 1fr; }
  .owj-detail-page .saved-panel--map .saved-panel__head { align-items: stretch; flex-direction: column; }
  .owj-detail-page .nearby-refresh { width: 100%; }
}
@media (max-width: 420px) {
  .owj-detail-page .saved-detail-main { padding: 11px 12px 54px; }
  .owj-detail-page .saved-detail-hero { padding: 19px 17px; border-radius: 18px; }
  .owj-detail-page .saved-detail-hero h1 { font-size: 23px; }
  .owj-detail-page .saved-detail-highlights { gap: 7px; }
  .owj-detail-page .saved-detail-highlights > span { padding: 8px 10px; font-size: 11px; }
  .owj-detail-page .saved-detail-price { display: flex; padding: 17px; gap: 9px; }
  .owj-detail-page .saved-detail-price > small { margin-bottom: 5px; }
  .owj-detail-page .saved-panel { padding: 17px 15px; }
  .owj-detail-page .saved-panel__head { gap: 13px; }
  .owj-detail-page .score-final { min-width: 98px; padding: 9px; font-size: 28px; }
  .owj-detail-page .score-final small { font-size: 9px; }
  .owj-detail-page .score-component-grid > div,
  .owj-detail-page .score-valuation-grid > div,
  .owj-detail-page .saved-facts > div { padding: 13px 10px; }
  .owj-detail-page .saved-facts dd,
  .owj-detail-page .score-component-grid dd,
  .owj-detail-page .score-valuation-grid dd { font-size: 14px; }
  .owj-detail-page .comparable-list article { flex-direction: column; gap: 12px; }
  .owj-detail-page .comparable-list article > div:last-child {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .owj-detail-page .nearby-place-list article { padding: 11px; gap: 8px; }
  .owj-detail-page .nearby-place-list article b { white-space: normal; }
}
@media (prefers-reduced-motion: reduce) {
  .owj-detail-page *, .owj-detail-page *::before, .owj-detail-page *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}

`;

function Fact({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{persianText(value ?? "—")}</dd>
    </div>
  );
}
function ListingDescription({ description }) {
  const textRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const text = persianText(
    description || "توضیح عمومی برای این آگهی ذخیره نشده است.",
  );

  useEffect(() => setExpanded(false), [description]);
  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const lineHeight = Number.parseFloat(
        window.getComputedStyle(element).lineHeight,
      );
      setHasOverflow(
        Number.isFinite(lineHeight) &&
          element.scrollHeight > lineHeight * 3 + 1,
      );
    };
    measure();
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measure);
    observer?.observe(element);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      active = false;
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [text, expanded]);

  return (
    <div className="saved-description">
      <p
        id="listing-description"
        ref={textRef}
        className={`saved-description__text${expanded ? "" : " saved-description__text--collapsed"}`}
      >
        {text}
      </p>
      {hasOverflow && (
        <button
          className="saved-description__toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls="listing-description"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "نمایش کمتر" : "نمایش بیشتر"}
        </button>
      )}
    </div>
  );
}
export default function SavedListingDetailPage({ token }) {
  injectGlobalCSS();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const [refetching, setRefetching] = useState(false);
  const [refetchStatus, setRefetchStatus] = useState("");
  const [placesLoading, setPlacesLoading] = useState(false);
  const [scoreDetail, setScoreDetail] = useState(null);
  const [scenarioScores, setScenarioScores] = useState([]);
  const [scoreLoading, setScoreLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/listings/${encodeURIComponent(token)}`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(
              new Error(
                response.status === 404
                  ? "آگهی ذخیره‌شده پیدا نشد."
                  : `HTTP ${response.status}`,
              ),
            ),
      )
      .then(setListing)
      .catch((caught) => {
        if (caught.name !== "AbortError") setError(caught.message);
      });
    return () => controller.abort();
  }, [token]);
  useEffect(() => {
    const controller = new AbortController();
    setScoreLoading(true);
    Promise.all([
      fetch(`/score-details/${encodeURIComponent(token)}`, {
        signal: controller.signal,
      }).then((response) => (response.ok ? response.json() : null)),
      fetch(`/listings/${encodeURIComponent(token)}/scenario-scores`, {
        signal: controller.signal,
      }).then((response) => (response.ok ? response.json() : { scores: [] })),
    ])
      .then(([detail, scenarios]) => {
        setScoreDetail(detail);
        setScenarioScores(scenarios?.scores || []);
      })
      .catch((caught) => {
        if (caught.name !== "AbortError") setScoreDetail(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setScoreLoading(false);
      });
    return () => controller.abort();
  }, [token]);
  const refetch = async () => {
    setRefetching(true);
    setRefetchStatus("");
    try {
      const response = await fetch(
        `/listings/${encodeURIComponent(token)}/refetch`,
        { method: "POST", headers: { accept: "application/json" } },
      );
      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload.message || `HTTP ${response.status}`);
      setListing(payload.listing);
      setRefetchStatus(
        payload.changed
          ? "جزئیات تازه دریافت و ذخیره شد."
          : "آگهی بررسی شد؛ تغییری وجود نداشت.",
      );
    } catch (caught) {
      setRefetchStatus(`بازیابی ناموفق بود: ${caught.message}`);
    } finally {
      setRefetching(false);
    }
  };
  const refreshPlaces = async () => {
    setPlacesLoading(true);
    setRefetchStatus("");
    try {
      const response = await fetch(
        `/listings/${encodeURIComponent(token)}/nearby-places`,
        { method: "POST", headers: { accept: "application/json" } },
      );
      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload.message || `HTTP ${response.status}`);
      setListing(payload.listing);
      setRefetchStatus(
        `${formatNumber(payload.nearbyPlaces.length)} مکان حمل‌ونقل عمومی ذخیره شد.`,
      );
    } catch (caught) {
      setRefetchStatus(`دریافت مکان‌های اطراف ناموفق بود: ${caught.message}`);
    } finally {
      setPlacesLoading(false);
    }
  };
  if (!listing && !error)
    return (
      <div className="owj-detail-page" dir="rtl">
        <style>{DETAIL_CSS}</style>
        <AppHeader active="listings" />
        <main className="saved-detail-main">
          <section
            className="owj-detail-state"
            role="status"
            aria-live="polite"
          >
            <div>
              <span className="owj-detail-state__icon">
                <Icon name="building" size={29} />
              </span>
              <h1>در حال بارگذاری جزئیات آگهی…</h1>
              <p>اطلاعات ملک، قیمت و موقعیت مکانی در حال دریافت است.</p>
            </div>
          </section>
        </main>
      </div>
    );
  if (error)
    return (
      <div className="owj-detail-page" dir="rtl">
        <style>{DETAIL_CSS}</style>
        <AppHeader active="listings" />
        <main className="saved-detail-main">
          <section
            className="owj-detail-state owj-detail-state--error"
            role="alert"
          >
            <div>
              <span className="owj-detail-state__icon">
                <Icon name="alert" size={29} />
              </span>
              <h1>جزئیات آگهی در دسترس نیست</h1>
              <p>{persianText(error)}</p>
              <a href="/catalog">بازگشت به فهرست آگهی‌ها</a>
            </div>
          </section>
        </main>
      </div>
    );
  const property = listing.property || {};
  const pricing = listing.pricing || {};
  const scored = scoreDetail?.listing;
  const comparables = scored?.evidence?.comparables || [];
  return (
    <div className="owj-detail-page" dir="rtl">
      <style>{DETAIL_CSS}</style>
      <AppHeader active="listings" />
      <main className="saved-detail-main" id="main-content">
        <nav className="saved-detail-breadcrumb" aria-label="مسیر صفحه">
          <a href="/catalog">آگهی‌ها</a>
          <span aria-hidden="true">‹</span>
          <span>{persianText(listing.neighborhood || listing.token)}</span>
        </nav>
        <header className="saved-detail-hero">
          <div>
            <div className="catalog-tags">
              <span className="status-pill status-pill--active">
                {persianText(
                  advertiserLabels[listing.advertiserType] || "نامشخص",
                )}
              </span>
              <span className="status-pill">
                {persianText(listing.neighborhood || "مکان نامشخص")}
              </span>
              <span className="status-pill">
                {displayPublication(listing.publishedText)}
              </span>
              {scored && (
                <span className={`score-tag score-tag--${scored.scores.band}`}>
                  امتیاز اصلی {formatNumber(scored.scores.recommendation)} ·{" "}
                  {scoreBandLabels[scored.scores.band]}
                </span>
              )}
              {scenarioScores.map((item) => (
                <span
                  className="score-tag score-tag--scenario"
                  key={item.scenarioId}
                >
                  {persianText(item.name)}: {formatNumber(item.recommendation)}
                </span>
              ))}
            </div>
            <h1>{persianText(listing.title)}</h1>
            <ListingDescription
              key={listing.token}
              description={listing.description}
            />
            <div
              className="saved-detail-highlights"
              aria-label="مشخصات کلیدی ملک"
            >
              <span>
                متراژ <strong>{formatNumber(property.area)} متر</strong>
              </span>
              <span>
                اتاق <strong>{formatNumber(property.rooms)}</strong>
              </span>
              <span>
                سال ساخت{" "}
                <strong>{formatYear(property.constructionYear)}</strong>
              </span>
            </div>
          </div>
          <aside className="saved-detail-price">
            <span>قیمت کل</span>
            <strong>{formatMoney(pricing.price)}</strong>
            <small>هر متر {formatMoney(pricing.pricePerMeter)}</small>
            <button type="button" onClick={refetch} disabled={refetching}>
              <Icon name="refresh" size={16} />
              {refetching ? "در حال دریافت…" : "دریافت دوباره جزئیات"}
            </button>
            <a href={listing.url} target="_blank" rel="noreferrer">
              مشاهده آگهی <Icon name="external" size={16} />
            </a>
            <p className="saved-refetch-status" aria-live="polite">
              {persianText(refetchStatus)}
            </p>
          </aside>
        </header>
        <ListingDecisionSummary listing={listing} scoreDetail={scoreDetail} scoreLoading={scoreLoading} />
        <ListingImageGallery
          key={listing.token}
          images={listing.images}
          title={listing.title}
        />
        <nav
          className="saved-detail-jumps"
          aria-label="دسترسی سریع به بخش‌های آگهی"
        >
          <a href="#owj-specs">مشخصات ملک</a>
          <a href="#owj-pricing">قیمت‌گذاری</a>
          <a href="#owj-amenities">امکانات</a>
          <a href="#owj-map">موقعیت روی نقشه</a>
          {scored && <a href="#owj-score">تحلیل امتیاز</a>}
          {scored && <a href="#owj-comparables">خانه‌های مشابه</a>}
        </nav>
        <div className="saved-detail-grid">
          {scored && (
            <section
              id="owj-score"
              className="saved-panel saved-panel--wide score-detail-panel"
            >
              <div className="saved-panel__head">
                <div>
                  <h2>امتیاز، محاسبه و نتیجه نهایی</h2>
                  <p>
                    نسخه {persianText(scoreDetail.scoringVersion)} · رتبه{" "}
                    {formatNumber(scoreDetail.population.rank)} از{" "}
                    {formatNumber(scoreDetail.population.total)}
                  </p>
                </div>
                <strong
                  className={`score-final score-final--${scored.scores.band}`}
                >
                  {formatNumber(scored.scores.recommendation)}
                  <small>{scoreBandLabels[scored.scores.band]}</small>
                </strong>
              </div>
              <div className="score-component-grid">
                <Fact
                  label="ارزش قیمت ترکیبی"
                  value={formatNumber(scored.scores.dealValue)}
                />
                <Fact
                  label="مقایسه با مدل"
                  value={formatNumber(scored.scores.modelValue)}
                />
                <Fact
                  label="آگهی‌های مشابه"
                  value={formatNumber(scored.scores.nearbyValue)}
                />
                <Fact
                  label="جایگاه محلی"
                  value={formatNumber(scored.scores.localPosition)}
                />
                <Fact
                  label="اعتماد داده"
                  value={formatNumber(scored.scores.confidence)}
                />
                <Fact label="ریسک" value={formatNumber(scored.scores.risk)} />
                <Fact
                  label="کیفیت ملک"
                  value={formatNumber(scored.scores.propertyQuality)}
                />
                <Fact
                  label="کیفیت داده"
                  value={formatNumber(scored.scores.dataQuality)}
                />
              </div>
              <div className="score-equation" dir="ltr">
                <span>{formatNumber(scored.scores.dealValue)}</span>
                <b>×</b>
                <span>
                  {persianText(scored.formula.appliedConfidenceGate.toFixed(3))}
                </span>
                <b>×</b>
                <span>
                  {persianText(scored.formula.appliedRiskGate.toFixed(3))}
                </span>
                <b>=</b>
                <strong>{formatNumber(scored.scores.recommendation)}</strong>
              </div>
              <div className="score-valuation-grid">
                <Fact
                  label="قیمت برآوردی"
                  value={formatMoney(scored.valuation.predictedPrice)}
                />
                <Fact
                  label="بازه پایین برآورد"
                  value={formatMoney(scored.valuation.predictionRangeLow)}
                />
                <Fact
                  label="بازه بالای برآورد"
                  value={formatMoney(scored.valuation.predictionRangeHigh)}
                />
                <Fact
                  label="اختلاف قیمت آگهی با برآورد"
                  value={formatMoney(scored.valuation.askingVsPrediction)}
                />
              </div>
              {!!scored.explanations?.length && (
                <ul className="score-explanations">
                  {scored.explanations.map((text) => (
                    <li key={text}>{persianText(text)}</li>
                  ))}
                </ul>
              )}
            </section>
          )}
          {scored && !comparables.length && (
            <section
              id="owj-comparables"
              className="saved-panel saved-panel--wide"
            >
              <h2>خانه‌های مشابه مورد مقایسه</h2>
              <p>برای این آگهی مقایسه مشابه کافی در خروجی فعلی وجود ندارد.</p>
            </section>
          )}
          {!!comparables.length && (
            <section
              id="owj-comparables"
              className="saved-panel saved-panel--wide"
            >
              <div className="saved-panel__head">
                <div>
                  <h2>خانه‌های مشابه مورد مقایسه</h2>
                  <p>
                    {formatNumber(comparables.length)} آگهی نزدیک و مشابه که در
                    برآورد این ملک استفاده شده‌اند.
                  </p>
                </div>
              </div>
              <div className="comparable-list">
                {comparables.map((item) => (
                  <article key={item.token}>
                    <div>
                      <span>{persianText(item.neighborhood)}</span>
                      <a href={`/listing/${item.token}`}>
                        {persianText(item.title)}
                      </a>
                      <small>
                        {formatNumber(item.area)} متر ·{" "}
                        {formatNumber(item.rooms)} اتاق · فاصله{" "}
                        {formatNumber(item.distanceMeters)} متر
                      </small>
                    </div>
                    <div>
                      <strong>{formatMoney(item.askingPrice)}</strong>
                      <small>
                        هر متر {formatMoney(item.askingPricePerMeter)}
                      </small>
                      <b>شباهت {formatNumber(item.similarity)}٪</b>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
          <section id="owj-map" className="saved-panel saved-panel--map">
            <div className="saved-panel__head">
              <div>
                <h2>موقعیت و حمل‌ونقل عمومی</h2>
                <p>مختصات عمومی آگهی ممکن است تقریبی باشد.</p>
              </div>
              <button
                className="nearby-refresh"
                type="button"
                onClick={refreshPlaces}
                disabled={placesLoading}
              >
                {placesLoading ? "در حال جستجو…" : "به‌روزرسانی مکان‌های اطراف"}
              </button>
            </div>
            <NeshanListingMap
              coordinates={listing.coordinates}
              places={listing.nearbyPlaces || []}
            />
            <div className="nearby-place-list">
              {(listing.nearbyPlaces || []).map((place) => {
                const travel = nearbyTravel(place);
                return (
                  <article
                    key={
                      place.poiHash ||
                      `${place.category}-${place.title}-${place.distanceMeters}`
                    }
                  >
                    <span>
                      {place.category === "metro-station" ? "مترو" : "اتوبوس"}
                    </span>
                    <div>
                      <strong>{persianText(place.title)}</strong>
                      <small>
                        {place.routeMode === "pedestrian"
                          ? "مسیر پیاده محاسبه‌شده توسط نشان"
                          : "فاصله برآوردی سرویس مکان‌های نزدیک نشان"}
                      </small>
                    </div>
                    <b>
                      {travel.distance}
                      {travel.duration && <small>{travel.duration}</small>}
                    </b>
                  </article>
                );
              })}
              {!listing.nearbyPlaces?.length && (
                <p>هنوز مکان عمومی اطراف این ملک دریافت نشده است.</p>
              )}
            </div>
          </section>
          <section id="owj-specs" className="saved-panel saved-panel--wide">
            <h2>مشخصات ملک</h2>
            <dl className="saved-facts">
              <Fact
                label="متراژ"
                value={
                  property.area == null
                    ? "—"
                    : `${formatNumber(property.area)} متر`
                }
              />
              <Fact label="اتاق" value={formatNumber(property.rooms)} />
              <Fact
                label="سال ساخت"
                value={formatYear(property.constructionYear)}
              />
              <Fact label="طبقه" value={formatNumber(property.floor)} />
              <Fact
                label="تعداد طبقات"
                value={formatNumber(property.totalFloors)}
              />
              <Fact
                label="واحد در طبقه"
                value={formatNumber(property.unitsPerFloor)}
              />
              {Object.entries(listing.propertyDetails || {}).map(
                ([key, value]) => (
                  <Fact
                    key={key}
                    label={detailLabels[key] || key}
                    value={value}
                  />
                ),
              )}
            </dl>
          </section>
          <section id="owj-pricing" className="saved-panel saved-panel--facts">
            <h2>قیمت‌گذاری</h2>
            <dl className="saved-stack">
              <Fact label="قیمت کل" value={formatMoney(pricing.price)} />
              <Fact
                label="قیمت هر متر"
                value={formatMoney(pricing.pricePerMeter)}
              />
              <Fact label="ودیعه" value={formatMoney(pricing.deposit)} />
              <Fact label="اجاره" value={formatMoney(pricing.rent)} />
            </dl>
          </section>
          <section className="saved-panel">
            <h2>نوع آگهی‌دهنده</h2>
            <strong className="saved-advertiser">
              {persianText(
                advertiserLabels[listing.advertiserType] || "نامشخص",
              )}
            </strong>
            <p>
              این طبقه‌بندی فقط از سیگنال‌های عمومی کسب‌وکار ساخته شده و هیچ نام
              یا اطلاعات تماسی ذخیره نمی‌شود.
            </p>
          </section>
          <section id="owj-amenities" className="saved-panel saved-panel--wide">
            <h2>امکانات</h2>
            <div className="saved-amenities">
              {Object.entries(listing.amenities || {}).map(([key, value]) => (
                <span
                  className={`saved-amenity saved-amenity--${value === true ? "yes" : value === false ? "no" : "unknown"}`}
                  key={key}
                >
                  {persianText(amenityLabels[key] || key)}:{" "}
                  {value === true
                    ? "دارد"
                    : value === false
                      ? "ندارد"
                      : "نامشخص"}
                </span>
              ))}
            </div>
          </section>
          <section className="saved-panel saved-panel--facts">
            <h2>مکان و منبع</h2>
            <dl className="saved-stack">
              <Fact label="شهر" value={listing.city} />
              <Fact label="محله" value={listing.neighborhood} />
              <Fact label="دقت مختصات" value={listing.coordinates?.accuracy} />
              <Fact label="منبع استخراج" value={listing.extraction?.source} />
            </dl>
          </section>
          <section className="saved-panel">
            <h2>پوشش استخراج</h2>
            <div className="coverage-meter">
              <span
                style={{
                  width: `${listing.extraction?.coveragePercent || 0}%`,
                }}
              />
            </div>
            <strong>
              {formatNumber(listing.extraction?.coveragePercent || 0)}٪
            </strong>
            <p>
              {formatNumber(listing.extraction?.presentFields?.length || 0)}{" "}
              فیلد کلیدی موجود است.
            </p>
          </section>
          {!!listing.attributes?.length && (
            <section className="saved-panel saved-panel--wide">
              <h2>ویژگی‌های ساختاریافته</h2>
              <dl className="saved-facts">
                {listing.attributes.map((attribute) => (
                  <Fact
                    key={`${attribute.key}-${attribute.label}`}
                    label={attribute.label}
                    value={attribute.value}
                  />
                ))}
              </dl>
            </section>
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
