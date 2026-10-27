import { useEffect, useRef, useState } from "react";
import { formatNumber } from "./shared.jsx";

let sdkPromise;
function loadSdk() {
  if (window.L?.Map) return Promise.resolve(window.L);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    if (!document.querySelector('link[data-neshan="css"]')) {
      const link = document.createElement("link"); link.rel = "stylesheet"; link.href = "https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.css"; link.dataset.neshan = "css"; document.head.append(link);
    }
    const script = document.createElement("script"); script.src = "https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.js"; script.dataset.neshan = "js";
    script.onload = () => resolve(window.L); script.onerror = () => reject(new Error("بارگذاری نقشه نشان ناموفق بود.")); document.head.append(script);
  });
  return sdkPromise;
}

export default function NeshanListingMap({ coordinates, places = [] }) {
  const root = useRef(null); const mapRef = useRef(null); const [error, setError] = useState("");
  useEffect(() => {
    if (!Number.isFinite(coordinates?.latitude) || !Number.isFinite(coordinates?.longitude)) return undefined;
    let disposed = false;
    Promise.all([loadSdk(), fetch("/map-config").then((response) => response.json())]).then(([L, config]) => {
      if (disposed || !root.current || !config.key) throw new Error("کلید عمومی نقشه نشان تنظیم نشده است.");
      mapRef.current?.remove();
      const center = [coordinates.latitude, coordinates.longitude];
      const map = new L.Map(root.current, { key: config.key, maptype: "dreamy", poi: true, traffic: false, center, zoom: 15 });
      L.marker(center).addTo(map).bindPopup("موقعیت تقریبی ملک");
      for (const place of places) L.marker([place.coordinates.latitude, place.coordinates.longitude]).addTo(map).bindPopup(`${place.title} — ${formatNumber(place.distanceMeters)} متر`);
      mapRef.current = map;
    }).catch((caught) => { if (!disposed) setError(caught.message); });
    return () => { disposed = true; mapRef.current?.remove(); mapRef.current = null; };
  }, [coordinates?.latitude, coordinates?.longitude, places]);
  if (!Number.isFinite(coordinates?.latitude) || !Number.isFinite(coordinates?.longitude)) return <div className="listing-map-empty">مختصات عمومی برای این آگهی موجود نیست.</div>;
  return <div className="listing-map-shell"><div className="listing-map" ref={root} aria-label="نقشه موقعیت تقریبی ملک و حمل‌ونقل عمومی" />{error && <p className="listing-map-error">{error}</p>}</div>;
}
