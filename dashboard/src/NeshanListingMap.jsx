import { useEffect, useRef, useState } from "react";
import "@neshan-maps-platform/maplibre-sdk/style.css";
import { formatNumber } from "./shared.jsx";

const MAP_STYLE = "https://static.neshan.org/sdk/maplibre/styles/light.json";
let sdkPromise;
function loadSdk() {
  sdkPromise ||= import("@neshan-maps-platform/maplibre-sdk").then((module) => module.default);
  return sdkPromise;
}

function pointIsValid(point) {
  return Number.isFinite(point?.latitude) && Number.isFinite(point?.longitude);
}

function markerElement(kind, label) {
  const marker = document.createElement("button");
  marker.type = "button";
  marker.className = `neshan-place-marker neshan-place-marker--${kind}`;
  marker.textContent = kind === "property" ? "ملک" : kind === "metro" ? "م" : "ا";
  marker.setAttribute("aria-label", label);
  marker.title = label;
  return marker;
}

function popupContent(title, detail) {
  const content = document.createElement("div");
  content.className = "neshan-map-popup";
  const heading = document.createElement("strong");
  heading.textContent = title;
  const description = document.createElement("span");
  description.textContent = detail;
  content.append(heading, description);
  return content;
}

function walkingDetail(place) {
  if (Number.isFinite(place.routeDurationSeconds)) {
    const minutes = Math.max(1, Math.round(place.routeDurationSeconds / 60));
    return `${formatNumber(place.routeDistanceMeters)} متر · ${formatNumber(minutes)} دقیقه پیاده`;
  }
  return `${formatNumber(place.distanceMeters)} متر`;
}

export default function NeshanListingMap({ coordinates, places = [] }) {
  const root = useRef(null);
  const mapRef = useRef(null);
  const [state, setState] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!pointIsValid(coordinates)) return undefined;
    const controller = new AbortController();
    let disposed = false;
    setState("loading");
    setError("");
    Promise.all([
      loadSdk(),
      fetch("/map-config", { signal: controller.signal, headers: { accept: "application/json" } })
        .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return payload;
        }),
    ])
      .then(([maplibregl, config]) => {
        if (disposed || !root.current) return;
        if (!config.key) throw new Error("کلید عمومی نقشه نشان تنظیم نشده است.");
        mapRef.current?.remove();
        const center = [coordinates.longitude, coordinates.latitude];
        const map = new maplibregl.Map({
          container: root.current,
          style: MAP_STYLE,
          center,
          zoom: 15,
          minZoom: 2,
          maxZoom: 21,
          trackResize: true,
          apiKey: config.key,
          logoPosition: "bottom-left",
          copyRightPosition: "bottom-right",
        });
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
        const bounds = new maplibregl.LngLatBounds(center, center);
        const propertyPopup = new maplibregl.Popup({ offset: 22 }).setDOMContent(
          popupContent("موقعیت تقریبی ملک", "مختصات عمومی ذخیره‌شده برای آگهی"),
        );
        new maplibregl.Marker({
          element: markerElement("property", "موقعیت تقریبی ملک"), anchor: "bottom",
        }).setLngLat(center).setPopup(propertyPopup).addTo(map);
        for (const place of places.filter((item) => pointIsValid(item.coordinates))) {
          const kind = place.category === "metro-station" ? "metro" : "bus";
          const point = [place.coordinates.longitude, place.coordinates.latitude];
          const label = `${place.title}، ${walkingDetail(place)}`;
          new maplibregl.Marker({
            element: markerElement(kind, label), anchor: "bottom",
          }).setLngLat(point).setPopup(new maplibregl.Popup({ offset: 18 }).setDOMContent(
            popupContent(place.title, walkingDetail(place)),
          )).addTo(map);
          bounds.extend(point);
        }
        if (places.some((item) => pointIsValid(item.coordinates))) {
          map.fitBounds(bounds, { padding: 54, maxZoom: 16, duration: 0 });
        }
        map.once("load", () => { if (!disposed) setState("ready"); });
        map.on("error", (event) => {
          if (!disposed && event?.error) setError("بخشی از داده‌های نقشه نشان بارگذاری نشد.");
        });
        mapRef.current = map;
      })
      .catch((caught) => {
        if (!disposed && caught.name !== "AbortError") {
          setState("error");
          setError(caught.message);
        }
      });
    return () => {
      disposed = true;
      controller.abort();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [coordinates?.latitude, coordinates?.longitude, places]);

  if (!pointIsValid(coordinates)) {
    return <div className="listing-map-empty">مختصات عمومی برای این آگهی موجود نیست.</div>;
  }
  return (
    <div className="listing-map-shell">
      <div className="listing-map" ref={root} aria-label="نقشه موقعیت تقریبی ملک، مترو و ایستگاه اتوبوس" />
      {state === "loading" && <p className="listing-map-loading" role="status">در حال بارگذاری نقشه نشان…</p>}
      {error && <p className="listing-map-error" role="alert">{error}</p>}
      <div className="listing-map-legend" aria-label="راهنمای نشانگرهای نقشه">
        <span><i className="legend-property" />ملک</span>
        <span><i className="legend-metro" />مترو</span>
        <span><i className="legend-bus" />اتوبوس</span>
      </div>
    </div>
  );
}
