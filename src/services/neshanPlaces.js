const SEARCHES = [
  { category: "metro-station", term: "ایستگاه مترو" },
  { category: "bus-station", term: "ایستگاه اتوبوس" },
];

function radians(value) { return value * Math.PI / 180; }

export function distanceMeters(origin, destination) {
  const dLat = radians(destination.latitude - origin.latitude);
  const dLng = radians(destination.longitude - origin.longitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(radians(origin.latitude)) * Math.cos(radians(destination.latitude)) * Math.sin(dLng / 2) ** 2;
  return Math.round(6_371_000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function cleanText(value, maximum = 300) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, maximum) : null;
}

export async function fetchNearbyPlaces({ latitude, longitude, apiKey, fetchImpl = fetch }) {
  if (!apiKey) throw new Error("Neshan services key is not configured");
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) throw new Error("Listing coordinates are unavailable");
  const origin = { latitude, longitude };
  const fetchedAt = new Date().toISOString();
  const groups = await Promise.all(SEARCHES.map(async ({ category, term }) => {
    const url = new URL("https://api.neshan.org/v1/search");
    url.searchParams.set("term", term); url.searchParams.set("lat", latitude); url.searchParams.set("lng", longitude);
    const response = await fetchImpl(url, { headers: { "Api-Key": apiKey, Accept: "application/json" }, signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`Neshan search failed with HTTP ${response.status}`);
    const payload = await response.json();
    return (payload.items || []).slice(0, 8).map((item) => {
      const point = { latitude: Number(item.location?.y), longitude: Number(item.location?.x) };
      if (!Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) return null;
      return { category, title: cleanText(item.title, 160) || term, address: cleanText(item.address), coordinates: point, distanceMeters: distanceMeters(origin, point), source: "neshan-search", fetchedAt };
    }).filter(Boolean);
  }));
  return groups.flat().sort((a, b) => a.distanceMeters - b.distanceMeters);
}
