import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const SessionContext = createContext({ session: null, logout: async () => {} });

function base64Url(bytes) {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function randomVerifier() {
  return base64Url(crypto.getRandomValues(new Uint8Array(48)));
}

async function challenge(verifier) {
  return base64Url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))));
}

function callbackUri() {
  return `${window.location.origin}/auth/callback`;
}

function StatePage({ title, message, action = null, busy = false }) {
  return (
    <main className="analytics-auth-state" aria-busy={busy || undefined}>
      <section className="analytics-auth-card" role={busy ? "status" : "alert"} aria-live="polite">
        <span className="analytics-auth-mark" aria-hidden="true">اوج</span>
        <h1>{title}</h1>
        <p>{message}</p>
        {action}
      </section>
    </main>
  );
}

function submitWebAuthorization(value) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = value.authorizeUrl;
  for (const [name, fieldValue] of Object.entries(value.fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = fieldValue;
    form.append(input);
  }
  document.body.append(form);
  form.submit();
}

export function useAnalyticsSession() {
  return useContext(SessionContext);
}

export default function AuthGate({ children }) {
  const [state, setState] = useState({ kind: "loading" });
  const started = useRef(false);

  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      try {
        if (window.location.pathname === "/auth/callback") {
          const parameters = new URLSearchParams(window.location.search);
          const code = parameters.get("code");
          const returnedState = parameters.get("state");
          const pending = JSON.parse(sessionStorage.getItem("owj.analytics.auth") || "null");
          history.replaceState({}, "", "/");
          if (!code || !returnedState || !pending || pending.state !== returnedState) {
            throw Object.assign(new Error("پاسخ ورود با درخواست این مرورگر مطابقت ندارد."), { code: "invalid-authentication-state" });
          }
          sessionStorage.removeItem("owj.analytics.auth");
          const response = await fetch("/auth/v1/analytics/session", {
            method: "POST", credentials: "same-origin",
            headers: { accept: "application/json", "content-type": "application/json" },
            body: JSON.stringify({ code, state: returnedState, codeVerifier: pending.verifier, redirectUri: pending.redirectUri }),
          });
          const body = await response.json().catch(() => ({}));
          if (cancelled) return;
          if (!response.ok) throw Object.assign(new Error(body.message || "ورود به سامانه تحلیل تکمیل نشد."), { code: body.error, status: response.status });
          if (!cancelled) setState({ kind: "authenticated", session: body });
          return;
        }

        const response = await fetch(`/auth/v1/analytics/session?redirectUri=${encodeURIComponent(callbackUri())}`, {
          credentials: "same-origin", headers: { accept: "application/json" },
        });
        const body = await response.json().catch(() => ({}));
        if (cancelled) return;
        if (!response.ok) throw Object.assign(new Error(body.message || "سرویس هویت وب در دسترس نیست."), { code: body.error, status: response.status });
        if (body.authenticated) {
          if (!cancelled) setState({ kind: "authenticated", session: body });
          return;
        }
        if (started.current) return;
        started.current = true;
        const verifier = randomVerifier();
        sessionStorage.setItem("owj.analytics.auth", JSON.stringify({ state: body.state, verifier, redirectUri: body.redirectUri }));
        const codeChallenge = await challenge(verifier);
        if (cancelled) return;
        if (!cancelled) setState({ kind: body.reason === "session-expired" ? "expired-redirecting" : "redirecting" });
        submitWebAuthorization({ authorizeUrl: body.authorizeUrl, fields: {
          version: "1", redirectUri: body.redirectUri, state: body.state,
          codeChallenge, codeChallengeMethod: "S256",
        } });
      } catch (error) {
        if (!cancelled) setState({
          kind: error.status === 403 ? "unauthorized"
            : error.code === "session-expired" ? "expired" : "unavailable",
          message: error.message,
        });
      }
    }
    void bootstrap();
    return () => { cancelled = true; };
  }, []);

  const value = useMemo(() => ({
    session: state.session || null,
    async logout() {
      await fetch("/auth/v1/analytics/logout", { method: "POST", credentials: "same-origin",
        headers: { "content-type": "application/json" }, body: "{}" });
      sessionStorage.removeItem("owj.analytics.auth");
      window.location.assign("/");
    },
  }), [state.session]);

  useEffect(() => {
    const canOperate = Boolean(state.session?.scopes?.some((scope) => scope === "analytics:operate" || scope === "analytics:admin"));
    document.body.dataset.analyticsCanOperate = String(canOperate);
    return () => { delete document.body.dataset.analyticsCanOperate; };
  }, [state.session]);

  if (state.kind === "loading") return <StatePage busy title="در حال بررسی دسترسی" message="مجوز فعلی شما با سامانه وب اوج بررسی می‌شود." />;
  if (state.kind === "redirecting") return <StatePage busy title="انتقال به ورود اوج" message="برای تأیید هویت و مجوز تحلیل بازار به سامانه وب منتقل می‌شوید." />;
  if (state.kind === "expired-redirecting") return <StatePage busy title="نشست منقضی شده است" message="برای ادامه، مجوز شما دوباره از سامانه وب تأیید می‌شود." />;
  if (state.kind === "unauthorized") return <StatePage title="دسترسی مجاز نیست" message={state.message || "حساب فعلی مجوز استفاده از تحلیل بازار را ندارد."} />;
  if (state.kind === "expired") return <StatePage title="نشست منقضی شده است" message="برای ادامه، ورود خود را دوباره از سامانه وب تأیید کنید." action={<a href="/">ورود دوباره</a>} />;
  if (state.kind === "unavailable") return <StatePage title="سرویس هویت موقتاً در دسترس نیست" message={state.message || "چند لحظه دیگر دوباره تلاش کنید."} action={<button type="button" onClick={() => window.location.reload()}>تلاش دوباره</button>} />;

  const readOnlyWorkshop = window.location.pathname === "/score-workshop"
    && !state.session.scopes.some((scope) => scope === "analytics:operate" || scope === "analytics:admin");
  if (readOnlyWorkshop) return <StatePage title="دسترسی عملیاتی لازم است" message="کارگاه امتیازدهی شامل عملیات مدیریتی است و برای حساب فقط‌خواندنی نمایش داده نمی‌شود." />;

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

