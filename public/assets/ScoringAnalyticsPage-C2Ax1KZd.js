import{i as e,r as t}from"./index-CWwU0uhc.js";import{a as n,c as r,d as i,i as a,l as o,n as s,o as c,t as l,u}from"./shared-fIOWw8eQ.js";import{n as d,r as f,t as p}from"./tableTools-DLfOmmgB.js";var m=e(),h=t(),g={primary:`#66308d`,primaryMuted:`#f4eef8`,secondary:`#01ae9b`,secondaryDark:`#087f73`,secondaryMuted:`#e9f8f5`,green:`#14785f`,greenMuted:`#eaf7f0`,orange:`#ae6c27`,orangeMuted:`#fff5e8`,red:`#b6404b`,redMuted:`#fff0f1`,gray:`#777e89`},_=`
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
`,v={"top-tier":`درجه یک`,"strong-buy":`خرید قوی`,solid:`مطمئن`,watchlist:`لیست پایش`,hold:`نگهداری`,avoid:`اجتناب`,review:`بازبینی`,excellent:`عالی`,good:`خوب`,medium:`متوسط`,low:`پایین`},y={"missing-price":`قیمت ناموجود`,"missing-area":`متراژ ناموجود`,"missing-location":`موقعیت ناموجود`,"outlier-price":`قیمت پرت`,"outlier-area":`متراژ پرت`,"invalid-coordinates":`مختصات نامعتبر`,duplicate:`تکراری`,"insufficient-data":`داده ناکافی`},b={floor:`طبقه`,totalFloors:`تعداد طبقات`,rooms:`اتاق‌ها`,constructionYear:`سال ساخت`,buildingAge:`سن بنا`,unitsPerFloor:`واحد در طبقه`,elevator:`آسانسور`,parking:`پارکینگ`,warehouse:`انباری`,balcony:`بالکن`};function x(e,t){return t[e]||e.replaceAll(`-`,` `)}function S(e){return e==null?`—`:String(e).replace(/[0-9\u0660-\u0669]/g,e=>{let t=e.charCodeAt(0);return String.fromCharCode(1776+(t>=1632?t-1632:t-48))})}function C({label:e,value:t,detail:r,tone:i=`cyan`}){let a={cyan:`database`,green:`check`,orange:`activity`,violet:`trend`}[i]||`database`;return(0,h.jsxs)(`article`,{className:`oa-kpi oa-kpi--${i}`,children:[(0,h.jsxs)(`div`,{className:`oa-kpi__top`,children:[(0,h.jsx)(`span`,{className:`oa-kpi__label`,children:e}),(0,h.jsx)(`span`,{className:`oa-kpi__mark`,"aria-hidden":`true`,children:(0,h.jsx)(n,{name:a,size:16})})]}),(0,h.jsx)(`strong`,{className:`oa-kpi__value`,children:S(t)}),(0,h.jsx)(`small`,{className:`oa-kpi__detail`,children:S(r)}),(0,h.jsx)(`span`,{className:`oa-kpi__rule`,"aria-hidden":`true`})]})}function w({title:e,values:t,dict:n}){let r=Object.entries(t||{}).sort((e,t)=>t[1]-e[1]),i=Math.max(...r.map(([,e])=>e),1);return(0,h.jsxs)(`div`,{className:`oa-dictionary`,children:[(0,h.jsx)(`h3`,{children:e}),(0,h.jsxs)(`div`,{className:`oa-dictionary__items`,children:[r.map(([e,t])=>(0,h.jsxs)(`div`,{className:`oa-dictionary__row`,children:[(0,h.jsxs)(`div`,{className:`oa-dictionary__line`,children:[(0,h.jsx)(`span`,{children:x(e,n||{})}),(0,h.jsx)(`strong`,{children:o(t)})]}),(0,h.jsx)(`div`,{className:`oa-dictionary__track`,"aria-hidden":`true`,children:(0,h.jsx)(`span`,{className:`oa-dictionary__fill`,style:{width:`${t/i*100}%`}})})]},e)),!r.length&&(0,h.jsx)(`div`,{className:`oa-empty`,children:`موردی ثبت نشده است.`})]})]})}function T({children:e,wide:t=!1,full:n=!1}){return(0,h.jsx)(`section`,{className:`oa-panel${n?` oa-panel--full`:t?` oa-panel--wide`:``}`,children:e})}function E({kicker:e,title:t,description:n}){return(0,h.jsxs)(`div`,{className:`oa-panel__head`,children:[(0,h.jsx)(`span`,{className:`oa-panel__eyebrow`,children:e}),(0,h.jsx)(`h2`,{className:`oa-panel__title`,children:t}),n&&(0,h.jsx)(`p`,{className:`oa-panel__desc`,children:n})]})}var D=[[`name`,`محله`],[`count`,`آگهی`],[`averageScore`,`میانگین امتیاز`],[`property`,`میانگین ملک`],[`risk`,`میانگین ریسک`],[`highRisk`,`ریسک بالا`],[`confidence`,`میانگین اطمینان`],[`price`,`میانگین قیمت / متر`],[`discount`,`میانگین تخفیف مدل`]];function O(){let[e,t]=(0,m.useState)(null),[x,O]=(0,m.useState)(``),k=f(e?.neighborhoods||[],{searchText:e=>e.name,columns:{name:e=>e.name,count:e=>e.count,averageScore:e=>e.averageScore,property:e=>e.averagePropertyQuality,risk:e=>e.averageRisk,highRisk:e=>e.highRiskCount,confidence:e=>e.averageConfidence,price:e=>e.averageAskingPricePerMeter,discount:e=>e.averageModelDiscountPct},initialSort:{key:`count`,direction:`desc`}});if((0,m.useEffect)(()=>{let e=new AbortController;return fetch(`/score-analytics-data`,{signal:e.signal}).then(async e=>{if(!e.ok)throw Error(`Server returned HTTP ${e.status}`);return e.json()}).then(t).catch(e=>{e.name!==`AbortError`&&O(e.message)}),()=>e.abort()},[]),!e&&!x)return(0,h.jsx)(c,{message:`در حال ساخت نمای کلی امتیازدهی`});if(x)return(0,h.jsx)(a,{message:x});let A=e.valuationValidation||e.modelValidation,j=e.cleaning,M=Math.max(...e.distributions.histogram.map(e=>e.count),1),N={"top-tier":g.green,excellent:g.green,"strong-buy":g.secondaryDark,good:g.secondaryDark,solid:g.primary,medium:g.primary,watchlist:g.orange,hold:g.orange,avoid:g.red,low:g.red,review:g.red};return(0,h.jsxs)(`div`,{className:`owj-analytics`,dir:`rtl`,children:[(0,h.jsx)(`style`,{children:_}),(0,h.jsx)(s,{active:`analytics`}),(0,h.jsxs)(`main`,{className:`oa-main`,id:`main-content`,children:[(0,h.jsxs)(`header`,{className:`oa-hero`,children:[(0,h.jsxs)(`div`,{children:[(0,h.jsxs)(`span`,{className:`oa-hero__eyebrow`,children:[(0,h.jsx)(n,{name:`trend`,size:16}),` تحلیل هوشمند بازار ·`,` `,S(e.scoringVersion)]}),(0,h.jsxs)(`h1`,{children:[`تحلیل `,(0,h.jsx)(`span`,{children:`امتیازدهی آگهی‌ها`})]}),(0,h.jsxs)(`p`,{className:`oa-hero__desc`,children:[`عملکرد مدل را در تمام آگهی‌ها بررسی کنید؛ از دقت برآورد و توزیع امتیازها تا کیفیت اطلاعات، مختصات و مقایسه محله‌ها. این تحلیل بر اساس`,(0,h.jsxs)(`strong`,{children:[` `,o(e.total),` `]}),` آگهی امتیازدهی‌شده است.`]})]}),(0,h.jsxs)(`aside`,{className:`oa-run`,"aria-label":`جزئیات اجرای امتیازدهی`,children:[(0,h.jsxs)(`div`,{className:`oa-run__title`,children:[(0,h.jsx)(n,{name:`database`,size:17}),` جزئیات گزارش`]}),(0,h.jsxs)(`div`,{className:`oa-run__item`,children:[(0,h.jsx)(`span`,{children:`آخرین بروزرسانی`}),(0,h.jsx)(`strong`,{children:i(e.generatedAt)})]}),(0,h.jsxs)(`div`,{className:`oa-run__item`,children:[(0,h.jsx)(`span`,{children:`روش اعتبارسنجی`}),(0,h.jsx)(`strong`,{className:`oa-run__method`,children:S(A.method?.replaceAll(`-`,` `)||`—`)})]})]})]}),(0,h.jsxs)(`section`,{className:`oa-kpis`,"aria-label":`شاخص‌های اصلی امتیازدهی`,children:[(0,h.jsx)(C,{label:`آگهی‌های امتیازدهی‌شده`,value:o(e.total),detail:`${o(j.rejectedCount)} مورد قبل از امتیازدهی رد شد`}),(0,h.jsx)(C,{label:`خطای میانه ترکیبی`,value:u(A.medianAbsolutePercentageError),detail:`مدل پایه: ${u(e.modelValidation.medianAbsolutePercentageError)}`,tone:`orange`}),(0,h.jsx)(C,{label:`در محدوده ±۲۰٪`,value:u(A.within20Percent),detail:`${u(A.within30Percent)} در محدوده ±۳۰٪ قرار دارند`,tone:`green`}),(0,h.jsx)(C,{label:`R² مقیاس لگاریتمی`,value:A.rSquaredLog,detail:`${o(e.distributions.highRiskCount)} آگهی با ریسک بالا علامت‌گذاری شد`,tone:`violet`})]}),(0,h.jsxs)(`div`,{className:`oa-grid`,children:[(0,h.jsxs)(T,{wide:!0,children:[(0,h.jsx)(E,{kicker:`نگاه به توزیع`,title:`امتیازهای پیشنهاد نهایی`,description:`این نمودار نشان می‌دهد چه تعداد آگهی در هر بازه امتیازی قرار گرفته‌اند؛ پراکندگی امتیازها به تحلیل رفتار مدل کمک می‌کند.`}),(0,h.jsx)(`div`,{className:`oa-chart-shell`,role:`group`,"aria-label":`هیستوگرام امتیاز آگهی‌ها؛ مقادیر روی هر ستون نمایش داده شده‌اند`,children:(0,h.jsx)(`div`,{className:`oa-histogram`,children:e.distributions.histogram.map(e=>{let t=Math.max(2,e.count/M*100);return(0,h.jsxs)(`div`,{className:`oa-histogram__bin`,title:`${S(e.label)}: ${o(e.count)} آگهی`,children:[(0,h.jsx)(`span`,{className:`oa-histogram__count`,children:o(e.count)}),(0,h.jsx)(`div`,{className:`oa-histogram__track`,children:(0,h.jsx)(`i`,{className:`oa-histogram__bar`,style:{height:`${t}%`}})}),(0,h.jsx)(`small`,{className:`oa-histogram__label`,children:S(e.label)})]},e.label)})})}),(0,h.jsx)(`div`,{className:`oa-quartiles`,"aria-label":`شاخص‌های خلاصه توزیع امتیاز`,children:[[`حداقل`,e.distributions.score.minimum],[`P۱۰`,e.distributions.score.p10],[`میانه`,e.distributions.score.median],[`P۹۰`,e.distributions.score.p90],[`حداکثر`,e.distributions.score.maximum]].map(([e,t],n)=>(0,h.jsxs)(`div`,{className:`oa-quartile${n===2?` oa-quartile--median`:``}`,children:[(0,h.jsx)(`span`,{children:e}),(0,h.jsx)(`strong`,{children:S(t)})]},e))})]}),(0,h.jsxs)(T,{children:[(0,h.jsx)(E,{kicker:`تفکیک نتایج`,title:`محدوده‌های امتیاز`,description:`سهم هر دسته از آگهی‌های ارزیابی‌شده`}),(0,h.jsx)(`div`,{className:`oa-bandlist`,children:e.distributions.bands.map(e=>{let t=N[e.key]||g.primary;return(0,h.jsxs)(`div`,{className:`oa-band`,style:{"--band":t},children:[(0,h.jsxs)(`div`,{className:`oa-band__top`,children:[(0,h.jsx)(`strong`,{className:`oa-band__label`,children:v[e.key]||e.label}),(0,h.jsx)(`strong`,{className:`oa-band__count`,children:o(e.count)})]}),(0,h.jsxs)(`div`,{className:`oa-band__meta`,children:[(0,h.jsxs)(`span`,{children:[`از `,S(e.minimum),` تا`,` `,S(e.maximum)]}),(0,h.jsx)(`span`,{children:u(e.percentage)})]}),(0,h.jsx)(`div`,{className:`oa-band__track`,"aria-label":`${u(e.percentage)} از کل`,children:(0,h.jsx)(`i`,{className:`oa-band__fill`,style:{width:`${e.percentage}%`}})})]},e.key)})})]}),(0,h.jsxs)(T,{children:[(0,h.jsx)(E,{kicker:`دقت داده‌های مکانی`,title:`کیفیت مختصات`,description:`مقایسه موقعیت‌های دقیق با موقعیت‌های تقریبی`}),(0,h.jsxs)(`div`,{className:`oa-coordinate`,children:[(0,h.jsx)(`div`,{className:`oa-donut`,style:{background:`conic-gradient(${g.secondary} 0 ${e.coordinates.exactPercentage}%, #edaa71 ${e.coordinates.exactPercentage}% 100%)`},role:`img`,"aria-label":`${u(e.coordinates.exactPercentage)} از مختصات دقیق هستند`,children:(0,h.jsxs)(`div`,{className:`oa-donut__inside`,children:[(0,h.jsx)(`strong`,{children:u(e.coordinates.exactPercentage)}),(0,h.jsx)(`span`,{children:`مختصات دقیق`})]})}),(0,h.jsxs)(`div`,{className:`oa-legend`,children:[(0,h.jsxs)(`div`,{className:`oa-legend__row`,children:[(0,h.jsx)(`span`,{className:`oa-legend__dot`,style:{background:g.secondary}}),(0,h.jsx)(`span`,{children:`موقعیت دقیق`}),(0,h.jsx)(`strong`,{children:o(e.coordinates.exact)})]}),(0,h.jsxs)(`div`,{className:`oa-legend__row`,children:[(0,h.jsx)(`span`,{className:`oa-legend__dot`,style:{background:`#edaa71`}}),(0,h.jsx)(`span`,{children:`موقعیت تقریبی`}),(0,h.jsx)(`strong`,{children:o(e.coordinates.approximate)})]})]})]})]}),(0,h.jsxs)(T,{wide:!0,children:[(0,h.jsx)(E,{kicker:`کیفیت ورودی`,title:`مسیر پاک‌سازی آگهی‌ها`,description:`رکوردهای ردشده امتیاز نمی‌گیرند. اطلاعات اختیاریِ ناموجود با مقادیر جایگزین تکمیل می‌شوند و اطمینان به کیفیت داده را کاهش می‌دهند.`}),(0,h.jsxs)(`div`,{className:`oa-clean-flow`,"aria-label":`خلاصه مراحل پاک‌سازی داده‌ها`,children:[(0,h.jsxs)(`div`,{className:`oa-clean-step`,children:[(0,h.jsx)(`span`,{children:`ورودی خام`}),(0,h.jsx)(`strong`,{children:o(j.inputCount)})]}),(0,h.jsxs)(`div`,{className:`oa-clean-step oa-clean-step--accepted`,children:[(0,h.jsx)(`span`,{children:`پذیرفته‌شده`}),(0,h.jsx)(`strong`,{children:o(j.acceptedCount)})]}),(0,h.jsxs)(`div`,{className:`oa-clean-step oa-clean-step--scored`,children:[(0,h.jsx)(`span`,{children:`امتیازدهی‌شده`}),(0,h.jsx)(`strong`,{children:o(e.total)})]}),(0,h.jsxs)(`div`,{className:`oa-clean-step oa-clean-step--rejected`,children:[(0,h.jsx)(`span`,{children:`ردشده`}),(0,h.jsx)(`strong`,{children:o(j.rejectedCount)})]})]}),(0,h.jsxs)(`div`,{className:`oa-dictionaries`,children:[(0,h.jsx)(w,{title:`دلایل رد شدن`,values:j.rejectionCounts,dict:y}),(0,h.jsx)(w,{title:`جایگزینی اطلاعات · ${o(j.recordsWithImputation)} رکورد`,values:j.imputationCounts,dict:b})]})]}),(0,h.jsxs)(T,{full:!0,children:[(0,h.jsxs)(`div`,{className:`oa-neighborhood-head`,children:[(0,h.jsx)(E,{kicker:`تحلیل محلی`,title:`مقایسه عملکرد در محله‌ها`,description:`فقط محله‌هایی با حداقل پنج آگهی پذیرفته‌شده نمایش داده می‌شوند. میانگین‌ها نماینده نمونه جمع‌آوری‌شده‌اند، نه همه معاملات تهران.`}),(0,h.jsxs)(`span`,{className:`oa-neighborhood-count`,children:[(0,h.jsx)(n,{name:`location`,size:14}),` `,o(k.rows.length),` محله`]})]}),(0,h.jsx)(`div`,{className:`oa-tools`,children:(0,h.jsx)(d,{query:k.query,setQuery:k.setQuery,count:k.rows.length,placeholder:`جستجوی محله…`})}),(0,h.jsx)(`div`,{className:`oa-table-scroll`,role:`region`,"aria-label":`جدول قابل پیمایش نتایج محله‌ها`,tabIndex:0,children:(0,h.jsxs)(`table`,{className:`oa-table`,children:[(0,h.jsx)(`thead`,{children:(0,h.jsx)(`tr`,{children:D.map(([e,t])=>(0,h.jsx)(p,{column:e,sort:k.sort,onSort:k.changeSort,style:{textAlign:`right`,whiteSpace:`nowrap`},children:t},e))})}),(0,h.jsxs)(`tbody`,{children:[!k.rows.length&&(0,h.jsx)(`tr`,{children:(0,h.jsx)(`td`,{colSpan:`9`,className:`oa-empty`,children:`نتیجه‌ای مطابق جستجو پیدا نشد.`})}),k.rows.map(e=>(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{children:(0,h.jsx)(`strong`,{children:e.name})}),(0,h.jsx)(`td`,{children:o(e.count)}),(0,h.jsx)(`td`,{children:(0,h.jsx)(`span`,{className:`oa-score-pill ${e.averageScore>=80?`oa-score-pill--good`:e.averageScore>=55?`oa-score-pill--medium`:`oa-score-pill--low`}`,children:S(e.averageScore)})}),(0,h.jsx)(`td`,{children:o(e.averagePropertyQuality)}),(0,h.jsx)(`td`,{children:o(e.averageRisk)}),(0,h.jsx)(`td`,{className:e.highRiskCount>0?`oa-table__risk`:``,children:o(e.highRiskCount)}),(0,h.jsx)(`td`,{children:u(e.averageConfidence)}),(0,h.jsx)(`td`,{className:`oa-table__value`,children:r(e.averageAskingPricePerMeter)}),(0,h.jsx)(`td`,{className:e.averageModelDiscountPct>=0?`oa-discount--positive`:`oa-discount--negative`,children:(0,h.jsx)(`bdi`,{children:u(e.averageModelDiscountPct,!0)})})]},e.name))]})]})}),(0,h.jsxs)(`div`,{className:`oa-mobile-sort`,"aria-label":`مرتب‌سازی نتایج محله‌ها در موبایل`,children:[(0,h.jsxs)(`label`,{children:[(0,h.jsx)(`span`,{children:`مرتب‌سازی`}),(0,h.jsx)(`select`,{"aria-label":`انتخاب معیار مرتب‌سازی`,value:k.sort.key,onChange:e=>k.changeSort(e.target.value),children:D.map(([e,t])=>(0,h.jsx)(`option`,{value:e,children:t},e))})]}),(0,h.jsx)(`button`,{type:`button`,onClick:()=>k.changeSort(k.sort.key),"aria-label":`تغییر جهت مرتب‌سازی`,children:k.sort.direction===`desc`?`نزولی ↓`:`صعودی ↑`})]}),(0,h.jsxs)(`div`,{className:`oa-mobile-areas`,"aria-label":`کارت‌های اطلاعات محله‌ها`,children:[!k.rows.length&&(0,h.jsx)(`div`,{className:`oa-empty`,children:`نتیجه‌ای مطابق جستجو پیدا نشد.`}),k.rows.map(e=>(0,h.jsxs)(`article`,{className:`oa-area-card`,children:[(0,h.jsxs)(`div`,{className:`oa-area-card__head`,children:[(0,h.jsx)(`h3`,{className:`oa-area-card__name`,dir:`auto`,children:e.name}),(0,h.jsxs)(`span`,{className:`oa-area-card__badge`,children:[o(e.count),` آگهی`]})]}),(0,h.jsxs)(`div`,{className:`oa-area-card__metrics`,children:[(0,h.jsxs)(`div`,{className:`oa-area-card__metric`,children:[(0,h.jsx)(`span`,{children:`میانگین امتیاز`}),(0,h.jsx)(`strong`,{children:S(e.averageScore)})]}),(0,h.jsxs)(`div`,{className:`oa-area-card__metric`,children:[(0,h.jsx)(`span`,{children:`کیفیت ملک`}),(0,h.jsx)(`strong`,{children:o(e.averagePropertyQuality)})]}),(0,h.jsxs)(`div`,{className:`oa-area-card__metric`,children:[(0,h.jsx)(`span`,{children:`میانگین ریسک`}),(0,h.jsx)(`strong`,{children:o(e.averageRisk)})]}),(0,h.jsxs)(`div`,{className:`oa-area-card__metric`,children:[(0,h.jsx)(`span`,{children:`آگهی با ریسک بالا`}),(0,h.jsx)(`strong`,{children:o(e.highRiskCount)})]}),(0,h.jsxs)(`div`,{className:`oa-area-card__metric`,children:[(0,h.jsx)(`span`,{children:`میانگین اطمینان`}),(0,h.jsx)(`strong`,{children:u(e.averageConfidence)})]}),(0,h.jsxs)(`div`,{className:`oa-area-card__metric ${e.averageModelDiscountPct>=0?`oa-area-card__metric--positive`:`oa-area-card__metric--negative`}`,children:[(0,h.jsx)(`span`,{children:`میانگین تخفیف مدل`}),(0,h.jsx)(`strong`,{children:u(e.averageModelDiscountPct,!0)})]}),(0,h.jsxs)(`div`,{className:`oa-area-card__metric oa-area-card__metric--wide`,children:[(0,h.jsx)(`span`,{children:`میانگین قیمت هر متر`}),(0,h.jsx)(`strong`,{children:r(e.averageAskingPricePerMeter)})]})]})]},e.name))]})]})]}),(0,h.jsxs)(`section`,{className:`oa-methodology`,"aria-label":`روش‌شناسی و محدودیت‌های این تحلیل`,children:[(0,h.jsx)(`span`,{className:`oa-methodology__icon`,"aria-hidden":`true`,children:(0,h.jsx)(n,{name:`alert`,size:18})}),(0,h.jsxs)(`div`,{style:{minWidth:0,flex:1},children:[(0,h.jsx)(`h2`,{children:`این آمار را چطور تفسیر کنیم؟`}),(0,h.jsx)(`p`,{children:e.methodology.limitations.join(` `)}),(0,h.jsx)(`code`,{dir:`ltr`,children:S(e.methodology.recommendationFormula)})]})]}),(0,h.jsxs)(`details`,{className:`oa-json`,children:[(0,h.jsxs)(`summary`,{children:[(0,h.jsxs)(`span`,{children:[(0,h.jsx)(n,{name:`database`,size:18}),` داده خام تحلیل امتیازدهی (JSON)`]}),(0,h.jsx)(`small`,{children:`مشاهده پاسخ اصلی API`})]}),(0,h.jsx)(`pre`,{children:JSON.stringify(e,null,2)})]})]}),(0,h.jsx)(l,{})]})}export{O as default};