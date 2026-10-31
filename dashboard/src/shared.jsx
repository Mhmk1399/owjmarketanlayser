"use client";

import { useEffect } from "react";

/*
 * OWJ shared UI
 * Design only: the exported functions, formatting rules and route targets are
 * kept compatible with the original shared.jsx.
 */

/* Formatters — original calculations and signatures preserved. */
export const numberFormat = new Intl.NumberFormat("fa-IR");

export const decimalFormat = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 1,
});

const dateTime = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});

export function formatNumber(value) {
  return Number.isFinite(value) ? numberFormat.format(value) : "—";
}

export function formatPercent(value, signed = false) {
  if (!Number.isFinite(value)) return "—";
  return `${signed && value > 0 ? "+" : ""}${decimalFormat.format(value)}٪`;
}

export function formatMoney(value) {
  if (!Number.isFinite(value)) return "—";
  if (Math.abs(value) >= 1_000_000_000)
    return `${decimalFormat.format(value / 1_000_000_000)} میلیارد تومان`;
  if (Math.abs(value) >= 1_000_000)
    return `${decimalFormat.format(value / 1_000_000)} میلیون تومان`;
  return `${formatNumber(value)} تومان`;
}

export function formatTime(value) {
  const parsed = new Date(value);
  return value && !Number.isNaN(parsed.valueOf())
    ? dateTime.format(parsed)
    : "—";
}

export function clamp(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

/* Same public token keys, redesigned around neutral surfaces. */
export const T = {
  primary: "#66308d",
  primaryLight: "#74479a",
  primaryPale: "#82569f",
  primaryGlow: "rgba(102,48,141,0.12)",
  primaryBg: "#f4eef8",
  primaryBg2: "#e9daef",

  secondary: "#01ae9b",
  secondaryLight: "#28c1ae",
  secondaryDark: "#087a6e",
  secondaryGlow: "rgba(1,174,155,0.10)",
  secondaryBg: "#e8f8f5",
  secondaryBg2: "#d2f0e9",

  bg: "#f7f8fa",
  bgGradient: "linear-gradient(180deg, #ffffff 0%, #f7f8fa 56%, #f7f8fa 100%)",
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
  // Existing consumers use T.white for prominent text on previously dark cards.
  white: "#17191f",

  green: "#14785f",
  greenBg: "#eaf7f0",
  greenBg2: "#d6eee2",
  orange: "#a9661b",
  orangeBg: "#fff5e8",
  orangeBg2: "#ffebcd",
  red: "#b6404b",
  redBg: "#fff0f1",
  redBg2: "#f9dbde",

  radius: 18,
  radiusSm: 13,
  radiusXs: 10,
  shadow: "0 4px 22px rgba(24,31,41,0.035), 0 1px 3px rgba(24,31,41,0.025)",
  shadowLg: "0 12px 34px rgba(24,31,41,0.07)",
};

/*
 * The shared style sheet lives IN this file, not in an external CSS file.
 * Component rules are prefixed so the header/footer do not style other pages.
 */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap');

  :root { --font-family: 'Vazirmatn', Tahoma, sans-serif; }
  *, *::before, *::after { box-sizing: border-box; }
  html, body {
    background: ${T.bg};
    font-family: var(--font-family);
    color: ${T.text};
    direction: rtl;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body { margin: 0; }
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
    background: ${T.surfaceGlass};
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid ${T.border};
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
    color: ${T.text};
  }
  .owj-app-header__logo {
    display: grid;
    place-items: center;
    width: 43px;
    height: 43px;
    border: 1px solid ${T.primaryBg2};
    border-radius: 14px;
    background: ${T.primaryBg};
    color: ${T.primary};
    flex: none;
  }
  .owj-app-header__brand-copy { display: flex; flex-direction: column; gap: 2px; line-height: 1.35; }
  .owj-app-header__brand-copy strong { font-weight: 900; font-size: 18px; color: ${T.white}; }
  .owj-app-header__brand-copy small { font-weight: 500; font-size: 11px; color: ${T.textMuted}; }
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
    scrollbar-color: ${T.borderLight} transparent;
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
    color: ${T.textSec};
    text-decoration: none;
    white-space: nowrap;
    flex: none;
    font-size: 13px;
    font-weight: 600;
    transition: background .18s ease, color .18s ease, border-color .18s ease;
  }
  .owj-app-header__link:hover {
    color: ${T.primary};
    background: ${T.primaryBg};
  }
  .owj-app-header__link[aria-current="page"] {
    color: ${T.primary};
    border-color: ${T.primaryBg2};
    background: ${T.primaryBg};
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
    border-top: 1px solid ${T.border};
    color: ${T.textMuted};
    font-size: 12px;
    line-height: 1.9;
    direction: rtl;
  }
  .owj-app-footer strong { color: ${T.text}; font-weight: 800; }

  .owj-page-state {
    min-height: 100svh;
    padding: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${T.bgGradient};
    color: ${T.text};
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
    background: ${T.surface};
    border: 1px solid ${T.border};
    border-radius: 24px;
    box-shadow: ${T.shadow};
    animation: owjFadeIn .28s ease both;
  }
  .owj-page-state__icon {
    width: 68px;
    height: 68px;
    display: grid;
    place-items: center;
    border-radius: 20px;
    background: ${T.primaryBg};
    color: ${T.primary};
    border: 1px solid ${T.primaryBg2};
  }
  .owj-page-state__icon--error {
    color: ${T.red};
    background: ${T.redBg};
    border-color: ${T.redBg2};
  }
  .owj-page-state h1 {
    margin: 0;
    font-weight: 800;
    font-size: clamp(19px, 4vw, 23px);
    line-height: 1.7;
  }
  .owj-page-state p {
    margin: 0;
    color: ${T.textSec};
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
    background: ${T.primary};
    border-radius: 50%;
    animation: owjDot 1.3s ease-in-out infinite;
  }
  .owj-page-state__dots span:nth-child(2) {
    background: ${T.secondary};
    animation-delay: .16s;
  }
  .owj-page-state__dots span:nth-child(3) { animation-delay: .32s; }
  .owj-page-error__message {
    padding: 12px 16px;
    border: 1px solid ${T.border};
    border-radius: 12px;
    background: ${T.raised};
  }
  .owj-page-error__back {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 48px;
    padding: 12px 22px;
    margin-top: 5px;
    background: ${T.primary};
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
`;

let cssInjected = false;
export function injectGlobalCSS() {
  if (cssInjected || typeof document === "undefined") return;
  cssInjected = true;
  const el = document.createElement("style");
  el.textContent = GLOBAL_CSS;
  document.head.appendChild(el);
}

/* Icon: original name-to-SVG mapping preserved. */
export function Icon({ name, size = 20 }) {
  const paths = {
    activity: <path d="M3 12h4l2.3-7 4.4 14 2.3-7h5" />,
    alert: (
      <>
        <path d="M12 3 2.7 19h18.6L12 3Z" />
        <path d="M12 9v4" />
        <path d="M12 16.5h.01" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    back: (
      <>
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
      </>
    ),
    external: (
      <>
        <path d="M14 5h5v5" />
        <path d="m10 14 9-9" />
        <path d="M19 14v5H5V5h5" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
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
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M6.1 8a7 7 0 0 1 11.7-2L20 8" />
        <path d="m4 16 2.2 2a7 7 0 0 0 11.7-2" />
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
      style={{ flexShrink: 0 }}
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

const NAV_LINKS = [
  { key: "listings", label: "آگهی‌ها", href: "/catalog" },
  { key: "overview", label: "نمای کلی", href: "/" },
  { key: "locations", label: "کاوش مناطق", href: "/explore/tehran" },
  { key: "analytics", label: "تحلیل امتیاز", href: "/score-analytics" },
  { key: "workshop", label: "کارگاه امتیاز", href: "/score-workshop" },
  { key: "quality", label: "کیفیت داده", href: "/data-quality" },
];

export function AppNavigation({ active, className = "" }) {
  useEffect(() => {
    injectGlobalCSS();
  }, []);

  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const activeKey = active ?? (
    pathname === "/catalog" || pathname.startsWith("/listing/") ? "listings" :
    pathname.startsWith("/explore") ? "locations" :
    NAV_LINKS.find((link) => link.href === pathname)?.key
  );
  const renderLink = (link) => (
    <a
      key={link.key}
      className={`owj-app-header__link${link.key === "listings" ? " owj-app-header__link--listings" : ""}`}
      href={link.href}
      aria-current={activeKey === link.key ? "page" : undefined}
    >
      {link.label}
    </a>
  );

  return (
    <nav className={`owj-app-header__nav ${className}`.trim()} aria-label="ناوبری اصلی">
      {renderLink(NAV_LINKS[0])}
      <div className="owj-app-header__nav-scroll">
        {NAV_LINKS.slice(1).map(renderLink)}
      </div>
    </nav>
  );
}

export function AppHeader({ active }) {
  return (
    <header className="owj-app-header">
      <div className="owj-app-header__inner">
        <a className="owj-app-header__brand" href="/">
          <span className="owj-app-header__logo">
            <Icon name="building" size={23} />
          </span>
          <span className="owj-app-header__brand-copy">
            <strong>املاک اوج</strong>
            <small>رصدخانه بازار مسکن</small>
          </span>
        </a>

        <AppNavigation active={active} />
      </div>
    </header>
  );
}

export function AppFooter() {
  return (
    <footer className="owj-app-footer">
      <span>
        <strong>املاک اوج</strong> · تحلیل بازار مسکن · فقط داده‌های عمومی
      </span>
      <span>امتیازها ابزارهای تصمیم‌گیری آزمایشی هستند، نه توصیه سرمایه‌گذاری.</span>
    </footer>
  );
}

export function LoadingPage({ message = "در حال خواندن شواهد امتیازدهی" }) {
  useEffect(() => {
    injectGlobalCSS();
  }, []);

  return (
    <>
      <AppHeader />
      <main className="owj-page-state" role="status" aria-live="polite">
        <section className="owj-page-state__card">
          <div className="owj-page-state__icon">
            <Icon name="building" size={33} />
          </div>
          <div className="owj-page-state__dots" aria-hidden="true">
            {[0, 1, 2].map((i) => <span key={i} />)}
          </div>
          <h1>{message}</h1>
          <p>در حال بارگذاری JSON امتیازدهی تولیدشده از سرور.</p>
        </section>
      </main>
    </>
  );
}

export function ErrorPage({ message }) {
  useEffect(() => {
    injectGlobalCSS();
  }, []);

  return (
    <>
      <AppHeader />
      <main className="owj-page-state">
        <section className="owj-page-state__card">
          <span className="owj-page-state__icon owj-page-state__icon--error">
            <Icon name="alert" size={30} />
          </span>
          <h1>این صفحه بارگذاری نشد</h1>
          <p className="owj-page-error__message" role="alert">{message}</p>
          <a className="owj-page-error__back" href="/">
            <Icon name="back" size={18} />
            بازگشت به نمای کلی
          </a>
        </section>
      </main>
    </>
  );
}

/* Original score calculation and tone mapping retained. */
export function ScoreBar({ value, tone = "cyan" }) {
  const toneMap = {
    cyan: `linear-gradient(90deg, ${T.secondaryDark}, ${T.secondary}, ${T.secondaryLight})`,
    green: `linear-gradient(90deg, #059669, ${T.green})`,
    orange: `linear-gradient(90deg, #ea580c, ${T.orange})`,
    red: `linear-gradient(90deg, #dc2626, ${T.red})`,
    violet: `linear-gradient(90deg, ${T.primary}, ${T.primaryPale})`,
  };
  const glowMap = {
    cyan: T.secondaryGlow,
    violet: T.primaryGlow,
    green: "rgba(52,211,153,0.25)",
    orange: "rgba(251,146,60,0.25)",
    red: "rgba(248,113,113,0.25)",
  };

  return (
    <span
      style={{
        display: "block",
        height: 5,
        background: T.borderLight,
        borderRadius: 99,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <i
        style={{
          display: "block",
          height: "100%",
          width: `${clamp(value)}%`,
          borderRadius: 99,
          background: toneMap[tone] || toneMap.cyan,
          boxShadow: `0 0 10px ${glowMap[tone] || glowMap.cyan}`,
          transition: "width .7s cubic-bezier(.22,1,.36,1)",
        }}
      />
    </span>
  );
}
