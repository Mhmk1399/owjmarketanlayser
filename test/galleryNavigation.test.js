import test from "node:test";
import assert from "node:assert/strict";
import { nextGalleryIndex, swipeGalleryDirection } from "../dashboard/src/galleryNavigation.js";

test("gallery navigation wraps and handles a changed or empty image list", () => {
  assert.equal(nextGalleryIndex(0, 3, -1), 2);
  assert.equal(nextGalleryIndex(2, 3, 1), 0);
  assert.equal(nextGalleryIndex(8, 3, 1), 0);
  assert.equal(nextGalleryIndex(0, 1, 1), 0);
  assert.equal(nextGalleryIndex(0, 0, 1), 0);
});

test("gallery swipe ignores short and vertical gestures", () => {
  const start = { x: 120, y: 120 };
  assert.equal(swipeGalleryDirection(start, { x: 60, y: 122 }), 1);
  assert.equal(swipeGalleryDirection(start, { x: 180, y: 122 }), -1);
  assert.equal(swipeGalleryDirection(start, { x: 90, y: 120 }), 0);
  assert.equal(swipeGalleryDirection(start, { x: 60, y: 200 }), 0);
});
