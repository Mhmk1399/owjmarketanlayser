import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const LISTING_CURSOR_VERSION = 1;
export const LISTING_CURSOR_DEFAULT_TTL_MS = 15 * 60_000;
export const LISTING_CURSOR_MAX_TTL_MS = 24 * 60 * 60_000;
const ALLOWED_SORTS = new Set(["newest", "price-asc", "price-desc", "area-desc"]);

function cursorError(message, code = "invalid-search-cursor") {
  return Object.assign(new Error(message), { status: 400, code });
}

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function listingSearchFingerprint(filters, sort) {
  if (!ALLOWED_SORTS.has(sort)) throw cursorError("Cursor sort is unsupported");
  return createHash("sha256").update(canonical({ filters, sort })).digest("base64url");
}

function assertSecret(secret) {
  if (typeof secret !== "string" || Buffer.byteLength(secret) < 32) {
    throw new Error("Listing cursor signing secret must contain at least 32 bytes");
  }
}

function assertPosition(position, sort) {
  if (!position || typeof position !== "object" || !/^[A-Za-z0-9_-]+$/.test(position.token || "")) {
    throw cursorError("Cursor position is invalid");
  }
  if (sort === "newest" && !Number.isFinite(Date.parse(position.value))) {
    throw cursorError("Newest cursor requires an ISO date position");
  }
  if (sort !== "newest" && !Number.isFinite(position.value)) {
    throw cursorError("Numeric cursor sort requires a finite position");
  }
}

export function createListingCursor({
  filters = {}, sort = "newest", position, secret,
  now = Date.now(), ttlMs = LISTING_CURSOR_DEFAULT_TTL_MS,
} = {}) {
  assertSecret(secret);
  if (!ALLOWED_SORTS.has(sort)) throw cursorError("Cursor sort is unsupported");
  assertPosition(position, sort);
  const issuedAt = Number(now);
  const boundedTtl = Math.max(1_000, Math.min(LISTING_CURSOR_MAX_TTL_MS, Number(ttlMs)));
  if (!Number.isFinite(issuedAt) || !Number.isFinite(boundedTtl)) throw cursorError("Cursor time is invalid");
  const payload = {
    version: LISTING_CURSOR_VERSION,
    sort,
    value: position.value,
    token: position.token,
    filterHash: listingSearchFingerprint(filters, sort),
    issuedAt,
    expiresAt: issuedAt + boundedTtl,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

export function parseListingCursor(cursor, {
  filters = {}, sort = "newest", secret, now = Date.now(),
} = {}) {
  assertSecret(secret);
  if (typeof cursor !== "string" || cursor.length > 2_048) throw cursorError("Cursor is malformed");
  const [encoded, supplied, extra] = cursor.split(".");
  if (!encoded || !supplied || extra) throw cursorError("Cursor is malformed");
  const expected = Buffer.from(createHmac("sha256", secret).update(encoded).digest("base64url"));
  const actual = Buffer.from(supplied);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw cursorError("Cursor integrity check failed");
  }
  let payload;
  try { payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")); }
  catch { throw cursorError("Cursor payload is malformed"); }
  if (payload.version !== LISTING_CURSOR_VERSION || payload.sort !== sort) {
    throw cursorError("Cursor version or sort does not match the request");
  }
  if (payload.filterHash !== listingSearchFingerprint(filters, sort)) {
    throw cursorError("Cursor filters do not match the request");
  }
  assertPosition({ value: payload.value, token: payload.token }, sort);
  if (!Number.isFinite(payload.issuedAt) || !Number.isFinite(payload.expiresAt) || payload.expiresAt <= payload.issuedAt) {
    throw cursorError("Cursor timestamps are invalid");
  }
  if (Number(now) > payload.expiresAt) throw cursorError("Cursor has expired", "search-cursor-expired");
  return {
    version: payload.version,
    sort: payload.sort,
    position: { value: payload.value, token: payload.token },
    issuedAt: payload.issuedAt,
    expiresAt: payload.expiresAt,
  };
}

export const listingCursorInternals = { canonical, ALLOWED_SORTS };

