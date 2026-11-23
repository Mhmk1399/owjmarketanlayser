import{i as e,r as t}from"./index-CWwU0uhc.js";import{l as n,s as r}from"./shared-fIOWw8eQ.js";var i=e(),a=t();function o(e,t,n=`fa`){return e==null&&t==null?0:e==null?1:t==null?-1:Number.isFinite(e)&&Number.isFinite(t)?e-t:String(e).localeCompare(String(t),n,{numeric:!0,sensitivity:`base`})}function s(e,{searchText:t=e=>JSON.stringify(e),columns:n={},initialSort:r={key:Object.keys(n)[0]||``,direction:`asc`}}={}){let[a,s]=(0,i.useState)(``),[c,l]=(0,i.useState)(r),u=(0,i.useDeferredValue)(a);return{query:a,setQuery:s,sort:c,changeSort:e=>l(t=>({key:e,direction:t.key===e&&t.direction===`asc`?`desc`:`asc`})),rows:(0,i.useMemo)(()=>{let r=u.trim().toLocaleLowerCase(`fa`),i=n[c.key]||(e=>e?.[c.key]);return[...e].filter(e=>!r||String(t(e)??``).toLocaleLowerCase(`fa`).includes(r)).sort((e,t)=>o(i(e),i(t))*(c.direction===`desc`?-1:1))},[e,u,t,n,c])}}var c=`
  .owj-table-tools, .owj-table-tools * { box-sizing: border-box; }
  .owj-table-tools {
    display: flex; flex-wrap: wrap; align-items: center; gap: 12px;
    justify-content: space-between; width: 100%; min-width: 0;
    padding: 2px 0; margin: 0 0 15px; direction: rtl;
    font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
  }
  .owj-table-search {
    flex: 1 1 280px; min-width: 0; min-height: 48px;
    display: flex; align-items: center; gap: 10px;
    background: #fafbfc; border: 1px solid #e6e8ed;
    border-radius: 13px; color: #777e87; padding: 0 14px;
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
  }
  .owj-table-search:focus-within {
    background: #fff; border-color: rgba(102,48,141,.56);
    box-shadow: 0 0 0 3px rgba(102,48,141,.10);
  }
  .owj-table-search svg { flex: 0 0 auto; color: #747b85; }
  .owj-table-search input {
    flex: 1; width: 100%; min-width: 0; border: 0; outline: 0;
    background: transparent; color: #202127; font-size: 14px;
    font-family: inherit; height: 46px; direction: rtl;
  }
  .owj-table-search input::placeholder { color: #858b96; opacity: 1; }
  .owj-table-search input::-webkit-search-cancel-button { display: none; }
  .owj-table-search__clear {
    display: inline-grid; place-items: center; flex: 0 0 auto;
    width: 29px; height: 29px; padding: 0;
    border: none; border-radius: 9px; background: #eceef2;
    color: #5c626e; cursor: pointer; font-size: 19px; line-height: 1;
    transition: background .16s ease, color .16s ease;
  }
  .owj-table-search__clear:hover { background: #e8dff0; color: #66308d; }
  .owj-table-tools__count {
    flex: 0 0 auto; padding: 8px 12px; border: 1px solid #eceef2;
    border-radius: 10px; background: #f7f8fa; color: #5f6671;
    font-size: 12px; font-weight: 750; white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .owj-table-tools__sr-only {
    position: absolute !important; width: 1px !important; height: 1px !important;
    padding: 0 !important; margin: -1px !important; overflow: hidden !important;
    clip: rect(0,0,0,0) !important; white-space: nowrap !important; border: 0 !important;
  }
  .owj-table-tools button:focus-visible,
  .owj-table-tools input:focus-visible {
    outline: 2px solid #66308d; outline-offset: 3px;
  }
  .owj-table-search:focus-within input:focus-visible { outline: none; }
  @media (max-width: 600px) {
    .owj-table-tools { gap: 9px; margin-bottom: 12px; }
    .owj-table-search { flex-basis: 100%; min-height: 50px; }
    .owj-table-tools__count { margin-inline-start: auto; }
  }
  @media (prefers-reduced-motion: reduce) {
    .owj-table-search, .owj-table-search__clear { transition: none; }
  }
`;function l(){return(0,a.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,a.jsx)(`circle`,{cx:`10.7`,cy:`10.7`,r:`6.8`,stroke:`currentColor`,strokeWidth:`1.9`}),(0,a.jsx)(`path`,{d:`m16 16 4.5 4.5`,stroke:`currentColor`,strokeWidth:`1.9`,strokeLinecap:`round`})]})}function u({query:e,setQuery:t,count:r,placeholder:i=`جستجو در جدول…`,children:o}){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`style`,{children:c}),(0,a.jsxs)(`div`,{className:`data-table-tools owj-table-tools`,role:`search`,children:[(0,a.jsxs)(`div`,{className:`data-table-search owj-table-search`,children:[(0,a.jsx)(`span`,{className:`owj-table-tools__sr-only`,children:i}),(0,a.jsx)(l,{}),(0,a.jsx)(`input`,{type:`search`,value:e,onChange:e=>t(e.target.value),placeholder:i,autoComplete:`off`,"aria-label":i}),!!e&&(0,a.jsx)(`button`,{className:`owj-table-search__clear`,type:`button`,onClick:()=>t(``),"aria-label":`پاک کردن جستجو`,title:`پاک کردن جستجو`,children:`×`})]}),o,(0,a.jsxs)(`output`,{className:`owj-table-tools__count`,"aria-live":`polite`,children:[n(r),` نتیجه`]})]})]})}function d({column:e,sort:t,onSort:n,children:i,style:o,title:s}){let c=t.key===e;return(0,a.jsx)(`th`,{style:{verticalAlign:`middle`,...o},"aria-sort":c?t.direction===`asc`?`ascending`:`descending`:`none`,children:(0,a.jsxs)(`button`,{type:`button`,className:`sortable-table-heading`,onClick:()=>n(e),title:s,style:{display:`inline-flex`,alignItems:`center`,justifyContent:`flex-start`,gap:8,maxWidth:`100%`,minHeight:36,padding:`5px 0`,background:`transparent`,border:0,color:c?r.primary:r.textSec,fontFamily:`inherit`,fontSize:12,fontWeight:c?800:650,textAlign:`right`,lineHeight:1.5,cursor:`pointer`,whiteSpace:`nowrap`},children:[(0,a.jsx)(`span`,{children:i}),(0,a.jsx)(`i`,{"aria-hidden":`true`,style:{display:`inline-grid`,placeItems:`center`,flexShrink:0,width:21,height:21,borderRadius:6,fontSize:12,lineHeight:1,fontStyle:`normal`,fontWeight:900,color:c?r.primary:r.textMuted,background:c?r.primaryBg:`#f1f2f5`},children:c?t.direction===`asc`?`↑`:`↓`:`↕`})]})})}r.text;export{u as n,s as r,d as t};