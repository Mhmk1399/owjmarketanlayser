"use client";

/**
 * OWJ Scoring Workshop — presentation and responsive UX update.
 * Original scoring configuration, API requests, persistence, search and sort
 * logic are preserved. Mobile tab switches affect presentation ONLY.
 * Desktop always shows the settings sidebar and live results simultaneously.
 * All page CSS is embedded below; no external stylesheet is required.
 */

import { useEffect, useMemo, useState } from "react";

import {
  AppFooter,
  AppHeader,
  ErrorPage,
  formatMoney,
  formatNumber,
  formatTime,
  Icon,
  LoadingPage,
  T,
} from "./shared.jsx";

import {
  calculateScenario,
  DEFAULT_SCORING_CONFIG,
  SCORING_PRESETS,
} from "./scoringWorkshopModel.js";

import { SortableTh, TableTools, useTableView } from "./tableTools.jsx";

const WORKSHOP_CSS = `
/* All workshop styling is local to the workshop JSX file. */
.workshop-page {
  --wk-ink: #202127;
  --wk-muted: #636a75;
  --wk-faint: #777e89;
  --wk-border: #e8ebef;
  --wk-soft: #f7f8fa;
  --wk-primary: #66308d;
  --wk-teal: #087e73;
  background: #f7f8fa;
  color: var(--wk-ink);
  direction: rtl;
  min-height: 100vh;
  overflow-x: clip;
  text-align: right;
  font: 400 14px/1.8 var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.workshop-page, .workshop-page *, .workshop-page *::before, .workshop-page *::after {box-sizing:border-box;}
.workshop-page :is(h1,h2,h3,h4,p,figure,dl) {margin:0;}
.workshop-page :is(button,input,select,textarea) {font:inherit;}
.workshop-page :is(button,a,input,textarea,select,summary) { -webkit-tap-highlight-color: transparent; }
.workshop-page :is(button,a,input,textarea,select,summary):focus-visible {
  outline: 3px solid rgba(102,48,141,.46); outline-offset: 3px;
}
.workshop-page a { color: inherit; text-decoration: none; }
.workshop-main { max-width: 1480px; margin: 0 auto; padding: 29px 27px 90px; min-width: 0; }
.workshop-hero {
  background: #fff; border: 1px solid var(--wk-border); border-radius: 23px;
  padding: 34px 37px; margin-bottom: 24px; position: relative; overflow: hidden;
  display: grid; grid-template-columns: minmax(0,1fr) minmax(245px,310px);
  gap: 32px; align-items: center;
  box-shadow: 0 5px 22px rgba(31,35,45,.024);
}
.workshop-hero::before {content:"";position:absolute;inset:0 0 auto; height:3px;background:linear-gradient(90deg,#eee8f3 0%,#66308d 65%,#01ae9b 100%);}
.workshop-hero > div {min-width:0;}
.workshop-hero > div > span {
  display:inline-flex;align-items:center;gap:8px; padding:5px 11px;
  border-radius:100px;background:#f0faf7;color:var(--wk-teal);
  font-size:12px;font-weight:800;margin-bottom:14px;
}
.workshop-hero > div > span svg {color:#087e73;}
.workshop-hero h1 {font-size:clamp(24px,2.5vw,35px);letter-spacing:-.6px;line-height:1.5;font-weight:900;margin-bottom:10px;}
.workshop-hero p {font-size:13px;line-height:2.05;color:var(--wk-muted);max-width:700px;}
.workshop-hero aside {padding:19px 20px;background:#f8f9fb;border:1px solid #e9ebef;border-radius:17px;min-width:0;display:flex;flex-direction:column;gap:6px;}
.workshop-hero aside > span {font-size:12px;color:var(--wk-faint);font-weight:700;}
.workshop-hero aside > strong {font-size:16px;color:#2b2633;direction:ltr;unicode-bidi:plaintext;overflow-wrap:anywhere;text-align:right;line-height:1.5;font-weight:850;}
.workshop-hero aside > small {color:var(--wk-muted);font-size:12px;line-height:1.8;}
.workshop-layout {display:grid;grid-template-columns:minmax(305px,360px) minmax(0,1fr);align-items:start;gap:21px;min-width:0;}
.workshop-sidebar,.workshop-results {min-width:0;display:flex;flex-direction:column;gap:18px;}
.workshop-panel {
  min-width:0; width:100%; border:1px solid var(--wk-border); border-radius:19px;
  background:#fff;padding:22px 23px;box-shadow:0 3px 15px rgba(31,35,45,.021);
}
.workshop-panel__head, .workshop-table-head {display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:9px 14px;margin-bottom:17px;}
.workshop-panel__head > div, .workshop-table-head > div {min-width:0;flex:1;}
.workshop-panel__head span, .workshop-table-head span {
  color:var(--wk-teal);display:block;font-weight:750;font-size:11px;letter-spacing:0;margin-bottom:5px;
}
.workshop-panel__head h2, .workshop-table-head h2 {font-size:16px;line-height:1.55;font-weight:850;color:#202127;}
.workshop-panel__head > small, .workshop-distribution .workshop-panel__head > small {color:var(--wk-faint);font-size:11px;font-weight:600;}
.workshop-panel__head > b {flex:none;border-radius:9px;padding:5px 10px;font-size:12px;font-weight:850;line-height:1.6;}
.workshop-panel__head > b.is-valid {background:#eaf7f0;color:#176b55;}
.workshop-panel__head > b.is-invalid {background:#fff0f1;color:#b6404b;}
.workshop-help {font-size:12px;line-height:2;color:var(--wk-muted);margin-bottom:17px !important;}
.workshop-accordion {padding:0;overflow:hidden;}
.workshop-accordion > summary {list-style:none;cursor:pointer;user-select:none;margin:0;padding:20px 22px;align-items:center;min-height:75px;}
.workshop-accordion > summary::-webkit-details-marker {display:none;}
.workshop-accordion > summary:after {
  content:"";width:10px;height:10px;flex:0 0 10px;
  border-left:2px solid #818894;border-bottom:2px solid #818894;
  transform:rotate(-45deg);transition:transform .2s ease; margin:0 4px 5px 1px;
}
.workshop-accordion[open] > summary {border-bottom:1px solid #eef0f3;}
.workshop-accordion[open] > summary:after {transform:rotate(135deg);margin-top:7px;margin-bottom:0;}
.workshop-accordion > .workshop-help {margin:15px 22px !important;}
.workshop-accordion > .workshop-control {margin:0 19px 12px;}
.workshop-accordion > .workshop-control:last-child {margin-bottom:20px;}
.workshop-panel__head > button {border:1px solid #e3e6eb;background:#fff;color:#5b626e;border-radius:10px;padding:8px 11px;min-height:40px;cursor:pointer;font-size:11px;font-weight:700;transition:border-color .15s,color .15s,background .15s;}
.workshop-panel__head > button:hover {color:#66308d;background:#faf7fc;border-color:#d9c7e6;}
.workshop-presets {display:flex;flex-wrap:wrap;gap:8px;}
.workshop-presets button {
  min-height:43px;border:1px solid #e3e6eb;border-radius:11px;
  background:#f8f9fa;padding:10px 12px;color:#343941;cursor:pointer;font-size:12px;font-weight:750;
  transition:background .17s,border-color .17s,color .17s;
}
.workshop-presets button:hover {background:#f3edf8;border-color:#d8c3e4;color:#66308d;}
.workshop-control {padding:15px;border:1px solid #edf0f2;background:#fafbfc;border-radius:13px;margin-bottom:12px;min-width:0;}
.workshop-control:last-child {margin-bottom:0;}
.workshop-control__head {display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:5px;}
.workshop-control__head label {font-weight:850;color:#282b33;font-size:12px;line-height:1.7;min-width:0;}
.workshop-control__head output {font-weight:850;font-size:12px;color:#66308d;background:#f3ecf8;padding:4px 10px;border-radius:9px;white-space:nowrap;}
.workshop-control > p {font-size:12px;line-height:1.95;color:#777d88;margin-bottom:10px;}
.workshop-control__inputs {display:flex;align-items:center;gap:14px;min-width:0;}
.workshop-control__inputs input[type=range] {
  flex:1;min-width:0;min-height:40px;cursor:pointer;border:0;background:transparent;
  appearance:none;-webkit-appearance:none;direction:rtl;
  background-image:linear-gradient(to left,#66308d var(--wk-fill),#e2e4ea var(--wk-fill));
  background-repeat:no-repeat;background-size:100% 6px;background-position:center;
}
.workshop-control__inputs input[type=range]::-webkit-slider-thumb {
  -webkit-appearance:none;appearance:none;width:21px;height:21px;border-radius:50%;
  background:#fff;border:5px solid #66308d;box-shadow:0 2px 7px rgba(39,22,51,.2);
  cursor:grab;
}
.workshop-control__inputs input[type=range]::-moz-range-thumb {
  width:12px;height:12px;border-radius:50%;background:#fff;
  border:5px solid #66308d;box-shadow:0 2px 7px rgba(39,22,51,.2);
  cursor:grab;
}
.workshop-control__inputs input[type=number] {
  width:80px;min-width:70px;max-width:90px;height:44px;padding:8px 9px;
  border:1px solid #dfe2e8;border-radius:10px;background:#fff;
  color:#292c35;text-align:center;direction:ltr;font-size:14px;font-weight:800;
  font-variant-numeric:tabular-nums;
}
.workshop-control__inputs input[type=number]:focus {border-color:#66308d;}
.scenario-save-form {border-color:#e4dce9;}
.scenario-save-form > label {display:flex;flex-direction:column;gap:7px;font-size:12px;font-weight:750;color:#343941;margin-bottom:13px;}
.scenario-save-form input,.scenario-save-form textarea {
  width:100%;border:1px solid #e1e4ea;border-radius:11px;
  min-height:48px;background:#fafbfc;padding:11px 12px;color:#252830;
  font-size:13px;font-weight:500;resize:vertical;
}
.scenario-save-form textarea {min-height:84px;}
.scenario-save-form :is(input,textarea)::placeholder {color:#989ca6;}
.workshop-copy {
  display:inline-flex;justify-content:center;align-items:center;text-align:center;
  width:100%;min-height:49px;border:1px solid #dedfe4;border-radius:12px;
  padding:11px 15px;background:#24262e;color:#fff;font-size:13px;font-weight:800;
  cursor:pointer;transition:background .18s,transform .18s,box-shadow .18s;
}
.workshop-copy:hover:not(:disabled) {background:#393b45;box-shadow:0 7px 16px rgba(22,25,33,.10);transform:translateY(-1px);}
.scenario-save-form > .workshop-copy {background:#66308d;border-color:#66308d;}
.scenario-save-form > .workshop-copy:hover:not(:disabled) {background:#56257c;}
.workshop-copy:disabled {opacity:.48;cursor:not-allowed;}
.scenario-save-status {color:#176b55;font-size:12px;line-height:1.9;margin-top:10px !important;overflow-wrap:anywhere;}
.scenario-save-status:empty {display:none;}
.saved-scenario-list {border-top:1px solid #eef0f2;margin-top:14px;padding-top:10px;display:flex;flex-direction:column;gap:8px;}
.saved-scenario-list article {display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;border:1px solid #eaedf0;border-radius:11px;min-width:0;background:#fcfcfd;}
.saved-scenario-list article button {background:transparent;border:0;padding:0;display:flex;flex-direction:column;align-items:flex-start;text-align:right;gap:2px;cursor:pointer;flex:1;min-width:0;}
.saved-scenario-list article button b {font-size:12px;overflow-wrap:anywhere;}
.saved-scenario-list article button small {font-size:10px;color:var(--wk-faint);}
.saved-scenario-list article a {flex:none;font-size:11px;color:#66308d;font-weight:800;}
.workshop-live {border:1px solid #d8f0e8;color:#126c5d;background:#edf9f5;padding:11px 13px;border-radius:11px;text-align:center;font-size:12px;font-weight:650;}
.workshop-warning {border-radius:14px;padding:14px 16px;color:#9d5025;background:#fff4e8;border:1px solid #fae4ca;font-size:12px;font-weight:750;}
.workshop-guide {border-color:#e3e9ed;}
.workshop-guide .workshop-panel__head {align-items:center;}
.workshop-guide .workshop-panel__head > strong {font-size:12px;color:#087e73;background:#e9f8f5;border-radius:8px;padding:5px 10px;white-space:nowrap;}
.workshop-guide__grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}
.workshop-guide__grid article {background:#f8f9fb;border:1px solid #eceef2;padding:14px;border-radius:12px;min-width:0;}
.workshop-guide__grid article b {display:block;color:#30353c;font-size:12px;font-weight:850;margin-bottom:3px;}
.workshop-guide__grid article p {color:#737983;font-size:11px;line-height:1.9;}
.workshop-stats {display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px;}
.workshop-stat {display:flex;flex-direction:column;min-width:0;gap:7px;border:1px solid #e9ebef;border-radius:16px;background:#fff;padding:17px 16px;position:relative;overflow:hidden;}
.workshop-stat:before {content:"";position:absolute;top:0;right:0;width:3px;height:100%;background:var(--workshop-accent);opacity:.8;}
.workshop-stat > span {font-size:11px;font-weight:750;color:#666d78;line-height:1.8;}
.workshop-stat > strong {font-size:clamp(19px,2.2vw,27px);font-weight:900;line-height:1.35;color:#202127;white-space:nowrap;}
.workshop-stat > small {font-size:11px;color:#7b818b;line-height:1.8;}
.workshop-distribution .workshop-panel__head {align-items:end;}
.workshop-histogram {width:100%;min-width:0;display:flex;align-items:flex-end;gap:7px;height:245px;padding:16px 9px 11px;border:1px solid #edf0f2;background:#f9fafb;border-radius:14px;overflow:hidden;}
.workshop-histogram__bin {display:flex;flex:1;flex-direction:column;justify-content:flex-end;align-items:center;gap:7px;min-width:0;height:100%;text-align:center;}
.workshop-histogram__bin > b {font-size:11px;color:#3a3b45;font-weight:800;line-height:1.4;white-space:nowrap;}
.workshop-histogram__bin > i {display:block;width:100%;min-height:3px;max-width:72px;border-radius:7px 7px 2px 2px;background:linear-gradient(0deg,#a4e5d9 0%,#01ae9b 95%);transition:height .2s ease;}
.workshop-histogram__bin > span {color:#717781;font-size:10px;line-height:1.45;min-height:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;}
.workshop-band-summary {display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:15px;}
.workshop-band-summary > span {display:flex;align-items:center;gap:6px;flex-wrap:wrap;min-width:0;border:1px solid #ebeef0;border-radius:10px;padding:8px 10px;font-size:11px;color:#676e78;background:#fff;}
.workshop-band-summary i {width:8px;height:8px;flex:none;border-radius:50%;}
.workshop-band-summary b {font-weight:850;font-size:12px;color:#252830;margin-right:auto;}
.neighborhood-score-grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;max-height:520px;overflow:auto;overscroll-behavior:contain;padding:1px 3px 3px;scrollbar-color:#d5d9df transparent;}
.neighborhood-score-grid label {border:1px solid #e9ebef;background:#fafbfc;border-radius:13px;display:flex;gap:12px;align-items:center;justify-content:space-between;padding:10px 13px;min-width:0;}
.neighborhood-score-grid label > span {display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;}
.neighborhood-score-grid label b {font-weight:800;color:#282c35;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.neighborhood-score-grid label small {color:#77808a;font-size:10px;line-height:1.7;overflow-wrap:anywhere;}
.neighborhood-score-grid input {width:65px;height:40px;flex:none;text-align:center;direction:ltr;border-radius:9px;border:1px solid #dfe2e8;background:#fff;font-weight:800;color:#2c3037;font-size:13px;}
.workshop-table-head {margin-bottom:14px;}
.workshop-table-wrap {width:100%;max-width:100%;overflow:auto;overscroll-behavior-x:contain;border:1px solid #e9ebee;border-radius:12px;scrollbar-color:#d6dbe2 transparent;}
.workshop-table {width:100%;border-collapse:separate;border-spacing:0;min-width:1130px;font-size:12px;line-height:1.65;}
.workshop-table th {text-align:right;background:#f7f8fa;color:#686f79;border-bottom:1px solid #e7e9ed;padding:8px 12px;white-space:nowrap;font-size:11px;font-weight:800;}
.workshop-table td {padding:13px 12px;border-bottom:1px solid #f0f1f4;color:#565e69;vertical-align:middle;white-space:nowrap;}
.workshop-table tr:last-child td {border-bottom:0;}
.workshop-table tbody tr:hover td {background:#faf9fc;}
.workshop-table th:first-child, .workshop-table td:first-child {position:sticky;right:0;z-index:1;box-shadow:-1px 0 0 #ebeef1;}
.workshop-table td:first-child {background:#fff;}
.workshop-table th:first-child {z-index:3;}
.workshop-table td:nth-child(2) {min-width:220px;max-width:285px;}
.workshop-table td:nth-child(2) a {display:flex;flex-direction:column;gap:4px;min-width:0;}
.workshop-table td:nth-child(2) b {font-weight:850;color:#282b35;max-width:260px;overflow:hidden;text-overflow:ellipsis;}
.workshop-table td:nth-child(2) small {font-size:11px;color:#77808b;max-width:250px;overflow:hidden;text-overflow:ellipsis;}
.workshop-table td:first-child strong {color:#66308d;background:#f3edf8;border-radius:8px;padding:4px 8px;font-weight:900;}
.workshop-score {font-size:16px;font-weight:900;}
.workshop-table td:nth-last-child(2) > small {display:block;font-size:10px;color:#757c86;margin-top:3px;}
.workshop-table td.movement-up {color:#14785f;font-weight:850;}
.workshop-table td.movement-down {color:#b6404b;font-weight:850;}
.property-breakdown {position:relative;}
.property-breakdown summary {list-style:none;cursor:pointer;display:inline-flex;align-items:center;gap:7px;padding:4px 10px;border-radius:8px;border:1px solid #e2e6ec;color:#454c57;background:#f8f9fb;font-weight:800;}
.property-breakdown summary::-webkit-details-marker {display:none;}
.property-breakdown summary::after {content:"⌄";font-size:14px;color:#747983;}
.property-breakdown[open] summary {border-color:#e2d3ed;background:#f5eef9;color:#66308d;}
.property-breakdown > div {padding:12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;background:#fff;border:1px solid #e7e8ed;border-radius:12px;box-shadow:0 10px 25px rgba(23,28,37,.07);min-width:245px;margin-top:7px;white-space:normal;}
.property-breakdown > div span {font-size:11px;color:#656b75;line-height:1.8;}
.property-breakdown > div b {color:#252831;}
.workshop-table-note {font-size:11px;color:#747c85;line-height:1.9;margin-top:12px !important;}
.workshop-mobile-tabs, .workshop-mobile-pulse, .workshop-mobile-sort, .workshop-mobile-ranking {display:none;}
/* The desktop workstation is ALWAYS a two-column workspace.
   The settings rail remains visible on the right and scrolls independently. */
.workshop-sidebar-heading {
  border:1px solid #e8e0ee; border-radius:16px; padding:16px 17px;
  background:linear-gradient(115deg,#fbf8fd 0%,#fff 65%);
  display:flex;flex-direction:column;gap:3px;
}
.workshop-sidebar-heading span {color:#66308d;font-weight:850;font-size:11px;}
.workshop-sidebar-heading h2 {font-size:17px;font-weight:900;color:#24252b;line-height:1.5;}
.workshop-sidebar-heading p {color:#717781;font-size:11px;line-height:1.95;}
.workshop-sidebar-heading__action {
  display:inline-flex;align-self:flex-start;align-items:center;gap:6px;
  background:#66308d;color:#fff!important;border-radius:10px;padding:6px 12px;
  font-size:11px;font-weight:800;margin-top:8px;min-height:36px;
  transition:background .18s,transform .18s;
}
.workshop-sidebar-heading__action:hover {background:#512272;transform:translateY(-1px);}
.workshop-sidebar .workshop-panel {box-shadow:none;border-color:#e8eaf0;}
.workshop-sidebar .workshop-panel:not(.workshop-accordion):not(.scenario-save-form) {background:#fff;}
.workshop-sidebar .workshop-accordion {background:#fff;transition:border-color .16s,box-shadow .16s;}
.workshop-sidebar .workshop-accordion:hover {border-color:#d9d2e0;}
.workshop-sidebar .workshop-accordion[open] {border-color:#e3deea;box-shadow:0 3px 14px rgba(37,26,53,.025);}
.workshop-sidebar .workshop-accordion > summary {background:#fff;}
.workshop-sidebar .workshop-accordion > summary:hover {background:#fcfafe;}
.workshop-sidebar .workshop-accordion[open] > summary {background:#fbfafc;}
.workshop-control {transition:border-color .18s,background .18s;}
.workshop-control:focus-within {border-color:#d9c2ea;background:#fff;}
.workshop-copy:focus-visible,.workshop-control input:focus-visible,.workshop-mobile-tabs button:focus-visible {outline:3px solid rgba(102,48,141,.3);outline-offset:3px;}
@media (min-width:981px) {
  .workshop-layout {grid-template-columns:minmax(305px,360px) minmax(0,1fr);gap:24px;align-items:start;}
  .workshop-sidebar {
    position:sticky;top:86px;align-self:start;
    height:max-content;max-height:calc(100vh - 101px);max-height:calc(100dvh - 101px);
    overflow-x:hidden;overflow-y:auto;overscroll-behavior-y:contain;
    scroll-behavior:smooth;scrollbar-width:thin;scrollbar-color:#c9c5cf transparent;
    padding:0 4px 16px 2px;gap:12px;
  }
  .workshop-sidebar > * {flex-shrink:0;}
  .workshop-sidebar::-webkit-scrollbar {width:5px;}
  .workshop-sidebar::-webkit-scrollbar-thumb {background:#d4cbdc;border-radius:99px;}
  .workshop-sidebar-heading {position:sticky;top:0;z-index:4;box-shadow:0 6px 16px rgba(249,247,251,.95);}
  .workshop-sidebar .workshop-panel {border-radius:15px;}
  .workshop-sidebar .workshop-panel__head h2 {font-size:14px;}
  .workshop-sidebar .workshop-control {padding:13px 12px;}
  .workshop-sidebar .workshop-accordion > summary {padding:16px 15px;min-height:67px;}
  .workshop-sidebar .workshop-accordion > .workshop-help {margin:13px 15px!important;}
  .workshop-sidebar .workshop-accordion > .workshop-control {margin-inline:11px;}
  .workshop-sidebar .workshop-accordion > .workshop-control:last-child {margin-bottom:12px;}
  .workshop-sidebar .workshop-control__inputs {gap:8px;}
  .workshop-sidebar .workshop-control__inputs input[type=number] {width:70px;min-width:65px;}
}
@media (max-width:1250px) {
  .workshop-layout {grid-template-columns:minmax(295px,345px) minmax(0,1fr);gap:17px;}
  .workshop-main {padding-inline:20px;}
  .workshop-panel {padding:20px;}
  .workshop-accordion {padding:0;}
  .workshop-stats {grid-template-columns:repeat(2,minmax(0,1fr));}
  .workshop-band-summary {grid-template-columns:repeat(2,minmax(0,1fr));}
}
@media (max-width:980px) {
  .workshop-hero {padding:27px;gap:18px;margin-bottom:14px;}
  .workshop-layout {display:block;}
  .workshop-page .workshop-mobile-tabs {display:grid;grid-template-columns:1fr 1fr;gap:6px;border-radius:13px;background:#ecedf1;padding:5px;margin:0 0 10px;}
  .workshop-mobile-tabs button {border:0;border-radius:10px;min-height:45px;background:transparent;color:#636a75;font-size:13px;font-weight:800;cursor:pointer;}
  .workshop-mobile-tabs button.is-active {background:#fff;color:#66308d;box-shadow:0 2px 9px rgba(24,30,43,.055);}
  .workshop-mobile-tabs button svg {vertical-align:-3px;margin-left:5px;}
  .workshop-mobile-tabs button .wk-tab-count {font-size:10px;padding:2px 6px;background:#eef0f3;color:#737985;border-radius:7px;margin-right:5px;}
  .workshop-page .workshop-mobile-pulse {display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:0 0 15px;padding:10px 15px;background:#fff;border:1px solid #e8ebef;border-radius:12px;}
  .workshop-mobile-pulse span {font-size:11px;font-weight:700;color:#68717a;}
  .workshop-mobile-pulse strong {font-size:17px;font-weight:900;color:#24242c;}
  .workshop-mobile-pulse small {font-size:11px;color:#087e73;font-weight:800;}
  .workshop-layout[data-mobile-tab="settings"] .workshop-results {display:none;}
  .workshop-layout[data-mobile-tab="results"] .workshop-sidebar {display:none;}
  .workshop-sidebar, .workshop-results {gap:13px;}
  .workshop-panel {padding:21px;}
  .workshop-accordion {padding:0;}
  .workshop-stats {grid-template-columns:repeat(4,minmax(0,1fr));}
}
@media (max-width:700px) {
  .workshop-main {padding:17px 14px 72px;}
  .workshop-hero {padding:23px 21px;grid-template-columns:1fr;gap:17px;border-radius:18px;}
  .workshop-hero h1 {font-size:24px;line-height:1.5;}
  .workshop-hero p {font-size:13px;line-height:1.95;}
  .workshop-hero aside {flex-direction:row;flex-wrap:wrap;align-items:center;gap:7px 13px;padding:11px 13px;border-radius:12px;}
  .workshop-hero aside > strong {font-size:12px;}
  .workshop-hero aside > small {flex:1 1 100%;font-size:11px;}
  .workshop-panel {border-radius:15px;padding:19px 16px;}
  .workshop-panel__head h2, .workshop-table-head h2 {font-size:15px;}
  .workshop-accordion {padding:0;}
  .workshop-accordion > summary {padding:17px 16px;min-height:70px;}
  .workshop-accordion > .workshop-help {margin:13px 15px !important;}
  .workshop-accordion > .workshop-control {margin-inline:12px;}
  .workshop-stats {grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;}
  .workshop-stat {padding:14px 12px;gap:6px;border-radius:13px;}
  .workshop-stat > strong {font-size:23px;}
  .workshop-guide__grid {gap:8px;}
  .workshop-guide__grid article {padding:10px;}
  .workshop-guide__grid article b {font-size:12px;}
  .workshop-guide__grid article p {font-size:11px;}
  .workshop-histogram {height:218px;gap:4px;padding:10px 7px;}
  .workshop-histogram__bin {gap:5px;}
  .workshop-histogram__bin b,.workshop-histogram__bin span {font-size:9px;}
  .workshop-band-summary {grid-template-columns:repeat(2,minmax(0,1fr));}
  .neighborhood-score-grid {grid-template-columns:1fr;max-height:470px;}
  .workshop-table-wrap {display:none;}
  .workshop-page .workshop-mobile-sort {display:flex;align-items:center;gap:9px;flex-wrap:wrap;padding-bottom:10px;}
  .workshop-mobile-sort label {display:flex;align-items:center;gap:9px;flex:1;min-width:0;font-size:11px;font-weight:750;color:#676e78;}
  .workshop-mobile-sort select {flex:1;min-width:0;min-height:44px;border:1px solid #e0e3e8;border-radius:10px;padding:8px 10px;background:#fff;color:#2d3137;font-size:12px;font-weight:750;}
  .workshop-mobile-sort button {border:1px solid #e0e3e8;background:#f8f9fa;color:#42474f;border-radius:10px;min-height:44px;padding:8px 11px;cursor:pointer;font-size:12px;font-weight:800;}
  .workshop-page .workshop-mobile-ranking {display:flex;flex-direction:column;gap:10px;}
  .wk-rank-card {padding:14px;border:1px solid #e9ebef;border-radius:13px;background:#fcfcfd;min-width:0;}
  .wk-rank-card__top {display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:11px;min-width:0;}
  .wk-rank-card__identity {min-width:0;flex:1;}
  .wk-rank-card__identity > a {display:block;color:#24262d;font-size:13px;font-weight:850;line-height:1.9;overflow-wrap:anywhere;}
  .wk-rank-card__identity > small {display:block;color:#757d85;font-size:11px;line-height:1.8;}
  .wk-rank-card__rank {border-radius:9px;background:#f4eef8;color:#66308d;padding:5px 9px;font-size:13px;font-weight:900;white-space:nowrap;}
  .wk-rank-card__score {display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 12px;border:1px solid #e9eef0;background:#f5f8f8;border-radius:10px;margin-bottom:10px;}
  .wk-rank-card__score > span {display:flex;flex-direction:column;gap:2px;font-size:11px;color:#747a82;}
  .wk-rank-card__score strong {font-size:20px;font-weight:900;line-height:1.4;}
  .wk-rank-card__score small {font-size:10px;color:#606a74;line-height:1.4;}
  .wk-rank-card__delta {font-size:12px;font-weight:850;white-space:nowrap;text-align:left;}
  .wk-rank-card__delta.is-up {color:#14785f;}
  .wk-rank-card__delta.is-down {color:#b6404b;}
  .wk-rank-card__metrics {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;}
  .wk-rank-card__metrics > div {display:flex;flex-direction:column;gap:1px;min-width:0;border:1px solid #e9ebef;border-radius:9px;padding:8px;background:#fff;}
  .wk-rank-card__metrics span {font-size:11px;color:#7c818a;}
  .wk-rank-card__metrics b {font-size:13px;color:#30343c;font-weight:850;}
  .wk-rank-card__breakdown {border:1px solid #e8e9ef;border-radius:10px;margin-top:10px;background:#fff;}
  .wk-rank-card__breakdown > summary {cursor:pointer;list-style:none;min-height:42px;padding:9px 12px;color:#66308d;font-size:11px;font-weight:800;}
  .wk-rank-card__breakdown > summary::-webkit-details-marker {display:none;}
  .wk-rank-card__breakdown > summary:before {content:"+";display:inline-block;margin-left:7px;font-size:15px;}
  .wk-rank-card__breakdown[open] > summary:before {content:"−";}
  .wk-rank-card__breakdown > div {border-top:1px solid #edf0f2;padding:9px 12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px 10px;}
  .wk-rank-card__breakdown span {font-size:11px;color:#69717a;}
  .wk-rank-card__breakdown b {font-weight:850;color:#24262d;}
}
@media (max-width:370px) {
  .workshop-main {padding-inline:10px;}
  .workshop-panel {padding-inline:13px;}
  .workshop-accordion {padding:0;}
  .workshop-guide__grid {grid-template-columns:1fr;}
  .workshop-control__inputs {gap:8px;}
  .workshop-control__inputs input[type=number] {width:70px;min-width:66px;}
  .workshop-hero {padding-inline:17px;}
}
@media (prefers-reduced-motion: reduce) {
  .workshop-page *, .workshop-page *:before, .workshop-page *:after {transition:none !important;animation:none !important;scroll-behavior:auto !important;}
}
`;

const BAND_LABELS = {
  "strong-value": "فرصت خرید بسیار خوب",
  promising: "ارزش بررسی دارد",
  fair: "قیمت نسبتاً منصفانه",
  "weak-value": "ارزش خرید پایین",
};
const BAND_COLORS = {
  "strong-value": T.green,
  promising: T.secondaryDark,
  fair: T.orange,
  "weak-value": T.red,
};
const FACTOR_LABELS = {
  elevator: "آسانسور",
  parking: "پارکینگ",
  storage: "انباری",
  balcony: "بالکن",
  floor: "طبقه",
  noElevatorHighFloor: "طبقه بالا بدون آسانسور",
  topFloor: "طبقه آخر",
  age: "سن بنا",
  newBuild: "نوساز بودن",
  unitDensity: "تعداد واحد در طبقه",
  area: "متراژ",
  rooms: "تعداد اتاق",
};
// Display-only conversion: business data and persisted values are untouched.

function persianDigits(value) {
  return String(value ?? "").replace(
    /[0-9]/g,
    (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)],
  );
}

function Control({
  id,
  label,
  detail,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "٪",
  signed = false,
}) {
  const shownValue = `${signed && value > 0 ? "+" : ""}${formatNumber(value)}${unit ? ` ${unit}` : ""}`;
  const visualFill =
    max === min
      ? 0
      : Math.max(0, Math.min(100, ((Number(value) - min) / (max - min)) * 100));
  return (
    <div className="workshop-control">
      <div className="workshop-control__head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id} aria-live="off">
          {shownValue}
        </output>
      </div>
      <p>{detail}</p>
      <div className="workshop-control__inputs">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          style={{ "--wk-fill": `${visualFill}%` }}
          aria-valuetext={shownValue}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <input
          aria-label={`${label}`}
          type="number"
          inputMode="decimal"
          lang="fa"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) =>
            onChange(Math.max(min, Math.min(max, Number(event.target.value))))
          }
        />
      </div>
    </div>
  );
}

function MiniStat({ label, value, detail, tone = T.secondary }) {
  return (
    <article className="workshop-stat" style={{ "--workshop-accent": tone }}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function Distribution({ histogram }) {
  const maximum = Math.max(1, ...histogram.map((item) => item.count));
  return (
    <div
      className="workshop-histogram"
      aria-label="پراکندگی امتیازهای تنظیم آزمایشی"
    >
      {histogram.map((item) => (
        <div key={item.label} className="workshop-histogram__bin">
          <b>{formatNumber(item.count)}</b>
          <i
            style={{ height: `${Math.max(2, (item.count / maximum) * 100)}%` }}
          />
          <span dir="ltr">{persianDigits(item.label)}</span>
        </div>
      ))}
    </div>
  );
}

export default function ScoringWorkshopPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [config, setConfig] = useState(() => {
    try {
      return {
        ...DEFAULT_SCORING_CONFIG,
        ...JSON.parse(localStorage.getItem("owj-scoring-workshop") || "{}"),
      };
    } catch {
      return { ...DEFAULT_SCORING_CONFIG };
    }
  });
  const [copyStatus, setCopyStatus] = useState("");
  const [scenarioName, setScenarioName] = useState("");
  const [scenarioDescription, setScenarioDescription] = useState("");
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [mobileTab, setMobileTab] = useState("settings");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/score-workshop-data", { signal: controller.signal })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(
              new Error(`Server returned HTTP ${response.status}`),
            ),
      )
      .then(setData)
      .catch((caught) => {
        if (caught.name !== "AbortError") setError(caught.message);
      });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    fetch("/scoring-scenarios", { headers: { accept: "application/json" } })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(new Error(`HTTP ${response.status}`)),
      )
      .then((payload) => setSavedScenarios(payload.scenarios || []))
      .catch(() => {});
  }, []);
  useEffect(() => {
    localStorage.setItem("owj-scoring-workshop", JSON.stringify(config));
  }, [config]);
  const scenario = useMemo(
    () => calculateScenario(data?.listings || [], config),
    [data, config],
  );
  const rankingTable = useTableView(scenario.rows, {
    searchText: (row) => `${row.title} ${row.neighborhood} ${row.token}`,
    columns: {
      rank: (row) => row.scenario.rank,
      listing: (row) => row.title,
      deal: (row) => row.scenario.dealValue,
      property: (row) => row.scenario.property.score,
      neighborhood: (row) => row.scenario.neighborhoodScore,
      confidence: (row) => row.scores.confidence,
      risk: (row) => row.scores.risk,
      current: (row) => row.scores.recommendation,
      experimental: (row) => row.scenario.recommendation,
      movement: (row) => row.rank - row.scenario.rank,
    },
    initialSort: { key: "rank", direction: "asc" },
  });
  const shownRows = rankingTable.rows.slice(0, 100);
  const thresholdsValid =
    config.strongThreshold > config.promisingThreshold &&
    config.promisingThreshold > config.fairThreshold;
  const neighborhoodRows = Object.values(scenario.neighborhoods).sort(
    (a, b) =>
      (config.neighborhoodScores?.[b.name] ?? b.score) -
      (config.neighborhoodScores?.[a.name] ?? a.score),
  );
  const update = (key, value) =>
    setConfig((current) => ({ ...current, [key]: value }));
  const updateNeighborhood = (name, value) =>
    setConfig((current) => ({
      ...current,
      neighborhoodScores: { ...current.neighborhoodScores, [name]: value },
    }));
  const copyConfiguration = async () => {
    const payload = JSON.stringify(
      {
        scoringVersion: data.scoringVersion,
        savedAt: new Date().toISOString(),
        config,
      },
      null,
      2,
    );
    try {
      await navigator.clipboard.writeText(payload);
      setCopyStatus("تنظیمات کپی شد");
    } catch {
      setCopyStatus("مرورگر اجازه کپی نداد");
    }
    window.setTimeout(() => setCopyStatus(""), 2500);
  };
  const saveScenario = async (event) => {
    event.preventDefault();
    if (!scenarioName.trim() || !thresholdsValid) return;
    setSaving(true);
    setSaveStatus("");
    try {
      const response = await fetch("/scoring-scenarios", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: scenarioName.trim(),
          description: scenarioDescription.trim(),
          config,
        }),
      });
      const payload = await response.json();
      if (!response.ok)
        throw new Error(
          payload.message || payload.error || `HTTP ${response.status}`,
        );
      setSavedScenarios((current) => [payload, ...current]);
      setScenarioName("");
      setScenarioDescription("");
      setSaveStatus(
        "سناریو در پایگاه داده ذخیره شد و اکنون در فهرست آگهی‌ها قابل استفاده است.",
      );
    } catch (caught) {
      setSaveStatus(`ذخیره سناریو ناموفق بود: ${caught.message}`);
    } finally {
      setSaving(false);
    }
  };
  if (!data && !error)
    return <LoadingPage message="در حال آماده‌سازی کارگاه امتیازدهی" />;
  if (error) return <ErrorPage message={error} />;
  return (
    <div className="workshop-page" dir="rtl">
      <style>{WORKSHOP_CSS}</style>
      <AppHeader active="workshop" />
      <main className="workshop-main">
        <section className="workshop-hero">
          <div>
            <span>
              <Icon name="trend" size={18} /> محیط آزمایشی امتیازدهی
            </span>
            <h1>آزمایش و تنظیم امتیاز آگهی‌ها</h1>
            <p>
              سهم هر بخش و اثر هر ویژگی را همراه مدیر تغییر دهید و نتیجه را همان
              لحظه روی امتیاز و رتبه آگهی‌ها ببینید. تغییرهای این صفحه
              آزمایشی‌اند و اطلاعات اصلی را عوض نمی‌کنند.
            </p>
          </div>
          <aside>
            <span>نسخه داده</span>
            <strong>{data.scoringVersion}</strong>
            <small>
              {formatNumber(data.total)} آگهی · {formatTime(data.generatedAt)}
            </small>
          </aside>
        </section>
        <div
          className="workshop-mobile-tabs"
          role="group"
          aria-label="نمای کارگاه در موبایل"
        >
          <button
            type="button"
            className={mobileTab === "settings" ? "is-active" : ""}
            aria-pressed={mobileTab === "settings"}
            onClick={() => setMobileTab("settings")}
          >
            <Icon name="building" size={16} /> تنظیمات
          </button>
          <button
            type="button"
            className={mobileTab === "results" ? "is-active" : ""}
            aria-pressed={mobileTab === "results"}
            onClick={() => setMobileTab("results")}
          >
            <Icon name="trend" size={16} /> نتایج زنده
          </button>
        </div>
        <div className="workshop-mobile-pulse" aria-live="polite">
          <span>میانگین امتیاز آزمایشی</span>
          <strong>{formatNumber(scenario.summary.average)}</strong>
          <small>{formatNumber(scenario.summary.bandChanges)} تغییر دسته</small>
        </div>
        <div className="workshop-layout" data-mobile-tab={mobileTab}>
          <aside
            className="workshop-sidebar"
            id="workshop-settings"
            aria-label="تنظیمات مدل امتیازدهی"
          >
            <header className="workshop-sidebar-heading">
              <span>پنل کنترل کارگاه</span>
              <h2>تنظیمات امتیازدهی</h2>
              <p>
                وزن‌ها و حدنصاب‌ها را تغییر دهید؛ نتیجه همان لحظه در کنار این
                پنل به‌روز می‌شود.
              </p>
              <a href="#wk-save" className="workshop-sidebar-heading__action">
                ذخیره سناریو ←
              </a>
            </header>
            <section className="workshop-panel">
              <div className="workshop-panel__head">
                <div>
                  <span>شروع سریع</span>
                  <h2>الگوهای آماده</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setConfig({ ...DEFAULT_SCORING_CONFIG })}
                >
                  بازگشت به پیشنهاد اولیه
                </button>
              </div>
              <div className="workshop-presets">
                {Object.entries(SCORING_PRESETS).map(([key, preset]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setConfig({ ...preset.values })}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </section>
            <details
              className="workshop-panel workshop-accordion"
              id="wk-price"
              open
            >
              <summary className="workshop-panel__head">
                <div>
                  <span>مرحله ۱</span>
                  <h2>مناسب‌بودن قیمت</h2>
                </div>
                <b
                  className={
                    scenario.dealWeightTotal === 100 ? "is-valid" : "is-invalid"
                  }
                >
                  {formatNumber(scenario.dealWeightTotal)}٪
                </b>
              </summary>
              <p className="workshop-help">
                وزن یعنی سهم هر معیار در نتیجه این مرحله؛ وزن بیشتر، اثر بیشتر.
                بهتر است جمع سه وزن ۱۰۰٪ باشد.
              </p>
              <Control
                id="weight-model"
                label="مقایسه با قیمت برآوردی"
                detail="بررسی می‌کند قیمت آگهی چقدر از قیمت برآوردشده سامانه ارزان‌تر یا گران‌تر است."
                value={config.modelValue}
                onChange={(v) => update("modelValue", v)}
              />
              <Control
                id="weight-nearby"
                label="مقایسه با آگهی‌های مشابه"
                detail="قیمت این ملک را با آگهی‌های مشابه و نزدیک در همان محدوده مقایسه می‌کند."
                value={config.nearbyValue}
                onChange={(v) => update("nearbyValue", v)}
              />
              <Control
                id="weight-position"
                label="جایگاه قیمت در محله"
                detail="نشان می‌دهد قیمت هر متر این آگهی در میان قیمت‌های همان محله پایین، معمولی یا بالا است."
                value={config.localPosition}
                onChange={(v) => update("localPosition", v)}
              />
            </details>
            <details
              className="workshop-panel workshop-accordion"
              id="wk-overall"
              open
            >
              <summary className="workshop-panel__head">
                <div>
                  <span>ترکیب نهایی</span>
                  <h2>سهم بخش‌ها در امتیاز نهایی</h2>
                </div>
                <b
                  className={
                    scenario.overallWeightTotal === 100
                      ? "is-valid"
                      : "is-invalid"
                  }
                >
                  {formatNumber(scenario.overallWeightTotal)}٪
                </b>
              </summary>
              <p className="workshop-help">
                این سه عدد مشخص می‌کنند قیمت، ویژگی‌های ملک و محله هرکدام چه
                سهمی از امتیاز پیش از تعدیل داشته باشند.
              </p>
              <Control
                id="pillar-valuation"
                label="مناسب‌بودن قیمت"
                detail="خلاصه سه مقایسه قیمتی مرحله قبل؛ وزن بیشتر یعنی حساسیت بیشتر به ارزان یا گران بودن آگهی."
                value={config.valuationWeight}
                onChange={(v) => update("valuationWeight", v)}
              />
              <Control
                id="pillar-property"
                label="ویژگی‌های خودِ ملک"
                detail="امکانات، طبقه، سن بنا، متراژ، تعداد اتاق و تعداد واحد در طبقه را در نظر می‌گیرد."
                value={config.propertyWeight}
                onChange={(v) => update("propertyWeight", v)}
              />
              <Control
                id="pillar-neighborhood"
                label="امتیاز محله"
                detail="امتیاز عددی محله را وارد نتیجه می‌کند؛ این عدد در بخش «محله‌ها» قابل اصلاح است."
                value={config.neighborhoodWeight}
                onChange={(v) => update("neighborhoodWeight", v)}
              />
            </details>
            <details
              className="workshop-panel workshop-accordion"
              id="wk-amenities"
            >
              <summary className="workshop-panel__head">
                <div>
                  <span>امکانات</span>
                  <h2>اثر امکانات بر امتیاز ملک</h2>
                </div>
              </summary>
              <p className="workshop-help">
                امتیاز ویژگی‌های ملک از ۵۰ شروع می‌شود. عدد مثبت به آن اضافه و
                عدد منفی از آن کم می‌شود؛ نتیجه همیشه بین صفر تا ۱۰۰ می‌ماند.
              </p>
              <Control
                id="elevator-yes"
                label="داشتن آسانسور"
                detail="اگر آگهی آسانسور داشته باشد، این مقدار به امتیاز ملک اضافه می‌شود."
                value={config.elevatorYes}
                min={-20}
                max={20}
                unit="امتیاز"
                signed
                onChange={(v) => update("elevatorYes", v)}
              />
              <Control
                id="elevator-no"
                label="نداشتن آسانسور"
                detail="اگر آگهی آسانسور نداشته باشد، این مقدار روی امتیاز ملک اعمال می‌شود؛ عدد منفی یعنی کسر امتیاز."
                value={config.elevatorNo}
                min={-20}
                max={20}
                unit="امتیاز"
                signed
                onChange={(v) => update("elevatorNo", v)}
              />
              <Control
                id="parking-yes"
                label="داشتن پارکینگ"
                detail="اگر ملک پارکینگ داشته باشد، این مقدار به امتیاز ملک اضافه می‌شود."
                value={config.parkingYes}
                min={-20}
                max={20}
                unit="امتیاز"
                signed
                onChange={(v) => update("parkingYes", v)}
              />
              <Control
                id="parking-no"
                label="نداشتن پارکینگ"
                detail="اگر ملک پارکینگ نداشته باشد، این مقدار از امتیاز ملک کم می‌شود."
                value={config.parkingNo}
                min={-20}
                max={20}
                unit="امتیاز"
                signed
                onChange={(v) => update("parkingNo", v)}
              />
              <Control
                id="storage-yes"
                label="داشتن انباری"
                detail="اثر وجود انباری بر امتیاز ویژگی‌های ملک."
                value={config.storageYes}
                min={-20}
                max={20}
                unit="امتیاز"
                signed
                onChange={(v) => update("storageYes", v)}
              />
              <Control
                id="storage-no"
                label="نداشتن انباری"
                detail="اثر نبود انباری؛ عدد منفی از امتیاز ملک کم می‌کند."
                value={config.storageNo}
                min={-20}
                max={20}
                unit="امتیاز"
                signed
                onChange={(v) => update("storageNo", v)}
              />
              <Control
                id="balcony-yes"
                label="داشتن بالکن"
                detail="اثر وجود بالکن بر امتیاز ویژگی‌های ملک."
                value={config.balconyYes}
                min={-20}
                max={20}
                unit="امتیاز"
                signed
                onChange={(v) => update("balconyYes", v)}
              />
              <Control
                id="balcony-no"
                label="نداشتن بالکن"
                detail="اثر نبود بالکن؛ عدد منفی از امتیاز ملک کم می‌کند."
                value={config.balconyNo}
                min={-20}
                max={20}
                unit="امتیاز"
                signed
                onChange={(v) => update("balconyNo", v)}
              />
            </details>
            <details
              className="workshop-panel workshop-accordion"
              id="wk-building"
            >
              <summary className="workshop-panel__head">
                <div>
                  <span>مشخصات ساختمان</span>
                  <h2>اثر طبقه، سن و اندازه ملک</h2>
                </div>
              </summary>
              <Control
                id="floor-third"
                label="هر طبقه بالاتر از طبقه دوم"
                detail="برای طبقه سوم یک‌بار، طبقه چهارم دو بار و به همین ترتیب اعمال می‌شود."
                value={config.floorAboveSecondPenalty}
                min={-15}
                max={5}
                step={0.5}
                unit="امتیاز"
                signed
                onChange={(v) => update("floorAboveSecondPenalty", v)}
              />
              <Control
                id="floor-no-elevator"
                label="کسر اضافه برای طبقه بالا بدون آسانسور"
                detail="علاوه بر اثر طبقه، برای هر طبقه بالاتر از دوم در ساختمان بدون آسانسور اعمال می‌شود."
                value={config.noElevatorHighFloorPenalty}
                min={-20}
                max={0}
                step={0.5}
                unit="امتیاز"
                signed
                onChange={(v) => update("noElevatorHighFloorPenalty", v)}
              />
              <Control
                id="floor-basement"
                label="واحد زیرزمین"
                detail="این مقدار یک‌بار برای واحدی که در زیرزمین قرار دارد اعمال می‌شود."
                value={config.basementPenalty}
                min={-30}
                max={0}
                unit="امتیاز"
                signed
                onChange={(v) => update("basementPenalty", v)}
              />
              <Control
                id="floor-ground"
                label="واحد همکف"
                detail="اثر قرارگرفتن واحد در طبقه همکف بر امتیاز ملک."
                value={config.groundFloorPenalty}
                min={-20}
                max={5}
                unit="امتیاز"
                signed
                onChange={(v) => update("groundFloorPenalty", v)}
              />
              <Control
                id="floor-top"
                label="واحد طبقه آخر"
                detail="اثر قرارگرفتن واحد در آخرین طبقه ساختمان، مانند احتمال گرما یا مشکل بام."
                value={config.topFloorPenalty}
                min={-20}
                max={5}
                unit="امتیاز"
                signed
                onChange={(v) => update("topFloorPenalty", v)}
              />
              <Control
                id="age-year"
                label="کسر امتیاز به‌ازای هر سال عمر بنا"
                detail="در سن بنا ضرب می‌شود؛ مثلاً منفی ۰٫۵ برای بنای ۱۰ ساله یعنی کسر ۵ امتیاز."
                value={config.agePerYearPenalty}
                min={-2}
                max={0}
                step={0.05}
                unit="امتیاز"
                signed
                onChange={(v) => update("agePerYearPenalty", v)}
              />
              <Control
                id="new-build"
                label="امتیاز نوساز بودن"
                detail="اگر عمر بنا صفر یا یک سال باشد، این مقدار یک‌بار به امتیاز ملک اضافه می‌شود."
                value={config.newBuildBonus}
                min={-10}
                max={15}
                unit="امتیاز"
                signed
                onChange={(v) => update("newBuildBonus", v)}
              />
              <Control
                id="single-unit"
                label="تک‌واحدی بودن طبقه"
                detail="اگر در هر طبقه فقط یک واحد باشد، این مقدار به امتیاز ملک اضافه می‌شود."
                value={config.singleUnitBonus}
                min={-10}
                max={15}
                unit="امتیاز"
                signed
                onChange={(v) => update("singleUnitBonus", v)}
              />
              <Control
                id="extra-unit"
                label="هر واحد اضافه در یک طبقه"
                detail="از واحد دوم به بعد، به‌ازای هر واحد اضافه این مقدار اعمال می‌شود؛ مثلاً سه واحد یعنی دو بار."
                value={config.extraUnitPenalty}
                min={-10}
                max={0}
                step={0.5}
                unit="امتیاز"
                signed
                onChange={(v) => update("extraUnitPenalty", v)}
              />
              <Control
                id="area-step"
                label="اثر هر ۲۵ متر اختلاف با ۷۵ متر"
                detail="۷۵ متر نقطه مبنا است؛ ملک ۱۰۰ متری یک بار و ملک ۵۰ متری یک بار در جهت مخالف اثر می‌گیرد."
                value={config.areaPer25Sqm}
                min={-5}
                max={5}
                step={0.5}
                unit="امتیاز"
                signed
                onChange={(v) => update("areaPer25Sqm", v)}
              />
              <Control
                id="room-point"
                label="اثر هر اتاق اختلاف با دو اتاق"
                detail="دو اتاق نقطه مبنا است؛ سه‌خوابه یک بار و یک‌خوابه یک بار در جهت مخالف اثر می‌گیرد."
                value={config.roomPoint}
                min={-5}
                max={5}
                step={0.5}
                unit="امتیاز"
                signed
                onChange={(v) => update("roomPoint", v)}
              />
            </details>
            <details className="workshop-panel workshop-accordion" id="wk-risk">
              <summary className="workshop-panel__head">
                <div>
                  <span>مرحله ۲</span>
                  <h2>تعدیل بر اساس اعتماد و ریسک</h2>
                </div>
              </summary>
              <p className="workshop-help">
                پس از محاسبه قیمت، ملک و محله، قابل‌اعتماد بودن داده و نشانه‌های
                ریسک می‌توانند امتیاز را کاهش دهند.
              </p>
              <Control
                id="confidence-floor"
                label="حداقل سهم امتیاز در نبود اطمینان"
                detail="اگر اعتماد به داده صفر باشد، همین درصد از امتیاز حفظ می‌شود؛ با افزایش اعتماد، سهم حفظ‌شده به ۱۰۰٪ نزدیک می‌شود."
                value={config.confidenceFloor}
                onChange={(v) => update("confidenceFloor", v)}
              />
              <Control
                id="risk-penalty"
                label="بیشترین کاهش به‌دلیل ریسک"
                detail="اگر ریسک ۱۰۰ باشد، امتیاز حداکثر به‌اندازه این درصد کاهش می‌یابد؛ ریسک کمتر، کاهش کمتری دارد."
                value={config.riskPenalty}
                onChange={(v) => update("riskPenalty", v)}
              />
            </details>
            <details
              className="workshop-panel workshop-accordion"
              id="wk-thresholds"
            >
              <summary className="workshop-panel__head">
                <div>
                  <span>مرحله ۳</span>
                  <h2>حد نصاب دسته‌بندی</h2>
                </div>
                <b className={thresholdsValid ? "is-valid" : "is-invalid"}>
                  {thresholdsValid ? "درست" : "نیاز به اصلاح"}
                </b>
              </summary>
              <Control
                id="threshold-strong"
                label="فرصت خرید بسیار خوب"
                detail="هر آگهی با امتیاز برابر یا بیشتر از این عدد در بالاترین دسته قرار می‌گیرد."
                value={config.strongThreshold}
                unit="از ۱۰۰"
                onChange={(v) => update("strongThreshold", v)}
              />
              <Control
                id="threshold-promising"
                label="ارزش بررسی دارد"
                detail="حداقل امتیاز برای آگهی‌هایی که ارزش بررسی بیشتر دارند."
                value={config.promisingThreshold}
                unit="از ۱۰۰"
                onChange={(v) => update("promisingThreshold", v)}
              />
              <Control
                id="threshold-fair"
                label="قیمت نسبتاً منصفانه"
                detail="حداقل امتیاز دسته میانی؛ امتیازهای پایین‌تر در دسته «ارزش خرید پایین» قرار می‌گیرند."
                value={config.fairThreshold}
                unit="از ۱۰۰"
                onChange={(v) => update("fairThreshold", v)}
              />
            </details>
            <form
              className="workshop-panel scenario-save-form"
              id="wk-save"
              onSubmit={saveScenario}
              aria-busy={saving}
            >
              <div className="workshop-panel__head">
                <div>
                  <span>ذخیره و استفاده</span>
                  <h2>ساخت سناریوی امتیازدهی</h2>
                </div>
              </div>
              <p className="workshop-help">
                همه تنظیم‌های فعلی، امتیاز محله‌ها و حدنصاب‌ها با این نام ذخیره
                می‌شوند.
              </p>
              <label htmlFor="scenario-name">
                نام سناریو
                <input
                  id="scenario-name"
                  value={scenarioName}
                  maxLength={100}
                  required
                  onChange={(event) => setScenarioName(event.target.value)}
                  placeholder="مثلاً خرید محافظه‌کارانه"
                />
              </label>
              <label htmlFor="scenario-description">
                توضیح کوتاه
                <textarea
                  id="scenario-description"
                  value={scenarioDescription}
                  maxLength={500}
                  onChange={(event) =>
                    setScenarioDescription(event.target.value)
                  }
                  placeholder="این سناریو برای چه نوع جستجویی ساخته شده است؟"
                />
              </label>
              {!thresholdsValid && (
                <p className="workshop-warning" role="alert">
                  برای ذخیره، حدنصاب‌ها باید از بالاترین دسته تا پایین‌ترین
                  به‌ترتیب کاهش یابند.
                </p>
              )}

              <button
                className="workshop-copy"
                type="submit"
                disabled={saving || !scenarioName.trim() || !thresholdsValid}
              >
                {saving
                  ? "در حال ذخیره…"
                  : "ذخیره سناریو و فعال‌کردن در آگهی‌ها"}
              </button>
              <p className="scenario-save-status" aria-live="polite">
                {saveStatus}
              </p>
              {!!savedScenarios.length && (
                <div
                  className="saved-scenario-list"
                  aria-label="سناریوهای ذخیره‌شده"
                >
                  {savedScenarios.slice(0, 6).map((scenario) => (
                    <article key={scenario.scenarioId}>
                      <button
                        type="button"
                        onClick={() =>
                          setConfig({
                            ...DEFAULT_SCORING_CONFIG,
                            ...scenario.config,
                          })
                        }
                      >
                        <b>{scenario.name}</b>
                        <small>بارگذاری تنظیم‌ها در آزمایشگاه</small>
                      </button>
                      <a
                        href={`/catalog?scenario=${encodeURIComponent(scenario.scenarioId)}`}
                      >
                        مشاهده رتبه‌بندی
                      </a>
                    </article>
                  ))}
                </div>
              )}
            </form>
            <button
              className="workshop-copy"
              type="button"
              onClick={copyConfiguration}
            >
              کپی تنظیمات برای جلسه
            </button>
            <div className="workshop-live" aria-live="polite">
              {copyStatus ||
                `تنظیم آزمایشی روی ${formatNumber(data.total)} آگهی اعمال شد`}
            </div>
          </aside>
          <div className="workshop-results" id="workshop-results">
            {!thresholdsValid && (
              <div className="workshop-warning" role="alert">
                حد نصاب‌ها باید از «فرصت خرید بسیار خوب» تا «قیمت نسبتاً
                منصفانه» به‌ترتیب کمتر شوند.
              </div>
            )}
            <section
              className="workshop-panel workshop-guide"
              aria-labelledby="score-guide-title"
            >
              <div className="workshop-panel__head">
                <div>
                  <span>راهنمای جلسه</span>
                  <h2 id="score-guide-title">این امتیاز چگونه ساخته می‌شود؟</h2>
                </div>
                <strong>۰ تا ۱۰۰</strong>
              </div>
              <div className="workshop-guide__grid">
                <article>
                  <b>۱. مناسب‌بودن قیمت</b>
                  <p>
                    قیمت آگهی با قیمت برآوردی، آگهی‌های مشابه و قیمت‌های همان
                    محله سنجیده می‌شود.
                  </p>
                </article>
                <article>
                  <b>۲. ویژگی‌های ملک</b>
                  <p>
                    محاسبه از ۵۰ شروع می‌شود؛ امکانات و ویژگی‌های مثبت اضافه و
                    کاستی‌ها کم می‌شوند.
                  </p>
                </article>
                <article>
                  <b>۳. امتیاز محله</b>
                  <p>
                    امتیاز خودکار محله یا عددی که مدیر بر اساس شناخت بازار وارد
                    کرده است، استفاده می‌شود.
                  </p>
                </article>
                <article>
                  <b>۴. اعتماد و ریسک</b>
                  <p>
                    در پایان، کمبود داده یا نشانه‌های ریسک می‌تواند امتیاز
                    ترکیبی را کاهش دهد.
                  </p>
                </article>
              </div>
            </section>
            <section className="workshop-stats">
              <MiniStat
                label="میانگین امتیاز آزمایشی"
                value={formatNumber(scenario.summary.average)}
                detail={`میانه: ${formatNumber(scenario.summary.median)}`}
              />
              <MiniStat
                label="تغییر دسته"
                value={formatNumber(scenario.summary.bandChanges)}
                detail="آگهی نسبت به امتیاز فعلی"
                tone={T.orange}
              />
              <MiniStat
                label="تغییر در ۱۰ رتبه اول"
                value={formatNumber(scenario.summary.topTenChanges)}
                detail="آگهی تازه‌وارد به ۱۰ رتبه اول"
                tone={T.primaryPale}
              />
              <MiniStat
                label="فرصت خرید بسیار خوب"
                value={formatNumber(scenario.summary.strong)}
                detail={`${formatNumber(scenario.summary.promising)} آگهی ارزش بررسی دارد`}
                tone={T.green}
              />
            </section>
            <section className="workshop-panel workshop-distribution">
              <div className="workshop-panel__head">
                <div>
                  <span>اثر تنظیم آزمایشی</span>
                  <h2>پراکندگی امتیازهای جدید</h2>
                </div>
                <small>امتیاز ترکیبی ← تعدیل اعتماد ← کاهش ریسک</small>
              </div>
              <Distribution histogram={scenario.histogram} />
              <div className="workshop-band-summary">
                {[
                  ["strong-value", scenario.summary.strong],
                  ["promising", scenario.summary.promising],
                  ["fair", scenario.summary.fair],
                  ["weak-value", scenario.summary.weak],
                ].map(([band, count]) => (
                  <span key={band}>
                    <i style={{ background: BAND_COLORS[band] }} />
                    {BAND_LABELS[band]} <b>{formatNumber(count)}</b>
                  </span>
                ))}
              </div>
            </section>
            <section className="workshop-panel">
              <div className="workshop-panel__head">
                <div>
                  <span>شناخت محدوده</span>
                  <h2>امتیاز محله‌ها</h2>
                </div>
                <small>قابل اصلاح توسط مدیر · از ۱۰۰</small>
              </div>
              <p className="workshop-help">
                امتیاز پیشنهادی هر محله از سطح معمول قیمت هر متر و تعداد
                آگهی‌های قابل‌استفاده آن ساخته می‌شود. برای محله‌هایی که آگهی
                کمی دارند، عدد به امتیاز میانه ۵۰ نزدیک‌تر می‌ماند. عددی که مدیر
                وارد کند جای امتیاز پیشنهادی را می‌گیرد.
              </p>
              <div className="neighborhood-score-grid">
                {neighborhoodRows.map((item) => (
                  <label key={item.name}>
                    <span>
                      <b>{item.name}</b>
                      <small>
                        {formatNumber(item.count)} آگهی ·{" "}
                        {formatMoney(item.medianPricePerMeter)} / متر
                      </small>
                    </span>
                    <input
                      type="number"
                      lang="fa"
                      aria-label={`امتیاز محله ${item.name}`}
                      min="0"
                      max="100"
                      value={
                        config.neighborhoodScores?.[item.name] ?? item.score
                      }
                      onChange={(event) =>
                        updateNeighborhood(
                          item.name,
                          Math.max(
                            0,
                            Math.min(100, Number(event.target.value)),
                          ),
                        )
                      }
                    />
                  </label>
                ))}
              </div>
            </section>
            <section className="workshop-panel">
              <div className="workshop-table-head">
                <div>
                  <span>رتبه‌بندی زنده</span>
                  <h2>اثر تنظیم‌ها بر هر آگهی</h2>
                </div>
              </div>
              <TableTools
                query={rankingTable.query}
                setQuery={rankingTable.setQuery}
                count={rankingTable.rows.length}
                placeholder="عنوان، محله یا توکن…"
              />
              <div className="workshop-mobile-sort">
                <label>
                  مرتب‌سازی
                  <select
                    aria-label="مرتب‌سازی آگهی‌ها"
                    value={rankingTable.sort.key}
                    onChange={(event) =>
                      rankingTable.changeSort(event.target.value)
                    }
                  >
                    {[
                      ["rank", "رتبه"],
                      ["listing", "عنوان آگهی"],
                      ["deal", "مناسب‌بودن قیمت"],
                      ["property", "ویژگی ملک"],
                      ["neighborhood", "امتیاز محله"],
                      ["confidence", "اعتماد"],
                      ["risk", "ریسک"],
                      ["current", "امتیاز فعلی"],
                      ["experimental", "امتیاز آزمایشی"],
                      ["movement", "تغییر رتبه"],
                    ].map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => rankingTable.changeSort(rankingTable.sort.key)}
                  aria-label="تغییر جهت مرتب‌سازی"
                >
                  {rankingTable.sort.direction === "asc"
                    ? "صعودی ↑"
                    : "نزولی ↓"}
                </button>
              </div>
              <div
                className="workshop-mobile-ranking"
                aria-label="رتبه‌بندی آگهی‌ها در موبایل"
              >
                {shownRows.map((row) => {
                  const movement = row.rank - row.scenario.rank;
                  return (
                    <article className="wk-rank-card" key={row.token}>
                      <div className="wk-rank-card__top">
                        <div className="wk-rank-card__identity">
                          <a href={`/listing/${row.token}`}>{row.title}</a>
                          <small>
                            {row.neighborhood} · {formatMoney(row.askingPrice)}
                          </small>
                        </div>
                        <span className="wk-rank-card__rank">
                          رتبه {formatNumber(row.scenario.rank)}
                        </span>
                      </div>
                      <div className="wk-rank-card__score">
                        <span>
                          امتیاز آزمایشی
                          <small>{BAND_LABELS[row.scenario.band]}</small>
                        </span>
                        <strong
                          style={{ color: BAND_COLORS[row.scenario.band] }}
                        >
                          {formatNumber(row.scenario.recommendation)}
                        </strong>
                        <span
                          className={`wk-rank-card__delta ${movement > 0 ? "is-up" : movement < 0 ? "is-down" : ""}`}
                        >
                          {movement > 0 ? "+" : ""}
                          {formatNumber(movement)} رتبه
                        </span>
                      </div>
                      <div className="wk-rank-card__metrics">
                        {[
                          [
                            "امتیاز فعلی",
                            formatNumber(row.scores.recommendation),
                          ],
                          [
                            "مناسب‌بودن قیمت",
                            formatNumber(row.scenario.dealValue),
                          ],
                          [
                            "ویژگی ملک",
                            formatNumber(row.scenario.property.score),
                          ],
                          [
                            "امتیاز محله",
                            formatNumber(row.scenario.neighborhoodScore),
                          ],
                          [
                            "اعتماد به داده",
                            formatNumber(row.scores.confidence),
                          ],
                          ["ریسک", formatNumber(row.scores.risk)],
                        ].map(([label, value]) => (
                          <div key={label}>
                            <span>{label}</span>
                            <b>{value}</b>
                          </div>
                        ))}
                      </div>
                      <details className="wk-rank-card__breakdown">
                        <summary>جزئیات اثر ویژگی‌های ملک</summary>
                        <div>
                          {Object.entries(
                            row.scenario.property.contributions,
                          ).map(([key, value]) => (
                            <span key={key}>
                              {FACTOR_LABELS[key] || key}:{" "}
                              <b>
                                {value > 0 ? "+" : ""}
                                {formatNumber(value)}
                              </b>
                            </span>
                          ))}
                        </div>
                      </details>
                    </article>
                  );
                })}
                {!shownRows.length && (
                  <p className="workshop-warning">آگهی مطابق جستجو پیدا نشد.</p>
                )}
              </div>
              <div className="workshop-table-wrap">
                <table className="workshop-table">
                  <thead>
                    <tr>
                      {[
                        ["rank", "رتبه"],
                        ["listing", "آگهی"],
                        ["deal", "مناسب‌بودن قیمت"],
                        ["property", "ویژگی‌های ملک"],
                        ["neighborhood", "امتیاز محله"],
                        ["confidence", "اعتماد به داده"],
                        ["risk", "ریسک ارزیابی"],
                        ["current", "امتیاز فعلی"],
                        ["experimental", "امتیاز آزمایشی"],
                        ["movement", "تغییر رتبه"],
                      ].map(([key, label]) => (
                        <SortableTh
                          key={key}
                          column={key}
                          sort={rankingTable.sort}
                          onSort={rankingTable.changeSort}
                        >
                          {label}
                        </SortableTh>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {shownRows.map((row) => {
                      const movement = row.rank - row.scenario.rank;
                      return (
                        <tr key={row.token}>
                          <td>
                            <strong>{formatNumber(row.scenario.rank)}</strong>
                          </td>
                          <td>
                            <a href={`/listing/${row.token}`}>
                              <b>{row.title}</b>
                              <small>
                                {row.neighborhood} ·{" "}
                                {formatMoney(row.askingPrice)}
                              </small>
                            </a>
                          </td>
                          <td>{formatNumber(row.scenario.dealValue)}</td>
                          <td>
                            <details className="property-breakdown">
                              <summary>
                                {formatNumber(row.scenario.property.score)}
                              </summary>
                              <div>
                                {Object.entries(
                                  row.scenario.property.contributions,
                                ).map(([key, value]) => (
                                  <span key={key}>
                                    {FACTOR_LABELS[key] || key}:{" "}
                                    <b>
                                      {value > 0 ? "+" : ""}
                                      {formatNumber(value)}
                                    </b>
                                  </span>
                                ))}
                              </div>
                            </details>
                          </td>
                          <td>
                            {formatNumber(row.scenario.neighborhoodScore)}
                          </td>
                          <td>{formatNumber(row.scores.confidence)}</td>
                          <td>{formatNumber(row.scores.risk)}</td>
                          <td>{formatNumber(row.scores.recommendation)}</td>
                          <td>
                            <b
                              className="workshop-score"
                              style={{ color: BAND_COLORS[row.scenario.band] }}
                            >
                              {formatNumber(row.scenario.recommendation)}
                            </b>
                            <small>{BAND_LABELS[row.scenario.band]}</small>
                          </td>
                          <td
                            className={
                              movement > 0
                                ? "movement-up"
                                : movement < 0
                                  ? "movement-down"
                                  : ""
                            }
                          >
                            {movement > 0 ? "+" : ""}
                            {formatNumber(movement)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="workshop-table-note">
                برای عملکرد بهتر، این جدول ۱۰۰ نتیجه اولِ فیلتر جاری را نشان
                می‌دهد؛ محاسبات خلاصه روی همه آگهی‌ها انجام شده است.
              </p>
            </section>
          </div>
        </div>
      </main>
      <AppFooter disclaimer="این صفحه فقط برای آزمایش و گفت‌وگو درباره مدل امتیازدهی است؛ تغییرها در اطلاعات اصلی ذخیره نمی‌شوند." />
    </div>
  );
}
