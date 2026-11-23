import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import AuthGate from "./AuthGate.jsx";
import "./typography.css";
import "./styles.css";

const AnalyticsDashboard = lazy(() => import("./AnalyticsDashboard.jsx"));
const ScoringAnalyticsPage = lazy(() => import("./ScoringAnalyticsPage.jsx"));
const LocationExplorer = lazy(() => import("./LocationExplorer.jsx"));
const ScoringWorkshopPage = lazy(() => import("./ScoringWorkshopPage.jsx"));
const ListingsPage = lazy(() => import("./ListingsPage.jsx"));
const SavedListingDetailPage = lazy(() => import("./SavedListingDetailPage.jsx"));
const DataQualityPage = lazy(() => import("./DataQualityPage.jsx"));
const BuyerMatchingPage = lazy(() => import("./BuyerMatchingPage.jsx"));

function AppRouter() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path === "/score-analytics") return <ScoringAnalyticsPage />;
  if (path === "/score-workshop") return <ScoringWorkshopPage />;
  if (path === "/catalog") return <ListingsPage />;
  if (path === "/data-quality") return <DataQualityPage />;
  if (path === "/buyer-matching") return <BuyerMatchingPage />;
  const location = path.match(/^\/explore(?:\/([a-z0-9-]+))?$/i);
  if (location) return <LocationExplorer slug={location[1] || "iran"} />;
  const listing = path.match(/^\/listing\/([A-Za-z0-9_-]+)$/);
  if (listing) return <SavedListingDetailPage token={listing[1]} />;
  return <AnalyticsDashboard />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthGate>
      <Suspense fallback={<main dir="rtl" role="status" aria-live="polite"><p>در حال بارگذاری…</p></main>}>
        <AppRouter />
      </Suspense>
    </AuthGate>
  </StrictMode>,
);
