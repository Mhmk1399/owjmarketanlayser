import{i as e,r as t}from"./index-CWwU0uhc.js";import{a as n,l as r,n as i,p as a,t as o}from"./shared-fIOWw8eQ.js";var s=e(),c=t(),l={description:`توضیحات عمومی`,coordinates:`مختصات معتبر`,images:`تصویر`,"advertiser-classified":`نوع آگهی‌دهنده مشخص`,"nearby-places":`مکان‌های اطراف`},u={"not-scoring-ready":`کیفیت داده برای امتیازدهی کافی نیست`,"missing-or-out-of-bounds-coordinates":`مختصات مفقود یا خارج از تهران`,"invalid-or-implausible-area":`متراژ نامعتبر یا غیرمنطقی`,"invalid-or-implausible-price":`قیمت نامعتبر یا غیرمنطقی`,"invalid-or-implausible-price-per-meter":`قیمت هر متر نامعتبر یا غیرمنطقی`,"subcategory-out-of-scope":`نوع ملک خارج از محدوده مدل`,"listing-removed":`آگهی حذف شده`},d={personal:`شخصی`,"real-estate-business":`مشاور املاک`,unknown:`نامشخص`};function f(e){let t=Number(e);return Number.isFinite(t)?new Intl.NumberFormat(`fa-IR`,{minimumFractionDigits:1,maximumFractionDigits:1}).format(t):`—`}var p=`
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
`;function m({children:e}){return(0,c.jsxs)(`div`,{className:`owj-quality`,dir:`rtl`,children:[(0,c.jsx)(`style`,{children:p}),(0,c.jsx)(i,{active:`quality`}),e]})}function h({label:e,value:t,note:n,tone:i=`neutral`}){return(0,c.jsxs)(`article`,{className:`quality-metric quality-metric--${i}`,children:[(0,c.jsx)(`span`,{className:`quality-metric__label`,children:e}),(0,c.jsx)(`strong`,{className:`quality-metric__value`,children:r(t)}),(0,c.jsx)(`small`,{className:`quality-metric__note`,children:n})]})}function g(){a();let[e,t]=(0,s.useState)(null),[i,p]=(0,s.useState)(``);if((0,s.useEffect)(()=>{let e=new AbortController;return fetch(`/data-quality-data`,{signal:e.signal}).then(e=>e.ok?e.json():Promise.reject(Error(`HTTP ${e.status}`))).then(t).catch(e=>{e.name!==`AbortError`&&p(e.message)}),()=>e.abort()},[]),!e&&!i)return(0,c.jsx)(m,{children:(0,c.jsx)(`main`,{className:`quality-main`,id:`main-content`,children:(0,c.jsxs)(`div`,{className:`quality-state`,role:`status`,"aria-busy":`true`,children:[(0,c.jsx)(`span`,{className:`quality-state__icon`,"aria-hidden":`true`,children:(0,c.jsx)(`span`,{className:`quality-state__spinner`})}),(0,c.jsx)(`h1`,{children:`در حال محاسبه خط پایه کیفیت داده…`}),(0,c.jsx)(`p`,{children:`اطلاعات پوشش و کیفیت آگهی‌ها در حال بارگذاری است.`})]})})});if(i)return(0,c.jsx)(m,{children:(0,c.jsx)(`main`,{className:`quality-main`,id:`main-content`,children:(0,c.jsxs)(`div`,{className:`quality-state quality-state--error`,role:`alert`,children:[(0,c.jsx)(`span`,{className:`quality-state__icon`,"aria-hidden":`true`,children:(0,c.jsx)(n,{name:`alert`,size:26})}),(0,c.jsx)(`h1`,{children:`محاسبه کیفیت داده ناموفق بود`}),(0,c.jsx)(`p`,{children:i})]})})});let g=Object.fromEntries(e.classifications.advertiser.map(e=>[e.key,e.count]));return(0,c.jsxs)(m,{children:[(0,c.jsxs)(`main`,{className:`quality-main`,id:`main-content`,children:[(0,c.jsxs)(`header`,{className:`quality-hero`,children:[(0,c.jsxs)(`div`,{className:`quality-hero__content`,children:[(0,c.jsxs)(`span`,{className:`quality-kicker`,children:[(0,c.jsx)(n,{name:`activity`,size:16}),` خط پایه فاز صفر`]}),(0,c.jsx)(`h1`,{children:`کنترل کیفیت و پوشش داده`}),(0,c.jsx)(`p`,{children:`این صفحه منبع واحد اندازه‌گیری برای بک‌فیل، طبقه‌بندی و افزایش پوشش امتیازدهی است.`})]}),(0,c.jsxs)(`div`,{className:`quality-updated`,children:[(0,c.jsxs)(`span`,{className:`quality-updated__label`,children:[(0,c.jsx)(`span`,{className:`quality-updated__dot`,"aria-hidden":`true`}),`آخرین محاسبه`]}),(0,c.jsx)(`time`,{dateTime:e.generatedAt,children:new Date(e.generatedAt).toLocaleString(`fa-IR`)})]})]}),(0,c.jsxs)(`nav`,{className:`quality-quicknav`,"aria-label":`دسترسی سریع به بخش‌های گزارش`,children:[(0,c.jsx)(`a`,{href:`#quality-summary`,children:`شاخص‌های اصلی`}),(0,c.jsx)(`a`,{href:`#quality-coverage`,children:`پوشش فیلدها`}),(0,c.jsx)(`a`,{href:`#quality-advertisers`,children:`نوع آگهی‌دهنده`}),(0,c.jsx)(`a`,{href:`#quality-blockers`,children:`موانع امتیازدهی`}),(0,c.jsx)(`a`,{href:`#quality-health`,children:`سلامت خروجی`})]}),(0,c.jsxs)(`div`,{className:`quality-section-intro`,id:`quality-summary`,children:[(0,c.jsx)(`h2`,{children:`وضعیت داده‌ها در یک نگاه`}),(0,c.jsx)(`p`,{children:`شاخص‌های اصلی کیفیت`})]}),(0,c.jsxs)(`section`,{className:`quality-metrics`,"aria-label":`شاخص‌های اصلی`,children:[(0,c.jsx)(h,{label:`کل آگهی‌ها`,value:e.inventory.total,note:`${r(e.inventory.active)} آگهی فعال`}),(0,c.jsx)(h,{label:`واجد شرایط امتیاز`,value:e.scoring.eligible,note:`طبق قوانین فعلی پاک‌سازی`,tone:`good`}),(0,c.jsx)(h,{label:`امتیاز ثبت‌شده`,value:e.scoring.totalScored,note:`${r(e.scoring.populationCoveragePercent)}٪ از کل داده · ${r(e.scoring.coveragePercent)}٪ از واجدین`,tone:e.scoring.populationCoveragePercent>=95?`good`:`warn`}),(0,c.jsx)(h,{label:`کل آگهی‌های بدون امتیاز`,value:e.scoring.unscoredTotal,note:`${f((100-e.scoring.populationCoveragePercent).toFixed(1))}٪ از کل داده`,tone:e.scoring.unscoredTotal?`warn`:`good`}),(0,c.jsx)(h,{label:`واجد شرایط ولی بدون امتیاز`,value:e.scoring.eligibleUnscored,note:`خطای همگام‌سازی پایپ‌لاین`,tone:e.scoring.eligibleUnscored?`warn`:`good`}),(0,c.jsx)(h,{label:`تغییر از آخرین امتیازدهی`,value:e.scoring.staleListingsSinceScore,note:`آگهی جدید یا به‌روزشده`,tone:e.scoring.staleListingsSinceScore?`warn`:`good`})]}),(0,c.jsxs)(`div`,{className:`quality-layout`,children:[(0,c.jsxs)(`section`,{className:`quality-panel`,id:`quality-coverage`,"aria-labelledby":`coverage-title`,children:[(0,c.jsxs)(`div`,{className:`quality-panel__head`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h2`,{id:`coverage-title`,children:`پوشش فیلدهای کلیدی`}),(0,c.jsx)(`p`,{children:`فاصله دقیق هر بخش تا پوشش کامل`})]}),(0,c.jsx)(`span`,{className:`quality-panel__icon`,"aria-hidden":`true`,children:(0,c.jsx)(n,{name:`check`,size:19})})]}),(0,c.jsx)(`div`,{className:`quality-coverage`,children:e.coverage.map(e=>(0,c.jsxs)(`article`,{className:`quality-coverage__row`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`strong`,{className:`quality-coverage__label`,children:l[e.key]||e.key}),(0,c.jsxs)(`span`,{className:`quality-coverage__meta`,children:[r(e.count),` موجود ·`,` `,r(e.missing),` مفقود`]})]}),(0,c.jsxs)(`b`,{className:`quality-coverage__percent`,children:[r(e.percent),`٪`]}),(0,c.jsx)(`div`,{className:`quality-bar`,role:`progressbar`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":e.percent,"aria-label":`${l[e.key]||e.key}: ${r(e.percent)} درصد`,children:(0,c.jsx)(`span`,{style:{width:`${e.percent}%`}})})]},e.key))})]}),(0,c.jsxs)(`section`,{className:`quality-panel`,id:`quality-advertisers`,"aria-labelledby":`advertiser-title`,children:[(0,c.jsxs)(`div`,{className:`quality-panel__head`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h2`,{id:`advertiser-title`,children:`نوع آگهی‌دهنده`}),(0,c.jsx)(`p`,{children:`هدف فاز طبقه‌بندی: کاهش موارد نامشخص`})]}),(0,c.jsx)(`span`,{className:`quality-panel__icon`,"aria-hidden":`true`,children:(0,c.jsx)(n,{name:`building`,size:19})})]}),(0,c.jsx)(`div`,{className:`quality-classifications`,children:[`personal`,`real-estate-business`,`unknown`].map(t=>{let n=((g[t]||0)/e.inventory.total*100).toFixed(1);return(0,c.jsxs)(`div`,{className:`quality-classifications__item`,children:[(0,c.jsxs)(`div`,{className:`quality-classifications__top`,children:[(0,c.jsx)(`span`,{className:`quality-classifications__title`,children:d[t]}),(0,c.jsx)(`strong`,{className:`quality-classifications__count`,children:r(g[t]||0)})]}),(0,c.jsxs)(`div`,{className:`quality-classifications__footer`,children:[(0,c.jsxs)(`span`,{className:`quality-classifications__percentage`,children:[f(n),`٪ از کل`]}),(0,c.jsx)(`div`,{className:`quality-classifications__bar`,"aria-hidden":`true`,children:(0,c.jsx)(`i`,{style:{width:`${Number.isFinite(Number(n))?n:0}%`}})})]})]},t)})})]}),(0,c.jsxs)(`section`,{className:`quality-panel quality-panel--wide`,id:`quality-blockers`,"aria-labelledby":`blockers-title`,children:[(0,c.jsxs)(`div`,{className:`quality-panel__head quality-panel__head--wrap`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h2`,{id:`blockers-title`,children:`دلایل حذف از امتیازدهی`}),(0,c.jsx)(`p`,{children:`یک آگهی ممکن است بیش از یک مانع داشته باشد.`})]}),(0,c.jsxs)(`span`,{className:`quality-status`,children:[`وضعیت پایپ‌لاین: `,(0,c.jsx)(`b`,{dir:`auto`,children:e.scoring.pipelineStatus})]})]}),(0,c.jsx)(`div`,{className:`quality-table-wrap`,children:(0,c.jsxs)(`table`,{className:`quality-table`,children:[(0,c.jsx)(`thead`,{children:(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`th`,{scope:`col`,children:`مانع`}),(0,c.jsx)(`th`,{scope:`col`,children:`تعداد`}),(0,c.jsx)(`th`,{scope:`col`,children:`درصد کل داده`})]})}),(0,c.jsxs)(`tbody`,{children:[e.blockers.map(e=>(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:(0,c.jsxs)(`div`,{className:`quality-table__reason`,children:[(0,c.jsx)(`strong`,{children:u[e.reason]||e.reason}),(0,c.jsx)(`code`,{children:e.reason})]})}),(0,c.jsx)(`td`,{"data-label":`تعداد`,children:(0,c.jsx)(`span`,{className:`quality-table__number`,children:r(e.count)})}),(0,c.jsx)(`td`,{"data-label":`درصد کل داده`,children:(0,c.jsxs)(`span`,{className:`quality-table__percent`,children:[r(e.percent),`٪`]})})]},e.reason)),!e.blockers.length&&(0,c.jsx)(`tr`,{children:(0,c.jsx)(`td`,{colSpan:3,className:`quality-empty`,children:`مانعی برای نمایش ثبت نشده است.`})})]})]})})]}),(0,c.jsxs)(`section`,{className:`quality-panel quality-panel--wide`,id:`quality-health`,"aria-labelledby":`health-title`,children:[(0,c.jsxs)(`div`,{className:`quality-panel__head`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h2`,{id:`health-title`,children:`سلامت خروجی امتیازدهی`}),(0,c.jsx)(`p`,{children:`اختلاف میان وضعیت فعلی MongoDB و آخرین فایل امتیازدهی`})]}),(0,c.jsx)(`span`,{className:`quality-panel__icon`,"aria-hidden":`true`,children:(0,c.jsx)(n,{name:`database`,size:19})})]}),(0,c.jsxs)(`dl`,{className:`quality-facts`,children:[(0,c.jsxs)(`div`,{className:`quality-facts__item`,children:[(0,c.jsx)(`dt`,{children:`زمان آخرین امتیازدهی`}),(0,c.jsx)(`dd`,{children:e.scoring.generatedAt?new Date(e.scoring.generatedAt).toLocaleString(`fa-IR`):`اجرا نشده`})]}),(0,c.jsxs)(`div`,{className:`quality-facts__item`,children:[(0,c.jsx)(`dt`,{children:`واجد شرایط و امتیازدار`}),(0,c.jsx)(`dd`,{children:r(e.scoring.eligibleScored)})]}),(0,c.jsxs)(`div`,{className:`quality-facts__item`,children:[(0,c.jsx)(`dt`,{children:`امتیاز قدیمی ولی اکنون غیرواجد`}),(0,c.jsx)(`dd`,{children:r(e.scoring.scoredButCurrentlyIneligible)})]}),(0,c.jsxs)(`div`,{className:`quality-facts__item`,children:[(0,c.jsx)(`dt`,{children:`آخرین مشاهده داده`}),(0,c.jsx)(`dd`,{children:e.inventory.latestListingAt?new Date(e.inventory.latestListingAt).toLocaleString(`fa-IR`):`—`})]})]})]})]})]}),(0,c.jsx)(o,{})]})}export{g as default};