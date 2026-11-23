import{i as e,n as t,r as n}from"./index-CWwU0uhc.js";var r=e(),i=n(),a=new Intl.NumberFormat(`fa-IR`),o=new Intl.NumberFormat(`fa-IR`,{useGrouping:!1}),s=new Intl.NumberFormat(`fa-IR`,{maximumFractionDigits:1}),c=new Intl.DateTimeFormat(`fa-IR`,{dateStyle:`medium`,timeStyle:`short`,timeZone:`Asia/Tehran`});function l(e){return Number.isFinite(e)?a.format(e):`—`}function u(e){return Number.isFinite(e)?o.format(e):`—`}function d(e,t=!1){return Number.isFinite(e)?`${t&&e>0?`+`:``}${s.format(e)}٪`:`—`}function f(e){return Number.isFinite(e)?Math.abs(e)>=1e9?`${s.format(e/1e9)} میلیارد تومان`:Math.abs(e)>=1e6?`${s.format(e/1e6)} میلیون تومان`:`${l(e)} تومان`:`—`}function p(e){let t=new Date(e);return e&&!Number.isNaN(t.valueOf())?c.format(t):`—`}var m={primary:`#66308d`,primaryLight:`#74479a`,primaryPale:`#82569f`,primaryGlow:`rgba(102,48,141,0.12)`,primaryBg:`#f4eef8`,primaryBg2:`#e9daef`,secondary:`#01ae9b`,secondaryLight:`#28c1ae`,secondaryDark:`#087a6e`,secondaryGlow:`rgba(1,174,155,0.10)`,secondaryBg:`#e8f8f5`,secondaryBg2:`#d2f0e9`,bg:`#f7f8fa`,bgGradient:`linear-gradient(180deg, #ffffff 0%, #f7f8fa 56%, #f7f8fa 100%)`,surface:`#ffffff`,surfaceLight:`#fbfbfc`,surfaceHover:`#f8f7fa`,surfaceGlass:`rgba(255,255,255,0.96)`,raised:`#f5f6f8`,border:`#edeef1`,borderMed:`#e7e8ec`,borderLight:`#dcdfe5`,text:`#202127`,textSec:`#60646e`,textMuted:`#6b707b`,white:`#17191f`,green:`#14785f`,greenBg:`#eaf7f0`,greenBg2:`#d6eee2`,orange:`#a9661b`,orangeBg:`#fff5e8`,orangeBg2:`#ffebcd`,red:`#b6404b`,redBg:`#fff0f1`,redBg2:`#f9dbde`,radius:18,radiusSm:13,radiusXs:10,shadow:`0 4px 22px rgba(24,31,41,0.035), 0 1px 3px rgba(24,31,41,0.025)`,shadowLg:`0 12px 34px rgba(24,31,41,0.07)`},h=`
  @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap');

  :root { --font-family: 'Vazirmatn', Tahoma, sans-serif; }
  *, *::before, *::after { box-sizing: border-box; }
  html, body {
    background: ${m.bg};
    font-family: var(--font-family);
    color: ${m.text};
    direction: rtl;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body { margin: 0; }
  body[data-analytics-can-operate="false"] .place-card__crawl-button { display: none !important; }
  input, button, select, textarea { font-family: inherit; }
  button, a { -webkit-tap-highlight-color: transparent; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #dfe1e7; border-radius: 99px; }

  .owj-app-header {
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    background: ${m.surfaceGlass};
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid ${m.border};
  }
  .owj-app-header__inner {
    display: flex;
    align-items: center;
    gap: 26px;
    width: 100%;
    max-width: 1440px;
    min-height: 76px;
    margin: 0 auto;
    padding: 12px 28px;
    direction: rtl;
  }
  .owj-app-header__brand {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    min-width: max-content;
    flex: none;
    text-decoration: none;
    color: ${m.text};
  }
  .owj-app-header__logo {
    display: grid;
    place-items: center;
    width: 43px;
    height: 43px;
    border: 1px solid ${m.primaryBg2};
    border-radius: 14px;
    background: ${m.primaryBg};
    color: ${m.primary};
    flex: none;
  }
  .owj-app-header__brand-copy { display: flex; flex-direction: column; gap: 2px; line-height: 1.35; }
  .owj-app-header__brand-copy strong { font-weight: 900; font-size: 18px; color: ${m.white}; }
  .owj-app-header__brand-copy small { font-weight: 500; font-size: 11px; color: ${m.textMuted}; }
  .owj-app-header__nav {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    min-width: 0;
    width: 100%;
  }
  .owj-app-header__nav-scroll {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    min-width: 0;
    overflow-x: auto;
    padding-block: 3px;
    scrollbar-width: thin;
    scrollbar-color: ${m.borderLight} transparent;
    overscroll-behavior-inline: contain;
  }
  .owj-app-header__nav-scroll::-webkit-scrollbar { height: 4px; }
  .owj-app-header__link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 43px;
    padding: 9px 14px;
    border-radius: 11px;
    border: 1px solid transparent;
    color: ${m.textSec};
    text-decoration: none;
    white-space: nowrap;
    flex: none;
    font-size: 13px;
    font-weight: 600;
    transition: background .18s ease, color .18s ease, border-color .18s ease;
  }
  .owj-app-header__link:hover {
    color: ${m.primary};
    background: ${m.primaryBg};
  }
  .owj-app-header__link[aria-current="page"] {
    color: ${m.primary};
    border-color: ${m.primaryBg2};
    background: ${m.primaryBg};
    font-weight: 800;
  }
  .owj-app-header__link:focus-visible,
  .owj-app-header__brand:focus-visible,
  .owj-page-error__back:focus-visible {
    outline: 3px solid rgba(102,48,141,.28);
    outline-offset: 3px;
  }

  .owj-app-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px 20px;
    max-width: 1440px;
    margin: 0 auto;
    padding: 23px 28px 34px;
    border-top: 1px solid ${m.border};
    color: ${m.textMuted};
    font-size: 12px;
    line-height: 1.9;
    direction: rtl;
  }
  .owj-app-footer strong { color: ${m.text}; font-weight: 800; }

  .owj-page-state {
    min-height: 100svh;
    padding: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${m.bgGradient};
    color: ${m.text};
    direction: rtl;
    text-align: center;
  }
  .owj-page-state__card {
    width: 100%;
    max-width: 480px;
    padding: clamp(25px, 6vw, 44px) 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 17px;
    background: ${m.surface};
    border: 1px solid ${m.border};
    border-radius: 24px;
    box-shadow: ${m.shadow};
    animation: owjFadeIn .28s ease both;
  }
  .owj-page-state__icon {
    width: 68px;
    height: 68px;
    display: grid;
    place-items: center;
    border-radius: 20px;
    background: ${m.primaryBg};
    color: ${m.primary};
    border: 1px solid ${m.primaryBg2};
  }
  .owj-page-state__icon--error {
    color: ${m.red};
    background: ${m.redBg};
    border-color: ${m.redBg2};
  }
  .owj-page-state h1 {
    margin: 0;
    font-weight: 800;
    font-size: clamp(19px, 4vw, 23px);
    line-height: 1.7;
  }
  .owj-page-state p {
    margin: 0;
    color: ${m.textSec};
    font-size: 13px;
    line-height: 1.95;
    max-width: 390px;
    overflow-wrap: anywhere;
  }
  .owj-page-state__dots { display: flex; align-items: center; gap: 7px; min-height: 14px; }
  .owj-page-state__dots span {
    display: block;
    width: 8px;
    height: 8px;
    background: ${m.primary};
    border-radius: 50%;
    animation: owjDot 1.3s ease-in-out infinite;
  }
  .owj-page-state__dots span:nth-child(2) {
    background: ${m.secondary};
    animation-delay: .16s;
  }
  .owj-page-state__dots span:nth-child(3) { animation-delay: .32s; }
  .owj-page-error__message {
    padding: 12px 16px;
    border: 1px solid ${m.border};
    border-radius: 12px;
    background: ${m.raised};
  }
  .owj-page-error__back {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 48px;
    padding: 12px 22px;
    margin-top: 5px;
    background: ${m.primary};
    color: #fff;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 700;
    font-size: 13px;
    transition: background .2s ease;
  }
  .owj-page-error__back:hover { background: #552676; }

  @keyframes owjPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: .5; transform: scale(1.15); }
  }
  @keyframes owjFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  @keyframes owjDot {
    0%, 80%, 100% { transform: scale(.6); opacity: .3; }
    40% { transform: scale(1); opacity: 1; }
  }
  @keyframes owjSlideUp {
    from { opacity: 0; transform: translateY(9px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes owjFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes owjSpin { to { transform: rotate(360deg); } }

  @media (max-width: 970px) {
    .owj-app-header__inner { flex-wrap: wrap; row-gap: 10px; padding: 11px 20px 9px; }
    .owj-app-header__nav { order: 3; flex-basis: 100%; gap: 6px; padding: 0 0 3px; }
  }
  @media (max-width: 600px) {
    .owj-app-header__inner { padding: 10px 15px 8px; row-gap: 7px; }
    .owj-app-header__logo { width: 40px; height: 40px; border-radius: 12px; }
    .owj-app-header__brand-copy strong { font-size: 16px; }
    .owj-app-header__brand-copy small { font-size: 10px; }
    .owj-app-header__link { min-height: 41px; padding: 9px 12px; font-size: 12px; border-radius: 10px; }
    .owj-app-footer { padding: 18px 16px 28px; font-size: 11px; }
    .owj-page-state { padding: 14px; }
    .owj-page-state__card { border-radius: 19px; padding: 32px 18px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .owj-page-state__card, .owj-page-state__dots span { animation: none; }
    .owj-app-header__link { transition: none; }
  }
`,g=!1;function _(){if(g||typeof document>`u`)return;g=!0;let e=document.createElement(`style`);e.textContent=h,document.head.appendChild(e)}function v({name:e,size:t=20}){let n={activity:(0,i.jsx)(`path`,{d:`M3 12h4l2.3-7 4.4 14 2.3-7h5`}),alert:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(`path`,{d:`M12 3 2.7 19h18.6L12 3Z`}),(0,i.jsx)(`path`,{d:`M12 9v4`}),(0,i.jsx)(`path`,{d:`M12 16.5h.01`})]}),arrow:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(`path`,{d:`M5 12h14`}),(0,i.jsx)(`path`,{d:`m13 6 6 6-6 6`})]}),back:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(`path`,{d:`M19 12H5`}),(0,i.jsx)(`path`,{d:`m11 18-6-6 6-6`})]}),check:(0,i.jsx)(`path`,{d:`m5 12 4 4L19 6`}),close:(0,i.jsx)(`path`,{d:`M6 6l12 12M18 6 6 18`}),expand:(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(`path`,{d:`M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7`})}),database:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(`ellipse`,{cx:`12`,cy:`5`,rx:`8`,ry:`3`}),(0,i.jsx)(`path`,{d:`M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5`}),(0,i.jsx)(`path`,{d:`M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7`})]}),external:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(`path`,{d:`M14 5h5v5`}),(0,i.jsx)(`path`,{d:`m10 14 9-9`}),(0,i.jsx)(`path`,{d:`M19 14v5H5V5h5`})]}),location:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(`path`,{d:`M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z`}),(0,i.jsx)(`circle`,{cx:`12`,cy:`10`,r:`2.5`})]}),trend:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(`path`,{d:`m3 17 6-6 4 4 8-9`}),(0,i.jsx)(`path`,{d:`M15 6h6v6`})]}),building:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(`path`,{d:`M3 21h18`}),(0,i.jsx)(`path`,{d:`M5 21V7l8-4v18`}),(0,i.jsx)(`path`,{d:`M19 21V11l-6-4`}),(0,i.jsx)(`path`,{d:`M9 9v.01M9 12v.01M9 15v.01M9 18v.01`})]}),refresh:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(`path`,{d:`M20 7v5h-5`}),(0,i.jsx)(`path`,{d:`M4 17v-5h5`}),(0,i.jsx)(`path`,{d:`M6.1 8a7 7 0 0 1 11.7-2L20 8`}),(0,i.jsx)(`path`,{d:`m4 16 2.2 2a7 7 0 0 0 11.7-2`})]})};return(0,i.jsx)(`svg`,{width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,style:{flexShrink:0},children:(0,i.jsx)(`g`,{stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,children:n[e]||n.activity})})}var y=[{key:`listings`,label:`آگهی‌ها`,href:`/catalog`},{key:`matching`,label:`تطبیق تقاضا`,href:`/buyer-matching`},{key:`overview`,label:`نمای کلی`,href:`/`},{key:`locations`,label:`کاوش مناطق`,href:`/explore/tehran`},{key:`analytics`,label:`تحلیل امتیاز`,href:`/score-analytics`},{key:`workshop`,label:`کارگاه امتیاز`,href:`/score-workshop`},{key:`quality`,label:`کیفیت داده`,href:`/data-quality`}];function b({active:e,className:t=``}){(0,r.useEffect)(()=>{_()},[]);let n=typeof window>`u`?`/`:window.location.pathname,a=e??(n===`/catalog`||n.startsWith(`/listing/`)?`listings`:n===`/buyer-matching`?`matching`:n.startsWith(`/explore`)?`locations`:y.find(e=>e.href===n)?.key),o=e=>(0,i.jsx)(`a`,{className:`owj-app-header__link${e.key===`listings`?` owj-app-header__link--listings`:``}`,href:e.href,"aria-current":a===e.key?`page`:void 0,children:e.label},e.key);return(0,i.jsxs)(`nav`,{className:`owj-app-header__nav ${t}`.trim(),"aria-label":`ناوبری اصلی`,children:[o(y[0]),(0,i.jsx)(`div`,{className:`owj-app-header__nav-scroll`,children:y.slice(1).map(o)})]})}function x({active:e}){let{session:n,logout:r}=t();return(0,i.jsx)(`header`,{className:`owj-app-header`,children:(0,i.jsxs)(`div`,{className:`owj-app-header__inner`,children:[(0,i.jsxs)(`a`,{className:`owj-app-header__brand`,href:`/`,children:[(0,i.jsx)(`span`,{className:`owj-app-header__logo`,children:(0,i.jsx)(v,{name:`building`,size:23})}),(0,i.jsxs)(`span`,{className:`owj-app-header__brand-copy`,children:[(0,i.jsx)(`strong`,{children:`املاک اوج`}),(0,i.jsx)(`small`,{children:`رصدخانه بازار مسکن`})]})]}),(0,i.jsx)(b,{active:e}),n?(0,i.jsx)(`button`,{type:`button`,className:`owj-app-header__logout`,onClick:()=>void r(),"aria-label":`خروج از سامانه تحلیل بازار`,children:`خروج`}):null]})})}function S(){return(0,i.jsxs)(`footer`,{className:`owj-app-footer`,children:[(0,i.jsxs)(`span`,{children:[(0,i.jsx)(`strong`,{children:`املاک اوج`}),` · تحلیل بازار مسکن · فقط داده‌های عمومی`]}),(0,i.jsx)(`span`,{children:`امتیازها ابزارهای تصمیم‌گیری آزمایشی هستند، نه توصیه سرمایه‌گذاری.`})]})}function C({message:e=`در حال خواندن شواهد امتیازدهی`}){return(0,r.useEffect)(()=>{_()},[]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(x,{}),(0,i.jsx)(`main`,{className:`owj-page-state`,role:`status`,"aria-live":`polite`,children:(0,i.jsxs)(`section`,{className:`owj-page-state__card`,children:[(0,i.jsx)(`div`,{className:`owj-page-state__icon`,children:(0,i.jsx)(v,{name:`building`,size:33})}),(0,i.jsx)(`div`,{className:`owj-page-state__dots`,"aria-hidden":`true`,children:[0,1,2].map(e=>(0,i.jsx)(`span`,{},e))}),(0,i.jsx)(`h1`,{children:e}),(0,i.jsx)(`p`,{children:`در حال بارگذاری JSON امتیازدهی تولیدشده از سرور.`})]})})]})}function w({message:e}){return(0,r.useEffect)(()=>{_()},[]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(x,{}),(0,i.jsx)(`main`,{className:`owj-page-state`,children:(0,i.jsxs)(`section`,{className:`owj-page-state__card`,children:[(0,i.jsx)(`span`,{className:`owj-page-state__icon owj-page-state__icon--error`,children:(0,i.jsx)(v,{name:`alert`,size:30})}),(0,i.jsx)(`h1`,{children:`این صفحه بارگذاری نشد`}),(0,i.jsx)(`p`,{className:`owj-page-error__message`,role:`alert`,children:e}),(0,i.jsxs)(`a`,{className:`owj-page-error__back`,href:`/`,children:[(0,i.jsx)(v,{name:`back`,size:18}),`بازگشت به نمای کلی`]})]})})]})}export{v as a,f as c,p as d,u as f,w as i,l,x as n,C as o,_ as p,b as r,m as s,S as t,d as u};