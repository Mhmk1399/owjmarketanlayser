import{i as e,r as t}from"./index-CWwU0uhc.js";import{a as n,c as r,f as i,l as a,n as o,p as s,s as c,t as l}from"./shared-fIOWw8eQ.js";var u=e(),d=t(),f={active:`فعال`,"not-seen":`دیده‌نشده`,"possibly-removed":`احتمال حذف`,removed:`حذف‌شده`},p={"scoring-ready":`آماده امتیازدهی`,"history-only":`فقط سابقه`},m={personal:`شخصی`,"real-estate-business":`مشاور املاک`,unknown:`نامشخص`},h=40,g=`
  .listings-page {
    --catalog-bg: ${c.bg};
    --catalog-surface: ${c.surface};
    --catalog-ink: ${c.text};
    --catalog-muted: ${c.textMuted};
    --catalog-border: ${c.borderMed};
    --catalog-primary: ${c.primary};
    --catalog-accent: ${c.secondary};
    min-width: 0;
    min-height: 100svh;
    background: ${c.bg};
    color: ${c.text};
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
    background: ${c.surface};
    border: 1px solid ${c.border};
    border-radius: 23px;
    box-shadow: ${c.shadow};
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
    background: ${c.primary};
  }
  .listings-page .listings-hero > div { min-width: 0; }
  .listings-page .location-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border-radius: 999px;
    background: ${c.primaryBg};
    color: ${c.primary};
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
    color: ${c.text};
  }
  .listings-page .listings-hero p {
    max-width: 650px;
    margin: 0;
    color: ${c.textSec};
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
    background: ${c.raised};
    border: 1px solid ${c.border};
    border-radius: 18px;
    text-align: center;
  }
  .listings-page .listing-total strong {
    color: ${c.primary};
    font-size: clamp(29px, 3vw, 38px);
    line-height: 1.3;
    font-weight: 900;
    font-variant-numeric: tabular-nums;
  }
  .listings-page .listing-total span {
    color: ${c.textSec};
    font-size: 12px;
    font-weight: 650;
  }
  .listings-page .listing-filters {
    display: grid;
    grid-template-columns: minmax(0, 1.7fr) repeat(3, minmax(0, 1fr));
    gap: 14px;
    padding: clamp(17px, 2.6vw, 28px);
    margin-bottom: 23px;
    border: 1px solid ${c.border};
    border-radius: 22px;
    background: ${c.surface};
    box-shadow: ${c.shadow};
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
    color: ${c.text};
  }
  .listings-page .listing-filters__toolbar .listing-reset {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-height: 42px;
    padding: 9px 15px;
    background: ${c.surface};
    border: 1px solid ${c.borderLight};
    border-radius: 11px;
    color: ${c.textSec};
    cursor: pointer;
    font-size: 12px;
    font-weight: 750;
    transition: background .18s ease, border-color .18s ease, color .18s ease;
  }
  .listings-page .listing-filters__toolbar .listing-reset:hover {
    background: ${c.primaryBg};
    border-color: ${c.primaryBg2};
    color: ${c.primary};
  }
  .listings-page .listing-filter {
    display: flex;
    flex-direction: column;
    gap: 7px;
    min-width: 0;
    color: ${c.textSec};
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
    color: ${c.text};
    background: ${c.surface};
    border: 1px solid ${c.borderLight};
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
    border-color: ${c.primary};
    box-shadow: 0 0 0 3px rgba(102,48,141,.095);
  }
  .listings-page .listing-filter--search { position: relative; }
  .listings-page .listing-filter--search input { padding-inline-start: 42px; }
  .listings-page .listing-search__icon {
    position: absolute;
    inset-inline-start: 14px;
    bottom: 15px;
    display: inline-flex;
    color: ${c.textMuted};
    pointer-events: none;
  }
  .listings-page .listing-multiselect { position: relative; min-width: 0; }
  .listings-page .listing-multiselect > span { display: block; margin-bottom: 7px; color: ${c.textSec}; font-size: 12px; font-weight: 750; }
  .listings-page .listing-multiselect details { position: relative; }
  .listings-page .listing-multiselect summary { display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:49px;padding:10px 13px;border:1px solid ${c.borderLight};border-radius:12px;background:${c.surface};color:${c.text};cursor:pointer;font-size:13px;font-weight:650;list-style:none; }
  .listings-page .listing-multiselect summary::-webkit-details-marker { display:none; }
  .listings-page .listing-multiselect summary small { color:${c.primary};font-size:11px; }
  .listings-page .listing-multiselect__panel { position:absolute;z-index:40;inset-inline:0;top:calc(100% + 7px);display:grid;min-width:min(330px,calc(100vw - 64px));gap:9px;padding:12px;border:1px solid ${c.borderMed};border-radius:13px;background:${c.surface};box-shadow:${c.shadow}; }
  .listings-page .listing-multiselect__panel input[type="search"] { width:100%;height:42px;padding:8px 11px;border:1px solid ${c.borderLight};border-radius:9px;background:${c.surfaceLight};color:${c.text};outline:0; }
  .listings-page .listing-multiselect__options { display:grid;max-height:260px;overflow:auto;overscroll-behavior:contain; }
  .listings-page .listing-multiselect__options label { display:flex;align-items:center;gap:9px;min-height:40px;padding:7px 5px;border-bottom:1px solid ${c.border};color:${c.textSec};cursor:pointer;font-size:12px; }
  .listings-page .listing-multiselect__options input { width:17px;height:17px;accent-color:${c.primary}; }
  .listings-page .listing-multiselect__clear { min-height:38px;border:1px solid ${c.borderLight};border-radius:8px;background:${c.surfaceLight};color:${c.textSec};cursor:pointer;font:inherit;font-size:11px;font-weight:750; }
  .listings-page .listing-filter-chips { grid-column:1/-1;display:flex;flex-wrap:wrap;gap:7px; }
  .listings-page .listing-filter-chips button { display:inline-flex;align-items:center;gap:7px;min-height:34px;padding:5px 10px;border:1px solid ${c.primaryBg2};border-radius:999px;background:${c.primaryBg};color:${c.primary};cursor:pointer;font:inherit;font-size:11px;font-weight:750; }
  .listings-page .scenario-filter-note { grid-column:1/-1;margin:-4px 0 0;color:${c.textMuted};font-size:11px;line-height:1.8; }
  .listings-page .catalog-voice { grid-column:1/-1;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:12px;padding:14px;border:1px solid ${c.primaryBg2};border-radius:14px;background:${c.primaryBg}; }
  .listings-page .catalog-voice__copy { min-width:0; }
  .listings-page .catalog-voice__copy strong { display:block;color:${c.text};font-size:13px; }
  .listings-page .catalog-voice__copy p { margin:4px 0 0;color:${c.textSec};font-size:11px;line-height:1.8;overflow-wrap:anywhere; }
  .listings-page .catalog-voice__actions { display:flex;align-items:center;gap:8px; }
  .listings-page .catalog-voice__button { display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:44px;padding:9px 13px;border:1px solid ${c.primaryBg2};border-radius:11px;background:${c.surface};color:${c.primary};cursor:pointer;font:inherit;font-size:12px;font-weight:800; }
  .listings-page .catalog-voice__button:disabled { cursor:not-allowed;opacity:.5; }
  .listings-page .catalog-voice__button.is-recording { border-color:${c.redBg2};background:${c.redBg};color:${c.red}; }
  .listings-page .catalog-voice__button svg { flex:none; }
  .listings-page .catalog-voice__status { grid-column:1/-1;margin:0;color:${c.textSec};font-size:11px;line-height:1.8; }
  .listings-page .catalog-voice__status[data-error="true"] { color:${c.red}; }
  .listings-page .listing-filters__advanced {
    grid-column: 1 / -1;
    min-width: 0;
    margin-top: 2px;
    border: 1px solid ${c.borderMed};
    background: ${c.surfaceLight};
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
    color: ${c.text};
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
    background: ${c.primaryBg};
    color: ${c.primary};
  }
  .listings-page .listing-filters__chevron {
    margin-inline-start: auto;
    display: inline-flex;
    align-items: center;
    transition: transform .18s ease;
    color: ${c.textMuted};
  }
  .listings-page .listing-filters__advanced[open] .listing-filters__chevron {
    transform: rotate(180deg);
  }
  .listings-page .listing-filters__advanced-body {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 17px;
    padding: 21px;
    border-top: 1px solid ${c.border};
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
    background: ${c.surface};
    border: 1px solid ${c.border};
    border-radius: 14px;
  }
  .listings-page .listing-range-card > strong {
    grid-column: 1/-1;
    color: ${c.text};
    font-size: 13px;
    font-weight: 800;
  }
  .listings-page .listing-range-card > label {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 7px;
    color: ${c.textMuted};
    font-size: 11px;
    font-weight: 700;
  }
  .listings-page .listing-range-card input {
    display: block;
    width: 100%;
    min-width: 0;
    height: 45px;
    padding: 9px 10px;
    background: ${c.surface};
    border: 1px solid ${c.borderLight};
    border-radius: 10px;
    color: ${c.text};
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
    border-top: 1px solid ${c.border};
    min-width: 0;
  }
  .listings-page .amenity-filter legend {
    padding: 0 0 11px;
    color: ${c.text};
    font-size: 13px;
    font-weight: 800;
  }
  .listings-page .amenity-filter button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 43px;
    padding: 9px 16px;
    background: ${c.surface};
    border: 1px solid ${c.borderLight};
    border-radius: 11px;
    color: ${c.textSec};
    cursor: pointer;
    font-size: 12px;
    font-weight: 750;
    transition: border-color .18s ease, background .18s ease, color .18s ease;
  }
  .listings-page .amenity-filter button:hover { border-color: ${c.primary}; color: ${c.primary}; }
  .listings-page .amenity-filter button.is-active {
    background: ${c.primaryBg};
    border-color: ${c.primaryBg2};
    color: ${c.primary};
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
    color: ${c.textSec};
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
    border: 1px solid ${c.borderMed};
    border-radius: 8px;
    background: ${c.surface};
    color: ${c.text};
    cursor: pointer;
  }
  .listings-page .catalog-pagination button:disabled {
    opacity: .45;
    cursor: not-allowed;
  }
  .listings-page .catalog-pagination span {
    color: ${c.textMuted};
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }
  .listings-page .listing-results::before {
    content: '';
    display: inline-block;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: ${c.secondary};
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
    background: ${c.surface};
    border: 1px solid ${c.border};
    border-radius: 20px;
    box-shadow: ${c.shadow};
    transition: box-shadow .2s ease, border-color .2s ease, transform .2s ease;
  }
  .listings-page .catalog-card:hover {
    border-color: ${c.borderLight};
    box-shadow: ${c.shadowLg};
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
    color: ${c.textMuted};
    font-size: 11px;
    font-weight: 700;
    line-height: 1.7;
  }
  .listings-page .catalog-card h2 {
    margin: 9px 0 7px;
    font-size: clamp(15px, 1.3vw, 18px);
    line-height: 1.9;
    font-weight: 850;
    color: ${c.text};
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-card h2 a {
    color: inherit;
    text-decoration: none;
  }
  .listings-page .catalog-card h2 a:hover { color: ${c.primary}; }
  .listings-page .catalog-card__identity p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 43px;
    margin: 0;
    color: ${c.textSec};
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
    border-inline-start: 1px solid ${c.border};
  }
  .listings-page .catalog-card__price-label {
    color: ${c.textMuted};
    font-size: 11px;
    font-weight: 650;
  }
  .listings-page .catalog-card__price > strong {
    color: ${c.text};
    font-size: clamp(15px, 1.4vw, 19px);
    font-weight: 900;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-card__price > span {
    color: ${c.textSec};
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
    background: ${c.secondaryBg};
    border: 1px solid ${c.secondaryBg2};
    border-radius: 9px;
    color: ${c.secondaryDark};
    font-size: 10px;
    font-weight: 700;
    overflow-wrap: anywhere;
  }
  .listings-page .scenario-score-badge strong { font-size: 14px; color: ${c.secondaryDark}; font-weight: 900; }
  .listings-page .scenario-score-badge small { font-size: 10px; opacity: .95; }
  .listings-page .catalog-facts {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 9px;
    margin: 0;
    padding: 14px 0;
    border-top: 1px solid ${c.border};
    border-bottom: 1px solid ${c.border};
  }
  .listings-page .catalog-facts > div {
    min-width: 0;
    padding: 10px 11px;
    border-radius: 10px;
    background: ${c.raised};
  }
  .listings-page .catalog-facts dt {
    margin-bottom: 5px;
    color: ${c.textMuted};
    font-size: 11px;
    font-weight: 600;
  }
  .listings-page .catalog-facts dd {
    margin: 0;
    color: ${c.text};
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
    border: 1px solid ${c.border};
    border-radius: 8px;
    background: ${c.raised};
    color: ${c.textSec};
    font-size: 10px;
    line-height: 1.7;
    font-weight: 700;
    white-space: normal;
  }
  .listings-page .status-pill--active {
    background: ${c.greenBg};
    color: ${c.green};
    border-color: ${c.greenBg2};
  }
  .listings-page .status-pill--not-seen,
  .listings-page .status-pill--possibly-removed {
    background: ${c.orangeBg};
    color: ${c.orange};
    border-color: ${c.orangeBg2};
  }
  .listings-page .status-pill--removed {
    background: ${c.redBg};
    color: ${c.red};
    border-color: ${c.redBg2};
  }
  .listings-page .detail-chip { background: ${c.surface}; }
  .listings-page .catalog-detail-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex: none;
    min-height: 43px;
    padding: 10px 12px;
    border: 1px solid ${c.primaryBg2};
    border-radius: 11px;
    background: ${c.primaryBg};
    color: ${c.primary};
    text-decoration: none;
    font-size: 12px;
    font-weight: 850;
    transition: background .18s ease, transform .18s ease;
  }
  .listings-page .catalog-detail-link:hover {
    background: ${c.primaryBg2};
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
    border: 1px solid ${c.border};
    border-radius: 19px;
    background: ${c.surface};
    color: ${c.textSec};
    text-align: center;
    font-size: 14px;
    font-weight: 650;
  }
  .listings-page .location-state:not(.location-state--error)::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid ${c.primaryBg2};
    border-top-color: ${c.primary};
    border-radius: 50%;
    animation: owjCatalogSpin 750ms linear infinite;
    flex: none;
  }
  .listings-page .location-state--error {
    min-height: 120px;
    border-color: ${c.redBg2};
    background: ${c.redBg};
    color: ${c.red};
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
    background: ${c.surface};
    border: 1px solid ${c.border};
    border-radius: 20px;
    color: ${c.textSec};
    text-align: center;
  }
  .listings-page .catalog-empty svg { color: ${c.textMuted}; }
  .listings-page .catalog-empty h2 {
    margin: 0;
    color: ${c.text};
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
    background: ${c.primary};
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
      border-top: 1px solid ${c.border};
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
      border-inline-start: 1px solid ${c.border};
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
    .listings-page .listing-multiselect { grid-column: 1 / -1; }
    .listings-page .listing-multiselect__panel { position:static;min-width:0;margin-top:7px; }
    .listings-page .listing-filter-chips button { min-height:40px; }
    .listings-page .catalog-voice { grid-template-columns:minmax(0,1fr); }
    .listings-page .catalog-voice__actions { width:100%; }
    .listings-page .catalog-voice__button { flex:1;min-height:48px; }
    .listings-page .listing-filters > .listing-filter[for='lifecycle-filter'] { grid-column: 1 / -1; }
    .listings-page .listing-filter :is(input,select) { height: 49px; }
    .listings-page .listing-filters__advanced-body { grid-template-columns: repeat(2,minmax(0,1fr)); padding: 15px; gap: 12px; }
    .listings-page .listing-filters__advanced-body > .listing-filter { grid-column: 1 / -1; }
    .listings-page .listing-range-card { grid-column: 1 / -1; }
    .listings-page .catalog-card { padding: 17px; gap: 15px; border-radius: 17px; }
    .listings-page .catalog-card__top { grid-template-columns: minmax(0,1fr); gap: 15px; }
    .listings-page .catalog-card__price {
      border-inline-start: 0;
      border-top: 1px solid ${c.border};
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
`;function _({id:e,label:t,value:n,onChange:r,children:i}){return(0,d.jsxs)(`label`,{className:`listing-filter`,htmlFor:e,children:[(0,d.jsx)(`span`,{children:t}),(0,d.jsx)(`select`,{id:e,value:n,onChange:e=>r(e.target.value),children:i})]})}function ee({id:e,label:t,options:n,values:r,onChange:i}){let[o,s]=(0,u.useState)(``),c=(0,u.useDeferredValue)(o.trim().toLocaleLowerCase(`fa`)),l=c?n.filter(e=>e.toLocaleLowerCase(`fa`).includes(c)):n,f=e=>i(r.includes(e)?r.filter(t=>t!==e):[...r,e]);return(0,d.jsxs)(`div`,{className:`listing-multiselect`,children:[(0,d.jsx)(`span`,{id:`${e}-label`,children:t}),(0,d.jsxs)(`details`,{children:[(0,d.jsxs)(`summary`,{"aria-labelledby":`${e}-label`,children:[(0,d.jsx)(`span`,{children:r.length?`${a(r.length)} محله انتخاب شده`:`همه محله‌ها`}),r.length>0&&(0,d.jsx)(`small`,{children:a(r.length)})]}),(0,d.jsxs)(`div`,{className:`listing-multiselect__panel`,children:[(0,d.jsx)(`input`,{type:`search`,value:o,onChange:e=>s(e.target.value),placeholder:`جستجوی محله`,"aria-label":`جستجوی محله`}),(0,d.jsx)(`div`,{className:`listing-multiselect__options`,role:`group`,"aria-labelledby":`${e}-label`,children:l.map(e=>(0,d.jsxs)(`label`,{children:[(0,d.jsx)(`input`,{type:`checkbox`,checked:r.includes(e),onChange:()=>f(e)}),(0,d.jsx)(`span`,{children:e})]},e))}),r.length>0&&(0,d.jsx)(`button`,{className:`listing-multiselect__clear`,type:`button`,onClick:()=>i([]),children:`پاک کردن محله‌ها`})]})]})]})}function te({onApply:e,resultCount:t}){let[n,r]=(0,u.useState)(null),[i,a]=(0,u.useState)(`idle`),[o,s]=(0,u.useState)(``),[c,l]=(0,u.useState)(!1),f=(0,u.useRef)(null),p=(0,u.useRef)(null),m=(0,u.useRef)([]),h=(0,u.useRef)(null);(0,u.useEffect)(()=>{let e=new AbortController;return fetch(`/ai/voice/status`,{signal:e.signal}).then(e=>e.ok?e.json():{enabled:!1}).then(e=>r(!!e.enabled)).catch(()=>r(!1)),()=>e.abort()},[]);let g=()=>{h.current&&window.clearTimeout(h.current),h.current=null,p.current?.getTracks().forEach(e=>e.stop()),p.current=null,f.current=null};(0,u.useEffect)(()=>()=>g(),[]);let _=async t=>{a(`processing`),l(!1),s(`در حال تبدیل صدا و ساخت فیلترها…`);try{let n=await fetch(`/ai/voice/catalog-filters`,{method:`POST`,headers:{"Content-Type":t.type.split(`;`)[0]||`audio/webm`},body:t}),r=await n.json();if(!n.ok)throw Error(r.message||`HTTP ${n.status}`);e(r.filters||{}),s(`درخواست «${r.transcript}» به فیلترهای کاتالوگ تبدیل شد.`)}catch(e){l(!0),s(e.message||`پردازش درخواست صوتی ناموفق بود.`)}finally{a(`idle`)}};return n===!1?(0,d.jsx)(`div`,{className:`catalog-voice`,children:(0,d.jsxs)(`div`,{className:`catalog-voice__copy`,children:[(0,d.jsx)(`strong`,{children:`جستجوی صوتی`}),(0,d.jsx)(`p`,{children:`برای فعال‌شدن ورودی و خروجی صوتی، کلید سرور OpenAI را تنظیم کنید.`})]})}):(0,d.jsxs)(`div`,{className:`catalog-voice`,children:[(0,d.jsxs)(`div`,{className:`catalog-voice__copy`,children:[(0,d.jsx)(`strong`,{children:`فیلتر با صدای شما`}),(0,d.jsx)(`p`,{children:`مثلاً بگویید: «آپارتمان‌های ونک و میرداماد، بالای ۷۰ امتیاز، شخصی و دارای پارکینگ».`})]}),(0,d.jsxs)(`div`,{className:`catalog-voice__actions`,children:[(0,d.jsxs)(`button`,{className:`catalog-voice__button${i===`recording`?` is-recording`:``}`,type:`button`,disabled:n!==!0||![`idle`,`recording`].includes(i),"aria-pressed":i===`recording`,onClick:i===`recording`?()=>{f.current?.state===`recording`&&f.current.stop()}:async()=>{if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder>`u`){l(!0),s(`مرورگر شما ضبط صدا را پشتیبانی نمی‌کند.`);return}try{let e=await navigator.mediaDevices.getUserMedia({audio:!0});p.current=e,m.current=[];let t=[`audio/webm;codecs=opus`,`audio/ogg;codecs=opus`,`audio/webm`].find(e=>MediaRecorder.isTypeSupported(e)),n=new MediaRecorder(e,t?{mimeType:t}:void 0);f.current=n,n.ondataavailable=e=>{e.data.size&&m.current.push(e.data)},n.onstop=()=>{let e=new Blob(m.current,{type:n.mimeType||`audio/webm`});g(),e.size&&_(e)},n.start(),a(`recording`),l(!1),s(`در حال ضبط؛ درخواست ملک را بگویید. ضبط حداکثر ۲۰ ثانیه است.`),h.current=window.setTimeout(()=>n.stop(),2e4)}catch(e){g(),l(!0),s(e.name===`NotAllowedError`?`برای استفاده از جستجوی صوتی، دسترسی میکروفن را فعال کنید.`:`شروع ضبط صدا ناموفق بود.`)}},children:[(0,d.jsxs)(`svg`,{"aria-hidden":`true`,width:`17`,height:`17`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,children:[(0,d.jsx)(`rect`,{x:`9`,y:`2`,width:`6`,height:`12`,rx:`3`}),(0,d.jsx)(`path`,{d:`M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8`})]}),i===`recording`?`پایان ضبط`:i===`processing`?`در حال پردازش`:`گفتن فیلترها`]}),(0,d.jsxs)(`button`,{className:`catalog-voice__button`,type:`button`,disabled:n!==!0||i!==`idle`,onClick:async()=>{a(`speaking`),l(!1),s(`در حال ساخت صدای نتیجه با OpenAI…`);try{let e=await fetch(`/ai/voice/speech`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({text:`طبق فیلترهای فعلی، ${t} آگهی منطبق پیدا شده است.`})});if(!e.ok){let t=await e.json().catch(()=>({}));throw Error(t.message||`HTTP ${e.status}`)}let n=URL.createObjectURL(await e.blob()),r=new Audio(n);r.onended=()=>URL.revokeObjectURL(n),r.onerror=()=>URL.revokeObjectURL(n),await r.play(),s(`صدای پخش‌شده با هوش مصنوعی OpenAI تولید شده است.`)}catch(e){l(!0),s(e.message||`ساخت یا پخش صدا ناموفق بود.`)}finally{a(`idle`)}},children:[(0,d.jsxs)(`svg`,{"aria-hidden":`true`,width:`17`,height:`17`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,children:[(0,d.jsx)(`path`,{d:`M11 5 6 9H2v6h4l5 4V5Z`}),(0,d.jsx)(`path`,{d:`M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12`})]}),`شنیدن نتیجه`]})]}),o&&(0,d.jsx)(`p`,{className:`catalog-voice__status`,role:c?`alert`:`status`,"data-error":c,children:o})]})}function ne({listing:e}){let t=e.propertyDetails||{},o=Object.entries(e.amenities||{}).filter(([,e])=>e===!0);return(0,d.jsxs)(`article`,{className:`catalog-card`,children:[(0,d.jsxs)(`div`,{className:`catalog-card__top`,children:[(0,d.jsxs)(`div`,{className:`catalog-card__identity`,children:[(0,d.jsxs)(`span`,{className:`catalog-card__location`,children:[(0,d.jsx)(n,{name:`location`,size:15}),e.neighborhood||e.district||`مکان نامشخص`]}),(0,d.jsx)(`h2`,{children:(0,d.jsx)(`a`,{href:`/listing/${e.token}`,children:e.title})}),(0,d.jsx)(`p`,{children:e.description||`توضیح عمومی برای این آگهی ثبت نشده است.`})]}),(0,d.jsxs)(`div`,{className:`catalog-card__price`,children:[e.scenarioScore&&(0,d.jsxs)(`div`,{className:`scenario-score-badge`,"aria-label":`امتیاز سناریوی ${e.scenarioScore.scenarioName}`,children:[(0,d.jsx)(`span`,{children:e.scenarioScore.scenarioName}),(0,d.jsx)(`strong`,{children:a(e.scenarioScore.recommendation)}),(0,d.jsxs)(`small`,{children:[`رتبه `,a(e.scenarioScore.rank)]})]}),!e.scenarioScore&&e.marketScore&&(0,d.jsxs)(`div`,{className:`scenario-score-badge`,"aria-label":`امتیاز فعال بازار`,children:[(0,d.jsx)(`span`,{children:`امتیاز بازار`}),(0,d.jsx)(`strong`,{children:a(e.marketScore.recommendation)}),(0,d.jsxs)(`small`,{children:[`رتبه `,a(e.marketScore.rank)]})]}),(0,d.jsx)(`small`,{className:`catalog-card__price-label`,children:`قیمت کل`}),(0,d.jsx)(`strong`,{children:r(e.pricing?.price)}),(0,d.jsxs)(`span`,{children:[`هر متر `,r(e.pricing?.pricePerMeter)]})]})]}),(0,d.jsxs)(`dl`,{className:`catalog-facts`,children:[(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`dt`,{children:`متراژ`}),(0,d.jsxs)(`dd`,{children:[a(e.property?.area),` متر`]})]}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`dt`,{children:`اتاق`}),(0,d.jsx)(`dd`,{children:a(e.property?.rooms)})]}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`dt`,{children:`سال ساخت`}),(0,d.jsx)(`dd`,{children:i(e.property?.constructionYear)})]}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`dt`,{children:`طبقه`}),(0,d.jsx)(`dd`,{children:a(e.property?.floor)})]}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`dt`,{children:`نوع ملک`}),(0,d.jsx)(`dd`,{children:t.propertyType||`—`})]}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`dt`,{children:`تصاویر`}),(0,d.jsx)(`dd`,{children:a(e.imageCount||0)})]})]}),(0,d.jsxs)(`div`,{className:`catalog-card__foot`,children:[(0,d.jsxs)(`div`,{className:`catalog-tags`,"aria-label":`ویژگی‌های آگهی`,children:[(0,d.jsx)(`span`,{className:`status-pill status-pill--${e.lifecycle?.status||`unknown`}`,children:f[e.lifecycle?.status]||`نامشخص`}),(0,d.jsx)(`span`,{className:`status-pill`,children:p[e.quality?.outcome]||`طبقه‌بندی‌نشده`}),(0,d.jsx)(`span`,{className:`status-pill status-pill--advertiser-${e.advertiserType}`,children:m[e.advertiserType]||`نامشخص`}),o.slice(0,4).map(([e])=>(0,d.jsx)(`span`,{className:`detail-chip`,children:e},e))]}),(0,d.jsxs)(`a`,{className:`catalog-detail-link`,href:`/listing/${e.token}`,children:[`مشاهده جزئیات `,(0,d.jsx)(n,{name:`arrow`,size:16})]})]})]})}function v(){s();let e=new URLSearchParams(window.location.search),[t,r]=(0,u.useState)([]),[i,c]=(0,u.useState)(!0),[f,p]=(0,u.useState)(null),[m,v]=(0,u.useState)(e.get(`q`)||``),[y,b]=(0,u.useState)([...new Set(e.getAll(`district`).filter(e=>e&&e!==`all`))]),[x,S]=(0,u.useState)(e.get(`category`)||`all`),[C,re]=(0,u.useState)(e.get(`readiness`)||`all`),[w,ie]=(0,u.useState)(e.get(`status`)||`active`),[T,E]=(0,u.useState)(e.get(`advertiserType`)||`all`),[D,O]=(0,u.useState)(e.get(`scenario`)||`all`),[ae,oe]=(0,u.useState)([]),[se,ce]=(0,u.useState)({districts:[],categories:[],bounds:{}}),[k,le]=(0,u.useState)(0),[A,ue]=(0,u.useState)(e.get(`minPrice`)||``),[j,de]=(0,u.useState)(e.get(`maxPrice`)||``),[M,N]=(0,u.useState)(e.get(`minPricePerMeter`)||``),[P,F]=(0,u.useState)(e.get(`maxPricePerMeter`)||``),[I,L]=(0,u.useState)(e.get(`minArea`)||``),[R,z]=(0,u.useState)(e.get(`maxArea`)||``),[B,V]=(0,u.useState)(e.get(`minRooms`)||``),[H,U]=(0,u.useState)(e.get(`minYear`)||``),[W,G]=(0,u.useState)(e.get(`minScore`)||``),[K,fe]=(0,u.useState)(e.get(`maxScore`)||``),[q,pe]=(0,u.useState)(e.get(`minConfidence`)||``),[J,Y]=(0,u.useState)(e.get(`maxRisk`)||``),[X,me]=(0,u.useState)(e.get(`scoreBand`)||`all`),[Z,he]=(0,u.useState)(e.getAll(`amenity`)),Q=JSON.stringify([m,y,x,C,w,T,D,A,j,M,P,I,R,B,H,W,K,q,J,X,Z]),[ge,_e]=(0,u.useState)({page:0,filterKey:Q}),$=ge.filterKey===Q?ge.page:0;(0,u.useEffect)(()=>{let e=new AbortController;c(!0),p(null);let t=setTimeout(()=>{let t=new URLSearchParams({limit:String(h),offset:String($*h)}),n=(e,n)=>{n&&n!==`all`&&t.set(e,n)};n(`q`,m.trim()),y.forEach(e=>t.append(`district`,e)),n(`category`,x),n(`readiness`,C),n(`status`,w),n(`advertiserType`,T),n(`minPrice`,A),n(`maxPrice`,j),n(`minPricePerMeter`,M),n(`maxPricePerMeter`,P),n(`minArea`,I),n(`maxArea`,R),n(`minRooms`,B),n(`minYear`,H),n(`minScore`,W),n(`maxScore`,K),n(`minConfidence`,q),n(`maxRisk`,J),n(`scoreBand`,X),Z.forEach(e=>t.append(`amenity`,e));let i=D===`all`?`/listings?${t}`:`/scoring-scenarios/${encodeURIComponent(D)}/scores?${t}`;fetch(i,{signal:e.signal,headers:{accept:`application/json`}}).then(e=>e.ok?e.json():Promise.reject(Error(`HTTP ${e.status}`))).then(e=>{let t=Math.max(0,Math.ceil((e.total||0)/h)-1);if($>t){_e({page:t,filterKey:Q});return}r(e.listings||[]),le(e.total||0)}).catch(e=>{e.name!==`AbortError`&&p(e.message)}).finally(()=>{e.signal.aborted||c(!1)})},250);return()=>{clearTimeout(t),e.abort()}},[m,y,x,C,w,T,D,A,j,M,P,I,R,B,H,W,K,q,J,X,Z,$,Q]),(0,u.useEffect)(()=>{fetch(`/listing-facets`).then(e=>e.json()).then(ce).catch(()=>{})},[]),(0,u.useEffect)(()=>{fetch(`/scoring-scenarios`).then(e=>e.ok?e.json():{scenarios:[]}).then(e=>oe(e.scenarios||[])).catch(()=>{})},[]);let ve=t,ye=Math.ceil(k/h),be=e=>{_e({page:e,filterKey:Q}),document.getElementById(`catalog-results`)?.scrollIntoView({block:`start`})};(0,u.useEffect)(()=>{let e=new URLSearchParams;m&&e.set(`q`,m),y.forEach(t=>e.append(`district`,t)),x!==`all`&&e.set(`category`,x),C!==`all`&&e.set(`readiness`,C),T!==`all`&&e.set(`advertiserType`,T),D!==`all`&&e.set(`scenario`,D),w!==`active`&&e.set(`status`,w),[[`minPrice`,A],[`maxPrice`,j],[`minPricePerMeter`,M],[`maxPricePerMeter`,P],[`minArea`,I],[`maxArea`,R],[`minRooms`,B],[`minYear`,H],[`minScore`,W],[`maxScore`,K],[`minConfidence`,q],[`maxRisk`,J]].forEach(([t,n])=>{n&&e.set(t,n)}),Z.forEach(t=>e.append(`amenity`,t)),X!==`all`&&e.set(`scoreBand`,X),window.history.replaceState(null,``,`/catalog${e.size?`?${e}`:``}`)},[m,y,x,C,w,T,D,A,j,M,P,I,R,B,H,W,K,q,J,X,Z]);let xe=()=>{v(``),b([]),S(`all`),re(`all`),ie(`active`),E(`all`),O(`all`),ue(``),de(``),N(``),F(``),L(``),z(``),V(``),U(``),G(``),fe(``),pe(``),Y(``),me(`all`),he([])},Se=e=>he(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]),Ce=e=>{let t=e=>Number.isFinite(e)?String(e):``;v(e.query||``),b(Array.isArray(e.districts)?e.districts:[]),S(e.category||`all`),re(e.readiness||`all`),ie(e.status||`active`),E(e.advertiserType||`all`),O(e.scenarioId||`all`),ue(t(e.minPrice)),de(t(e.maxPrice)),N(t(e.minPricePerMeter)),F(t(e.maxPricePerMeter)),L(t(e.minArea)),z(t(e.maxArea)),V(t(e.minRooms)),U(t(e.minYear)),G(t(e.minScore)),fe(t(e.maxScore)),pe(t(e.minConfidence)),Y(t(e.maxRisk)),me(e.scoreBand||`all`),he(Array.isArray(e.amenities)?e.amenities:[])},we=[C!==`all`,T!==`all`,!!A,!!j,!!M,!!P,!!I,!!R,!!B,!!H,!!W,!!K,!!q,!!J,X!==`all`].filter(Boolean).length+Z.length;return(0,d.jsxs)(`div`,{className:`listings-page`,dir:`rtl`,children:[(0,d.jsx)(`style`,{children:g}),(0,d.jsx)(o,{active:`listings`}),(0,d.jsxs)(`main`,{className:`listings-main`,id:`main-content`,children:[(0,d.jsxs)(`header`,{className:`listings-hero`,children:[(0,d.jsxs)(`div`,{children:[(0,d.jsxs)(`span`,{className:`location-kicker`,children:[(0,d.jsx)(n,{name:`database`,size:17}),` فهرست داده‌های عمومی`]}),(0,d.jsx)(`h1`,{children:`آگهی‌های جمع‌آوری‌شده`}),(0,d.jsx)(`p`,{children:`جزئیات عمومی ملک‌ها، دسته‌بندی‌شده بر اساس مکان، نوع آگهی، وضعیت انتشار و آمادگی تحلیل.`})]}),(0,d.jsxs)(`div`,{className:`listing-total`,children:[(0,d.jsx)(`strong`,{children:a(k)}),(0,d.jsx)(`span`,{children:`آگهی منطبق`})]})]}),(0,d.jsxs)(`section`,{className:`listing-filters`,"aria-label":`فیلتر آگهی‌ها`,children:[(0,d.jsxs)(`div`,{className:`listing-filters__toolbar`,children:[(0,d.jsx)(`h2`,{children:`فیلتر آگهی‌ها`}),(0,d.jsx)(`button`,{className:`listing-reset`,type:`button`,onClick:xe,children:`پاک‌کردن فیلترها`})]}),(0,d.jsx)(te,{onApply:Ce,resultCount:k}),(0,d.jsxs)(`label`,{className:`listing-filter listing-filter--search`,htmlFor:`listing-search`,children:[(0,d.jsx)(`span`,{children:`جستجو`}),(0,d.jsx)(`span`,{className:`listing-search__icon`,"aria-hidden":`true`,children:(0,d.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.9`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,d.jsx)(`circle`,{cx:`10.8`,cy:`10.8`,r:`6.7`}),(0,d.jsx)(`path`,{d:`m16 16 4.2 4.2`})]})}),(0,d.jsx)(`input`,{id:`listing-search`,value:m,onChange:e=>v(e.target.value),placeholder:`عنوان، محله یا شناسه آگهی`})]}),(0,d.jsx)(ee,{id:`district-filter`,label:`محله‌ها`,options:se.districts,values:y,onChange:b}),(0,d.jsxs)(_,{id:`category-filter`,label:`دسته`,value:x,onChange:S,children:[(0,d.jsx)(`option`,{value:`all`,children:`همه دسته‌ها`}),se.categories.map(e=>(0,d.jsx)(`option`,{children:e},e))]}),(0,d.jsxs)(_,{id:`lifecycle-filter`,label:`وضعیت انتشار`,value:w,onChange:ie,children:[(0,d.jsx)(`option`,{value:`all`,children:`همه`}),(0,d.jsx)(`option`,{value:`active`,children:`فعال`}),(0,d.jsx)(`option`,{value:`not-seen`,children:`دیده‌نشده`}),(0,d.jsx)(`option`,{value:`possibly-removed`,children:`احتمال حذف`}),(0,d.jsx)(`option`,{value:`removed`,children:`حذف‌شده`})]}),(0,d.jsxs)(_,{id:`scenario-filter`,label:`سناریوی مرتب‌سازی`,value:D,onChange:O,children:[(0,d.jsx)(`option`,{value:`all`,children:`امتیاز اصلی بازار`}),ae.map(e=>(0,d.jsx)(`option`,{value:e.scenarioId,children:e.name},e.scenarioId))]}),(0,d.jsx)(`p`,{className:`scenario-filter-note`,children:D===`all`?`فیلتر امتیاز بر اساس آخرین مدل فعال بازار اعمال می‌شود.`:`نتایج با امتیاز سناریوی انتخاب‌شده دوباره محاسبه و از بیشترین امتیاز مرتب می‌شوند.`}),y.length>0&&(0,d.jsx)(`div`,{className:`listing-filter-chips`,"aria-label":`محله‌های انتخاب‌شده`,children:y.map(e=>(0,d.jsxs)(`button`,{type:`button`,onClick:()=>b(t=>t.filter(t=>t!==e)),children:[e,(0,d.jsx)(`span`,{"aria-hidden":`true`,children:`×`})]},e))}),(0,d.jsxs)(`details`,{className:`listing-filters__advanced`,defaultOpen:we>0,children:[(0,d.jsxs)(`summary`,{children:[(0,d.jsx)(`span`,{children:`فیلترهای بیشتر`}),we>0&&(0,d.jsx)(`span`,{className:`listing-filters__count`,children:a(we)}),(0,d.jsx)(`span`,{className:`listing-filters__chevron`,"aria-hidden":`true`,children:(0,d.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.9`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,d.jsx)(`path`,{d:`m6 9 6 6 6-6`})})})]}),(0,d.jsxs)(`div`,{className:`listing-filters__advanced-body`,children:[(0,d.jsxs)(_,{id:`readiness-filter`,label:`پوشش داده`,value:C,onChange:re,children:[(0,d.jsx)(`option`,{value:`all`,children:`همه وضعیت‌ها`}),(0,d.jsx)(`option`,{value:`scoring-ready`,children:`آماده امتیازدهی`}),(0,d.jsx)(`option`,{value:`history-only`,children:`فقط سابقه`})]}),(0,d.jsxs)(_,{id:`advertiser-filter`,label:`نوع آگهی‌دهنده`,value:T,onChange:E,children:[(0,d.jsx)(`option`,{value:`all`,children:`همه آگهی‌دهندگان`}),(0,d.jsx)(`option`,{value:`personal`,children:`فایل شخصی`}),(0,d.jsx)(`option`,{value:`real-estate-business`,children:`مشاور املاک`}),(0,d.jsx)(`option`,{value:`unknown`,children:`نامشخص`})]}),(0,d.jsxs)(`div`,{className:`listing-range-card`,children:[(0,d.jsx)(`strong`,{children:D===`all`?`امتیاز اصلی بازار`:`امتیاز سناریوی انتخاب‌شده`}),(0,d.jsxs)(`label`,{children:[`از`,(0,d.jsx)(`input`,{inputMode:`numeric`,min:`0`,max:`100`,value:W,onChange:e=>G(e.target.value),placeholder:`۰`})]}),(0,d.jsxs)(`label`,{children:[`تا`,(0,d.jsx)(`input`,{inputMode:`numeric`,min:`0`,max:`100`,value:K,onChange:e=>fe(e.target.value),placeholder:`۱۰۰`})]})]}),(0,d.jsxs)(_,{id:`score-band-filter`,label:`رده امتیاز`,value:X,onChange:me,children:[(0,d.jsx)(`option`,{value:`all`,children:`همه رده‌ها`}),(0,d.jsx)(`option`,{value:`strong-value`,children:`ارزش قوی`}),(0,d.jsx)(`option`,{value:`promising`,children:`امیدبخش`}),(0,d.jsx)(`option`,{value:`fair`,children:`منصفانه`}),(0,d.jsx)(`option`,{value:`weak-value`,children:`ضعیف`})]}),(0,d.jsxs)(`label`,{className:`listing-filter`,children:[(0,d.jsx)(`span`,{children:`حداقل اطمینان`}),(0,d.jsx)(`input`,{inputMode:`numeric`,min:`0`,max:`100`,value:q,onChange:e=>pe(e.target.value),placeholder:`مثلاً ۶۰`})]}),(0,d.jsxs)(`label`,{className:`listing-filter`,children:[(0,d.jsx)(`span`,{children:`حداکثر ریسک`}),(0,d.jsx)(`input`,{inputMode:`numeric`,min:`0`,max:`100`,value:J,onChange:e=>Y(e.target.value),placeholder:`مثلاً ۳۰`})]}),(0,d.jsxs)(`div`,{className:`listing-range-card`,children:[(0,d.jsx)(`strong`,{children:`قیمت کل`}),(0,d.jsxs)(`label`,{children:[`از`,(0,d.jsx)(`input`,{inputMode:`numeric`,value:A,onChange:e=>ue(e.target.value),placeholder:`حداقل تومان`})]}),(0,d.jsxs)(`label`,{children:[`تا`,(0,d.jsx)(`input`,{inputMode:`numeric`,value:j,onChange:e=>de(e.target.value),placeholder:`حداکثر تومان`})]})]}),(0,d.jsxs)(`div`,{className:`listing-range-card`,children:[(0,d.jsx)(`strong`,{children:`قیمت هر متر`}),(0,d.jsxs)(`label`,{children:[`از`,(0,d.jsx)(`input`,{inputMode:`numeric`,value:M,onChange:e=>N(e.target.value),placeholder:`حداقل`})]}),(0,d.jsxs)(`label`,{children:[`تا`,(0,d.jsx)(`input`,{inputMode:`numeric`,value:P,onChange:e=>F(e.target.value),placeholder:`حداکثر`})]})]}),(0,d.jsxs)(`div`,{className:`listing-range-card`,children:[(0,d.jsx)(`strong`,{children:`متراژ`}),(0,d.jsxs)(`label`,{children:[`از`,(0,d.jsx)(`input`,{inputMode:`numeric`,value:I,onChange:e=>L(e.target.value),placeholder:`حداقل متر`})]}),(0,d.jsxs)(`label`,{children:[`تا`,(0,d.jsx)(`input`,{inputMode:`numeric`,value:R,onChange:e=>z(e.target.value),placeholder:`حداکثر متر`})]})]}),(0,d.jsxs)(`label`,{className:`listing-filter`,children:[(0,d.jsx)(`span`,{children:`حداقل اتاق`}),(0,d.jsx)(`input`,{inputMode:`numeric`,value:B,onChange:e=>V(e.target.value),placeholder:`مثلاً ۲`})]}),(0,d.jsxs)(`label`,{className:`listing-filter`,children:[(0,d.jsx)(`span`,{children:`حداقل سال ساخت`}),(0,d.jsx)(`input`,{inputMode:`numeric`,value:H,onChange:e=>U(e.target.value),placeholder:`مثلاً ۱۳۹۵`})]}),(0,d.jsxs)(`fieldset`,{className:`amenity-filter`,children:[(0,d.jsx)(`legend`,{children:`امکانات الزامی`}),[[`elevator`,`آسانسور`],[`parking`,`پارکینگ`],[`storage`,`انباری`],[`balcony`,`بالکن`]].map(([e,t])=>(0,d.jsx)(`button`,{type:`button`,"aria-pressed":Z.includes(e),className:Z.includes(e)?`is-active`:``,onClick:()=>Se(e),children:t},e))]})]})]})]}),(0,d.jsx)(`div`,{id:`catalog-results`,className:`listing-results`,role:`status`,"aria-live":`polite`,children:i?`در حال دریافت نتایج`:f?`دریافت نتایج ناموفق بود`:k>0?`نمایش ${a($*h+1)} تا ${a($*h+ve.length)} از ${a(k)} آگهی منطبق`:`آگهی منطبقی پیدا نشد`}),i&&(0,d.jsx)(`div`,{className:`location-state`,children:`در حال بارگذاری آگهی‌ها…`}),f&&(0,d.jsxs)(`div`,{className:`location-state location-state--error`,children:[`بارگذاری ناموفق بود: `,f]}),!i&&!f&&(0,d.jsxs)(`section`,{className:`catalog-grid`,"aria-label":`نتایج آگهی‌ها`,children:[ve.map(e=>(0,d.jsx)(ne,{listing:e},e.token)),!ve.length&&(0,d.jsxs)(`div`,{className:`catalog-empty`,children:[(0,d.jsx)(n,{name:`database`,size:32}),(0,d.jsx)(`h2`,{children:`آگهی منطبقی پیدا نشد`}),(0,d.jsx)(`p`,{children:`فیلترها را تغییر دهید یا پاک کنید.`}),(0,d.jsx)(`button`,{type:`button`,onClick:xe,children:`نمایش آگهی‌های فعال`})]})]}),!f&&ye>1&&(0,d.jsxs)(`nav`,{className:`catalog-pagination`,"aria-label":`صفحه‌بندی آگهی‌ها`,children:[(0,d.jsx)(`button`,{type:`button`,disabled:i||$===0,onClick:()=>be($-1),children:`صفحه قبل`}),(0,d.jsxs)(`span`,{children:[`صفحه `,a($+1),` از `,a(ye)]}),(0,d.jsx)(`button`,{type:`button`,disabled:i||$+1>=ye,onClick:()=>be($+1),children:`صفحه بعد`})]})]}),(0,d.jsx)(l,{})]})}export{v as default};