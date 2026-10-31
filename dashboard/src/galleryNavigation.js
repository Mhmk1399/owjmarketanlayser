export function nextGalleryIndex(index, count, direction) {
  if (count <= 1) return 0;
  const current = Math.max(0, Math.min(index, count - 1));
  return (current + direction + count) % count;
}

export function swipeGalleryDirection(start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.3) return 0;
  return dx < 0 ? 1 : -1;
}
