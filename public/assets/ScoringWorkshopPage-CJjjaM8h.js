import{i as e,r as t}from"./index-CWwU0uhc.js";import{a as n,c as r,d as i,i as a,l as o,n as s,o as c,s as l,t as u}from"./shared-fIOWw8eQ.js";import{n as d,r as f,t as p}from"./tableTools-DLfOmmgB.js";var m=e(),h=Object.freeze({modelValue:45,nearbyValue:40,localPosition:15,valuationWeight:70,propertyWeight:20,neighborhoodWeight:10,confidenceFloor:55,riskPenalty:40,elevatorYes:8,elevatorNo:-8,parkingYes:10,parkingNo:-10,storageYes:5,storageNo:-4,balconyYes:3,balconyNo:-2,basementPenalty:-15,groundFloorPenalty:-5,floorAboveSecondPenalty:-2,noElevatorHighFloorPenalty:-4,topFloorPenalty:-4,newBuildBonus:5,agePerYearPenalty:-.45,singleUnitBonus:4,extraUnitPenalty:-1,areaPer25Sqm:1,roomPoint:1,strongThreshold:80,promisingThreshold:65,fairThreshold:45,neighborhoodScores:{}}),g=Object.freeze({...h,valuationWeight:100,propertyWeight:0,neighborhoodWeight:0}),_=Object.freeze({detailed:{label:`پیشنهاد کامل`,values:h},baseline:{label:`روش فعلی سامانه`,values:g},conservative:{label:`سخت‌گیرانه`,values:{...h,valuationWeight:65,propertyWeight:15,neighborhoodWeight:20,confidenceFloor:45,riskPenalty:55}},local:{label:`تأکید بر محله`,values:{...h,modelValue:25,nearbyValue:50,localPosition:25,valuationWeight:60,propertyWeight:15,neighborhoodWeight:25}}}),v=(e,t=0,n=100)=>Math.max(t,Math.min(n,Number(e)||0)),y=(e,t,n)=>e===1?t:e===0?n:(t+n)/2;function b(e,t){return e>=t.strongThreshold?`strong-value`:e>=t.promisingThreshold?`promising`:e>=t.fairThreshold?`fair`:`weak-value`}function x(e){let t=new Map;for(let n of e){if(!Number.isFinite(n.askingPricePerMeter))continue;let e=t.get(n.neighborhood)||[];e.push(n.askingPricePerMeter),t.set(n.neighborhood,e)}let n=[...t].map(([e,t])=>(t.sort((e,t)=>e-t),{name:e,count:t.length,medianPricePerMeter:t[Math.floor(t.length/2)]})).sort((e,t)=>e.medianPricePerMeter-t.medianPricePerMeter);return Object.fromEntries(n.map((e,t)=>{let r=20+(n.length<=1?50:t/(n.length-1)*100)*.8,i=Math.min(1,e.count/20);return[e.name,{...e,score:Math.round(50+(r-50)*i)}]}))}function S(e,t){let n=e.property||{},r=e.amenities||{},i=Number(n.floor)||0,a={elevator:y(r.elevator,t.elevatorYes,t.elevatorNo),parking:y(r.parking,t.parkingYes,t.parkingNo),storage:y(r.storage,t.storageYes,t.storageNo),balcony:y(r.balcony,t.balconyYes,t.balconyNo),floor:i<0?t.basementPenalty:i===0?t.groundFloorPenalty:i>2?(i-2)*t.floorAboveSecondPenalty:0,noElevatorHighFloor:i>=3&&r.elevator===0?(i-2)*t.noElevatorHighFloorPenalty:0,topFloor:n.isTopFloor?t.topFloorPenalty:0,age:-(Number(n.buildingAge)||0)*Math.abs(t.agePerYearPenalty),newBuild:n.isNewBuild?t.newBuildBonus:0,unitDensity:n.isSingleUnitFloor?t.singleUnitBonus:-Math.max(0,(Number(n.unitsPerFloor)||1)-1)*Math.abs(t.extraUnitPenalty),area:((Number(n.area)||75)-75)/25*t.areaPer25Sqm,rooms:((Number(n.rooms)||2)-2)*t.roomPoint},o=Object.values(a).reduce((e,t)=>e+t,0);return{score:Math.round(v(50+o)),adjustment:Number(o.toFixed(1)),contributions:a}}function C(e,t=h){let n=t.modelValue+t.nearbyValue+t.localPosition,r=t.valuationWeight+t.propertyWeight+t.neighborhoodWeight,i=n||1,a=r||1,o=x(e),s=e.map(e=>{let n=(e.scores.modelValue*t.modelValue+e.scores.nearbyValue*t.nearbyValue+e.scores.localPosition*t.localPosition)/i,r=t.modelValue===45&&t.nearbyValue===40&&t.localPosition===15&&Number.isFinite(e.scores.dealValue)?e.scores.dealValue:n,s=S(e,t),c=o[e.neighborhood]?.score??50,l=v(t.neighborhoodScores?.[e.neighborhood]??c),u=(r*t.valuationWeight+s.score*t.propertyWeight+l*t.neighborhoodWeight)/a,d=v(t.confidenceFloor)/100+e.scores.confidence/100*(1-v(t.confidenceFloor)/100),f=1-e.scores.risk/100*v(t.riskPenalty)/100,p=Math.round(v(u*d*f));return{...e,scenario:{dealValue:Math.round(r),property:s,neighborhoodScore:l,derivedNeighborhoodScore:c,composite:Number(u.toFixed(1)),confidenceGate:d,riskGate:f,recommendation:p,band:b(p,t),rank:0}}}).sort((e,t)=>t.scenario.recommendation-e.scenario.recommendation||t.scores.confidence-e.scores.confidence||e.token.localeCompare(t.token));s.forEach((e,t)=>{e.scenario.rank=t+1});let c=Array.from({length:10},(e,t)=>({label:t===9?`90–100`:`${t*10}–${t*10+9}`,count:s.filter(e=>Math.min(9,Math.floor(e.scenario.recommendation/10))===t).length})),l=s.map(e=>e.scenario.recommendation).sort((e,t)=>e-t);return{rows:s,histogram:c,dealWeightTotal:n,overallWeightTotal:r,neighborhoods:o,summary:{average:s.length?Number((l.reduce((e,t)=>e+t,0)/s.length).toFixed(1)):0,median:l.length?l[Math.floor(l.length/2)]:0,strong:s.filter(e=>e.scenario.band===`strong-value`).length,promising:s.filter(e=>e.scenario.band===`promising`).length,fair:s.filter(e=>e.scenario.band===`fair`).length,weak:s.filter(e=>e.scenario.band===`weak-value`).length,bandChanges:s.filter(e=>e.scores.band!==e.scenario.band).length,topTenChanges:s.slice(0,10).filter(e=>e.rank>10).length}}}var w=t(),T=`
/* All workshop styling is local to the workshop JSX file. */
.workshop-page {
  --wk-ink: #202127;
  --wk-muted: #636a75;
  --wk-faint: #777e89;
  --wk-border: #e8ebef;
  --wk-soft: #f7f8fa;
  --wk-primary: #66308d;
  --wk-teal: #087e73;
  background: #f7f8fa;
  color: var(--wk-ink);
  direction: rtl;
  min-height: 100vh;
  overflow-x: clip;
  text-align: right;
  font: 400 14px/1.8 var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.workshop-page, .workshop-page *, .workshop-page *::before, .workshop-page *::after {box-sizing:border-box;}
.workshop-page :is(h1,h2,h3,h4,p,figure,dl) {margin:0;}
.workshop-page :is(button,input,select,textarea) {font:inherit;}
.workshop-page :is(button,a,input,textarea,select,summary) { -webkit-tap-highlight-color: transparent; }
.workshop-page :is(button,a,input,textarea,select,summary):focus-visible {
  outline: 3px solid rgba(102,48,141,.46); outline-offset: 3px;
}
.workshop-page a { color: inherit; text-decoration: none; }
.workshop-main { max-width: 1480px; margin: 0 auto; padding: 29px 27px 90px; min-width: 0; }
.workshop-hero {
  background: #fff; border: 1px solid var(--wk-border); border-radius: 23px;
  padding: 34px 37px; margin-bottom: 24px; position: relative; overflow: hidden;
  display: grid; grid-template-columns: minmax(0,1fr) minmax(245px,310px);
  gap: 32px; align-items: center;
  box-shadow: 0 5px 22px rgba(31,35,45,.024);
}
.workshop-hero::before {content:"";position:absolute;inset:0 0 auto; height:3px;background:linear-gradient(90deg,#eee8f3 0%,#66308d 65%,#01ae9b 100%);}
.workshop-hero > div {min-width:0;}
.workshop-hero > div > span {
  display:inline-flex;align-items:center;gap:8px; padding:5px 11px;
  border-radius:100px;background:#f0faf7;color:var(--wk-teal);
  font-size:12px;font-weight:800;margin-bottom:14px;
}
.workshop-hero > div > span svg {color:#087e73;}
.workshop-hero h1 {font-size:clamp(24px,2.5vw,35px);letter-spacing:-.6px;line-height:1.5;font-weight:900;margin-bottom:10px;}
.workshop-hero p {font-size:13px;line-height:2.05;color:var(--wk-muted);max-width:700px;}
.workshop-hero aside {padding:19px 20px;background:#f8f9fb;border:1px solid #e9ebef;border-radius:17px;min-width:0;display:flex;flex-direction:column;gap:6px;}
.workshop-hero aside > span {font-size:12px;color:var(--wk-faint);font-weight:700;}
.workshop-hero aside > strong {font-size:16px;color:#2b2633;direction:ltr;unicode-bidi:plaintext;overflow-wrap:anywhere;text-align:right;line-height:1.5;font-weight:850;}
.workshop-hero aside > small {color:var(--wk-muted);font-size:12px;line-height:1.8;}
.workshop-layout {display:grid;grid-template-columns:minmax(305px,360px) minmax(0,1fr);align-items:start;gap:21px;min-width:0;}
.workshop-sidebar,.workshop-results {min-width:0;display:flex;flex-direction:column;gap:18px;}
.workshop-panel {
  min-width:0; width:100%; border:1px solid var(--wk-border); border-radius:19px;
  background:#fff;padding:22px 23px;box-shadow:0 3px 15px rgba(31,35,45,.021);
}
.workshop-panel__head, .workshop-table-head {display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:9px 14px;margin-bottom:17px;}
.workshop-panel__head > div, .workshop-table-head > div {min-width:0;flex:1;}
.workshop-panel__head span, .workshop-table-head span {
  color:var(--wk-teal);display:block;font-weight:750;font-size:11px;letter-spacing:0;margin-bottom:5px;
}
.workshop-panel__head h2, .workshop-table-head h2 {font-size:16px;line-height:1.55;font-weight:850;color:#202127;}
.workshop-panel__head > small, .workshop-distribution .workshop-panel__head > small {color:var(--wk-faint);font-size:11px;font-weight:600;}
.workshop-panel__head > b {flex:none;border-radius:9px;padding:5px 10px;font-size:12px;font-weight:850;line-height:1.6;}
.workshop-panel__head > b.is-valid {background:#eaf7f0;color:#176b55;}
.workshop-panel__head > b.is-invalid {background:#fff0f1;color:#b6404b;}
.workshop-help {font-size:12px;line-height:2;color:var(--wk-muted);margin-bottom:17px !important;}
.workshop-accordion {padding:0;overflow:hidden;}
.workshop-accordion > summary {list-style:none;cursor:pointer;user-select:none;margin:0;padding:20px 22px;align-items:center;min-height:75px;}
.workshop-accordion > summary::-webkit-details-marker {display:none;}
.workshop-accordion > summary:after {
  content:"";width:10px;height:10px;flex:0 0 10px;
  border-left:2px solid #818894;border-bottom:2px solid #818894;
  transform:rotate(-45deg);transition:transform .2s ease; margin:0 4px 5px 1px;
}
.workshop-accordion[open] > summary {border-bottom:1px solid #eef0f3;}
.workshop-accordion[open] > summary:after {transform:rotate(135deg);margin-top:7px;margin-bottom:0;}
.workshop-accordion > .workshop-help {margin:15px 22px !important;}
.workshop-accordion > .workshop-control {margin:0 19px 12px;}
.workshop-accordion > .workshop-control:last-child {margin-bottom:20px;}
.workshop-panel__head > button {border:1px solid #e3e6eb;background:#fff;color:#5b626e;border-radius:10px;padding:8px 11px;min-height:40px;cursor:pointer;font-size:11px;font-weight:700;transition:border-color .15s,color .15s,background .15s;}
.workshop-panel__head > button:hover {color:#66308d;background:#faf7fc;border-color:#d9c7e6;}
.workshop-presets {display:flex;flex-wrap:wrap;gap:8px;}
.workshop-presets button {
  min-height:43px;border:1px solid #e3e6eb;border-radius:11px;
  background:#f8f9fa;padding:10px 12px;color:#343941;cursor:pointer;font-size:12px;font-weight:750;
  transition:background .17s,border-color .17s,color .17s;
}
.workshop-presets button:hover {background:#f3edf8;border-color:#d8c3e4;color:#66308d;}
.workshop-control {padding:15px;border:1px solid #edf0f2;background:#fafbfc;border-radius:13px;margin-bottom:12px;min-width:0;}
.workshop-control:last-child {margin-bottom:0;}
.workshop-control__head {display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:5px;}
.workshop-control__head label {font-weight:850;color:#282b33;font-size:12px;line-height:1.7;min-width:0;}
.workshop-control__head output {font-weight:850;font-size:12px;color:#66308d;background:#f3ecf8;padding:4px 10px;border-radius:9px;white-space:nowrap;}
.workshop-control > p {font-size:12px;line-height:1.95;color:#777d88;margin-bottom:10px;}
.workshop-control__inputs {display:flex;align-items:center;gap:14px;min-width:0;}
.workshop-control__inputs input[type=range] {
  flex:1;min-width:0;min-height:40px;cursor:pointer;border:0;background:transparent;
  appearance:none;-webkit-appearance:none;direction:rtl;
  background-image:linear-gradient(to left,#66308d var(--wk-fill),#e2e4ea var(--wk-fill));
  background-repeat:no-repeat;background-size:100% 6px;background-position:center;
}
.workshop-control__inputs input[type=range]::-webkit-slider-thumb {
  -webkit-appearance:none;appearance:none;width:21px;height:21px;border-radius:50%;
  background:#fff;border:5px solid #66308d;box-shadow:0 2px 7px rgba(39,22,51,.2);
  cursor:grab;
}
.workshop-control__inputs input[type=range]::-moz-range-thumb {
  width:12px;height:12px;border-radius:50%;background:#fff;
  border:5px solid #66308d;box-shadow:0 2px 7px rgba(39,22,51,.2);
  cursor:grab;
}
.workshop-control__inputs input[type=number] {
  width:80px;min-width:70px;max-width:90px;height:44px;padding:8px 9px;
  border:1px solid #dfe2e8;border-radius:10px;background:#fff;
  color:#292c35;text-align:center;direction:ltr;font-size:14px;font-weight:800;
  font-variant-numeric:tabular-nums;
}
.workshop-control__inputs input[type=number]:focus {border-color:#66308d;}
.scenario-save-form {border-color:#e4dce9;}
.scenario-save-form > label {display:flex;flex-direction:column;gap:7px;font-size:12px;font-weight:750;color:#343941;margin-bottom:13px;}
.scenario-save-form input,.scenario-save-form textarea {
  width:100%;border:1px solid #e1e4ea;border-radius:11px;
  min-height:48px;background:#fafbfc;padding:11px 12px;color:#252830;
  font-size:13px;font-weight:500;resize:vertical;
}
.scenario-save-form textarea {min-height:84px;}
.scenario-save-form :is(input,textarea)::placeholder {color:#989ca6;}
.workshop-copy {
  display:inline-flex;justify-content:center;align-items:center;text-align:center;
  width:100%;min-height:49px;border:1px solid #dedfe4;border-radius:12px;
  padding:11px 15px;background:#24262e;color:#fff;font-size:13px;font-weight:800;
  cursor:pointer;transition:background .18s,transform .18s,box-shadow .18s;
}
.workshop-copy:hover:not(:disabled) {background:#393b45;box-shadow:0 7px 16px rgba(22,25,33,.10);transform:translateY(-1px);}
.scenario-save-form > .workshop-copy {background:#66308d;border-color:#66308d;}
.scenario-save-form > .workshop-copy:hover:not(:disabled) {background:#56257c;}
.workshop-copy:disabled {opacity:.48;cursor:not-allowed;}
.scenario-save-status {color:#176b55;font-size:12px;line-height:1.9;margin-top:10px !important;overflow-wrap:anywhere;}
.scenario-save-status:empty {display:none;}
.saved-scenario-list {border-top:1px solid #eef0f2;margin-top:14px;padding-top:10px;display:flex;flex-direction:column;gap:8px;}
.saved-scenario-list article {display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;border:1px solid #eaedf0;border-radius:11px;min-width:0;background:#fcfcfd;}
.saved-scenario-list article button {background:transparent;border:0;padding:0;display:flex;flex-direction:column;align-items:flex-start;text-align:right;gap:2px;cursor:pointer;flex:1;min-width:0;}
.saved-scenario-list article button b {font-size:12px;overflow-wrap:anywhere;}
.saved-scenario-list article button small {font-size:10px;color:var(--wk-faint);}
.saved-scenario-list article a {flex:none;font-size:11px;color:#66308d;font-weight:800;}
.workshop-live {border:1px solid #d8f0e8;color:#126c5d;background:#edf9f5;padding:11px 13px;border-radius:11px;text-align:center;font-size:12px;font-weight:650;}
.workshop-warning {border-radius:14px;padding:14px 16px;color:#9d5025;background:#fff4e8;border:1px solid #fae4ca;font-size:12px;font-weight:750;}
.workshop-guide {border-color:#e3e9ed;}
.workshop-guide .workshop-panel__head {align-items:center;}
.workshop-guide .workshop-panel__head > strong {font-size:12px;color:#087e73;background:#e9f8f5;border-radius:8px;padding:5px 10px;white-space:nowrap;}
.workshop-guide__grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}
.workshop-guide__grid article {background:#f8f9fb;border:1px solid #eceef2;padding:14px;border-radius:12px;min-width:0;}
.workshop-guide__grid article b {display:block;color:#30353c;font-size:12px;font-weight:850;margin-bottom:3px;}
.workshop-guide__grid article p {color:#737983;font-size:11px;line-height:1.9;}
.workshop-stats {display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px;}
.workshop-stat {display:flex;flex-direction:column;min-width:0;gap:7px;border:1px solid #e9ebef;border-radius:16px;background:#fff;padding:17px 16px;position:relative;overflow:hidden;}
.workshop-stat:before {content:"";position:absolute;top:0;right:0;width:3px;height:100%;background:var(--workshop-accent);opacity:.8;}
.workshop-stat > span {font-size:11px;font-weight:750;color:#666d78;line-height:1.8;}
.workshop-stat > strong {font-size:clamp(19px,2.2vw,27px);font-weight:900;line-height:1.35;color:#202127;white-space:nowrap;}
.workshop-stat > small {font-size:11px;color:#7b818b;line-height:1.8;}
.workshop-distribution .workshop-panel__head {align-items:end;}
.workshop-histogram {width:100%;min-width:0;display:flex;align-items:flex-end;gap:7px;height:245px;padding:16px 9px 11px;border:1px solid #edf0f2;background:#f9fafb;border-radius:14px;overflow:hidden;}
.workshop-histogram__bin {display:flex;flex:1;flex-direction:column;justify-content:flex-end;align-items:center;gap:7px;min-width:0;height:100%;text-align:center;}
.workshop-histogram__bin > b {font-size:11px;color:#3a3b45;font-weight:800;line-height:1.4;white-space:nowrap;}
.workshop-histogram__bin > i {display:block;width:100%;min-height:3px;max-width:72px;border-radius:7px 7px 2px 2px;background:linear-gradient(0deg,#a4e5d9 0%,#01ae9b 95%);transition:height .2s ease;}
.workshop-histogram__bin > span {color:#717781;font-size:10px;line-height:1.45;min-height:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;}
.workshop-band-summary {display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:15px;}
.workshop-band-summary > span {display:flex;align-items:center;gap:6px;flex-wrap:wrap;min-width:0;border:1px solid #ebeef0;border-radius:10px;padding:8px 10px;font-size:11px;color:#676e78;background:#fff;}
.workshop-band-summary i {width:8px;height:8px;flex:none;border-radius:50%;}
.workshop-band-summary b {font-weight:850;font-size:12px;color:#252830;margin-right:auto;}
.neighborhood-score-grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;max-height:520px;overflow:auto;overscroll-behavior:contain;padding:1px 3px 3px;scrollbar-color:#d5d9df transparent;}
.neighborhood-score-grid label {border:1px solid #e9ebef;background:#fafbfc;border-radius:13px;display:flex;gap:12px;align-items:center;justify-content:space-between;padding:10px 13px;min-width:0;}
.neighborhood-score-grid label > span {display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;}
.neighborhood-score-grid label b {font-weight:800;color:#282c35;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.neighborhood-score-grid label small {color:#77808a;font-size:10px;line-height:1.7;overflow-wrap:anywhere;}
.neighborhood-score-grid input {width:65px;height:40px;flex:none;text-align:center;direction:ltr;border-radius:9px;border:1px solid #dfe2e8;background:#fff;font-weight:800;color:#2c3037;font-size:13px;}
.workshop-table-head {margin-bottom:14px;}
.workshop-table-wrap {width:100%;max-width:100%;overflow:auto;overscroll-behavior-x:contain;border:1px solid #e9ebee;border-radius:12px;scrollbar-color:#d6dbe2 transparent;}
.workshop-table {width:100%;border-collapse:separate;border-spacing:0;min-width:1130px;font-size:12px;line-height:1.65;}
.workshop-table th {text-align:right;background:#f7f8fa;color:#686f79;border-bottom:1px solid #e7e9ed;padding:8px 12px;white-space:nowrap;font-size:11px;font-weight:800;}
.workshop-table td {padding:13px 12px;border-bottom:1px solid #f0f1f4;color:#565e69;vertical-align:middle;white-space:nowrap;}
.workshop-table tr:last-child td {border-bottom:0;}
.workshop-table tbody tr:hover td {background:#faf9fc;}
.workshop-table th:first-child, .workshop-table td:first-child {position:sticky;right:0;z-index:1;box-shadow:-1px 0 0 #ebeef1;}
.workshop-table td:first-child {background:#fff;}
.workshop-table th:first-child {z-index:3;}
.workshop-table td:nth-child(2) {min-width:220px;max-width:285px;}
.workshop-table td:nth-child(2) a {display:flex;flex-direction:column;gap:4px;min-width:0;}
.workshop-table td:nth-child(2) b {font-weight:850;color:#282b35;max-width:260px;overflow:hidden;text-overflow:ellipsis;}
.workshop-table td:nth-child(2) small {font-size:11px;color:#77808b;max-width:250px;overflow:hidden;text-overflow:ellipsis;}
.workshop-table td:first-child strong {color:#66308d;background:#f3edf8;border-radius:8px;padding:4px 8px;font-weight:900;}
.workshop-score {font-size:16px;font-weight:900;}
.workshop-table td:nth-last-child(2) > small {display:block;font-size:10px;color:#757c86;margin-top:3px;}
.workshop-table td.movement-up {color:#14785f;font-weight:850;}
.workshop-table td.movement-down {color:#b6404b;font-weight:850;}
.property-breakdown {position:relative;}
.property-breakdown summary {list-style:none;cursor:pointer;display:inline-flex;align-items:center;gap:7px;padding:4px 10px;border-radius:8px;border:1px solid #e2e6ec;color:#454c57;background:#f8f9fb;font-weight:800;}
.property-breakdown summary::-webkit-details-marker {display:none;}
.property-breakdown summary::after {content:"⌄";font-size:14px;color:#747983;}
.property-breakdown[open] summary {border-color:#e2d3ed;background:#f5eef9;color:#66308d;}
.property-breakdown > div {padding:12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;background:#fff;border:1px solid #e7e8ed;border-radius:12px;box-shadow:0 10px 25px rgba(23,28,37,.07);min-width:245px;margin-top:7px;white-space:normal;}
.property-breakdown > div span {font-size:11px;color:#656b75;line-height:1.8;}
.property-breakdown > div b {color:#252831;}
.workshop-table-note {font-size:11px;color:#747c85;line-height:1.9;margin-top:12px !important;}
.workshop-mobile-tabs, .workshop-mobile-pulse, .workshop-mobile-sort, .workshop-mobile-ranking {display:none;}
/* The desktop workstation is ALWAYS a two-column workspace.
   The settings rail remains visible on the right and scrolls independently. */
.workshop-sidebar-heading {
  border:1px solid #e8e0ee; border-radius:16px; padding:16px 17px;
  background:linear-gradient(115deg,#fbf8fd 0%,#fff 65%);
  display:flex;flex-direction:column;gap:3px;
}
.workshop-sidebar-heading span {color:#66308d;font-weight:850;font-size:11px;}
.workshop-sidebar-heading h2 {font-size:17px;font-weight:900;color:#24252b;line-height:1.5;}
.workshop-sidebar-heading p {color:#717781;font-size:11px;line-height:1.95;}
.workshop-sidebar-heading__action {
  display:inline-flex;align-self:flex-start;align-items:center;gap:6px;
  background:#66308d;color:#fff!important;border-radius:10px;padding:6px 12px;
  font-size:11px;font-weight:800;margin-top:8px;min-height:36px;
  transition:background .18s,transform .18s;
}
.workshop-sidebar-heading__action:hover {background:#512272;transform:translateY(-1px);}
.workshop-sidebar .workshop-panel {box-shadow:none;border-color:#e8eaf0;}
.workshop-sidebar .workshop-panel:not(.workshop-accordion):not(.scenario-save-form) {background:#fff;}
.workshop-sidebar .workshop-accordion {background:#fff;transition:border-color .16s,box-shadow .16s;}
.workshop-sidebar .workshop-accordion:hover {border-color:#d9d2e0;}
.workshop-sidebar .workshop-accordion[open] {border-color:#e3deea;box-shadow:0 3px 14px rgba(37,26,53,.025);}
.workshop-sidebar .workshop-accordion > summary {background:#fff;}
.workshop-sidebar .workshop-accordion > summary:hover {background:#fcfafe;}
.workshop-sidebar .workshop-accordion[open] > summary {background:#fbfafc;}
.workshop-control {transition:border-color .18s,background .18s;}
.workshop-control:focus-within {border-color:#d9c2ea;background:#fff;}
.workshop-copy:focus-visible,.workshop-control input:focus-visible,.workshop-mobile-tabs button:focus-visible {outline:3px solid rgba(102,48,141,.3);outline-offset:3px;}
@media (min-width:981px) {
  .workshop-layout {grid-template-columns:minmax(305px,360px) minmax(0,1fr);gap:24px;align-items:start;}
  .workshop-sidebar {
    position:sticky;top:86px;align-self:start;
    height:max-content;max-height:calc(100vh - 101px);max-height:calc(100dvh - 101px);
    overflow-x:hidden;overflow-y:auto;overscroll-behavior-y:contain;
    scroll-behavior:smooth;scrollbar-width:thin;scrollbar-color:#c9c5cf transparent;
    padding:0 4px 16px 2px;gap:12px;
  }
  .workshop-sidebar > * {flex-shrink:0;}
  .workshop-sidebar::-webkit-scrollbar {width:5px;}
  .workshop-sidebar::-webkit-scrollbar-thumb {background:#d4cbdc;border-radius:99px;}
  .workshop-sidebar-heading {position:sticky;top:0;z-index:4;box-shadow:0 6px 16px rgba(249,247,251,.95);}
  .workshop-sidebar .workshop-panel {border-radius:15px;}
  .workshop-sidebar .workshop-panel__head h2 {font-size:14px;}
  .workshop-sidebar .workshop-control {padding:13px 12px;}
  .workshop-sidebar .workshop-accordion > summary {padding:16px 15px;min-height:67px;}
  .workshop-sidebar .workshop-accordion > .workshop-help {margin:13px 15px!important;}
  .workshop-sidebar .workshop-accordion > .workshop-control {margin-inline:11px;}
  .workshop-sidebar .workshop-accordion > .workshop-control:last-child {margin-bottom:12px;}
  .workshop-sidebar .workshop-control__inputs {gap:8px;}
  .workshop-sidebar .workshop-control__inputs input[type=number] {width:70px;min-width:65px;}
}
@media (max-width:1250px) {
  .workshop-layout {grid-template-columns:minmax(295px,345px) minmax(0,1fr);gap:17px;}
  .workshop-main {padding-inline:20px;}
  .workshop-panel {padding:20px;}
  .workshop-accordion {padding:0;}
  .workshop-stats {grid-template-columns:repeat(2,minmax(0,1fr));}
  .workshop-band-summary {grid-template-columns:repeat(2,minmax(0,1fr));}
}
@media (max-width:980px) {
  .workshop-hero {padding:27px;gap:18px;margin-bottom:14px;}
  .workshop-layout {display:block;}
  .workshop-page .workshop-mobile-tabs {display:grid;grid-template-columns:1fr 1fr;gap:6px;border-radius:13px;background:#ecedf1;padding:5px;margin:0 0 10px;}
  .workshop-mobile-tabs button {border:0;border-radius:10px;min-height:45px;background:transparent;color:#636a75;font-size:13px;font-weight:800;cursor:pointer;}
  .workshop-mobile-tabs button.is-active {background:#fff;color:#66308d;box-shadow:0 2px 9px rgba(24,30,43,.055);}
  .workshop-mobile-tabs button svg {vertical-align:-3px;margin-left:5px;}
  .workshop-mobile-tabs button .wk-tab-count {font-size:10px;padding:2px 6px;background:#eef0f3;color:#737985;border-radius:7px;margin-right:5px;}
  .workshop-page .workshop-mobile-pulse {display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:0 0 15px;padding:10px 15px;background:#fff;border:1px solid #e8ebef;border-radius:12px;}
  .workshop-mobile-pulse span {font-size:11px;font-weight:700;color:#68717a;}
  .workshop-mobile-pulse strong {font-size:17px;font-weight:900;color:#24242c;}
  .workshop-mobile-pulse small {font-size:11px;color:#087e73;font-weight:800;}
  .workshop-layout[data-mobile-tab="settings"] .workshop-results {display:none;}
  .workshop-layout[data-mobile-tab="results"] .workshop-sidebar {display:none;}
  .workshop-sidebar, .workshop-results {gap:13px;}
  .workshop-panel {padding:21px;}
  .workshop-accordion {padding:0;}
  .workshop-stats {grid-template-columns:repeat(4,minmax(0,1fr));}
}
@media (max-width:700px) {
  .workshop-main {padding:17px 14px 72px;}
  .workshop-hero {padding:23px 21px;grid-template-columns:1fr;gap:17px;border-radius:18px;}
  .workshop-hero h1 {font-size:24px;line-height:1.5;}
  .workshop-hero p {font-size:13px;line-height:1.95;}
  .workshop-hero aside {flex-direction:row;flex-wrap:wrap;align-items:center;gap:7px 13px;padding:11px 13px;border-radius:12px;}
  .workshop-hero aside > strong {font-size:12px;}
  .workshop-hero aside > small {flex:1 1 100%;font-size:11px;}
  .workshop-panel {border-radius:15px;padding:19px 16px;}
  .workshop-panel__head h2, .workshop-table-head h2 {font-size:15px;}
  .workshop-accordion {padding:0;}
  .workshop-accordion > summary {padding:17px 16px;min-height:70px;}
  .workshop-accordion > .workshop-help {margin:13px 15px !important;}
  .workshop-accordion > .workshop-control {margin-inline:12px;}
  .workshop-stats {grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;}
  .workshop-stat {padding:14px 12px;gap:6px;border-radius:13px;}
  .workshop-stat > strong {font-size:23px;}
  .workshop-guide__grid {gap:8px;}
  .workshop-guide__grid article {padding:10px;}
  .workshop-guide__grid article b {font-size:12px;}
  .workshop-guide__grid article p {font-size:11px;}
  .workshop-histogram {height:218px;gap:4px;padding:10px 7px;}
  .workshop-histogram__bin {gap:5px;}
  .workshop-histogram__bin b,.workshop-histogram__bin span {font-size:9px;}
  .workshop-band-summary {grid-template-columns:repeat(2,minmax(0,1fr));}
  .neighborhood-score-grid {grid-template-columns:1fr;max-height:470px;}
  .workshop-table-wrap {display:none;}
  .workshop-page .workshop-mobile-sort {display:flex;align-items:center;gap:9px;flex-wrap:wrap;padding-bottom:10px;}
  .workshop-mobile-sort label {display:flex;align-items:center;gap:9px;flex:1;min-width:0;font-size:11px;font-weight:750;color:#676e78;}
  .workshop-mobile-sort select {flex:1;min-width:0;min-height:44px;border:1px solid #e0e3e8;border-radius:10px;padding:8px 10px;background:#fff;color:#2d3137;font-size:12px;font-weight:750;}
  .workshop-mobile-sort button {border:1px solid #e0e3e8;background:#f8f9fa;color:#42474f;border-radius:10px;min-height:44px;padding:8px 11px;cursor:pointer;font-size:12px;font-weight:800;}
  .workshop-page .workshop-mobile-ranking {display:flex;flex-direction:column;gap:10px;}
  .wk-rank-card {padding:14px;border:1px solid #e9ebef;border-radius:13px;background:#fcfcfd;min-width:0;}
  .wk-rank-card__top {display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:11px;min-width:0;}
  .wk-rank-card__identity {min-width:0;flex:1;}
  .wk-rank-card__identity > a {display:block;color:#24262d;font-size:13px;font-weight:850;line-height:1.9;overflow-wrap:anywhere;}
  .wk-rank-card__identity > small {display:block;color:#757d85;font-size:11px;line-height:1.8;}
  .wk-rank-card__rank {border-radius:9px;background:#f4eef8;color:#66308d;padding:5px 9px;font-size:13px;font-weight:900;white-space:nowrap;}
  .wk-rank-card__score {display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 12px;border:1px solid #e9eef0;background:#f5f8f8;border-radius:10px;margin-bottom:10px;}
  .wk-rank-card__score > span {display:flex;flex-direction:column;gap:2px;font-size:11px;color:#747a82;}
  .wk-rank-card__score strong {font-size:20px;font-weight:900;line-height:1.4;}
  .wk-rank-card__score small {font-size:10px;color:#606a74;line-height:1.4;}
  .wk-rank-card__delta {font-size:12px;font-weight:850;white-space:nowrap;text-align:left;}
  .wk-rank-card__delta.is-up {color:#14785f;}
  .wk-rank-card__delta.is-down {color:#b6404b;}
  .wk-rank-card__metrics {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;}
  .wk-rank-card__metrics > div {display:flex;flex-direction:column;gap:1px;min-width:0;border:1px solid #e9ebef;border-radius:9px;padding:8px;background:#fff;}
  .wk-rank-card__metrics span {font-size:11px;color:#7c818a;}
  .wk-rank-card__metrics b {font-size:13px;color:#30343c;font-weight:850;}
  .wk-rank-card__breakdown {border:1px solid #e8e9ef;border-radius:10px;margin-top:10px;background:#fff;}
  .wk-rank-card__breakdown > summary {cursor:pointer;list-style:none;min-height:42px;padding:9px 12px;color:#66308d;font-size:11px;font-weight:800;}
  .wk-rank-card__breakdown > summary::-webkit-details-marker {display:none;}
  .wk-rank-card__breakdown > summary:before {content:"+";display:inline-block;margin-left:7px;font-size:15px;}
  .wk-rank-card__breakdown[open] > summary:before {content:"−";}
  .wk-rank-card__breakdown > div {border-top:1px solid #edf0f2;padding:9px 12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px 10px;}
  .wk-rank-card__breakdown span {font-size:11px;color:#69717a;}
  .wk-rank-card__breakdown b {font-weight:850;color:#24262d;}
}
@media (max-width:370px) {
  .workshop-main {padding-inline:10px;}
  .workshop-panel {padding-inline:13px;}
  .workshop-accordion {padding:0;}
  .workshop-guide__grid {grid-template-columns:1fr;}
  .workshop-control__inputs {gap:8px;}
  .workshop-control__inputs input[type=number] {width:70px;min-width:66px;}
  .workshop-hero {padding-inline:17px;}
}
@media (prefers-reduced-motion: reduce) {
  .workshop-page *, .workshop-page *:before, .workshop-page *:after {transition:none !important;animation:none !important;scroll-behavior:auto !important;}
}
`,E={"strong-value":`فرصت خرید بسیار خوب`,promising:`ارزش بررسی دارد`,fair:`قیمت نسبتاً منصفانه`,"weak-value":`ارزش خرید پایین`},D={"strong-value":l.green,promising:l.secondaryDark,fair:l.orange,"weak-value":l.red},O={elevator:`آسانسور`,parking:`پارکینگ`,storage:`انباری`,balcony:`بالکن`,floor:`طبقه`,noElevatorHighFloor:`طبقه بالا بدون آسانسور`,topFloor:`طبقه آخر`,age:`سن بنا`,newBuild:`نوساز بودن`,unitDensity:`تعداد واحد در طبقه`,area:`متراژ`,rooms:`تعداد اتاق`};function k(e){return String(e??``).replace(/[0-9]/g,e=>`۰۱۲۳۴۵۶۷۸۹`[Number(e)])}function A({id:e,label:t,detail:n,value:r,onChange:i,min:a=0,max:s=100,step:c=1,unit:l=`٪`,signed:u=!1}){let d=`${u&&r>0?`+`:``}${o(r)}${l?` ${l}`:``}`,f=s===a?0:Math.max(0,Math.min(100,(Number(r)-a)/(s-a)*100));return(0,w.jsxs)(`div`,{className:`workshop-control`,children:[(0,w.jsxs)(`div`,{className:`workshop-control__head`,children:[(0,w.jsx)(`label`,{htmlFor:e,children:t}),(0,w.jsx)(`output`,{htmlFor:e,"aria-live":`off`,children:d})]}),(0,w.jsx)(`p`,{children:n}),(0,w.jsxs)(`div`,{className:`workshop-control__inputs`,children:[(0,w.jsx)(`input`,{id:e,type:`range`,min:a,max:s,step:c,value:r,style:{"--wk-fill":`${f}%`},"aria-valuetext":d,onChange:e=>i(Number(e.target.value))}),(0,w.jsx)(`input`,{"aria-label":`${t}`,type:`number`,inputMode:`decimal`,lang:`fa`,min:a,max:s,step:c,value:r,onChange:e=>i(Math.max(a,Math.min(s,Number(e.target.value))))})]})]})}function j({label:e,value:t,detail:n,tone:r=l.secondary}){return(0,w.jsxs)(`article`,{className:`workshop-stat`,style:{"--workshop-accent":r},children:[(0,w.jsx)(`span`,{children:e}),(0,w.jsx)(`strong`,{children:t}),(0,w.jsx)(`small`,{children:n})]})}function M({histogram:e}){let t=Math.max(1,...e.map(e=>e.count));return(0,w.jsx)(`div`,{className:`workshop-histogram`,"aria-label":`پراکندگی امتیازهای تنظیم آزمایشی`,children:e.map(e=>(0,w.jsxs)(`div`,{className:`workshop-histogram__bin`,children:[(0,w.jsx)(`b`,{children:o(e.count)}),(0,w.jsx)(`i`,{style:{height:`${Math.max(2,e.count/t*100)}%`}}),(0,w.jsx)(`span`,{dir:`ltr`,children:k(e.label)})]},e.label))})}function N(){let[e,t]=(0,m.useState)(null),[g,v]=(0,m.useState)(``),[y,b]=(0,m.useState)(()=>{try{return{...h,...JSON.parse(localStorage.getItem(`owj-scoring-workshop`)||`{}`)}}catch{return{...h}}}),[x,S]=(0,m.useState)(``),[k,N]=(0,m.useState)(``),[P,F]=(0,m.useState)(``),[I,L]=(0,m.useState)([]),[R,z]=(0,m.useState)(!1),[B,V]=(0,m.useState)(``),[H,U]=(0,m.useState)(`settings`);(0,m.useEffect)(()=>{let e=new AbortController;return fetch(`/score-workshop-data`,{signal:e.signal}).then(e=>e.ok?e.json():Promise.reject(Error(`Server returned HTTP ${e.status}`))).then(t).catch(e=>{e.name!==`AbortError`&&v(e.message)}),()=>e.abort()},[]),(0,m.useEffect)(()=>{fetch(`/scoring-scenarios`,{headers:{accept:`application/json`}}).then(e=>e.ok?e.json():Promise.reject(Error(`HTTP ${e.status}`))).then(e=>L(e.scenarios||[])).catch(()=>{})},[]),(0,m.useEffect)(()=>{localStorage.setItem(`owj-scoring-workshop`,JSON.stringify(y))},[y]);let W=(0,m.useMemo)(()=>C(e?.listings||[],y),[e,y]),G=f(W.rows,{searchText:e=>`${e.title} ${e.neighborhood} ${e.token}`,columns:{rank:e=>e.scenario.rank,listing:e=>e.title,deal:e=>e.scenario.dealValue,property:e=>e.scenario.property.score,neighborhood:e=>e.scenario.neighborhoodScore,confidence:e=>e.scores.confidence,risk:e=>e.scores.risk,current:e=>e.scores.recommendation,experimental:e=>e.scenario.recommendation,movement:e=>e.rank-e.scenario.rank},initialSort:{key:`rank`,direction:`asc`}}),K=G.rows.slice(0,100),q=y.strongThreshold>y.promisingThreshold&&y.promisingThreshold>y.fairThreshold,J=Object.values(W.neighborhoods).sort((e,t)=>(y.neighborhoodScores?.[t.name]??t.score)-(y.neighborhoodScores?.[e.name]??e.score)),Y=(e,t)=>b(n=>({...n,[e]:t})),X=(e,t)=>b(n=>({...n,neighborhoodScores:{...n.neighborhoodScores,[e]:t}}));return!e&&!g?(0,w.jsx)(c,{message:`در حال آماده‌سازی کارگاه امتیازدهی`}):g?(0,w.jsx)(a,{message:g}):(0,w.jsxs)(`div`,{className:`workshop-page`,dir:`rtl`,children:[(0,w.jsx)(`style`,{children:T}),(0,w.jsx)(s,{active:`workshop`}),(0,w.jsxs)(`main`,{className:`workshop-main`,children:[(0,w.jsxs)(`section`,{className:`workshop-hero`,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsxs)(`span`,{children:[(0,w.jsx)(n,{name:`trend`,size:18}),` محیط آزمایشی امتیازدهی`]}),(0,w.jsx)(`h1`,{children:`آزمایش و تنظیم امتیاز آگهی‌ها`}),(0,w.jsx)(`p`,{children:`سهم هر بخش و اثر هر ویژگی را همراه مدیر تغییر دهید و نتیجه را همان لحظه روی امتیاز و رتبه آگهی‌ها ببینید. تغییرهای این صفحه آزمایشی‌اند و اطلاعات اصلی را عوض نمی‌کنند.`})]}),(0,w.jsxs)(`aside`,{children:[(0,w.jsx)(`span`,{children:`نسخه داده`}),(0,w.jsx)(`strong`,{children:e.scoringVersion}),(0,w.jsxs)(`small`,{children:[o(e.total),` آگهی · `,i(e.generatedAt)]})]})]}),(0,w.jsxs)(`div`,{className:`workshop-mobile-tabs`,role:`group`,"aria-label":`نمای کارگاه در موبایل`,children:[(0,w.jsxs)(`button`,{type:`button`,className:H===`settings`?`is-active`:``,"aria-pressed":H===`settings`,onClick:()=>U(`settings`),children:[(0,w.jsx)(n,{name:`building`,size:16}),` تنظیمات`]}),(0,w.jsxs)(`button`,{type:`button`,className:H===`results`?`is-active`:``,"aria-pressed":H===`results`,onClick:()=>U(`results`),children:[(0,w.jsx)(n,{name:`trend`,size:16}),` نتایج زنده`]})]}),(0,w.jsxs)(`div`,{className:`workshop-mobile-pulse`,"aria-live":`polite`,children:[(0,w.jsx)(`span`,{children:`میانگین امتیاز آزمایشی`}),(0,w.jsx)(`strong`,{children:o(W.summary.average)}),(0,w.jsxs)(`small`,{children:[o(W.summary.bandChanges),` تغییر دسته`]})]}),(0,w.jsxs)(`div`,{className:`workshop-layout`,"data-mobile-tab":H,children:[(0,w.jsxs)(`aside`,{className:`workshop-sidebar`,id:`workshop-settings`,"aria-label":`تنظیمات مدل امتیازدهی`,children:[(0,w.jsxs)(`header`,{className:`workshop-sidebar-heading`,children:[(0,w.jsx)(`span`,{children:`پنل کنترل کارگاه`}),(0,w.jsx)(`h2`,{children:`تنظیمات امتیازدهی`}),(0,w.jsx)(`p`,{children:`وزن‌ها و حدنصاب‌ها را تغییر دهید؛ نتیجه همان لحظه در کنار این پنل به‌روز می‌شود.`}),(0,w.jsx)(`a`,{href:`#wk-save`,className:`workshop-sidebar-heading__action`,children:`ذخیره سناریو ←`})]}),(0,w.jsxs)(`section`,{className:`workshop-panel`,children:[(0,w.jsxs)(`div`,{className:`workshop-panel__head`,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`شروع سریع`}),(0,w.jsx)(`h2`,{children:`الگوهای آماده`})]}),(0,w.jsx)(`button`,{type:`button`,onClick:()=>b({...h}),children:`بازگشت به پیشنهاد اولیه`})]}),(0,w.jsx)(`div`,{className:`workshop-presets`,children:Object.entries(_).map(([e,t])=>(0,w.jsx)(`button`,{type:`button`,onClick:()=>b({...t.values}),children:t.label},e))})]}),(0,w.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-price`,open:!0,children:[(0,w.jsxs)(`summary`,{className:`workshop-panel__head`,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`مرحله ۱`}),(0,w.jsx)(`h2`,{children:`مناسب‌بودن قیمت`})]}),(0,w.jsxs)(`b`,{className:W.dealWeightTotal===100?`is-valid`:`is-invalid`,children:[o(W.dealWeightTotal),`٪`]})]}),(0,w.jsx)(`p`,{className:`workshop-help`,children:`وزن یعنی سهم هر معیار در نتیجه این مرحله؛ وزن بیشتر، اثر بیشتر. بهتر است جمع سه وزن ۱۰۰٪ باشد.`}),(0,w.jsx)(A,{id:`weight-model`,label:`مقایسه با قیمت برآوردی`,detail:`بررسی می‌کند قیمت آگهی چقدر از قیمت برآوردشده سامانه ارزان‌تر یا گران‌تر است.`,value:y.modelValue,onChange:e=>Y(`modelValue`,e)}),(0,w.jsx)(A,{id:`weight-nearby`,label:`مقایسه با آگهی‌های مشابه`,detail:`قیمت این ملک را با آگهی‌های مشابه و نزدیک در همان محدوده مقایسه می‌کند.`,value:y.nearbyValue,onChange:e=>Y(`nearbyValue`,e)}),(0,w.jsx)(A,{id:`weight-position`,label:`جایگاه قیمت در محله`,detail:`نشان می‌دهد قیمت هر متر این آگهی در میان قیمت‌های همان محله پایین، معمولی یا بالا است.`,value:y.localPosition,onChange:e=>Y(`localPosition`,e)})]}),(0,w.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-overall`,open:!0,children:[(0,w.jsxs)(`summary`,{className:`workshop-panel__head`,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`ترکیب نهایی`}),(0,w.jsx)(`h2`,{children:`سهم بخش‌ها در امتیاز نهایی`})]}),(0,w.jsxs)(`b`,{className:W.overallWeightTotal===100?`is-valid`:`is-invalid`,children:[o(W.overallWeightTotal),`٪`]})]}),(0,w.jsx)(`p`,{className:`workshop-help`,children:`این سه عدد مشخص می‌کنند قیمت، ویژگی‌های ملک و محله هرکدام چه سهمی از امتیاز پیش از تعدیل داشته باشند.`}),(0,w.jsx)(A,{id:`pillar-valuation`,label:`مناسب‌بودن قیمت`,detail:`خلاصه سه مقایسه قیمتی مرحله قبل؛ وزن بیشتر یعنی حساسیت بیشتر به ارزان یا گران بودن آگهی.`,value:y.valuationWeight,onChange:e=>Y(`valuationWeight`,e)}),(0,w.jsx)(A,{id:`pillar-property`,label:`ویژگی‌های خودِ ملک`,detail:`امکانات، طبقه، سن بنا، متراژ، تعداد اتاق و تعداد واحد در طبقه را در نظر می‌گیرد.`,value:y.propertyWeight,onChange:e=>Y(`propertyWeight`,e)}),(0,w.jsx)(A,{id:`pillar-neighborhood`,label:`امتیاز محله`,detail:`امتیاز عددی محله را وارد نتیجه می‌کند؛ این عدد در بخش «محله‌ها» قابل اصلاح است.`,value:y.neighborhoodWeight,onChange:e=>Y(`neighborhoodWeight`,e)})]}),(0,w.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-amenities`,children:[(0,w.jsx)(`summary`,{className:`workshop-panel__head`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`امکانات`}),(0,w.jsx)(`h2`,{children:`اثر امکانات بر امتیاز ملک`})]})}),(0,w.jsx)(`p`,{className:`workshop-help`,children:`امتیاز ویژگی‌های ملک از ۵۰ شروع می‌شود. عدد مثبت به آن اضافه و عدد منفی از آن کم می‌شود؛ نتیجه همیشه بین صفر تا ۱۰۰ می‌ماند.`}),(0,w.jsx)(A,{id:`elevator-yes`,label:`داشتن آسانسور`,detail:`اگر آگهی آسانسور داشته باشد، این مقدار به امتیاز ملک اضافه می‌شود.`,value:y.elevatorYes,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>Y(`elevatorYes`,e)}),(0,w.jsx)(A,{id:`elevator-no`,label:`نداشتن آسانسور`,detail:`اگر آگهی آسانسور نداشته باشد، این مقدار روی امتیاز ملک اعمال می‌شود؛ عدد منفی یعنی کسر امتیاز.`,value:y.elevatorNo,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>Y(`elevatorNo`,e)}),(0,w.jsx)(A,{id:`parking-yes`,label:`داشتن پارکینگ`,detail:`اگر ملک پارکینگ داشته باشد، این مقدار به امتیاز ملک اضافه می‌شود.`,value:y.parkingYes,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>Y(`parkingYes`,e)}),(0,w.jsx)(A,{id:`parking-no`,label:`نداشتن پارکینگ`,detail:`اگر ملک پارکینگ نداشته باشد، این مقدار از امتیاز ملک کم می‌شود.`,value:y.parkingNo,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>Y(`parkingNo`,e)}),(0,w.jsx)(A,{id:`storage-yes`,label:`داشتن انباری`,detail:`اثر وجود انباری بر امتیاز ویژگی‌های ملک.`,value:y.storageYes,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>Y(`storageYes`,e)}),(0,w.jsx)(A,{id:`storage-no`,label:`نداشتن انباری`,detail:`اثر نبود انباری؛ عدد منفی از امتیاز ملک کم می‌کند.`,value:y.storageNo,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>Y(`storageNo`,e)}),(0,w.jsx)(A,{id:`balcony-yes`,label:`داشتن بالکن`,detail:`اثر وجود بالکن بر امتیاز ویژگی‌های ملک.`,value:y.balconyYes,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>Y(`balconyYes`,e)}),(0,w.jsx)(A,{id:`balcony-no`,label:`نداشتن بالکن`,detail:`اثر نبود بالکن؛ عدد منفی از امتیاز ملک کم می‌کند.`,value:y.balconyNo,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>Y(`balconyNo`,e)})]}),(0,w.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-building`,children:[(0,w.jsx)(`summary`,{className:`workshop-panel__head`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`مشخصات ساختمان`}),(0,w.jsx)(`h2`,{children:`اثر طبقه، سن و اندازه ملک`})]})}),(0,w.jsx)(A,{id:`floor-third`,label:`هر طبقه بالاتر از طبقه دوم`,detail:`برای طبقه سوم یک‌بار، طبقه چهارم دو بار و به همین ترتیب اعمال می‌شود.`,value:y.floorAboveSecondPenalty,min:-15,max:5,step:.5,unit:`امتیاز`,signed:!0,onChange:e=>Y(`floorAboveSecondPenalty`,e)}),(0,w.jsx)(A,{id:`floor-no-elevator`,label:`کسر اضافه برای طبقه بالا بدون آسانسور`,detail:`علاوه بر اثر طبقه، برای هر طبقه بالاتر از دوم در ساختمان بدون آسانسور اعمال می‌شود.`,value:y.noElevatorHighFloorPenalty,min:-20,max:0,step:.5,unit:`امتیاز`,signed:!0,onChange:e=>Y(`noElevatorHighFloorPenalty`,e)}),(0,w.jsx)(A,{id:`floor-basement`,label:`واحد زیرزمین`,detail:`این مقدار یک‌بار برای واحدی که در زیرزمین قرار دارد اعمال می‌شود.`,value:y.basementPenalty,min:-30,max:0,unit:`امتیاز`,signed:!0,onChange:e=>Y(`basementPenalty`,e)}),(0,w.jsx)(A,{id:`floor-ground`,label:`واحد همکف`,detail:`اثر قرارگرفتن واحد در طبقه همکف بر امتیاز ملک.`,value:y.groundFloorPenalty,min:-20,max:5,unit:`امتیاز`,signed:!0,onChange:e=>Y(`groundFloorPenalty`,e)}),(0,w.jsx)(A,{id:`floor-top`,label:`واحد طبقه آخر`,detail:`اثر قرارگرفتن واحد در آخرین طبقه ساختمان، مانند احتمال گرما یا مشکل بام.`,value:y.topFloorPenalty,min:-20,max:5,unit:`امتیاز`,signed:!0,onChange:e=>Y(`topFloorPenalty`,e)}),(0,w.jsx)(A,{id:`age-year`,label:`کسر امتیاز به‌ازای هر سال عمر بنا`,detail:`در سن بنا ضرب می‌شود؛ مثلاً منفی ۰٫۵ برای بنای ۱۰ ساله یعنی کسر ۵ امتیاز.`,value:y.agePerYearPenalty,min:-2,max:0,step:.05,unit:`امتیاز`,signed:!0,onChange:e=>Y(`agePerYearPenalty`,e)}),(0,w.jsx)(A,{id:`new-build`,label:`امتیاز نوساز بودن`,detail:`اگر عمر بنا صفر یا یک سال باشد، این مقدار یک‌بار به امتیاز ملک اضافه می‌شود.`,value:y.newBuildBonus,min:-10,max:15,unit:`امتیاز`,signed:!0,onChange:e=>Y(`newBuildBonus`,e)}),(0,w.jsx)(A,{id:`single-unit`,label:`تک‌واحدی بودن طبقه`,detail:`اگر در هر طبقه فقط یک واحد باشد، این مقدار به امتیاز ملک اضافه می‌شود.`,value:y.singleUnitBonus,min:-10,max:15,unit:`امتیاز`,signed:!0,onChange:e=>Y(`singleUnitBonus`,e)}),(0,w.jsx)(A,{id:`extra-unit`,label:`هر واحد اضافه در یک طبقه`,detail:`از واحد دوم به بعد، به‌ازای هر واحد اضافه این مقدار اعمال می‌شود؛ مثلاً سه واحد یعنی دو بار.`,value:y.extraUnitPenalty,min:-10,max:0,step:.5,unit:`امتیاز`,signed:!0,onChange:e=>Y(`extraUnitPenalty`,e)}),(0,w.jsx)(A,{id:`area-step`,label:`اثر هر ۲۵ متر اختلاف با ۷۵ متر`,detail:`۷۵ متر نقطه مبنا است؛ ملک ۱۰۰ متری یک بار و ملک ۵۰ متری یک بار در جهت مخالف اثر می‌گیرد.`,value:y.areaPer25Sqm,min:-5,max:5,step:.5,unit:`امتیاز`,signed:!0,onChange:e=>Y(`areaPer25Sqm`,e)}),(0,w.jsx)(A,{id:`room-point`,label:`اثر هر اتاق اختلاف با دو اتاق`,detail:`دو اتاق نقطه مبنا است؛ سه‌خوابه یک بار و یک‌خوابه یک بار در جهت مخالف اثر می‌گیرد.`,value:y.roomPoint,min:-5,max:5,step:.5,unit:`امتیاز`,signed:!0,onChange:e=>Y(`roomPoint`,e)})]}),(0,w.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-risk`,children:[(0,w.jsx)(`summary`,{className:`workshop-panel__head`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`مرحله ۲`}),(0,w.jsx)(`h2`,{children:`تعدیل بر اساس اعتماد و ریسک`})]})}),(0,w.jsx)(`p`,{className:`workshop-help`,children:`پس از محاسبه قیمت، ملک و محله، قابل‌اعتماد بودن داده و نشانه‌های ریسک می‌توانند امتیاز را کاهش دهند.`}),(0,w.jsx)(A,{id:`confidence-floor`,label:`حداقل سهم امتیاز در نبود اطمینان`,detail:`اگر اعتماد به داده صفر باشد، همین درصد از امتیاز حفظ می‌شود؛ با افزایش اعتماد، سهم حفظ‌شده به ۱۰۰٪ نزدیک می‌شود.`,value:y.confidenceFloor,onChange:e=>Y(`confidenceFloor`,e)}),(0,w.jsx)(A,{id:`risk-penalty`,label:`بیشترین کاهش به‌دلیل ریسک`,detail:`اگر ریسک ۱۰۰ باشد، امتیاز حداکثر به‌اندازه این درصد کاهش می‌یابد؛ ریسک کمتر، کاهش کمتری دارد.`,value:y.riskPenalty,onChange:e=>Y(`riskPenalty`,e)})]}),(0,w.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-thresholds`,children:[(0,w.jsxs)(`summary`,{className:`workshop-panel__head`,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`مرحله ۳`}),(0,w.jsx)(`h2`,{children:`حد نصاب دسته‌بندی`})]}),(0,w.jsx)(`b`,{className:q?`is-valid`:`is-invalid`,children:q?`درست`:`نیاز به اصلاح`})]}),(0,w.jsx)(A,{id:`threshold-strong`,label:`فرصت خرید بسیار خوب`,detail:`هر آگهی با امتیاز برابر یا بیشتر از این عدد در بالاترین دسته قرار می‌گیرد.`,value:y.strongThreshold,unit:`از ۱۰۰`,onChange:e=>Y(`strongThreshold`,e)}),(0,w.jsx)(A,{id:`threshold-promising`,label:`ارزش بررسی دارد`,detail:`حداقل امتیاز برای آگهی‌هایی که ارزش بررسی بیشتر دارند.`,value:y.promisingThreshold,unit:`از ۱۰۰`,onChange:e=>Y(`promisingThreshold`,e)}),(0,w.jsx)(A,{id:`threshold-fair`,label:`قیمت نسبتاً منصفانه`,detail:`حداقل امتیاز دسته میانی؛ امتیازهای پایین‌تر در دسته «ارزش خرید پایین» قرار می‌گیرند.`,value:y.fairThreshold,unit:`از ۱۰۰`,onChange:e=>Y(`fairThreshold`,e)})]}),(0,w.jsxs)(`form`,{className:`workshop-panel scenario-save-form`,id:`wk-save`,onSubmit:async e=>{if(e.preventDefault(),!(!k.trim()||!q)){z(!0),V(``);try{let e=await fetch(`/scoring-scenarios`,{method:`POST`,headers:{accept:`application/json`,"content-type":`application/json`},body:JSON.stringify({name:k.trim(),description:P.trim(),config:y})}),t=await e.json();if(!e.ok)throw Error(t.message||t.error||`HTTP ${e.status}`);L(e=>[t,...e]),N(``),F(``),V(`سناریو در پایگاه داده ذخیره شد و اکنون در فهرست آگهی‌ها قابل استفاده است.`)}catch(e){V(`ذخیره سناریو ناموفق بود: ${e.message}`)}finally{z(!1)}}},"aria-busy":R,children:[(0,w.jsx)(`div`,{className:`workshop-panel__head`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`ذخیره و استفاده`}),(0,w.jsx)(`h2`,{children:`ساخت سناریوی امتیازدهی`})]})}),(0,w.jsx)(`p`,{className:`workshop-help`,children:`همه تنظیم‌های فعلی، امتیاز محله‌ها و حدنصاب‌ها با این نام ذخیره می‌شوند.`}),(0,w.jsxs)(`label`,{htmlFor:`scenario-name`,children:[`نام سناریو`,(0,w.jsx)(`input`,{id:`scenario-name`,value:k,maxLength:100,required:!0,onChange:e=>N(e.target.value),placeholder:`مثلاً خرید محافظه‌کارانه`})]}),(0,w.jsxs)(`label`,{htmlFor:`scenario-description`,children:[`توضیح کوتاه`,(0,w.jsx)(`textarea`,{id:`scenario-description`,value:P,maxLength:500,onChange:e=>F(e.target.value),placeholder:`این سناریو برای چه نوع جستجویی ساخته شده است؟`})]}),!q&&(0,w.jsx)(`p`,{className:`workshop-warning`,role:`alert`,children:`برای ذخیره، حدنصاب‌ها باید از بالاترین دسته تا پایین‌ترین به‌ترتیب کاهش یابند.`}),(0,w.jsx)(`button`,{className:`workshop-copy`,type:`submit`,disabled:R||!k.trim()||!q,children:R?`در حال ذخیره…`:`ذخیره سناریو و فعال‌کردن در آگهی‌ها`}),(0,w.jsx)(`p`,{className:`scenario-save-status`,"aria-live":`polite`,children:B}),!!I.length&&(0,w.jsx)(`div`,{className:`saved-scenario-list`,"aria-label":`سناریوهای ذخیره‌شده`,children:I.slice(0,6).map(e=>(0,w.jsxs)(`article`,{children:[(0,w.jsxs)(`button`,{type:`button`,onClick:()=>b({...h,...e.config}),children:[(0,w.jsx)(`b`,{children:e.name}),(0,w.jsx)(`small`,{children:`بارگذاری تنظیم‌ها در آزمایشگاه`})]}),(0,w.jsx)(`a`,{href:`/catalog?scenario=${encodeURIComponent(e.scenarioId)}`,children:`مشاهده رتبه‌بندی`})]},e.scenarioId))})]}),(0,w.jsx)(`button`,{className:`workshop-copy`,type:`button`,onClick:async()=>{let t=JSON.stringify({scoringVersion:e.scoringVersion,savedAt:new Date().toISOString(),config:y},null,2);try{await navigator.clipboard.writeText(t),S(`تنظیمات کپی شد`)}catch{S(`مرورگر اجازه کپی نداد`)}window.setTimeout(()=>S(``),2500)},children:`کپی تنظیمات برای جلسه`}),(0,w.jsx)(`div`,{className:`workshop-live`,"aria-live":`polite`,children:x||`تنظیم آزمایشی روی ${o(e.total)} آگهی اعمال شد`})]}),(0,w.jsxs)(`div`,{className:`workshop-results`,id:`workshop-results`,children:[!q&&(0,w.jsx)(`div`,{className:`workshop-warning`,role:`alert`,children:`حد نصاب‌ها باید از «فرصت خرید بسیار خوب» تا «قیمت نسبتاً منصفانه» به‌ترتیب کمتر شوند.`}),(0,w.jsxs)(`section`,{className:`workshop-panel workshop-guide`,"aria-labelledby":`score-guide-title`,children:[(0,w.jsxs)(`div`,{className:`workshop-panel__head`,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`راهنمای جلسه`}),(0,w.jsx)(`h2`,{id:`score-guide-title`,children:`این امتیاز چگونه ساخته می‌شود؟`})]}),(0,w.jsx)(`strong`,{children:`۰ تا ۱۰۰`})]}),(0,w.jsxs)(`div`,{className:`workshop-guide__grid`,children:[(0,w.jsxs)(`article`,{children:[(0,w.jsx)(`b`,{children:`۱. مناسب‌بودن قیمت`}),(0,w.jsx)(`p`,{children:`قیمت آگهی با قیمت برآوردی، آگهی‌های مشابه و قیمت‌های همان محله سنجیده می‌شود.`})]}),(0,w.jsxs)(`article`,{children:[(0,w.jsx)(`b`,{children:`۲. ویژگی‌های ملک`}),(0,w.jsx)(`p`,{children:`محاسبه از ۵۰ شروع می‌شود؛ امکانات و ویژگی‌های مثبت اضافه و کاستی‌ها کم می‌شوند.`})]}),(0,w.jsxs)(`article`,{children:[(0,w.jsx)(`b`,{children:`۳. امتیاز محله`}),(0,w.jsx)(`p`,{children:`امتیاز خودکار محله یا عددی که مدیر بر اساس شناخت بازار وارد کرده است، استفاده می‌شود.`})]}),(0,w.jsxs)(`article`,{children:[(0,w.jsx)(`b`,{children:`۴. اعتماد و ریسک`}),(0,w.jsx)(`p`,{children:`در پایان، کمبود داده یا نشانه‌های ریسک می‌تواند امتیاز ترکیبی را کاهش دهد.`})]})]})]}),(0,w.jsxs)(`section`,{className:`workshop-stats`,children:[(0,w.jsx)(j,{label:`میانگین امتیاز آزمایشی`,value:o(W.summary.average),detail:`میانه: ${o(W.summary.median)}`}),(0,w.jsx)(j,{label:`تغییر دسته`,value:o(W.summary.bandChanges),detail:`آگهی نسبت به امتیاز فعلی`,tone:l.orange}),(0,w.jsx)(j,{label:`تغییر در ۱۰ رتبه اول`,value:o(W.summary.topTenChanges),detail:`آگهی تازه‌وارد به ۱۰ رتبه اول`,tone:l.primaryPale}),(0,w.jsx)(j,{label:`فرصت خرید بسیار خوب`,value:o(W.summary.strong),detail:`${o(W.summary.promising)} آگهی ارزش بررسی دارد`,tone:l.green})]}),(0,w.jsxs)(`section`,{className:`workshop-panel workshop-distribution`,children:[(0,w.jsxs)(`div`,{className:`workshop-panel__head`,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`اثر تنظیم آزمایشی`}),(0,w.jsx)(`h2`,{children:`پراکندگی امتیازهای جدید`})]}),(0,w.jsx)(`small`,{children:`امتیاز ترکیبی ← تعدیل اعتماد ← کاهش ریسک`})]}),(0,w.jsx)(M,{histogram:W.histogram}),(0,w.jsx)(`div`,{className:`workshop-band-summary`,children:[[`strong-value`,W.summary.strong],[`promising`,W.summary.promising],[`fair`,W.summary.fair],[`weak-value`,W.summary.weak]].map(([e,t])=>(0,w.jsxs)(`span`,{children:[(0,w.jsx)(`i`,{style:{background:D[e]}}),E[e],` `,(0,w.jsx)(`b`,{children:o(t)})]},e))})]}),(0,w.jsxs)(`section`,{className:`workshop-panel`,children:[(0,w.jsxs)(`div`,{className:`workshop-panel__head`,children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`شناخت محدوده`}),(0,w.jsx)(`h2`,{children:`امتیاز محله‌ها`})]}),(0,w.jsx)(`small`,{children:`قابل اصلاح توسط مدیر · از ۱۰۰`})]}),(0,w.jsx)(`p`,{className:`workshop-help`,children:`امتیاز پیشنهادی هر محله از سطح معمول قیمت هر متر و تعداد آگهی‌های قابل‌استفاده آن ساخته می‌شود. برای محله‌هایی که آگهی کمی دارند، عدد به امتیاز میانه ۵۰ نزدیک‌تر می‌ماند. عددی که مدیر وارد کند جای امتیاز پیشنهادی را می‌گیرد.`}),(0,w.jsx)(`div`,{className:`neighborhood-score-grid`,children:J.map(e=>(0,w.jsxs)(`label`,{children:[(0,w.jsxs)(`span`,{children:[(0,w.jsx)(`b`,{children:e.name}),(0,w.jsxs)(`small`,{children:[o(e.count),` آگهی ·`,` `,r(e.medianPricePerMeter),` / متر`]})]}),(0,w.jsx)(`input`,{type:`number`,lang:`fa`,"aria-label":`امتیاز محله ${e.name}`,min:`0`,max:`100`,value:y.neighborhoodScores?.[e.name]??e.score,onChange:t=>X(e.name,Math.max(0,Math.min(100,Number(t.target.value))))})]},e.name))})]}),(0,w.jsxs)(`section`,{className:`workshop-panel`,children:[(0,w.jsx)(`div`,{className:`workshop-table-head`,children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:`رتبه‌بندی زنده`}),(0,w.jsx)(`h2`,{children:`اثر تنظیم‌ها بر هر آگهی`})]})}),(0,w.jsx)(d,{query:G.query,setQuery:G.setQuery,count:G.rows.length,placeholder:`عنوان، محله یا توکن…`}),(0,w.jsxs)(`div`,{className:`workshop-mobile-sort`,children:[(0,w.jsxs)(`label`,{children:[`مرتب‌سازی`,(0,w.jsx)(`select`,{"aria-label":`مرتب‌سازی آگهی‌ها`,value:G.sort.key,onChange:e=>G.changeSort(e.target.value),children:[[`rank`,`رتبه`],[`listing`,`عنوان آگهی`],[`deal`,`مناسب‌بودن قیمت`],[`property`,`ویژگی ملک`],[`neighborhood`,`امتیاز محله`],[`confidence`,`اعتماد`],[`risk`,`ریسک`],[`current`,`امتیاز فعلی`],[`experimental`,`امتیاز آزمایشی`],[`movement`,`تغییر رتبه`]].map(([e,t])=>(0,w.jsx)(`option`,{value:e,children:t},e))})]}),(0,w.jsx)(`button`,{type:`button`,onClick:()=>G.changeSort(G.sort.key),"aria-label":`تغییر جهت مرتب‌سازی`,children:G.sort.direction===`asc`?`صعودی ↑`:`نزولی ↓`})]}),(0,w.jsxs)(`div`,{className:`workshop-mobile-ranking`,"aria-label":`رتبه‌بندی آگهی‌ها در موبایل`,children:[K.map(e=>{let t=e.rank-e.scenario.rank;return(0,w.jsxs)(`article`,{className:`wk-rank-card`,children:[(0,w.jsxs)(`div`,{className:`wk-rank-card__top`,children:[(0,w.jsxs)(`div`,{className:`wk-rank-card__identity`,children:[(0,w.jsx)(`a`,{href:`/listing/${e.token}`,children:e.title}),(0,w.jsxs)(`small`,{children:[e.neighborhood,` · `,r(e.askingPrice)]})]}),(0,w.jsxs)(`span`,{className:`wk-rank-card__rank`,children:[`رتبه `,o(e.scenario.rank)]})]}),(0,w.jsxs)(`div`,{className:`wk-rank-card__score`,children:[(0,w.jsxs)(`span`,{children:[`امتیاز آزمایشی`,(0,w.jsx)(`small`,{children:E[e.scenario.band]})]}),(0,w.jsx)(`strong`,{style:{color:D[e.scenario.band]},children:o(e.scenario.recommendation)}),(0,w.jsxs)(`span`,{className:`wk-rank-card__delta ${t>0?`is-up`:t<0?`is-down`:``}`,children:[t>0?`+`:``,o(t),` رتبه`]})]}),(0,w.jsx)(`div`,{className:`wk-rank-card__metrics`,children:[[`امتیاز فعلی`,o(e.scores.recommendation)],[`مناسب‌بودن قیمت`,o(e.scenario.dealValue)],[`ویژگی ملک`,o(e.scenario.property.score)],[`امتیاز محله`,o(e.scenario.neighborhoodScore)],[`اعتماد به داده`,o(e.scores.confidence)],[`ریسک`,o(e.scores.risk)]].map(([e,t])=>(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{children:e}),(0,w.jsx)(`b`,{children:t})]},e))}),(0,w.jsxs)(`details`,{className:`wk-rank-card__breakdown`,children:[(0,w.jsx)(`summary`,{children:`جزئیات اثر ویژگی‌های ملک`}),(0,w.jsx)(`div`,{children:Object.entries(e.scenario.property.contributions).map(([e,t])=>(0,w.jsxs)(`span`,{children:[O[e]||e,`:`,` `,(0,w.jsxs)(`b`,{children:[t>0?`+`:``,o(t)]})]},e))})]})]},e.token)}),!K.length&&(0,w.jsx)(`p`,{className:`workshop-warning`,children:`آگهی مطابق جستجو پیدا نشد.`})]}),(0,w.jsx)(`div`,{className:`workshop-table-wrap`,children:(0,w.jsxs)(`table`,{className:`workshop-table`,children:[(0,w.jsx)(`thead`,{children:(0,w.jsx)(`tr`,{children:[[`rank`,`رتبه`],[`listing`,`آگهی`],[`deal`,`مناسب‌بودن قیمت`],[`property`,`ویژگی‌های ملک`],[`neighborhood`,`امتیاز محله`],[`confidence`,`اعتماد به داده`],[`risk`,`ریسک ارزیابی`],[`current`,`امتیاز فعلی`],[`experimental`,`امتیاز آزمایشی`],[`movement`,`تغییر رتبه`]].map(([e,t])=>(0,w.jsx)(p,{column:e,sort:G.sort,onSort:G.changeSort,children:t},e))})}),(0,w.jsx)(`tbody`,{children:K.map(e=>{let t=e.rank-e.scenario.rank;return(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{children:(0,w.jsx)(`strong`,{children:o(e.scenario.rank)})}),(0,w.jsx)(`td`,{children:(0,w.jsxs)(`a`,{href:`/listing/${e.token}`,children:[(0,w.jsx)(`b`,{children:e.title}),(0,w.jsxs)(`small`,{children:[e.neighborhood,` ·`,` `,r(e.askingPrice)]})]})}),(0,w.jsx)(`td`,{children:o(e.scenario.dealValue)}),(0,w.jsx)(`td`,{children:(0,w.jsxs)(`details`,{className:`property-breakdown`,children:[(0,w.jsx)(`summary`,{children:o(e.scenario.property.score)}),(0,w.jsx)(`div`,{children:Object.entries(e.scenario.property.contributions).map(([e,t])=>(0,w.jsxs)(`span`,{children:[O[e]||e,`:`,` `,(0,w.jsxs)(`b`,{children:[t>0?`+`:``,o(t)]})]},e))})]})}),(0,w.jsx)(`td`,{children:o(e.scenario.neighborhoodScore)}),(0,w.jsx)(`td`,{children:o(e.scores.confidence)}),(0,w.jsx)(`td`,{children:o(e.scores.risk)}),(0,w.jsx)(`td`,{children:o(e.scores.recommendation)}),(0,w.jsxs)(`td`,{children:[(0,w.jsx)(`b`,{className:`workshop-score`,style:{color:D[e.scenario.band]},children:o(e.scenario.recommendation)}),(0,w.jsx)(`small`,{children:E[e.scenario.band]})]}),(0,w.jsxs)(`td`,{className:t>0?`movement-up`:t<0?`movement-down`:``,children:[t>0?`+`:``,o(t)]})]},e.token)})})]})}),(0,w.jsx)(`p`,{className:`workshop-table-note`,children:`برای عملکرد بهتر، این جدول ۱۰۰ نتیجه اولِ فیلتر جاری را نشان می‌دهد؛ محاسبات خلاصه روی همه آگهی‌ها انجام شده است.`})]})]})]})]}),(0,w.jsx)(u,{disclaimer:`این صفحه فقط برای آزمایش و گفت‌وگو درباره مدل امتیازدهی است؛ تغییرها در اطلاعات اصلی ذخیره نمی‌شوند.`})]})}export{N as default};