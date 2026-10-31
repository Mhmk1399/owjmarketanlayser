import { useEffect, useMemo, useState } from "react";
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
const lifecycleLabels = {
  active: "فعال",
  "not-seen": "دیده‌نشده",
  "possibly-removed": "احتمال حذف",
  removed: "حذف‌شده",
};
const readinessLabels = {
  "scoring-ready": "آماده امتیازدهی",
  "history-only": "فقط سابقه",
};
const advertiserLabels = {
  personal: "شخصی",
  "real-estate-business": "مشاور املاک",
  unknown: "نامشخص",
};
const amenityDisplayLabels = {
  elevator: "آسانسور",
  parking: "پارکینگ",
  storage: "انباری",
  balcony: "بالکن",
};
const LISTINGS_PAGE_SIZE = 40;

/*
 * OWJ catalog presentation. Styles live in this JSX file and are scoped to
 * .listings-page, so no external stylesheet or global catalog selectors.
 */
const CATALOG_CSS = `
  .listings-page {
    --catalog-bg: ${T.bg};
    --catalog-surface: ${T.surface};
    --catalog-ink: ${T.text};
    --catalog-muted: ${T.textMuted};
    --catalog-border: ${T.borderMed};
    --catalog-primary: ${T.primary};
    --catalog-accent: ${T.secondary};
    min-width: 0;
    min-height: 100svh;
    background: ${T.bg};
    color: ${T.text};
    font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
    direction: rtl;
    overflow-x: clip;
    text-align: right;
  }
  .listings-page *, .listings-page *::before, .listings-page *::after {
    box-sizing: border-box;
  }
  .listings-page :where(a, button, input, select, summary):focus-visible {
    outline: 3px solid rgba(102, 48, 141, .26);
    outline-offset: 3px;
  }
  .listings-page button, .listings-page input, .listings-page select {
    font: inherit;
  }
  .listings-page a { color: inherit; }
  .listings-page .listings-main {
    width: min(100%, 1360px);
    margin-inline: auto;
    padding: clamp(18px, 3.2vw, 42px) clamp(16px, 3vw, 34px) 72px;
  }
  .listings-page .listings-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 22px;
    align-items: center;
    padding: clamp(23px, 3vw, 39px);
    margin: 0 0 22px;
    background: ${T.surface};
    border: 1px solid ${T.border};
    border-radius: 23px;
    box-shadow: ${T.shadow};
    position: relative;
    overflow: hidden;
  }
  .listings-page .listings-hero::before {
    content: '';
    position: absolute;
    inset-block: 18px;
    right: 0;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: ${T.primary};
  }
  .listings-page .listings-hero > div { min-width: 0; }
  .listings-page .location-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border-radius: 999px;
    background: ${T.primaryBg};
    color: ${T.primary};
    font-size: 12px;
    font-weight: 700;
    line-height: 1.5;
  }
  .listings-page .listings-hero h1 {
    margin: 14px 0 9px;
    font-size: clamp(25px, 3.1vw, 36px);
    line-height: 1.5;
    font-weight: 900;
    letter-spacing: -.55px;
    color: ${T.text};
  }
  .listings-page .listings-hero p {
    max-width: 650px;
    margin: 0;
    color: ${T.textSec};
    font-size: 13px;
    line-height: 2;
  }
  .listings-page .listing-total {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3px;
    min-width: 142px;
    min-height: 116px;
    padding: 14px 22px;
    background: ${T.raised};
    border: 1px solid ${T.border};
    border-radius: 18px;
    text-align: center;
  }
  .listings-page .listing-total strong {
    color: ${T.primary};
    font-size: clamp(29px, 3vw, 38px);
    line-height: 1.3;
    font-weight: 900;
    font-variant-numeric: tabular-nums;
  }
  .listings-page .listing-total span {
    color: ${T.textSec};
    font-size: 12px;
    font-weight: 650;
  }
  .listings-page .listing-filters {
    display: grid;
    grid-template-columns: minmax(0, 1.7fr) repeat(3, minmax(0, 1fr));
    gap: 14px;
    padding: clamp(17px, 2.6vw, 28px);
    margin-bottom: 23px;
    border: 1px solid ${T.border};
    border-radius: 22px;
    background: ${T.surface};
    box-shadow: ${T.shadow};
  }
  .listings-page .listing-filters__toolbar {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 4px;
  }
  .listings-page .listing-filters__toolbar h2 {
    margin: 0;
    font-size: 17px;
    line-height: 1.6;
    font-weight: 850;
    color: ${T.text};
  }
  .listings-page .listing-filters__toolbar .listing-reset {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-height: 42px;
    padding: 9px 15px;
    background: ${T.surface};
    border: 1px solid ${T.borderLight};
    border-radius: 11px;
    color: ${T.textSec};
    cursor: pointer;
    font-size: 12px;
    font-weight: 750;
    transition: background .18s ease, border-color .18s ease, color .18s ease;
  }
  .listings-page .listing-filters__toolbar .listing-reset:hover {
    background: ${T.primaryBg};
    border-color: ${T.primaryBg2};
    color: ${T.primary};
  }
  .listings-page .listing-filter {
    display: flex;
    flex-direction: column;
    gap: 7px;
    min-width: 0;
    color: ${T.textSec};
    font-size: 12px;
    font-weight: 750;
  }
  .listings-page .listing-filter > span:first-child { line-height: 1.7; }
  .listings-page .listing-filter input,
  .listings-page .listing-filter select {
    display: block;
    width: 100%;
    min-width: 0;
    height: 49px;
    padding: 10px 13px;
    color: ${T.text};
    background: ${T.surface};
    border: 1px solid ${T.borderLight};
    border-radius: 12px;
    outline: none;
    font-size: 13px;
    font-weight: 600;
    direction: rtl;
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
  }
  .listings-page .listing-filter select {
    cursor: pointer;
    padding-inline-end: 10px;
    text-overflow: ellipsis;
  }
  .listings-page .listing-filter input::placeholder {
    color: #91949c;
    font-weight: 450;
  }
  .listings-page .listing-filter :is(input,select):hover,
  .listings-page .listing-range-card input:hover {
    border-color: #b8bbc4;
  }
  .listings-page .listing-filter :is(input,select):focus,
  .listings-page .listing-range-card input:focus {
    outline: none;
    border-color: ${T.primary};
    box-shadow: 0 0 0 3px rgba(102,48,141,.095);
  }
  .listings-page .listing-filter--search { position: relative; }
  .listings-page .listing-filter--search input { padding-inline-start: 42px; }
  .listings-page .listing-search__icon {
    position: absolute;
    inset-inline-start: 14px;
    bottom: 15px;
    display: inline-flex;
    color: ${T.textMuted};
    pointer-events: none;
  }
  .listings-page .listing-filters__advanced {
    grid-column: 1 / -1;
    min-width: 0;
    margin-top: 2px;
    border: 1px solid ${T.borderMed};
    background: ${T.surfaceLight};
    border-radius: 15px;
  }
  .listings-page .listing-filters__advanced > summary {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 53px;
    padding: 12px 17px;
    list-style: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 800;
    color: ${T.text};
    user-select: none;
  }
  .listings-page .listing-filters__advanced > summary::-webkit-details-marker { display: none; }
  .listings-page .listing-filters__advanced > summary .listing-filters__count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 27px;
    height: 25px;
    padding: 2px 8px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 800;
    background: ${T.primaryBg};
    color: ${T.primary};
  }
  .listings-page .listing-filters__chevron {
    margin-inline-start: auto;
    display: inline-flex;
    align-items: center;
    transition: transform .18s ease;
    color: ${T.textMuted};
  }
  .listings-page .listing-filters__advanced[open] .listing-filters__chevron {
    transform: rotate(180deg);
  }
  .listings-page .listing-filters__advanced-body {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 17px;
    padding: 21px;
    border-top: 1px solid ${T.border};
  }
  .listings-page .listing-filters__advanced-body > .listing-filter { grid-column: span 2; }
  .listings-page .listing-range-card {
    grid-column: span 2;
    display: grid;
    grid-template-columns: minmax(0,1fr) minmax(0,1fr);
    gap: 10px;
    min-width: 0;
    margin: 0;
    padding: 14px;
    background: ${T.surface};
    border: 1px solid ${T.border};
    border-radius: 14px;
  }
  .listings-page .listing-range-card > strong {
    grid-column: 1/-1;
    color: ${T.text};
    font-size: 13px;
    font-weight: 800;
  }
  .listings-page .listing-range-card > label {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 7px;
    color: ${T.textMuted};
    font-size: 11px;
    font-weight: 700;
  }
  .listings-page .listing-range-card input {
    display: block;
    width: 100%;
    min-width: 0;
    height: 45px;
    padding: 9px 10px;
    background: ${T.surface};
    border: 1px solid ${T.borderLight};
    border-radius: 10px;
    color: ${T.text};
    outline: 0;
    direction: rtl;
    font-size: 12px;
    font-weight: 600;
  }
  .listings-page .listing-range-card input::placeholder { color: #9296a1; font-weight: 450; }
  .listings-page .amenity-filter {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 15px 0 0;
    margin: 0;
    border: 0;
    border-top: 1px solid ${T.border};
    min-width: 0;
  }
  .listings-page .amenity-filter legend {
    padding: 0 0 11px;
    color: ${T.text};
    font-size: 13px;
    font-weight: 800;
  }
  .listings-page .amenity-filter button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 43px;
    padding: 9px 16px;
    background: ${T.surface};
    border: 1px solid ${T.borderLight};
    border-radius: 11px;
    color: ${T.textSec};
    cursor: pointer;
    font-size: 12px;
    font-weight: 750;
    transition: border-color .18s ease, background .18s ease, color .18s ease;
  }
  .listings-page .amenity-filter button:hover { border-color: ${T.primary}; color: ${T.primary}; }
  .listings-page .amenity-filter button.is-active {
    background: ${T.primaryBg};
    border-color: ${T.primaryBg2};
    color: ${T.primary};
  }
  .listings-page .amenity-filter button.is-active::before {
    content: '\\2713';
    display: inline-flex;
    align-items: center;
    margin-inline-end: 7px;
    font-size: 14px;
  }
  .listings-page .listing-results {
    display: flex;
    align-items: center;
    min-height: 47px;
    gap: 8px;
    margin: 0 1px 13px;
    color: ${T.textSec};
    font-size: 13px;
    line-height: 1.8;
    font-weight: 600;
  }
  .listings-page .catalog-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }
  .listings-page .catalog-pagination button {
    min-height: 44px;
    padding: 0 16px;
    border: 1px solid ${T.borderMed};
    border-radius: 8px;
    background: ${T.surface};
    color: ${T.text};
    cursor: pointer;
  }
  .listings-page .catalog-pagination button:disabled {
    opacity: .45;
    cursor: not-allowed;
  }
  .listings-page .catalog-pagination span {
    color: ${T.textMuted};
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }
  .listings-page .listing-results::before {
    content: '';
    display: inline-block;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: ${T.secondary};
    flex: none;
  }
  .listings-page .catalog-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 17px;
  }
  .listings-page .catalog-card {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: clamp(18px, 2vw, 24px);
    background: ${T.surface};
    border: 1px solid ${T.border};
    border-radius: 20px;
    box-shadow: ${T.shadow};
    transition: box-shadow .2s ease, border-color .2s ease, transform .2s ease;
  }
  .listings-page .catalog-card:hover {
    border-color: ${T.borderLight};
    box-shadow: ${T.shadowLg};
    transform: translateY(-2px);
  }
  .listings-page .catalog-card__top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(150px, .7fr);
    gap: 18px;
    align-items: start;
  }
  .listings-page .catalog-card__identity { min-width: 0; }
  .listings-page .catalog-card__location {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: ${T.textMuted};
    font-size: 11px;
    font-weight: 700;
    line-height: 1.7;
  }
  .listings-page .catalog-card h2 {
    margin: 9px 0 7px;
    font-size: clamp(15px, 1.3vw, 18px);
    line-height: 1.9;
    font-weight: 850;
    color: ${T.text};
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-card h2 a {
    color: inherit;
    text-decoration: none;
  }
  .listings-page .catalog-card h2 a:hover { color: ${T.primary}; }
  .listings-page .catalog-card__identity p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 43px;
    margin: 0;
    color: ${T.textSec};
    font-size: 12px;
    line-height: 1.9;
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-card__price {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    min-width: 0;
    padding-inline-start: 17px;
    border-inline-start: 1px solid ${T.border};
  }
  .listings-page .catalog-card__price-label {
    color: ${T.textMuted};
    font-size: 11px;
    font-weight: 650;
  }
  .listings-page .catalog-card__price > strong {
    color: ${T.text};
    font-size: clamp(15px, 1.4vw, 19px);
    font-weight: 900;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-card__price > span {
    color: ${T.textSec};
    font-size: 11px;
    line-height: 1.7;
  }
  .listings-page .scenario-score-badge {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 3px 6px;
    max-width: 100%;
    padding: 5px 9px;
    margin-top: 9px;
    background: ${T.secondaryBg};
    border: 1px solid ${T.secondaryBg2};
    border-radius: 9px;
    color: ${T.secondaryDark};
    font-size: 10px;
    font-weight: 700;
    overflow-wrap: anywhere;
  }
  .listings-page .scenario-score-badge strong { font-size: 14px; color: ${T.secondaryDark}; font-weight: 900; }
  .listings-page .scenario-score-badge small { font-size: 10px; opacity: .95; }
  .listings-page .catalog-facts {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 9px;
    margin: 0;
    padding: 14px 0;
    border-top: 1px solid ${T.border};
    border-bottom: 1px solid ${T.border};
  }
  .listings-page .catalog-facts > div {
    min-width: 0;
    padding: 10px 11px;
    border-radius: 10px;
    background: ${T.raised};
  }
  .listings-page .catalog-facts dt {
    margin-bottom: 5px;
    color: ${T.textMuted};
    font-size: 11px;
    font-weight: 600;
  }
  .listings-page .catalog-facts dd {
    margin: 0;
    color: ${T.text};
    font-size: 12px;
    font-weight: 800;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-card__foot {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 12px;
    margin-top: auto;
  }
  .listings-page .catalog-tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 7px;
    min-width: 0;
  }
  .listings-page .status-pill, .listings-page .detail-chip {
    display: inline-flex;
    align-items: center;
    min-height: 27px;
    max-width: 100%;
    padding: 4px 9px;
    border: 1px solid ${T.border};
    border-radius: 8px;
    background: ${T.raised};
    color: ${T.textSec};
    font-size: 10px;
    line-height: 1.7;
    font-weight: 700;
    white-space: normal;
  }
  .listings-page .status-pill--active {
    background: ${T.greenBg};
    color: ${T.green};
    border-color: ${T.greenBg2};
  }
  .listings-page .status-pill--not-seen,
  .listings-page .status-pill--possibly-removed {
    background: ${T.orangeBg};
    color: ${T.orange};
    border-color: ${T.orangeBg2};
  }
  .listings-page .status-pill--removed {
    background: ${T.redBg};
    color: ${T.red};
    border-color: ${T.redBg2};
  }
  .listings-page .detail-chip { background: ${T.surface}; }
  .listings-page .catalog-detail-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex: none;
    min-height: 43px;
    padding: 10px 12px;
    border: 1px solid ${T.primaryBg2};
    border-radius: 11px;
    background: ${T.primaryBg};
    color: ${T.primary};
    text-decoration: none;
    font-size: 12px;
    font-weight: 850;
    transition: background .18s ease, transform .18s ease;
  }
  .listings-page .catalog-detail-link:hover {
    background: ${T.primaryBg2};
  }
  .listings-page .catalog-detail-link svg { transform: rotate(180deg); }
  .listings-page .location-state {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    min-height: 135px;
    padding: 28px 18px;
    border: 1px solid ${T.border};
    border-radius: 19px;
    background: ${T.surface};
    color: ${T.textSec};
    text-align: center;
    font-size: 14px;
    font-weight: 650;
  }
  .listings-page .location-state:not(.location-state--error)::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid ${T.primaryBg2};
    border-top-color: ${T.primary};
    border-radius: 50%;
    animation: owjCatalogSpin 750ms linear infinite;
    flex: none;
  }
  .listings-page .location-state--error {
    min-height: 120px;
    border-color: ${T.redBg2};
    background: ${T.redBg};
    color: ${T.red};
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-empty {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    min-height: 300px;
    padding: 36px 18px;
    background: ${T.surface};
    border: 1px solid ${T.border};
    border-radius: 20px;
    color: ${T.textSec};
    text-align: center;
  }
  .listings-page .catalog-empty svg { color: ${T.textMuted}; }
  .listings-page .catalog-empty h2 {
    margin: 0;
    color: ${T.text};
    font-size: 18px;
    line-height: 1.6;
    font-weight: 850;
  }
  .listings-page .catalog-empty p { margin: 0; font-size: 13px; line-height: 1.8; }
  .listings-page .catalog-empty button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 11px 20px;
    border: 0;
    border-radius: 11px;
    background: ${T.primary};
    color: white;
    cursor: pointer;
    font-size: 13px;
    font-weight: 800;
  }
  @keyframes owjCatalogSpin { to { transform: rotate(360deg); } }
  @media (max-width: 1180px) {
    .listings-page .catalog-card__top { grid-template-columns: 1fr; }
    .listings-page .catalog-card__price {
      border-inline-start: 0;
      border-top: 1px solid ${T.border};
      padding-inline-start: 0;
      padding-top: 12px;
    }
    .listings-page .listing-filters {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .listings-page .listing-filter--search { grid-column: span 3; }
    .listings-page .listing-filters__advanced-body > .listing-filter { grid-column: span 3; }
    .listings-page .listing-range-card { grid-column: span 3; }
  }
  @media (max-width: 920px) {
    .listings-page .catalog-grid { grid-template-columns: minmax(0, 1fr); }
    .listings-page .catalog-card__top { grid-template-columns: minmax(0,1fr) minmax(180px,.6fr); }
    .listings-page .catalog-card__price {
      border-top: 0;
      border-inline-start: 1px solid ${T.border};
      padding-top: 0;
      padding-inline-start: 18px;
    }
  }
  @media (max-width: 640px) {
    .listings-page .listings-main { padding: 16px 14px 54px; }
    .listings-page .listings-hero {
      grid-template-columns: minmax(0, 1fr);
      gap: 17px;
      padding: 23px 20px;
      border-radius: 18px;
      margin-bottom: 14px;
    }
    .listings-page .listings-hero p { font-size: 12px; }
    .listings-page .listing-total {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      min-height: 74px;
      text-align: right;
      padding: 12px 17px;
      border-radius: 13px;
    }
    .listings-page .listing-total strong { font-size: 29px; }
    .listings-page .listing-filters {
      grid-template-columns: repeat(2, minmax(0,1fr));
      gap: 12px;
      padding: 16px;
      border-radius: 18px;
      margin-bottom: 14px;
    }
    .listings-page .listing-filters__toolbar { gap: 10px; }
    .listings-page .listing-filters__toolbar h2 { font-size: 15px; }
    .listings-page .listing-filters__toolbar .listing-reset { min-height: 41px; padding-inline: 10px; font-size: 11px; }
    .listings-page .listing-filter--search { grid-column: 1 / -1; }
    .listings-page .listing-filters > .listing-filter[for='lifecycle-filter'] { grid-column: 1 / -1; }
    .listings-page .listing-filter :is(input,select) { height: 49px; }
    .listings-page .listing-filters__advanced-body { grid-template-columns: repeat(2,minmax(0,1fr)); padding: 15px; gap: 12px; }
    .listings-page .listing-filters__advanced-body > .listing-filter { grid-column: 1 / -1; }
    .listings-page .listing-range-card { grid-column: 1 / -1; }
    .listings-page .catalog-card { padding: 17px; gap: 15px; border-radius: 17px; }
    .listings-page .catalog-card__top { grid-template-columns: minmax(0,1fr); gap: 15px; }
    .listings-page .catalog-card__price {
      border-inline-start: 0;
      border-top: 1px solid ${T.border};
      padding-inline-start: 0;
      padding-top: 12px;
      align-items: flex-start;
    }
    .listings-page .catalog-card__price > strong { font-size: 20px; }
    .listings-page .catalog-card h2 { font-size: 16px; }
    .listings-page .catalog-facts { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; }
    .listings-page .catalog-card__foot { flex-direction: column; align-items: stretch; gap: 16px; }
    .listings-page .catalog-detail-link { width: 100%; min-height: 47px; }
    .listings-page .catalog-tags { align-items: flex-start; }
    .listings-page .listing-results { font-size: 12px; line-height: 1.9; }
  }
  @media (max-width: 360px) {
    .listings-page .listing-filters { padding: 13px; gap: 10px; }
    .listings-page .listing-filter :is(input,select) { font-size: 12px; padding-inline: 9px; }
    .listings-page .listing-range-card { padding: 11px; }
    .listings-page .listing-range-card input { font-size: 11px; }
    .listings-page .catalog-card { padding: 15px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .listings-page *, .listings-page *::before, .listings-page *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;

function SelectFilter({ id, label, value, onChange, children }) {
  return (
    <label className="listing-filter" htmlFor={id}>
      <span>{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </select>
    </label>
  );
}
function ListingCard({ listing }) {
  const details = listing.propertyDetails || {};
  const amenities = Object.entries(listing.amenities || {}).filter(
    ([, value]) => value === true,
  );
  return (
    <article className="catalog-card">
      <div className="catalog-card__top">
        <div className="catalog-card__identity">
          <span className="catalog-card__location">
            <Icon name="location" size={15} />
            {listing.neighborhood || listing.district || "مکان نامشخص"}
          </span>
          <h2>
            <a href={`/listing/${listing.token}`}>{listing.title}</a>
          </h2>
          <p>
            {listing.description || "توضیح عمومی برای این آگهی ثبت نشده است."}
          </p>
        </div>
        <div className="catalog-card__price">
          {listing.scenarioScore && (
            <div
              className="scenario-score-badge"
              aria-label={`امتیاز سناریوی ${listing.scenarioScore.scenarioName}`}
            >
              <span>{listing.scenarioScore.scenarioName}</span>
              <strong>
                {formatNumber(listing.scenarioScore.recommendation)}
              </strong>
              <small>رتبه {formatNumber(listing.scenarioScore.rank)}</small>
            </div>
          )}
          <small className="catalog-card__price-label">قیمت کل</small>
          <strong>{formatMoney(listing.pricing?.price)}</strong>
          <span>هر متر {formatMoney(listing.pricing?.pricePerMeter)}</span>
        </div>
      </div>
      <dl className="catalog-facts">
        <div>
          <dt>متراژ</dt>
          <dd>{formatNumber(listing.property?.area)} متر</dd>
        </div>
        <div>
          <dt>اتاق</dt>
          <dd>{formatNumber(listing.property?.rooms)}</dd>
        </div>
        <div>
          <dt>سال ساخت</dt>
          <dd>{formatYear(listing.property?.constructionYear)}</dd>
        </div>
        <div>
          <dt>طبقه</dt>
          <dd>{formatNumber(listing.property?.floor)}</dd>
        </div>
        <div>
          <dt>نوع ملک</dt>
          <dd>{details.propertyType || "—"}</dd>
        </div>
        <div>
          <dt>تصاویر</dt>
          <dd>{formatNumber(listing.imageCount || 0)}</dd>
        </div>
      </dl>
      <div className="catalog-card__foot">
        <div className="catalog-tags" aria-label="ویژگی‌های آگهی">
          <span
            className={`status-pill status-pill--${listing.lifecycle?.status || "unknown"}`}
          >
            {lifecycleLabels[listing.lifecycle?.status] || "نامشخص"}
          </span>
          <span className="status-pill">
            {readinessLabels[listing.quality?.outcome] || "طبقه‌بندی‌نشده"}
          </span>
          <span
            className={`status-pill status-pill--advertiser-${listing.advertiserType}`}
          >
            {advertiserLabels[listing.advertiserType] || "نامشخص"}
          </span>
          {amenities.slice(0, 4).map(([name]) => (
            <span className="detail-chip" key={name}>
              {name}
            </span>
          ))}
        </div>
        <a className="catalog-detail-link" href={`/listing/${listing.token}`}>
          مشاهده جزئیات <Icon name="arrow" size={16} />
        </a>
      </div>
    </article>
  );
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
  const [advertiserType, setAdvertiserType] = useState(
    initial.get("advertiserType") || "all",
  );
  const [scenario, setScenario] = useState(initial.get("scenario") || "all");
  const [scenarios, setScenarios] = useState([]);
  const [facets, setFacets] = useState({
    districts: [],
    categories: [],
    bounds: {},
  });
  const [total, setTotal] = useState(0);
  const [minPrice, setMinPrice] = useState(initial.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(initial.get("maxPrice") || "");
  const [minPricePerMeter, setMinPricePerMeter] = useState(
    initial.get("minPricePerMeter") || "",
  );
  const [maxPricePerMeter, setMaxPricePerMeter] = useState(
    initial.get("maxPricePerMeter") || "",
  );
  const [minArea, setMinArea] = useState(initial.get("minArea") || "");
  const [maxArea, setMaxArea] = useState(initial.get("maxArea") || "");
  const [minRooms, setMinRooms] = useState(initial.get("minRooms") || "");
  const [minYear, setMinYear] = useState(initial.get("minYear") || "");
  const [amenities, setAmenities] = useState(initial.getAll("amenity"));
  const filterKey = JSON.stringify([
    query, district, category, readiness, lifecycle, advertiserType, scenario,
    minPrice, maxPrice, minPricePerMeter, maxPricePerMeter, minArea, maxArea,
    minRooms, minYear, amenities,
  ]);
  const [pagination, setPagination] = useState({ page: 0, filterKey });
  const page = pagination.filterKey === filterKey ? pagination.page : 0;
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      const params = new URLSearchParams({
        limit: String(LISTINGS_PAGE_SIZE),
        offset: String(page * LISTINGS_PAGE_SIZE),
      });
      const add = (key, value) => {
        if (value && value !== "all") params.set(key, value);
      };
      add("q", query.trim());
      add("district", district);
      add("category", category);
      add("readiness", readiness);
      add("status", lifecycle);
      add("advertiserType", advertiserType);
      add("minPrice", minPrice);
      add("maxPrice", maxPrice);
      add("minPricePerMeter", minPricePerMeter);
      add("maxPricePerMeter", maxPricePerMeter);
      add("minArea", minArea);
      add("maxArea", maxArea);
      add("minRooms", minRooms);
      add("minYear", minYear);
      amenities.forEach((value) => params.append("amenity", value));
      const endpoint =
        scenario === "all"
          ? `/listings?${params}`
          : `/scoring-scenarios/${encodeURIComponent(scenario)}/scores?${params}`;
      fetch(endpoint, {
        signal: controller.signal,
        headers: { accept: "application/json" },
      })
        .then((response) =>
          response.ok
            ? response.json()
            : Promise.reject(new Error(`HTTP ${response.status}`)),
        )
        .then((payload) => {
          const lastPage = Math.max(0, Math.ceil((payload.total || 0) / LISTINGS_PAGE_SIZE) - 1);
          if (page > lastPage) {
            setPagination({ page: lastPage, filterKey });
            return;
          }
          setListings(payload.listings || []);
          setTotal(payload.total || 0);
        })
        .catch((caught) => {
          if (caught.name !== "AbortError") setError(caught.message);
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [
    query,
    district,
    category,
    readiness,
    lifecycle,
    advertiserType,
    scenario,
    minPrice,
    maxPrice,
    minPricePerMeter,
    maxPricePerMeter,
    minArea,
    maxArea,
    minRooms,
    minYear,
    amenities,
    page,
    filterKey,
  ]);
  useEffect(() => {
    fetch("/listing-facets")
      .then((response) => response.json())
      .then(setFacets)
      .catch(() => {});
  }, []);
  useEffect(() => {
    fetch("/scoring-scenarios")
      .then((response) => (response.ok ? response.json() : { scenarios: [] }))
      .then((payload) => setScenarios(payload.scenarios || []))
      .catch(() => {});
  }, []);
  const filtered = listings;
  const pageCount = Math.ceil(total / LISTINGS_PAGE_SIZE);
  const goToPage = (nextPage) => {
    setPagination({ page: nextPage, filterKey });
    document.getElementById("catalog-results")?.scrollIntoView({ block: "start" });
  };
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (district !== "all") params.set("district", district);
    if (category !== "all") params.set("category", category);
    if (readiness !== "all") params.set("readiness", readiness);
    if (advertiserType !== "all") params.set("advertiserType", advertiserType);
    if (scenario !== "all") params.set("scenario", scenario);
    if (lifecycle !== "active") params.set("status", lifecycle);
    [
      ["minPrice", minPrice],
      ["maxPrice", maxPrice],
      ["minPricePerMeter", minPricePerMeter],
      ["maxPricePerMeter", maxPricePerMeter],
      ["minArea", minArea],
      ["maxArea", maxArea],
      ["minRooms", minRooms],
      ["minYear", minYear],
    ].forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    amenities.forEach((value) => params.append("amenity", value));
    window.history.replaceState(
      null,
      "",
      `/catalog${params.size ? `?${params}` : ""}`,
    );
  }, [
    query,
    district,
    category,
    readiness,
    lifecycle,
    advertiserType,
    scenario,
    minPrice,
    maxPrice,
    minPricePerMeter,
    maxPricePerMeter,
    minArea,
    maxArea,
    minRooms,
    minYear,
    amenities,
  ]);
  const reset = () => {
    setQuery("");
    setDistrict("all");
    setCategory("all");
    setReadiness("all");
    setLifecycle("active");
    setAdvertiserType("all");
    setScenario("all");
    setMinPrice("");
    setMaxPrice("");
    setMinPricePerMeter("");
    setMaxPricePerMeter("");
    setMinArea("");
    setMaxArea("");
    setMinRooms("");
    setMinYear("");
    setAmenities([]);
  };
  const toggleAmenity = (name) =>
    setAmenities((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  // Presentation-only count for the collapsed advanced-filters label.
  const advancedFilterCount =
    [
      readiness !== "all",
      advertiserType !== "all",
      scenario !== "all",
      !!minPrice,
      !!maxPrice,
      !!minPricePerMeter,
      !!maxPricePerMeter,
      !!minArea,
      !!maxArea,
      !!minRooms,
      !!minYear,
    ].filter(Boolean).length + amenities.length;
  return (
    <div className="listings-page" dir="rtl">
      <style>{CATALOG_CSS}</style>
      <AppHeader active="listings" />
      <main className="listings-main" id="main-content">
        <header className="listings-hero">
          <div>
            <span className="location-kicker">
              <Icon name="database" size={17} /> فهرست داده‌های عمومی
            </span>
            <h1>آگهی‌های جمع‌آوری‌شده</h1>
            <p>
              جزئیات عمومی ملک‌ها، دسته‌بندی‌شده بر اساس مکان، نوع آگهی، وضعیت
              انتشار و آمادگی تحلیل.
            </p>
          </div>
          <div className="listing-total">
            <strong>{formatNumber(total)}</strong>
            <span>آگهی منطبق</span>
          </div>
        </header>
        <section className="listing-filters" aria-label="فیلتر آگهی‌ها">
          <div className="listing-filters__toolbar">
            <h2>فیلتر آگهی‌ها</h2>
            <button className="listing-reset" type="button" onClick={reset}>
              پاک‌کردن فیلترها
            </button>
          </div>
          <label
            className="listing-filter listing-filter--search"
            htmlFor="listing-search"
          >
            <span>جستجو</span>
            <span className="listing-search__icon" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="10.8" cy="10.8" r="6.7" />
                <path d="m16 16 4.2 4.2" />
              </svg>
            </span>
            <input
              id="listing-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="عنوان، محله یا شناسه آگهی"
            />
          </label>
          <SelectFilter
            id="district-filter"
            label="محله"
            value={district}
            onChange={setDistrict}
          >
            <option value="all">همه محله‌ها</option>
            {facets.districts.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </SelectFilter>
          <SelectFilter
            id="category-filter"
            label="دسته"
            value={category}
            onChange={setCategory}
          >
            <option value="all">همه دسته‌ها</option>
            {facets.categories.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </SelectFilter>
          <SelectFilter
            id="lifecycle-filter"
            label="وضعیت انتشار"
            value={lifecycle}
            onChange={setLifecycle}
          >
            <option value="all">همه</option>
            <option value="active">فعال</option>
            <option value="not-seen">دیده‌نشده</option>
            <option value="possibly-removed">احتمال حذف</option>
            <option value="removed">حذف‌شده</option>
          </SelectFilter>
          <details
            className="listing-filters__advanced"
            defaultOpen={advancedFilterCount > 0}
          >
            <summary>
              <span>
                {
                  "\u0641\u06cc\u0644\u062a\u0631\u0647\u0627\u06cc \u0628\u06cc\u0634\u062a\u0631"
                }
              </span>
              {advancedFilterCount > 0 && (
                <span className="listing-filters__count">
                  {formatNumber(advancedFilterCount)}
                </span>
              )}
              <span className="listing-filters__chevron" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className="listing-filters__advanced-body">
              <SelectFilter
                id="readiness-filter"
                label="پوشش داده"
                value={readiness}
                onChange={setReadiness}
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="scoring-ready">آماده امتیازدهی</option>
                <option value="history-only">فقط سابقه</option>
              </SelectFilter>
              <SelectFilter
                id="advertiser-filter"
                label="نوع آگهی‌دهنده"
                value={advertiserType}
                onChange={setAdvertiserType}
              >
                <option value="all">همه آگهی‌دهندگان</option>
                <option value="personal">فایل شخصی</option>
                <option value="real-estate-business">مشاور املاک</option>
                <option value="unknown">نامشخص</option>
              </SelectFilter>
              <SelectFilter
                id="scenario-filter"
                label="سناریوی امتیازدهی و مرتب‌سازی"
                value={scenario}
                onChange={setScenario}
              >
                <option value="all">مرتب‌سازی معمول آگهی‌ها</option>
                {scenarios.map((item) => (
                  <option value={item.scenarioId} key={item.scenarioId}>
                    {item.name}
                  </option>
                ))}
              </SelectFilter>
              <div className="listing-range-card">
                <strong>قیمت کل</strong>
                <label>
                  از
                  <input
                    inputMode="numeric"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="حداقل تومان"
                  />
                </label>
                <label>
                  تا
                  <input
                    inputMode="numeric"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="حداکثر تومان"
                  />
                </label>
              </div>
              <div className="listing-range-card">
                <strong>قیمت هر متر</strong>
                <label>
                  از
                  <input
                    inputMode="numeric"
                    value={minPricePerMeter}
                    onChange={(e) => setMinPricePerMeter(e.target.value)}
                    placeholder="حداقل"
                  />
                </label>
                <label>
                  تا
                  <input
                    inputMode="numeric"
                    value={maxPricePerMeter}
                    onChange={(e) => setMaxPricePerMeter(e.target.value)}
                    placeholder="حداکثر"
                  />
                </label>
              </div>
              <div className="listing-range-card">
                <strong>متراژ</strong>
                <label>
                  از
                  <input
                    inputMode="numeric"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                    placeholder="حداقل متر"
                  />
                </label>
                <label>
                  تا
                  <input
                    inputMode="numeric"
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                    placeholder="حداکثر متر"
                  />
                </label>
              </div>
              <label className="listing-filter">
                <span>حداقل اتاق</span>
                <input
                  inputMode="numeric"
                  value={minRooms}
                  onChange={(e) => setMinRooms(e.target.value)}
                  placeholder="مثلاً ۲"
                />
              </label>
              <label className="listing-filter">
                <span>حداقل سال ساخت</span>
                <input
                  inputMode="numeric"
                  value={minYear}
                  onChange={(e) => setMinYear(e.target.value)}
                  placeholder="مثلاً ۱۳۹۵"
                />
              </label>
              <fieldset className="amenity-filter">
                <legend>امکانات الزامی</legend>
                {[
                  ["elevator", "آسانسور"],
                  ["parking", "پارکینگ"],
                  ["storage", "انباری"],
                  ["balcony", "بالکن"],
                ].map(([key, label]) => (
                  <button
                    type="button"
                    aria-pressed={amenities.includes(key)}
                    className={amenities.includes(key) ? "is-active" : ""}
                    onClick={() => toggleAmenity(key)}
                    key={key}
                  >
                    {label}
                  </button>
                ))}
              </fieldset>
            </div>
          </details>
        </section>
        <div id="catalog-results" className="listing-results" role="status" aria-live="polite">
          {loading ? "در حال دریافت نتایج" : error ? "دریافت نتایج ناموفق بود" : total > 0
            ? `نمایش ${formatNumber(page * LISTINGS_PAGE_SIZE + 1)} تا ${formatNumber(page * LISTINGS_PAGE_SIZE + filtered.length)} از ${formatNumber(total)} آگهی منطبق`
            : "آگهی منطبقی پیدا نشد"}
        </div>
        {loading && (
          <div className="location-state">در حال بارگذاری آگهی‌ها…</div>
        )}
        {error && (
          <div className="location-state location-state--error">
            بارگذاری ناموفق بود: {error}
          </div>
        )}
        {!loading && !error && (
          <section className="catalog-grid" aria-label="نتایج آگهی‌ها">
            {filtered.map((listing) => (
              <ListingCard listing={listing} key={listing.token} />
            ))}
            {!filtered.length && (
              <div className="catalog-empty">
                <Icon name="database" size={32} />
                <h2>آگهی منطبقی پیدا نشد</h2>
                <p>فیلترها را تغییر دهید یا پاک کنید.</p>
                <button type="button" onClick={reset}>
                  نمایش آگهی‌های فعال
                </button>
              </div>
            )}
          </section>
        )}
        {!error && pageCount > 1 && (
          <nav className="catalog-pagination" aria-label="صفحه‌بندی آگهی‌ها">
            <button type="button" disabled={loading || page === 0} onClick={() => goToPage(page - 1)}>
              صفحه قبل
            </button>
            <span>صفحه {formatNumber(page + 1)} از {formatNumber(pageCount)}</span>
            <button type="button" disabled={loading || page + 1 >= pageCount} onClick={() => goToPage(page + 1)}>
              صفحه بعد
            </button>
          </nav>
        )}
      </main>
      <AppFooter />
    </div>
  );
}
