import{i as e,r as t,t as n}from"./index-CWwU0uhc.js";import{a as r,c as i,f as a,l as o,n as s,p as c,s as l,t as u}from"./shared-fIOWw8eQ.js";var d=e(),f=t(),p=`https://static.neshan.org/sdk/maplibre/styles/light.json`,m;function h(){return m||=n(()=>import(`./neshan-maplibre-sdk-CW35iM0t.js`).then(e=>e.default),[]),m}function g(e){return Number.isFinite(e?.latitude)&&Number.isFinite(e?.longitude)}function _(e,t){let n=document.createElement(`button`);return n.type=`button`,n.className=`neshan-place-marker neshan-place-marker--${e}`,n.textContent=e===`property`?`ملک`:e===`metro`?`م`:`ا`,n.setAttribute(`aria-label`,t),n.title=t,n}function v(e,t){let n=document.createElement(`div`);n.className=`neshan-map-popup`;let r=document.createElement(`strong`);r.textContent=e;let i=document.createElement(`span`);return i.textContent=t,n.append(r,i),n}function y(e){if(Number.isFinite(e.routeDurationSeconds)){let t=Math.max(1,Math.round(e.routeDurationSeconds/60));return`${o(e.routeDistanceMeters)} متر · ${o(t)} دقیقه پیاده`}return`${o(e.distanceMeters)} متر`}function b({coordinates:e,places:t=[]}){let n=(0,d.useRef)(null),r=(0,d.useRef)(null),[i,a]=(0,d.useState)(`loading`),[o,s]=(0,d.useState)(``);return(0,d.useEffect)(()=>{if(!g(e))return;let i=new AbortController,o=!1;return a(`loading`),s(``),Promise.all([h(),fetch(`/map-config`,{signal:i.signal,headers:{accept:`application/json`}}).then(async e=>{let t=await e.json();if(!e.ok)throw Error(`HTTP ${e.status}`);return t})]).then(([i,c])=>{if(o||!n.current)return;if(!c.key)throw Error(`کلید عمومی نقشه نشان تنظیم نشده است.`);r.current?.remove();let l=[e.longitude,e.latitude],u=new i.Map({container:n.current,style:p,center:l,zoom:15,minZoom:2,maxZoom:21,trackResize:!0,apiKey:c.key,logoPosition:`bottom-left`,copyRightPosition:`bottom-right`});u.addControl(new i.NavigationControl({showCompass:!1}),`top-left`);let d=new i.LngLatBounds(l,l),f=new i.Popup({offset:22}).setDOMContent(v(`موقعیت تقریبی ملک`,`مختصات عمومی ذخیره‌شده برای آگهی`));new i.Marker({element:_(`property`,`موقعیت تقریبی ملک`),anchor:`bottom`}).setLngLat(l).setPopup(f).addTo(u);for(let e of t.filter(e=>g(e.coordinates))){let t=e.category===`metro-station`?`metro`:`bus`,n=[e.coordinates.longitude,e.coordinates.latitude],r=`${e.title}، ${y(e)}`;new i.Marker({element:_(t,r),anchor:`bottom`}).setLngLat(n).setPopup(new i.Popup({offset:18}).setDOMContent(v(e.title,y(e)))).addTo(u),d.extend(n)}t.some(e=>g(e.coordinates))&&u.fitBounds(d,{padding:54,maxZoom:16,duration:0}),u.once(`load`,()=>{o||a(`ready`)}),u.on(`error`,e=>{!o&&e?.error&&s(`بخشی از داده‌های نقشه نشان بارگذاری نشد.`)}),r.current=u}).catch(e=>{!o&&e.name!==`AbortError`&&(a(`error`),s(e.message))}),()=>{o=!0,i.abort(),r.current?.remove(),r.current=null}},[e?.latitude,e?.longitude,t]),g(e)?(0,f.jsxs)(`div`,{className:`listing-map-shell`,children:[(0,f.jsx)(`div`,{className:`listing-map`,ref:n,"aria-label":`نقشه موقعیت تقریبی ملک، مترو و ایستگاه اتوبوس`}),i===`loading`&&(0,f.jsx)(`p`,{className:`listing-map-loading`,role:`status`,children:`در حال بارگذاری نقشه نشان…`}),o&&(0,f.jsx)(`p`,{className:`listing-map-error`,role:`alert`,children:o}),(0,f.jsxs)(`div`,{className:`listing-map-legend`,"aria-label":`راهنمای نشانگرهای نقشه`,children:[(0,f.jsxs)(`span`,{children:[(0,f.jsx)(`i`,{className:`legend-property`}),`ملک`]}),(0,f.jsxs)(`span`,{children:[(0,f.jsx)(`i`,{className:`legend-metro`}),`مترو`]}),(0,f.jsxs)(`span`,{children:[(0,f.jsx)(`i`,{className:`legend-bus`}),`اتوبوس`]})]})]}):(0,f.jsx)(`div`,{className:`listing-map-empty`,children:`مختصات عمومی برای این آگهی موجود نیست.`})}function x(e,t,n){return t<=1?0:(Math.max(0,Math.min(e,t-1))+n+t)%t}function S(e,t){let n=t.x-e.x,r=t.y-e.y;return Math.abs(n)<45||Math.abs(n)<Math.abs(r)*1.3?0:n<0?1:-1}function C({images:e,title:t}){let n=(0,d.useMemo)(()=>Array.isArray(e)?e.filter(e=>typeof e?.url==`string`&&e.url.trim()):[],[e]),[i,a]=(0,d.useState)(0),[s,c]=(0,d.useState)(!1),[l,u]=(0,d.useState)({}),p=(0,d.useRef)(null),m=(0,d.useRef)(null),h=(0,d.useRef)(0),g=Math.min(i,Math.max(n.length-1,0)),_=n[g],v=(0,d.useCallback)(e=>{n.length<2||a(t=>x(t,n.length,e))},[n.length]);(0,d.useEffect)(()=>{if(!s||!n.length)return;let e=p.current;if(!e)return;let t=document.body.style.overflow,r=document.activeElement;return document.body.style.overflow=`hidden`,e.open||e.showModal(),()=>{e.open&&e.close(),document.body.style.overflow=t,r instanceof HTMLElement&&r.isConnected&&r.focus()}},[s,n.length]);let y=e=>{(e.pointerType!==`mouse`||e.button===0)&&(m.current={x:e.clientX,y:e.clientY,id:e.pointerId},e.currentTarget.setPointerCapture?.(e.pointerId))},b=e=>{let t=m.current;if(m.current=null,!t||t.id!==e.pointerId)return;let n=S(t,{x:e.clientX,y:e.clientY});n&&(h.current=Date.now()+500,v(n))},C=e=>u(t=>t[e]?t:{...t,[e]:!0}),w=(e,n)=>e.alt||`تصویر ${o(n+1)} ${t||`آگهی`}`;if(!_)return null;let T=(e,t,n)=>l[e.url]?(0,f.jsx)(`span`,{className:`${n} listing-photo__unavailable`,children:`تصویر در دسترس نیست`}):(0,f.jsx)(`img`,{className:n,src:e.url,alt:w(e,t),draggable:`false`,loading:n===`listing-photo__thumbnail-image`?`lazy`:`eager`,referrerPolicy:`no-referrer`,onError:()=>C(e.url)}),E=n.length>1&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`button`,{type:`button`,className:`listing-photo__arrow listing-photo__arrow--left`,onClick:()=>v(-1),"aria-label":`تصویر قبلی`,title:`تصویر قبلی`,children:(0,f.jsx)(r,{name:`back`,size:21})}),(0,f.jsx)(`button`,{type:`button`,className:`listing-photo__arrow listing-photo__arrow--right`,onClick:()=>v(1),"aria-label":`تصویر بعدی`,title:`تصویر بعدی`,children:(0,f.jsx)(r,{name:`arrow`,size:21})})]});return(0,f.jsxs)(`section`,{className:`listing-photo`,"aria-label":`تصاویر آگهی`,children:[(0,f.jsxs)(`div`,{className:`listing-photo__header`,children:[(0,f.jsx)(`h2`,{children:`تصاویر ملک`}),(0,f.jsxs)(`span`,{children:[o(n.length),` تصویر`]})]}),(0,f.jsxs)(`div`,{className:`listing-photo__stage`,children:[(0,f.jsxs)(`button`,{type:`button`,className:`listing-photo__open`,onPointerDown:y,onPointerUp:b,onPointerCancel:()=>{m.current=null},onClick:()=>{Date.now()>=h.current&&c(!0)},"aria-label":`نمایش بزرگ تصویر ${o(g+1)} از ${o(n.length)}`,title:`نمایش بزرگ تصویر`,children:[T(_,g,`listing-photo__image`),(0,f.jsx)(`span`,{className:`listing-photo__expand`,"aria-hidden":`true`,children:(0,f.jsx)(r,{name:`expand`,size:18})})]}),E,(0,f.jsxs)(`span`,{className:`listing-photo__counter`,"aria-live":`polite`,dir:`ltr`,children:[o(g+1),` / `,o(n.length)]})]}),n.length>1&&(0,f.jsx)(`div`,{className:`listing-photo__thumbnails`,"aria-label":`انتخاب تصویر`,children:n.map((e,t)=>(0,f.jsx)(`button`,{type:`button`,className:`listing-photo__thumbnail${t===g?` listing-photo__thumbnail--active`:``}`,onClick:()=>a(t),"aria-label":`نمایش تصویر ${o(t+1)}`,"aria-pressed":t===g,children:T(e,t,`listing-photo__thumbnail-image`)},`${e.url}-${t}`))}),(0,f.jsxs)(`dialog`,{ref:p,className:`listing-photo-viewer`,"aria-label":`نمایش تصاویر ملک`,onClose:()=>c(!1),onKeyDown:e=>{e.key===`ArrowLeft`&&(e.preventDefault(),v(-1)),e.key===`ArrowRight`&&(e.preventDefault(),v(1))},children:[(0,f.jsxs)(`div`,{className:`listing-photo-viewer__bar`,dir:`rtl`,children:[(0,f.jsxs)(`div`,{className:`listing-photo-viewer__heading`,children:[(0,f.jsx)(`strong`,{children:`تصاویر ملک`}),(0,f.jsxs)(`span`,{"aria-live":`polite`,dir:`ltr`,children:[o(g+1),` / `,o(n.length)]})]}),(0,f.jsx)(`button`,{type:`button`,className:`listing-photo-viewer__close`,onClick:()=>c(!1),"aria-label":`بستن نمایش تصاویر`,title:`بستن`,autoFocus:!0,children:(0,f.jsx)(r,{name:`close`,size:22})})]}),(0,f.jsxs)(`div`,{className:`listing-photo-viewer__content`,children:[(0,f.jsx)(`div`,{className:`listing-photo-viewer__swipe`,onPointerDown:y,onPointerUp:b,onPointerCancel:()=>{m.current=null},children:T(_,g,`listing-photo-viewer__image`)}),E]})]})]})}function w(e){let t=e?.property||{},n=e?.amenities||{},r=[],i=[];return n.parking===!1&&r.push(`پارکینگ ندارد`),n.elevator===!1&&Number.isFinite(t.floor)&&t.floor>0?r.push(`طبقه بالای همکف بدون آسانسور`):n.elevator===!1&&r.push(`آسانسور ندارد`),(!Number.isFinite(t.area)||t.area<=0)&&i.push(`متراژ`),Number.isFinite(t.constructionYear)||i.push(`سال ساخت`),Number.isFinite(t.floor)||i.push(`طبقه`),e?.propertyDetails?.deedType?.trim()||i.push(`نوع سند`),typeof n.parking!=`boolean`&&i.push(`وضعیت پارکینگ`),typeof n.elevator!=`boolean`&&i.push(`وضعیت آسانسور`),{highlights:r,missing:i}}function T(e){let t=e?.listing,n=t?.evidence?.comparableCount,r=t?.valuation?.nearbyPricePerMeter,i=t?.asking?.askingPricePerMeter;if(!Number.isInteger(n)||n<5||!Number.isFinite(r)||r<=0||!Number.isFinite(i)||i<=0)return null;let a=i-r;return{sampleCount:n,reference:r,asking:i,difference:a,percent:a/r*100}}var E={active:`فعال`,"not-seen":`دیده‌نشده`,"possibly-removed":`احتمال حذف`,removed:`حذف‌شده`},D=new Intl.DateTimeFormat(`fa-IR-u-ca-persian`,{dateStyle:`medium`,timeStyle:`short`,timeZone:`Asia/Tehran`});function O(e){if(!e)return`نامشخص`;let t=new Date(e);return Number.isNaN(t.valueOf())?`نامشخص`:D.format(t)}function k({listing:e,scoreDetail:t,scoreLoading:n}){let{highlights:a,missing:s}=w(e),c=T(t),l=c&&Math.abs(c.percent)>=.05?c.percent>0?`بالاتر`:`پایین‌تر`:null;return(0,f.jsxs)(`section`,{className:`listing-decision`,"aria-labelledby":`listing-decision-title`,children:[(0,f.jsxs)(`div`,{className:`listing-decision__heading`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`span`,{className:`listing-decision__eyebrow`,children:`نگاه سریع`}),(0,f.jsx)(`h2`,{id:`listing-decision-title`,children:`خلاصه بررسی آگهی`})]}),(0,f.jsxs)(`a`,{href:`#owj-specs`,children:[`مشخصات کامل `,(0,f.jsx)(r,{name:`back`,size:15})]})]}),(0,f.jsxs)(`dl`,{className:`listing-decision__facts`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`dt`,{children:`قیمت کل`}),(0,f.jsx)(`dd`,{children:i(e.pricing?.price)})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`dt`,{children:`قیمت هر متر`}),(0,f.jsx)(`dd`,{children:i(e.pricing?.pricePerMeter)})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`dt`,{children:`وضعیت آگهی`}),(0,f.jsx)(`dd`,{children:E[e.lifecycle?.status]||`نامشخص`})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`dt`,{children:`آخرین مشاهده آگهی`}),(0,f.jsx)(`dd`,{children:O(e.lastSeenAt)})]})]}),(0,f.jsxs)(`div`,{className:`listing-decision__columns`,children:[(0,f.jsxs)(`div`,{className:`listing-decision__column`,children:[(0,f.jsxs)(`h3`,{children:[(0,f.jsx)(r,{name:`alert`,size:17}),` نکات قابل توجه`]}),a.length>0?(0,f.jsx)(`ul`,{className:`listing-decision__notes`,children:a.map(e=>(0,f.jsx)(`li`,{children:e},e))}):(0,f.jsx)(`p`,{children:`مورد مشخصی از اطلاعات موجود شناسایی نشد.`}),s.length>0&&(0,f.jsxs)(`p`,{className:`listing-decision__missing`,children:[(0,f.jsx)(`strong`,{children:`اطلاعات نامشخص:`}),` `,s.join(`، `)]})]}),(0,f.jsxs)(`div`,{className:`listing-decision__column listing-decision__comparison`,children:[(0,f.jsxs)(`h3`,{children:[(0,f.jsx)(r,{name:`trend`,size:17}),` مقایسه قیمت هر متر`]}),n?(0,f.jsx)(`p`,{role:`status`,children:`در حال دریافت تحلیل قیمت…`}):c?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`p`,{className:`listing-decision__result`,children:l?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(`strong`,{children:[o(Math.round(Math.abs(c.percent)*10)/10),`٪ `,l]}),` `,`از مبنای نمونه‌ها`]}):(0,f.jsx)(`strong`,{children:`تقریباً برابر با مبنای نمونه‌ها`})}),(0,f.jsxs)(`p`,{children:[`قیمت هر متر آگهی در زمان تحلیل:`,` `,(0,f.jsx)(`b`,{children:i(c.asking)})]}),(0,f.jsxs)(`p`,{children:[`میانه وزنی تعدیل‌شده نمونه‌ها:`,` `,(0,f.jsx)(`b`,{children:i(c.reference)})]}),l&&(0,f.jsxs)(`p`,{children:[`اختلاف هر متر:`,` `,(0,f.jsx)(`b`,{children:i(Math.abs(c.difference))})]}),(0,f.jsxs)(`small`,{children:[`بر اساس `,o(c.sampleCount),` آگهی مشابه در تحلیل `,O(t.generatedAt),`. قیمت‌ها پیشنهادی‌اند، نه قیمت معامله قطعی؛ مبنای مقایسه برای تفاوت ویژگی‌های ملک تعدیل شده است.`]}),(0,f.jsxs)(`a`,{href:`#owj-comparables`,children:[`مشاهده نمونه‌ها `,(0,f.jsx)(r,{name:`back`,size:14})]})]}):(0,f.jsx)(`p`,{children:`تحلیل قیمت با حداقل ۵ نمونه مشابه معتبر در دسترس نیست.`})]})]})]})}var A={personal:`فایل شخصی`,"real-estate-business":`مشاور املاک`,unknown:`نامشخص`},j={elevator:`آسانسور`,parking:`پارکینگ`,storage:`انباری`,balcony:`بالکن`,rooftop:`روف‌گاردن`,lobby:`لابی`,doorman:`سرایدار`,security:`امنیت`,pool:`استخر`,sauna:`سونا`,gym:`باشگاه`,centralAntenna:`آنتن مرکزی`,airConditioning:`تهویه`,heating:`گرمایش`},M={deedType:`نوع سند`,buildingDirection:`جهت ساختمان`,unitPosition:`موقعیت واحد`,propertyType:`نوع ملک`,buildingCondition:`وضعیت بنا`,heating:`گرمایش`,cooling:`سرمایش`},N={"strong-value":`فرصت خرید بسیار خوب`,promising:`ارزش بررسی دارد`,fair:`قیمت نسبتاً منصفانه`,"weak-value":`ارزش خرید پایین`};function P(e){return e==null||typeof e!=`string`&&typeof e!=`number`?e:String(e).replace(/[0-9\u0660-\u0669]/g,e=>{let t=e.charCodeAt(0),n=t>=1632?t-1632:t-48;return String.fromCharCode(1776+n)})}var F=new Intl.DateTimeFormat(`fa-IR-u-ca-persian`,{dateStyle:`medium`,timeZone:`Asia/Tehran`}),I=new Intl.DateTimeFormat(`fa-IR-u-ca-persian`,{dateStyle:`medium`,timeStyle:`short`,timeZone:`Asia/Tehran`});function L(e){if(!e)return`زمان انتشار نامشخص`;if(typeof e==`string`&&/^\d{4}-\d{2}-\d{2}(?:T|\s|$)/.test(e)){let t=new Date(e);if(!Number.isNaN(t.valueOf()))return/[T\s]\d{2}:\d{2}/.test(e)?I.format(t):F.format(t)}return P(e)}function R(e){let t=Number.isFinite(e.routeDistanceMeters)?e.routeDistanceMeters:e.distanceMeters,n=Number.isFinite(e.routeDurationSeconds)?Math.max(1,Math.round(e.routeDurationSeconds/60)):null;return{distance:`${o(t)} متر`,duration:n===null?null:`${o(n)} دقیقه پیاده`}}var z=`
/* All presentation rules are intentionally embedded in SavedListingDetailPage.jsx.
   They are scoped to .owj-detail-page to avoid affecting other OWJ screens. */
.owj-detail-page {
  min-height: 100svh;
  min-width: 0;
  background: ${l.bg};
  color: ${l.text};
  font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
  direction: rtl;
  overflow-x: clip;
  text-align: right;
  -webkit-font-smoothing: antialiased;
}
.owj-detail-page *, .owj-detail-page *::before, .owj-detail-page *::after {
  box-sizing: border-box;
}
.owj-detail-page :where(a, button, summary):focus-visible {
  outline: 3px solid rgba(102,48,141,.28);
  outline-offset: 3px;
}
.owj-detail-page :where(button, a) { -webkit-tap-highlight-color: transparent; }
.owj-detail-page a { color: inherit; }
.owj-detail-page button { font: inherit; }
.owj-detail-page .saved-detail-main {
  width: min(100%, 1360px);
  min-width: 0;
  margin-inline: auto;
  padding: 24px clamp(16px, 3vw, 36px) 88px;
}
.owj-detail-page .saved-detail-breadcrumb {
  display: flex;
  align-items: center;
  gap: 9px;
  overflow: auto hidden;
  min-height: 44px;
  margin: 0 0 16px;
  color: ${l.textMuted};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  scrollbar-width: none;
}
.owj-detail-page .saved-detail-breadcrumb::-webkit-scrollbar { display: none; }
.owj-detail-page .saved-detail-breadcrumb a {
  display: inline-flex;
  align-items: center;
  padding: 8px 0;
  text-decoration: none;
  color: ${l.textSec};
  transition: color .18s ease;
}
.owj-detail-page .saved-detail-breadcrumb a:hover { color: ${l.primary}; }
.owj-detail-page .saved-detail-breadcrumb span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${l.text};
}
.owj-detail-page .saved-detail-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 365px);
  gap: clamp(20px, 3vw, 40px);
  align-items: start;
  padding: clamp(22px, 3vw, 38px);
  margin: 0 0 20px;
  background: ${l.surface};
  border: 1px solid ${l.border};
  border-radius: 24px;
  box-shadow: ${l.shadow};
  overflow: hidden;
}
.owj-detail-page .saved-detail-hero::before {
  content: '';
  position: absolute;
  right: 0;
  top: 27px;
  bottom: 27px;
  width: 3px;
  border-radius: 4px 0 0 4px;
  background: ${l.primary};
}
.owj-detail-page .saved-detail-hero > div { min-width: 0; }
.owj-detail-page .saved-detail-hero .catalog-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  margin-bottom: 17px;
}
.owj-detail-page .status-pill, .owj-detail-page .score-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  max-width: 100%;
  padding: 6px 11px;
  border: 1px solid ${l.borderMed};
  border-radius: 999px;
  background: ${l.raised};
  color: ${l.textSec};
  font-size: 11px;
  font-weight: 650;
  line-height: 1.65;
  white-space: normal;
  overflow-wrap: anywhere;
}
.owj-detail-page .status-pill--active {
  background: ${l.secondaryBg};
  color: ${l.secondaryDark};
  border-color: ${l.secondaryBg2};
}
.owj-detail-page .score-tag {
  background: ${l.primaryBg};
  color: ${l.primary};
  border-color: ${l.primaryBg2};
}
.owj-detail-page .score-tag--strong-value {
  background: ${l.greenBg}; color: ${l.green}; border-color: ${l.greenBg2};
}
.owj-detail-page .score-tag--fair,
.owj-detail-page .score-tag--weak-value {
  background: ${l.orangeBg}; color: ${l.orange}; border-color: ${l.orangeBg2};
}
.owj-detail-page .score-tag--scenario {
  background: ${l.raised}; color: ${l.textSec}; border-color: ${l.border};
}
.owj-detail-page .saved-detail-hero h1 {
  max-width: 760px;
  margin: 0 0 13px;
  color: ${l.text};
  font-size: clamp(23px, 3vw, 35px);
  font-weight: 900;
  letter-spacing: -.5px;
  line-height: 1.65;
  overflow-wrap: anywhere;
}
.owj-detail-page .saved-description__text {
  margin: 0;
  max-width: 750px;
  color: ${l.textSec};
  font-size: 13px;
  line-height: 2.15;
  white-space: pre-line;
  overflow-wrap: anywhere;
}
.owj-detail-page .saved-description__text--collapsed {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.owj-detail-page .saved-description__toggle {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  margin-top: 4px;
  padding: 4px 0;
  border: 0;
  background: transparent;
  color: ${l.primary};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}
.owj-detail-page .saved-description__toggle:hover { text-decoration: underline; }
.owj-detail-page .saved-detail-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 22px;
  padding-top: 17px;
  border-top: 1px solid ${l.border};
}
.owj-detail-page .saved-detail-highlights > span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 13px;
  background: ${l.raised};
  border: 1px solid ${l.border};
  border-radius: 12px;
  font-size: 12px;
  color: ${l.textSec};
}
.owj-detail-page .saved-detail-highlights strong {
  font-size: 13px; color: ${l.text}; font-weight: 800;
}
.owj-detail-page .saved-detail-price {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 11px;
  align-self: stretch;
  padding: 24px 21px;
  border-radius: 20px;
  background: ${l.raised};
  border: 1px solid ${l.borderMed};
}
.owj-detail-page .saved-detail-price > span {
  color: ${l.textMuted}; font-size: 12px; font-weight: 650;
}
.owj-detail-page .saved-detail-price > strong {
  color: ${l.text};
  font-size: clamp(25px, 2.3vw, 31px);
  font-weight: 900;
  line-height: 1.65;
  letter-spacing: -.55px;
  overflow-wrap: anywhere;
}
.owj-detail-page .saved-detail-price > small {
  color: ${l.textSec};
  font-size: 12px;
  line-height: 1.9;
  padding-bottom: 19px;
  margin-bottom: 6px;
  border-bottom: 1px solid ${l.borderMed};
}
.owj-detail-page .saved-detail-price > a,
.owj-detail-page .saved-detail-price > button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  width: 100%;
  padding: 11px 13px;
  gap: 9px;
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  transition: background .18s ease, border-color .18s ease, transform .18s ease;
}
.owj-detail-page .saved-detail-price > a {
  order: 0;
  background: ${l.primary};
  border: 1px solid ${l.primary};
  color: #fff;
}
.owj-detail-page .saved-detail-price > a:hover { background: ${l.primaryLight}; transform: translateY(-1px); }
.owj-detail-page .saved-detail-price > button {
  order: 1;
  background: ${l.surface};
  border: 1px solid ${l.borderLight};
  color: ${l.text};
}
.owj-detail-page .saved-detail-price > button:hover:not(:disabled) { background: ${l.surfaceHover}; }
.owj-detail-page :where(.saved-detail-price button, .nearby-refresh):disabled {
  opacity: .58; cursor: not-allowed;
}
.owj-detail-page .saved-refetch-status {
  order: 2;
  margin: 0;
  color: ${l.textSec};
  font-size: 12px;
  line-height: 1.9;
  overflow-wrap: anywhere;
}
.owj-detail-page .saved-refetch-status:empty { display: none; }
.owj-detail-page .saved-detail-jumps {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 22px;
  padding: 2px 0 6px;
  overflow: auto hidden;
  scrollbar-width: none;
  white-space: nowrap;
}
.owj-detail-page .saved-detail-jumps::-webkit-scrollbar { display: none; }
.owj-detail-page .saved-detail-jumps a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 41px;
  flex: none;
  padding: 8px 17px;
  border-radius: 12px;
  border: 1px solid ${l.borderMed};
  background: ${l.surface};
  color: ${l.textSec};
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: color .18s ease, background .18s ease, border-color .18s ease;
}
.owj-detail-page .saved-detail-jumps a:hover,
.owj-detail-page .saved-detail-jumps a:focus-visible {
  border-color: ${l.primaryBg2};
  background: ${l.primaryBg};
  color: ${l.primary};
}
.owj-detail-page .saved-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 19px;
  min-width: 0;
}
.owj-detail-page .saved-panel {
  display: block;
  position: relative;
  min-width: 0;
  padding: clamp(19px, 2.3vw, 27px);
  background: ${l.surface};
  border: 1px solid ${l.border};
  border-radius: 21px;
  box-shadow: ${l.shadow};
  scroll-margin-top: 100px;
}
.owj-detail-page .saved-panel--wide,
.owj-detail-page .saved-panel--map {
  grid-column: 1 / -1;
}
.owj-detail-page .saved-panel h2 {
  margin: 0 0 15px;
  color: ${l.text};
  font-size: clamp(16px, 1.7vw, 19px);
  font-weight: 850;
  line-height: 1.65;
}
.owj-detail-page .saved-panel > p,
.owj-detail-page .saved-panel__head p {
  margin: 5px 0 0;
  color: ${l.textSec};
  font-size: 12px;
  line-height: 1.95;
}
.owj-detail-page .saved-panel__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 22px;
  margin-bottom: 21px;
}
.owj-detail-page .saved-panel__head > div { min-width: 0; }
.owj-detail-page .saved-panel__head h2 { margin: 0 0 5px; }
.owj-detail-page .score-detail-panel {
  background: linear-gradient(180deg, #fff 0%, #fff 75%, #fefcff 100%);
  border-color: ${l.primaryBg2};
}
.owj-detail-page .score-final {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3px;
  flex: none;
  min-width: 122px;
  padding: 10px 15px 12px;
  border-radius: 16px;
  border: 1px solid ${l.primaryBg2};
  background: ${l.primaryBg};
  color: ${l.primary};
  font-size: 31px;
  font-weight: 900;
  line-height: 1.4;
  text-align: center;
}
.owj-detail-page .score-final small {
  color: ${l.primary};
  font-size: 10px;
  font-weight: 750;
  line-height: 1.6;
  text-align: center;
}
.owj-detail-page .score-final--strong-value {
  color: ${l.green}; border-color: ${l.greenBg2}; background: ${l.greenBg};
}
.owj-detail-page .score-final--strong-value small { color: ${l.green}; }
.owj-detail-page .score-final--weak-value {
  color: ${l.red}; border-color: ${l.redBg2}; background: ${l.redBg};
}
.owj-detail-page .score-final--weak-value small { color: ${l.red}; }
.owj-detail-page .score-component-grid,
.owj-detail-page .score-valuation-grid,
.owj-detail-page .saved-facts {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
}
.owj-detail-page .score-component-grid > div,
.owj-detail-page .score-valuation-grid > div,
.owj-detail-page .saved-facts > div {
  min-width: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 15px 14px;
  background: ${l.raised};
  border: 1px solid ${l.border};
  border-radius: 13px;
}
.owj-detail-page :where(.saved-facts, .score-component-grid, .score-valuation-grid) dt,
.owj-detail-page .saved-stack dt {
  margin: 0;
  color: ${l.textMuted};
  font-size: 11px;
  font-weight: 650;
  line-height: 1.7;
}
.owj-detail-page :where(.saved-facts, .score-component-grid, .score-valuation-grid) dd,
.owj-detail-page .saved-stack dd {
  margin: 0;
  color: ${l.text};
  font-size: 15px;
  font-weight: 800;
  line-height: 1.75;
  overflow-wrap: anywhere;
}
.owj-detail-page .score-equation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  max-width: 100%;
  min-height: 71px;
  padding: 16px;
  margin: 19px 0;
  border-radius: 15px;
  background: ${l.primaryBg};
  border: 1px dashed ${l.primaryBg2};
  color: ${l.textSec};
  overflow-x: auto;
  scrollbar-width: thin;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.owj-detail-page .score-equation span {
  color: ${l.text}; font-size: 16px; font-weight: 800; background:white;
}
.owj-detail-page .score-equation b { color: ${l.textMuted}; font-size: 17px; }
.owj-detail-page .score-equation strong {
  color: ${l.primary}; font-size: 20px; font-weight: 900;
}
.owj-detail-page .score-valuation-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.owj-detail-page .score-valuation-grid > div { background: ${l.surface}; border-color: ${l.borderMed}; }
.owj-detail-page .score-explanations {
  display: grid;
  gap: 9px;
  list-style: none;
  margin: 19px 0 0;
  padding: 0;
}
.owj-detail-page .score-explanations li {
  position: relative;
  padding: 11px 27px 11px 12px;
  border-radius: 12px;
  background: ${l.raised};
  color: ${l.textSec};
  font-size: 12px;
  line-height: 1.95;
  overflow-wrap: anywhere;
}
.owj-detail-page .score-explanations li::before {
  content: '•';
  position: absolute;
  top: 10px;
  right: 12px;
  color: ${l.secondaryDark};
  font-weight: 900;
}
.owj-detail-page .comparable-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 12px;
}
.owj-detail-page .comparable-list article {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 14px;
  padding: 18px;
  border-radius: 15px;
  background: ${l.raised};
  border: 1px solid ${l.border};
  min-width: 0;
}
.owj-detail-page .comparable-list article > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
}
.owj-detail-page .comparable-list article > div:last-child {
  align-items: flex-end;
  justify-content: space-between;
  flex: none;
  text-align: left;
}
.owj-detail-page .comparable-list article span {
  color: ${l.textMuted}; font-size: 11px; font-weight: 650;
}
.owj-detail-page .comparable-list article a {
  color: ${l.text}; font-size: 13px; font-weight: 800;
  line-height: 1.8; text-decoration: none;
  overflow-wrap: anywhere;
}
.owj-detail-page .comparable-list article a:hover { color: ${l.primary}; }
.owj-detail-page .comparable-list article small {
  color: ${l.textSec}; font-size: 11px; line-height: 1.8;
}
.owj-detail-page .comparable-list article strong {
  color: ${l.text}; font-size: 14px; font-weight: 850;
  white-space: nowrap;
}
.owj-detail-page .comparable-list article b {
  display: inline-flex;
  padding: 4px 10px;
  border: 1px solid ${l.secondaryBg2};
  background: ${l.secondaryBg};
  color: ${l.secondaryDark};
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
}
.owj-detail-page .saved-panel--map .saved-panel__head { align-items: center; }
.owj-detail-page .nearby-refresh {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 43px;
  flex: none;
  padding: 9px 16px;
  border: 1px solid ${l.borderLight};
  background: ${l.surface};
  color: ${l.text};
  border-radius: 11px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  transition: background .18s ease;
}
.owj-detail-page .nearby-refresh:hover:not(:disabled) { background: ${l.raised}; }
.owj-detail-page .saved-panel--map > div:not(.saved-panel__head):not(.nearby-place-list) {
  min-width: 0;
  border-radius: 15px;
}
.owj-detail-page .nearby-place-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 10px;
  margin-top: 16px;
}
.owj-detail-page .nearby-place-list article {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 14px;
  border: 1px solid ${l.border};
  background: ${l.raised};
  border-radius: 13px;
}
.owj-detail-page .nearby-place-list article > span {
  flex: none;
  display: grid;
  place-items: center;
  min-width: 53px;
  min-height: 38px;
  padding: 7px 10px;
  color: ${l.secondaryDark};
  background: ${l.secondaryBg};
  border-radius: 10px;
  font-size: 11px;
  font-weight: 750;
}
.owj-detail-page .nearby-place-list article > div {
  display: flex; flex: 1; min-width: 0; flex-direction: column; gap: 4px;
}
.owj-detail-page .nearby-place-list article strong {
  color: ${l.text}; font-size: 12px; font-weight: 800; line-height: 1.7;
}
.owj-detail-page .nearby-place-list article small {
  color: ${l.textMuted}; font-size: 11px; line-height: 1.6; overflow-wrap: anywhere;
}
.owj-detail-page .nearby-place-list article b {
  display: flex; flex-direction: column; align-items: flex-end; gap: 3px;
  color: ${l.text}; flex: none; font-size: 12px; font-weight: 800;
  white-space: nowrap;
}
.owj-detail-page .nearby-place-list article b small {
  color: ${l.secondaryDark}; font-size: 10px; font-weight: 750;
}
.owj-detail-page .nearby-place-list > p {
  grid-column: 1/-1;
  margin: 0;
  color: ${l.textMuted};
  padding: 15px;
  border-radius: 13px;
  background: ${l.raised};
  font-size: 12px;
  line-height: 2;
}
.owj-detail-page .saved-stack {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  margin: 0;
}
.owj-detail-page .saved-stack > div {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${l.border};
}
.owj-detail-page .saved-stack > div:last-child { border-bottom: none; }
.owj-detail-page .saved-stack dd { text-align: left; max-width: 67%; }
.owj-detail-page .saved-panel--facts,
.owj-detail-page .saved-panel--facts .saved-stack,
.owj-detail-page .saved-panel--facts .saved-stack > div {
  background: #fff;
}
.owj-detail-page .saved-panel--facts h2,
.owj-detail-page .saved-panel--facts dt,
.owj-detail-page .saved-panel--facts dd {
  color: #000;
}
.owj-detail-page .saved-advertiser {
  display: inline-flex;
  align-items: center;
  min-height: 39px;
  padding: 8px 13px;
  background: ${l.secondaryBg};
  color: ${l.secondaryDark};
  border: 1px solid ${l.secondaryBg2};
  border-radius: 11px;
  font-size: 13px;
  font-weight: 850;
}
.owj-detail-page .saved-amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}
.owj-detail-page .saved-amenity {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 39px;
  padding: 8px 12px;
  border: 1px solid ${l.borderMed};
  border-radius: 11px;
  background: ${l.raised};
  color: ${l.textSec};
  font-size: 12px;
  font-weight: 650;
  line-height: 1.7;
}
.owj-detail-page .saved-amenity::before {
  content: '•'; font-size: 14px; font-weight: 900; line-height: 1;
}
.owj-detail-page .saved-amenity--yes {
  color: ${l.green}; background: ${l.greenBg}; border-color: ${l.greenBg2};
}
.owj-detail-page .saved-amenity--yes::before { content: '✓'; }
.owj-detail-page .saved-amenity--no {
  color: ${l.textMuted}; background: ${l.raised}; border-color: ${l.border};
}
.owj-detail-page .saved-amenity--no::before { content: '−'; }
.owj-detail-page .saved-amenity--unknown::before { content: none; }
.owj-detail-page .coverage-meter {
  display: block;
  height: 9px;
  width: 100%;
  margin: 8px 0 17px;
  overflow: hidden;
  background: ${l.borderLight};
  border-radius: 999px;
}
.owj-detail-page .coverage-meter > span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: ${l.secondary};
  transition: width .5s ease;
}
.owj-detail-page .saved-panel > strong:not(.saved-advertiser) {
  color: ${l.text}; font-size: 26px; font-weight: 900;
}
.owj-detail-page .owj-detail-state {
  display: grid;
  place-items: center;
  min-height: min(67vh, 650px);
  margin: 20px 0;
  padding: 28px 16px;
  border: 1px solid ${l.border};
  border-radius: 22px;
  background: ${l.surface};
  box-shadow: ${l.shadow};
  text-align: center;
}
.owj-detail-page .owj-detail-state > div { max-width: 450px; }
.owj-detail-page .owj-detail-state__icon {
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  width: 66px;
  height: 66px;
  border-radius: 20px;
  background: ${l.primaryBg};
  color: ${l.primary};
}
.owj-detail-page .owj-detail-state--error .owj-detail-state__icon {
  background: ${l.redBg}; color: ${l.red};
}
.owj-detail-page .owj-detail-state h1 {
  font-size: 21px;
  line-height: 1.7;
  margin: 0 0 8px;
  font-weight: 900;
  color: ${l.text};
}
.owj-detail-page .owj-detail-state p {
  color: ${l.textSec};
  margin: 0 0 20px;
  font-size: 13px;
  line-height: 2;
  overflow-wrap: anywhere;
}
.owj-detail-page .owj-detail-state a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 10px 19px;
  border-radius: 12px;
  border: 1px solid ${l.primaryBg2};
  background: ${l.primaryBg};
  color: ${l.primary};
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
}
@media (max-width: 1020px) {
  .owj-detail-page .saved-detail-hero { grid-template-columns: minmax(0, 1fr); }
  .owj-detail-page .saved-detail-price { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: center; }
  .owj-detail-page .saved-detail-price > span,
  .owj-detail-page .saved-detail-price > strong,
  .owj-detail-page .saved-detail-price > small,
  .owj-detail-page .saved-refetch-status { grid-column: 1 / -1; }
  .owj-detail-page .saved-detail-price > small { margin: -2px 0 6px; padding-bottom: 13px; }
  .owj-detail-page .score-component-grid,
  .owj-detail-page .score-valuation-grid,
  .owj-detail-page .saved-facts { grid-template-columns: repeat(3, minmax(0,1fr)); }
}
@media (max-width: 760px) {
  .owj-detail-page .saved-detail-main { padding: 15px 15px 64px; }
  .owj-detail-page .saved-detail-breadcrumb { margin-bottom: 12px; }
  .owj-detail-page .saved-detail-hero { padding: 22px; border-radius: 20px; gap: 22px; }
  .owj-detail-page .saved-detail-hero h1 { font-size: 25px; }
  .owj-detail-page .saved-detail-price { padding: 19px; }
  .owj-detail-page .saved-detail-grid { grid-template-columns: 1fr; gap: 14px; }
  .owj-detail-page .saved-panel--wide,
  .owj-detail-page .saved-panel--map { grid-column: auto; }
  .owj-detail-page .saved-panel { padding: 20px; border-radius: 19px; scroll-margin-top: 120px; }
  .owj-detail-page .score-component-grid,
  .owj-detail-page .score-valuation-grid,
  .owj-detail-page .saved-facts { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .owj-detail-page .comparable-list,
  .owj-detail-page .nearby-place-list { grid-template-columns: 1fr; }
  .owj-detail-page .saved-panel--map .saved-panel__head { align-items: stretch; flex-direction: column; }
  .owj-detail-page .nearby-refresh { width: 100%; }
}
@media (max-width: 420px) {
  .owj-detail-page .saved-detail-main { padding: 11px 12px 54px; }
  .owj-detail-page .saved-detail-hero { padding: 19px 17px; border-radius: 18px; }
  .owj-detail-page .saved-detail-hero h1 { font-size: 23px; }
  .owj-detail-page .saved-detail-highlights { gap: 7px; }
  .owj-detail-page .saved-detail-highlights > span { padding: 8px 10px; font-size: 11px; }
  .owj-detail-page .saved-detail-price { display: flex; padding: 17px; gap: 9px; }
  .owj-detail-page .saved-detail-price > small { margin-bottom: 5px; }
  .owj-detail-page .saved-panel { padding: 17px 15px; }
  .owj-detail-page .saved-panel__head { gap: 13px; }
  .owj-detail-page .score-final { min-width: 98px; padding: 9px; font-size: 28px; }
  .owj-detail-page .score-final small { font-size: 9px; }
  .owj-detail-page .score-component-grid > div,
  .owj-detail-page .score-valuation-grid > div,
  .owj-detail-page .saved-facts > div { padding: 13px 10px; }
  .owj-detail-page .saved-facts dd,
  .owj-detail-page .score-component-grid dd,
  .owj-detail-page .score-valuation-grid dd { font-size: 14px; }
  .owj-detail-page .comparable-list article { flex-direction: column; gap: 12px; }
  .owj-detail-page .comparable-list article > div:last-child {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .owj-detail-page .nearby-place-list article { padding: 11px; gap: 8px; }
  .owj-detail-page .nearby-place-list article b { white-space: normal; }
}
@media (prefers-reduced-motion: reduce) {
  .owj-detail-page *, .owj-detail-page *::before, .owj-detail-page *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}

`;function B({label:e,value:t}){return(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`dt`,{children:e}),(0,f.jsx)(`dd`,{children:P(t??`—`)})]})}function V({description:e}){let t=(0,d.useRef)(null),[n,r]=(0,d.useState)(!1),[i,a]=(0,d.useState)(!1),o=P(e||`توضیح عمومی برای این آگهی ذخیره نشده است.`);return(0,d.useEffect)(()=>r(!1),[e]),(0,d.useLayoutEffect)(()=>{let e=t.current;if(!e)return;let n=!0,r=()=>{if(!n)return;let t=Number.parseFloat(window.getComputedStyle(e).lineHeight);a(Number.isFinite(t)&&e.scrollHeight>t*3+1)};r();let i=typeof ResizeObserver>`u`?null:new ResizeObserver(r);return i?.observe(e),window.addEventListener(`resize`,r),document.fonts?.ready.then(r),()=>{n=!1,i?.disconnect(),window.removeEventListener(`resize`,r)}},[o,n]),(0,f.jsxs)(`div`,{className:`saved-description`,children:[(0,f.jsx)(`p`,{id:`listing-description`,ref:t,className:`saved-description__text${n?``:` saved-description__text--collapsed`}`,children:o}),i&&(0,f.jsx)(`button`,{className:`saved-description__toggle`,type:`button`,"aria-expanded":n,"aria-controls":`listing-description`,onClick:()=>r(e=>!e),children:n?`نمایش کمتر`:`نمایش بیشتر`})]})}function H({token:e}){c();let[t,n]=(0,d.useState)(null),[l,p]=(0,d.useState)(null),[m,h]=(0,d.useState)(!1),[g,_]=(0,d.useState)(``),[v,y]=(0,d.useState)(!1),[x,S]=(0,d.useState)(null),[w,T]=(0,d.useState)([]),[E,D]=(0,d.useState)(!0);(0,d.useEffect)(()=>{let t=new AbortController;return fetch(`/listings/${encodeURIComponent(e)}`,{signal:t.signal,headers:{accept:`application/json`}}).then(e=>e.ok?e.json():Promise.reject(Error(e.status===404?`آگهی ذخیره‌شده پیدا نشد.`:`HTTP ${e.status}`))).then(n).catch(e=>{e.name!==`AbortError`&&p(e.message)}),()=>t.abort()},[e]),(0,d.useEffect)(()=>{let t=new AbortController;return D(!0),Promise.all([fetch(`/score-details/${encodeURIComponent(e)}`,{signal:t.signal}).then(e=>e.ok?e.json():null),fetch(`/listings/${encodeURIComponent(e)}/scenario-scores`,{signal:t.signal}).then(e=>e.ok?e.json():{scores:[]})]).then(([e,t])=>{S(e),T(t?.scores||[])}).catch(e=>{e.name!==`AbortError`&&S(null)}).finally(()=>{t.signal.aborted||D(!1)}),()=>t.abort()},[e]);let O=async()=>{h(!0),_(``);try{let t=await fetch(`/listings/${encodeURIComponent(e)}/refetch`,{method:`POST`,headers:{accept:`application/json`}}),r=await t.json();if(!t.ok)throw Error(r.message||`HTTP ${t.status}`);n(r.listing),_(r.changed?`جزئیات تازه دریافت و ذخیره شد.`:`آگهی بررسی شد؛ تغییری وجود نداشت.`)}catch(e){_(`بازیابی ناموفق بود: ${e.message}`)}finally{h(!1)}},F=async()=>{y(!0),_(``);try{let t=await fetch(`/listings/${encodeURIComponent(e)}/nearby-places`,{method:`POST`,headers:{accept:`application/json`}}),r=await t.json();if(!t.ok)throw Error(r.message||`HTTP ${t.status}`);n(r.listing),_(`${o(r.nearbyPlaces.length)} مکان حمل‌ونقل عمومی ذخیره شد.`)}catch(e){_(`دریافت مکان‌های اطراف ناموفق بود: ${e.message}`)}finally{y(!1)}};if(!t&&!l)return(0,f.jsxs)(`div`,{className:`owj-detail-page`,dir:`rtl`,children:[(0,f.jsx)(`style`,{children:z}),(0,f.jsx)(s,{active:`listings`}),(0,f.jsx)(`main`,{className:`saved-detail-main`,children:(0,f.jsx)(`section`,{className:`owj-detail-state`,role:`status`,"aria-live":`polite`,children:(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`span`,{className:`owj-detail-state__icon`,children:(0,f.jsx)(r,{name:`building`,size:29})}),(0,f.jsx)(`h1`,{children:`در حال بارگذاری جزئیات آگهی…`}),(0,f.jsx)(`p`,{children:`اطلاعات ملک، قیمت و موقعیت مکانی در حال دریافت است.`})]})})})]});if(l)return(0,f.jsxs)(`div`,{className:`owj-detail-page`,dir:`rtl`,children:[(0,f.jsx)(`style`,{children:z}),(0,f.jsx)(s,{active:`listings`}),(0,f.jsx)(`main`,{className:`saved-detail-main`,children:(0,f.jsx)(`section`,{className:`owj-detail-state owj-detail-state--error`,role:`alert`,children:(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`span`,{className:`owj-detail-state__icon`,children:(0,f.jsx)(r,{name:`alert`,size:29})}),(0,f.jsx)(`h1`,{children:`جزئیات آگهی در دسترس نیست`}),(0,f.jsx)(`p`,{children:P(l)}),(0,f.jsx)(`a`,{href:`/catalog`,children:`بازگشت به فهرست آگهی‌ها`})]})})})]});let I=t.property||{},H=t.pricing||{},U=x?.listing,W=U?.evidence?.comparables||[];return(0,f.jsxs)(`div`,{className:`owj-detail-page`,dir:`rtl`,children:[(0,f.jsx)(`style`,{children:z}),(0,f.jsx)(s,{active:`listings`}),(0,f.jsxs)(`main`,{className:`saved-detail-main`,id:`main-content`,children:[(0,f.jsxs)(`nav`,{className:`saved-detail-breadcrumb`,"aria-label":`مسیر صفحه`,children:[(0,f.jsx)(`a`,{href:`/catalog`,children:`آگهی‌ها`}),(0,f.jsx)(`span`,{"aria-hidden":`true`,children:`‹`}),(0,f.jsx)(`span`,{children:P(t.neighborhood||t.token)})]}),(0,f.jsxs)(`header`,{className:`saved-detail-hero`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsxs)(`div`,{className:`catalog-tags`,children:[(0,f.jsx)(`span`,{className:`status-pill status-pill--active`,children:P(A[t.advertiserType]||`نامشخص`)}),(0,f.jsx)(`span`,{className:`status-pill`,children:P(t.neighborhood||`مکان نامشخص`)}),(0,f.jsx)(`span`,{className:`status-pill`,children:L(t.publishedText)}),U&&(0,f.jsxs)(`span`,{className:`score-tag score-tag--${U.scores.band}`,children:[`امتیاز اصلی `,o(U.scores.recommendation),` ·`,` `,N[U.scores.band]]}),w.map(e=>(0,f.jsxs)(`span`,{className:`score-tag score-tag--scenario`,children:[P(e.name),`: `,o(e.recommendation)]},e.scenarioId))]}),(0,f.jsx)(`h1`,{children:P(t.title)}),(0,f.jsx)(V,{description:t.description},t.token),(0,f.jsxs)(`div`,{className:`saved-detail-highlights`,"aria-label":`مشخصات کلیدی ملک`,children:[(0,f.jsxs)(`span`,{children:[`متراژ `,(0,f.jsxs)(`strong`,{children:[o(I.area),` متر`]})]}),(0,f.jsxs)(`span`,{children:[`اتاق `,(0,f.jsx)(`strong`,{children:o(I.rooms)})]}),(0,f.jsxs)(`span`,{children:[`سال ساخت`,` `,(0,f.jsx)(`strong`,{children:a(I.constructionYear)})]})]})]}),(0,f.jsxs)(`aside`,{className:`saved-detail-price`,children:[(0,f.jsx)(`span`,{children:`قیمت کل`}),(0,f.jsx)(`strong`,{children:i(H.price)}),(0,f.jsxs)(`small`,{children:[`هر متر `,i(H.pricePerMeter)]}),(0,f.jsxs)(`button`,{type:`button`,onClick:O,disabled:m,children:[(0,f.jsx)(r,{name:`refresh`,size:16}),m?`در حال دریافت…`:`دریافت دوباره جزئیات`]}),(0,f.jsxs)(`a`,{href:t.url,target:`_blank`,rel:`noreferrer`,children:[`مشاهده آگهی `,(0,f.jsx)(r,{name:`external`,size:16})]}),(0,f.jsx)(`p`,{className:`saved-refetch-status`,"aria-live":`polite`,children:P(g)})]})]}),(0,f.jsx)(k,{listing:t,scoreDetail:x,scoreLoading:E}),(0,f.jsx)(C,{images:t.images,title:t.title},t.token),(0,f.jsxs)(`nav`,{className:`saved-detail-jumps`,"aria-label":`دسترسی سریع به بخش‌های آگهی`,children:[(0,f.jsx)(`a`,{href:`#owj-specs`,children:`مشخصات ملک`}),(0,f.jsx)(`a`,{href:`#owj-pricing`,children:`قیمت‌گذاری`}),(0,f.jsx)(`a`,{href:`#owj-amenities`,children:`امکانات`}),(0,f.jsx)(`a`,{href:`#owj-map`,children:`موقعیت روی نقشه`}),U&&(0,f.jsx)(`a`,{href:`#owj-score`,children:`تحلیل امتیاز`}),U&&(0,f.jsx)(`a`,{href:`#owj-comparables`,children:`خانه‌های مشابه`})]}),(0,f.jsxs)(`div`,{className:`saved-detail-grid`,children:[U&&(0,f.jsxs)(`section`,{id:`owj-score`,className:`saved-panel saved-panel--wide score-detail-panel`,children:[(0,f.jsxs)(`div`,{className:`saved-panel__head`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`h2`,{children:`امتیاز، محاسبه و نتیجه نهایی`}),(0,f.jsxs)(`p`,{children:[`نسخه `,P(x.scoringVersion),` · رتبه`,` `,o(x.population.rank),` از`,` `,o(x.population.total)]})]}),(0,f.jsxs)(`strong`,{className:`score-final score-final--${U.scores.band}`,children:[o(U.scores.recommendation),(0,f.jsx)(`small`,{children:N[U.scores.band]})]})]}),(0,f.jsxs)(`div`,{className:`score-component-grid`,children:[(0,f.jsx)(B,{label:`ارزش قیمت ترکیبی`,value:o(U.scores.dealValue)}),(0,f.jsx)(B,{label:`مقایسه با مدل`,value:o(U.scores.modelValue)}),(0,f.jsx)(B,{label:`آگهی‌های مشابه`,value:o(U.scores.nearbyValue)}),(0,f.jsx)(B,{label:`جایگاه محلی`,value:o(U.scores.localPosition)}),(0,f.jsx)(B,{label:`اعتماد داده`,value:o(U.scores.confidence)}),(0,f.jsx)(B,{label:`ریسک`,value:o(U.scores.risk)}),(0,f.jsx)(B,{label:`کیفیت ملک`,value:o(U.scores.propertyQuality)}),(0,f.jsx)(B,{label:`کیفیت داده`,value:o(U.scores.dataQuality)})]}),(0,f.jsxs)(`div`,{className:`score-equation`,dir:`ltr`,children:[(0,f.jsx)(`span`,{children:o(U.scores.dealValue)}),(0,f.jsx)(`b`,{children:`×`}),(0,f.jsx)(`span`,{children:P(U.formula.appliedConfidenceGate.toFixed(3))}),(0,f.jsx)(`b`,{children:`×`}),(0,f.jsx)(`span`,{children:P(U.formula.appliedRiskGate.toFixed(3))}),(0,f.jsx)(`b`,{children:`=`}),(0,f.jsx)(`strong`,{children:o(U.scores.recommendation)})]}),(0,f.jsxs)(`div`,{className:`score-valuation-grid`,children:[(0,f.jsx)(B,{label:`قیمت برآوردی`,value:i(U.valuation.predictedPrice)}),(0,f.jsx)(B,{label:`بازه پایین برآورد`,value:i(U.valuation.predictionRangeLow)}),(0,f.jsx)(B,{label:`بازه بالای برآورد`,value:i(U.valuation.predictionRangeHigh)}),(0,f.jsx)(B,{label:`اختلاف قیمت آگهی با برآورد`,value:i(U.valuation.askingVsPrediction)})]}),!!U.explanations?.length&&(0,f.jsx)(`ul`,{className:`score-explanations`,children:U.explanations.map(e=>(0,f.jsx)(`li`,{children:P(e)},e))})]}),U&&!W.length&&(0,f.jsxs)(`section`,{id:`owj-comparables`,className:`saved-panel saved-panel--wide`,children:[(0,f.jsx)(`h2`,{children:`خانه‌های مشابه مورد مقایسه`}),(0,f.jsx)(`p`,{children:`برای این آگهی مقایسه مشابه کافی در خروجی فعلی وجود ندارد.`})]}),!!W.length&&(0,f.jsxs)(`section`,{id:`owj-comparables`,className:`saved-panel saved-panel--wide`,children:[(0,f.jsx)(`div`,{className:`saved-panel__head`,children:(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`h2`,{children:`خانه‌های مشابه مورد مقایسه`}),(0,f.jsxs)(`p`,{children:[o(W.length),` آگهی نزدیک و مشابه که در برآورد این ملک استفاده شده‌اند.`]})]})}),(0,f.jsx)(`div`,{className:`comparable-list`,children:W.map(e=>(0,f.jsxs)(`article`,{children:[(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`span`,{children:P(e.neighborhood)}),(0,f.jsx)(`a`,{href:`/listing/${e.token}`,children:P(e.title)}),(0,f.jsxs)(`small`,{children:[o(e.area),` متر ·`,` `,o(e.rooms),` اتاق · فاصله`,` `,o(e.distanceMeters),` متر`]})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`strong`,{children:i(e.askingPrice)}),(0,f.jsxs)(`small`,{children:[`هر متر `,i(e.askingPricePerMeter)]}),(0,f.jsxs)(`b`,{children:[`شباهت `,o(e.similarity),`٪`]})]})]},e.token))})]}),(0,f.jsxs)(`section`,{id:`owj-map`,className:`saved-panel saved-panel--map`,children:[(0,f.jsxs)(`div`,{className:`saved-panel__head`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`h2`,{children:`موقعیت و حمل‌ونقل عمومی`}),(0,f.jsx)(`p`,{children:`مختصات عمومی آگهی ممکن است تقریبی باشد.`})]}),(0,f.jsx)(`button`,{className:`nearby-refresh`,type:`button`,onClick:F,disabled:v,children:v?`در حال جستجو…`:`به‌روزرسانی مکان‌های اطراف`})]}),(0,f.jsx)(b,{coordinates:t.coordinates,places:t.nearbyPlaces||[]}),(0,f.jsxs)(`div`,{className:`nearby-place-list`,children:[(t.nearbyPlaces||[]).map(e=>{let t=R(e);return(0,f.jsxs)(`article`,{children:[(0,f.jsx)(`span`,{children:e.category===`metro-station`?`مترو`:`اتوبوس`}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`strong`,{children:P(e.title)}),(0,f.jsx)(`small`,{children:e.routeMode===`pedestrian`?`مسیر پیاده محاسبه‌شده توسط نشان`:`فاصله برآوردی سرویس مکان‌های نزدیک نشان`})]}),(0,f.jsxs)(`b`,{children:[t.distance,t.duration&&(0,f.jsx)(`small`,{children:t.duration})]})]},e.poiHash||`${e.category}-${e.title}-${e.distanceMeters}`)}),!t.nearbyPlaces?.length&&(0,f.jsx)(`p`,{children:`هنوز مکان عمومی اطراف این ملک دریافت نشده است.`})]})]}),(0,f.jsxs)(`section`,{id:`owj-specs`,className:`saved-panel saved-panel--wide`,children:[(0,f.jsx)(`h2`,{children:`مشخصات ملک`}),(0,f.jsxs)(`dl`,{className:`saved-facts`,children:[(0,f.jsx)(B,{label:`متراژ`,value:I.area==null?`—`:`${o(I.area)} متر`}),(0,f.jsx)(B,{label:`اتاق`,value:o(I.rooms)}),(0,f.jsx)(B,{label:`سال ساخت`,value:a(I.constructionYear)}),(0,f.jsx)(B,{label:`طبقه`,value:o(I.floor)}),(0,f.jsx)(B,{label:`تعداد طبقات`,value:o(I.totalFloors)}),(0,f.jsx)(B,{label:`واحد در طبقه`,value:o(I.unitsPerFloor)}),Object.entries(t.propertyDetails||{}).map(([e,t])=>(0,f.jsx)(B,{label:M[e]||e,value:t},e))]})]}),(0,f.jsxs)(`section`,{id:`owj-pricing`,className:`saved-panel saved-panel--facts`,children:[(0,f.jsx)(`h2`,{children:`قیمت‌گذاری`}),(0,f.jsxs)(`dl`,{className:`saved-stack`,children:[(0,f.jsx)(B,{label:`قیمت کل`,value:i(H.price)}),(0,f.jsx)(B,{label:`قیمت هر متر`,value:i(H.pricePerMeter)}),(0,f.jsx)(B,{label:`ودیعه`,value:i(H.deposit)}),(0,f.jsx)(B,{label:`اجاره`,value:i(H.rent)})]})]}),(0,f.jsxs)(`section`,{className:`saved-panel`,children:[(0,f.jsx)(`h2`,{children:`نوع آگهی‌دهنده`}),(0,f.jsx)(`strong`,{className:`saved-advertiser`,children:P(A[t.advertiserType]||`نامشخص`)}),(0,f.jsx)(`p`,{children:`ابتدا برچسب عمومی دیوار بررسی می‌شود و سپس زبان توضیحات آگهی، با محافظت در برابر عبارت‌هایی مانند «املاک تماس نگیرد». هیچ اطلاعات تماسی در این طبقه‌بندی ذخیره نمی‌شود.`})]}),(0,f.jsxs)(`section`,{id:`owj-amenities`,className:`saved-panel saved-panel--wide`,children:[(0,f.jsx)(`h2`,{children:`امکانات`}),(0,f.jsx)(`div`,{className:`saved-amenities`,children:Object.entries(t.amenities||{}).map(([e,t])=>(0,f.jsxs)(`span`,{className:`saved-amenity saved-amenity--${t===!0?`yes`:t===!1?`no`:`unknown`}`,children:[P(j[e]||e),`:`,` `,t===!0?`دارد`:t===!1?`ندارد`:`نامشخص`]},e))})]}),(0,f.jsxs)(`section`,{className:`saved-panel saved-panel--facts`,children:[(0,f.jsx)(`h2`,{children:`مکان و منبع`}),(0,f.jsxs)(`dl`,{className:`saved-stack`,children:[(0,f.jsx)(B,{label:`شهر`,value:t.city}),(0,f.jsx)(B,{label:`محله`,value:t.neighborhood}),(0,f.jsx)(B,{label:`دقت مختصات`,value:t.coordinates?.accuracy}),(0,f.jsx)(B,{label:`منبع استخراج`,value:t.extraction?.source})]})]}),(0,f.jsxs)(`section`,{className:`saved-panel`,children:[(0,f.jsx)(`h2`,{children:`پوشش استخراج`}),(0,f.jsx)(`div`,{className:`coverage-meter`,children:(0,f.jsx)(`span`,{style:{width:`${t.extraction?.coveragePercent||0}%`}})}),(0,f.jsxs)(`strong`,{children:[o(t.extraction?.coveragePercent||0),`٪`]}),(0,f.jsxs)(`p`,{children:[o(t.extraction?.presentFields?.length||0),` `,`فیلد کلیدی موجود است.`]})]}),!!t.attributes?.length&&(0,f.jsxs)(`section`,{className:`saved-panel saved-panel--wide`,children:[(0,f.jsx)(`h2`,{children:`ویژگی‌های ساختاریافته`}),(0,f.jsx)(`dl`,{className:`saved-facts`,children:t.attributes.map(e=>(0,f.jsx)(B,{label:e.label,value:e.value},`${e.key}-${e.label}`))})]})]})]}),(0,f.jsx)(u,{})]})}export{H as default};