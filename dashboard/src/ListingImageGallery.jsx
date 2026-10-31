import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon, formatNumber } from "./shared.jsx";
import {
  nextGalleryIndex,
  swipeGalleryDirection,
} from "./galleryNavigation.js";
import "./ListingImageGallery.css";

export default function ListingImageGallery({ images, title }) {
  const photos = useMemo(
    () =>
      Array.isArray(images)
        ? images.filter(
            (image) => typeof image?.url === "string" && image.url.trim(),
          )
        : [],
    [images],
  );
  const [index, setIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [failedUrls, setFailedUrls] = useState({});
  const dialogRef = useRef(null);
  const startPointer = useRef(null);
  const suppressClickUntil = useRef(0);
  const selectedIndex = Math.min(index, Math.max(photos.length - 1, 0));
  const current = photos[selectedIndex];

  const move = useCallback(
    (direction) => {
      if (photos.length < 2) return;
      setIndex((value) => nextGalleryIndex(value, photos.length, direction));
    },
    [photos.length],
  );

  useEffect(() => {
    if (!viewerOpen || !photos.length) return undefined;
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus();
    };
  }, [viewerOpen, photos.length]);

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startPointer.current = {
      x: event.clientX,
      y: event.clientY,
      id: event.pointerId,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const handlePointerUp = (event) => {
    const start = startPointer.current;
    startPointer.current = null;
    if (!start || start.id !== event.pointerId) return;
    const direction = swipeGalleryDirection(start, {
      x: event.clientX,
      y: event.clientY,
    });
    if (!direction) return;
    suppressClickUntil.current = Date.now() + 500;
    move(direction);
  };
  const markFailed = (url) =>
    setFailedUrls((previous) =>
      previous[url] ? previous : { ...previous, [url]: true },
    );
  const imageAlt = (image, imageIndex) =>
    image.alt || `تصویر ${formatNumber(imageIndex + 1)} ${title || "آگهی"}`;

  if (!current) return null;

  const renderImage = (image, imageIndex, className) =>
    failedUrls[image.url] ? (
      <span className={`${className} listing-photo__unavailable`}>
        تصویر در دسترس نیست
      </span>
    ) : (
      <img
        className={className}
        src={image.url}
        alt={imageAlt(image, imageIndex)}
        draggable="false"
        loading={
          className === "listing-photo__thumbnail-image" ? "lazy" : "eager"
        }
        referrerPolicy="no-referrer"
        onError={() => markFailed(image.url)}
      />
    );

  const arrows = photos.length > 1 && (
    <>
      <button
        type="button"
        className="listing-photo__arrow listing-photo__arrow--left"
        onClick={() => move(-1)}
        aria-label="تصویر قبلی"
        title="تصویر قبلی"
      >
        <Icon name="back" size={21} />
      </button>
      <button
        type="button"
        className="listing-photo__arrow listing-photo__arrow--right"
        onClick={() => move(1)}
        aria-label="تصویر بعدی"
        title="تصویر بعدی"
      >
        <Icon name="arrow" size={21} />
      </button>
    </>
  );

  return (
    <section className="listing-photo" aria-label="تصاویر آگهی">
      <div className="listing-photo__header">
        <h2>تصاویر ملک</h2>
        <span>{formatNumber(photos.length)} تصویر</span>
      </div>
      <div className="listing-photo__stage">
        <button
          type="button"
          className="listing-photo__open"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            startPointer.current = null;
          }}
          onClick={() => {
            if (Date.now() >= suppressClickUntil.current) setViewerOpen(true);
          }}
          aria-label={`نمایش بزرگ تصویر ${formatNumber(selectedIndex + 1)} از ${formatNumber(photos.length)}`}
          title="نمایش بزرگ تصویر"
        >
          {renderImage(current, selectedIndex, "listing-photo__image")}
          <span className="listing-photo__expand" aria-hidden="true">
            <Icon name="expand" size={18} />
          </span>
        </button>
        {arrows}
        <span className="listing-photo__counter" aria-live="polite" dir="ltr">
          {formatNumber(selectedIndex + 1)} / {formatNumber(photos.length)}
        </span>
      </div>
      {photos.length > 1 && (
        <div className="listing-photo__thumbnails" aria-label="انتخاب تصویر">
          {photos.map((photo, photoIndex) => (
            <button
              key={`${photo.url}-${photoIndex}`}
              type="button"
              className={`listing-photo__thumbnail${photoIndex === selectedIndex ? " listing-photo__thumbnail--active" : ""}`}
              onClick={() => setIndex(photoIndex)}
              aria-label={`نمایش تصویر ${formatNumber(photoIndex + 1)}`}
              aria-pressed={photoIndex === selectedIndex}
            >
              {renderImage(photo, photoIndex, "listing-photo__thumbnail-image")}
            </button>
          ))}
        </div>
      )}
      <dialog
        ref={dialogRef}
        className="listing-photo-viewer"
        aria-label="نمایش تصاویر ملک"
        onClose={() => setViewerOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
      >
        <div className="listing-photo-viewer__bar" dir="rtl">
          <div className="listing-photo-viewer__heading">
            <strong>تصاویر ملک</strong>
            <span aria-live="polite" dir="ltr">
              {formatNumber(selectedIndex + 1)} / {formatNumber(photos.length)}
            </span>
          </div>
          <button
            type="button"
            className="listing-photo-viewer__close"
            onClick={() => setViewerOpen(false)}
            aria-label="بستن نمایش تصاویر"
            title="بستن"
            autoFocus
          >
            <Icon name="close" size={22} />
          </button>
        </div>
        <div className="listing-photo-viewer__content">
          <div
            className="listing-photo-viewer__swipe"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              startPointer.current = null;
            }}
          >
            {renderImage(current, selectedIndex, "listing-photo-viewer__image")}
          </div>
          {arrows}
        </div>
      </dialog>
    </section>
  );
}
