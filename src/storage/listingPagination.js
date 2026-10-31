export const LISTING_PAGE_SIZE = 40;

export function normalizeListingPage({ offset = 0, limit = LISTING_PAGE_SIZE } = {}) {
  const normalize = (value, fallback) => {
    const number = Number(value);
    return Number.isFinite(number) ? Math.floor(number) : fallback;
  };
  return {
    offset: Math.max(0, Math.min(1_000_000, normalize(offset, 0))),
    limit: Math.max(1, Math.min(LISTING_PAGE_SIZE, normalize(limit, LISTING_PAGE_SIZE))),
  };
}
