"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SortableTh } from "./tableTools.jsx";
import { AppHeader, AppNavigation } from "./shared.jsx";

/* ──────────────────────── Formatters (unchanged logic) ──────────────────────── */
const number = new Intl.NumberFormat("fa-IR");
const decimal = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 });
const dateTime = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});

function formatNumber(value) {
  return Number.isFinite(value) ? number.format(value) : "—";
}
function formatPercent(value) {
  return Number.isFinite(value) ? `${decimal.format(value)}٪` : "—";
}
function formatSignedPercent(value) {
  if (!Number.isFinite(value)) return "—";
  return `${value > 0 ? "+" : ""}${decimal.format(value)}٪`;
}
function formatTime(value) {
  if (!value) return "—";
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? "—" : dateTime.format(parsed);
}
function formatDuration(milliseconds) {
  if (!Number.isFinite(milliseconds)) return "—";
  const minutes = Math.floor(milliseconds / 60_000);
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return hours
    ? `${formatNumber(hours)} ساعت و ${formatNumber(remainder)} دقیقه`
    : `${formatNumber(minutes)} دقیقه`;
}
function formatMoney(value) {
  if (!Number.isFinite(value)) return "—";
  if (value >= 1_000_000_000)
    return `${decimal.format(value / 1_000_000_000)} میلیارد تومان`;
  if (value >= 1_000_000)
    return `${decimal.format(value / 1_000_000)} میلیون تومان`;
  return `${formatNumber(value)} تومان`;
}
// Only changes the visible characters; never changes API data, URLs or keys.
function toPersianDigits(value) {
  return String(value ?? "").replace(
    /[0-9]/g,
    (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)],
  );
}

function clamp(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

/* ──────────────────────── Component design tokens ──────────────────────── */
const T = {
  primary: "#66308d",
  primaryLight: "#74479a",
  primaryPale: "#926eae",
  primaryGlow: "rgba(102,48,141,0.12)",
  primaryBg: "#f4eef8",
  primaryBg2: "#e9daef",

  secondary: "#01ae9b",
  secondaryLight: "#27c1ad",
  secondaryDark: "#087a6e",
  secondaryGlow: "rgba(1,174,155,0.10)",
  secondaryBg: "#e8f8f5",
  secondaryBg2: "#d2f0e9",

  bg: "#f7f8fa",
  bgGradient: "linear-gradient(180deg, #ffffff 0%, #f7f8fa 38%, #f7f8fa 100%)",
  surface: "#ffffff",
  surfaceLight: "#fbfbfc",
  surfaceHover: "#f8f7fa",
  surfaceGlass: "rgba(255,255,255,0.96)",
  raised: "#f5f6f8",

  border: "#edeef1",
  borderMed: "#e7e8ec",
  borderLight: "#dcdfe5",

  text: "#202127",
  textSec: "#60646e",
  textMuted: "#6b707b",

  // Existing T.white references mark strong text, not white surfaces.
  white: "#17191f",
  green: "#14785f",
  greenBg: "#eaf7f0",
  orange: "#a9661b",
  orangeBg: "#fff5e8",
  red: "#b6404b",
  redBg: "#fff0f1",

  radius: 18,
  radiusSm: 13,
  radiusXs: 10,

  shadow: "0 4px 22px rgba(24,31,41,0.035), 0 1px 3px rgba(24,31,41,0.025)",
  shadowLg: "0 12px 34px rgba(24,31,41,0.07)",
  glowPrimary: "0 0 0 0 transparent",
  glowSecondary: "0 0 0 0 transparent",
};

/* Component-local styles: intentionally no global document/head injection. */
const COMPONENT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap');
  .owj-dashboard,
  .owj-dashboard *,
  .owj-dashboard *::before,
  .owj-dashboard *::after { box-sizing: border-box; }
  .owj-dashboard { width:100%; min-width:0; overflow-x:clip; -webkit-font-smoothing:antialiased; }
  .owj-dashboard button, .owj-dashboard input, .owj-dashboard select { font:inherit; }
  .owj-dashboard button, .owj-dashboard a, .owj-dashboard select { -webkit-tap-highlight-color:transparent; }
  .owj-dashboard button:focus-visible, .owj-dashboard a:focus-visible,
  .owj-dashboard input:focus-visible, .owj-dashboard select:focus-visible,
  .owj-dashboard summary:focus-visible { outline:3px solid rgba(102,48,141,.32); outline-offset:3px; }
  .owj-dashboard input::placeholder { color:#8a8e98; opacity:1; }
  .owj-dashboard input[type="checkbox"] { accent-color:#66308d; }
  .owj-dashboard .owj-search-field:focus-within { border-color:#a785c2 !important; box-shadow:0 0 0 3px rgba(102,48,141,.09); }
  .owj-dashboard .owj-search-input { min-width:0; font-size:14px !important; }
  .owj-dashboard .owj-kpi-card, .owj-dashboard .owj-attention-card { min-width:0; }
  .owj-dashboard .owj-panel { min-width:0; }
  .owj-dashboard .owj-controls { min-width:0; }
  .owj-dashboard .owj-table-wrap { max-width:100%; scrollbar-width:thin; scrollbar-color:#dbdce3 transparent; }
  .owj-dashboard .owj-table-wrap::-webkit-scrollbar { height:6px; }
  .owj-dashboard .owj-table-wrap::-webkit-scrollbar-thumb { background:#dfe1e8; border-radius:50px; }
  .owj-dashboard .owj-nav { overflow:visible; }
  .owj-dashboard .owj-nav a:hover { color:#66308d !important; background:#f4eef8 !important; }
  .owj-dashboard .owj-icon-button:hover { color:#66308d !important; background:#f4eef8 !important; border-color:#e9daef !important; }
  .owj-dashboard .owj-link:hover { color:#66308d !important; }
  .owj-dashboard .owj-action-button:hover:not(:disabled) { background:#f5eff8 !important; color:#66308d !important; border-color:#e9daef !important; }
  .owj-dashboard .owj-action-button:disabled { opacity:.55; cursor:not-allowed; }
  .owj-dashboard .owj-mobile-sort { display:none; }
  .owj-dashboard .owj-mobile-recommendations { display:none; }
  .owj-dashboard .owj-hero-updated { display:none; }
  .owj-dashboard .owj-mobile-empty { display:flex; align-items:center; justify-content:center; }
  .owj-dashboard .owj-event-message { overflow-wrap:anywhere; }
  .owj-dashboard .owj-raw-json summary::marker { content:""; }
  .owj-dashboard .owj-raw-json summary::-webkit-details-marker { display:none; }
  .owj-dashboard .owj-raw-json summary:hover { background:#faf9fb; }
  .owj-dashboard .owj-raw-json[open] summary { border-bottom:1px solid #edeef1; }
  @keyframes owjPulse { 0%,100% {opacity:1;} 50% {opacity:.5;} }
  @keyframes owjDot { 0%,80%,100% {transform:scale(.6);opacity:.3;} 40% {transform:scale(1);opacity:1;} }
  @keyframes owjSlideUp { from {opacity:0;transform:translateY(8px);} to {opacity:1;transform:translateY(0);} }
  @keyframes owjFadeIn { from {opacity:0;} to {opacity:1;} }

  @media (max-width:1200px) {
    .owj-dashboard .owj-topbar { gap:12px !important; padding:12px 22px !important; height:auto !important; min-height:70px; flex-wrap:wrap; }
    .owj-dashboard .owj-nav { margin-right:0 !important; }
    .owj-dashboard .owj-nav a { padding:9px 12px !important; }
    .owj-dashboard .owj-main { padding-inline:22px !important; }
    .owj-dashboard .owj-kpi-grid, .owj-dashboard .owj-attention-grid { grid-template-columns:repeat(2,minmax(0,1fr)) !important; }
  }
  @media (max-width:900px) {
    .owj-dashboard .owj-topbar {
      display:grid !important; grid-template-columns:minmax(0,1fr) auto;
      grid-template-areas:"brand meta" "nav nav"; align-items:center; column-gap:12px !important;
      row-gap:8px !important; padding:12px 20px 10px !important;
    }
    .owj-dashboard .owj-brand { grid-area:brand; min-width:0; }
    .owj-dashboard .owj-nav { grid-area:nav; display:flex; flex:none !important; min-width:0; width:100%; overflow:visible; gap:5px !important; padding:3px 0 6px; white-space:nowrap; }
    .owj-dashboard .owj-nav a { flex:none; padding:9px 14px !important; }
    .owj-dashboard .owj-header-meta { grid-area:meta; gap:8px !important; }
    .owj-dashboard .owj-meta-date { display:none !important; }
    .owj-dashboard .owj-hero-updated { display:inline-flex; align-items:center; gap:7px; margin-top:13px; padding:9px 12px; border-radius:12px; background:#f0f1f4; color:#60646e; font-size:12px; }
    .owj-dashboard .owj-hero { grid-template-columns:minmax(0,1fr) !important; gap:20px !important; padding:32px 0 24px !important; }
    .owj-dashboard .owj-run-card { width:100%; padding:22px !important; }
    .owj-dashboard .owj-detail-grid { grid-template-columns:minmax(0,1fr) !important; gap:18px !important; }
    .owj-dashboard .owj-kpi-grid { gap:12px !important; margin-bottom:26px !important; }
    .owj-dashboard .owj-attention-grid { gap:12px !important; }
  }
  @media (max-width:640px) {
    .owj-dashboard { font-size:13px !important; line-height:1.65 !important; }
    .owj-dashboard .owj-topbar { padding:12px 16px 9px !important; }
    .owj-dashboard .owj-brand-icon { width:38px !important; height:38px !important; border-radius:12px !important; }
    .owj-dashboard .owj-brand-subtitle { display:none !important; }
    .owj-dashboard .owj-topbar-status { padding:6px 9px !important; font-size:11px !important; }
    .owj-dashboard .owj-icon-button { width:44px !important; height:44px !important; }
    .owj-dashboard .owj-nav { gap:6px !important; }
    .owj-dashboard .owj-nav a { font-size:12px !important; padding:9px 11px !important; min-height:40px; display:inline-flex; align-items:center; }
    .owj-dashboard .owj-main { padding:0 14px 46px !important; }
    .owj-dashboard .owj-hero { padding:26px 0 22px !important; gap:18px !important; }
    .owj-dashboard .owj-hero-copy h1 { font-size:clamp(24px,6.2vw,32px) !important; line-height:1.48 !important; }
    .owj-dashboard .owj-hero-copy p { font-size:13px !important; line-height:1.9 !important; }
    .owj-dashboard .owj-run-card { padding:19px !important; gap:14px !important; }
    .owj-dashboard .owj-run-count { font-size:38px !important; }
    .owj-dashboard .owj-kpi-grid { grid-template-columns:repeat(2,minmax(0,1fr)) !important; gap:9px !important; }
    .owj-dashboard .owj-kpi-card { padding:16px 14px !important; gap:9px !important; border-top-width:1px !important; }
    .owj-dashboard .owj-kpi-card > div:first-child > span:first-child { font-size:12px !important; }
    .owj-dashboard .owj-kpi-card-value { font-size:clamp(21px,5vw,28px) !important; letter-spacing:0 !important; line-height:1.25 !important; overflow-wrap:anywhere; }
    .owj-dashboard .owj-kpi-card-detail { flex-wrap:wrap !important; line-height:1.6; }
    .owj-dashboard .owj-kpi-card-icon { width:34px !important; height:34px !important; }
    .owj-dashboard .owj-attention-grid { grid-template-columns:minmax(0,1fr) !important; gap:10px !important; }
    .owj-dashboard .owj-attention-card { padding:17px !important; gap:12px !important; }
    .owj-dashboard .owj-attention-card-value { font-size:23px !important; }
    .owj-dashboard .owj-panel { padding:18px 15px !important; margin-bottom:16px !important; }
    .owj-dashboard .owj-section-heading { gap:10px !important; margin-bottom:18px !important; }
    .owj-dashboard .owj-section-heading > div:first-child { min-width:0 !important; flex-basis:100%; }
    .owj-dashboard .owj-section-heading h2 { font-size:18px !important; }
    .owj-dashboard .owj-section-heading > div:first-child > span:first-child { font-size:12px !important; }
    .owj-dashboard .owj-section-heading p { font-size:12px !important; line-height:1.85 !important; }
    .owj-dashboard .owj-heading-aside { align-items:flex-start !important; }
    .owj-dashboard .owj-heading-aside strong { font-size:24px !important; }
    .owj-dashboard .owj-location-body { justify-content:center !important; gap:20px !important; }
    .owj-dashboard .owj-controls { flex-direction:column !important; align-items:stretch !important; gap:12px !important; }
    .owj-dashboard .owj-search-field { width:100% !important; min-width:0 !important; flex:none !important; min-height:48px; padding:10px 13px !important; }
    .owj-dashboard .owj-search-input { font-size:16px !important; }
    .owj-dashboard .owj-controls-result { align-self:flex-start; }
    .owj-dashboard .owj-mobile-sort { display:flex; align-items:center; gap:10px; margin:12px 0 18px; flex-wrap:wrap; font-size:12px; color:#60646e; }
    .owj-dashboard .owj-mobile-sort label { flex:1; min-width:170px; display:flex; align-items:center; gap:9px; }
    .owj-dashboard .owj-mobile-sort select { flex:1; min-width:0; border:1px solid #e2e3e9; border-radius:12px; background:#fff; color:#202127; min-height:44px; padding:8px 12px; outline:none; cursor:pointer; }
    .owj-dashboard .owj-mobile-sort button { border:1px solid #e2e3e9; border-radius:12px; background:#fff; color:#66308d; padding:8px 13px; min-height:44px; cursor:pointer; white-space:nowrap; }
    /* The areas table becomes semantic, easy-to-scan cards on narrow screens. */
    .owj-dashboard .owj-area-table-wrap { border:0 !important; overflow:visible !important; }
    .owj-dashboard .owj-area-table, .owj-dashboard .owj-area-table tbody { display:block; width:100%; }
    .owj-dashboard .owj-area-table thead { display:none; }
    .owj-dashboard .owj-area-table tbody { display:grid; gap:10px; }
    .owj-dashboard .owj-area-table tr { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); padding:14px; gap:12px 14px; border:1px solid #e9eaf0; border-radius:14px; background:white; }
    .owj-dashboard .owj-area-table td { display:flex; flex-direction:column; gap:4px; padding:0 !important; border:0 !important; white-space:normal !important; min-width:0; font-size:13px; }
    .owj-dashboard .owj-area-table td:first-child { grid-column:1/-1; padding-bottom:9px !important; border-bottom:1px solid #f0f0f3 !important; }
    .owj-dashboard .owj-area-table td:not(:first-child)::before { content:attr(data-label); color:#6b707b; font-size:11px; font-weight:500; }
    .owj-dashboard .owj-area-table td:last-child { align-items:flex-start; }
    .owj-dashboard .owj-area-table td:first-child strong { font-size:14px !important; }
    /* Desktop matrix becomes collapsible, finger-friendly listing cards. */
    .owj-dashboard .owj-reco-desktop-table { display:none !important; }
    .owj-dashboard .owj-mobile-recommendations { display:grid; gap:10px; margin-bottom:10px; }
    .owj-dashboard .owj-mobile-recommendations details { background:#fff; border:1px solid #e8e9ed; border-radius:15px; overflow:hidden; }
    .owj-dashboard .owj-mobile-recommendations details[open] { border-color:#d8c8e4; box-shadow:0 3px 15px rgba(102,48,141,.05); }
    .owj-dashboard .owj-mobile-recommendations summary { list-style:none; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:15px 13px; cursor:pointer; }
    .owj-dashboard .owj-mobile-recommendations summary::-webkit-details-marker { display:none; }
    .owj-dashboard .owj-mobile-recommendations summary > span { display:flex; flex-direction:column; gap:4px; flex:1; min-width:0; }
    .owj-dashboard .owj-mobile-recommendations summary strong { font-size:13px; color:#202127; line-height:1.65; }
    .owj-dashboard .owj-mobile-recommendations summary small { font-size:11px; color:#6b707b; overflow-wrap:anywhere; }
    .owj-dashboard .owj-mobile-score { flex:none; min-width:59px; padding:9px 7px; border-radius:12px; background:#f4eef8; text-align:center; color:#66308d; font-weight:800; font-size:18px; line-height:1.3; }
    .owj-dashboard .owj-mobile-score span { display:block; font-size:10px; color:#69616f; font-weight:500; margin-top:2px; }
    .owj-dashboard .owj-mobile-factor-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; padding:14px 12px; background:#fcfcfd; border-top:1px solid #edeef1; }
    .owj-dashboard .owj-mobile-factor { display:flex; flex-direction:column; gap:8px; min-width:0; padding:11px; background:#fff; border:1px solid #ededf0; border-radius:12px; }
    .owj-dashboard .owj-mobile-factor > span:first-child { font-size:11px; color:#60646e; }
    .owj-dashboard .owj-mobile-evidence { grid-column:1/-1; display:flex; gap:8px; font-size:12px; color:#60646e; align-items:center; padding:8px 2px; flex-wrap:wrap; }
    .owj-dashboard .owj-view-listing { grid-column:1/-1; display:flex; justify-content:center; align-items:center; background:#66308d; color:#fff; text-decoration:none; padding:12px; border-radius:12px; font-size:13px; font-weight:700; min-height:46px; }
    .owj-dashboard .owj-view-listing:hover { background:#552676; }
    .owj-dashboard .owj-event-row { flex-wrap:wrap !important; align-items:center !important; padding:12px 8px !important; gap:7px 9px !important; border-bottom:1px solid #f0f0f3; }
    .owj-dashboard .owj-event-message { display:block; flex-basis:100% !important; white-space:normal !important; overflow:visible !important; font-size:12px !important; padding-right:17px; }
    .owj-dashboard .owj-event-time { order:2; margin-right:auto; font-family:inherit !important; }
    .owj-dashboard .owj-event-name { order:1; }
    .owj-dashboard .owj-event-message { order:3; }
    .owj-dashboard .owj-raw-json summary { padding:15px !important; gap:10px; flex-wrap:wrap; }
    .owj-dashboard .owj-raw-json pre { padding:15px !important; }
    .owj-dashboard .owj-footer { padding:18px 16px 28px !important; }
    .owj-dashboard .owj-state-title { font-size:20px !important; }
  }
  @media (max-width:359px) {
    .owj-dashboard .owj-kpi-grid { grid-template-columns:minmax(0,1fr) !important; }
    .owj-dashboard .owj-topbar-status { font-size:10px !important; }
    .owj-dashboard .owj-mobile-factor-grid { grid-template-columns:1fr; }
  }
  @media (prefers-reduced-motion:reduce) {
    .owj-dashboard *, .owj-dashboard *::before, .owj-dashboard *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; scroll-behavior:auto !important; }
  }
`;

function DashboardStyles() {
  return <style>{COMPONENT_CSS}</style>;
}

/* ──────────────────────── Icon (unchanged) ──────────────────────── */
function Icon({ name, size = 20 }) {
  const paths = {
    activity: (
      <>
        <path d="M3 12h4l2.3-7 4.4 14 2.3-7h5" />
      </>
    ),
    alert: (
      <>
        <path d="M12 3 2.7 19h18.6L12 3Z" />
        <path d="M12 9v4" />
        <path d="M12 16.5h.01" />
      </>
    ),
    area: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="m4 14 4-4 4 3 4-5 4 4" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),
    chevron: (
      <>
        <path d="m9 18 6-6-6-6" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M6.1 8a7 7 0 0 1 11.7-2L20 8" />
        <path d="m4 16 2.2 2a7 7 0 0 0 11.7-2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z" />
        <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
      </>
    ),
    trend: (
      <>
        <path d="m3 17 6-6 4 4 8-9" />
        <path d="M15 6h6v6" />
      </>
    ),
    building: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[name] || paths.activity}
      </g>
    </svg>
  );
}

/* ──────────────────────── Progress ──────────────────────── */
function Progress({ value, tone = "cyan", label }) {
  const toneMap = {
    cyan: `linear-gradient(90deg, ${T.secondaryDark}, ${T.secondary}, ${T.secondaryLight})`,
    green: `linear-gradient(90deg, #059669, ${T.green})`,
    orange: `linear-gradient(90deg, #ea580c, ${T.orange})`,
    violet: `linear-gradient(90deg, ${T.primary}, ${T.primaryPale})`,
  };
  return (
    <div
      style={{
        height: 4,
        background: T.border,
        borderRadius: 99,
        overflow: "hidden",
        width: "100%",
      }}
      aria-label={label}
    >
      <span
        style={{
          display: "block",
          height: "100%",
          width: `${clamp(value)}%`,
          borderRadius: 99,
          background: toneMap[tone] || toneMap.cyan,
          transition: "width .7s cubic-bezier(.22,1,.36,1)",
          boxShadow:
            tone === "cyan"
              ? T.glowSecondary
              : tone === "violet"
                ? T.glowPrimary
                : "none",
        }}
      />
    </div>
  );
}

/* ──────────────────────── KpiCard ──────────────────────── */
function KpiCard({ eyebrow, value, detail, progress, tone, icon }) {
  const accents = {
    cyan: { c: T.secondary, bg: T.secondaryBg, glow: T.glowSecondary },
    green: { c: T.green, bg: T.greenBg, glow: "none" },
    orange: { c: T.orange, bg: T.orangeBg, glow: "none" },
    violet: { c: T.primary, bg: T.primaryBg, glow: T.glowPrimary },
  };
  const a = accents[tone] || accents.cyan;

  return (
    <article
      className="owj-kpi-card"
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderTop: `2px solid ${a.c}`,
        borderRadius: T.radius,
        padding: "22px 22px 19px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "transform .2s, box-shadow .2s",
        cursor: "default",
        boxShadow: T.shadow,
        animation: "owjSlideUp .5s ease both",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = T.shadowLg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = T.shadow;
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: T.textMuted,
            letterSpacing: 0.5,
          }}
        >
          {eyebrow}
        </span>
        <span
          className="owj-kpi-card-icon"
          style={{
            width: 38,
            height: 38,
            borderRadius: T.radiusSm,
            background: a.bg,
            color: a.c,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon name={icon} />
        </span>
      </div>
      <strong
        className="owj-kpi-card-value"
        style={{
          fontSize: 30,
          fontWeight: 900,
          color: T.white,
          lineHeight: 1.1,
          letterSpacing: -1,
        }}
      >
        {value}
      </strong>
      <div
        className="owj-kpi-card-detail"
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: T.textSec,
          gap: 6,
        }}
      >
        <span>{detail}</span>
        {Number.isFinite(progress) && (
          <span style={{ fontWeight: 600 }}>{formatPercent(progress)}</span>
        )}
      </div>
      {Number.isFinite(progress) && (
        <Progress
          value={progress}
          tone={tone}
          label={`${eyebrow}: ${progress}%`}
        />
      )}
    </article>
  );
}

/* ──────────────────────── SectionHeading ──────────────────────── */
function SectionHeading({ kicker, title, description, aside }) {
  return (
    <div
      className="owj-section-heading"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 22,
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: 260 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: T.secondaryDark,
            letterSpacing: 1.2,
            marginBottom: 6,
            display: "block",
          }}
        >
          {kicker}
        </span>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: T.white,
            margin: "0 0 6px",
            lineHeight: 1.35,
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: 13,
              color: T.textSec,
              margin: 0,
              lineHeight: 1.65,
              maxWidth: 580,
            }}
          >
            {description}
          </p>
        )}
      </div>
      {aside}
    </div>
  );
}

/* ──────────────────────── AttentionCard ──────────────────────── */
function AttentionCard({ tone, icon, title, value, text }) {
  const tones = {
    good: { c: T.green, bg: T.greenBg, border: T.green },
    warn: { c: T.orange, bg: T.orangeBg, border: T.orange },
    bad: { c: T.red, bg: T.redBg, border: T.red },
  };
  const a = tones[tone] || tones.good;

  return (
    <article
      className="owj-attention-card"
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRight: `4px solid ${a.border}`,
        borderRadius: T.radius,
        padding: "18px 20px",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        boxShadow: T.shadow,
        transition: "transform .2s",
        animation: "owjSlideUp .5s ease both",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span
        style={{
          width: 42,
          height: 42,
          borderRadius: T.radiusSm,
          background: a.bg,
          color: a.c,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon name={icon} />
      </span>
      <div>
        <span
          className="owj-attention-card-value"
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: T.white,
            lineHeight: 1,
            display: "block",
          }}
        >
          {value}
        </span>
        <h3
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: T.text,
            margin: "6px 0 4px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 12,
            color: T.textMuted,
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          {text}
        </p>
      </div>
    </article>
  );
}

/* ──────────────────────── LocationQuality ──────────────────────── */
function LocationQuality({ data }) {
  const available = data.available || 0;
  const exactShare = available ? (data.exact / available) * 100 : 0;
  const approximateShare = available ? (data.approximate / available) * 100 : 0;

  return (
    <article
      className="owj-panel"
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: T.radius,
        padding: 28,
        boxShadow: T.shadow,
      }}
    >
      <SectionHeading
        kicker="سیگنال موقعیت"
        title="اطمینان مختصات"
        description="پین‌های دقیق بالاترین ارزش را دارند. پین‌های تقریبی در شعاع ۵۰۰ متری حریم خصوصی کار می‌کنند."
      />
      <div
        className="owj-location-body"
        style={{
          display: "flex",
          gap: 32,
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        {/* Donut */}
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: `conic-gradient(${T.secondary} 0 ${exactShare}%, ${T.orange} ${exactShare}% ${exactShare + approximateShare}%, ${T.raised} ${exactShare + approximateShare}% 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: T.glowSecondary,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: T.surface,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <strong style={{ fontSize: 20, fontWeight: 900, color: T.white }}>
              {formatPercent(data.coverage)}
            </strong>
            <span style={{ fontSize: 11, color: T.textMuted }}>پوشش</span>
          </div>
        </div>
        {/* Legend */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            flex: 1,
            minWidth: 140,
          }}
        >
          {[
            {
              type: "exact",
              label: "دقیق",
              color: T.secondary,
              val: data.exact,
            },
            {
              type: "approx",
              label: "تقریبی",
              color: T.orange,
              val: data.approximate,
            },
            {
              type: "missing",
              label: "ناموجود",
              color: T.raised,
              val: data.missing,
            },
          ].map((item) => (
            <div
              key={item.type}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: item.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1, color: T.textSec }}>{item.label}</span>
              <strong style={{ fontWeight: 800, color: T.white }}>
                {formatNumber(item.val)}
              </strong>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: T.raised,
          borderRadius: T.radiusSm,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 13, color: T.textSec }}>
            تطابق منطقه درخواستی با جزئیات
          </span>
          <strong
            style={{ fontSize: 17, fontWeight: 800, color: T.secondaryDark }}
          >
            {formatPercent(data.areaMatchRate)}
          </strong>
        </div>
        <Progress
          value={data.areaMatchRate}
          tone="cyan"
          label="نرخ تطابق منطقه"
        />
        <small style={{ fontSize: 11, color: T.textMuted }}>
          {formatNumber(data.areaMatches)} از {formatNumber(data.areaChecks)}{" "}
          رکورد بررسی‌شده
        </small>
      </div>
    </article>
  );
}

/* ──────────────────────── ModelReadiness ──────────────────────── */
function ModelReadiness({ data }) {
  const global = data.global || {};
  const globalProgress = global.minimumRequired
    ? Math.min(100, ((global.count || 0) / global.minimumRequired) * 100)
    : 0;
  const areaProgress = data.areaModelCount
    ? (data.readyAreaModelCount / data.areaModelCount) * 100
    : 0;

  return (
    <article
      className="owj-panel"
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: T.radius,
        padding: 28,
        boxShadow: T.shadow,
      }}
    >
      <SectionHeading
        kicker="رگرسیون"
        title="آمادگی مدل"
        description="آمادگی به معنای نمونه‌های کافی برای اجراست؛ جایگزین اعتبارسنجی holdout نیست."
      />
      {/* Status badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 18px",
          background: T.primaryBg,
          border: `1px solid ${T.primaryBg2}`,
          borderRadius: T.radiusSm,
          marginBottom: 22,
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: T.primary,
            boxShadow: `0 0 0 4px ${T.primaryBg2}`,
            animation: "owjPulse 2s infinite",
            flexShrink: 0,
          }}
        />
        <div>
          <strong
            style={{
              fontWeight: 800,
              color: T.white,
              fontSize: 14,
              display: "block",
            }}
          >
            {global.status === "experimental-ready"
              ? "مدل آزمایشی فعال"
              : "در حال جمع‌آوری نمونه"}
          </strong>
          <span style={{ fontSize: 12, color: T.textSec }}>
            {toPersianDigits(data.scope)}
          </span>
        </div>
      </div>
      {/* Global */}
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
            fontSize: 13,
          }}
        >
          <span style={{ color: T.textSec }}>مشاهدات سراسری</span>
          <strong style={{ fontWeight: 800, color: T.white }}>
            {formatNumber(global.count)}
          </strong>
        </div>
        <Progress
          value={globalProgress}
          tone="orange"
          label="آمادگی نمونه مدل سراسری"
        />
        <small
          style={{
            fontSize: 11,
            color: T.textMuted,
            marginTop: 4,
            display: "block",
          }}
        >
          حداقل: {formatNumber(global.minimumRequired)}
        </small>
      </div>
      {/* Spatial */}
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
            fontSize: 13,
          }}
        >
          <span style={{ color: T.textSec }}>مدل‌های مکانی آماده</span>
          <strong style={{ fontWeight: 800, color: T.white }}>
            {formatNumber(data.readyAreaModelCount)} /{" "}
            {formatNumber(data.areaModelCount)}
          </strong>
        </div>
        <Progress value={areaProgress} tone="cyan" label="آمادگی مدل مکانی" />
        <small
          style={{
            fontSize: 11,
            color: T.textMuted,
            marginTop: 4,
            display: "block",
          }}
        >
          {formatNumber(data.publishedSpatialAreaCount)} از{" "}
          {formatNumber(data.spatialAreaCount)} سلول مکانی منتشرشده
        </small>
      </div>
      {/* Warning */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          color: T.orange,
          padding: "12px 14px",
          background: T.orangeBg,
          borderRadius: T.radiusXs,
        }}
      >
        <Icon name="alert" size={17} />
        <span>
          امتیازها تا زمان گذر از اعتبارسنجی holdout زمانی، آزمایشی هستند.
        </span>
      </div>
    </article>
  );
}

/* ──────────────────────── AreaCoverage ──────────────────────── */
function AreaCoverage({ data }) {
  const [query, setQuery] = useState("");
  const [shortfallsOnly, setShortfallsOnly] = useState(false);
  const [areaSort, setAreaSort] = useState({
    key: "shortfall",
    direction: "desc",
  });
  const [visible, setVisible] = useState(20);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fa");
    return [...(data.areas || [])]
      .filter((area) => !shortfallsOnly || area.shortfall > 0)
      .filter(
        (area) =>
          !needle ||
          `${area.name} ${area.slug}`.toLocaleLowerCase("fa").includes(needle),
      )
      .sort((left, right) => {
        const values = {
          name: [left.name, right.name],
          discovered: [left.discovered, right.discovered],
          target: [left.target, right.target],
          shortfall: [left.shortfall, right.shortfall],
          duplicates: [left.duplicates, right.duplicates],
          status: [left.shortfall > 0 ? 0 : 1, right.shortfall > 0 ? 0 : 1],
        }[areaSort.key];
        const result =
          typeof values?.[0] === "string"
            ? values[0].localeCompare(values[1], "fa")
            : (values?.[0] ?? 0) - (values?.[1] ?? 0);
        return (
          result * (areaSort.direction === "desc" ? -1 : 1) ||
          left.name.localeCompare(right.name, "fa")
        );
      });
  }, [data.areas, query, shortfallsOnly, areaSort]);

  const changeAreaSort = (key) =>
    setAreaSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));

  useEffect(() => setVisible(20), [query, shortfallsOnly]);

  const panelStyle = {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    padding: 28,
    marginBottom: 24,
    boxShadow: T.shadow,
  };

  return (
    <section className="owj-panel" style={panelStyle}>
      <SectionHeading
        kicker={`صف ${formatNumber(data.areas?.length || 0)} محله منتخب`}
        title="پوشش کشف مناطق"
        description="این جدول فقط محله‌های منتخب را نشان می‌دهد؛ کمبود یعنی تعداد یافته‌شده از هدف پویای همان محله کمتر بوده است."
        aside={
          <div
            className="owj-heading-aside"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <strong
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: T.secondaryDark,
                lineHeight: 1,
              }}
            >
              {formatNumber(data.complete)}
            </strong>
            <span style={{ fontSize: 12, color: T.textMuted }}>
              منطقه در هدف
            </span>
          </div>
        }
      />
      {/* Tools */}
      <div
        className="owj-controls"
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <label
          className="owj-search-field"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 14px",
            borderRadius: T.radiusSm,
            background: T.raised,
            border: `1px solid ${T.border}`,
            flex: 1,
            minWidth: 200,
            color: T.textMuted,
            transition: "border-color .2s",
          }}
        >
          <Icon name="search" size={18} />
          <input
            className="owj-search-input"
            type="search"
            aria-label="جستجوی منطقه یا شناسه"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی منطقه یا slug"
            style={{
              border: "none",
              background: "none",
              color: T.text,
              fontSize: 13,
              outline: "none",
              width: "100%",
              fontFamily: "inherit",
              direction: "rtl",
            }}
          />
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: T.textSec,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          <input
            type="checkbox"
            checked={shortfallsOnly}
            onChange={(e) => setShortfallsOnly(e.target.checked)}
            style={{
              width: 16,
              height: 16,
              accentColor: T.primary,
              cursor: "pointer",
            }}
          />
          <span>فقط کمبودها</span>
        </label>
        <span
          className="owj-controls-result"
          style={{ fontSize: 12, color: T.textMuted, whiteSpace: "nowrap" }}
        >
          {formatNumber(filtered.length)} نتیجه
        </span>
      </div>
      <div className="owj-mobile-sort">
        <label>
          <span>ترتیب بر اساس</span>
          <select
            aria-label="مرتب‌سازی مناطق بر اساس"
            value={areaSort.key}
            onChange={(event) => changeAreaSort(event.target.value)}
          >
            <option value="shortfall">کمبود</option>
            <option value="name">منطقه</option>
            <option value="discovered">یافت‌شده</option>
            <option value="target">هدف</option>
            <option value="duplicates">تکراری</option>
            <option value="status">وضعیت</option>
          </select>
        </label>
        <button
          type="button"
          onClick={() => changeAreaSort(areaSort.key)}
          aria-label="تغییر جهت مرتب‌سازی مناطق"
        >
          {areaSort.direction === "desc" ? "نزولی ↓" : "صعودی ↑"}
        </button>
      </div>
      {/* Table */}
      <div
        className="owj-table-wrap owj-area-table-wrap"
        style={{
          overflowX: "auto",
          borderRadius: T.radiusSm,
          border: `1px solid ${T.border}`,
        }}
      >
        <table
          className="owj-area-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
            textAlign: "right",
          }}
        >
          <thead>
            <tr>
              {[
                ["name", "منطقه"],
                ["discovered", "یافت‌شده"],
                ["target", "هدف"],
                ["shortfall", "کمبود"],
                ["duplicates", "تکراری"],
                ["status", "وضعیت"],
              ].map(([key, h]) => (
                <SortableTh
                  key={key}
                  column={key}
                  sort={areaSort}
                  onSort={changeAreaSort}
                  style={{
                    padding: "12px 16px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: T.textMuted,
                    background: T.raised,
                    borderBottom: `1px solid ${T.border}`,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </SortableTh>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, visible).map((area) => {
              const tdBase = {
                padding: "12px 16px",
                borderBottom: `1px solid ${T.border}`,
                color: T.textSec,
                whiteSpace: "nowrap",
              };
              return (
                <tr
                  key={area.id ?? area.slug}
                  style={{ transition: "background .15s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = T.surfaceHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <td data-label="منطقه" style={tdBase}>
                    <a
                      href={area.url || "#"}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <strong
                        dir="auto"
                        style={{ fontWeight: 700, color: T.text, fontSize: 13 }}
                      >
                        {toPersianDigits(area.name)}
                      </strong>
                      <span
                        style={{
                          fontSize: 11,
                          color: T.textMuted,
                          fontFamily: "monospace",
                          direction: "ltr",
                          textAlign: "right",
                        }}
                      >
                        {toPersianDigits(area.slug)}
                      </span>
                    </a>
                  </td>
                  <td data-label="یافت‌شده" style={tdBase}>
                    {formatNumber(area.discovered)}
                  </td>
                  <td data-label="هدف" style={tdBase}>
                    {formatNumber(area.target)}
                  </td>
                  <td
                    data-label="کمبود"
                    style={{
                      ...tdBase,
                      color: area.shortfall ? T.orange : T.textSec,
                      fontWeight: area.shortfall ? 700 : 400,
                    }}
                  >
                    {formatNumber(area.shortfall)}
                  </td>
                  <td data-label="تکراری" style={tdBase}>
                    {formatNumber(area.duplicates)}
                  </td>
                  <td data-label="وضعیت" style={tdBase}>
                    <span
                      style={{
                        display: "inline-flex",
                        padding: "3px 12px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 700,
                        background: area.shortfall ? T.orangeBg : T.greenBg,
                        color: area.shortfall ? T.orange : T.green,
                      }}
                    >
                      {area.shortfall ? "بررسی" : "کامل"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!filtered.length && (
        <div
          className="owj-mobile-empty"
          role="status"
          style={{
            color: T.textSec,
            padding: "24px 12px",
            textAlign: "center",
            fontSize: 13,
          }}
        >
          منطقه‌ای مطابق جستجوی شما پیدا نشد.
        </div>
      )}
      {visible < filtered.length && (
        <button
          className="owj-action-button"
          style={{
            display: "block",
            width: "100%",
            padding: 12,
            marginTop: 16,
            borderRadius: T.radiusSm,
            border: `1px solid ${T.borderLight}`,
            background: "transparent",
            color: T.textSec,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all .2s",
          }}
          onClick={() => setVisible((v) => v + 20)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = T.raised;
            e.currentTarget.style.color = T.white;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = T.textSec;
          }}
        >
          نمایش ۲۰ مورد بیشتر
        </button>
      )}
    </section>
  );
}

/* ──────────────────────── Score Factors (unchanged data) ──────────────────────── */
const SCORE_FACTORS = [
  {
    key: "dealValue",
    label: "ارزش معامله",
    short: "معامله",
    weight: null,
    description: "شواهد ارزش قبل از دروازه اطمینان",
  },
  {
    key: "modelValue",
    label: "ارزش مدل",
    short: "مدل",
    weight: 0.45,
    description: "صدک تخفیف نسبت به مدل مکانی خارج از چین",
  },
  {
    key: "nearbyValue",
    label: "ارزش همسایگی",
    short: "همسایگی",
    weight: 0.4,
    description: "صدک تخفیف نسبت به مقایسه‌های نزدیک",
  },
  {
    key: "localPosition",
    label: "موقعیت محلی",
    short: "موقعیت",
    weight: 0.15,
    description: "قیمت هر متر مربع در مجموعه مقایسه محلی",
  },
  {
    key: "confidence",
    label: "اطمینان",
    short: "اطمینان",
    weight: null,
    description: "اعتبارسنجی، مقایسه، مختصات و کیفیت داده",
  },
  {
    key: "dataQuality",
    label: "کیفیت داده",
    short: "کیفیت",
    weight: null,
    description: "جریمه برای فیلدهای منبع impute‌شده",
  },
  {
    key: "propertyQuality",
    label: "کیفیت ملک",
    short: "ملک",
    weight: null,
    description: "سن، طبقه، تراکم واحد و امکانات",
  },
  {
    key: "risk",
    label: "ریسک",
    short: "ریسک",
    weight: null,
    inverse: true,
    description: "بالاتر یعنی قیمت غیرعادی یا شواهد ناقص",
  },
];

function scoreMetric(item, key) {
  if (key === "score" || key === "recommendation")
    return item.scores?.recommendation ?? item.score;
  if (key === "modelDiscountPct")
    return (
      item.valuation?.modelDiscountPct ?? item.prediction?.askingVsPredictionPct
    );
  if (key === "nearbyDiscountPct")
    return (
      item.valuation?.nearbyDiscountPct ?? item.prediction?.askingVsNearbyPct
    );
  return item.scores?.[key] ?? item.components?.[key];
}

/* ──────────────────────── FactorScore ──────────────────────── */
function FactorScore({ value, weight, inverse = false }) {
  if (!Number.isFinite(value))
    return <span style={{ color: T.textMuted, fontSize: 13 }}>—</span>;
  const interpreted = inverse ? 100 - value : value;
  const barColor =
    interpreted >= 75 ? T.green : interpreted >= 45 ? T.orange : T.red;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 68 }}
      title={
        weight
          ? `${decimal.format(value * weight)} امتیاز وزنی`
          : `${formatNumber(value)} امتیاز`
      }
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <strong style={{ fontWeight: 800, fontSize: 13, color: T.white }}>
          {formatNumber(value)}
        </strong>
        <small style={{ fontSize: 10, color: T.textMuted }}>
          {weight ? `+${decimal.format(value * weight)}` : "خام"}
        </small>
      </div>
      <span
        style={{
          height: 3,
          background: T.border,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <i
          style={{
            display: "block",
            height: "100%",
            width: `${clamp(value)}%`,
            borderRadius: 4,
            background: barColor,
            transition: "width .5s",
          }}
        />
      </span>
    </div>
  );
}

/* ──────────────────────── GapValue ──────────────────────── */
function GapValue({ value }) {
  const c = !Number.isFinite(value)
    ? T.textMuted
    : value >= 0
      ? T.green
      : T.red;
  return (
    <span
      style={{
        fontWeight: 800,
        fontSize: 13,
        color: c,
        direction: "ltr",
        display: "inline-block",
      }}
    >
      {formatSignedPercent(value)}
    </span>
  );
}

/* ──────────────────────── Recommendations ──────────────────────── */
function Recommendations({ data }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({
    key: "recommendation",
    direction: "desc",
  });
  const [remoteRows, setRemoteRows] = useState(data.listings || data.top || []);
  const [filteredTotal, setFilteredTotal] = useState(data.count || 0);
  const [tableLoading, setTableLoading] = useState(false);
  const pipelineAvailable = data.available === true;

  useEffect(() => {
    setRemoteRows(data.listings || data.top || []);
    setFilteredTotal(data.count || 0);
  }, [data.generatedAt, data.count, data.listings, data.top]);

  useEffect(() => {
    if (!pipelineAvailable) return undefined;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setTableLoading(true);
      try {
        const parameters = new URLSearchParams({
          limit: "100",
          offset: "0",
          query,
          sort: sort.key,
          direction: sort.direction,
        });
        const response = await fetch(`/scores?${parameters}`, {
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(`Score API returned HTTP ${response.status}`);
        const payload = await response.json();
        setRemoteRows(payload.listings || []);
        setFilteredTotal(payload.filteredTotal || 0);
      } catch (caught) {
        if (caught.name !== "AbortError") setRemoteRows([]);
      } finally {
        if (!controller.signal.aborted) setTableLoading(false);
      }
    }, 220);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [pipelineAvailable, query, sort]);

  const rows = useMemo(() => {
    if (pipelineAvailable) return remoteRows;
    const needle = query.trim().toLocaleLowerCase("fa");
    return [...(data.top || [])]
      .filter(
        (item) =>
          !needle ||
          `${item.title} ${item.token} ${item.neighborhood}`
            .toLocaleLowerCase("fa")
            .includes(needle),
      )
      .sort((left, right) => {
        if (sort.key === "listing") {
          const result = (left.title || "").localeCompare(
            right.title || "",
            "fa",
          );
          return sort.direction === "asc" ? result : -result;
        }
        const lv = scoreMetric(left, sort.key);
        const rv = scoreMetric(right, sort.key);
        if (!Number.isFinite(lv)) return 1;
        if (!Number.isFinite(rv)) return -1;
        return sort.direction === "asc" ? lv - rv : rv - lv;
      });
  }, [data.top, pipelineAvailable, query, remoteRows, sort]);

  async function loadMore() {
    if (!pipelineAvailable || tableLoading || rows.length >= filteredTotal)
      return;
    setTableLoading(true);
    try {
      const parameters = new URLSearchParams({
        limit: "100",
        offset: String(rows.length),
        query,
        sort: sort.key,
        direction: sort.direction,
      });
      const response = await fetch(`/scores?${parameters}`);
      if (!response.ok)
        throw new Error(`Score API returned HTTP ${response.status}`);
      const payload = await response.json();
      setRemoteRows((current) => [...current, ...(payload.listings || [])]);
      setFilteredTotal(payload.filteredTotal || 0);
    } finally {
      setTableLoading(false);
    }
  }

  function changeSort(key) {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "desc" ? "asc" : "desc",
    }));
  }

  function SortHeading({ column, children, title }) {
    const active = sort.key === column;
    return (
      <button
        onClick={() => changeSort(column)}
        title={title}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 3,
          background: "none",
          border: "none",
          color: active ? T.white : T.textMuted,
          fontWeight: active ? 800 : 600,
          fontSize: 11,
          cursor: "pointer",
          padding: 0,
          fontFamily: "inherit",
          whiteSpace: "nowrap",
        }}
      >
        <span>{children}</span>
        <i style={{ fontSize: 9, opacity: 0.6, fontStyle: "normal" }}>
          {active ? (sort.direction === "desc" ? "↓" : "↑") : "↕"}
        </i>
      </button>
    );
  }

  const panelStyle = {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    padding: 28,
    marginBottom: 24,
    boxShadow: T.shadow,
  };
  const thStyle = {
    padding: "12px 14px",
    fontSize: 11,
    fontWeight: 700,
    color: T.textMuted,
    background: T.raised,
    borderBottom: `1px solid ${T.border}`,
    textAlign: "right",
    whiteSpace: "nowrap",
  };
  const tdStyle = {
    padding: "12px 14px",
    borderBottom: `1px solid ${T.border}`,
    color: T.textSec,
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  };

  return (
    <section className="owj-panel" style={panelStyle}>
      <SectionHeading
        kicker="سیستم پیشنهاد"
        title="جزئیات امتیازدهی آگهی‌ها"
        description="مدل هدانیک cross-fit و مقایسه‌های تعدیل‌شده ارزش معامله را می‌سازند؛ دروازه‌های اطمینان و ریسک فقط امتیاز نهایی را کاهش می‌دهند."
        aside={
          <div
            className="owj-heading-aside"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <strong
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: T.primary,
                lineHeight: 1,
              }}
            >
              {formatNumber(
                data.summary?.scoreDistribution?.median ??
                  data.averageScore ??
                  0,
              )}
            </strong>
            <span style={{ fontSize: 12, color: T.textMuted }}>
              میانه امتیاز
            </span>
          </div>
        }
      />
      {/* Search */}
      <div
        className="owj-controls"
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <label
          className="owj-search-field"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 14px",
            borderRadius: T.radiusSm,
            background: T.raised,
            border: `1px solid ${T.border}`,
            flex: 1,
            minWidth: 200,
            color: T.textMuted,
          }}
        >
          <Icon name="search" size={18} />
          <input
            className="owj-search-input"
            type="search"
            aria-label="جستجوی آگهی، توکن یا محله"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی آگهی، توکن یا محله"
            style={{
              border: "none",
              background: "none",
              color: T.text,
              fontSize: 13,
              outline: "none",
              width: "100%",
              fontFamily: "inherit",
              direction: "rtl",
            }}
          />
        </label>
        <span
          className="owj-controls-result"
          role="status"
          aria-live="polite"
          style={{ fontSize: 12, color: T.textMuted, whiteSpace: "nowrap" }}
        >
          {tableLoading
            ? "در حال بروزرسانی…"
            : `${formatNumber(rows.length)} از ${formatNumber(filteredTotal)} آگهی`}
        </span>
      </div>
      <div className="owj-mobile-sort">
        <label>
          <span>ترتیب بر اساس</span>
          <select
            aria-label="مرتب‌سازی آگهی‌ها بر اساس"
            value={sort.key}
            onChange={(event) => changeSort(event.target.value)}
          >
            <option value="recommendation">امتیاز نهایی</option>
            <option value="listing">عنوان آگهی</option>
            {SCORE_FACTORS.map((factor) => (
              <option key={factor.key} value={factor.key}>
                {factor.label}
              </option>
            ))}
            <option value="modelDiscountPct">تخفیف مدل</option>
            <option value="nearbyDiscountPct">تخفیف نزدیک</option>
          </select>
        </label>
        <button
          type="button"
          onClick={() => changeSort(sort.key)}
          aria-label="تغییر جهت مرتب‌سازی آگهی‌ها"
        >
          {sort.direction === "desc" ? "نزولی ↓" : "صعودی ↑"}
        </button>
      </div>
      {/* Table */}
      <div
        className="owj-table-wrap owj-reco-desktop-table"
        style={{
          overflowX: "auto",
          borderRadius: T.radiusSm,
          border: `1px solid ${T.border}`,
          marginBottom: 8,
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
            textAlign: "right",
          }}
        >
          <thead>
            <tr>
              <th style={{ ...thStyle, minWidth: 220 }}>
                <SortHeading column="listing">آگهی</SortHeading>
              </th>
              <th style={thStyle}>
                <SortHeading
                  column="recommendation"
                  title="امتیاز نهایی تعدیل‌شده"
                >
                  نهایی
                </SortHeading>
              </th>
              {SCORE_FACTORS.map((f) => (
                <th
                  key={f.key}
                  style={thStyle}
                  title={`${f.description}${f.weight ? ` · وزن ${formatNumber(f.weight * 100)}٪` : ""}`}
                >
                  <SortHeading column={f.key}>
                    {f.short}
                    {f.weight && (
                      <small
                        style={{
                          display: "block",
                          fontSize: 9,
                          opacity: 0.5,
                          fontWeight: 400,
                        }}
                      >
                        {formatNumber(f.weight * 100)}٪
                      </small>
                    )}
                  </SortHeading>
                </th>
              ))}
              <th style={thStyle}>
                <SortHeading
                  column="modelDiscountPct"
                  title="مثبت = زیر قیمت مدل"
                >
                  تخفیف مدل
                </SortHeading>
              </th>
              <th style={thStyle}>
                <SortHeading
                  column="nearbyDiscountPct"
                  title="مثبت = زیر قیمت همسایگی"
                >
                  تخفیف نزدیک
                </SortHeading>
              </th>
              <th style={thStyle}>شواهد</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => {
              const rec = scoreMetric(item, "recommendation");
              const level = rec >= 80 ? "high" : rec >= 60 ? "medium" : "low";
              const scoreColors = {
                high: { bg: T.greenBg, c: T.green, b: "rgba(52,211,153,.25)" },
                medium: {
                  bg: T.orangeBg,
                  c: T.orange,
                  b: "rgba(251,146,60,.25)",
                },
                low: { bg: T.redBg, c: T.red, b: "rgba(248,113,113,.25)" },
              };
              const sc = scoreColors[level];
              return (
                <tr
                  key={item.token}
                  style={{ transition: "background .15s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = T.surfaceHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <td style={{ ...tdStyle, minWidth: 220 }}>
                    <a
                      href={`/listing/${encodeURIComponent(item.token)}`}
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <strong
                        dir="auto"
                        style={{ fontWeight: 700, color: T.text, fontSize: 13 }}
                      >
                        {toPersianDigits(item.title || item.token)}
                      </strong>
                      <span
                        dir="auto"
                        style={{ fontSize: 12, color: T.textSec }}
                      >
                        {toPersianDigits(item.neighborhood || "منطقه نامشخص")} ·{" "}
                        {formatNumber(item.property?.area ?? item.area)} متر ·{" "}
                        {formatMoney(
                          item.asking?.askingPrice ?? item.askingPrice,
                        )}
                      </span>
                      <small
                        style={{
                          fontSize: 10,
                          color: T.textMuted,
                          fontFamily: "monospace",
                          direction: "ltr",
                          textAlign: "right",
                        }}
                      >
                        {toPersianDigits(item.token)} ·{" "}
                        {item.location?.accuracy ??
                          item.coordinateAccuracy ??
                          "نامشخص"}
                      </small>
                    </a>
                  </td>
                  <td style={tdStyle}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 46,
                        height: 46,
                        borderRadius: T.radiusSm,
                        background: sc.bg,
                        color: sc.c,
                        fontWeight: 900,
                        fontSize: 17,
                        border: `1px solid ${sc.b}`,
                      }}
                    >
                      {formatNumber(rec)}
                    </div>
                  </td>
                  {SCORE_FACTORS.map((f) => (
                    <td key={f.key} style={tdStyle}>
                      <FactorScore
                        value={scoreMetric(item, f.key)}
                        weight={f.weight}
                        inverse={f.inverse}
                      />
                    </td>
                  ))}
                  <td style={tdStyle}>
                    <GapValue value={scoreMetric(item, "modelDiscountPct")} />
                  </td>
                  <td style={tdStyle}>
                    <GapValue value={scoreMetric(item, "nearbyDiscountPct")} />
                  </td>
                  <td style={tdStyle}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        minWidth: 90,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 5,
                        }}
                      >
                        <strong
                          style={{
                            fontWeight: 800,
                            color: T.white,
                            fontSize: 13,
                          }}
                        >
                          {formatNumber(
                            item.evidence?.comparableCount ??
                              item.prediction?.modelSampleCount,
                          )}
                        </strong>
                        <span style={{ fontSize: 11, color: T.textSec }}>
                          {item.evidence ? "مقایسه" : "نمونه"}
                        </span>
                      </div>
                      <small
                        style={{
                          fontSize: 10,
                          color: T.textMuted,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.evidence
                          ? `${formatPercent(item.evidence.valuationValidationMedianErrorPct ?? item.evidence.modelValidationMedianErrorPct)} خطای میانه`
                          : `${formatNumber(item.nearby?.count)} همسایه`}
                      </small>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="owj-mobile-recommendations" aria-label="فهرست آگهی‌ها">
        {rows.map((item) => {
          const rec = scoreMetric(item, "recommendation");
          return (
            <details key={item.token}>
              <summary>
                <span>
                  <strong dir="auto">
                    {toPersianDigits(item.title || item.token)}
                  </strong>
                  <small>
                    {toPersianDigits(item.neighborhood || "منطقه نامشخص")} ·{" "}
                    {formatNumber(item.property?.area ?? item.area)} متر
                  </small>
                  <small>
                    {formatMoney(item.asking?.askingPrice ?? item.askingPrice)}
                  </small>
                  <small style={{ color: T.primary }}>
                    برای دیدن جزئیات لمس کنید
                  </small>
                </span>
                <div
                  className="owj-mobile-score"
                  aria-label={`امتیاز نهایی ${formatNumber(rec)}`}
                >
                  {formatNumber(rec)}
                  <span>امتیاز نهایی</span>
                </div>
              </summary>
              <div className="owj-mobile-factor-grid">
                {SCORE_FACTORS.map((factor) => (
                  <div className="owj-mobile-factor" key={factor.key}>
                    <span>{factor.label}</span>
                    <FactorScore
                      value={scoreMetric(item, factor.key)}
                      weight={factor.weight}
                      inverse={factor.inverse}
                    />
                  </div>
                ))}
                <div className="owj-mobile-factor">
                  <span>تخفیف نسبت به مدل</span>
                  <GapValue value={scoreMetric(item, "modelDiscountPct")} />
                </div>
                <div className="owj-mobile-factor">
                  <span>تخفیف نزدیک</span>
                  <GapValue value={scoreMetric(item, "nearbyDiscountPct")} />
                </div>
                <div className="owj-mobile-evidence">
                  <Icon name="database" size={16} />
                  <strong>
                    {formatNumber(
                      item.evidence?.comparableCount ??
                        item.prediction?.modelSampleCount,
                    )}
                  </strong>
                  <span>{item.evidence ? "مقایسه" : "نمونه"}</span>
                  <span>·</span>
                  <span>
                    {item.evidence
                      ? `${formatPercent(item.evidence.valuationValidationMedianErrorPct ?? item.evidence.modelValidationMedianErrorPct)} خطای میانه`
                      : `${formatNumber(item.nearby?.count)} همسایه`}
                  </span>
                </div>
                <a
                  className="owj-view-listing"
                  href={`/listing/${encodeURIComponent(item.token)}`}
                >
                  مشاهده آگهی
                </a>
              </div>
            </details>
          );
        })}
      </div>
      {pipelineAvailable && rows.length < filteredTotal && (
        <button
          className="owj-action-button"
          onClick={loadMore}
          disabled={tableLoading}
          style={{
            display: "block",
            width: "100%",
            padding: 12,
            marginTop: 8,
            borderRadius: T.radiusSm,
            border: `1px solid ${T.borderLight}`,
            background: "transparent",
            color: T.textSec,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {tableLoading ? "در حال بارگذاری…" : "نمایش ۱۰۰ آگهی بیشتر"}
        </button>
      )}
      {!rows.length && (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            color: T.textMuted,
            fontSize: 14,
          }}
        >
          هیچ آگهی با این جستجو مطابقت ندارد.
        </div>
      )}
      <p
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          color: T.textMuted,
          marginTop: 14,
          padding: "12px 14px",
          background: T.raised,
          borderRadius: T.radiusXs,
          lineHeight: 1.55,
        }}
      >
        <Icon name="alert" size={16} />
        تخفیف مثبت یعنی قیمت درخواستی زیر معیار است. امتیازها از پیش‌بینی‌های
        cross-validate شده هستند اما قیمت درخواستی، قیمت فروش قطعی نیست.
      </p>
    </section>
  );
}

/* ──────────────────────── EventStream ──────────────────────── */
function EventStream({ events }) {
  const panelStyle = {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    padding: 28,
    marginBottom: 24,
    boxShadow: T.shadow,
  };
  const levelColors = { info: T.secondary, warn: T.orange, error: T.red };

  return (
    <section className="owj-panel" style={panelStyle}>
      <SectionHeading
        kicker="مانیتورینگ"
        title="رویدادهای اخیر سرور"
        description="آخرین رویدادهای ساختاریافته، از قبل توسط لاگر سرور ویرایش شده‌اند."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {(events || []).slice(0, 12).map((event, index) => (
          <div
            className="owj-event-row"
            key={`${event.timestamp}-${event.event}-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              borderRadius: T.radiusXs,
              transition: "background .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = T.surfaceHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: levelColors[event.level] || T.secondary,
                flexShrink: 0,
              }}
            />
            <time
              className="owj-event-time"
              style={{
                fontSize: 11,
                color: T.textMuted,
                fontFamily: "monospace",
                direction: "ltr",
                whiteSpace: "nowrap",
              }}
            >
              {formatTime(event.timestamp)}
            </time>
            <strong
              className="owj-event-name"
              style={{
                fontWeight: 700,
                color: T.text,
                whiteSpace: "nowrap",
                fontSize: 13,
              }}
            >
              {toPersianDigits(event.event)}
            </strong>
            <span
              className="owj-event-message"
              style={{
                color: T.textSec,
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: 13,
              }}
            >
              {toPersianDigits(event.message)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────── Loading / Error ──────────────────────── */
function LoadingState() {
  return (
    <>
      <AppHeader active="overview" />
      <main
        className="owj-dashboard owj-state"
        style={{
          direction: "rtl",
          fontFamily: "'Vazirmatn', Tahoma, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: T.bgGradient,
          color: T.text,
          textAlign: "center",
          padding: 40,
          gap: 20,
        }}
      >
        <DashboardStyles />
        <div style={{ display: "flex", gap: 10 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: i === 1 ? T.secondary : T.primary,
                animation: `owjDot 1.3s ${i * 0.16}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
        <h1
          className="owj-state-title"
          style={{ fontSize: 22, fontWeight: 800, color: T.white, margin: 0 }}
        >
          خواندن تله‌متری بازار
        </h1>
        <p style={{ fontSize: 14, color: T.textSec, margin: 0 }}>
          ترکیب آخرین خزش، آگهی‌ها، کیفیت مختصات و وضعیت مدل.
        </p>
      </main>
    </>
  );
}

function ErrorState({ error, retry }) {
  return (
    <>
      <AppHeader active="overview" />
      <main
        className="owj-dashboard owj-state"
        style={{
          direction: "rtl",
          fontFamily: "'Vazirmatn', Tahoma, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: T.bgGradient,
          color: T.text,
          textAlign: "center",
          padding: 40,
          gap: 20,
        }}
      >
        <DashboardStyles />
        <span
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            background: T.redBg,
            color: T.red,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="alert" size={28} />
        </span>
        <h1
          className="owj-state-title"
          style={{ fontSize: 22, fontWeight: 800, color: T.white, margin: 0 }}
        >
          داده‌های داشبورد در دسترس نیست
        </h1>
        <p style={{ fontSize: 14, color: T.textSec, margin: 0 }}>
          {toPersianDigits(error)}
        </p>
        <button
          onClick={retry}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            borderRadius: T.radiusSm,
            border: "none",
            background: T.primary,
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: `0 4px 20px ${T.primaryGlow}`,
          }}
        >
          <Icon name="refresh" size={18} /> تلاش مجدد
        </button>
      </main>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN DASHBOARD
   ══════════════════════════════════════════════════════════════════ */
export default function AnalyticsDashboard({
  endpoint = "/dashboard",
  refreshMs = 30_000,
}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const requestInFlight = useRef(false);

  const load = useCallback(
    async ({ quiet = false } = {}) => {
      if (requestInFlight.current) return;
      requestInFlight.current = true;
      if (!quiet) setRefreshing(true);
      try {
        const response = await fetch(endpoint, {
          headers: { accept: "application/json" },
        });
        if (!response.ok)
          throw new Error(`Server returned HTTP ${response.status}`);
        const payload = await response.json();
        if (!payload?.crawl || !payload?.overview)
          throw new Error("Dashboard response has an unexpected shape");
        setData(payload);
        setError(null);
      } catch (caught) {
        setError(caught.message || "Unknown dashboard error");
      } finally {
        requestInFlight.current = false;
        setRefreshing(false);
      }
    },
    [endpoint],
  );

  useEffect(() => {
    void load();
    const timer = window.setInterval(
      () => void load({ quiet: true }),
      refreshMs,
    );
    return () => window.clearInterval(timer);
  }, [load, refreshMs]);

  if (!data && !error) return <LoadingState />;
  if (!data && error) return <ErrorState error={error} retry={() => load()} />;

  const {
    crawl,
    overview,
    locationQuality,
    areaCoverage,
    model,
    recommendations,
    recentEvents,
  } = data;
  const areaCompletion = crawl.areasTotal
    ? (crawl.areasCompleted / crawl.areasTotal) * 100
    : 0;
  const statusTone =
    crawl.status === "completed"
      ? "good"
      : crawl.status === "failed"
        ? "bad"
        : "warn";
  const statusLabels = {
    completed: "تکمیل‌شده",
    failed: "ناموفق",
    running: "در حال اجرا",
    pending: "در انتظار",
  };
  const toneColors = { good: T.green, bad: T.red, warn: T.orange };
  const toneBgs = { good: T.greenBg, bad: T.redBg, warn: T.orangeBg };

  return (
    <div
      className="owj-dashboard"
      style={{
        direction: "rtl",
        fontFamily: "'Vazirmatn', Tahoma, sans-serif",
        background: T.bgGradient,
        color: T.text,
        minHeight: "100vh",
        fontSize: 14,
        lineHeight: 1.7,
      }}
    >
      <DashboardStyles />
      {/* ═══ TOPBAR ═══ */}
      <header
        className="owj-topbar"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 28px",
          height: 68,
          background: T.surfaceGlass,
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        {/* Brand */}
        <a
          className="owj-brand"
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: T.text,
            flexShrink: 0,
          }}
        >
          <span
            className="owj-brand-icon"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: T.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 14,
              boxShadow: `0 2px 12px ${T.primaryGlow}`,
            }}
          >
            <Icon name="building" size={22} />
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.2,
            }}
          >
            <strong
              style={{
                fontWeight: 900,
                fontSize: 17,
                color: T.white,
                letterSpacing: -0.5,
              }}
            >
              املاک اوج
            </strong>
            <small
              className="owj-brand-subtitle"
              style={{ fontSize: 11, color: T.textMuted, fontWeight: 400 }}
            >
              رصدخانه بازار مسکن
            </small>
          </span>
        </a>

        {/* Nav */}
        <AppNavigation active="overview" className="owj-nav" />

        {/* Meta */}
        <div
          className="owj-header-meta"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <span
            className="owj-topbar-status"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 700,
              padding: "5px 14px",
              borderRadius: 20,
              background: toneBgs[statusTone],
              color: toneColors[statusTone],
            }}
          >
            <i
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: toneColors[statusTone],
                display: "inline-block",
                animation:
                  statusTone !== "good" ? "owjPulse 2s infinite" : "none",
              }}
            />
            {statusLabels[crawl.status] || crawl.status}
          </span>
          <span
            className="owj-meta-date"
            style={{ fontSize: 12, color: T.textMuted }}
          >
            بروزرسانی: {formatTime(data.sourceUpdatedAt || data.generatedAt)}
          </span>
          <button
            className="owj-icon-button"
            onClick={() => load()}
            disabled={refreshing}
            title="بازخوانی داشبورد"
            style={{
              width: 38,
              height: 38,
              borderRadius: T.radiusSm,
              border: `1px solid ${T.borderLight}`,
              background: "transparent",
              color: T.textSec,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all .2s",
            }}
          >
            <Icon name="refresh" />
          </button>
        </div>
      </header>

      {/* ═══ MAIN CONTENT ═══ */}
      <main
        className="owj-main"
        style={{ maxWidth: 1400, margin: "0 auto", padding: "0 28px 80px" }}
      >
        {/* ─── Hero ─── */}
        <section
          className="owj-hero"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: 36,
            padding: "52px 0 44px",
            alignItems: "center",
          }}
        >
          <div
            className="owj-hero-copy"
            style={{ animation: "owjSlideUp .6s ease both" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                fontWeight: 700,
                color: T.secondaryDark,
                marginBottom: 14,
              }}
            >
              <Icon name="activity" size={17} />
              هوش عملیاتی / فروش آپارتمان تهران
            </span>
            <h1
              style={{
                fontSize: 34,
                fontWeight: 900,
                lineHeight: 1.4,
                color: T.white,
                margin: "0 0 14px",
                letterSpacing: -0.5,
              }}
            >
                آیا داده‌های بازار{" "}
              <em
                style={{
                  fontStyle: "normal",
                  color: T.primary,
                }}
              >
                قابل اعتماد هستند.
              </em>
            </h1>
            <p
              style={{
                fontSize: 15,
                color: T.textSec,
                lineHeight: 1.75,
                margin: 0,
                maxWidth: 560,
              }}
            >
              یک نمای عملیاتی از پوشش جمع‌آوری، دقت موقعیت، آمادگی مدل و
              آگهی‌هایی که ارزش بررسی دارند.
            </p>
            <div className="owj-hero-updated">
              <Icon name="refresh" size={14} />
              <span>آخرین بروزرسانی:</span>
              <time>
                {formatTime(data.sourceUpdatedAt || data.generatedAt)}
              </time>
            </div>
          </div>

          {/* Run Card */}
          <div
            className="owj-run-card"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 18,
              padding: 26,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              boxShadow: T.shadowLg,
              animation: "owjSlideUp .7s ease both",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative gradient line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                height: 3,
                background: `linear-gradient(90deg, ${T.primary}, ${T.secondary})`,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, color: T.textMuted }}>
                آخرین خزش
              </span>
              <strong
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  fontFamily: "monospace",
                  color: T.primaryLight,
                  background: T.primaryBg,
                  padding: "3px 10px",
                  borderRadius: 6,
                }}
              >
                {toPersianDigits(crawl.runId?.slice(0, 8) || "—")}
              </strong>
            </div>
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <strong
                className="owj-run-count"
                style={{
                  fontSize: 44,
                  fontWeight: 900,
                  color: T.white,
                  display: "block",
                  lineHeight: 1,
                  letterSpacing: -2,
                }}
              >
                {formatNumber(crawl.processed)}
              </strong>
              <span
                style={{
                  fontSize: 13,
                  color: T.textSec,
                  marginTop: 4,
                  display: "block",
                }}
              >
                آگهی پردازش‌شده
              </span>
            </div>
            <Progress
              value={crawl.successRate}
              tone="cyan"
              label="نرخ موفقیت خزش"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: T.textMuted,
                paddingTop: 14,
                borderTop: `1px solid ${T.border}`,
              }}
            >
              <span>{formatDuration(crawl.durationMs)}</span>
              <span>
                {formatNumber(crawl.areasCompleted)} /{" "}
                {formatNumber(crawl.areasTotal)} منطقه
              </span>
            </div>
          </div>
        </section>

        {/* ─── KPI Grid ─── */}
        <section
          className="owj-kpi-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 18,
            marginBottom: 36,
          }}
          aria-label="معیارهای کلیدی کیفیت"
        >
          <KpiCard
            eyebrow="موفقیت خزش"
            value={formatPercent(crawl.successRate)}
            detail={`${formatNumber(crawl.successful)} موفق · ${formatNumber(crawl.failed)} ناموفق`}
            progress={crawl.successRate}
            tone="cyan"
            icon="check"
          />
          <KpiCard
            eyebrow="تکمیل مناطق"
            value={formatPercent(areaCompletion)}
            detail={`${formatNumber(crawl.areasCompleted)} از ${formatNumber(crawl.areasTotal)} منطقه`}
            progress={areaCompletion}
            tone="green"
            icon="area"
          />
          <KpiCard
            eyebrow="پوشش کاندیداها"
            value={formatPercent(overview.candidateCoverage)}
            detail={`${formatNumber(crawl.discovered)} از ${formatNumber(overview.candidateTarget)} هدف`}
            progress={overview.candidateCoverage}
            tone="orange"
            icon="database"
          />
          <KpiCard
            eyebrow="پوشش مختصات"
            value={formatPercent(locationQuality.coverage)}
            detail={`${formatNumber(locationQuality.available)} قابل استفاده · ${formatNumber(locationQuality.missing)} ناموجود`}
            progress={locationQuality.coverage}
            tone="violet"
            icon="location"
          />
        </section>

        {/* ─── Attention ─── */}
        <section style={{ marginBottom: 36 }}>
          <SectionHeading
            kicker="دروازه‌های کیفیت"
            title="نیازمند توجه"
            description="اعدادی که می‌توانند تصمیمات جمع‌آوری یا مدل‌سازی را تغییر دهند."
          />
          <div
            className="owj-attention-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            <AttentionCard
              tone={crawl.failed ? "warn" : "good"}
              icon={crawl.failed ? "alert" : "check"}
              value={formatNumber(crawl.failed)}
              title="رکوردهای جزئیات ناموفق"
              text={
                crawl.failed
                  ? "رویدادهای crawl.listing.failure را قبل از تأیید کامل بودن پوشش بررسی کنید."
                  : "هیچ خطای جزئیات آگهی در این اجرا وجود ندارد."
              }
            />
            <AttentionCard
              tone={areaCoverage.withShortfall ? "warn" : "good"}
              icon="area"
              value={formatNumber(areaCoverage.withShortfall)}
              title="مناطق زیر هدف"
              text={`${formatNumber(areaCoverage.totalShortfall)} آگهی کمتر از هدف تعیین‌شده هر منطقه.`}
            />
            <AttentionCard
              tone={locationQuality.missing ? "warn" : "good"}
              icon="location"
              value={formatNumber(locationQuality.missing)}
              title="آگهی‌های بدون مختصات"
              text="با امنیت ذخیره شده‌اند اما از مقایسه مختصاتی و امتیازدهی حذف می‌شوند."
            />
            <AttentionCard
              tone={crawl.contactEndpointAttempts ? "bad" : "good"}
              icon={crawl.contactEndpointAttempts ? "alert" : "check"}
              value={formatNumber(crawl.contactEndpointAttempts)}
              title="تلاش‌های endpoint تماس"
              text={
                crawl.contactEndpointAttempts
                  ? "فعالیت guardrail شناسایی شد؛ فوراً بررسی کنید."
                  : "guardrail جمع‌آوری عمومی بدون مشکل باقی ماند."
              }
            />
          </div>
        </section>

        {/* ─── Split: Location + Model ─── */}
        <section
          className="owj-detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <LocationQuality data={locationQuality} />
          <ModelReadiness data={model} />
        </section>

        {/* ─── Area Coverage ─── */}
        <AreaCoverage data={areaCoverage} />

        {/* ─── Scored Listings ─── */}
        <div id="scored-listings">
          <Recommendations
            data={data.scoring?.available ? data.scoring : recommendations}
          />
        </div>

        {/* ─── Events ─── */}
        <EventStream events={recentEvents} />

        {/* ─── Raw JSON ─── */}
        <details
          className="owj-raw-json"
          style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: T.radius,
            overflow: "hidden",
            marginBottom: 24,
            boxShadow: T.shadow,
          }}
        >
          <summary
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 24px",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              color: T.textSec,
              listStyle: "none",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="database" size={18} /> داده خام JSON
            </span>
            <span style={{ fontSize: 12, color: T.textMuted }}>
              مشاهده محتوای دقیق API
            </span>
          </summary>
          <pre
            style={{
              padding: 24,
              margin: 0,
              fontSize: 12,
              color: T.textMuted,
              background: T.raised,
              overflowX: "auto",
              direction: "ltr",
              textAlign: "left",
              lineHeight: 1.6,
              fontFamily: "monospace",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer
        className="owj-footer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "22px 28px",
          borderTop: `1px solid ${T.border}`,
          fontSize: 12,
          color: T.textMuted,
          maxWidth: 1400,
          margin: "0 auto",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>
          <strong style={{ color: T.textSec }}>املاک اوج</strong> · تحلیل بازار
          مسکن · فقط داده‌های عمومی
        </span>
        <span>
          امتیازها ابزارهای تصمیم‌گیری آزمایشی هستند، نه توصیه سرمایه‌گذاری.
        </span>
      </footer>
    </div>
  );
}
