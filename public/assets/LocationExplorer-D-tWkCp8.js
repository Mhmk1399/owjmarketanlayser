import{i as e,r as t}from"./index-CWwU0uhc.js";import{a as n,c as r,l as i,n as a,p as o,s}from"./shared-fIOWw8eQ.js";var c=e(),l=t(),u={0:`کشور`,1:`استان`,2:`شهر`,4:`محله / منطقه`};function d(e){return String(e??``).replace(/[0-9]/g,e=>`۰۱۲۳۴۵۶۷۸۹`[Number(e)])}var f=`
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
  .owj-location-page input:focus-visible,
  .owj-location-page button:focus-visible {
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
    padding: 0;
    background: #fff;
    border: 1px solid #e9ebef;
    border-radius: 17px;
    box-shadow: 0 2px 12px rgba(24,31,41,.018);
    transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
  }
  .owj-location-page .place-card__link {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    padding: 20px 22px 18px;
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
  .owj-location-page .place-card__action-wrap {
    padding: 0 22px 18px;
  }
  .owj-location-page .place-card__crawl-button {
    width: 100%;
    min-height: 44px;
    padding: 8px 12px;
    border: 1px solid #e1d2ea;
    border-radius: 11px;
    background: #f7f2fa;
    color: #66308d;
    font: inherit;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    transition: background .18s ease, border-color .18s ease, color .18s ease;
  }
  .owj-location-page .place-card__crawl-button:hover:not(:disabled) {
    background: #efe4f5;
    border-color: #cdb3dc;
  }
  .owj-location-page .place-card__crawl-button:disabled {
    cursor: wait;
    opacity: .72;
  }
  .owj-location-page .place-card__job-status {
    display: block;
    min-height: 24px;
    margin-top: 7px;
    color: #646975;
    font-size: 11px;
    line-height: 1.8;
  }
  .owj-location-page .place-card__job-status--error { color: #a23a45; }
  .owj-location-page .place-card__job-status--success { color: #167665; }

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
      border-radius: 15px;
    }
    .owj-location-page .place-card__link { padding: 17px 18px 16px; }
    .owj-location-page .place-card__action-wrap { padding: 0 18px 16px; }
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
`;function p({label:e,value:t,accent:n=s.text}){return(0,l.jsxs)(`article`,{className:`location-stat`,children:[(0,l.jsx)(`span`,{children:e}),(0,l.jsx)(`strong`,{style:{color:n},children:t})]})}function m({data:e,total:t}){let n=[[`strong`,`قوی`,s.green],[`promising`,`امیدبخش`,s.secondary],[`fair`,`متوسط`,s.orange],[`weak`,`ضعیف`,s.red],[`unscored`,`بدون امتیاز`,s.textMuted]];return(0,l.jsxs)(`section`,{className:`score-distribution`,"aria-label":`توزیع امتیاز آگهی‌ها`,children:[(0,l.jsxs)(`div`,{className:`score-distribution__head`,children:[(0,l.jsx)(`h2`,{children:`توزیع امتیاز آگهی‌ها`}),(0,l.jsx)(`small`,{children:`پراکندگی آگهی‌ها بر اساس امتیاز`})]}),(0,l.jsx)(`div`,{className:`score-distribution__bar`,children:n.map(([n,r,a])=>e?.[n]?(0,l.jsx)(`span`,{title:`${r}: ${i(e[n])}`,style:{width:`${e[n]/Math.max(t,1)*100}%`,background:a}},n):null)}),(0,l.jsx)(`div`,{className:`score-distribution__legend`,children:n.map(([t,n,r])=>(0,l.jsxs)(`span`,{children:[(0,l.jsx)(`i`,{style:{background:r}}),n,`: `,i(e?.[t]||0)]},t))})]})}function h({slug:e=`iran`}){o();let[t,h]=(0,c.useState)(null),[g,_]=(0,c.useState)(null),[v,y]=(0,c.useState)(``),[b,x]=(0,c.useState)({}),S=(0,c.useCallback)(async t=>{let n=await fetch(`/locations/${encodeURIComponent(e)}`,{signal:t,headers:{accept:`application/json`}});if(!n.ok)throw Error(`HTTP ${n.status}`);let r=await n.json();h(r),_(null)},[e]);(0,c.useEffect)(()=>{let e=new AbortController;return h(null),_(null),S(e.signal).catch(e=>{e.name!==`AbortError`&&_(e.message)}),()=>e.abort()},[S]);let C=(0,c.useMemo)(()=>Object.values(b).filter(e=>e.job?.jobId&&[`queued`,`starting`,`discovering`,`processing`].includes(e.job.status)).map(e=>e.job.jobId).sort(),[b]),w=C.join(`,`);(0,c.useEffect)(()=>{if(!w)return;let e=new AbortController,t=async()=>{let t=!1;await Promise.all(C.map(async n=>{try{let r=await fetch(`/area-crawl-jobs/${encodeURIComponent(n)}`,{signal:e.signal,headers:{accept:`application/json`}});if(!r.ok)return;let{job:i}=await r.json();x(e=>({...e,[i.area.id]:{job:i,error:i.status===`failed`||i.status===`stopped`?`جستجوی محله کامل نشد؛ می‌توانید دوباره تلاش کنید.`:null}})),[`completed`,`failed`,`stopped`].includes(i.status)&&(t=!0)}catch(e){e.name!==`AbortError`&&x(e=>{let t=Object.keys(e).find(t=>e[t].job?.jobId===n);return t?{...e,[t]:{...e[t],error:`وضعیت کار قابل دریافت نیست؛ دوباره تلاش می‌شود.`}}:e})}})),t&&S(e.signal).catch(()=>{})};t();let n=window.setInterval(()=>void t(),3e3);return()=>{e.abort(),window.clearInterval(n)}},[w,S]);let T=(0,c.useCallback)(async e=>{x(t=>({...t,[e.id]:{submitting:!0,job:null,error:null}}));try{let t=await fetch(`/area-crawl-jobs`,{method:`POST`,headers:{"content-type":`application/json`,accept:`application/json`},body:JSON.stringify({areaId:e.id})}),n=await t.json();if(!t.ok){let t=n.reason===`area-job-cooldown`?`این محله به‌تازگی بررسی شده است؛ برای جلوگیری از درخواست تکراری کمی بعد دوباره تلاش کنید.`:n.reason===`platform-cooldown`?`خزش به‌دلیل محدودیت منبع موقتاً متوقف است.`:`ساخت کار جستجوی محله ناموفق بود؛ دوباره تلاش کنید.`;x(r=>({...r,[e.id]:{job:n.job||null,error:t}}));return}x(t=>({...t,[e.id]:{job:n.job,error:null}}))}catch{x(t=>({...t,[e.id]:{job:null,error:`ارتباط با سرویس برقرار نشد؛ دوباره تلاش کنید.`}}))}},[]),E=(0,c.useMemo)(()=>{let e=v.trim().toLocaleLowerCase(`fa`);return(t?.children||[]).filter(t=>!e||`${t.name} ${t.slug}`.toLocaleLowerCase(`fa`).includes(e))},[t,v]);return(0,l.jsxs)(`div`,{className:`location-page owj-location-page`,dir:`rtl`,children:[(0,l.jsx)(`style`,{children:f}),(0,l.jsx)(a,{active:`locations`}),(0,l.jsxs)(`main`,{className:`location-main`,children:[!t&&!g&&(0,l.jsxs)(`div`,{className:`location-state`,role:`status`,"aria-live":`polite`,children:[(0,l.jsxs)(`div`,{className:`location-state__dots`,"aria-hidden":`true`,children:[(0,l.jsx)(`span`,{}),(0,l.jsx)(`span`,{}),(0,l.jsx)(`span`,{})]}),`در حال بارگذاری سلسله‌مراتب رسمی مناطق…`]}),g&&(0,l.jsxs)(`div`,{className:`location-state location-state--error`,role:`alert`,children:[`بارگذاری ناموفق بود: `,d(g)]}),t&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`nav`,{className:`breadcrumbs`,"aria-label":`مسیر مکان`,children:t.breadcrumb.map((e,n)=>(0,l.jsxs)(`span`,{children:[n>0&&(0,l.jsx)(`b`,{"aria-hidden":`true`,children:`‹`}),(0,l.jsx)(`a`,{href:`/explore/${e.slug}`,"aria-current":e.id===t.node.id?`page`:void 0,children:d(e.name)})]},e.id))}),(0,l.jsxs)(`header`,{className:`location-hero`,children:[(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(`span`,{className:`location-kicker`,children:[(0,l.jsx)(n,{name:`location`,size:17}),` `,u[t.node.type]]}),(0,l.jsx)(`h1`,{children:d(t.node.name)}),(0,l.jsx)(`p`,{children:`کاوش آگهی‌ها بر پایه سلسله‌مراتب رسمی دیوار، از استان و شهر تا محله.`})]}),t.node.slug!==`tehran`&&(0,l.jsxs)(`a`,{className:`tehran-shortcut`,href:`/explore/tehran`,children:[`رفتن مستقیم به تهران`,(0,l.jsx)(n,{name:`arrow`,size:16})]})]}),(0,l.jsxs)(`section`,{className:`location-stats`,"aria-label":`خلاصه بازار`,children:[(0,l.jsx)(p,{label:`تعداد آگهی`,value:i(t.summary.listingCount),accent:s.secondaryDark}),(0,l.jsx)(p,{label:`میانه قیمت`,value:r(t.summary.medianPrice)}),(0,l.jsx)(p,{label:`میانه هر متر`,value:r(t.summary.medianPricePerMeter)}),(0,l.jsx)(p,{label:`میانگین امتیاز`,value:t.summary.averageScore===null?`—`:i(t.summary.averageScore),accent:s.primaryPale})]}),(0,l.jsx)(m,{data:t.summary.scoreDistribution,total:t.summary.listingCount}),!!t.children.length&&(0,l.jsxs)(`section`,{className:`location-section`,children:[(0,l.jsxs)(`div`,{className:`location-section__head`,children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`span`,{children:`سطح بعدی`}),(0,l.jsx)(`h2`,{children:t.node.type===`1`?`شهرها`:t.node.type===`2`?`محله‌ها و مناطق`:`استان‌ها`})]}),(0,l.jsxs)(`label`,{className:`location-search`,children:[(0,l.jsx)(`span`,{className:`sr-only`,children:`جستجوی مکان`}),(0,l.jsx)(n,{name:`location`,size:17}),(0,l.jsx)(`input`,{value:v,onChange:e=>y(e.target.value),placeholder:`جستجوی نام یا شناسه…`})]})]}),(0,l.jsx)(`div`,{className:`place-grid`,children:E.map(e=>{let a=b[e.id]||{},o=a.submitting||[`queued`,`starting`,`discovering`,`processing`].includes(a.job?.status),s=a.job?.status===`completed`;return(0,l.jsxs)(`article`,{className:`place-card`,children:[(0,l.jsxs)(`a`,{className:`place-card__link`,href:`/explore/${e.slug}`,children:[(0,l.jsxs)(`div`,{className:`place-card__top`,children:[(0,l.jsxs)(`span`,{className:`place-card__type`,children:[(0,l.jsx)(n,{name:`location`,size:15}),u[e.type]]}),(0,l.jsx)(`span`,{className:`place-card__arrow`,children:(0,l.jsx)(n,{name:`arrow`,size:16})})]}),(0,l.jsx)(`h3`,{children:d(e.name)}),(0,l.jsx)(`small`,{className:`place-card__slug`,children:d(e.slug)}),(0,l.jsxs)(`div`,{className:`place-card__bottom`,children:[(0,l.jsxs)(`div`,{className:`place-card__count`,children:[(0,l.jsx)(`strong`,{children:i(e.summary.listingCount)}),(0,l.jsx)(`span`,{children:`آگهی`})]}),(0,l.jsxs)(`small`,{className:`place-card__price`,children:[r(e.summary.medianPricePerMeter),` / متر`]})]})]}),t.node.type===`2`&&e.type===`4`&&(0,l.jsxs)(`div`,{className:`place-card__action-wrap`,children:[(0,l.jsx)(`button`,{className:`place-card__crawl-button`,type:`button`,disabled:o,"aria-busy":o?`true`:void 0,onClick:()=>void T(e),children:a.submitting?`در حال ساخت کار…`:a.job?.status===`queued`?`در صف اولویت خزش…`:o?`در حال جستجوی این محله…`:e.summary.listingCount===0?`یافتن آگهی‌های این محله`:`به‌روزرسانی این محله`}),(0,l.jsx)(`span`,{className:`place-card__job-status${a.error?` place-card__job-status--error`:s?` place-card__job-status--success`:``}`,role:a.error?`alert`:`status`,"aria-live":`polite`,children:a.error||(s?`${i(a.job.successful)} آگهی بررسی شد؛ ${i(a.job.newListings)} مورد تازه بود.`:a.job?.status===`queued`?a.job.stage===`enrichment`?`اطلاعات فایل‌های موجود پس از کشف محله‌ها و فایل‌های تازه تکمیل می‌شود.`:`درخواست با اولویت در صف ذخیره شده است؛ وضعیت به‌روزرسانی می‌شود.`:o&&a.job?`${i(a.job.processed)} از ${i(a.job.discovered)} آگهی بررسی شده است.`:``)})]})]},e.id)})}),!E.length&&(0,l.jsx)(`div`,{className:`location-empty`,children:`مکانی مطابق جستجو پیدا نشد.`})]}),(0,l.jsxs)(`section`,{className:`location-section`,children:[(0,l.jsxs)(`div`,{className:`location-section__head`,children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`span`,{children:`آگهی‌های منطبق`}),(0,l.jsx)(`h2`,{children:`فهرست آگهی‌ها`})]}),(0,l.jsx)(`small`,{children:`حداکثر ۲۰۰ مورد تازه در این نما`})]}),(0,l.jsxs)(`div`,{className:`location-listings`,children:[t.listings.map(e=>(0,l.jsxs)(`a`,{className:`location-listing`,href:`/listing/${e.token}`,children:[(0,l.jsxs)(`div`,{className:`location-listing__main`,children:[(0,l.jsx)(`h3`,{children:d(e.title)}),(0,l.jsxs)(`p`,{children:[(0,l.jsx)(n,{name:`location`,size:14}),d(e.resolvedLocation?.name||e.neighborhood||`مکان نامشخص`),` `,`· `,i(e.area),` متر`]})]}),(0,l.jsxs)(`div`,{className:`location-listing__prices`,children:[(0,l.jsx)(`strong`,{children:r(e.price)}),(0,l.jsxs)(`span`,{children:[r(e.pricePerMeter),` / متر`]})]}),(0,l.jsxs)(`div`,{className:`location-listing__score-wrap`,children:[(0,l.jsx)(`span`,{children:`امتیاز`}),(0,l.jsx)(`b`,{className:`location-score`,children:e.score===null?`—`:i(e.score)})]})]},e.token)),!t.listings.length&&(0,l.jsx)(`div`,{className:`location-empty`,children:`هنوز آگهی منطبق برای این مکان ذخیره نشده است.`})]})]})]})]})]})}export{h as default};