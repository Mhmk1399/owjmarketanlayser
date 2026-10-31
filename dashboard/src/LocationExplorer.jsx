"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AppHeader,
  Icon,
  T,
  formatMoney,
  formatNumber,
  injectGlobalCSS,
} from "./shared.jsx";

const typeLabels = { 0: "کشور", 1: "استان", 2: "شهر", 4: "محله / منطقه" };

// Display-only localization: API values, state, filter and URLs stay untouched.
function persianDigits(value) {
  return String(value ?? "").replace(
    /[0-9]/g,
    (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)],
  );
}

/*
 * Self-contained, component-scoped CSS.
 * No .css file, CSS module, Tailwind dependency or changed API behavior.
 */
const LOCATION_CSS = `
  .owj-location-page {
    min-height: 100svh;
    width: 100%;
    min-width: 0;
    overflow-x: clip;
    background: #f7f8fa;
    color: #202127;
    direction: rtl;
    font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
    font-size: 14px;
    line-height: 1.8;
    -webkit-font-smoothing: antialiased;
  }
  .owj-location-page *,
  .owj-location-page *::before,
  .owj-location-page *::after { box-sizing: border-box; }
  .owj-location-page a { color: inherit; text-decoration: none; -webkit-tap-highlight-color: transparent; }
  .owj-location-page button,
  .owj-location-page input { font: inherit; }
  .owj-location-page a:focus-visible,
  .owj-location-page input:focus-visible {
    outline: 3px solid rgba(102,48,141,.28);
    outline-offset: 3px;
  }
  .owj-location-page .location-main {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
    padding: 30px 28px 90px;
    min-width: 0;
  }

  /* Breadcrumb trail */
  .owj-location-page .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 5px;
    max-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    padding: 0 1px 12px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #6b707b;
  }
  .owj-location-page .breadcrumbs::-webkit-scrollbar { display: none; }
  .owj-location-page .breadcrumbs > span {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    flex: none;
  }
  .owj-location-page .breadcrumbs b {
    color: #a2a6b0;
    font-size: 20px;
    font-weight: 400;
    line-height: 1;
  }
  .owj-location-page .breadcrumbs a {
    padding: 3px 5px;
    border-radius: 7px;
    transition: color .18s ease, background .18s ease;
  }
  .owj-location-page .breadcrumbs a:hover {
    color: #66308d;
    background: #f4eef8;
  }
  .owj-location-page .breadcrumbs a[aria-current="page"] {
    color: #202127;
    font-weight: 800;
  }

  /* Hero */
  .owj-location-page .location-hero {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 26px;
    min-width: 0;
    padding: 33px 36px;
    background: #fff;
    border: 1px solid #eceef1;
    border-radius: 22px;
    box-shadow: 0 4px 20px rgba(24,31,41,.025);
    overflow: hidden;
    margin: 0 0 19px;
  }
  .owj-location-page .location-hero::before {
    content: "";
    position: absolute;
    top: 32px;
    right: 0;
    width: 4px;
    height: 57px;
    border-radius: 4px 0 0 4px;
    background: #66308d;
  }
  .owj-location-page .location-hero > div {
    flex: 1;
    min-width: 0;
  }
  .owj-location-page .location-kicker {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 10px;
    color: #66308d;
    font-size: 12px;
    font-weight: 800;
  }
  .owj-location-page .location-kicker svg { color: #66308d; }
  .owj-location-page .location-hero h1 {
    margin: 0 0 9px;
    font-size: clamp(27px, 3.4vw, 40px);
    letter-spacing: -.4px;
    line-height: 1.45;
    font-weight: 900;
    color: #17191f;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-hero p {
    margin: 0;
    max-width: 580px;
    color: #666b75;
    font-size: 13px;
    line-height: 2;
  }
  .owj-location-page .tehran-shortcut {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    flex-shrink: 0;
    min-height: 46px;
    padding: 10px 15px;
    border-radius: 12px;
    border: 1px solid #e9daef;
    background: #f7f2fa;
    color: #66308d;
    font-size: 12px;
    font-weight: 800;
    transition: border-color .18s ease, background .18s ease, transform .18s ease;
  }
  .owj-location-page .tehran-shortcut:hover {
    background: #f1e8f6;
    border-color: #d8c1e6;
    transform: translateY(-1px);
  }
  .owj-location-page .tehran-shortcut svg { transform: scaleX(-1); }

  /* Four market summary cards */
  .owj-location-page .location-stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 13px;
    margin: 0 0 18px;
  }
  .owj-location-page .location-stat {
    min-width: 0;
    min-height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 13px;
    padding: 22px;
    background: #fff;
    border: 1px solid #eceef1;
    border-radius: 18px;
    box-shadow: 0 2px 14px rgba(24,31,41,.02);
  }
  .owj-location-page .location-stat > span {
    color: #6b707b;
    font-size: 12px;
    font-weight: 600;
  }
  .owj-location-page .location-stat strong {
    color: #17191f;
    font-size: clamp(19px, 1.9vw, 26px);
    line-height: 1.65;
    font-weight: 900;
    letter-spacing: -.25px;
    overflow-wrap: anywhere;
    font-variant-numeric: tabular-nums;
  }

  /* Score distribution */
  .owj-location-page .score-distribution {
    padding: 23px 24px 20px;
    background: #fff;
    border: 1px solid #eceef1;
    border-radius: 18px;
    margin-bottom: 38px;
  }
  .owj-location-page .score-distribution__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 17px;
  }
  .owj-location-page .score-distribution__head h2 {
    font-size: 14px;
    line-height: 1.6;
    color: #252830;
    margin: 0;
    font-weight: 800;
  }
  .owj-location-page .score-distribution__head small {
    font-size: 11px;
    color: #858994;
  }
  .owj-location-page .score-distribution__bar {
    width: 100%;
    min-height: 13px;
    display: flex;
    direction: rtl;
    overflow: hidden;
    gap: 0;
    background: #edeff2;
    border-radius: 99px;
  }
  .owj-location-page .score-distribution__bar span {
    display: block;
    min-height: 13px;
    flex: none;
    transition: width .4s ease;
  }
  .owj-location-page .score-distribution__legend {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 11px;
    margin-top: 18px;
  }
  .owj-location-page .score-distribution__legend > span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 7px;
    min-width: 0;
    color: #5e626d;
    font-size: 11px;
    line-height: 1.7;
    font-weight: 600;
  }
  .owj-location-page .score-distribution__legend i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    flex: none;
  }

  /* Section headings and controls */
  .owj-location-page .location-section { margin: 0 0 38px; min-width: 0; }
  .owj-location-page .location-section__head {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 16px 24px;
    min-width: 0;
    margin: 0 0 18px;
  }
  .owj-location-page .location-section__head > div:first-child { min-width: 0; }
  .owj-location-page .location-section__head > div:first-child > span {
    display: block;
    font-size: 12px;
    font-weight: 800;
    color: #087a6e;
    margin-bottom: 3px;
  }
  .owj-location-page .location-section__head h2 {
    margin: 0;
    font-size: clamp(19px, 2.3vw, 25px);
    color: #17191f;
    font-weight: 900;
    line-height: 1.55;
  }
  .owj-location-page .location-section__head > small {
    flex: none;
    font-size: 12px;
    color: #767b85;
    line-height: 1.8;
  }
  .owj-location-page .location-search {
    width: min(350px, 100%);
    min-height: 49px;
    flex: none;
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 0 14px;
    color: #767c87;
    background: #fff;
    border: 1px solid #dde0e6;
    border-radius: 13px;
    transition: border-color .18s ease, box-shadow .18s ease;
    cursor: text;
  }
  .owj-location-page .location-search:focus-within {
    border-color: #ac89c5;
    box-shadow: 0 0 0 3px rgba(102,48,141,.08);
  }
  .owj-location-page .location-search input {
    width: 100%;
    min-width: 0;
    min-height: 45px;
    border: 0;
    background: none;
    outline: none;
    box-shadow: none;
    color: #202127;
    font-size: 16px;
    direction: rtl;
  }
  .owj-location-page .location-search input::placeholder {
    opacity: 1;
    color: #8b909a;
    font-size: 13px;
  }
  .owj-location-page .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  /* Navigable location cards */
  .owj-location-page .place-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 13px;
  }
  .owj-location-page .place-card {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
    min-height: 187px;
    padding: 20px 22px 18px;
    background: #fff;
    border: 1px solid #e9ebef;
    border-radius: 17px;
    box-shadow: 0 2px 12px rgba(24,31,41,.018);
    transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
  }
  .owj-location-page .place-card:hover {
    transform: translateY(-2px);
    border-color: #d9c8e4;
    box-shadow: 0 8px 24px rgba(27,28,37,.055);
  }
  .owj-location-page .place-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 10px;
  }
  .owj-location-page .place-card__type {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #6b707b;
    font-size: 11px;
    font-weight: 700;
  }
  .owj-location-page .place-card__type svg { color: #82569f; }
  .owj-location-page .place-card__arrow {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    background: #f5f5f8;
    color: #7c828e;
    border-radius: 9px;
    flex: none;
    transform: scaleX(-1);
    transition: background .18s ease, color .18s ease;
  }
  .owj-location-page .place-card:hover .place-card__arrow {
    background: #f4eef8;
    color: #66308d;
  }
  .owj-location-page .place-card h3 {
    font-size: 18px;
    line-height: 1.5;
    font-weight: 800;
    color: #202127;
    margin: 0;
    overflow-wrap: anywhere;
  }
  .owj-location-page .place-card__slug {
    font-size: 11px;
    font-weight: 500;
    color: #9499a3;
    text-align: right;
    max-width: 100%;
    direction: ltr;
    unicode-bidi: plaintext;
    overflow-wrap: anywhere;
    margin-top: 4px;
  }
  .owj-location-page .place-card__bottom {
    display: flex;
    align-items: end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    border-top: 1px solid #f0f0f3;
    margin-top: auto;
    padding-top: 14px;
    min-width: 0;
  }
  .owj-location-page .place-card__count {
    display: inline-flex;
    align-items: baseline;
    gap: 5px;
    white-space: nowrap;
  }
  .owj-location-page .place-card__count strong {
    color: #202127;
    font-size: 18px;
    font-weight: 900;
    line-height: 1.4;
  }
  .owj-location-page .place-card__count span {
    color: #727681;
    font-size: 11px;
    font-weight: 600;
  }
  .owj-location-page .place-card__price {
    display: inline-block;
    color: #5e646e;
    font-size: 11px;
    line-height: 1.7;
    overflow-wrap: anywhere;
  }

  /* Listing list */
  .owj-location-page .location-listings {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
  }
  .owj-location-page .location-listing {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, .85fr) 65px;
    align-items: center;
    gap: 14px 22px;
    min-width: 0;
    min-height: 108px;
    padding: 19px 22px;
    background: #fff;
    border: 1px solid #e9ebef;
    border-radius: 16px;
    transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
  }
  .owj-location-page .location-listing:hover {
    border-color: #d9c8e4;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(27,28,37,.04);
  }
  .owj-location-page .location-listing > div { min-width: 0; }
  .owj-location-page .location-listing__main h3 {
    margin: 0 0 8px;
    color: #202127;
    font-size: 14px;
    font-weight: 800;
    line-height: 1.7;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-listing__main p {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    margin: 0;
    color: #747985;
    font-size: 12px;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-listing__main p svg { color: #9da1a9; }
  .owj-location-page .location-listing__prices {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
    min-width: 0;
  }
  .owj-location-page .location-listing__prices strong {
    font-size: 16px;
    font-weight: 900;
    color: #202127;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-listing__prices span {
    font-size: 12px;
    color: #777c87;
    line-height: 1.75;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-listing__score-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .owj-location-page .location-listing__score-wrap > span {
    font-size: 10px;
    font-weight: 600;
    color: #7d818c;
  }
  .owj-location-page .location-score {
    display: grid;
    place-items: center;
    width: 58px;
    min-height: 48px;
    padding: 8px 4px;
    border-radius: 11px;
    background: #f4eef8;
    color: #66308d;
    font-size: 17px;
    line-height: 1.45;
    font-weight: 900;
    text-align: center;
  }

  /* Loading, API error and empty states */
  .owj-location-page .location-state,
  .owj-location-page .location-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    min-height: 142px;
    padding: 28px 20px;
    border-radius: 17px;
    background: #fff;
    border: 1px solid #edeef1;
    color: #6b707b;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    line-height: 1.9;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-state { min-height: 230px; }
  .owj-location-page .location-state--error {
    border-color: #f0d8dc;
    color: #a43442;
    background: #fffafa;
  }
  .owj-location-page .location-state__dots {
    display: inline-flex;
    gap: 6px;
    align-items: center;
  }
  .owj-location-page .location-state__dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #66308d;
    animation: owjLocationDot 1.2s ease-in-out infinite;
  }
  .owj-location-page .location-state__dots span:nth-child(2) { animation-delay: .15s; background: #01ae9b; }
  .owj-location-page .location-state__dots span:nth-child(3) { animation-delay: .3s; }
  @keyframes owjLocationDot {
    0%, 80%, 100% { transform: scale(.65); opacity: .35; }
    40% { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 1060px) {
    .owj-location-page .location-main { padding: 23px 20px 64px; }
    .owj-location-page .location-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .owj-location-page .place-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .owj-location-page .score-distribution__legend { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  @media (max-width: 700px) {
    .owj-location-page .location-main { padding: 19px 16px 52px; }
    .owj-location-page .breadcrumbs { margin-bottom: 9px; font-size: 11px; }
    .owj-location-page .location-hero {
      flex-direction: column;
      align-items: stretch;
      gap: 18px;
      padding: 23px 20px;
      border-radius: 18px;
    }
    .owj-location-page .location-hero::before { top: 23px; height: 45px; }
    .owj-location-page .location-hero h1 { font-size: 28px; }
    .owj-location-page .location-hero p { font-size: 12px; }
    .owj-location-page .tehran-shortcut { width: 100%; min-height: 46px; }
    .owj-location-page .location-stats { gap: 10px; margin-bottom: 12px; }
    .owj-location-page .location-stat { min-height: 112px; padding: 16px; border-radius: 15px; }
    .owj-location-page .location-stat strong { font-size: 19px; }
    .owj-location-page .score-distribution { padding: 18px 16px; margin-bottom: 30px; }
    .owj-location-page .score-distribution__legend { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 8px; }
    .owj-location-page .location-section { margin-bottom: 29px; }
    .owj-location-page .location-section__head { flex-direction: column; align-items: stretch; gap: 12px; }
    .owj-location-page .location-section__head h2 { font-size: 21px; }
    .owj-location-page .location-search { width: 100%; min-height: 50px; }
    .owj-location-page .place-grid { grid-template-columns: minmax(0, 1fr); gap: 10px; }
    .owj-location-page .place-card {
      min-height: 166px;
      padding: 17px 18px 16px;
      border-radius: 15px;
    }
    .owj-location-page .place-card h3 { font-size: 17px; }
    .owj-location-page .location-listings { gap: 10px; }
    .owj-location-page .location-listing {
      grid-template-columns: minmax(0, 1fr) auto;
      grid-template-areas: "main main" "price score";
      align-items: center;
      gap: 12px 14px;
      padding: 17px;
      border-radius: 15px;
    }
    .owj-location-page .location-listing__main {
      grid-area: main;
      padding-bottom: 11px;
      border-bottom: 1px solid #f0f0f3;
    }
    .owj-location-page .location-listing__prices { grid-area: price; }
    .owj-location-page .location-listing__score-wrap { grid-area: score; }
    .owj-location-page .location-listing__main h3 { margin-bottom: 5px; }
    .owj-location-page .location-listing__prices strong { font-size: 15px; }
    .owj-location-page .location-score { width: 55px; min-height: 46px; }
  }
  @media (max-width: 390px) {
    .owj-location-page .location-main { padding-inline: 12px; }
    .owj-location-page .location-stat { padding: 14px 12px; }
    .owj-location-page .location-stat > span { font-size: 11px; }
    .owj-location-page .location-stat strong { font-size: 17px; }
    .owj-location-page .score-distribution__legend > span { font-size: 10px; }
    .owj-location-page .location-listing { padding: 15px 13px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .owj-location-page .location-state__dots span { animation: none; }
    .owj-location-page .place-card,
    .owj-location-page .location-listing,
    .owj-location-page .tehran-shortcut { transition: none; }
  }
`;

function Stat({ label, value, accent = T.text }) {
  return (
    <article className="location-stat">
      <span>{label}</span>
      <strong style={{ color: accent }}>{value}</strong>
    </article>
  );
}

function ScoreDistribution({ data, total }) {
  const bands = [
    ["strong", "قوی", T.green],
    ["promising", "امیدبخش", T.secondary],
    ["fair", "متوسط", T.orange],
    ["weak", "ضعیف", T.red],
    ["unscored", "بدون امتیاز", T.textMuted],
  ];

  return (
    <section className="score-distribution" aria-label="توزیع امتیاز آگهی‌ها">
      <div className="score-distribution__head">
        <h2>توزیع امتیاز آگهی‌ها</h2>
        <small>پراکندگی آگهی‌ها بر اساس امتیاز</small>
      </div>
      <div className="score-distribution__bar">
        {bands.map(([key, label, color]) =>
          data?.[key] ? (
            <span
              key={key}
              title={`${label}: ${formatNumber(data[key])}`}
              style={{
                width: `${(data[key] / Math.max(total, 1)) * 100}%`,
                background: color,
              }}
            />
          ) : null,
        )}
      </div>
      <div className="score-distribution__legend">
        {bands.map(([key, label, color]) => (
          <span key={key}>
            <i style={{ background: color }} />
            {label}: {formatNumber(data?.[key] || 0)}
          </span>
        ))}
      </div>
    </section>
  );
}

export default function LocationExplorer({ slug = "iran" }) {
  injectGlobalCSS();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setData(null);
    setError(null);
    fetch(`/locations/${encodeURIComponent(slug)}`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    })
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
  }, [slug]);

  const children = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("fa");
    return (data?.children || []).filter(
      (item) =>
        !normalized ||
        `${item.name} ${item.slug}`
          .toLocaleLowerCase("fa")
          .includes(normalized),
    );
  }, [data, query]);

  return (
    <div className="location-page owj-location-page" dir="rtl">
      <style>{LOCATION_CSS}</style>
      <AppHeader active="locations" />

      <main className="location-main">
        {!data && !error && (
          <div className="location-state" role="status" aria-live="polite">
            <div className="location-state__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            در حال بارگذاری سلسله‌مراتب رسمی مناطق…
          </div>
        )}

        {error && (
          <div className="location-state location-state--error" role="alert">
            بارگذاری ناموفق بود: {persianDigits(error)}
          </div>
        )}

        {data && (
          <>
            <nav className="breadcrumbs" aria-label="مسیر مکان">
              {data.breadcrumb.map((item, index) => (
                <span key={item.id}>
                  {index > 0 && <b aria-hidden="true">‹</b>}
                  <a
                    href={`/explore/${item.slug}`}
                    aria-current={item.id === data.node.id ? "page" : undefined}
                  >
                    {persianDigits(item.name)}
                  </a>
                </span>
              ))}
            </nav>

            <header className="location-hero">
              <div>
                <span className="location-kicker">
                  <Icon name="location" size={17} />{" "}
                  {typeLabels[data.node.type]}
                </span>
                <h1>{persianDigits(data.node.name)}</h1>
                <p>
                  کاوش آگهی‌ها بر پایه سلسله‌مراتب رسمی دیوار، از استان و شهر تا
                  محله.
                </p>
              </div>
              {data.node.slug !== "tehran" && (
                <a className="tehran-shortcut" href="/explore/tehran">
                  رفتن مستقیم به تهران
                  <Icon name="arrow" size={16} />
                </a>
              )}
            </header>

            <section className="location-stats" aria-label="خلاصه بازار">
              <Stat
                label="تعداد آگهی"
                value={formatNumber(data.summary.listingCount)}
                accent={T.secondaryDark}
              />
              <Stat
                label="میانه قیمت"
                value={formatMoney(data.summary.medianPrice)}
              />
              <Stat
                label="میانه هر متر"
                value={formatMoney(data.summary.medianPricePerMeter)}
              />
              <Stat
                label="میانگین امتیاز"
                value={
                  data.summary.averageScore === null
                    ? "—"
                    : formatNumber(data.summary.averageScore)
                }
                accent={T.primaryPale}
              />
            </section>

            <ScoreDistribution
              data={data.summary.scoreDistribution}
              total={data.summary.listingCount}
            />

            {!!data.children.length && (
              <section className="location-section">
                <div className="location-section__head">
                  <div>
                    <span>سطح بعدی</span>
                    <h2>
                      {data.node.type === "1"
                        ? "شهرها"
                        : data.node.type === "2"
                          ? "محله‌ها و مناطق"
                          : "استان‌ها"}
                    </h2>
                  </div>
                  <label className="location-search">
                    <span className="sr-only">جستجوی مکان</span>
                    <Icon name="location" size={17} />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="جستجوی نام یا شناسه…"
                    />
                  </label>
                </div>
                <div className="place-grid">
                  {children.map((item) => (
                    <a
                      className="place-card"
                      href={`/explore/${item.slug}`}
                      key={item.id}
                    >
                      <div className="place-card__top">
                        <span className="place-card__type">
                          <Icon name="location" size={15} />
                          {typeLabels[item.type]}
                        </span>
                        <span className="place-card__arrow">
                          <Icon name="arrow" size={16} />
                        </span>
                      </div>
                      <h3>{persianDigits(item.name)}</h3>
                      <small className="place-card__slug">
                        {persianDigits(item.slug)}
                      </small>
                      <div className="place-card__bottom">
                        <div className="place-card__count">
                          <strong>
                            {formatNumber(item.summary.listingCount)}
                          </strong>
                          <span>آگهی</span>
                        </div>
                        <small className="place-card__price">
                          {formatMoney(item.summary.medianPricePerMeter)} / متر
                        </small>
                      </div>
                    </a>
                  ))}
                </div>
                {!children.length && (
                  <div className="location-empty">
                    مکانی مطابق جستجو پیدا نشد.
                  </div>
                )}
              </section>
            )}

            <section className="location-section">
              <div className="location-section__head">
                <div>
                  <span>آگهی‌های منطبق</span>
                  <h2>فهرست آگهی‌ها</h2>
                </div>
                <small>حداکثر ۲۰۰ مورد تازه در این نما</small>
              </div>

              <div className="location-listings">
                {data.listings.map((item) => (
                  <a
                    className="location-listing"
                    href={`/listing/${item.token}`}
                    key={item.token}
                  >
                    <div className="location-listing__main">
                      <h3>{persianDigits(item.title)}</h3>
                      <p>
                        <Icon name="location" size={14} />
                        {persianDigits(
                          item.resolvedLocation?.name ||
                            item.neighborhood ||
                            "مکان نامشخص",
                        )}{" "}
                        · {formatNumber(item.area)} متر
                      </p>
                    </div>
                    <div className="location-listing__prices">
                      <strong>{formatMoney(item.price)}</strong>
                      <span>{formatMoney(item.pricePerMeter)} / متر</span>
                    </div>
                    <div className="location-listing__score-wrap">
                      <span>امتیاز</span>
                      <b className="location-score">
                        {item.score === null ? "—" : formatNumber(item.score)}
                      </b>
                    </div>
                  </a>
                ))}
                {!data.listings.length && (
                  <div className="location-empty">
                    هنوز آگهی منطبق برای این مکان ذخیره نشده است.
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
