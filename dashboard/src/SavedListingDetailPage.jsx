import { useEffect, useState } from "react";
import { AppFooter, AppHeader, Icon, formatMoney, formatNumber, injectGlobalCSS } from "./shared.jsx";
import NeshanListingMap from "./NeshanListingMap.jsx";

const advertiserLabels = { personal: "فایل شخصی", "real-estate-business": "مشاور املاک", unknown: "نامشخص" };
const amenityLabels = { elevator: "آسانسور", parking: "پارکینگ", storage: "انباری", balcony: "بالکن", rooftop: "روف‌گاردن", lobby: "لابی", doorman: "سرایدار", security: "امنیت", pool: "استخر", sauna: "سونا", gym: "باشگاه", centralAntenna: "آنتن مرکزی", airConditioning: "تهویه", heating: "گرمایش" };
const detailLabels = { deedType: "نوع سند", buildingDirection: "جهت ساختمان", unitPosition: "موقعیت واحد", propertyType: "نوع ملک", buildingCondition: "وضعیت بنا", heating: "گرمایش", cooling: "سرمایش" };

function Fact({ label, value }) { return <div><dt>{label}</dt><dd>{value ?? "—"}</dd></div>; }

export default function SavedListingDetailPage({ token }) {
  injectGlobalCSS();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const [refetching, setRefetching] = useState(false);
  const [refetchStatus, setRefetchStatus] = useState("");
  const [placesLoading, setPlacesLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/listings/${encodeURIComponent(token)}`, { signal: controller.signal, headers: { accept: "application/json" } })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(response.status === 404 ? "آگهی ذخیره‌شده پیدا نشد." : `HTTP ${response.status}`)))
      .then(setListing).catch((caught) => { if (caught.name !== "AbortError") setError(caught.message); });
    return () => controller.abort();
  }, [token]);
  const refetch = async () => {
    setRefetching(true); setRefetchStatus("");
    try {
      const response = await fetch(`/listings/${encodeURIComponent(token)}/refetch`, { method: "POST", headers: { accept: "application/json" } });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || `HTTP ${response.status}`);
      setListing(payload.listing);
      setRefetchStatus(payload.changed ? "جزئیات تازه دریافت و ذخیره شد." : "آگهی بررسی شد؛ تغییری وجود نداشت.");
    } catch (caught) { setRefetchStatus(`بازیابی ناموفق بود: ${caught.message}`); }
    finally { setRefetching(false); }
  };
  const refreshPlaces = async () => {
    setPlacesLoading(true); setRefetchStatus("");
    try {
      const response = await fetch(`/listings/${encodeURIComponent(token)}/nearby-places`, { method: "POST", headers: { accept: "application/json" } });
      const payload = await response.json(); if (!response.ok) throw new Error(payload.message || `HTTP ${response.status}`);
      setListing(payload.listing); setRefetchStatus(`${formatNumber(payload.nearbyPlaces.length)} مکان حمل‌ونقل عمومی ذخیره شد.`);
    } catch (caught) { setRefetchStatus(`دریافت مکان‌های اطراف ناموفق بود: ${caught.message}`); }
    finally { setPlacesLoading(false); }
  };

  if (!listing && !error) return <div className="listings-page" dir="rtl"><AppHeader active="listings" /><main className="listings-main"><div className="location-state">در حال بارگذاری جزئیات آگهی…</div></main></div>;
  if (error) return <div className="listings-page" dir="rtl"><AppHeader active="listings" /><main className="listings-main"><div className="location-state location-state--error">{error}</div></main></div>;
  const property = listing.property || {};
  const pricing = listing.pricing || {};
  return <div className="listings-page" dir="rtl">
    <AppHeader active="listings" />
    <main className="saved-detail-main" id="main-content">
      <nav className="saved-detail-breadcrumb" aria-label="مسیر صفحه"><a href="/catalog">آگهی‌ها</a><span aria-hidden="true">‹</span><span>{listing.neighborhood || listing.token}</span></nav>
      <header className="saved-detail-hero">
        <div><div className="catalog-tags"><span className="status-pill status-pill--active">{advertiserLabels[listing.advertiserType] || "نامشخص"}</span><span className="status-pill">{listing.neighborhood || "مکان نامشخص"}</span><span className="status-pill">{listing.publishedText || "زمان انتشار نامشخص"}</span></div><h1>{listing.title}</h1><p>{listing.description || "توضیح عمومی برای این آگهی ذخیره نشده است."}</p></div>
        <aside className="saved-detail-price"><span>قیمت کل</span><strong>{formatMoney(pricing.price)}</strong><small>هر متر {formatMoney(pricing.pricePerMeter)}</small><button type="button" onClick={refetch} disabled={refetching}><Icon name="refresh" size={16} />{refetching ? "در حال دریافت…" : "دریافت دوباره جزئیات"}</button><a href={listing.url} target="_blank" rel="noreferrer">مشاهده آگهی عمومی <Icon name="external" size={16} /></a><p className="saved-refetch-status" aria-live="polite">{refetchStatus}</p></aside>
      </header>

      {!!listing.images?.length && <section className="saved-gallery" aria-label="تصاویر عمومی آگهی">
        {listing.images.map((image, index) => <img key={image.url} src={image.url} alt={image.alt || `تصویر ${formatNumber(index + 1)} آگهی`} width={image.width || undefined} height={image.height || undefined} loading={index ? "lazy" : "eager"} referrerPolicy="no-referrer" />)}
      </section>}

      <div className="saved-detail-grid">
        <section className="saved-panel saved-panel--map"><div className="saved-panel__head"><div><h2>موقعیت و حمل‌ونقل عمومی</h2><p>مختصات عمومی آگهی ممکن است تقریبی باشد.</p></div><button className="nearby-refresh" type="button" onClick={refreshPlaces} disabled={placesLoading}>{placesLoading ? "در حال جستجو…" : "به‌روزرسانی مکان‌های اطراف"}</button></div><NeshanListingMap coordinates={listing.coordinates} places={listing.nearbyPlaces || []} /><div className="nearby-place-list">{(listing.nearbyPlaces || []).map((place) => <article key={`${place.category}-${place.title}-${place.distanceMeters}`}><span>{place.category === "metro-station" ? "مترو" : "اتوبوس"}</span><div><strong>{place.title}</strong><small>{place.address || "نشانی عمومی ثبت نشده"}</small></div><b>{formatNumber(place.distanceMeters)} متر</b></article>)}{!listing.nearbyPlaces?.length && <p>هنوز مکان عمومی اطراف این ملک دریافت نشده است.</p>}</div></section>
        <section className="saved-panel saved-panel--wide"><h2>مشخصات ملک</h2><dl className="saved-facts"><Fact label="متراژ" value={property.area == null ? "—" : `${formatNumber(property.area)} متر`} /><Fact label="اتاق" value={formatNumber(property.rooms)} /><Fact label="سال ساخت" value={formatNumber(property.constructionYear)} /><Fact label="طبقه" value={formatNumber(property.floor)} /><Fact label="تعداد طبقات" value={formatNumber(property.totalFloors)} /><Fact label="واحد در طبقه" value={formatNumber(property.unitsPerFloor)} />{Object.entries(listing.propertyDetails || {}).map(([key, value]) => <Fact key={key} label={detailLabels[key] || key} value={value} />)}</dl></section>
        <section className="saved-panel"><h2>قیمت‌گذاری</h2><dl className="saved-stack"><Fact label="قیمت کل" value={formatMoney(pricing.price)} /><Fact label="قیمت هر متر" value={formatMoney(pricing.pricePerMeter)} /><Fact label="ودیعه" value={formatMoney(pricing.deposit)} /><Fact label="اجاره" value={formatMoney(pricing.rent)} /></dl></section>
        <section className="saved-panel"><h2>نوع آگهی‌دهنده</h2><strong className="saved-advertiser">{advertiserLabels[listing.advertiserType] || "نامشخص"}</strong><p>این طبقه‌بندی فقط از سیگنال‌های عمومی کسب‌وکار ساخته شده و هیچ نام یا اطلاعات تماسی ذخیره نمی‌شود.</p></section>
        <section className="saved-panel saved-panel--wide"><h2>امکانات</h2><div className="saved-amenities">{Object.entries(listing.amenities || {}).map(([key, value]) => <span className={`saved-amenity saved-amenity--${value === true ? "yes" : value === false ? "no" : "unknown"}`} key={key}>{amenityLabels[key] || key}: {value === true ? "دارد" : value === false ? "ندارد" : "نامشخص"}</span>)}</div></section>
        <section className="saved-panel"><h2>مکان و منبع</h2><dl className="saved-stack"><Fact label="شهر" value={listing.city} /><Fact label="محله" value={listing.neighborhood} /><Fact label="دقت مختصات" value={listing.coordinates?.accuracy} /><Fact label="منبع استخراج" value={listing.extraction?.source} /></dl></section>
        <section className="saved-panel"><h2>پوشش استخراج</h2><div className="coverage-meter"><span style={{ width: `${listing.extraction?.coveragePercent || 0}%` }} /></div><strong>{formatNumber(listing.extraction?.coveragePercent || 0)}٪</strong><p>{formatNumber(listing.extraction?.presentFields?.length || 0)} فیلد کلیدی موجود است.</p></section>
        {!!listing.attributes?.length && <section className="saved-panel saved-panel--wide"><h2>ویژگی‌های ساختاریافته</h2><dl className="saved-facts">{listing.attributes.map((attribute) => <Fact key={`${attribute.key}-${attribute.label}`} label={attribute.label} value={attribute.value} />)}</dl></section>}
      </div>
    </main>
    <AppFooter />
  </div>;
}
