"use client";

import { useEffect, useState } from "react";
import { SortableTh, TableTools, useTableView } from "./tableTools.jsx";
import {
  AppFooter,
  AppHeader,
  ErrorPage,
  formatMoney,
  formatNumber,
  formatPercent,
  formatTime,
  Icon,
  LoadingPage,
} from "./shared.jsx";

/**
 * Scoring analytics — OWJ
 * The styling is deliberately local to this JSX file. Neither the API request,
 * scoring calculations, useTableView configuration nor its sorting/searching
 * state is modified. Colors are presentation-only.
 */
const C = {
  primary: "#66308d",
  primaryMuted: "#f4eef8",
  secondary: "#01ae9b",
  secondaryDark: "#087f73",
  secondaryMuted: "#e9f8f5",
  green: "#14785f",
  greenMuted: "#eaf7f0",
  orange: "#ae6c27",
  orangeMuted: "#fff5e8",
  red: "#b6404b",
  redMuted: "#fff0f1",
  gray: "#777e89",
};

const PAGE_CSS = `
  .owj-analytics {
    --oa-page: #f7f8fa;
    --oa-paper: #ffffff;
    --oa-ink: #1d2027;
    --oa-muted: #626a76;
    --oa-faint: #737b85;
    --oa-border: #e9ebef;
    --oa-surface: #f6f7f9;
    --oa-primary: #66308d;
    --oa-secondary: #087f73;
    color: var(--oa-ink);
    background: var(--oa-page);
    direction: rtl;
    font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
    font-size: 14px;
    line-height: 1.75;
    min-height: 100vh;
    text-align: right;
    overflow-x: clip;
  }
  .owj-analytics, .owj-analytics *, .owj-analytics *::before, .owj-analytics *::after { box-sizing: border-box; }
  .owj-analytics h1, .owj-analytics h2, .owj-analytics h3,
  .owj-analytics p, .owj-analytics figure, .owj-analytics dl { margin: 0; }
  .owj-analytics a { color: inherit; text-decoration: none; }
  .owj-analytics button, .owj-analytics select, .owj-analytics input { font: inherit; }
  .owj-analytics button, .owj-analytics a, .owj-analytics select { -webkit-tap-highlight-color: transparent; }
  .owj-analytics :is(button, input, select, summary, a):focus-visible {
    outline: 3px solid rgba(102, 48, 141, .50);
    outline-offset: 3px;
  }
  .oa-main { max-width: 1392px; padding: 26px 28px 88px; margin: 0 auto; min-width: 0; }

  .oa-hero {
    position: relative;
    isolation: isolate;
    border-radius: 24px;
    padding: 36px 38px;
    background: var(--oa-paper);
    border: 1px solid var(--oa-border);
    display: grid;
    grid-template-columns: minmax(0,1fr) minmax(255px,310px);
    align-items: center;
    gap: 32px;
    box-shadow: 0 5px 24px rgba(25, 32, 45, .025);
    overflow: hidden;
    margin-bottom: 22px;
  }
  .oa-hero::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 190px;
    background: radial-gradient(ellipse at top left, rgba(102,48,141,.045), transparent 75%);
    z-index: -1;
    pointer-events: none;
  }
  .oa-hero__eyebrow {
    color: var(--oa-secondary);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 750;
    font-size: 12px;
    margin-bottom: 13px;
    background: #e9f8f5;
    padding: 5px 11px;
    border-radius: 999px;
    width: fit-content;
  }
  .oa-hero h1 {
    font-weight: 850;
    font-size: clamp(24px, 2.6vw, 35px);
    letter-spacing: -.7px;
    line-height: 1.5;
    margin-bottom: 9px;
  }
  .oa-hero h1 span { color: var(--oa-primary); }
  .oa-hero__desc { color: var(--oa-muted); font-size: 13px; line-height: 2; max-width: 695px; }
  .oa-run {
    border-radius: 17px;
    background: #f7f8fa;
    border: 1px solid #eceef2;
    padding: 19px 20px;
    min-width: 0;
  }
  .oa-run__title { display: flex; align-items: center; gap: 8px; font-weight: 750; font-size: 12px; margin-bottom: 14px; }
  .oa-run__title svg { color: var(--oa-primary); }
  .oa-run__item { display: flex; gap: 12px; align-items: flex-start; justify-content: space-between; padding: 10px 0; border-top: 1px solid #e9ebef; }
  .oa-run__item > span { color: var(--oa-muted); font-size: 12px; flex-shrink: 0; }
  .oa-run__item > strong { text-align: left; font-size: 12px; font-weight: 750; overflow-wrap: anywhere; max-width: 69%; }
  .oa-run__method { direction: ltr; unicode-bidi: plaintext; font-size: 11px !important; }

  .oa-kpis { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 14px; margin: 0 0 24px; }
  .oa-kpi {
    --tone: #66308d; --tone-bg: #f4eef8;
    min-width: 0;
    padding: 21px 20px 18px;
    border: 1px solid var(--oa-border);
    border-radius: 18px;
    background: var(--oa-paper);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  .oa-kpi--cyan { --tone: #087f73; --tone-bg: #e9f8f5; }
  .oa-kpi--green { --tone: #14785f; --tone-bg: #eaf7f0; }
  .oa-kpi--orange { --tone: #ae6c27; --tone-bg: #fff5e8; }
  .oa-kpi--violet { --tone: #66308d; --tone-bg: #f4eef8; }
  .oa-kpi__top { width: 100%; display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
  .oa-kpi__label { color: #636a75; font-size: 12px; font-weight: 650; line-height: 1.65; }
  .oa-kpi__mark { height: 30px; width: 30px; display: grid; place-items: center; border-radius: 9px; color: var(--tone); background: var(--tone-bg); flex-shrink: 0; }
  .oa-kpi__value { color: var(--oa-ink); font-weight: 850; font-size: clamp(24px, 2.3vw, 32px); line-height: 1.35; letter-spacing: -.6px; max-width: 100%; overflow-wrap: anywhere; font-variant-numeric: tabular-nums; }
  .oa-kpi__detail { color: #69717c; font-size: 11px; line-height: 1.8; margin-top: 4px; }
  .oa-kpi__rule { margin-top: auto; width: 36px; height: 3px; border-radius: 9px; background: var(--tone); }

  .oa-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 16px; align-items: stretch; margin-bottom: 20px; }
  .oa-panel { min-width: 0; background: var(--oa-paper); border: 1px solid var(--oa-border); border-radius: 19px; padding: 24px; }
  .oa-panel--wide { grid-column: span 2; }
  .oa-panel--full { grid-column: 1 / -1; }
  .oa-panel__eyebrow { display: block; color: var(--oa-secondary); font-weight: 800; font-size: 11px; margin: 0 0 6px; }
  .oa-panel__title { font-weight: 800; color: var(--oa-ink); font-size: clamp(17px, 1.6vw, 19px); line-height: 1.6; }
  .oa-panel__desc { margin: 7px 0 0 !important; color: var(--oa-muted); font-size: 12px; line-height: 2; max-width: 810px; }
  .oa-panel__head { margin-bottom: 19px; }

  .oa-chart-shell { border-radius: 14px; background: #f8f9fa; border: 1px solid #edf0f2; overflow-x: auto; overflow-y: hidden; scrollbar-width: thin; }
  .oa-histogram { height: 235px; min-width: max(100%, 420px); display: flex; align-items: flex-end; gap: 7px; padding: 16px 14px 14px; }
  .oa-histogram__bin { min-width: 0; flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 6px; }
  .oa-histogram__count { color: #555e6b; font-size: 10px; font-weight: 750; line-height: 1.4; white-space: nowrap; }
  .oa-histogram__track { flex: 1; min-height: 0; width: 100%; display: flex; align-items: flex-end; justify-content: center; border-bottom: 1px solid #dde1e6; }
  .oa-histogram__bar { display: block; width: min(100%, 46px); border-radius: 6px 6px 1px 1px; background: #8a659e; min-height: 2px; transition: opacity .2s; }
  .oa-histogram__bin:hover .oa-histogram__bar { opacity: .77; }
  .oa-histogram__label { color: var(--oa-muted); font-size: 10px; direction: ltr; unicode-bidi: plaintext; white-space: nowrap; max-width: 100%; overflow: hidden; text-overflow: ellipsis; }
  .oa-quartiles { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 8px; margin-top: 13px; }
  .oa-quartile { min-width: 0; border: 1px solid #eff0f2; background: #f9fafb; border-radius: 11px; padding: 11px 5px; text-align: center; display: flex; flex-direction: column; gap: 3px; }
  .oa-quartile--median { border-color: #e9daef; background: #f7f2fa; }
  .oa-quartile span { font-size: 10px; font-weight: 650; color: #737b85; }
  .oa-quartile strong { color: #202127; font-size: clamp(13px, 1.4vw, 18px); font-weight: 850; overflow-wrap: anywhere; }
  .oa-quartile--median strong { color: #66308d; }
  .oa-bandlist { display: flex; flex-direction: column; gap: 11px; }
  .oa-band { --band: #66308d; padding: 12px; border: 1px solid #eff1f3; border-radius: 12px; background: #fbfbfc; min-width: 0; }
  .oa-band__top { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 5px; }
  .oa-band__label { color: #30353d; font-size: 12px; font-weight: 750; }
  .oa-band__count { font-size: 12px; font-weight: 800; color: #30353d; white-space: nowrap; }
  .oa-band__meta { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 10px; color: #727985; margin-bottom: 9px; }
  .oa-band__range { direction: ltr; unicode-bidi: plaintext; }
  .oa-band__track { height: 5px; background: #e8ebef; overflow: hidden; border-radius: 99px; }
  .oa-band__fill { display: block; height: 100%; background: var(--band); border-radius: inherit; transition: width .5s ease; }

  .oa-coordinate { display: flex; align-items: center; flex-direction: column; gap: 19px; }
  .oa-donut { width: 168px; height: 168px; border-radius: 50%; display: grid; place-items: center; padding: 13px; margin: 2px 0 0; }
  .oa-donut__inside { width: 100%; height: 100%; border-radius: 50%; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: inset 0 0 0 1px #edf0f2; }
  .oa-donut__inside strong { font-size: 24px; color: #1e252a; font-weight: 850; }
  .oa-donut__inside span { color: var(--oa-muted); font-size: 11px; }
  .oa-legend { width: 100%; display: flex; flex-direction: column; gap: 8px; }
  .oa-legend__row { display: flex; align-items: center; gap: 10px; padding: 11px 13px; background: #f8f9fa; border: 1px solid #f0f1f3; border-radius: 11px; }
  .oa-legend__dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
  .oa-legend__row span:nth-child(2) { color: #626a74; font-size: 12px; flex: 1; }
  .oa-legend__row strong { font-size: 14px; font-weight: 800; }

  .oa-clean-flow { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 10px; margin-bottom: 17px; }
  .oa-clean-step { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 12px; border-radius: 13px; padding: 15px; background: #f8f9fa; border: 1px solid #ebedf0; min-width: 0; }
  .oa-clean-step--accepted { background: #eef9f6; border-color: #d8efe8; }
  .oa-clean-step--scored { background: #f5f0f8; border-color: #eadcf0; }
  .oa-clean-step--rejected { background: #fff4f4; border-color: #f8e1e2; }
  .oa-clean-step span { color: #656c76; font-size: 11px; font-weight: 650; }
  .oa-clean-step strong { font-size: clamp(19px,2vw,25px); font-weight: 850; color: #202127; overflow-wrap: anywhere; line-height: 1.5; }
  .oa-clean-step--accepted strong { color: #14785f; }
  .oa-clean-step--scored strong { color: #66308d; }
  .oa-clean-step--rejected strong { color: #b6404b; }
  .oa-dictionaries { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; }
  .oa-dictionary { background: #fbfbfc; border: 1px solid #edf0f2; border-radius: 13px; padding: 16px; min-width: 0; }
  .oa-dictionary h3 { font-size: 13px; font-weight: 800; margin-bottom: 14px; line-height: 1.8; }
  .oa-dictionary__items { display: flex; flex-direction: column; gap: 13px; }
  .oa-dictionary__row { display: flex; align-items: flex-start; flex-direction: column; gap: 5px; }
  .oa-dictionary__line { display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px; }
  .oa-dictionary__line span { font-size: 12px; color: #5f6671; overflow-wrap: anywhere; }
  .oa-dictionary__line strong { font-size: 12px; font-weight: 800; white-space: nowrap; }
  .oa-dictionary__track { background: #e9ecf0; border-radius: 99px; width: 100%; height: 5px; overflow: hidden; }
  .oa-dictionary__fill { background: #8d7e99; border-radius: inherit; height: 100%; display: block; }
  .oa-empty { padding: 32px 20px; font-size: 12px; color: #727985; text-align: center; }

  .oa-neighborhood-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 15px; flex-wrap: wrap; margin-bottom: 15px; }
  .oa-neighborhood-head .oa-panel__head { margin-bottom: 0; }
  .oa-neighborhood-count { display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px; color: #5e6671; background: #f7f8fa; border: 1px solid #ebedf0; border-radius: 999px; font-size: 11px; white-space: nowrap; }
  .oa-tools { margin-bottom: 14px; }
  .oa-tools input { min-height: 42px; border: 1px solid #e4e7ed !important; background: #fff !important; border-radius: 11px !important; color: #202127 !important; font-size: 13px !important; outline: none; }
  .oa-tools input:focus { border-color: #a986c2 !important; box-shadow: 0 0 0 3px #f5eff8; }
  .oa-table-scroll { overflow: auto; border: 1px solid #e9ebef; border-radius: 13px; max-width: 100%; scrollbar-width: thin; }
  .oa-table { width: 100%; border-collapse: separate; border-spacing: 0; text-align: right; min-width: 1000px; font-size: 12px; }
  .oa-table thead th { background: #f8f9fa; color: #626a75; padding: 13px 12px; text-align: right; white-space: nowrap; border-bottom: 1px solid #e8ebef; font-weight: 700; }
  .oa-table thead th:first-child { position: sticky; right: 0; z-index: 2; background: #f8f9fa; }
  .oa-table thead button { color: #626a75; font-size: 12px; }
  .oa-table tbody td { background: #fff; padding: 14px 12px; border-bottom: 1px solid #eff0f2; white-space: nowrap; color: #4f5761; }
  .oa-table tbody tr:last-child td { border-bottom: 0; }
  .oa-table tbody tr:hover td { background: #fcfbfd; }
  .oa-table tbody td:first-child { position: sticky; right: 0; background: #fff; z-index: 1; box-shadow: -1px 0 0 #eff0f2; color: #202127; font-weight: 750; }
  .oa-table tbody tr:hover td:first-child { background: #fcfbfd; }
  .oa-table__value { font-weight: 750; color: #21252c; }
  .oa-table__risk { color: #a9661b !important; font-weight: 750; }
  .oa-score-pill { display: inline-flex; align-items: center; justify-content: center; min-width: 42px; border-radius: 8px; padding: 4px 8px; font-size: 12px; font-weight: 850; }
  .oa-score-pill--good { color: #14785f; background: #eaf7f0; }
  .oa-score-pill--medium { color: #ae6c27; background: #fff5e8; }
  .oa-score-pill--low { color: #b6404b; background: #fff0f1; }
  .oa-discount--positive { color: #14785f !important; font-weight: 800; }
  .oa-discount--negative { color: #b6404b !important; font-weight: 800; }
  .oa-mobile-sort, .oa-mobile-areas { display: none; }

  .oa-methodology { display: flex; align-items: flex-start; gap: 13px; background: #fff; border: 1px solid #e9ebef; border-radius: 17px; padding: 20px 22px; margin-bottom: 18px; }
  .oa-methodology__icon { width: 37px; height: 37px; flex-shrink: 0; display: grid; place-items: center; border-radius: 11px; background: #f4eef8; color: #66308d; }
  .oa-methodology h2 { font-weight: 800; font-size: 14px; margin-bottom: 5px; }
  .oa-methodology p { color: #626a76; font-size: 12px; line-height: 2; margin-bottom: 12px; }
  .oa-methodology code { color: #555461; font-size: 11px; direction: ltr; unicode-bidi: plaintext; display: block; text-align: left; max-width: 100%; overflow-x: auto; overflow-wrap: anywhere; padding: 12px; border-radius: 10px; background: #f8f9fa; border: 1px solid #eef0f2; }
  .oa-json { background: #fff; border: 1px solid #e9ebef; border-radius: 15px; overflow: hidden; }
  .oa-json > summary { cursor: pointer; padding: 17px 20px; list-style: none; font-size: 12px; font-weight: 750; display: flex; align-items: center; justify-content: space-between; gap: 15px; }
  .oa-json > summary::-webkit-details-marker { display: none; }
  .oa-json > summary span { display: inline-flex; align-items: center; gap: 8px; }
  .oa-json > summary small { color: #737b85; font-weight: 500; font-size: 11px; }
  .oa-json[open] > summary { border-bottom: 1px solid #e9ebef; }
  .oa-json pre { direction: ltr; text-align: left; margin: 0; color: #454c56; background: #f8f9fa; max-height: 460px; overflow: auto; padding: 17px; font: 12px/1.7 ui-monospace, SFMono-Regular, Consolas, monospace; }

  @media (max-width: 1150px) {
    .oa-main { padding-inline: 22px; }
    .oa-kpis { grid-template-columns: repeat(2,minmax(0,1fr)); }
    .oa-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
    .oa-panel--wide { grid-column: span 2; }
    .oa-panel--full { grid-column: 1 / -1; }
    .oa-coordinate { justify-content: center; }
  }
  @media (max-width: 760px) {
    .oa-main { padding: 16px 14px 58px; }
    .oa-hero { padding: 23px 20px; border-radius: 18px; grid-template-columns: minmax(0,1fr); gap: 18px; margin-bottom: 14px; }
    .oa-hero h1 { font-size: clamp(22px,5.3vw,28px); }
    .oa-hero__desc { font-size: 12px; }
    .oa-run { padding: 12px 15px; }
    .oa-run__title { margin-bottom: 5px; }
    .oa-kpis { gap: 9px; margin-bottom: 14px; }
    .oa-kpi { padding: 15px 14px; border-radius: 14px; }
    .oa-kpi__label { font-size: 11px; }
    .oa-kpi__mark { width: 26px; height: 26px; }
    .oa-kpi__value { font-size: clamp(20px,5.4vw,27px); }
    .oa-kpi__detail { font-size: 10px; }
    .oa-grid { display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px; }
    .oa-panel { padding: 18px 15px; border-radius: 16px; width: 100%; }
    .oa-panel__title { font-size: 17px; }
    .oa-panel__desc { font-size: 11px; }
    .oa-panel__head { margin-bottom: 15px; }
    .oa-histogram { height: 194px; gap: 5px; padding: 13px 10px 11px; min-width: max(100%, 370px); }
    .oa-quartiles { gap: 5px; }
    .oa-quartile { padding: 8px 3px; border-radius: 8px; }
    .oa-quartile span { font-size: 9px; }
    .oa-quartile strong { font-size: 13px; }
    .oa-donut { height: 154px; width: 154px; }
    .oa-clean-flow { gap: 8px; grid-template-columns: repeat(2,minmax(0,1fr)); }
    .oa-clean-step { padding: 13px; }
    .oa-clean-step strong { font-size: 21px; }
    .oa-dictionaries { grid-template-columns: 1fr; }
    .oa-table-scroll { display: none; }
    .oa-mobile-sort { display: flex; gap: 9px; align-items: stretch; margin: 10px 0 14px; }
    .oa-mobile-sort label { flex: 1; min-width: 0; display: flex; align-items: center; gap: 7px; background: #fff; border: 1px solid #e6e9ed; border-radius: 11px; padding: 0 10px; }
    .oa-mobile-sort label span { font-size: 11px; color: #67707b; white-space: nowrap; }
    .oa-mobile-sort select { flex: 1; color: #252933; background: none; border: none; outline: none; min-width: 0; height: 43px; font-size: 12px; }
    .oa-mobile-sort button { background: #f7f4f9; color: #66308d; border: 1px solid #ece3f2; border-radius: 11px; padding: 0 12px; font-size: 12px; font-weight: 700; cursor: pointer; min-height: 43px; }
    .oa-mobile-areas { display: grid; grid-template-columns: 1fr; gap: 10px; }
    .oa-area-card { border: 1px solid #ebedf0; background: #fff; border-radius: 13px; padding: 15px; }
    .oa-area-card__head { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 13px; }
    .oa-area-card__name { font-weight: 850; font-size: 14px; color: #23262c; }
    .oa-area-card__badge { font-size: 10px; background: #f4f5f7; border-radius: 99px; padding: 3px 9px; color: #555e69; white-space: nowrap; }
    .oa-area-card__metrics { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; }
    .oa-area-card__metric { border-radius: 9px; padding: 9px 10px; background: #f7f8fa; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .oa-area-card__metric span { font-size: 10px; color: #707884; }
    .oa-area-card__metric strong { font-weight: 800; color: #272c32; font-size: 12px; overflow-wrap: anywhere; }
    .oa-area-card__metric--wide { grid-column: 1 / -1; }
    .oa-area-card__metric--positive strong { color: #14785f; }
    .oa-area-card__metric--negative strong { color: #b6404b; }
    .oa-methodology { padding: 17px; gap: 10px; border-radius: 14px; }
    .oa-methodology__icon { width: 32px; height: 32px; }
    .oa-json > summary { padding: 15px; }
    .oa-json > summary small { display: none; }
  }
  @media (max-width: 380px) {
    .oa-main { padding-inline: 11px; }
    .oa-hero { padding: 20px 16px; }
    .oa-kpi { padding: 13px 11px; }
    .oa-kpi__value { font-size: 20px; }
    .oa-panel { padding: 17px 12px; }
    .oa-quartile strong { font-size: 12px; }
    .oa-run__item > strong { max-width: 66%; }
  }
  @media (prefers-reduced-motion: reduce) {
    .owj-analytics *, .owj-analytics *::before, .owj-analytics *::after {
      transition-duration: .01ms !important;
      animation-duration: .01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

const BAND_LABELS = {
  "top-tier": "درجه یک",
  "strong-buy": "خرید قوی",
  solid: "مطمئن",
  watchlist: "لیست پایش",
  hold: "نگهداری",
  avoid: "اجتناب",
  review: "بازبینی",
  excellent: "عالی",
  good: "خوب",
  medium: "متوسط",
  low: "پایین",
};

const REJECTION_LABELS = {
  "missing-price": "قیمت ناموجود",
  "missing-area": "متراژ ناموجود",
  "missing-location": "موقعیت ناموجود",
  "outlier-price": "قیمت پرت",
  "outlier-area": "متراژ پرت",
  "invalid-coordinates": "مختصات نامعتبر",
  duplicate: "تکراری",
  "insufficient-data": "داده ناکافی",
};

const IMPUTATION_LABELS = {
  floor: "طبقه",
  totalFloors: "تعداد طبقات",
  rooms: "اتاق‌ها",
  constructionYear: "سال ساخت",
  buildingAge: "سن بنا",
  unitsPerFloor: "واحد در طبقه",
  elevator: "آسانسور",
  parking: "پارکینگ",
  warehouse: "انباری",
  balcony: "بالکن",
};

function translateKey(key, dict) {
  return dict[key] || key.replaceAll("-", " ");
}

// Localize numeric *text* only; the API, sort values and raw JSON stay untouched.
function displayDigits(value) {
  if (value === null || value === undefined) return "—";
  return String(value).replace(/[0-9\u0660-\u0669]/g, (digit) => {
    const code = digit.charCodeAt(0);
    return String.fromCharCode(
      0x06f0 + (code >= 0x0660 ? code - 0x0660 : code - 48),
    );
  });
}

function ValidationCard({ label, value, detail, tone = "cyan" }) {
  const iconName =
    { cyan: "database", green: "check", orange: "activity", violet: "trend" }[
      tone
    ] || "database";
  return (
    <article className={`oa-kpi oa-kpi--${tone}`}>
      <div className="oa-kpi__top">
        <span className="oa-kpi__label">{label}</span>
        <span className="oa-kpi__mark" aria-hidden="true">
          <Icon name={iconName} size={16} />
        </span>
      </div>
      <strong className="oa-kpi__value">{displayDigits(value)}</strong>
      <small className="oa-kpi__detail">{displayDigits(detail)}</small>
      <span className="oa-kpi__rule" aria-hidden="true" />
    </article>
  );
}

function Dictionary({ title, values, dict }) {
  const entries = Object.entries(values || {}).sort((a, b) => b[1] - a[1]);
  const maxVal = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="oa-dictionary">
      <h3>{title}</h3>
      <div className="oa-dictionary__items">
        {entries.map(([key, value]) => (
          <div className="oa-dictionary__row" key={key}>
            <div className="oa-dictionary__line">
              <span>{translateKey(key, dict || {})}</span>
              <strong>{formatNumber(value)}</strong>
            </div>
            <div className="oa-dictionary__track" aria-hidden="true">
              <span
                className="oa-dictionary__fill"
                style={{ width: `${(value / maxVal) * 100}%` }}
              />
            </div>
          </div>
        ))}
        {!entries.length && <div className="oa-empty">موردی ثبت نشده است.</div>}
      </div>
    </div>
  );
}

function Panel({ children, wide = false, full = false }) {
  return (
    <section
      className={`oa-panel${full ? " oa-panel--full" : wide ? " oa-panel--wide" : ""}`}
    >
      {children}
    </section>
  );
}

function CompactHeading({ kicker, title, description }) {
  return (
    <div className="oa-panel__head">
      <span className="oa-panel__eyebrow">{kicker}</span>
      <h2 className="oa-panel__title">{title}</h2>
      {description && <p className="oa-panel__desc">{description}</p>}
    </div>
  );
}

const NEIGHBORHOOD_COLUMNS = [
  ["name", "محله"],
  ["count", "آگهی"],
  ["averageScore", "میانگین امتیاز"],
  ["property", "میانگین ملک"],
  ["risk", "میانگین ریسک"],
  ["highRisk", "ریسک بالا"],
  ["confidence", "میانگین اطمینان"],
  ["price", "میانگین قیمت / متر"],
  ["discount", "میانگین تخفیف مدل"],
];

export default function ScoringAnalyticsPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const neighborhoodTable = useTableView(data?.neighborhoods || [], {
    searchText: (row) => row.name,
    columns: {
      name: (row) => row.name,
      count: (row) => row.count,
      averageScore: (row) => row.averageScore,
      property: (row) => row.averagePropertyQuality,
      risk: (row) => row.averageRisk,
      highRisk: (row) => row.highRiskCount,
      confidence: (row) => row.averageConfidence,
      price: (row) => row.averageAskingPricePerMeter,
      discount: (row) => row.averageModelDiscountPct,
    },
    initialSort: { key: "count", direction: "desc" },
  });

  useEffect(() => {
    const controller = new AbortController();
    fetch("/score-analytics-data", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok)
          throw new Error(`Server returned HTTP ${response.status}`);
        return response.json();
      })
      .then(setData)
      .catch((caught) => {
        if (caught.name !== "AbortError") setError(caught.message);
      });
    return () => controller.abort();
  }, []);

  if (!data && !error)
    return <LoadingPage message="در حال ساخت نمای کلی امتیازدهی" />;
  if (error) return <ErrorPage message={error} />;

  const validation = data.valuationValidation || data.modelValidation;
  const cleaning = data.cleaning;
  const maxBin = Math.max(
    ...data.distributions.histogram.map((bin) => bin.count),
    1,
  );

  const bandColors = {
    "top-tier": C.green,
    excellent: C.green,
    "strong-buy": C.secondaryDark,
    good: C.secondaryDark,
    solid: C.primary,
    medium: C.primary,
    watchlist: C.orange,
    hold: C.orange,
    avoid: C.red,
    low: C.red,
    review: C.red,
  };

  return (
    <div className="owj-analytics" dir="rtl">
      <style>{PAGE_CSS}</style>
      <AppHeader active="analytics" />

      <main className="oa-main" id="main-content">
        <header className="oa-hero">
          <div>
            <span className="oa-hero__eyebrow">
              <Icon name="trend" size={16} /> تحلیل هوشمند بازار ·{" "}
              {displayDigits(data.scoringVersion)}
            </span>
            <h1>
              تحلیل <span>امتیازدهی آگهی‌ها</span>
            </h1>
            <p className="oa-hero__desc">
              عملکرد مدل را در تمام آگهی‌ها بررسی کنید؛ از دقت برآورد و توزیع
              امتیازها تا کیفیت اطلاعات، مختصات و مقایسه محله‌ها. این تحلیل بر
              اساس
              <strong> {formatNumber(data.total)} </strong> آگهی امتیازدهی‌شده
              است.
            </p>
          </div>
          <aside className="oa-run" aria-label="جزئیات اجرای امتیازدهی">
            <div className="oa-run__title">
              <Icon name="database" size={17} /> جزئیات گزارش
            </div>
            <div className="oa-run__item">
              <span>آخرین بروزرسانی</span>
              <strong>{formatTime(data.generatedAt)}</strong>
            </div>
            <div className="oa-run__item">
              <span>روش اعتبارسنجی</span>
              <strong className="oa-run__method">
                {displayDigits(validation.method?.replaceAll("-", " ") || "—")}
              </strong>
            </div>
          </aside>
        </header>

        <section className="oa-kpis" aria-label="شاخص‌های اصلی امتیازدهی">
          <ValidationCard
            label="آگهی‌های امتیازدهی‌شده"
            value={formatNumber(data.total)}
            detail={`${formatNumber(cleaning.rejectedCount)} مورد قبل از امتیازدهی رد شد`}
          />
          <ValidationCard
            label="خطای میانه ترکیبی"
            value={formatPercent(validation.medianAbsolutePercentageError)}
            detail={`مدل پایه: ${formatPercent(data.modelValidation.medianAbsolutePercentageError)}`}
            tone="orange"
          />
          <ValidationCard
            label="در محدوده ±۲۰٪"
            value={formatPercent(validation.within20Percent)}
            detail={`${formatPercent(validation.within30Percent)} در محدوده ±۳۰٪ قرار دارند`}
            tone="green"
          />
          <ValidationCard
            label="R² مقیاس لگاریتمی"
            value={validation.rSquaredLog}
            detail={`${formatNumber(data.distributions.highRiskCount)} آگهی با ریسک بالا علامت‌گذاری شد`}
            tone="violet"
          />
        </section>

        <div className="oa-grid">
          <Panel wide>
            <CompactHeading
              kicker="نگاه به توزیع"
              title="امتیازهای پیشنهاد نهایی"
              description="این نمودار نشان می‌دهد چه تعداد آگهی در هر بازه امتیازی قرار گرفته‌اند؛ پراکندگی امتیازها به تحلیل رفتار مدل کمک می‌کند."
            />
            <div
              className="oa-chart-shell"
              role="group"
              aria-label="هیستوگرام امتیاز آگهی‌ها؛ مقادیر روی هر ستون نمایش داده شده‌اند"
            >
              <div className="oa-histogram">
                {data.distributions.histogram.map((bin) => {
                  const heightPct = Math.max(2, (bin.count / maxBin) * 100);
                  return (
                    <div
                      className="oa-histogram__bin"
                      key={bin.label}
                      title={`${displayDigits(bin.label)}: ${formatNumber(bin.count)} آگهی`}
                    >
                      <span className="oa-histogram__count">
                        {formatNumber(bin.count)}
                      </span>
                      <div className="oa-histogram__track">
                        <i
                          className="oa-histogram__bar"
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                      <small className="oa-histogram__label">
                        {displayDigits(bin.label)}
                      </small>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="oa-quartiles"
              aria-label="شاخص‌های خلاصه توزیع امتیاز"
            >
              {[
                ["حداقل", data.distributions.score.minimum],
                ["P۱۰", data.distributions.score.p10],
                ["میانه", data.distributions.score.median],
                ["P۹۰", data.distributions.score.p90],
                ["حداکثر", data.distributions.score.maximum],
              ].map(([label, value], index) => (
                <div
                  className={`oa-quartile${index === 2 ? " oa-quartile--median" : ""}`}
                  key={label}
                >
                  <span>{label}</span>
                  <strong>{displayDigits(value)}</strong>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <CompactHeading
              kicker="تفکیک نتایج"
              title="محدوده‌های امتیاز"
              description="سهم هر دسته از آگهی‌های ارزیابی‌شده"
            />
            <div className="oa-bandlist">
              {data.distributions.bands.map((band) => {
                const color = bandColors[band.key] || C.primary;
                return (
                  <div
                    className="oa-band"
                    key={band.key}
                    style={{ "--band": color }}
                  >
                    <div className="oa-band__top">
                      <strong className="oa-band__label">
                        {BAND_LABELS[band.key] || band.label}
                      </strong>
                      <strong className="oa-band__count">
                        {formatNumber(band.count)}
                      </strong>
                    </div>
                    <div className="oa-band__meta">
                      <span>
                        از {displayDigits(band.minimum)} تا{" "}
                        {displayDigits(band.maximum)}
                      </span>
                      <span>{formatPercent(band.percentage)}</span>
                    </div>
                    <div
                      className="oa-band__track"
                      aria-label={`${formatPercent(band.percentage)} از کل`}
                    >
                      <i
                        className="oa-band__fill"
                        style={{ width: `${band.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel>
            <CompactHeading
              kicker="دقت داده‌های مکانی"
              title="کیفیت مختصات"
              description="مقایسه موقعیت‌های دقیق با موقعیت‌های تقریبی"
            />
            <div className="oa-coordinate">
              <div
                className="oa-donut"
                style={{
                  background: `conic-gradient(${C.secondary} 0 ${data.coordinates.exactPercentage}%, #edaa71 ${data.coordinates.exactPercentage}% 100%)`,
                }}
                role="img"
                aria-label={`${formatPercent(data.coordinates.exactPercentage)} از مختصات دقیق هستند`}
              >
                <div className="oa-donut__inside">
                  <strong>
                    {formatPercent(data.coordinates.exactPercentage)}
                  </strong>
                  <span>مختصات دقیق</span>
                </div>
              </div>
              <div className="oa-legend">
                <div className="oa-legend__row">
                  <span
                    className="oa-legend__dot"
                    style={{ background: C.secondary }}
                  />
                  <span>موقعیت دقیق</span>
                  <strong>{formatNumber(data.coordinates.exact)}</strong>
                </div>
                <div className="oa-legend__row">
                  <span
                    className="oa-legend__dot"
                    style={{ background: "#edaa71" }}
                  />
                  <span>موقعیت تقریبی</span>
                  <strong>{formatNumber(data.coordinates.approximate)}</strong>
                </div>
              </div>
            </div>
          </Panel>

          <Panel wide>
            <CompactHeading
              kicker="کیفیت ورودی"
              title="مسیر پاک‌سازی آگهی‌ها"
              description="رکوردهای ردشده امتیاز نمی‌گیرند. اطلاعات اختیاریِ ناموجود با مقادیر جایگزین تکمیل می‌شوند و اطمینان به کیفیت داده را کاهش می‌دهند."
            />
            <div
              className="oa-clean-flow"
              aria-label="خلاصه مراحل پاک‌سازی داده‌ها"
            >
              <div className="oa-clean-step">
                <span>ورودی خام</span>
                <strong>{formatNumber(cleaning.inputCount)}</strong>
              </div>
              <div className="oa-clean-step oa-clean-step--accepted">
                <span>پذیرفته‌شده</span>
                <strong>{formatNumber(cleaning.acceptedCount)}</strong>
              </div>
              <div className="oa-clean-step oa-clean-step--scored">
                <span>امتیازدهی‌شده</span>
                <strong>{formatNumber(data.total)}</strong>
              </div>
              <div className="oa-clean-step oa-clean-step--rejected">
                <span>ردشده</span>
                <strong>{formatNumber(cleaning.rejectedCount)}</strong>
              </div>
            </div>
            <div className="oa-dictionaries">
              <Dictionary
                title="دلایل رد شدن"
                values={cleaning.rejectionCounts}
                dict={REJECTION_LABELS}
              />
              <Dictionary
                title={`جایگزینی اطلاعات · ${formatNumber(cleaning.recordsWithImputation)} رکورد`}
                values={cleaning.imputationCounts}
                dict={IMPUTATION_LABELS}
              />
            </div>
          </Panel>

          <Panel full>
            <div className="oa-neighborhood-head">
              <CompactHeading
                kicker="تحلیل محلی"
                title="مقایسه عملکرد در محله‌ها"
                description="فقط محله‌هایی با حداقل پنج آگهی پذیرفته‌شده نمایش داده می‌شوند. میانگین‌ها نماینده نمونه جمع‌آوری‌شده‌اند، نه همه معاملات تهران."
              />
              <span className="oa-neighborhood-count">
                <Icon name="location" size={14} />{" "}
                {formatNumber(neighborhoodTable.rows.length)} محله
              </span>
            </div>
            <div className="oa-tools">
              <TableTools
                query={neighborhoodTable.query}
                setQuery={neighborhoodTable.setQuery}
                count={neighborhoodTable.rows.length}
                placeholder="جستجوی محله…"
              />
            </div>

            <div
              className="oa-table-scroll"
              role="region"
              aria-label="جدول قابل پیمایش نتایج محله‌ها"
              tabIndex={0}
            >
              <table className="oa-table">
                <thead>
                  <tr>
                    {NEIGHBORHOOD_COLUMNS.map(([key, title]) => (
                      <SortableTh
                        key={key}
                        column={key}
                        sort={neighborhoodTable.sort}
                        onSort={neighborhoodTable.changeSort}
                        style={{ textAlign: "right", whiteSpace: "nowrap" }}
                      >
                        {title}
                      </SortableTh>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!neighborhoodTable.rows.length && (
                    <tr>
                      <td colSpan="9" className="oa-empty">
                        نتیجه‌ای مطابق جستجو پیدا نشد.
                      </td>
                    </tr>
                  )}
                  {neighborhoodTable.rows.map((area) => (
                    <tr key={area.name}>
                      <td>
                        <strong>{area.name}</strong>
                      </td>
                      <td>{formatNumber(area.count)}</td>
                      <td>
                        <span
                          className={`oa-score-pill ${area.averageScore >= 80 ? "oa-score-pill--good" : area.averageScore >= 55 ? "oa-score-pill--medium" : "oa-score-pill--low"}`}
                        >
                          {displayDigits(area.averageScore)}
                        </span>
                      </td>
                      <td>{formatNumber(area.averagePropertyQuality)}</td>
                      <td>{formatNumber(area.averageRisk)}</td>
                      <td
                        className={
                          area.highRiskCount > 0 ? "oa-table__risk" : ""
                        }
                      >
                        {formatNumber(area.highRiskCount)}
                      </td>
                      <td>{formatPercent(area.averageConfidence)}</td>
                      <td className="oa-table__value">
                        {formatMoney(area.averageAskingPricePerMeter)}
                      </td>
                      <td
                        className={
                          area.averageModelDiscountPct >= 0
                            ? "oa-discount--positive"
                            : "oa-discount--negative"
                        }
                      >
                        <bdi>
                          {formatPercent(area.averageModelDiscountPct, true)}
                        </bdi>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="oa-mobile-sort"
              aria-label="مرتب‌سازی نتایج محله‌ها در موبایل"
            >
              <label>
                <span>مرتب‌سازی</span>
                <select
                  aria-label="انتخاب معیار مرتب‌سازی"
                  value={neighborhoodTable.sort.key}
                  onChange={(event) =>
                    neighborhoodTable.changeSort(event.target.value)
                  }
                >
                  {NEIGHBORHOOD_COLUMNS.map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() =>
                  neighborhoodTable.changeSort(neighborhoodTable.sort.key)
                }
                aria-label="تغییر جهت مرتب‌سازی"
              >
                {neighborhoodTable.sort.direction === "desc"
                  ? "نزولی ↓"
                  : "صعودی ↑"}
              </button>
            </div>

            <div
              className="oa-mobile-areas"
              aria-label="کارت‌های اطلاعات محله‌ها"
            >
              {!neighborhoodTable.rows.length && (
                <div className="oa-empty">نتیجه‌ای مطابق جستجو پیدا نشد.</div>
              )}
              {neighborhoodTable.rows.map((area) => (
                <article className="oa-area-card" key={area.name}>
                  <div className="oa-area-card__head">
                    <h3 className="oa-area-card__name" dir="auto">
                      {area.name}
                    </h3>
                    <span className="oa-area-card__badge">
                      {formatNumber(area.count)} آگهی
                    </span>
                  </div>
                  <div className="oa-area-card__metrics">
                    <div className="oa-area-card__metric">
                      <span>میانگین امتیاز</span>
                      <strong>{displayDigits(area.averageScore)}</strong>
                    </div>
                    <div className="oa-area-card__metric">
                      <span>کیفیت ملک</span>
                      <strong>
                        {formatNumber(area.averagePropertyQuality)}
                      </strong>
                    </div>
                    <div className="oa-area-card__metric">
                      <span>میانگین ریسک</span>
                      <strong>{formatNumber(area.averageRisk)}</strong>
                    </div>
                    <div className="oa-area-card__metric">
                      <span>آگهی با ریسک بالا</span>
                      <strong>{formatNumber(area.highRiskCount)}</strong>
                    </div>
                    <div className="oa-area-card__metric">
                      <span>میانگین اطمینان</span>
                      <strong>{formatPercent(area.averageConfidence)}</strong>
                    </div>
                    <div
                      className={`oa-area-card__metric ${area.averageModelDiscountPct >= 0 ? "oa-area-card__metric--positive" : "oa-area-card__metric--negative"}`}
                    >
                      <span>میانگین تخفیف مدل</span>
                      <strong>
                        {formatPercent(area.averageModelDiscountPct, true)}
                      </strong>
                    </div>
                    <div className="oa-area-card__metric oa-area-card__metric--wide">
                      <span>میانگین قیمت هر متر</span>
                      <strong>
                        {formatMoney(area.averageAskingPricePerMeter)}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        </div>

        <section
          className="oa-methodology"
          aria-label="روش‌شناسی و محدودیت‌های این تحلیل"
        >
          <span className="oa-methodology__icon" aria-hidden="true">
            <Icon name="alert" size={18} />
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2>این آمار را چطور تفسیر کنیم؟</h2>
            <p>{data.methodology.limitations.join(" ")}</p>
            <code dir="ltr">
              {displayDigits(data.methodology.recommendationFormula)}
            </code>
          </div>
        </section>

        <details className="oa-json">
          <summary>
            <span>
              <Icon name="database" size={18} /> داده خام تحلیل امتیازدهی (JSON)
            </span>
            <small>مشاهده پاسخ اصلی API</small>
          </summary>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </details>
      </main>
      <AppFooter />
    </div>
  );
}
