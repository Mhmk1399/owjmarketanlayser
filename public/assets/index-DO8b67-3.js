var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function E(e,t){return T(e.type,t,e.props)}function D(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function te(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ne=/\/+/g;function re(e,t){return typeof e==`object`&&e&&e.key!=null?te(``+e.key):t.toString(36)}function ie(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ae(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ae(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+re(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ne,`$&/`)+`/`),ae(o,r,i,``,function(e){return e})):o!=null&&(D(o)&&(o=E(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ne,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+re(a,u),c+=ae(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+re(a,u++),c+=ae(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ae(ie(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function oe(e,t,n){if(e==null)return e;var r=[],i=0;return ae(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function se(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var O=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},k={map:oe,forEach:function(e,t,n){oe(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return oe(e,function(){t++}),t},toArray:function(e){return oe(e,function(e){return e})||[]},only:function(e){if(!D(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=k,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=D,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:se}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,O)}catch(e){O(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.8`})),n=e(((e,n)=>{n.exports=t()})),r=e((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,D());else{var t=n(l);t!==null&&re(x,t.startTime-e)}}}var S=!1,C=-1,w=5,ee=-1;function T(){return g?!0:!(e.unstable_now()-ee<w)}function E(){if(g=!1,S){var t=e.unstable_now();ee=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&T());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&re(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}}}finally{i?D():S=!1}}}var D;if(typeof y==`function`)D=function(){y(E)};else if(typeof MessageChannel<`u`){var te=new MessageChannel,ne=te.port2;te.port1.onmessage=E,D=function(){ne.postMessage(null)}}else D=function(){_(E,0)};function re(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,re(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,D()))),r},e.unstable_shouldYield=T,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),i=e(((e,t)=>{t.exports=r()})),a=e((e=>{var t=n();function r(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function i(){}var a={d:{f:i,r:function(){throw Error(r(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},o=Symbol.for(`react.portal`);function s(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var c=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function l(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(r(299));return s(e,t,null,n)},e.flushSync=function(e){var t=c.T,n=a.p;try{if(c.T=null,a.p=2,e)return e()}finally{c.T=t,a.p=n,a.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,a.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&a.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin),i=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?a.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:i,fetchPriority:o}):n===`script`&&a.d.X(e,{crossOrigin:r,integrity:i,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=l(t.as,t.crossOrigin);a.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??a.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin);a.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=l(t.as,t.crossOrigin);a.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else a.d.m(e)}},e.requestFormReset=function(e){a.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return c.H.useFormState(e,t,n)},e.useFormStatus=function(){return c.H.useHostTransitionStatus()},e.version=`19.2.8`})),o=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=a()})),s=e((e=>{var t=i(),r=n(),a=o();function s(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function l(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function u(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function d(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function f(e){if(l(e)!==e)throw Error(s(188))}function p(e){var t=e.alternate;if(!t){if(t=l(e),t===null)throw Error(s(188));return t===e?e:null}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return f(i),e;if(a===r)return f(i),t;a=a.sibling}throw Error(s(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,c=i.child;c;){if(c===n){o=!0,n=i,r=a;break}if(c===r){o=!0,r=i,n=a;break}c=c.sibling}if(!o){for(c=a.child;c;){if(c===n){o=!0,n=a,r=i;break}if(c===r){o=!0,r=a,n=i;break}c=c.sibling}if(!o)throw Error(s(189))}}if(n.alternate!==r)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function m(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=m(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),ee=Symbol.for(`react.suspense`),T=Symbol.for(`react.suspense_list`),E=Symbol.for(`react.memo`),D=Symbol.for(`react.lazy`),te=Symbol.for(`react.activity`),ne=Symbol.for(`react.memo_cache_sentinel`),re=Symbol.iterator;function ie(e){return typeof e!=`object`||!e?null:(e=re&&e[re]||e[`@@iterator`],typeof e==`function`?e:null)}var ae=Symbol.for(`react.client.reference`);function oe(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ae?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case ee:return`Suspense`;case T:return`SuspenseList`;case te:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case E:return t=e.displayName||null,t===null?oe(e.type)||`Memo`:t;case D:t=e._payload,e=e._init;try{return oe(e(t))}catch{}}return null}var se=Array.isArray,O=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ce={pending:!1,data:null,method:null,action:null},le=[],ue=-1;function de(e){return{current:e}}function A(e){0>ue||(e.current=le[ue],le[ue]=null,ue--)}function j(e,t){ue++,le[ue]=e.current,e.current=t}var M=de(null),fe=de(null),pe=de(null),me=de(null);function he(e,t){switch(j(pe,t),j(fe,e),j(M,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}A(M),j(M,e)}function ge(){A(M),A(fe),A(pe)}function _e(e){e.memoizedState!==null&&j(me,e);var t=M.current,n=Hd(t,e.type);t!==n&&(j(fe,e),j(M,n))}function N(e){fe.current===e&&(A(M),A(fe)),me.current===e&&(A(me),Qf._currentValue=ce)}var ve,ye;function P(e){if(ve===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);ve=t&&t[1]||``,ye=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+ve+e+ye}var be=!1;function xe(e,t){if(!e||be)return``;be=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{be=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?P(n):``}function Se(e,t){switch(e.tag){case 26:case 27:case 5:return P(e.type);case 16:return P(`Lazy`);case 13:return e.child!==t&&t!==null?P(`Suspense Fallback`):P(`Suspense`);case 19:return P(`SuspenseList`);case 0:case 15:return xe(e.type,!1);case 11:return xe(e.type.render,!1);case 1:return xe(e.type,!0);case 31:return P(`Activity`);default:return``}}function Ce(e){try{var t=``,n=null;do t+=Se(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var we=Object.prototype.hasOwnProperty,Te=t.unstable_scheduleCallback,Ee=t.unstable_cancelCallback,De=t.unstable_shouldYield,Oe=t.unstable_requestPaint,ke=t.unstable_now,Ae=t.unstable_getCurrentPriorityLevel,je=t.unstable_ImmediatePriority,Me=t.unstable_UserBlockingPriority,Ne=t.unstable_NormalPriority,Pe=t.unstable_LowPriority,Fe=t.unstable_IdlePriority,Ie=t.log,Le=t.unstable_setDisableYieldValue,Re=null,ze=null;function Be(e){if(typeof Ie==`function`&&Le(e),ze&&typeof ze.setStrictMode==`function`)try{ze.setStrictMode(Re,e)}catch{}}var Ve=Math.clz32?Math.clz32:We,He=Math.log,Ue=Math.LN2;function We(e){return e>>>=0,e===0?32:31-(He(e)/Ue|0)|0}var Ge=256,Ke=262144,qe=4194304;function Je(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ye(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Je(n))):i=Je(o):i=Je(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Je(n))):i=Je(o)):i=Je(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Xe(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Ze(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Qe(){var e=qe;return qe<<=1,!(qe&62914560)&&(qe=4194304),e}function $e(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function et(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function tt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ve(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&nt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function nt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ve(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function rt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ve(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function it(e,t){var n=t&-t;return n=n&42?1:at(n),(n&(e.suspendedLanes|t))===0?n:0}function at(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ot(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function st(){var e=k.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function ct(e,t){var n=k.p;try{return k.p=e,t()}finally{k.p=n}}var lt=Math.random().toString(36).slice(2),ut=`__reactFiber$`+lt,dt=`__reactProps$`+lt,ft=`__reactContainer$`+lt,pt=`__reactEvents$`+lt,mt=`__reactListeners$`+lt,F=`__reactHandles$`+lt,ht=`__reactResources$`+lt,gt=`__reactMarker$`+lt;function _t(e){delete e[ut],delete e[dt],delete e[pt],delete e[mt],delete e[F]}function vt(e){var t=e[ut];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ft]||n[ut]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[ut])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function yt(e){if(e=e[ut]||e[ft]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function bt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(s(33))}function xt(e){var t=e[ht];return t||=e[ht]={hoistableStyles:new Map,hoistableScripts:new Map},t}function St(e){e[gt]=!0}var Ct=new Set,wt={};function Tt(e,t){Et(e,t),Et(e+`Capture`,t)}function Et(e,t){for(wt[e]=t,e=0;e<t.length;e++)Ct.add(t[e])}var Dt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ot={},kt={};function At(e){return we.call(kt,e)?!0:we.call(Ot,e)?!1:Dt.test(e)?kt[e]=!0:(Ot[e]=!0,!1)}function jt(e,t,n){if(At(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}}function Mt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Nt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Pt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Ft(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function It(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Lt(e){if(!e._valueTracker){var t=Ft(e)?`checked`:`value`;e._valueTracker=It(e,t,``+e[t])}}function Rt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Ft(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}function zt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Bt=/[\n"\\]/g;function Vt(e){return e.replace(Bt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Ht(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Pt(t)):e.value!==``+Pt(t)&&(e.value=``+Pt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Wt(e,o,Pt(n)):Wt(e,o,Pt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Pt(s):e.removeAttribute(`name`)}function Ut(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Lt(e);return}n=n==null?``:``+Pt(n),t=t==null?n:``+Pt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Lt(e)}function Wt(e,t,n){t===`number`&&zt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Gt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Pt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Kt(e,t,n){if(t!=null&&(t=``+Pt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Pt(n)}function qt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(s(92));if(se(r)){if(1<r.length)throw Error(s(93));r=r[0]}n=r}n??=``,t=n}n=Pt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Lt(e)}function Jt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Yt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Xt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Yt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Zt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(s(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var i in t)r=t[i],t.hasOwnProperty(i)&&n[i]!==r&&Xt(e,i,r)}else for(var a in t)t.hasOwnProperty(a)&&Xt(e,a,t[a])}function Qt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var $t=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),en=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function tn(e){return en.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function nn(){}var rn=null;function an(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var I=null,on=null;function sn(e){var t=yt(e);if(t&&(e=t.stateNode)){var n=e[dt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Ht(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Vt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=r[dt]||null;if(!i)throw Error(s(90));Ht(r,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Rt(r)}break a;case`textarea`:Kt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Gt(e,!!n.multiple,t,!1)}}}var cn=!1;function ln(e,t,n){if(cn)return e(t,n);cn=!0;try{return e(t)}finally{if(cn=!1,(I!==null||on!==null)&&(bu(),I&&(t=I,e=on,on=I=null,sn(t),e)))for(t=0;t<e.length;t++)sn(e[t])}}function un(e,t){var n=e.stateNode;if(n===null)return null;var r=n[dt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(s(231,t,typeof n));return n}var dn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),fn=!1;if(dn)try{var pn={};Object.defineProperty(pn,"passive",{get:function(){fn=!0}}),window.addEventListener(`test`,pn,pn),window.removeEventListener(`test`,pn,pn)}catch{fn=!1}var mn=null,hn=null,gn=null;function _n(){if(gn)return gn;var e,t=hn,n=t.length,r,i=`value`in mn?mn.value:mn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return gn=i.slice(e,1<r?1-r:void 0)}function vn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function yn(){return!0}function bn(){return!1}function L(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?yn:bn,this.isPropagationStopped=bn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=yn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=yn)},persist:function(){},isPersistent:yn}),t}var xn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Sn=L(xn),Cn=h({},xn,{view:0,detail:0}),wn=L(Cn),Tn,En,Dn,On=h({},Cn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Dn&&(Dn&&e.type===`mousemove`?(Tn=e.screenX-Dn.screenX,En=e.screenY-Dn.screenY):En=Tn=0,Dn=e),Tn)},movementY:function(e){return`movementY`in e?e.movementY:En}}),kn=L(On),An=L(h({},On,{dataTransfer:0})),jn=L(h({},Cn,{relatedTarget:0})),Mn=L(h({},xn,{animationName:0,elapsedTime:0,pseudoElement:0})),Nn=L(h({},xn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Pn=L(h({},xn,{data:0})),Fn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},In={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Ln={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Rn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ln[e])?!!t[e]:!1}function zn(){return Rn}var Bn=L(h({},Cn,{key:function(e){if(e.key){var t=Fn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=vn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?In[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zn,charCode:function(e){return e.type===`keypress`?vn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?vn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Vn=L(h({},On,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Hn=L(h({},Cn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zn})),Un=L(h({},xn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Wn=L(h({},On,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Gn=L(h({},xn,{newState:0,oldState:0})),Kn=[9,13,27,32],qn=dn&&`CompositionEvent`in window,Jn=null;dn&&`documentMode`in document&&(Jn=document.documentMode);var Yn=dn&&`TextEvent`in window&&!Jn,Xn=dn&&(!qn||Jn&&8<Jn&&11>=Jn),Zn=` `,Qn=!1;function $n(e,t){switch(e){case`keyup`:return Kn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function er(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var tr=!1;function nr(e,t){switch(e){case`compositionend`:return er(t);case`keypress`:return t.which===32?(Qn=!0,Zn):null;case`textInput`:return e=t.data,e===Zn&&Qn?null:e;default:return null}}function rr(e,t){if(tr)return e===`compositionend`||!qn&&$n(e,t)?(e=_n(),gn=hn=mn=null,tr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Xn&&t.locale!==`ko`?null:t.data;default:return null}}var ir={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ar(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!ir[e.type]:t===`textarea`}function or(e,t,n,r){I?on?on.push(r):on=[r]:I=r,t=Ed(t,`onChange`),0<t.length&&(n=new Sn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var sr=null,cr=null;function lr(e){yd(e,0)}function ur(e){if(Rt(bt(e)))return e}function dr(e,t){if(e===`change`)return t}var fr=!1;if(dn){var pr;if(dn){var mr=`oninput`in document;if(!mr){var hr=document.createElement(`div`);hr.setAttribute(`oninput`,`return;`),mr=typeof hr.oninput==`function`}pr=mr}else pr=!1;fr=pr&&(!document.documentMode||9<document.documentMode)}function gr(){sr&&(sr.detachEvent(`onpropertychange`,_r),cr=sr=null)}function _r(e){if(e.propertyName===`value`&&ur(cr)){var t=[];or(t,cr,e,an(e)),ln(lr,t)}}function vr(e,t,n){e===`focusin`?(gr(),sr=t,cr=n,sr.attachEvent(`onpropertychange`,_r)):e===`focusout`&&gr()}function yr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return ur(cr)}function br(e,t){if(e===`click`)return ur(t)}function xr(e,t){if(e===`input`||e===`change`)return ur(t)}function Sr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Cr=typeof Object.is==`function`?Object.is:Sr;function wr(e,t){if(Cr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!we.call(t,i)||!Cr(e[i],t[i]))return!1}return!0}function Tr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Er(e,t){var n=Tr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Tr(n)}}function Dr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Dr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Or(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=zt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=zt(e.document)}return t}function kr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Ar=dn&&`documentMode`in document&&11>=document.documentMode,jr=null,Mr=null,Nr=null,Pr=!1;function Fr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Pr||jr==null||jr!==zt(r)||(r=jr,`selectionStart`in r&&kr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Nr&&wr(Nr,r)||(Nr=r,r=Ed(Mr,`onSelect`),0<r.length&&(t=new Sn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=jr)))}function Ir(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Lr={animationend:Ir(`Animation`,`AnimationEnd`),animationiteration:Ir(`Animation`,`AnimationIteration`),animationstart:Ir(`Animation`,`AnimationStart`),transitionrun:Ir(`Transition`,`TransitionRun`),transitionstart:Ir(`Transition`,`TransitionStart`),transitioncancel:Ir(`Transition`,`TransitionCancel`),transitionend:Ir(`Transition`,`TransitionEnd`)},Rr={},zr={};dn&&(zr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Lr.animationend.animation,delete Lr.animationiteration.animation,delete Lr.animationstart.animation),`TransitionEvent`in window||delete Lr.transitionend.transition);function Br(e){if(Rr[e])return Rr[e];if(!Lr[e])return e;var t=Lr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in zr)return Rr[e]=t[n];return e}var Vr=Br(`animationend`),Hr=Br(`animationiteration`),Ur=Br(`animationstart`),Wr=Br(`transitionrun`),Gr=Br(`transitionstart`),Kr=Br(`transitioncancel`),qr=Br(`transitionend`),Jr=new Map,Yr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Yr.push(`scrollEnd`);function Xr(e,t){Jr.set(e,t),Tt(t,[e])}var Zr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Qr=[],$r=0,ei=0;function ti(){for(var e=$r,t=ei=$r=0;t<e;){var n=Qr[t];Qr[t++]=null;var r=Qr[t];Qr[t++]=null;var i=Qr[t];Qr[t++]=null;var a=Qr[t];if(Qr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ai(n,i,a)}}function ni(e,t,n,r){Qr[$r++]=e,Qr[$r++]=t,Qr[$r++]=n,Qr[$r++]=r,ei|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ri(e,t,n,r){return ni(e,t,n,r),oi(e)}function ii(e,t){return ni(e,null,null,t),oi(e)}function ai(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ve(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function oi(e){if(50<du)throw du=0,fu=null,Error(s(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var si={};function ci(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function li(e,t,n,r){return new ci(e,t,n,r)}function ui(e){return e=e.prototype,!(!e||!e.isReactComponent)}function di(e,t){var n=e.alternate;return n===null?(n=li(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function fi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function pi(e,t,n,r,i,a){var o=0;if(r=e,typeof e==`function`)ui(e)&&(o=1);else if(typeof e==`string`)o=Uf(e,n,M.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case te:return e=li(31,n,t,i),e.elementType=te,e.lanes=a,e;case y:return mi(n.children,i,a,t);case b:o=8,i|=24;break;case x:return e=li(12,n,t,i|2),e.elementType=x,e.lanes=a,e;case ee:return e=li(13,n,t,i),e.elementType=ee,e.lanes=a,e;case T:return e=li(19,n,t,i),e.elementType=T,e.lanes=a,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:o=10;break a;case S:o=9;break a;case w:o=11;break a;case E:o=14;break a;case D:o=16,r=null;break a}o=29,n=Error(s(130,e===null?`null`:typeof e,``)),r=null}return t=li(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function mi(e,t,n,r){return e=li(7,e,r,t),e.lanes=n,e}function hi(e,t,n){return e=li(6,e,null,t),e.lanes=n,e}function gi(e){var t=li(18,null,null,0);return t.stateNode=e,t}function _i(e,t,n){return t=li(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var vi=new WeakMap;function yi(e,t){if(typeof e==`object`&&e){var n=vi.get(e);return n===void 0?(t={value:e,source:t,stack:Ce(t)},vi.set(e,t),t):n}return{value:e,source:t,stack:Ce(t)}}var bi=[],xi=0,Si=null,Ci=0,wi=[],Ti=0,Ei=null,Di=1,Oi=``;function ki(e,t){bi[xi++]=Ci,bi[xi++]=Si,Si=e,Ci=t}function Ai(e,t,n){wi[Ti++]=Di,wi[Ti++]=Oi,wi[Ti++]=Ei,Ei=e;var r=Di;e=Oi;var i=32-Ve(r)-1;r&=~(1<<i),n+=1;var a=32-Ve(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Di=1<<32-Ve(t)+i|n<<i|r,Oi=a+e}else Di=1<<a|n<<i|r,Oi=e}function ji(e){e.return!==null&&(ki(e,1),Ai(e,1,0))}function Mi(e){for(;e===Si;)Si=bi[--xi],bi[xi]=null,Ci=bi[--xi],bi[xi]=null;for(;e===Ei;)Ei=wi[--Ti],wi[Ti]=null,Oi=wi[--Ti],wi[Ti]=null,Di=wi[--Ti],wi[Ti]=null}function Ni(e,t){wi[Ti++]=Di,wi[Ti++]=Oi,wi[Ti++]=Ei,Di=t.id,Oi=t.overflow,Ei=e}var Pi=null,R=null,z=!1,Fi=null,Ii=!1,Li=Error(s(519));function Ri(e){throw Wi(yi(Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Li}function zi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ut]=e,t[dt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Ut(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),qt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=nn),t=!0):t=!1,t||Ri(e,!0)}function Bi(e){for(Pi=e.return;Pi;)switch(Pi.tag){case 5:case 31:case 13:Ii=!1;return;case 27:case 3:Ii=!0;return;default:Pi=Pi.return}}function Vi(e){if(e!==Pi)return!1;if(!z)return Bi(e),z=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||Ud(e.type,e.memoizedProps)),n=!n),n&&R&&Ri(e),Bi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));R=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));R=uf(e)}else t===27?(t=R,Zd(e.type)?(e=lf,lf=null,R=e):R=t):R=Pi?cf(e.stateNode.nextSibling):null;return!0}function Hi(){R=Pi=null,z=!1}function Ui(){var e=Fi;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Fi=null),e}function Wi(e){Fi===null?Fi=[e]:Fi.push(e)}var Gi=de(null),Ki=null,qi=null;function Ji(e,t,n){j(Gi,t._currentValue),t._currentValue=n}function Yi(e){e._currentValue=Gi.current,A(Gi)}function Xi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Zi(e,t,n,r){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var a=i.dependencies;if(a!==null){var o=i.child;a=a.firstContext;a:for(;a!==null;){var c=a;a=i;for(var l=0;l<t.length;l++)if(c.context===t[l]){a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),Xi(a.return,n,e),r||(o=null);break a}a=c.next}}else if(i.tag===18){if(o=i.return,o===null)throw Error(s(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Xi(o,n,e),o=null}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}}function Qi(e,t,n,r){e=null;for(var i=t,a=!1;i!==null;){if(!a){if(i.flags&524288)a=!0;else if(i.flags&262144)break}if(i.tag===10){var o=i.alternate;if(o===null)throw Error(s(387));if(o=o.memoizedProps,o!==null){var c=i.type;Cr(i.pendingProps.value,o.value)||(e===null?e=[c]:e.push(c))}}else if(i===me.current){if(o=i.alternate,o===null)throw Error(s(387));o.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}i=i.return}e!==null&&Zi(t,e,n,r),t.flags|=262144}function $i(e){for(e=e.firstContext;e!==null;){if(!Cr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ea(e){Ki=e,qi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ta(e){return ra(Ki,e)}function na(e,t){return Ki===null&&ea(e),ra(e,t)}function ra(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},qi===null){if(e===null)throw Error(s(308));qi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else qi=qi.next=t;return n}var ia=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},aa=t.unstable_scheduleCallback,oa=t.unstable_NormalPriority,sa={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ca(){return{controller:new ia,data:new Map,refCount:0}}function la(e){e.refCount--,e.refCount===0&&aa(oa,function(){e.controller.abort()})}var ua=null,da=0,fa=0,pa=null;function ma(e,t){if(ua===null){var n=ua=[];da=0,fa=dd(),pa={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return da++,t.then(ha,ha),t}function ha(){if(--da===0&&ua!==null){pa!==null&&(pa.status=`fulfilled`);var e=ua;ua=null,fa=0,pa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ga(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var _a=O.S;O.S=function(e,t){eu=ke(),typeof t==`object`&&t&&typeof t.then==`function`&&ma(e,t),_a!==null&&_a(e,t)};var va=de(null);function ya(){var e=va.current;return e===null?K.pooledCache:e}function ba(e,t){t===null?j(va,va.current):j(va,t.pool)}function xa(){var e=ya();return e===null?null:{parent:sa._currentValue,pool:e}}var Sa=Error(s(460)),Ca=Error(s(474)),wa=Error(s(542)),Ta={then:function(){}};function Ea(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Da(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(nn,nn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ja(e),e;default:if(typeof t.status==`string`)t.then(nn,nn);else{if(e=K,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ja(e),e}throw ka=t,Sa}}function Oa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(ka=e,Sa):e}}var ka=null;function Aa(){if(ka===null)throw Error(s(459));var e=ka;return ka=null,e}function ja(e){if(e===Sa||e===wa)throw Error(s(483))}var Ma=null,Na=0;function Pa(e){var t=Na;return Na+=1,Ma===null&&(Ma=[]),Da(Ma,e,t)}function Fa(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ia(e,t){throw t.$$typeof===g?Error(s(525)):(e=Object.prototype.toString.call(t),Error(s(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function La(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function i(e,t){return e=di(e,t),e.index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function o(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=hi(n,e.mode,r),t.return=e,t):(t=i(t,n),t.return=e,t)}function l(e,t,n,r){var a=n.type;return a===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===a||typeof a==`object`&&a&&a.$$typeof===D&&Oa(a)===t.type)?(t=i(t,n.props),Fa(t,n),t.return=e,t):(t=pi(n.type,n.key,n.props,null,e.mode,r),Fa(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=_i(n,e.mode,r),t.return=e,t):(t=i(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,a){return t===null||t.tag!==7?(t=mi(n,e.mode,r,a),t.return=e,t):(t=i(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=hi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=pi(t.type,t.key,t.props,null,e.mode,n),Fa(n,t),n.return=e,n;case v:return t=_i(t,e.mode,n),t.return=e,t;case D:return t=Oa(t),f(e,t,n)}if(se(t)||ie(t))return t=mi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Pa(t),n);if(t.$$typeof===C)return f(e,na(e,t),n);Ia(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case D:return n=Oa(n),p(e,t,n,r)}if(se(n)||ie(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Pa(n),r);if(n.$$typeof===C)return p(e,t,na(e,n),r);Ia(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case D:return r=Oa(r),m(e,t,n,r,i)}if(se(r)||ie(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Pa(r),i);if(r.$$typeof===C)return m(e,t,n,na(t,r),i);Ia(t,r)}return null}function h(i,o,s,c){for(var l=null,u=null,d=o,h=o=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),o=a(_,o,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),z&&ki(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(o=a(d,o,h),u===null?l=d:u.sibling=d,u=d);return z&&ki(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),o=a(g,o,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),z&&ki(i,h),l}function g(i,o,c,l){if(c==null)throw Error(s(151));for(var u=null,d=null,h=o,g=o=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(i,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(i,h),o=a(y,o,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(i,h),z&&ki(i,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(i,v.value,l),v!==null&&(o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return z&&ki(i,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,i,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(i,e)}),z&&ki(i,g),u}function b(e,r,a,c){if(typeof a==`object`&&a&&a.type===y&&a.key===null&&(a=a.props.children),typeof a==`object`&&a){switch(a.$$typeof){case _:a:{for(var l=a.key;r!==null;){if(r.key===l){if(l=a.type,l===y){if(r.tag===7){n(e,r.sibling),c=i(r,a.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===D&&Oa(l)===r.type){n(e,r.sibling),c=i(r,a.props),Fa(c,a),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}a.type===y?(c=mi(a.props.children,e.mode,c,a.key),c.return=e,e=c):(c=pi(a.type,a.key,a.props,null,e.mode,c),Fa(c,a),c.return=e,e=c)}return o(e);case v:a:{for(l=a.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===a.containerInfo&&r.stateNode.implementation===a.implementation){n(e,r.sibling),c=i(r,a.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=_i(a,e.mode,c),c.return=e,e=c}return o(e);case D:return a=Oa(a),b(e,r,a,c)}if(se(a))return h(e,r,a,c);if(ie(a)){if(l=ie(a),typeof l!=`function`)throw Error(s(150));return a=l.call(a),g(e,r,a,c)}if(typeof a.then==`function`)return b(e,r,Pa(a),c);if(a.$$typeof===C)return b(e,r,na(e,a),c);Ia(e,a)}return typeof a==`string`&&a!==``||typeof a==`number`||typeof a==`bigint`?(a=``+a,r!==null&&r.tag===6?(n(e,r.sibling),c=i(r,a),c.return=e,e=c):(n(e,r),c=hi(a,e.mode,c),c.return=e,e=c),o(e)):n(e,r)}return function(e,t,n,r){try{Na=0;var i=b(e,t,n,r);return Ma=null,i}catch(t){if(t===Sa||t===wa)throw t;var a=li(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ra=La(!0),za=La(!1),Ba=!1;function Va(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ha(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ua(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Wa(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,G&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=oi(e),ai(e,null,n),t}return ni(e,r,t,n),oi(e)}function Ga(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,rt(e,n)}}function Ka(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var qa=!1;function Ja(){if(qa){var e=pa;if(e!==null)throw e}}function Ya(e,t,n,r){qa=!1;var i=e.updateQueue;Ba=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(J&f)===f:(r&f)===f){f!==0&&f===fa&&(qa=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ba=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function Xa(e,t){if(typeof e!=`function`)throw Error(s(191,e));e.call(t)}function Za(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Xa(n[e],t)}var Qa=de(null),$a=de(0);function eo(e,t){e=Wl,j($a,e),j(Qa,t),Wl=e|t.baseLanes}function to(){j($a,Wl),j(Qa,Qa.current)}function no(){Wl=$a.current,A(Qa),A($a)}var ro=de(null),io=null;function ao(e){var t=e.alternate;j(uo,uo.current&1),j(ro,e),io===null&&(t===null||Qa.current!==null||t.memoizedState!==null)&&(io=e)}function oo(e){j(uo,uo.current),j(ro,e),io===null&&(io=e)}function so(e){e.tag===22?(j(uo,uo.current),j(ro,e),io===null&&(io=e)):co(e)}function co(){j(uo,uo.current),j(ro,ro.current)}function lo(e){A(ro),io===e&&(io=null),A(uo)}var uo=de(0);function fo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var po=0,B=null,V=null,mo=null,ho=!1,go=!1,_o=!1,vo=0,yo=0,bo=null,xo=0;function H(){throw Error(s(321))}function So(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Cr(e[n],t[n]))return!1;return!0}function Co(e,t,n,r,i,a){return po=a,B=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,O.H=e===null||e.memoizedState===null?Bs:Vs,_o=!1,a=n(r,i),_o=!1,go&&(a=To(t,n,r,i)),wo(e),a}function wo(e){O.H=zs;var t=V!==null&&V.next!==null;if(po=0,mo=V=B=null,ho=!1,yo=0,bo=null,t)throw Error(s(300));e===null||ic||(e=e.dependencies,e!==null&&$i(e)&&(ic=!0))}function To(e,t,n,r){B=e;var i=0;do{if(go&&(bo=null),yo=0,go=!1,25<=i)throw Error(s(301));if(i+=1,mo=V=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}O.H=Hs,a=t(n,r)}while(go);return a}function Eo(){var e=O.H,t=e.useState()[0];return t=typeof t.then==`function`?No(t):t,e=e.useState()[0],(V===null?null:V.memoizedState)!==e&&(B.flags|=1024),t}function Do(){var e=vo!==0;return vo=0,e}function Oo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ko(e){if(ho){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ho=!1}po=0,mo=V=B=null,go=!1,yo=vo=0,bo=null}function Ao(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return mo===null?B.memoizedState=mo=e:mo=mo.next=e,mo}function jo(){if(V===null){var e=B.alternate;e=e===null?null:e.memoizedState}else e=V.next;var t=mo===null?B.memoizedState:mo.next;if(t!==null)mo=t,V=e;else{if(e===null)throw B.alternate===null?Error(s(467)):Error(s(310));V=e,e={memoizedState:V.memoizedState,baseState:V.baseState,baseQueue:V.baseQueue,queue:V.queue,next:null},mo===null?B.memoizedState=mo=e:mo=mo.next=e}return mo}function Mo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function No(e){var t=yo;return yo+=1,bo===null&&(bo=[]),e=Da(bo,e,t),t=B,(mo===null?t.memoizedState:mo.next)===null&&(t=t.alternate,O.H=t===null||t.memoizedState===null?Bs:Vs),e}function Po(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return No(e);if(e.$$typeof===C)return ta(e)}throw Error(s(438,String(e)))}function Fo(e){var t=null,n=B.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=B.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Mo(),B.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ne;return t.index++,n}function Io(e,t){return typeof t==`function`?t(e):t}function Lo(e){return Ro(jo(),V,e)}function Ro(e,t,n){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=n;var i=e.baseQueue,a=r.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}t.baseQueue=i=a,r.pending=null}if(a=e.baseState,i===null)e.memoizedState=a;else{t=i.next;var c=o=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(po&f)===f:(J&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===fa&&(d=!0);else if((po&p)===p){u=u.next,p===fa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,o=a):l=l.next=f,B.lanes|=p,Gl|=p;f=u.action,_o&&n(a,f),a=u.hasEagerState?u.eagerState:n(a,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,o=a):l=l.next=p,B.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?o=a:l.next=c,!Cr(a,e.memoizedState)&&(ic=!0,d&&(n=pa,n!==null)))throw n;e.memoizedState=a,e.baseState=o,e.baseQueue=l,r.lastRenderedState=a}return i===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function zo(e){var t=jo(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);Cr(a,t.memoizedState)||(ic=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Bo(e,t,n){var r=B,i=jo(),a=z;if(a){if(n===void 0)throw Error(s(407));n=n()}else n=t();var o=!Cr((V||i).memoizedState,n);if(o&&(i.memoizedState=n,ic=!0),i=i.queue,ds(Uo.bind(null,r,i,e),[e]),i.getSnapshot!==t||o||mo!==null&&mo.memoizedState.tag&1){if(r.flags|=2048,os(9,{destroy:void 0},Ho.bind(null,r,i,n,t),null),K===null)throw Error(s(349));a||po&127||Vo(r,t,n)}return n}function Vo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=B.updateQueue,t===null?(t=Mo(),B.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ho(e,t,n,r){t.value=n,t.getSnapshot=r,Wo(t)&&Go(e)}function Uo(e,t,n){return n(function(){Wo(t)&&Go(e)})}function Wo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Cr(e,n)}catch{return!0}}function Go(e){var t=ii(e,2);t!==null&&hu(t,e,2)}function Ko(e){var t=Ao();if(typeof e==`function`){var n=e;if(e=n(),_o){Be(!0);try{n()}finally{Be(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:e},t}function qo(e,t,n,r){return e.baseState=n,Ro(e,V,typeof r==`function`?r:Io)}function Jo(e,t,n,r,i){if(Is(e))throw Error(s(485));if(e=t.action,e!==null){var a={payload:i,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){a.listeners.push(e)}};O.T===null?a.isTransition=!1:n(!0),r(a),n=t.pending,n===null?(a.next=t.pending=a,Yo(t,a)):(a.next=n.next,t.pending=n.next=a)}}function Yo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=O.T,o={};O.T=o;try{var s=n(i,r),c=O.S;c!==null&&c(o,s),Xo(e,t,s)}catch(n){Qo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),O.T=a}}else try{a=n(i,r),Xo(e,t,a)}catch(n){Qo(e,t,n)}}function Xo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Zo(e,t,n)},function(n){return Qo(e,t,n)}):Zo(e,t,n)}function Zo(e,t,n){t.status=`fulfilled`,t.value=n,$o(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Yo(e,n)))}function Qo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,$o(t),t=t.next;while(t!==r)}e.action=null}function $o(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function es(e,t){return t}function ts(e,t){if(z){var n=K.formState;if(n!==null){a:{var r=B;if(z){if(R){b:{for(var i=R,a=Ii;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){R=cf(i.nextSibling),r=i.data===`F!`;break a}}Ri(r)}r=!1}r&&(t=n[0])}}return n=Ao(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:es,lastRenderedState:t},n.queue=r,n=Ns.bind(null,B,r),r.dispatch=n,r=Ko(!1),a=Fs.bind(null,B,!1,r.queue),r=Ao(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Jo.bind(null,B,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function ns(e){return rs(jo(),V,e)}function rs(e,t,n){if(t=Ro(e,t,es)[0],e=Lo(Io)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=No(t)}catch(e){throw e===Sa?wa:e}else r=t;t=jo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(B.flags|=2048,os(9,{destroy:void 0},is.bind(null,i,n),null)),[r,a,e]}function is(e,t){e.action=t}function as(e){var t=jo(),n=V;if(n!==null)return rs(t,n,e);jo(),t=t.memoizedState,n=jo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function os(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=B.updateQueue,t===null&&(t=Mo(),B.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ss(){return jo().memoizedState}function cs(e,t,n,r){var i=Ao();B.flags|=e,i.memoizedState=os(1|t,{destroy:void 0},n,r===void 0?null:r)}function ls(e,t,n,r){var i=jo();r=r===void 0?null:r;var a=i.memoizedState.inst;V!==null&&r!==null&&So(r,V.memoizedState.deps)?i.memoizedState=os(t,a,n,r):(B.flags|=e,i.memoizedState=os(1|t,a,n,r))}function us(e,t){cs(8390656,8,e,t)}function ds(e,t){ls(2048,8,e,t)}function fs(e){B.flags|=4;var t=B.updateQueue;if(t===null)t=Mo(),B.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function ps(e){var t=jo().memoizedState;return fs({ref:t,nextImpl:e}),function(){if(G&2)throw Error(s(440));return t.impl.apply(void 0,arguments)}}function ms(e,t){return ls(4,2,e,t)}function hs(e,t){return ls(4,4,e,t)}function gs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function _s(e,t,n){n=n==null?null:n.concat([e]),ls(4,4,gs.bind(null,t,e),n)}function vs(){}function ys(e,t){var n=jo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&So(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function bs(e,t){var n=jo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&So(t,r[1]))return r[0];if(r=e(),_o){Be(!0);try{e()}finally{Be(!1)}}return n.memoizedState=[r,t],r}function xs(e,t,n){return n===void 0||po&1073741824&&!(J&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),B.lanes|=e,Gl|=e,n)}function Ss(e,t,n,r){return Cr(n,t)?n:Qa.current===null?!(po&42)||po&1073741824&&!(J&261930)?(ic=!0,e.memoizedState=n):(e=mu(),B.lanes|=e,Gl|=e,t):(e=xs(e,n,r),Cr(e,t)||(ic=!0),e)}function Cs(e,t,n,r,i){var a=k.p;k.p=a!==0&&8>a?a:8;var o=O.T,s={};O.T=s,Fs(e,!1,t,n);try{var c=i(),l=O.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ps(e,t,ga(c,r),pu(e)):Ps(e,t,r,pu(e))}catch(n){Ps(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{k.p=a,o!==null&&s.types!==null&&(o.types=s.types),O.T=o}}function ws(){}function Ts(e,t,n,r){if(e.tag!==5)throw Error(s(476));var i=Es(e).queue;Cs(e,i,t,ce,n===null?ws:function(){return Ds(e),n(r)})}function Es(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ce,baseState:ce,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:ce},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ds(e){var t=Es(e);t.next===null&&(t=e.alternate.memoizedState),Ps(e,t.next.queue,{},pu())}function Os(){return ta(Qf)}function ks(){return jo().memoizedState}function As(){return jo().memoizedState}function js(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Ua(n);var r=Wa(t,e,n);r!==null&&(hu(r,t,n),Ga(r,t,n)),t={cache:ca()},e.payload=t;return}t=t.return}}function Ms(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Is(e)?Ls(t,n):(n=ri(e,t,n,r),n!==null&&(hu(n,e,r),Rs(n,t,r)))}function Ns(e,t,n){Ps(e,t,n,pu())}function Ps(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Is(e))Ls(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Cr(s,o))return ni(e,t,i,0),K===null&&ti(),!1}catch{}if(n=ri(e,t,i,r),n!==null)return hu(n,e,r),Rs(n,t,r),!0}return!1}function Fs(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Is(e)){if(t)throw Error(s(479))}else t=ri(e,n,r,2),t!==null&&hu(t,e,2)}function Is(e){var t=e.alternate;return e===B||t!==null&&t===B}function Ls(e,t){go=ho=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Rs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,rt(e,n)}}var zs={readContext:ta,use:Po,useCallback:H,useContext:H,useEffect:H,useImperativeHandle:H,useLayoutEffect:H,useInsertionEffect:H,useMemo:H,useReducer:H,useRef:H,useState:H,useDebugValue:H,useDeferredValue:H,useTransition:H,useSyncExternalStore:H,useId:H,useHostTransitionStatus:H,useFormState:H,useActionState:H,useOptimistic:H,useMemoCache:H,useCacheRefresh:H};zs.useEffectEvent=H;var Bs={readContext:ta,use:Po,useCallback:function(e,t){return Ao().memoizedState=[e,t===void 0?null:t],e},useContext:ta,useEffect:us,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),cs(4194308,4,gs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return cs(4194308,4,e,t)},useInsertionEffect:function(e,t){cs(4,2,e,t)},useMemo:function(e,t){var n=Ao();t=t===void 0?null:t;var r=e();if(_o){Be(!0);try{e()}finally{Be(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Ao();if(n!==void 0){var i=n(t);if(_o){Be(!0);try{n(t)}finally{Be(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ms.bind(null,B,e),[r.memoizedState,e]},useRef:function(e){var t=Ao();return e={current:e},t.memoizedState=e},useState:function(e){e=Ko(e);var t=e.queue,n=Ns.bind(null,B,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:vs,useDeferredValue:function(e,t){return xs(Ao(),e,t)},useTransition:function(){var e=Ko(!1);return e=Cs.bind(null,B,e.queue,!0,!1),Ao().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=B,i=Ao();if(z){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),K===null)throw Error(s(349));J&127||Vo(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,us(Uo.bind(null,r,a,e),[e]),r.flags|=2048,os(9,{destroy:void 0},Ho.bind(null,r,a,n,t),null),n},useId:function(){var e=Ao(),t=K.identifierPrefix;if(z){var n=Oi,r=Di;n=(r&~(1<<32-Ve(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=vo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=xo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Os,useFormState:ts,useActionState:ts,useOptimistic:function(e){var t=Ao();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Fs.bind(null,B,!0,n),n.dispatch=t,[e,t]},useMemoCache:Fo,useCacheRefresh:function(){return Ao().memoizedState=js.bind(null,B)},useEffectEvent:function(e){var t=Ao(),n={impl:e};return t.memoizedState=n,function(){if(G&2)throw Error(s(440));return n.impl.apply(void 0,arguments)}}},Vs={readContext:ta,use:Po,useCallback:ys,useContext:ta,useEffect:ds,useImperativeHandle:_s,useInsertionEffect:ms,useLayoutEffect:hs,useMemo:bs,useReducer:Lo,useRef:ss,useState:function(){return Lo(Io)},useDebugValue:vs,useDeferredValue:function(e,t){return Ss(jo(),V.memoizedState,e,t)},useTransition:function(){var e=Lo(Io)[0],t=jo().memoizedState;return[typeof e==`boolean`?e:No(e),t]},useSyncExternalStore:Bo,useId:ks,useHostTransitionStatus:Os,useFormState:ns,useActionState:ns,useOptimistic:function(e,t){return qo(jo(),V,e,t)},useMemoCache:Fo,useCacheRefresh:As};Vs.useEffectEvent=ps;var Hs={readContext:ta,use:Po,useCallback:ys,useContext:ta,useEffect:ds,useImperativeHandle:_s,useInsertionEffect:ms,useLayoutEffect:hs,useMemo:bs,useReducer:zo,useRef:ss,useState:function(){return zo(Io)},useDebugValue:vs,useDeferredValue:function(e,t){var n=jo();return V===null?xs(n,e,t):Ss(n,V.memoizedState,e,t)},useTransition:function(){var e=zo(Io)[0],t=jo().memoizedState;return[typeof e==`boolean`?e:No(e),t]},useSyncExternalStore:Bo,useId:ks,useHostTransitionStatus:Os,useFormState:as,useActionState:as,useOptimistic:function(e,t){var n=jo();return V===null?(n.baseState=e,[e,n.queue.dispatch]):qo(n,V,e,t)},useMemoCache:Fo,useCacheRefresh:As};Hs.useEffectEvent=ps;function Us(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ws={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ua(r);i.payload=t,n!=null&&(i.callback=n),t=Wa(e,i,r),t!==null&&(hu(t,e,r),Ga(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ua(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Wa(e,i,r),t!==null&&(hu(t,e,r),Ga(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Ua(n);r.tag=2,t!=null&&(r.callback=t),t=Wa(e,r,n),t!==null&&(hu(t,e,n),Ga(t,e,n))}};function Gs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!wr(n,r)||!wr(i,a):!0}function Ks(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ws.enqueueReplaceState(t,t.state,null)}function qs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Js(e){Zr(e)}function Ys(e){console.error(e)}function Xs(e){Zr(e)}function Zs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Qs(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function $s(e,t,n){return n=Ua(n),n.tag=3,n.payload={element:null},n.callback=function(){Zs(e,t)},n}function ec(e){return e=Ua(e),e.tag=3,e}function tc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Qs(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Qs(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function nc(e,t,n,r,i){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Qi(t,n,i,!0),n=ro.current,n!==null){switch(n.tag){case 31:case 13:return io===null?Du():n.alternate===null&&X===0&&(X=3),n.flags&=-257,n.flags|=65536,n.lanes=i,r===Ta?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,i)),!1;case 22:return n.flags|=65536,r===Ta?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,i)),!1}throw Error(s(435,n.tag))}return Gu(e,r,i),Du(),!1}if(z)return t=ro.current,t===null?(r!==Li&&(t=Error(s(423),{cause:r}),Wi(yi(t,n))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,r=yi(r,n),i=$s(e.stateNode,r,i),Ka(e,i),X!==4&&(X=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=i,r!==Li&&(e=Error(s(422),{cause:r}),Wi(yi(e,n)))),!1;var a=Error(s(520),{cause:r});if(a=yi(a,n),Xl===null?Xl=[a]:Xl.push(a),X!==4&&(X=2),t===null)return!0;r=yi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=i&-i,n.lanes|=e,e=$s(n.stateNode,r,e),Ka(n,e),!1;case 1:if(t=n.type,a=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||a!==null&&typeof a.componentDidCatch==`function`&&(ru===null||!ru.has(a))))return n.flags|=65536,i&=-i,n.lanes|=i,i=ec(i),tc(i,e,n,r),Ka(n,i),!1}n=n.return}while(n!==null);return!1}var rc=Error(s(461)),ic=!1;function ac(e,t,n,r){t.child=e===null?za(t,null,n,r):Ra(t,e.child,n,r)}function oc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ea(t),r=Co(e,t,n,o,a,i),s=Do(),e!==null&&!ic?(Oo(e,t,i),Ac(e,t,i)):(z&&s&&ji(t),t.flags|=1,ac(e,t,r,i),t.child)}function sc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ui(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,cc(e,t,a,r,i)):(e=pi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!jc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?wr:n,n(o,r)&&e.ref===t.ref)return Ac(e,t,i)}return t.flags|=1,e=di(a,r),e.ref=t.ref,e.return=t,t.child=e}function cc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(wr(a,r)&&e.ref===t.ref){if(ic=!1,t.pendingProps=r=a,jc(e,i))e.flags&131072&&(ic=!0);else return t.lanes=e.lanes,Ac(e,t,i)}}return gc(e,t,n,r,i)}function lc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return dc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ba(t,a===null?null:a.cachePool),a===null?to():eo(t,a),so(t);else return r=t.lanes=536870912,dc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&ba(t,null),to(),co(t)):(ba(t,a.cachePool),eo(t,a),co(t),t.memoizedState=null);return ac(e,t,i,n),t.child}function uc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function dc(e,t,n,r,i){var a=ya();return a=a===null?null:{parent:sa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&ba(t,null),to(),so(t),e!==null&&Qi(e,t,r,!0),t.childLanes=i,null}function fc(e,t){return t=Tc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function pc(e,t,n){return Ra(t,e.child,null,n),e=fc(t,t.pendingProps),e.flags|=2,lo(t),t.memoizedState=null,e}function mc(e,t,n){var r=t.pendingProps,i=!!(t.flags&128);if(t.flags&=-129,e===null){if(z){if(r.mode===`hidden`)return e=fc(t,r),t.lanes=536870912,uc(null,e);if(oo(t),(e=R)?(e=rf(e,Ii),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ei===null?null:{id:Di,overflow:Oi},retryLane:536870912,hydrationErrors:null},n=gi(e),n.return=t,t.child=n,Pi=t,R=null)):e=null,e===null)throw Ri(t);return t.lanes=536870912,null}return fc(t,r)}var a=e.memoizedState;if(a!==null){var o=a.dehydrated;if(oo(t),i){if(t.flags&256)t.flags&=-257,t=pc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(s(558))}else if(ic||Qi(e,t,n,!1),i=(n&e.childLanes)!==0,ic||i){if(r=K,r!==null&&(o=it(r,n),o!==0&&o!==a.retryLane))throw a.retryLane=o,ii(e,o),hu(r,e,o),rc;Du(),t=pc(e,t,n)}else e=a.treeContext,R=cf(o.nextSibling),Pi=t,z=!0,Fi=null,Ii=!1,e!==null&&Ni(t,e),t=fc(t,r),t.flags|=4096;return t}return e=di(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function hc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(s(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function gc(e,t,n,r,i){return ea(t),n=Co(e,t,n,r,void 0,i),r=Do(),e!==null&&!ic?(Oo(e,t,i),Ac(e,t,i)):(z&&r&&ji(t),t.flags|=1,ac(e,t,n,i),t.child)}function _c(e,t,n,r,i,a){return ea(t),t.updateQueue=null,n=To(t,r,n,i),wo(e),r=Do(),e!==null&&!ic?(Oo(e,t,a),Ac(e,t,a)):(z&&r&&ji(t),t.flags|=1,ac(e,t,n,a),t.child)}function vc(e,t,n,r,i){if(ea(t),t.stateNode===null){var a=si,o=n.contextType;typeof o==`object`&&o&&(a=ta(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Ws,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Va(t),o=n.contextType,a.context=typeof o==`object`&&o?ta(o):si,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Us(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Ws.enqueueReplaceState(a,a.state,null),Ya(t,r,a,i),Ja(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=qs(n,s);a.props=c;var l=a.context,u=n.contextType;o=si,typeof u==`object`&&u&&(o=ta(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Ks(t,a,r,o),Ba=!1;var f=t.memoizedState;a.state=f,Ya(t,r,a,i),Ja(),l=t.memoizedState,s||f!==l||Ba?(typeof d==`function`&&(Us(t,n,d,r),l=t.memoizedState),(c=Ba||Gs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ha(e,t),o=t.memoizedProps,u=qs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=si,typeof l==`object`&&l&&(c=ta(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Ks(t,a,r,c),Ba=!1,f=t.memoizedState,a.state=f,Ya(t,r,a,i),Ja();var p=t.memoizedState;o!==d||f!==p||Ba||e!==null&&e.dependencies!==null&&$i(e.dependencies)?(typeof s==`function`&&(Us(t,n,s,r),p=t.memoizedState),(u=Ba||Gs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&$i(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,hc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ra(t,e.child,null,i),t.child=Ra(t,null,n,i)):ac(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Ac(e,t,i),e}function yc(e,t,n,r){return Hi(),t.flags|=256,ac(e,t,n,r),t.child}var bc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function xc(e){return{baseLanes:e,cachePool:xa()}}function Sc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function Cc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(uo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(z){if(i?ao(t):co(t),(e=R)?(e=rf(e,Ii),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ei===null?null:{id:Di,overflow:Oi},retryLane:536870912,hydrationErrors:null},n=gi(e),n.return=t,t.child=n,Pi=t,R=null)):e=null,e===null)throw Ri(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,i?(co(t),i=t.mode,c=Tc({mode:`hidden`,children:c},i),r=mi(r,i,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=xc(n),r.childLanes=Sc(e,o,n),t.memoizedState=bc,uc(null,r)):(ao(t),wc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(a)t.flags&256?(ao(t),t.flags&=-257,t=Ec(e,t,n)):t.memoizedState===null?(co(t),c=r.fallback,i=t.mode,r=Tc({mode:`visible`,children:r.children},i),c=mi(c,i,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ra(t,e.child,null,n),r=t.child,r.memoizedState=xc(n),r.childLanes=Sc(e,o,n),t.memoizedState=bc,t=uc(null,r)):(co(t),t.child=e.child,t.flags|=128,t=null);else if(ao(t),of(c)){if(o=c.nextSibling&&c.nextSibling.dataset,o)var u=o.dgst;o=u,r=Error(s(419)),r.stack=``,r.digest=o,Wi({value:r,source:null,stack:null}),t=Ec(e,t,n)}else if(ic||Qi(e,t,n,!1),o=(n&e.childLanes)!==0,ic||o){if(o=K,o!==null&&(r=it(o,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ii(e,r),hu(o,e,r),rc;af(c)||Du(),t=Ec(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,R=cf(c.nextSibling),Pi=t,z=!0,Fi=null,Ii=!1,e!==null&&Ni(t,e),t=wc(t,r.children),t.flags|=4096);return t}return i?(co(t),c=r.fallback,i=t.mode,l=e.child,u=l.sibling,r=di(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=mi(c,i,n,null),c.flags|=2):c=di(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,uc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=xc(n):(i=c.cachePool,i===null?i=xa():(l=sa._currentValue,i=i.parent===l?i:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:i}),r.memoizedState=c,r.childLanes=Sc(e,o,n),t.memoizedState=bc,uc(e.child,r)):(ao(t),n=e.child,e=n.sibling,n=di(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function wc(e,t){return t=Tc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Tc(e,t){return e=li(22,e,null,t),e.lanes=0,e}function Ec(e,t,n){return Ra(t,e.child,null,n),e=wc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Dc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Xi(e.return,t,n)}function Oc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function kc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=uo.current,s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,j(uo,o),ac(e,t,r,n),r=z?Ci:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Dc(e,n,t);else if(e.tag===19)Dc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&fo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Oc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&fo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Oc(t,!0,n,null,a,r);break;case`together`:Oc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Ac(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Qi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=di(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=di(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function jc(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&$i(e)))}function Mc(e,t,n){switch(t.tag){case 3:he(t,t.stateNode.containerInfo),Ji(t,sa,e.memoizedState.cache),Hi();break;case 27:case 5:_e(t);break;case 4:he(t,t.stateNode.containerInfo);break;case 10:Ji(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,oo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(ao(t),e=Ac(e,t,n),e===null?null:e.sibling):Cc(e,t,n):(ao(t),t.flags|=128,null);ao(t);break;case 19:var i=!!(e.flags&128);if(r=(n&t.childLanes)!==0,r||=(Qi(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return kc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),j(uo,uo.current),r)break;return null;case 22:return t.lanes=0,lc(e,t,n,t.pendingProps);case 24:Ji(t,sa,e.memoizedState.cache)}return Ac(e,t,n)}function Nc(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)ic=!0;else{if(!jc(e,n)&&!(t.flags&128))return ic=!1,Mc(e,t,n);ic=!!(e.flags&131072)}}else ic=!1,z&&t.flags&1048576&&Ai(t,Ci,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Oa(t.elementType),t.type=e,typeof e==`function`)ui(e)?(r=qs(e,r),t.tag=1,t=vc(null,t,e,r,n)):(t.tag=0,t=gc(null,t,e,r,n));else{if(e!=null){var i=e.$$typeof;if(i===w){t.tag=11,t=oc(null,t,e,r,n);break a}if(i===E){t.tag=14,t=sc(null,t,e,r,n);break a}}throw t=oe(e)||e,Error(s(306,t,``))}}return t;case 0:return gc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,i=qs(r,t.pendingProps),vc(e,t,r,i,n);case 3:a:{if(he(t,t.stateNode.containerInfo),e===null)throw Error(s(387));r=t.pendingProps;var a=t.memoizedState;i=a.element,Ha(e,t),Ya(t,r,null,n);var o=t.memoizedState;if(r=o.cache,Ji(t,sa,r),r!==a.cache&&Zi(t,[sa],n,!0),Ja(),r=o.element,a.isDehydrated){if(a={element:r,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=yc(e,t,r,n);break a}if(r!==i){i=yi(Error(s(424)),t),Wi(i),t=yc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(R=cf(e.firstChild),Pi=t,z=!0,Fi=null,Ii=!0,n=za(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Hi(),r===i){t=Ac(e,t,n);break a}ac(e,t,r,n)}t=t.child}return t;case 26:return hc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:z||(n=t.type,e=t.pendingProps,r=Bd(pe.current).createElement(n),r[ut]=t,r[dt]=e,Pd(r,n,e),St(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return _e(t),e===null&&z&&(r=t.stateNode=ff(t.type,t.pendingProps,pe.current),Pi=t,Ii=!0,i=R,Zd(t.type)?(lf=i,R=cf(r.firstChild)):R=i),ac(e,t,t.pendingProps.children,n),hc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&z&&((i=r=R)&&(r=tf(r,t.type,t.pendingProps,Ii),r===null?i=!1:(t.stateNode=r,Pi=t,R=cf(r.firstChild),Ii=!1,i=!0)),i||Ri(t)),_e(t),i=t.type,a=t.pendingProps,o=e===null?null:e.memoizedProps,r=a.children,Ud(i,a)?r=null:o!==null&&Ud(i,o)&&(t.flags|=32),t.memoizedState!==null&&(i=Co(e,t,Eo,null,null,n),Qf._currentValue=i),hc(e,t),ac(e,t,r,n),t.child;case 6:return e===null&&z&&((e=n=R)&&(n=nf(n,t.pendingProps,Ii),n===null?e=!1:(t.stateNode=n,Pi=t,R=null,e=!0)),e||Ri(t)),null;case 13:return Cc(e,t,n);case 4:return he(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ra(t,null,r,n):ac(e,t,r,n),t.child;case 11:return oc(e,t,t.type,t.pendingProps,n);case 7:return ac(e,t,t.pendingProps,n),t.child;case 8:return ac(e,t,t.pendingProps.children,n),t.child;case 12:return ac(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Ji(t,t.type,r.value),ac(e,t,r.children,n),t.child;case 9:return i=t.type._context,r=t.pendingProps.children,ea(t),i=ta(i),r=r(i),t.flags|=1,ac(e,t,r,n),t.child;case 14:return sc(e,t,t.type,t.pendingProps,n);case 15:return cc(e,t,t.type,t.pendingProps,n);case 19:return kc(e,t,n);case 31:return mc(e,t,n);case 22:return lc(e,t,n,t.pendingProps);case 24:return ea(t),r=ta(sa),e===null?(i=ya(),i===null&&(i=K,a=ca(),i.pooledCache=a,a.refCount++,a!==null&&(i.pooledCacheLanes|=n),i=a),t.memoizedState={parent:r,cache:i},Va(t),Ji(t,sa,i)):((e.lanes&n)!==0&&(Ha(e,t),Ya(t,null,null,n),Ja()),i=e.memoizedState,a=t.memoizedState,i.parent===r?(r=a.cache,Ji(t,sa,r),r!==i.cache&&Zi(t,[sa],n,!0)):(i={parent:r,cache:r},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),Ji(t,sa,r))),ac(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(s(156,t.tag))}function Pc(e){e.flags|=4}function Fc(e,t,n,r,i){if((t=!!(e.mode&32))&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw ka=Ta,Ca}}else e.flags&=-16777217}function Ic(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t)){if(wu())e.flags|=8192;else throw ka=Ta,Ca}}function Lc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Qe(),e.lanes|=t,Yl|=t)}function Rc(e,t){if(!z)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function U(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function zc(e,t,n){var r=t.pendingProps;switch(Mi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return U(t),null;case 1:return U(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Yi(sa),ge(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Vi(t)?Pc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ui())),U(t),null;case 26:var i=t.type,a=t.memoizedState;return e===null?(Pc(t),a===null?(U(t),Fc(t,i,null,r,n)):(U(t),Ic(t,a))):a?a===e.memoizedState?(U(t),t.flags&=-16777217):(Pc(t),U(t),Ic(t,a)):(e=e.memoizedProps,e!==r&&Pc(t),U(t),Fc(t,i,e,r,n)),null;case 27:if(N(t),n=pe.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Pc(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return U(t),null}e=M.current,Vi(t)?zi(t,e):(e=ff(i,r,n),t.stateNode=e,Pc(t))}return U(t),null;case 5:if(N(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Pc(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return U(t),null}if(a=M.current,Vi(t))zi(t,a);else{var o=Bd(pe.current);switch(a){case 1:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case 2:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;default:switch(i){case`svg`:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case`math`:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;case`script`:a=o.createElement(`div`),a.innerHTML=`<script><\/script>`,a=a.removeChild(a.firstChild);break;case`select`:a=typeof r.is==`string`?o.createElement(`select`,{is:r.is}):o.createElement(`select`),r.multiple?a.multiple=!0:r.size&&(a.size=r.size);break;default:a=typeof r.is==`string`?o.createElement(i,{is:r.is}):o.createElement(i)}}a[ut]=t,a[dt]=r;a:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)a.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break a;for(;o.sibling===null;){if(o.return===null||o.return===t)break a;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=a;a:switch(Pd(a,i,r),i){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Pc(t)}}return U(t),Fc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Pc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(s(166));if(e=pe.current,Vi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,i=Pi,i!==null)switch(i.tag){case 27:case 5:r=i.memoizedProps}e[ut]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Ri(t,!0)}else e=Bd(e).createTextNode(r),e[ut]=t,t.stateNode=e}return U(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Vi(t),n!==null){if(e===null){if(!r)throw Error(s(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(557));e[ut]=t}else Hi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;U(t),e=!1}else n=Ui(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(lo(t),t):(lo(t),null);if(t.flags&128)throw Error(s(558))}return U(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=Vi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(s(318));if(i=t.memoizedState,i=i===null?null:i.dehydrated,!i)throw Error(s(317));i[ut]=t}else Hi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;U(t),i=!1}else i=Ui(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(lo(t),t):(lo(t),null)}return lo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,i=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(i=r.alternate.memoizedState.cachePool.pool),a=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(a=r.memoizedState.cachePool.pool),a!==i&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Lc(t,t.updateQueue),U(t),null);case 4:return ge(),e===null&&Sd(t.stateNode.containerInfo),U(t),null;case 10:return Yi(t.type),U(t),null;case 19:if(A(uo),r=t.memoizedState,r===null)return U(t),null;if(i=!!(t.flags&128),a=r.rendering,a===null){if(i)Rc(r,!1);else{if(X!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=fo(e),a!==null){for(t.flags|=128,Rc(r,!1),e=a.updateQueue,t.updateQueue=e,Lc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)fi(n,e),n=n.sibling;return j(uo,uo.current&1|2),z&&ki(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&ke()>tu&&(t.flags|=128,i=!0,Rc(r,!1),t.lanes=4194304)}}else{if(!i){if(e=fo(a),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,Lc(t,e),Rc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!a.alternate&&!z)return U(t),null}else 2*ke()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,i=!0,Rc(r,!1),t.lanes=4194304)}r.isBackwards?(a.sibling=t.child,t.child=a):(e=r.last,e===null?t.child=a:e.sibling=a,r.last=a)}return r.tail===null?(U(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=ke(),e.sibling=null,n=uo.current,j(uo,i?n&1|2:n&1),z&&ki(t,r.treeForkCount),e);case 22:case 23:return lo(t),no(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(U(t),t.subtreeFlags&6&&(t.flags|=8192)):U(t),n=t.updateQueue,n!==null&&Lc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&A(va),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Yi(sa),U(t),null;case 25:return null;case 30:return null}throw Error(s(156,t.tag))}function Bc(e,t){switch(Mi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Yi(sa),ge(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return N(t),null;case 31:if(t.memoizedState!==null){if(lo(t),t.alternate===null)throw Error(s(340));Hi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(lo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));Hi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return A(uo),null;case 4:return ge(),null;case 10:return Yi(t.type),null;case 22:case 23:return lo(t),no(),e!==null&&A(va),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Yi(sa),null;case 25:return null;default:return null}}function Vc(e,t){switch(Mi(t),t.tag){case 3:Yi(sa),ge();break;case 26:case 27:case 5:N(t);break;case 4:ge();break;case 31:t.memoizedState!==null&&lo(t);break;case 13:lo(t);break;case 19:A(uo);break;case 10:Yi(t.type);break;case 22:case 23:lo(t),no(),e!==null&&A(va);break;case 24:Yi(sa)}}function Hc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Uc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Wc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Za(t,n)}catch(t){Z(e,e.return,t)}}}function Gc(e,t,n){n.props=qs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Kc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function qc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Jc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Yc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[dt]=t}catch(t){Z(e,e.return,t)}}function Xc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Zc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Xc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=nn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Qc(e,t,n),e=e.sibling;e!==null;)Qc(e,t,n),e=e.sibling}function $c(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for($c(e,t,n),e=e.sibling;e!==null;)$c(e,t,n),e=e.sibling}function el(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[ut]=e,t[dt]=n}catch(t){Z(e,e.return,t)}}var tl=!1,nl=!1,rl=!1,il=typeof WeakSet==`function`?WeakSet:Set,al=null;function ol(e,t){if(e=e.containerInfo,Rd=sp,e=Or(e),kr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break a}var o=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||i!==0&&f.nodeType!==3||(c=o+i),f!==a||r!==0&&f.nodeType!==3||(l=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===i&&(c=o),p===a&&++d===r&&(l=o),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,al=t;al!==null;)if(t=al,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,al=e;else for(;al!==null;){switch(t=al,a=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)i=e[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&a!==null){e=void 0,n=t,i=a.memoizedProps,a=a.memoizedState,r=n.stateNode;try{var h=qs(n.type,i);e=r.getSnapshotBeforeUpdate(h,a),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(s(163))}if(e=t.sibling,e!==null){e.return=t.return,al=e;break}al=t.return}}function sl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:xl(e,n),r&4&&Hc(5,n);break;case 1:if(xl(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=qs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&Wc(n),r&512&&Kc(n,n.return);break;case 3:if(xl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Za(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&el(n);case 26:case 5:xl(e,n),t===null&&r&4&&Jc(n),r&512&&Kc(n,n.return);break;case 12:xl(e,n);break;case 31:xl(e,n),r&4&&fl(e,n);break;case 13:xl(e,n),r&4&&pl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||tl,!r){t=t!==null&&t.memoizedState!==null||nl,i=tl;var a=nl;tl=r,(nl=t)&&!a?Cl(e,n,!!(n.subtreeFlags&8772)):xl(e,n),tl=i,nl=a}break;case 30:break;default:xl(e,n)}}function cl(e){var t=e.alternate;t!==null&&(e.alternate=null,cl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&_t(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var W=null,ll=!1;function ul(e,t,n){for(n=n.child;n!==null;)dl(e,t,n),n=n.sibling}function dl(e,t,n){if(ze&&typeof ze.onCommitFiberUnmount==`function`)try{ze.onCommitFiberUnmount(Re,n)}catch{}switch(n.tag){case 26:nl||qc(n,t),ul(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:nl||qc(n,t);var r=W,i=ll;Zd(n.type)&&(W=n.stateNode,ll=!1),ul(e,t,n),pf(n.stateNode),W=r,ll=i;break;case 5:nl||qc(n,t);case 6:if(r=W,i=ll,W=null,ul(e,t,n),W=r,ll=i,W!==null){if(ll)try{(W.nodeType===9?W.body:W.nodeName===`HTML`?W.ownerDocument.body:W).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{W.removeChild(n.stateNode)}catch(e){Z(n,t,e)}}break;case 18:W!==null&&(ll?(e=W,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(W,n.stateNode));break;case 4:r=W,i=ll,W=n.stateNode.containerInfo,ll=!0,ul(e,t,n),W=r,ll=i;break;case 0:case 11:case 14:case 15:Uc(2,n,t),nl||Uc(4,n,t),ul(e,t,n);break;case 1:nl||(qc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Gc(n,t,r)),ul(e,t,n);break;case 21:ul(e,t,n);break;case 22:nl=(r=nl)||n.memoizedState!==null,ul(e,t,n),nl=r;break;default:ul(e,t,n)}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function pl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function ml(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new il),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new il),t;default:throw Error(s(435,e.tag))}}function hl(e,t){var n=ml(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function gl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r],a=e,o=t,c=o;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){W=c.stateNode,ll=!1;break a}break;case 5:W=c.stateNode,ll=!1;break a;case 3:case 4:W=c.stateNode.containerInfo,ll=!0;break a}c=c.return}if(W===null)throw Error(s(160));dl(a,o,i),W=null,ll=!1,a=i.alternate,a!==null&&(a.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)vl(t,e),t=t.sibling}var _l=null;function vl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:gl(t,e),yl(e),r&4&&(Uc(3,e,e.return),Hc(3,e),Uc(5,e,e.return));break;case 1:gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),r&64&&tl&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var i=_l;if(gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),r&4){var a=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null){if(r===null){if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,i=i.ownerDocument||i;b:switch(r){case`title`:a=i.getElementsByTagName(`title`)[0],(!a||a[gt]||a[ut]||a.namespaceURI===`http://www.w3.org/2000/svg`||a.hasAttribute(`itemprop`))&&(a=i.createElement(r),i.head.insertBefore(a,i.querySelector(`head > title`))),Pd(a,r,n),a[ut]=e,St(a),r=a;break a;case`link`:var o=Vf(`link`,`href`,i).get(r+(n.href||``));if(o){for(var c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&a.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&a.getAttribute(`title`)===(n.title==null?null:n.title)&&a.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;case`meta`:if(o=Vf(`meta`,`content`,i).get(r+(n.content||``))){for(c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`content`)===(n.content==null?null:``+n.content)&&a.getAttribute(`name`)===(n.name==null?null:n.name)&&a.getAttribute(`property`)===(n.property==null?null:n.property)&&a.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&a.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;default:throw Error(s(468,r))}a[ut]=e,St(a),r=a}e.stateNode=r}else Hf(i,e.type,e.stateNode)}else e.stateNode=If(i,r,e.memoizedProps)}else a===r?r===null&&e.stateNode!==null&&Yc(e,e.memoizedProps,n.memoizedProps):(a===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):a.count--,r===null?Hf(i,e.type,e.stateNode):If(i,r,e.memoizedProps))}break;case 27:gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),n!==null&&r&4&&Yc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),e.flags&32){i=e.stateNode;try{Jt(i,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(i=e.memoizedProps,Yc(e,i,n===null?i:n.memoizedProps)),r&1024&&(rl=!0);break;case 6:if(gl(t,e),yl(e),r&4){if(e.stateNode===null)throw Error(s(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,i=_l,_l=gf(t.containerInfo),gl(t,e),_l=i,yl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}rl&&(rl=!1,bl(e));break;case 4:r=_l,_l=gf(e.stateNode.containerInfo),gl(t,e),yl(e),_l=r;break;case 12:gl(t,e),yl(e);break;case 31:gl(t,e),yl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 13:gl(t,e),yl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=ke()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 22:i=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=tl,d=nl;if(tl=u||i,nl=d||l,gl(t,e),nl=d,tl=u,yl(e),r&8192)a:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(n===null||l||tl||nl||Sl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(a=l.stateNode,i)o=a.style,typeof o.setProperty==`function`?o.setProperty(`display`,`none`,`important`):o.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=i?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;i?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,hl(e,n))));break;case 19:gl(t,e),yl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 30:break;case 21:break;default:gl(t,e),yl(e)}}function yl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Xc(r)){n=r;break}r=r.return}if(n==null)throw Error(s(160));switch(n.tag){case 27:var i=n.stateNode;$c(e,Zc(e),i);break;case 5:var a=n.stateNode;n.flags&32&&(Jt(a,``),n.flags&=-33),$c(e,Zc(e),a);break;case 3:case 4:var o=n.stateNode.containerInfo;Qc(e,Zc(e),o);break;default:throw Error(s(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function bl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;bl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function xl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)sl(e,t.alternate,t),t=t.sibling}function Sl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Uc(4,t,t.return),Sl(t);break;case 1:qc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Gc(t,t.return,n),Sl(t);break;case 27:pf(t.stateNode);case 26:case 5:qc(t,t.return),Sl(t);break;case 22:t.memoizedState===null&&Sl(t);break;case 30:Sl(t);break;default:Sl(t)}e=e.sibling}}function Cl(e,t,n){for(n&&=!!(t.subtreeFlags&8772),t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Cl(i,a,n),Hc(4,a);break;case 1:if(Cl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Xa(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Wc(a),Kc(a,a.return);break;case 27:el(a);case 26:case 5:Cl(i,a,n),n&&r===null&&o&4&&Jc(a),Kc(a,a.return);break;case 12:Cl(i,a,n);break;case 31:Cl(i,a,n),n&&o&4&&fl(i,a);break;case 13:Cl(i,a,n),n&&o&4&&pl(i,a);break;case 22:a.memoizedState===null&&Cl(i,a,n),Kc(a,a.return);break;case 30:break;default:Cl(i,a,n)}t=t.sibling}}function wl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&la(n))}function Tl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&la(e))}function El(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Dl(e,t,n,r),t=t.sibling}function Dl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:El(e,t,n,r),i&2048&&Hc(9,t);break;case 1:El(e,t,n,r);break;case 3:El(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&la(e)));break;case 12:if(i&2048){El(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else El(e,t,n,r);break;case 31:El(e,t,n,r);break;case 13:El(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?El(e,t,n,r):(a._visibility|=2,Ol(e,t,n,r,!!(t.subtreeFlags&10256)||!1)):a._visibility&2?El(e,t,n,r):kl(e,t),i&2048&&wl(o,t);break;case 24:El(e,t,n,r),i&2048&&Tl(t.alternate,t);break;default:El(e,t,n,r)}}function Ol(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Ol(a,o,s,c,i),Hc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Ol(a,o,s,c,i)):u._visibility&2?Ol(a,o,s,c,i):kl(a,o),i&&l&2048&&wl(o.alternate,o);break;case 24:Ol(a,o,s,c,i),i&&l&2048&&Tl(o.alternate,o);break;default:Ol(a,o,s,c,i)}t=t.sibling}}function kl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:kl(n,r),i&2048&&wl(r.alternate,r);break;case 24:kl(n,r),i&2048&&Tl(r.alternate,r);break;default:kl(n,r)}t=t.sibling}}var Al=8192;function jl(e,t,n){if(e.subtreeFlags&Al)for(e=e.child;e!==null;)Ml(e,t,n),e=e.sibling}function Ml(e,t,n){switch(e.tag){case 26:jl(e,t,n),e.flags&Al&&e.memoizedState!==null&&Gf(n,_l,e.memoizedState,e.memoizedProps);break;case 5:jl(e,t,n);break;case 3:case 4:var r=_l;_l=gf(e.stateNode.containerInfo),jl(e,t,n),_l=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Al,Al=16777216,jl(e,t,n),Al=r):jl(e,t,n));break;default:jl(e,t,n)}}function Nl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Pl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];al=r,Ll(r,e)}Nl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Fl(e),e=e.sibling}function Fl(e){switch(e.tag){case 0:case 11:case 15:Pl(e),e.flags&2048&&Uc(9,e,e.return);break;case 3:Pl(e);break;case 12:Pl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Il(e)):Pl(e);break;default:Pl(e)}}function Il(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];al=r,Ll(r,e)}Nl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Uc(8,t,t.return),Il(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Il(t));break;default:Il(t)}e=e.sibling}}function Ll(e,t){for(;al!==null;){var n=al;switch(n.tag){case 0:case 11:case 15:Uc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:la(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,al=r;else a:for(n=e;al!==null;){r=al;var i=r.sibling,a=r.return;if(cl(r),r===n){al=null;break a}if(i!==null){i.return=a,al=i;break a}al=a}}}var Rl={getCacheForType:function(e){var t=ta(sa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ta(sa).controller.signal}},zl=typeof WeakMap==`function`?WeakMap:Map,G=0,K=null,q=null,J=0,Y=0,Bl=null,Vl=!1,Hl=!1,Ul=!1,Wl=0,X=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return G&2&&J!==0?J&-J:O.T===null?st():dd()}function mu(){if(Jl===0){if(!(J&536870912)||z){var e=Ke;Ke<<=1,!(Ke&3932160)&&(Ke=262144),Jl=e}else Jl=536870912}return e=ro.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===K&&(Y===2||Y===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,J,Jl,!1)),et(e,n),(!(G&2)||e!==K)&&(e===K&&(!(G&2)&&(Kl|=n),X===4&&yu(e,J,Jl,!1)),rd(e))}function gu(e,t,n){if(G&6)throw Error(s(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||Xe(e,t),i=r?Au(e,t):Ou(e,t,!0),a=r;do{if(i===0){Hl&&!r&&yu(e,t,0,!1);break}if(n=e.current.alternate,a&&!vu(n)){i=Ou(e,t,!1),a=!1;continue}if(i===2){if(a=t,e.errorRecoveryDisabledLanes&a)var o=0;else o=e.pendingLanes&-536870913,o=o===0?o&536870912?536870912:0:o;if(o!==0){t=o;a:{var c=e;i=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,o).flags|=256),o=Ou(c,o,!1),o!==2){if(Ul&&!l){c.errorRecoveryDisabledLanes|=a,Kl|=a,i=4;break a}a=Zl,Zl=i,a!==null&&(Zl===null?Zl=a:Zl.push.apply(Zl,a))}i=o}if(a=!1,i!==2)continue}}if(i===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,a=i,a){case 0:case 1:throw Error(s(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Vl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(s(329))}if((t&62914560)===t&&(i=$l+300-ke(),10<i)){if(yu(r,t,Jl,!Vl),Ye(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Vl,a,`Throttled`,-0,0),i);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Vl,a,null,-0,0)}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:nn},Ml(t,a,d);var m=(a&62914560)===a?$l-ke():(a&4194048)===a?eu-ke():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Cr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ve(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&nt(e,n,t)}function bu(){return G&6?!0:(id(0,!1),!1)}function xu(){if(q!==null){if(Y===0)var e=q.return;else e=q,qi=Ki=null,ko(e),Ma=null,Na=0,e=q;for(;e!==null;)Vc(e.alternate,e),e=e.return;q=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),K=e,q=n=di(e.current,null),J=t,Y=0,Bl=null,Vl=!1,Hl=Xe(e,t),Ul=!1,Yl=Jl=ql=Kl=Gl=X=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Ve(r),a=1<<i;t|=e[i],r&=~a}return Wl=t,ti(),n}function Cu(e,t){B=null,O.H=zs,t===Sa||t===wa?(t=Aa(),Y=3):t===Ca?(t=Aa(),Y=4):Y=t===rc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Bl=t,q===null&&(X=1,Zs(e,yi(t,e.current)))}function wu(){var e=ro.current;return e===null?!0:(J&4194048)===J?io===null:(J&62914560)===J||J&536870912?e===io:!1}function Tu(){var e=O.H;return O.H=zs,e===null?zs:e}function Eu(){var e=O.A;return O.A=Rl,e}function Du(){X=4,Vl||(J&4194048)!==J&&ro.current!==null||(Hl=!0),!(Gl&134217727)&&!(Kl&134217727)||K===null||yu(K,J,Jl,!1)}function Ou(e,t,n){var r=G;G|=2;var i=Tu(),a=Eu();(K!==e||J!==t)&&(nu=null,Su(e,t)),t=!1;var o=X;a:do try{if(Y!==0&&q!==null){var s=q,c=Bl;switch(Y){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:ro.current===null&&(t=!0);var l=Y;if(Y=0,Bl=null,Pu(e,s,c,l),n&&Hl){o=0;break a}break;default:l=Y,Y=0,Bl=null,Pu(e,s,c,l)}}ku(),o=X;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,qi=Ki=null,G=r,O.H=i,O.A=a,q===null&&(K=null,J=0,ti()),o}function ku(){for(;q!==null;)Mu(q)}function Au(e,t){var n=G;G|=2;var r=Tu(),i=Eu();K!==e||J!==t?(nu=null,tu=ke()+500,Su(e,t)):Hl=Xe(e,t);a:do try{if(Y!==0&&q!==null){t=q;var a=Bl;b:switch(Y){case 1:Y=0,Bl=null,Pu(e,t,a,1);break;case 2:case 9:if(Ea(a)){Y=0,Bl=null,Nu(t);break}t=function(){Y!==2&&Y!==9||K!==e||(Y=7),rd(e)},a.then(t,t);break a;case 3:Y=7;break a;case 4:Y=5;break a;case 7:Ea(a)?(Y=0,Bl=null,Nu(t)):(Y=0,Bl=null,Pu(e,t,a,7));break;case 5:var o=null;switch(q.tag){case 26:o=q.memoizedState;case 5:case 27:var c=q;if(o?Wf(o):c.stateNode.complete){Y=0,Bl=null;var l=c.sibling;if(l!==null)q=l;else{var u=c.return;u===null?q=null:(q=u,Fu(u))}break b}}Y=0,Bl=null,Pu(e,t,a,5);break;case 6:Y=0,Bl=null,Pu(e,t,a,6);break;case 8:xu(),X=6;break a;default:throw Error(s(462))}}ju();break}catch(t){Cu(e,t)}while(1);return qi=Ki=null,O.H=r,O.A=i,G=n,q===null?(K=null,J=0,ti(),X):0}function ju(){for(;q!==null&&!De();)Mu(q)}function Mu(e){var t=Nc(e.alternate,e,Wl);e.memoizedProps=e.pendingProps,t===null?Fu(e):q=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=_c(n,t,t.pendingProps,t.type,void 0,J);break;case 11:t=_c(n,t,t.pendingProps,t.type.render,t.ref,J);break;case 5:ko(t);default:Vc(n,t),t=q=fi(t,Wl),t=Nc(n,t,Wl)}e.memoizedProps=e.pendingProps,t===null?Fu(e):q=t}function Pu(e,t,n,r){qi=Ki=null,ko(t),Ma=null,Na=0;var i=t.return;try{if(nc(e,i,t,n,J)){X=1,Zs(e,yi(n,e.current)),q=null;return}}catch(t){if(i!==null)throw q=i,t;X=1,Zs(e,yi(n,e.current)),q=null;return}t.flags&32768?(z||r===1?e=!0:Hl||J&536870912?e=!1:(Vl=e=!0,(r===2||r===9||r===3||r===6)&&(r=ro.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Vl);return}e=t.return;var n=zc(t.alternate,t,Wl);if(n!==null){q=n;return}if(t=t.sibling,t!==null){q=t;return}q=t=e}while(t!==null);X===0&&(X=5)}function Iu(e,t){do{var n=Bc(e.alternate,e);if(n!==null){n.flags&=32767,q=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){q=e;return}q=e=n}while(e!==null);X=6,q=null}function Lu(e,t,n,r,i,a,o,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(G&6)throw Error(s(327));if(t!==null){if(t===e.current)throw Error(s(177));if(a=t.lanes|t.childLanes,a|=ei,tt(e,n,a,o,c,l),e===K&&(q=K=null,J=0),ou=t,au=e,su=n,cu=a,lu=i,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Ne,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=O.T,O.T=null,i=k.p,k.p=2,o=G,G|=4;try{ol(e,t,n)}finally{G=o,k.p=i,O.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=!!(t.flags&13878);if(t.subtreeFlags&13878||n){n=O.T,O.T=null;var r=k.p;k.p=2;var i=G;G|=4;try{vl(t,e);var a=zd,o=Or(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Dr(s.ownerDocument.documentElement,s)){if(c!==null&&kr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Er(s,h),v=Er(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{G=i,k.p=r,O.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=O.T,O.T=null;var r=k.p;k.p=2;var i=G;G|=4;try{sl(e,t.alternate,t)}finally{G=i,k.p=r,O.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,Oe();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),ot(n),t=t.stateNode,ze&&typeof ze.onCommitFiberRoot==`function`)try{ze.onCommitFiberRoot(Re,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=O.T,i=k.p,k.p=2,O.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{O.T=t,k.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,la(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=ot(su),r=O.T,i=k.p;try{k.p=32>n?32:n,O.T=null,n=lu,lu=null;var a=au,o=su;if(iu=0,ou=au=null,su=0,G&6)throw Error(s(331));var c=G;if(G|=4,Fl(a.current),Dl(a,a.current,o,n),G=c,id(0,!1),ze&&typeof ze.onPostCommitFiberRoot==`function`)try{ze.onPostCommitFiberRoot(Re,a)}catch{}return!0}finally{k.p=i,O.T=r,Vu(e,t)}}function Wu(e,t,n){t=yi(n,t),t=$s(e.stateNode,t,2),e=Wa(e,t,2),e!==null&&(et(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=yi(n,e),n=ec(2),r=Wa(t,n,2),r!==null&&(tc(n,r,t,e),et(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new zl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Ul=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,K===e&&(J&n)===n&&(X===4||X===3&&(J&62914560)===J&&300>ke()-$l?!(G&2)&&Su(e,0):ql|=n,Yl===J&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=Qe()),e=ii(e,t),e!==null&&(et(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Te(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ve(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=J,a=Ye(r,r===K?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Xe(r,a)||(n=!0,ld(r,a))}r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=ke(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ve(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Ze(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=K,n=J,n=Ye(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Y===2||Y===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ee(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Xe(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Ee(r),ot(n)){case 2:case 8:n=Me;break;case 32:n=Ne;break;case 268435456:n=Fe;break;default:n=Ne}return r=cd.bind(null,e),n=Te(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Ee(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=J;return r=Ye(e,e===K?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,ke()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){G&6?Te(je,ad):od()})}function dd(){if(nd===0){var e=fa;e===0&&(e=Ge,Ge<<=1,!(Ge&261888)&&(Ge=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:tn(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[dt]||null).action),o=r.submitter;o&&(t=(t=o[dt]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Sn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Ts(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Ts(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<Yr.length;hd++){var gd=Yr[hd];Xr(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}Xr(Vr,`onAnimationEnd`),Xr(Hr,`onAnimationIteration`),Xr(Ur,`onAnimationStart`),Xr(`dblclick`,`onDoubleClick`),Xr(`focusin`,`onFocus`),Xr(`focusout`,`onBlur`),Xr(Wr,`onTransitionRun`),Xr(Gr,`onTransitionStart`),Xr(Kr,`onTransitionCancel`),Xr(qr,`onTransitionEnd`),Et(`onMouseEnter`,[`mouseout`,`mouseover`]),Et(`onMouseLeave`,[`mouseout`,`mouseover`]),Et(`onPointerEnter`,[`pointerout`,`pointerover`]),Et(`onPointerLeave`,[`pointerout`,`pointerover`]),Tt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Tt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Tt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Tt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Tt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Tt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Zr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Zr(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[pt];n===void 0&&(n=t[pt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,Ct.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!fn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&o.stateNode.containerInfo===i)return;o=o.return}for(;s!==null;){if(o=vt(s),o===null)return;if(c=o.tag,c===5||c===6||c===26||c===27){r=a=o;continue a}s=s.parentNode}}r=r.return}ln(function(){var r=a,i=an(n),o=[];a:{var s=Jr.get(e);if(s!==void 0){var c=Sn,u=e;switch(e){case`keypress`:if(vn(n)===0)break a;case`keydown`:case`keyup`:c=Bn;break;case`focusin`:u=`focus`,c=jn;break;case`focusout`:u=`blur`,c=jn;break;case`beforeblur`:case`afterblur`:c=jn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:c=kn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:c=An;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:c=Hn;break;case Vr:case Hr:case Ur:c=Mn;break;case qr:c=Un;break;case`scroll`:case`scrollend`:c=wn;break;case`wheel`:c=Wn;break;case`copy`:case`cut`:case`paste`:c=Nn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:c=Vn;break;case`toggle`:case`beforetoggle`:c=Gn}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?s===null?null:s+`Capture`:s;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=un(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(s=new c(s,u,null,n,i),o.push({event:s,listeners:d}))}}if(!(t&7)){a:{if(s=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,s&&n!==rn&&(u=n.relatedTarget||n.fromElement)&&(vt(u)||u[ft]))break a;if((c||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,c?(u=n.relatedTarget||n.toElement,c=r,u=u?vt(u):null,u!==null&&(f=l(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(c=null,u=r),c!==u)){if(d=kn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Vn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?s:bt(c),h=u==null?s:bt(u),s=new d(g,m+`leave`,c,n,i),s.target=f,s.relatedTarget=h,g=null,vt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,c&&u)b:{for(d=Dd,p=c,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;c!==null&&Od(o,s,c,d,!1),u!==null&&f!==null&&Od(o,f,u,d,!0)}}a:{if(s=r?bt(r):window,c=s.nodeName&&s.nodeName.toLowerCase(),c===`select`||c===`input`&&s.type===`file`)var v=dr;else if(ar(s)){if(fr)v=xr;else{v=yr;var y=vr}}else c=s.nodeName,!c||c.toLowerCase()!==`input`||s.type!==`checkbox`&&s.type!==`radio`?r&&Qt(r.elementType)&&(v=dr):v=br;if(v&&=v(e,r)){or(o,v,n,i);break a}y&&y(e,s,r),e===`focusout`&&r&&s.type===`number`&&r.memoizedProps.value!=null&&Wt(s,`number`,s.value)}switch(y=r?bt(r):window,e){case`focusin`:(ar(y)||y.contentEditable===`true`)&&(jr=y,Mr=r,Nr=null);break;case`focusout`:Nr=Mr=jr=null;break;case`mousedown`:Pr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Pr=!1,Fr(o,n,i);break;case`selectionchange`:if(Ar)break;case`keydown`:case`keyup`:Fr(o,n,i)}var b;if(qn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else tr?$n(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Xn&&n.locale!==`ko`&&(tr||x!==`onCompositionStart`?x===`onCompositionEnd`&&tr&&(b=_n()):(mn=i,hn=`value`in mn?mn.value:mn.textContent,tr=!0)),y=Ed(r,x),0<y.length&&(x=new Pn(x,e,null,n,i),o.push({event:x,listeners:y}),b?x.data=b:(b=er(n),b!==null&&(x.data=b)))),(b=Yn?nr(e,n):rr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Pn(`onBeforeInput`,`beforeinput`,null,n,i),o.push({event:y,listeners:x}),y.data=b)),md(o,e,r,n,i)}yd(o,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=un(e,n),i!=null&&r.unshift(Td(e,i,a)),i=un(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=un(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=un(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,i,a){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Jt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Jt(e,``+r);break;case`className`:Mt(e,`class`,r);break;case`tabIndex`:Mt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Mt(e,n,r);break;case`style`:Zt(e,r,a);break;case`data`:if(t!==`object`){Mt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=tn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof a==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,i.name,i,null),$(e,t,`formEncType`,i.formEncType,i,null),$(e,t,`formMethod`,i.formMethod,i,null),$(e,t,`formTarget`,i.formTarget,i,null)):($(e,t,`encType`,i.encType,i,null),$(e,t,`method`,i.method,i,null),$(e,t,`target`,i.target,i,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=tn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=nn);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=tn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),jt(e,`popover`,r);break;case`xlinkActuate`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Nt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Nt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Nt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:jt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=$t.get(n)||n,jt(e,n,r))}}function Nd(e,t,n,r,i,a){switch(n){case`style`:Zt(e,r,a);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Jt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Jt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=nn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!wt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(i=n.endsWith(`Capture`),t=n.slice(2,i?n.length-7:void 0),a=e[dt]||null,a=a==null?null:a[n],typeof a==`function`&&e.removeEventListener(t,a,i),typeof r==`function`)){typeof a!=`function`&&a!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,i);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):jt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,i=!1,a;for(a in n)if(n.hasOwnProperty(a)){var o=n[a];if(o!=null)switch(a){case`src`:r=!0;break;case`srcSet`:i=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,a,o,n,null)}}i&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=a=o=i=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:i=d;break;case`type`:o=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:a=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(s(137,t));break;default:$(e,t,r,d,n,null)}}Ut(e,a,c,l,u,o,i,!1);return;case`select`:for(i in Q(`invalid`,e),r=o=a=null,n)if(n.hasOwnProperty(i)&&(c=n[i],c!=null))switch(i){case`value`:a=c;break;case`defaultValue`:o=c;break;case`multiple`:r=c;default:$(e,t,i,c,n,null)}t=a,n=o,e.multiple=!!r,t==null?n!=null&&Gt(e,!!r,n,!0):Gt(e,!!r,t,!1);return;case`textarea`:for(o in Q(`invalid`,e),a=i=r=null,n)if(n.hasOwnProperty(o)&&(c=n[o],c!=null))switch(o){case`value`:r=c;break;case`defaultValue`:i=c;break;case`children`:a=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(s(91));break;default:$(e,t,o,c,n,null)}qt(e,r,i,a);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,u,r,n,null)}return;default:if(Qt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var i=null,a=null,o=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:a=m;break;case`name`:i=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:o=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(s(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Ht(e,o,c,l,u,d,a,i);return;case`select`:for(a in m=o=c=p=null,n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(a)||$(e,t,a,null,r,l)}for(i in r)if(a=r[i],l=n[i],r.hasOwnProperty(i)&&(a!=null||l!=null))switch(i){case`value`:p=a;break;case`defaultValue`:c=a;break;case`multiple`:o=a;default:a!==l&&$(e,t,i,a,r,l)}t=c,n=o,r=m,p==null?!!r!=!!n&&(t==null?Gt(e,!!n,n?[]:``,!1):Gt(e,!!n,t,!0)):Gt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(i=n[c],n.hasOwnProperty(c)&&i!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,i)}for(o in r)if(i=r[o],a=n[o],r.hasOwnProperty(o)&&(i!=null||a!=null))switch(o){case`value`:p=i;break;case`defaultValue`:m=i;break;case`children`:break;case`dangerouslySetInnerHTML`:if(i!=null)throw Error(s(91));break;default:i!==a&&$(e,t,o,i,r,a)}Kt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(s(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(Qt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e!==Wd&&(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[gt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body)}n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),_t(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[gt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(s(452));return e;case`head`:if(e=t.head,!e)throw Error(s(453));return e;case`body`:if(e=t.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);_t(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=k.d;k.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=yt(e);t!==null&&t.tag===5&&t.type===`form`?Ds(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Vt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),St(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Vt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Vt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Vt(n.imageSizes)+`"]`)):i+=`[href="`+Vt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),St(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Vt(r)+`"][href="`+Vt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),St(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=xt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);St(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=xt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),St(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=xt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),St(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var i=(i=pe.current)?gf(i):null;if(!i)throw Error(s(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=xt(i).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var a=xt(i).hoistableStyles,o=a.get(e);if(o||(i=i.ownerDocument||i,o={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},a.set(e,o),(a=i.querySelector(jf(e)))&&!a._p&&(o.instance=a,o.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),a||Nf(i,e,n,o.state))),t&&r===null)throw Error(s(528,``));return o}if(t&&r!==null)throw Error(s(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=xt(i).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Af(e){return`href="`+Vt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),St(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Vt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Vt(n.href)+`"]`);if(r)return t.instance=r,St(r),r;var i=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),St(r),Pd(r,`style`,i),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:i=Af(n.href);var a=e.querySelector(jf(i));if(a)return t.state.loading|=4,t.instance=a,St(a),a;r=Mf(n),(i=mf.get(i))&&Rf(r,i),a=(e.ownerDocument||e).createElement(`link`),St(a);var o=a;return o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),t.state.loading|=4,Lf(a,n.precedence,e),t.instance=a;case`script`:return a=Pf(n.src),(i=e.querySelector(Ff(a)))?(t.instance=i,St(i),i):(r=n,(i=mf.get(a))&&(r=h({},n),zf(r,i)),e=e.ownerDocument||e,i=e.createElement(`script`),St(i),Pd(i,`link`,r),e.head.appendChild(i),t.instance=i);case`void`:return null;default:throw Error(s(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[gt]||a[ut]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,St(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),St(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:ce,_currentValue2:ce,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=$e(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=$e(0),this.hiddenUpdates=$e(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=li(3,null,null,t),e.current=a,a.stateNode=e,t=ca(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Va(a),e}function tp(e){return e?(e=si,e):si}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ua(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Wa(e,r,t),n!==null&&(hu(n,e,t),Ga(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ii(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=at(t);var n=ii(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=2,up(e,t,n,r)}finally{k.p=a,O.T=i}}function lp(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=8,up(e,t,n,r)}finally{k.p=a,O.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=yt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Je(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ve(o);s.entanglements[1]|=c,o&=~c}rd(a),!(G&6)&&(tu=ke()+500,id(0,!1))}}break;case 31:case 13:s=ii(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=an(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=vt(e),e!==null){var t=l(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=u(t),e!==null)return e;e=null}else if(n===31){if(e=d(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ae()){case je:return 2;case Me:return 8;case Ne:case Pe:return 32;case Fe:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=yt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=vt(e.target);if(t!==null){var n=l(t);if(n!==null){if(t=n.tag,t===13){if(t=u(n),t!==null){e.blockedOn=t,ct(e.priority,function(){op(n)});return}}else if(t===31){if(t=d(n),t!==null){e.blockedOn=t,ct(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);rn=r,n.target.dispatchEvent(r),rn=null}else return t=yt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=yt(n);a!==null&&(e.splice(t,3),t-=3,Ts(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[dt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[dt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[ft]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=st();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=r.version;if(Lp!==`19.2.8`)throw Error(s(527,Lp,`19.2.8`));k.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(s(188)):(e=Object.keys(e).join(`,`),Error(s(268,e)));return e=p(t),e=e===null?null:m(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.8`,rendererPackageName:`react-dom`,currentDispatcherRef:O,reconcilerVersion:`19.2.8`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Re=zp.inject(Rp),ze=zp}catch{}}e.createRoot=function(e,t){if(!c(e))throw Error(s(299));var n=!1,r=``,i=Js,a=Ys,o=Xs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,i,a,o,Pp),e[ft]=t.current,Sd(e),new Fp(t)}})),c=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=s()})),l=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),u=e(((e,t)=>{t.exports=l()})),d=c(),f=n(),p=u(),m=new Intl.NumberFormat(`fa-IR`),h=new Intl.NumberFormat(`fa-IR`,{useGrouping:!1}),g=new Intl.NumberFormat(`fa-IR`,{maximumFractionDigits:1}),_=new Intl.DateTimeFormat(`fa-IR`,{dateStyle:`medium`,timeStyle:`short`,timeZone:`Asia/Tehran`});function v(e){return Number.isFinite(e)?m.format(e):`—`}function y(e){return Number.isFinite(e)?h.format(e):`—`}function b(e,t=!1){return Number.isFinite(e)?`${t&&e>0?`+`:``}${g.format(e)}٪`:`—`}function x(e){return Number.isFinite(e)?Math.abs(e)>=1e9?`${g.format(e/1e9)} میلیارد تومان`:Math.abs(e)>=1e6?`${g.format(e/1e6)} میلیون تومان`:`${v(e)} تومان`:`—`}function S(e){let t=new Date(e);return e&&!Number.isNaN(t.valueOf())?_.format(t):`—`}var C={primary:`#66308d`,primaryLight:`#74479a`,primaryPale:`#82569f`,primaryGlow:`rgba(102,48,141,0.12)`,primaryBg:`#f4eef8`,primaryBg2:`#e9daef`,secondary:`#01ae9b`,secondaryLight:`#28c1ae`,secondaryDark:`#087a6e`,secondaryGlow:`rgba(1,174,155,0.10)`,secondaryBg:`#e8f8f5`,secondaryBg2:`#d2f0e9`,bg:`#f7f8fa`,bgGradient:`linear-gradient(180deg, #ffffff 0%, #f7f8fa 56%, #f7f8fa 100%)`,surface:`#ffffff`,surfaceLight:`#fbfbfc`,surfaceHover:`#f8f7fa`,surfaceGlass:`rgba(255,255,255,0.96)`,raised:`#f5f6f8`,border:`#edeef1`,borderMed:`#e7e8ec`,borderLight:`#dcdfe5`,text:`#202127`,textSec:`#60646e`,textMuted:`#6b707b`,white:`#17191f`,green:`#14785f`,greenBg:`#eaf7f0`,greenBg2:`#d6eee2`,orange:`#a9661b`,orangeBg:`#fff5e8`,orangeBg2:`#ffebcd`,red:`#b6404b`,redBg:`#fff0f1`,redBg2:`#f9dbde`,radius:18,radiusSm:13,radiusXs:10,shadow:`0 4px 22px rgba(24,31,41,0.035), 0 1px 3px rgba(24,31,41,0.025)`,shadowLg:`0 12px 34px rgba(24,31,41,0.07)`},w=`
  @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap');

  :root { --font-family: 'Vazirmatn', Tahoma, sans-serif; }
  *, *::before, *::after { box-sizing: border-box; }
  html, body {
    background: ${C.bg};
    font-family: var(--font-family);
    color: ${C.text};
    direction: rtl;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body { margin: 0; }
  input, button, select, textarea { font-family: inherit; }
  button, a { -webkit-tap-highlight-color: transparent; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #dfe1e7; border-radius: 99px; }

  .owj-app-header {
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    background: ${C.surfaceGlass};
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid ${C.border};
  }
  .owj-app-header__inner {
    display: flex;
    align-items: center;
    gap: 26px;
    width: 100%;
    max-width: 1440px;
    min-height: 76px;
    margin: 0 auto;
    padding: 12px 28px;
    direction: rtl;
  }
  .owj-app-header__brand {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    min-width: max-content;
    flex: none;
    text-decoration: none;
    color: ${C.text};
  }
  .owj-app-header__logo {
    display: grid;
    place-items: center;
    width: 43px;
    height: 43px;
    border: 1px solid ${C.primaryBg2};
    border-radius: 14px;
    background: ${C.primaryBg};
    color: ${C.primary};
    flex: none;
  }
  .owj-app-header__brand-copy { display: flex; flex-direction: column; gap: 2px; line-height: 1.35; }
  .owj-app-header__brand-copy strong { font-weight: 900; font-size: 18px; color: ${C.white}; }
  .owj-app-header__brand-copy small { font-weight: 500; font-size: 11px; color: ${C.textMuted}; }
  .owj-app-header__nav {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    min-width: 0;
    width: 100%;
  }
  .owj-app-header__nav-scroll {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    min-width: 0;
    overflow-x: auto;
    padding-block: 3px;
    scrollbar-width: thin;
    scrollbar-color: ${C.borderLight} transparent;
    overscroll-behavior-inline: contain;
  }
  .owj-app-header__nav-scroll::-webkit-scrollbar { height: 4px; }
  .owj-app-header__link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 43px;
    padding: 9px 14px;
    border-radius: 11px;
    border: 1px solid transparent;
    color: ${C.textSec};
    text-decoration: none;
    white-space: nowrap;
    flex: none;
    font-size: 13px;
    font-weight: 600;
    transition: background .18s ease, color .18s ease, border-color .18s ease;
  }
  .owj-app-header__link:hover {
    color: ${C.primary};
    background: ${C.primaryBg};
  }
  .owj-app-header__link[aria-current="page"] {
    color: ${C.primary};
    border-color: ${C.primaryBg2};
    background: ${C.primaryBg};
    font-weight: 800;
  }
  .owj-app-header__link:focus-visible,
  .owj-app-header__brand:focus-visible,
  .owj-page-error__back:focus-visible {
    outline: 3px solid rgba(102,48,141,.28);
    outline-offset: 3px;
  }

  .owj-app-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px 20px;
    max-width: 1440px;
    margin: 0 auto;
    padding: 23px 28px 34px;
    border-top: 1px solid ${C.border};
    color: ${C.textMuted};
    font-size: 12px;
    line-height: 1.9;
    direction: rtl;
  }
  .owj-app-footer strong { color: ${C.text}; font-weight: 800; }

  .owj-page-state {
    min-height: 100svh;
    padding: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${C.bgGradient};
    color: ${C.text};
    direction: rtl;
    text-align: center;
  }
  .owj-page-state__card {
    width: 100%;
    max-width: 480px;
    padding: clamp(25px, 6vw, 44px) 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 17px;
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 24px;
    box-shadow: ${C.shadow};
    animation: owjFadeIn .28s ease both;
  }
  .owj-page-state__icon {
    width: 68px;
    height: 68px;
    display: grid;
    place-items: center;
    border-radius: 20px;
    background: ${C.primaryBg};
    color: ${C.primary};
    border: 1px solid ${C.primaryBg2};
  }
  .owj-page-state__icon--error {
    color: ${C.red};
    background: ${C.redBg};
    border-color: ${C.redBg2};
  }
  .owj-page-state h1 {
    margin: 0;
    font-weight: 800;
    font-size: clamp(19px, 4vw, 23px);
    line-height: 1.7;
  }
  .owj-page-state p {
    margin: 0;
    color: ${C.textSec};
    font-size: 13px;
    line-height: 1.95;
    max-width: 390px;
    overflow-wrap: anywhere;
  }
  .owj-page-state__dots { display: flex; align-items: center; gap: 7px; min-height: 14px; }
  .owj-page-state__dots span {
    display: block;
    width: 8px;
    height: 8px;
    background: ${C.primary};
    border-radius: 50%;
    animation: owjDot 1.3s ease-in-out infinite;
  }
  .owj-page-state__dots span:nth-child(2) {
    background: ${C.secondary};
    animation-delay: .16s;
  }
  .owj-page-state__dots span:nth-child(3) { animation-delay: .32s; }
  .owj-page-error__message {
    padding: 12px 16px;
    border: 1px solid ${C.border};
    border-radius: 12px;
    background: ${C.raised};
  }
  .owj-page-error__back {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 48px;
    padding: 12px 22px;
    margin-top: 5px;
    background: ${C.primary};
    color: #fff;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 700;
    font-size: 13px;
    transition: background .2s ease;
  }
  .owj-page-error__back:hover { background: #552676; }

  @keyframes owjPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: .5; transform: scale(1.15); }
  }
  @keyframes owjFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  @keyframes owjDot {
    0%, 80%, 100% { transform: scale(.6); opacity: .3; }
    40% { transform: scale(1); opacity: 1; }
  }
  @keyframes owjSlideUp {
    from { opacity: 0; transform: translateY(9px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes owjFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes owjSpin { to { transform: rotate(360deg); } }

  @media (max-width: 970px) {
    .owj-app-header__inner { flex-wrap: wrap; row-gap: 10px; padding: 11px 20px 9px; }
    .owj-app-header__nav { order: 3; flex-basis: 100%; gap: 6px; padding: 0 0 3px; }
  }
  @media (max-width: 600px) {
    .owj-app-header__inner { padding: 10px 15px 8px; row-gap: 7px; }
    .owj-app-header__logo { width: 40px; height: 40px; border-radius: 12px; }
    .owj-app-header__brand-copy strong { font-size: 16px; }
    .owj-app-header__brand-copy small { font-size: 10px; }
    .owj-app-header__link { min-height: 41px; padding: 9px 12px; font-size: 12px; border-radius: 10px; }
    .owj-app-footer { padding: 18px 16px 28px; font-size: 11px; }
    .owj-page-state { padding: 14px; }
    .owj-page-state__card { border-radius: 19px; padding: 32px 18px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .owj-page-state__card, .owj-page-state__dots span { animation: none; }
    .owj-app-header__link { transition: none; }
  }
`,ee=!1;function T(){if(ee||typeof document>`u`)return;ee=!0;let e=document.createElement(`style`);e.textContent=w,document.head.appendChild(e)}function E({name:e,size:t=20}){let n={activity:(0,p.jsx)(`path`,{d:`M3 12h4l2.3-7 4.4 14 2.3-7h5`}),alert:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M12 3 2.7 19h18.6L12 3Z`}),(0,p.jsx)(`path`,{d:`M12 9v4`}),(0,p.jsx)(`path`,{d:`M12 16.5h.01`})]}),arrow:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M5 12h14`}),(0,p.jsx)(`path`,{d:`m13 6 6 6-6 6`})]}),back:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M19 12H5`}),(0,p.jsx)(`path`,{d:`m11 18-6-6 6-6`})]}),check:(0,p.jsx)(`path`,{d:`m5 12 4 4L19 6`}),close:(0,p.jsx)(`path`,{d:`M6 6l12 12M18 6 6 18`}),expand:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(`path`,{d:`M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7`})}),database:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`ellipse`,{cx:`12`,cy:`5`,rx:`8`,ry:`3`}),(0,p.jsx)(`path`,{d:`M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5`}),(0,p.jsx)(`path`,{d:`M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7`})]}),external:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M14 5h5v5`}),(0,p.jsx)(`path`,{d:`m10 14 9-9`}),(0,p.jsx)(`path`,{d:`M19 14v5H5V5h5`})]}),location:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z`}),(0,p.jsx)(`circle`,{cx:`12`,cy:`10`,r:`2.5`})]}),trend:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`m3 17 6-6 4 4 8-9`}),(0,p.jsx)(`path`,{d:`M15 6h6v6`})]}),building:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M3 21h18`}),(0,p.jsx)(`path`,{d:`M5 21V7l8-4v18`}),(0,p.jsx)(`path`,{d:`M19 21V11l-6-4`}),(0,p.jsx)(`path`,{d:`M9 9v.01M9 12v.01M9 15v.01M9 18v.01`})]}),refresh:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M20 7v5h-5`}),(0,p.jsx)(`path`,{d:`M4 17v-5h5`}),(0,p.jsx)(`path`,{d:`M6.1 8a7 7 0 0 1 11.7-2L20 8`}),(0,p.jsx)(`path`,{d:`m4 16 2.2 2a7 7 0 0 0 11.7-2`})]})};return(0,p.jsx)(`svg`,{width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,style:{flexShrink:0},children:(0,p.jsx)(`g`,{stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,children:n[e]||n.activity})})}var D=[{key:`listings`,label:`آگهی‌ها`,href:`/catalog`},{key:`matching`,label:`تطبیق تقاضا`,href:`/buyer-matching`},{key:`overview`,label:`نمای کلی`,href:`/`},{key:`locations`,label:`کاوش مناطق`,href:`/explore/tehran`},{key:`analytics`,label:`تحلیل امتیاز`,href:`/score-analytics`},{key:`workshop`,label:`کارگاه امتیاز`,href:`/score-workshop`},{key:`quality`,label:`کیفیت داده`,href:`/data-quality`}];function te({active:e,className:t=``}){(0,f.useEffect)(()=>{T()},[]);let n=typeof window>`u`?`/`:window.location.pathname,r=e??(n===`/catalog`||n.startsWith(`/listing/`)?`listings`:n===`/buyer-matching`?`matching`:n.startsWith(`/explore`)?`locations`:D.find(e=>e.href===n)?.key),i=e=>(0,p.jsx)(`a`,{className:`owj-app-header__link${e.key===`listings`?` owj-app-header__link--listings`:``}`,href:e.href,"aria-current":r===e.key?`page`:void 0,children:e.label},e.key);return(0,p.jsxs)(`nav`,{className:`owj-app-header__nav ${t}`.trim(),"aria-label":`ناوبری اصلی`,children:[i(D[0]),(0,p.jsx)(`div`,{className:`owj-app-header__nav-scroll`,children:D.slice(1).map(i)})]})}function ne({active:e}){return(0,p.jsx)(`header`,{className:`owj-app-header`,children:(0,p.jsxs)(`div`,{className:`owj-app-header__inner`,children:[(0,p.jsxs)(`a`,{className:`owj-app-header__brand`,href:`/`,children:[(0,p.jsx)(`span`,{className:`owj-app-header__logo`,children:(0,p.jsx)(E,{name:`building`,size:23})}),(0,p.jsxs)(`span`,{className:`owj-app-header__brand-copy`,children:[(0,p.jsx)(`strong`,{children:`املاک اوج`}),(0,p.jsx)(`small`,{children:`رصدخانه بازار مسکن`})]})]}),(0,p.jsx)(te,{active:e})]})})}function re(){return(0,p.jsxs)(`footer`,{className:`owj-app-footer`,children:[(0,p.jsxs)(`span`,{children:[(0,p.jsx)(`strong`,{children:`املاک اوج`}),` · تحلیل بازار مسکن · فقط داده‌های عمومی`]}),(0,p.jsx)(`span`,{children:`امتیازها ابزارهای تصمیم‌گیری آزمایشی هستند، نه توصیه سرمایه‌گذاری.`})]})}function ie({message:e=`در حال خواندن شواهد امتیازدهی`}){return(0,f.useEffect)(()=>{T()},[]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(ne,{}),(0,p.jsx)(`main`,{className:`owj-page-state`,role:`status`,"aria-live":`polite`,children:(0,p.jsxs)(`section`,{className:`owj-page-state__card`,children:[(0,p.jsx)(`div`,{className:`owj-page-state__icon`,children:(0,p.jsx)(E,{name:`building`,size:33})}),(0,p.jsx)(`div`,{className:`owj-page-state__dots`,"aria-hidden":`true`,children:[0,1,2].map(e=>(0,p.jsx)(`span`,{},e))}),(0,p.jsx)(`h1`,{children:e}),(0,p.jsx)(`p`,{children:`در حال بارگذاری JSON امتیازدهی تولیدشده از سرور.`})]})})]})}function ae({message:e}){return(0,f.useEffect)(()=>{T()},[]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(ne,{}),(0,p.jsx)(`main`,{className:`owj-page-state`,children:(0,p.jsxs)(`section`,{className:`owj-page-state__card`,children:[(0,p.jsx)(`span`,{className:`owj-page-state__icon owj-page-state__icon--error`,children:(0,p.jsx)(E,{name:`alert`,size:30})}),(0,p.jsx)(`h1`,{children:`این صفحه بارگذاری نشد`}),(0,p.jsx)(`p`,{className:`owj-page-error__message`,role:`alert`,children:e}),(0,p.jsxs)(`a`,{className:`owj-page-error__back`,href:`/`,children:[(0,p.jsx)(E,{name:`back`,size:18}),`بازگشت به نمای کلی`]})]})})]})}function oe(e,t,n=`fa`){return e==null&&t==null?0:e==null?1:t==null?-1:Number.isFinite(e)&&Number.isFinite(t)?e-t:String(e).localeCompare(String(t),n,{numeric:!0,sensitivity:`base`})}function se(e,{searchText:t=e=>JSON.stringify(e),columns:n={},initialSort:r={key:Object.keys(n)[0]||``,direction:`asc`}}={}){let[i,a]=(0,f.useState)(``),[o,s]=(0,f.useState)(r),c=(0,f.useDeferredValue)(i);return{query:i,setQuery:a,sort:o,changeSort:e=>s(t=>({key:e,direction:t.key===e&&t.direction===`asc`?`desc`:`asc`})),rows:(0,f.useMemo)(()=>{let r=c.trim().toLocaleLowerCase(`fa`),i=n[o.key]||(e=>e?.[o.key]);return[...e].filter(e=>!r||String(t(e)??``).toLocaleLowerCase(`fa`).includes(r)).sort((e,t)=>oe(i(e),i(t))*(o.direction===`desc`?-1:1))},[e,c,t,n,o])}}var O=`
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
`;function k(){return(0,p.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,p.jsx)(`circle`,{cx:`10.7`,cy:`10.7`,r:`6.8`,stroke:`currentColor`,strokeWidth:`1.9`}),(0,p.jsx)(`path`,{d:`m16 16 4.5 4.5`,stroke:`currentColor`,strokeWidth:`1.9`,strokeLinecap:`round`})]})}function ce({query:e,setQuery:t,count:n,placeholder:r=`جستجو در جدول…`,children:i}){return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`style`,{children:O}),(0,p.jsxs)(`div`,{className:`data-table-tools owj-table-tools`,role:`search`,children:[(0,p.jsxs)(`div`,{className:`data-table-search owj-table-search`,children:[(0,p.jsx)(`span`,{className:`owj-table-tools__sr-only`,children:r}),(0,p.jsx)(k,{}),(0,p.jsx)(`input`,{type:`search`,value:e,onChange:e=>t(e.target.value),placeholder:r,autoComplete:`off`,"aria-label":r}),!!e&&(0,p.jsx)(`button`,{className:`owj-table-search__clear`,type:`button`,onClick:()=>t(``),"aria-label":`پاک کردن جستجو`,title:`پاک کردن جستجو`,children:`×`})]}),i,(0,p.jsxs)(`output`,{className:`owj-table-tools__count`,"aria-live":`polite`,children:[v(n),` نتیجه`]})]})]})}function le({column:e,sort:t,onSort:n,children:r,style:i,title:a}){let o=t.key===e;return(0,p.jsx)(`th`,{style:{verticalAlign:`middle`,...i},"aria-sort":o?t.direction===`asc`?`ascending`:`descending`:`none`,children:(0,p.jsxs)(`button`,{type:`button`,className:`sortable-table-heading`,onClick:()=>n(e),title:a,style:{display:`inline-flex`,alignItems:`center`,justifyContent:`flex-start`,gap:8,maxWidth:`100%`,minHeight:36,padding:`5px 0`,background:`transparent`,border:0,color:o?C.primary:C.textSec,fontFamily:`inherit`,fontSize:12,fontWeight:o?800:650,textAlign:`right`,lineHeight:1.5,cursor:`pointer`,whiteSpace:`nowrap`},children:[(0,p.jsx)(`span`,{children:r}),(0,p.jsx)(`i`,{"aria-hidden":`true`,style:{display:`inline-grid`,placeItems:`center`,flexShrink:0,width:21,height:21,borderRadius:6,fontSize:12,lineHeight:1,fontStyle:`normal`,fontWeight:900,color:o?C.primary:C.textMuted,background:o?C.primaryBg:`#f1f2f5`},children:o?t.direction===`asc`?`↑`:`↓`:`↕`})]})})}C.text;var ue=new Intl.NumberFormat(`fa-IR`),de=new Intl.NumberFormat(`fa-IR`,{maximumFractionDigits:1}),A=new Intl.DateTimeFormat(`fa-IR`,{dateStyle:`medium`,timeStyle:`short`,timeZone:`Asia/Tehran`});function j(e){return Number.isFinite(e)?ue.format(e):`—`}function M(e){return Number.isFinite(e)?`${de.format(e)}٪`:`—`}function fe(e){return Number.isFinite(e)?`${e>0?`+`:``}${de.format(e)}٪`:`—`}function pe(e){if(!e)return`—`;let t=new Date(e);return Number.isNaN(t.valueOf())?`—`:A.format(t)}function me(e){if(!Number.isFinite(e))return`—`;let t=Math.floor(e/6e4),n=Math.floor(t/60),r=t%60;return n?`${j(n)} ساعت و ${j(r)} دقیقه`:`${j(t)} دقیقه`}function he(e){return Number.isFinite(e)?e>=1e9?`${de.format(e/1e9)} میلیارد تومان`:e>=1e6?`${de.format(e/1e6)} میلیون تومان`:`${j(e)} تومان`:`—`}function ge(e){return String(e??``).replace(/[0-9]/g,e=>`۰۱۲۳۴۵۶۷۸۹`[Number(e)])}function _e(e){return Math.max(0,Math.min(100,Number(e)||0))}var N={primary:`#66308d`,primaryLight:`#74479a`,primaryPale:`#926eae`,primaryGlow:`rgba(102,48,141,0.12)`,primaryBg:`#f4eef8`,primaryBg2:`#e9daef`,secondary:`#01ae9b`,secondaryLight:`#27c1ad`,secondaryDark:`#087a6e`,secondaryGlow:`rgba(1,174,155,0.10)`,secondaryBg:`#e8f8f5`,secondaryBg2:`#d2f0e9`,bg:`#f7f8fa`,bgGradient:`linear-gradient(180deg, #ffffff 0%, #f7f8fa 38%, #f7f8fa 100%)`,surface:`#ffffff`,surfaceLight:`#fbfbfc`,surfaceHover:`#f8f7fa`,surfaceGlass:`rgba(255,255,255,0.96)`,raised:`#f5f6f8`,border:`#edeef1`,borderMed:`#e7e8ec`,borderLight:`#dcdfe5`,text:`#202127`,textSec:`#60646e`,textMuted:`#6b707b`,white:`#17191f`,green:`#14785f`,greenBg:`#eaf7f0`,orange:`#a9661b`,orangeBg:`#fff5e8`,red:`#b6404b`,redBg:`#fff0f1`,radius:18,radiusSm:13,radiusXs:10,shadow:`0 4px 22px rgba(24,31,41,0.035), 0 1px 3px rgba(24,31,41,0.025)`,shadowLg:`0 12px 34px rgba(24,31,41,0.07)`,glowPrimary:`0 0 0 0 transparent`,glowSecondary:`0 0 0 0 transparent`},ve=`
  @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap');
  .owj-dashboard,
  .owj-dashboard *,
  .owj-dashboard *::before,
  .owj-dashboard *::after { box-sizing: border-box; }
  .owj-dashboard { width:100%; min-width:0; overflow-x:clip; -webkit-font-smoothing:antialiased; }
  .owj-dashboard button, .owj-dashboard input, .owj-dashboard select { font:inherit; }
  .owj-dashboard button, .owj-dashboard a, .owj-dashboard select { -webkit-tap-highlight-color:transparent; }
  .owj-dashboard button:focus-visible, .owj-dashboard a:focus-visible,
  .owj-dashboard input:focus-visible, .owj-dashboard select:focus-visible,
  .owj-dashboard summary:focus-visible { outline:3px solid rgba(102,48,141,.32); outline-offset:3px; }
  .owj-dashboard input::placeholder { color:#8a8e98; opacity:1; }
  .owj-dashboard input[type="checkbox"] { accent-color:#66308d; }
  .owj-dashboard .owj-search-field:focus-within { border-color:#a785c2 !important; box-shadow:0 0 0 3px rgba(102,48,141,.09); }
  .owj-dashboard .owj-search-input { min-width:0; font-size:14px !important; }
  .owj-dashboard .owj-kpi-card, .owj-dashboard .owj-attention-card { min-width:0; }
  .owj-dashboard .owj-panel { min-width:0; }
  .owj-dashboard .owj-controls { min-width:0; }
  .owj-dashboard .owj-table-wrap { max-width:100%; scrollbar-width:thin; scrollbar-color:#dbdce3 transparent; }
  .owj-dashboard .owj-table-wrap::-webkit-scrollbar { height:6px; }
  .owj-dashboard .owj-table-wrap::-webkit-scrollbar-thumb { background:#dfe1e8; border-radius:50px; }
  .owj-dashboard .owj-nav { overflow:visible; }
  .owj-dashboard .owj-nav a:hover { color:#66308d !important; background:#f4eef8 !important; }
  .owj-dashboard .owj-icon-button:hover { color:#66308d !important; background:#f4eef8 !important; border-color:#e9daef !important; }
  .owj-dashboard .owj-link:hover { color:#66308d !important; }
  .owj-dashboard .owj-action-button:hover:not(:disabled) { background:#f5eff8 !important; color:#66308d !important; border-color:#e9daef !important; }
  .owj-dashboard .owj-action-button:disabled { opacity:.55; cursor:not-allowed; }
  .owj-dashboard .owj-mobile-sort { display:none; }
  .owj-dashboard .owj-mobile-recommendations { display:none; }
  .owj-dashboard .owj-hero-updated { display:none; }
  .owj-dashboard .owj-mobile-empty { display:flex; align-items:center; justify-content:center; }
  .owj-dashboard .owj-event-message { overflow-wrap:anywhere; }
  .owj-dashboard .owj-raw-json summary::marker { content:""; }
  .owj-dashboard .owj-raw-json summary::-webkit-details-marker { display:none; }
  .owj-dashboard .owj-raw-json summary:hover { background:#faf9fb; }
  .owj-dashboard .owj-raw-json[open] summary { border-bottom:1px solid #edeef1; }
  @keyframes owjPulse { 0%,100% {opacity:1;} 50% {opacity:.5;} }
  @keyframes owjDot { 0%,80%,100% {transform:scale(.6);opacity:.3;} 40% {transform:scale(1);opacity:1;} }
  @keyframes owjSlideUp { from {opacity:0;transform:translateY(8px);} to {opacity:1;transform:translateY(0);} }
  @keyframes owjFadeIn { from {opacity:0;} to {opacity:1;} }

  @media (max-width:1200px) {
    .owj-dashboard .owj-topbar { gap:12px !important; padding:12px 22px !important; height:auto !important; min-height:70px; flex-wrap:wrap; }
    .owj-dashboard .owj-nav { margin-right:0 !important; }
    .owj-dashboard .owj-nav a { padding:9px 12px !important; }
    .owj-dashboard .owj-main { padding-inline:22px !important; }
    .owj-dashboard .owj-kpi-grid, .owj-dashboard .owj-attention-grid { grid-template-columns:repeat(2,minmax(0,1fr)) !important; }
  }
  @media (max-width:900px) {
    .owj-dashboard .owj-topbar {
      display:grid !important; grid-template-columns:minmax(0,1fr) auto;
      grid-template-areas:"brand meta" "nav nav"; align-items:center; column-gap:12px !important;
      row-gap:8px !important; padding:12px 20px 10px !important;
    }
    .owj-dashboard .owj-brand { grid-area:brand; min-width:0; }
    .owj-dashboard .owj-nav { grid-area:nav; display:flex; flex:none !important; min-width:0; width:100%; overflow:visible; gap:5px !important; padding:3px 0 6px; white-space:nowrap; }
    .owj-dashboard .owj-nav a { flex:none; padding:9px 14px !important; }
    .owj-dashboard .owj-header-meta { grid-area:meta; gap:8px !important; }
    .owj-dashboard .owj-meta-date { display:none !important; }
    .owj-dashboard .owj-hero-updated { display:inline-flex; align-items:center; gap:7px; margin-top:13px; padding:9px 12px; border-radius:12px; background:#f0f1f4; color:#60646e; font-size:12px; }
    .owj-dashboard .owj-hero { grid-template-columns:minmax(0,1fr) !important; gap:20px !important; padding:32px 0 24px !important; }
    .owj-dashboard .owj-run-card { width:100%; padding:22px !important; }
    .owj-dashboard .owj-detail-grid { grid-template-columns:minmax(0,1fr) !important; gap:18px !important; }
    .owj-dashboard .owj-kpi-grid { gap:12px !important; margin-bottom:26px !important; }
    .owj-dashboard .owj-attention-grid { gap:12px !important; }
  }
  @media (max-width:640px) {
    .owj-dashboard { font-size:13px !important; line-height:1.65 !important; }
    .owj-dashboard .owj-topbar { padding:12px 16px 9px !important; }
    .owj-dashboard .owj-brand-icon { width:38px !important; height:38px !important; border-radius:12px !important; }
    .owj-dashboard .owj-brand-subtitle { display:none !important; }
    .owj-dashboard .owj-topbar-status { padding:6px 9px !important; font-size:11px !important; }
    .owj-dashboard .owj-icon-button { width:44px !important; height:44px !important; }
    .owj-dashboard .owj-nav { gap:6px !important; }
    .owj-dashboard .owj-nav a { font-size:12px !important; padding:9px 11px !important; min-height:40px; display:inline-flex; align-items:center; }
    .owj-dashboard .owj-main { padding:0 14px 46px !important; }
    .owj-dashboard .owj-hero { padding:26px 0 22px !important; gap:18px !important; }
    .owj-dashboard .owj-hero-copy h1 { font-size:clamp(24px,6.2vw,32px) !important; line-height:1.48 !important; }
    .owj-dashboard .owj-hero-copy p { font-size:13px !important; line-height:1.9 !important; }
    .owj-dashboard .owj-run-card { padding:19px !important; gap:14px !important; }
    .owj-dashboard .owj-run-count { font-size:38px !important; }
    .owj-dashboard .owj-kpi-grid { grid-template-columns:repeat(2,minmax(0,1fr)) !important; gap:9px !important; }
    .owj-dashboard .owj-kpi-card { padding:16px 14px !important; gap:9px !important; border-top-width:1px !important; }
    .owj-dashboard .owj-kpi-card > div:first-child > span:first-child { font-size:12px !important; }
    .owj-dashboard .owj-kpi-card-value { font-size:clamp(21px,5vw,28px) !important; letter-spacing:0 !important; line-height:1.25 !important; overflow-wrap:anywhere; }
    .owj-dashboard .owj-kpi-card-detail { flex-wrap:wrap !important; line-height:1.6; }
    .owj-dashboard .owj-kpi-card-icon { width:34px !important; height:34px !important; }
    .owj-dashboard .owj-attention-grid { grid-template-columns:minmax(0,1fr) !important; gap:10px !important; }
    .owj-dashboard .owj-attention-card { padding:17px !important; gap:12px !important; }
    .owj-dashboard .owj-attention-card-value { font-size:23px !important; }
    .owj-dashboard .owj-panel { padding:18px 15px !important; margin-bottom:16px !important; }
    .owj-dashboard .owj-section-heading { gap:10px !important; margin-bottom:18px !important; }
    .owj-dashboard .owj-section-heading > div:first-child { min-width:0 !important; flex-basis:100%; }
    .owj-dashboard .owj-section-heading h2 { font-size:18px !important; }
    .owj-dashboard .owj-section-heading > div:first-child > span:first-child { font-size:12px !important; }
    .owj-dashboard .owj-section-heading p { font-size:12px !important; line-height:1.85 !important; }
    .owj-dashboard .owj-heading-aside { align-items:flex-start !important; }
    .owj-dashboard .owj-heading-aside strong { font-size:24px !important; }
    .owj-dashboard .owj-location-body { justify-content:center !important; gap:20px !important; }
    .owj-dashboard .owj-controls { flex-direction:column !important; align-items:stretch !important; gap:12px !important; }
    .owj-dashboard .owj-search-field { width:100% !important; min-width:0 !important; flex:none !important; min-height:48px; padding:10px 13px !important; }
    .owj-dashboard .owj-search-input { font-size:16px !important; }
    .owj-dashboard .owj-controls-result { align-self:flex-start; }
    .owj-dashboard .owj-mobile-sort { display:flex; align-items:center; gap:10px; margin:12px 0 18px; flex-wrap:wrap; font-size:12px; color:#60646e; }
    .owj-dashboard .owj-mobile-sort label { flex:1; min-width:170px; display:flex; align-items:center; gap:9px; }
    .owj-dashboard .owj-mobile-sort select { flex:1; min-width:0; border:1px solid #e2e3e9; border-radius:12px; background:#fff; color:#202127; min-height:44px; padding:8px 12px; outline:none; cursor:pointer; }
    .owj-dashboard .owj-mobile-sort button { border:1px solid #e2e3e9; border-radius:12px; background:#fff; color:#66308d; padding:8px 13px; min-height:44px; cursor:pointer; white-space:nowrap; }
    /* The areas table becomes semantic, easy-to-scan cards on narrow screens. */
    .owj-dashboard .owj-area-table-wrap { border:0 !important; overflow:visible !important; }
    .owj-dashboard .owj-area-table, .owj-dashboard .owj-area-table tbody { display:block; width:100%; }
    .owj-dashboard .owj-area-table thead { display:none; }
    .owj-dashboard .owj-area-table tbody { display:grid; gap:10px; }
    .owj-dashboard .owj-area-table tr { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); padding:14px; gap:12px 14px; border:1px solid #e9eaf0; border-radius:14px; background:white; }
    .owj-dashboard .owj-area-table td { display:flex; flex-direction:column; gap:4px; padding:0 !important; border:0 !important; white-space:normal !important; min-width:0; font-size:13px; }
    .owj-dashboard .owj-area-table td:first-child { grid-column:1/-1; padding-bottom:9px !important; border-bottom:1px solid #f0f0f3 !important; }
    .owj-dashboard .owj-area-table td:not(:first-child)::before { content:attr(data-label); color:#6b707b; font-size:11px; font-weight:500; }
    .owj-dashboard .owj-area-table td:last-child { align-items:flex-start; }
    .owj-dashboard .owj-area-table td:first-child strong { font-size:14px !important; }
    /* Desktop matrix becomes collapsible, finger-friendly listing cards. */
    .owj-dashboard .owj-reco-desktop-table { display:none !important; }
    .owj-dashboard .owj-mobile-recommendations { display:grid; gap:10px; margin-bottom:10px; }
    .owj-dashboard .owj-mobile-recommendations details { background:#fff; border:1px solid #e8e9ed; border-radius:15px; overflow:hidden; }
    .owj-dashboard .owj-mobile-recommendations details[open] { border-color:#d8c8e4; box-shadow:0 3px 15px rgba(102,48,141,.05); }
    .owj-dashboard .owj-mobile-recommendations summary { list-style:none; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:15px 13px; cursor:pointer; }
    .owj-dashboard .owj-mobile-recommendations summary::-webkit-details-marker { display:none; }
    .owj-dashboard .owj-mobile-recommendations summary > span { display:flex; flex-direction:column; gap:4px; flex:1; min-width:0; }
    .owj-dashboard .owj-mobile-recommendations summary strong { font-size:13px; color:#202127; line-height:1.65; }
    .owj-dashboard .owj-mobile-recommendations summary small { font-size:11px; color:#6b707b; overflow-wrap:anywhere; }
    .owj-dashboard .owj-mobile-score { flex:none; min-width:59px; padding:9px 7px; border-radius:12px; background:#f4eef8; text-align:center; color:#66308d; font-weight:800; font-size:18px; line-height:1.3; }
    .owj-dashboard .owj-mobile-score span { display:block; font-size:10px; color:#69616f; font-weight:500; margin-top:2px; }
    .owj-dashboard .owj-mobile-factor-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; padding:14px 12px; background:#fcfcfd; border-top:1px solid #edeef1; }
    .owj-dashboard .owj-mobile-factor { display:flex; flex-direction:column; gap:8px; min-width:0; padding:11px; background:#fff; border:1px solid #ededf0; border-radius:12px; }
    .owj-dashboard .owj-mobile-factor > span:first-child { font-size:11px; color:#60646e; }
    .owj-dashboard .owj-mobile-evidence { grid-column:1/-1; display:flex; gap:8px; font-size:12px; color:#60646e; align-items:center; padding:8px 2px; flex-wrap:wrap; }
    .owj-dashboard .owj-view-listing { grid-column:1/-1; display:flex; justify-content:center; align-items:center; background:#66308d; color:#fff; text-decoration:none; padding:12px; border-radius:12px; font-size:13px; font-weight:700; min-height:46px; }
    .owj-dashboard .owj-view-listing:hover { background:#552676; }
    .owj-dashboard .owj-event-row { flex-wrap:wrap !important; align-items:center !important; padding:12px 8px !important; gap:7px 9px !important; border-bottom:1px solid #f0f0f3; }
    .owj-dashboard .owj-event-message { display:block; flex-basis:100% !important; white-space:normal !important; overflow:visible !important; font-size:12px !important; padding-right:17px; }
    .owj-dashboard .owj-event-time { order:2; margin-right:auto; font-family:inherit !important; }
    .owj-dashboard .owj-event-name { order:1; }
    .owj-dashboard .owj-event-message { order:3; }
    .owj-dashboard .owj-raw-json summary { padding:15px !important; gap:10px; flex-wrap:wrap; }
    .owj-dashboard .owj-raw-json pre { padding:15px !important; }
    .owj-dashboard .owj-footer { padding:18px 16px 28px !important; }
    .owj-dashboard .owj-state-title { font-size:20px !important; }
  }
  @media (max-width:359px) {
    .owj-dashboard .owj-kpi-grid { grid-template-columns:minmax(0,1fr) !important; }
    .owj-dashboard .owj-topbar-status { font-size:10px !important; }
    .owj-dashboard .owj-mobile-factor-grid { grid-template-columns:1fr; }
  }
  @media (prefers-reduced-motion:reduce) {
    .owj-dashboard *, .owj-dashboard *::before, .owj-dashboard *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; scroll-behavior:auto !important; }
  }
`;function ye(){return(0,p.jsx)(`style`,{children:ve})}function P({name:e,size:t=20}){let n={activity:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(`path`,{d:`M3 12h4l2.3-7 4.4 14 2.3-7h5`})}),alert:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M12 3 2.7 19h18.6L12 3Z`}),(0,p.jsx)(`path`,{d:`M12 9v4`}),(0,p.jsx)(`path`,{d:`M12 16.5h.01`})]}),area:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M4 5h16v14H4z`}),(0,p.jsx)(`path`,{d:`m4 14 4-4 4 3 4-5 4 4`})]}),check:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(`path`,{d:`m5 12 4 4L19 6`})}),chevron:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(`path`,{d:`m9 18 6-6-6-6`})}),database:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`ellipse`,{cx:`12`,cy:`5`,rx:`8`,ry:`3`}),(0,p.jsx)(`path`,{d:`M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5`}),(0,p.jsx)(`path`,{d:`M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7`})]}),location:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z`}),(0,p.jsx)(`circle`,{cx:`12`,cy:`10`,r:`2.5`})]}),refresh:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M20 7v5h-5`}),(0,p.jsx)(`path`,{d:`M4 17v-5h5`}),(0,p.jsx)(`path`,{d:`M6.1 8a7 7 0 0 1 11.7-2L20 8`}),(0,p.jsx)(`path`,{d:`m4 16 2.2 2a7 7 0 0 0 11.7-2`})]}),search:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`circle`,{cx:`11`,cy:`11`,r:`7`}),(0,p.jsx)(`path`,{d:`m20 20-4-4`})]}),spark:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z`}),(0,p.jsx)(`path`,{d:`m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z`})]}),trend:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`m3 17 6-6 4 4 8-9`}),(0,p.jsx)(`path`,{d:`M15 6h6v6`})]}),building:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`path`,{d:`M3 21h18`}),(0,p.jsx)(`path`,{d:`M5 21V7l8-4v18`}),(0,p.jsx)(`path`,{d:`M19 21V11l-6-4`}),(0,p.jsx)(`path`,{d:`M9 9v.01M9 12v.01M9 15v.01M9 18v.01`})]})};return(0,p.jsx)(`svg`,{width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,p.jsx)(`g`,{stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,children:n[e]||n.activity})})}function be({value:e,tone:t=`cyan`,label:n}){let r={cyan:`linear-gradient(90deg, ${N.secondaryDark}, ${N.secondary}, ${N.secondaryLight})`,green:`linear-gradient(90deg, #059669, ${N.green})`,orange:`linear-gradient(90deg, #ea580c, ${N.orange})`,violet:`linear-gradient(90deg, ${N.primary}, ${N.primaryPale})`};return(0,p.jsx)(`div`,{style:{height:4,background:N.border,borderRadius:99,overflow:`hidden`,width:`100%`},"aria-label":n,children:(0,p.jsx)(`span`,{style:{display:`block`,height:`100%`,width:`${_e(e)}%`,borderRadius:99,background:r[t]||r.cyan,transition:`width .7s cubic-bezier(.22,1,.36,1)`,boxShadow:t===`cyan`?N.glowSecondary:t===`violet`?N.glowPrimary:`none`}})})}function xe({eyebrow:e,value:t,detail:n,progress:r,tone:i,icon:a}){let o={cyan:{c:N.secondary,bg:N.secondaryBg,glow:N.glowSecondary},green:{c:N.green,bg:N.greenBg,glow:`none`},orange:{c:N.orange,bg:N.orangeBg,glow:`none`},violet:{c:N.primary,bg:N.primaryBg,glow:N.glowPrimary}},s=o[i]||o.cyan;return(0,p.jsxs)(`article`,{className:`owj-kpi-card`,style:{background:N.surface,border:`1px solid ${N.border}`,borderTop:`2px solid ${s.c}`,borderRadius:N.radius,padding:`22px 22px 19px`,display:`flex`,flexDirection:`column`,gap:10,transition:`transform .2s, box-shadow .2s`,cursor:`default`,boxShadow:N.shadow,animation:`owjSlideUp .5s ease both`},onMouseEnter:e=>{e.currentTarget.style.transform=`translateY(-3px)`,e.currentTarget.style.boxShadow=N.shadowLg},onMouseLeave:e=>{e.currentTarget.style.transform=`translateY(0)`,e.currentTarget.style.boxShadow=N.shadow},children:[(0,p.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`},children:[(0,p.jsx)(`span`,{style:{fontSize:11,fontWeight:700,color:N.textMuted,letterSpacing:.5},children:e}),(0,p.jsx)(`span`,{className:`owj-kpi-card-icon`,style:{width:38,height:38,borderRadius:N.radiusSm,background:s.bg,color:s.c,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0},children:(0,p.jsx)(P,{name:a})})]}),(0,p.jsx)(`strong`,{className:`owj-kpi-card-value`,style:{fontSize:30,fontWeight:900,color:N.white,lineHeight:1.1,letterSpacing:-1},children:t}),(0,p.jsxs)(`div`,{className:`owj-kpi-card-detail`,style:{display:`flex`,justifyContent:`space-between`,fontSize:12,color:N.textSec,gap:6},children:[(0,p.jsx)(`span`,{children:n}),Number.isFinite(r)&&(0,p.jsx)(`span`,{style:{fontWeight:600},children:M(r)})]}),Number.isFinite(r)&&(0,p.jsx)(be,{value:r,tone:i,label:`${e}: ${r}%`})]})}function Se({kicker:e,title:t,description:n,aside:r}){return(0,p.jsxs)(`div`,{className:`owj-section-heading`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,marginBottom:22,gap:16,flexWrap:`wrap`},children:[(0,p.jsxs)(`div`,{style:{flex:1,minWidth:260},children:[(0,p.jsx)(`span`,{style:{fontSize:11,fontWeight:800,color:N.secondaryDark,letterSpacing:1.2,marginBottom:6,display:`block`},children:e}),(0,p.jsx)(`h2`,{style:{fontSize:20,fontWeight:800,color:N.white,margin:`0 0 6px`,lineHeight:1.35},children:t}),n&&(0,p.jsx)(`p`,{style:{fontSize:13,color:N.textSec,margin:0,lineHeight:1.65,maxWidth:580},children:n})]}),r]})}function Ce({tone:e,icon:t,title:n,value:r,text:i}){let a={good:{c:N.green,bg:N.greenBg,border:N.green},warn:{c:N.orange,bg:N.orangeBg,border:N.orange},bad:{c:N.red,bg:N.redBg,border:N.red}},o=a[e]||a.good;return(0,p.jsxs)(`article`,{className:`owj-attention-card`,style:{background:N.surface,border:`1px solid ${N.border}`,borderRight:`4px solid ${o.border}`,borderRadius:N.radius,padding:`18px 20px`,display:`flex`,gap:14,alignItems:`flex-start`,boxShadow:N.shadow,transition:`transform .2s`,animation:`owjSlideUp .5s ease both`},onMouseEnter:e=>{e.currentTarget.style.transform=`translateY(-2px)`},onMouseLeave:e=>{e.currentTarget.style.transform=`translateY(0)`},children:[(0,p.jsx)(`span`,{style:{width:42,height:42,borderRadius:N.radiusSm,background:o.bg,color:o.c,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0},children:(0,p.jsx)(P,{name:t})}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{className:`owj-attention-card-value`,style:{fontSize:26,fontWeight:900,color:N.white,lineHeight:1,display:`block`},children:r}),(0,p.jsx)(`h3`,{style:{fontSize:13,fontWeight:700,color:N.text,margin:`6px 0 4px`},children:n}),(0,p.jsx)(`p`,{style:{fontSize:12,color:N.textMuted,margin:0,lineHeight:1.55},children:i})]})]})}function we({data:e}){let t=e.available||0,n=t?e.exact/t*100:0,r=t?e.approximate/t*100:0;return(0,p.jsxs)(`article`,{className:`owj-panel`,style:{background:N.surface,border:`1px solid ${N.border}`,borderRadius:N.radius,padding:28,boxShadow:N.shadow},children:[(0,p.jsx)(Se,{kicker:`سیگنال موقعیت`,title:`اطمینان مختصات`,description:`پین‌های دقیق بالاترین ارزش را دارند. پین‌های تقریبی در شعاع ۵۰۰ متری حریم خصوصی کار می‌کنند.`}),(0,p.jsxs)(`div`,{className:`owj-location-body`,style:{display:`flex`,gap:32,alignItems:`center`,marginBottom:24,flexWrap:`wrap`},children:[(0,p.jsx)(`div`,{style:{width:150,height:150,borderRadius:`50%`,background:`conic-gradient(${N.secondary} 0 ${n}%, ${N.orange} ${n}% ${n+r}%, ${N.raised} ${n+r}% 100%)`,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0,boxShadow:N.glowSecondary},children:(0,p.jsxs)(`div`,{style:{width:96,height:96,borderRadius:`50%`,background:N.surface,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,gap:2},children:[(0,p.jsx)(`strong`,{style:{fontSize:20,fontWeight:900,color:N.white},children:M(e.coverage)}),(0,p.jsx)(`span`,{style:{fontSize:11,color:N.textMuted},children:`پوشش`})]})}),(0,p.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:14,flex:1,minWidth:140},children:[{type:`exact`,label:`دقیق`,color:N.secondary,val:e.exact},{type:`approx`,label:`تقریبی`,color:N.orange,val:e.approximate},{type:`missing`,label:`ناموجود`,color:N.raised,val:e.missing}].map(e=>(0,p.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:10,fontSize:13},children:[(0,p.jsx)(`span`,{style:{width:10,height:10,borderRadius:`50%`,background:e.color,flexShrink:0}}),(0,p.jsx)(`span`,{style:{flex:1,color:N.textSec},children:e.label}),(0,p.jsx)(`strong`,{style:{fontWeight:800,color:N.white},children:j(e.val)})]},e.type))})]}),(0,p.jsxs)(`div`,{style:{background:N.raised,borderRadius:N.radiusSm,padding:16,display:`flex`,flexDirection:`column`,gap:8},children:[(0,p.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,p.jsx)(`span`,{style:{fontSize:13,color:N.textSec},children:`تطابق منطقه درخواستی با جزئیات`}),(0,p.jsx)(`strong`,{style:{fontSize:17,fontWeight:800,color:N.secondaryDark},children:M(e.areaMatchRate)})]}),(0,p.jsx)(be,{value:e.areaMatchRate,tone:`cyan`,label:`نرخ تطابق منطقه`}),(0,p.jsxs)(`small`,{style:{fontSize:11,color:N.textMuted},children:[j(e.areaMatches),` از `,j(e.areaChecks),` `,`رکورد بررسی‌شده`]})]})]})}function Te({data:e}){let t=e.global||{},n=t.minimumRequired?Math.min(100,(t.count||0)/t.minimumRequired*100):0,r=e.areaModelCount?e.readyAreaModelCount/e.areaModelCount*100:0;return(0,p.jsxs)(`article`,{className:`owj-panel`,style:{background:N.surface,border:`1px solid ${N.border}`,borderRadius:N.radius,padding:28,boxShadow:N.shadow},children:[(0,p.jsx)(Se,{kicker:`رگرسیون`,title:`آمادگی مدل`,description:`آمادگی به معنای نمونه‌های کافی برای اجراست؛ جایگزین اعتبارسنجی holdout نیست.`}),(0,p.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:14,padding:`14px 18px`,background:N.primaryBg,border:`1px solid ${N.primaryBg2}`,borderRadius:N.radiusSm,marginBottom:22},children:[(0,p.jsx)(`span`,{style:{width:12,height:12,borderRadius:`50%`,background:N.primary,boxShadow:`0 0 0 4px ${N.primaryBg2}`,animation:`owjPulse 2s infinite`,flexShrink:0}}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`strong`,{style:{fontWeight:800,color:N.white,fontSize:14,display:`block`},children:t.status===`experimental-ready`?`مدل آزمایشی فعال`:`در حال جمع‌آوری نمونه`}),(0,p.jsx)(`span`,{style:{fontSize:12,color:N.textSec},children:ge(e.scope)})]})]}),(0,p.jsxs)(`div`,{style:{marginBottom:18},children:[(0,p.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,marginBottom:6,fontSize:13},children:[(0,p.jsx)(`span`,{style:{color:N.textSec},children:`مشاهدات سراسری`}),(0,p.jsx)(`strong`,{style:{fontWeight:800,color:N.white},children:j(t.count)})]}),(0,p.jsx)(be,{value:n,tone:`orange`,label:`آمادگی نمونه مدل سراسری`}),(0,p.jsxs)(`small`,{style:{fontSize:11,color:N.textMuted,marginTop:4,display:`block`},children:[`حداقل: `,j(t.minimumRequired)]})]}),(0,p.jsxs)(`div`,{style:{marginBottom:18},children:[(0,p.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,marginBottom:6,fontSize:13},children:[(0,p.jsx)(`span`,{style:{color:N.textSec},children:`مدل‌های مکانی آماده`}),(0,p.jsxs)(`strong`,{style:{fontWeight:800,color:N.white},children:[j(e.readyAreaModelCount),` /`,` `,j(e.areaModelCount)]})]}),(0,p.jsx)(be,{value:r,tone:`cyan`,label:`آمادگی مدل مکانی`}),(0,p.jsxs)(`small`,{style:{fontSize:11,color:N.textMuted,marginTop:4,display:`block`},children:[j(e.publishedSpatialAreaCount),` از`,` `,j(e.spatialAreaCount),` سلول مکانی منتشرشده`]})]}),(0,p.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8,fontSize:12,color:N.orange,padding:`12px 14px`,background:N.orangeBg,borderRadius:N.radiusXs},children:[(0,p.jsx)(P,{name:`alert`,size:17}),(0,p.jsx)(`span`,{children:`امتیازها تا زمان گذر از اعتبارسنجی holdout زمانی، آزمایشی هستند.`})]})]})}function Ee({data:e}){let[t,n]=(0,f.useState)(``),[r,i]=(0,f.useState)(!1),[a,o]=(0,f.useState)({key:`shortfall`,direction:`desc`}),[s,c]=(0,f.useState)(20),l=(0,f.useMemo)(()=>{let n=t.trim().toLocaleLowerCase(`fa`);return[...e.areas||[]].filter(e=>!r||e.shortfall>0).filter(e=>!n||`${e.name} ${e.slug}`.toLocaleLowerCase(`fa`).includes(n)).sort((e,t)=>{let n={name:[e.name,t.name],discovered:[e.discovered,t.discovered],target:[e.target,t.target],shortfall:[e.shortfall,t.shortfall],duplicates:[e.duplicates,t.duplicates],status:[e.shortfall>0?0:1,t.shortfall>0?0:1]}[a.key];return(typeof n?.[0]==`string`?n[0].localeCompare(n[1],`fa`):(n?.[0]??0)-(n?.[1]??0))*(a.direction===`desc`?-1:1)||e.name.localeCompare(t.name,`fa`)})},[e.areas,t,r,a]),u=e=>o(t=>({key:e,direction:t.key===e&&t.direction===`asc`?`desc`:`asc`}));(0,f.useEffect)(()=>c(20),[t,r]);let d={background:N.surface,border:`1px solid ${N.border}`,borderRadius:N.radius,padding:28,marginBottom:24,boxShadow:N.shadow};return(0,p.jsxs)(`section`,{className:`owj-panel`,style:d,children:[(0,p.jsx)(Se,{kicker:`صف ${j(e.areas?.length||0)} محله منتخب`,title:`پوشش کشف مناطق`,description:`این جدول فقط محله‌های منتخب را نشان می‌دهد؛ کمبود یعنی تعداد یافته‌شده از هدف پویای همان محله کمتر بوده است.`,aside:(0,p.jsxs)(`div`,{className:`owj-heading-aside`,style:{display:`flex`,flexDirection:`column`,alignItems:`flex-end`,gap:2},children:[(0,p.jsx)(`strong`,{style:{fontSize:30,fontWeight:900,color:N.secondaryDark,lineHeight:1},children:j(e.complete)}),(0,p.jsx)(`span`,{style:{fontSize:12,color:N.textMuted},children:`منطقه در هدف`})]})}),(0,p.jsxs)(`div`,{className:`owj-controls`,style:{display:`flex`,gap:12,alignItems:`center`,marginBottom:16,flexWrap:`wrap`},children:[(0,p.jsxs)(`label`,{className:`owj-search-field`,style:{display:`flex`,alignItems:`center`,gap:8,padding:`9px 14px`,borderRadius:N.radiusSm,background:N.raised,border:`1px solid ${N.border}`,flex:1,minWidth:200,color:N.textMuted,transition:`border-color .2s`},children:[(0,p.jsx)(P,{name:`search`,size:18}),(0,p.jsx)(`input`,{className:`owj-search-input`,type:`search`,"aria-label":`جستجوی منطقه یا شناسه`,value:t,onChange:e=>n(e.target.value),placeholder:`جستجوی منطقه یا slug`,style:{border:`none`,background:`none`,color:N.text,fontSize:13,outline:`none`,width:`100%`,fontFamily:`inherit`,direction:`rtl`}})]}),(0,p.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:8,fontSize:13,color:N.textSec,cursor:`pointer`,whiteSpace:`nowrap`},children:[(0,p.jsx)(`input`,{type:`checkbox`,checked:r,onChange:e=>i(e.target.checked),style:{width:16,height:16,accentColor:N.primary,cursor:`pointer`}}),(0,p.jsx)(`span`,{children:`فقط کمبودها`})]}),(0,p.jsxs)(`span`,{className:`owj-controls-result`,style:{fontSize:12,color:N.textMuted,whiteSpace:`nowrap`},children:[j(l.length),` نتیجه`]})]}),(0,p.jsxs)(`div`,{className:`owj-mobile-sort`,children:[(0,p.jsxs)(`label`,{children:[(0,p.jsx)(`span`,{children:`ترتیب بر اساس`}),(0,p.jsxs)(`select`,{"aria-label":`مرتب‌سازی مناطق بر اساس`,value:a.key,onChange:e=>u(e.target.value),children:[(0,p.jsx)(`option`,{value:`shortfall`,children:`کمبود`}),(0,p.jsx)(`option`,{value:`name`,children:`منطقه`}),(0,p.jsx)(`option`,{value:`discovered`,children:`یافت‌شده`}),(0,p.jsx)(`option`,{value:`target`,children:`هدف`}),(0,p.jsx)(`option`,{value:`duplicates`,children:`تکراری`}),(0,p.jsx)(`option`,{value:`status`,children:`وضعیت`})]})]}),(0,p.jsx)(`button`,{type:`button`,onClick:()=>u(a.key),"aria-label":`تغییر جهت مرتب‌سازی مناطق`,children:a.direction===`desc`?`نزولی ↓`:`صعودی ↑`})]}),(0,p.jsx)(`div`,{className:`owj-table-wrap owj-area-table-wrap`,style:{overflowX:`auto`,borderRadius:N.radiusSm,border:`1px solid ${N.border}`},children:(0,p.jsxs)(`table`,{className:`owj-area-table`,style:{width:`100%`,borderCollapse:`collapse`,fontSize:13,textAlign:`right`},children:[(0,p.jsx)(`thead`,{children:(0,p.jsx)(`tr`,{children:[[`name`,`منطقه`],[`discovered`,`یافت‌شده`],[`target`,`هدف`],[`shortfall`,`کمبود`],[`duplicates`,`تکراری`],[`status`,`وضعیت`]].map(([e,t])=>(0,p.jsx)(le,{column:e,sort:a,onSort:u,style:{padding:`12px 16px`,fontSize:11,fontWeight:700,color:N.textMuted,background:N.raised,borderBottom:`1px solid ${N.border}`,textAlign:`right`,whiteSpace:`nowrap`},children:t},e))})}),(0,p.jsx)(`tbody`,{children:l.slice(0,s).map(e=>{let t={padding:`12px 16px`,borderBottom:`1px solid ${N.border}`,color:N.textSec,whiteSpace:`nowrap`};return(0,p.jsxs)(`tr`,{style:{transition:`background .15s`},onMouseEnter:e=>{e.currentTarget.style.background=N.surfaceHover},onMouseLeave:e=>{e.currentTarget.style.background=`transparent`},children:[(0,p.jsx)(`td`,{"data-label":`منطقه`,style:t,children:(0,p.jsxs)(`a`,{href:e.url||`#`,target:`_blank`,rel:`noreferrer`,style:{textDecoration:`none`,display:`flex`,flexDirection:`column`,gap:2},children:[(0,p.jsx)(`strong`,{dir:`auto`,style:{fontWeight:700,color:N.text,fontSize:13},children:ge(e.name)}),(0,p.jsx)(`span`,{style:{fontSize:11,color:N.textMuted,fontFamily:`monospace`,direction:`ltr`,textAlign:`right`},children:ge(e.slug)})]})}),(0,p.jsx)(`td`,{"data-label":`یافت‌شده`,style:t,children:j(e.discovered)}),(0,p.jsx)(`td`,{"data-label":`هدف`,style:t,children:j(e.target)}),(0,p.jsx)(`td`,{"data-label":`کمبود`,style:{...t,color:e.shortfall?N.orange:N.textSec,fontWeight:e.shortfall?700:400},children:j(e.shortfall)}),(0,p.jsx)(`td`,{"data-label":`تکراری`,style:t,children:j(e.duplicates)}),(0,p.jsx)(`td`,{"data-label":`وضعیت`,style:t,children:(0,p.jsx)(`span`,{style:{display:`inline-flex`,padding:`3px 12px`,borderRadius:6,fontSize:11,fontWeight:700,background:e.shortfall?N.orangeBg:N.greenBg,color:e.shortfall?N.orange:N.green},children:e.shortfall?`بررسی`:`کامل`})})]},e.id??e.slug)})})]})}),!l.length&&(0,p.jsx)(`div`,{className:`owj-mobile-empty`,role:`status`,style:{color:N.textSec,padding:`24px 12px`,textAlign:`center`,fontSize:13},children:`منطقه‌ای مطابق جستجوی شما پیدا نشد.`}),s<l.length&&(0,p.jsx)(`button`,{className:`owj-action-button`,style:{display:`block`,width:`100%`,padding:12,marginTop:16,borderRadius:N.radiusSm,border:`1px solid ${N.borderLight}`,background:`transparent`,color:N.textSec,fontSize:13,fontWeight:600,cursor:`pointer`,fontFamily:`inherit`,transition:`all .2s`},onClick:()=>c(e=>e+20),onMouseEnter:e=>{e.currentTarget.style.background=N.raised,e.currentTarget.style.color=N.white},onMouseLeave:e=>{e.currentTarget.style.background=`transparent`,e.currentTarget.style.color=N.textSec},children:`نمایش ۲۰ مورد بیشتر`})]})}var De=[{key:`dealValue`,label:`ارزش معامله`,short:`معامله`,weight:null,description:`شواهد ارزش قبل از دروازه اطمینان`},{key:`modelValue`,label:`ارزش مدل`,short:`مدل`,weight:.45,description:`صدک تخفیف نسبت به مدل مکانی خارج از چین`},{key:`nearbyValue`,label:`ارزش همسایگی`,short:`همسایگی`,weight:.4,description:`صدک تخفیف نسبت به مقایسه‌های نزدیک`},{key:`localPosition`,label:`موقعیت محلی`,short:`موقعیت`,weight:.15,description:`قیمت هر متر مربع در مجموعه مقایسه محلی`},{key:`confidence`,label:`اطمینان`,short:`اطمینان`,weight:null,description:`اعتبارسنجی، مقایسه، مختصات و کیفیت داده`},{key:`dataQuality`,label:`کیفیت داده`,short:`کیفیت`,weight:null,description:`جریمه برای فیلدهای منبع impute‌شده`},{key:`propertyQuality`,label:`کیفیت ملک`,short:`ملک`,weight:null,description:`سن، طبقه، تراکم واحد و امکانات`},{key:`risk`,label:`ریسک`,short:`ریسک`,weight:null,inverse:!0,description:`بالاتر یعنی قیمت غیرعادی یا شواهد ناقص`}];function Oe(e,t){return t===`score`||t===`recommendation`?e.scores?.recommendation??e.score:t===`modelDiscountPct`?e.valuation?.modelDiscountPct??e.prediction?.askingVsPredictionPct:t===`nearbyDiscountPct`?e.valuation?.nearbyDiscountPct??e.prediction?.askingVsNearbyPct:e.scores?.[t]??e.components?.[t]}function ke({value:e,weight:t,inverse:n=!1}){if(!Number.isFinite(e))return(0,p.jsx)(`span`,{style:{color:N.textMuted,fontSize:13},children:`—`});let r=n?100-e:e,i=r>=75?N.green:r>=45?N.orange:N.red;return(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:3,minWidth:68},title:t?`${de.format(e*t)} امتیاز وزنی`:`${j(e)} امتیاز`,children:[(0,p.jsxs)(`div`,{style:{display:`flex`,alignItems:`baseline`,gap:4},children:[(0,p.jsx)(`strong`,{style:{fontWeight:800,fontSize:13,color:N.white},children:j(e)}),(0,p.jsx)(`small`,{style:{fontSize:10,color:N.textMuted},children:t?`+${de.format(e*t)}`:`خام`})]}),(0,p.jsx)(`span`,{style:{height:3,background:N.border,borderRadius:4,overflow:`hidden`},children:(0,p.jsx)(`i`,{style:{display:`block`,height:`100%`,width:`${_e(e)}%`,borderRadius:4,background:i,transition:`width .5s`}})})]})}function Ae({value:e}){let t=Number.isFinite(e)?e>=0?N.green:N.red:N.textMuted;return(0,p.jsx)(`span`,{style:{fontWeight:800,fontSize:13,color:t,direction:`ltr`,display:`inline-block`},children:fe(e)})}function je({data:e}){let[t,n]=(0,f.useState)(``),[r,i]=(0,f.useState)({key:`recommendation`,direction:`desc`}),[a,o]=(0,f.useState)(e.listings||e.top||[]),[s,c]=(0,f.useState)(e.count||0),[l,u]=(0,f.useState)(!1),d=e.available===!0;(0,f.useEffect)(()=>{o(e.listings||e.top||[]),c(e.count||0)},[e.generatedAt,e.count,e.listings,e.top]),(0,f.useEffect)(()=>{if(!d)return;let e=new AbortController,n=window.setTimeout(async()=>{u(!0);try{let n=new URLSearchParams({limit:`100`,offset:`0`,query:t,sort:r.key,direction:r.direction}),i=await fetch(`/scores?${n}`,{signal:e.signal});if(!i.ok)throw Error(`Score API returned HTTP ${i.status}`);let a=await i.json();o(a.listings||[]),c(a.filteredTotal||0)}catch(e){e.name!==`AbortError`&&o([])}finally{e.signal.aborted||u(!1)}},220);return()=>{e.abort(),window.clearTimeout(n)}},[d,t,r]);let m=(0,f.useMemo)(()=>{if(d)return a;let n=t.trim().toLocaleLowerCase(`fa`);return[...e.top||[]].filter(e=>!n||`${e.title} ${e.token} ${e.neighborhood}`.toLocaleLowerCase(`fa`).includes(n)).sort((e,t)=>{if(r.key===`listing`){let n=(e.title||``).localeCompare(t.title||``,`fa`);return r.direction===`asc`?n:-n}let n=Oe(e,r.key),i=Oe(t,r.key);return Number.isFinite(n)?Number.isFinite(i)?r.direction===`asc`?n-i:i-n:-1:1})},[e.top,d,t,a,r]);async function h(){if(!(!d||l||m.length>=s)){u(!0);try{let e=new URLSearchParams({limit:`100`,offset:String(m.length),query:t,sort:r.key,direction:r.direction}),n=await fetch(`/scores?${e}`);if(!n.ok)throw Error(`Score API returned HTTP ${n.status}`);let i=await n.json();o(e=>[...e,...i.listings||[]]),c(i.filteredTotal||0)}finally{u(!1)}}}function g(e){i(t=>({key:e,direction:t.key===e&&t.direction===`desc`?`asc`:`desc`}))}function _({column:e,children:t,title:n}){let i=r.key===e;return(0,p.jsxs)(`button`,{onClick:()=>g(e),title:n,style:{display:`inline-flex`,alignItems:`center`,gap:3,background:`none`,border:`none`,color:i?N.white:N.textMuted,fontWeight:i?800:600,fontSize:11,cursor:`pointer`,padding:0,fontFamily:`inherit`,whiteSpace:`nowrap`},children:[(0,p.jsx)(`span`,{children:t}),(0,p.jsx)(`i`,{style:{fontSize:9,opacity:.6,fontStyle:`normal`},children:i?r.direction===`desc`?`↓`:`↑`:`↕`})]})}let v={background:N.surface,border:`1px solid ${N.border}`,borderRadius:N.radius,padding:28,marginBottom:24,boxShadow:N.shadow},y={padding:`12px 14px`,fontSize:11,fontWeight:700,color:N.textMuted,background:N.raised,borderBottom:`1px solid ${N.border}`,textAlign:`right`,whiteSpace:`nowrap`},b={padding:`12px 14px`,borderBottom:`1px solid ${N.border}`,color:N.textSec,whiteSpace:`nowrap`,verticalAlign:`middle`};return(0,p.jsxs)(`section`,{className:`owj-panel`,style:v,children:[(0,p.jsx)(Se,{kicker:`سیستم پیشنهاد`,title:`جزئیات امتیازدهی آگهی‌ها`,description:`مدل هدانیک cross-fit و مقایسه‌های تعدیل‌شده ارزش معامله را می‌سازند؛ دروازه‌های اطمینان و ریسک فقط امتیاز نهایی را کاهش می‌دهند.`,aside:(0,p.jsxs)(`div`,{className:`owj-heading-aside`,style:{display:`flex`,flexDirection:`column`,alignItems:`flex-end`,gap:2},children:[(0,p.jsx)(`strong`,{style:{fontSize:30,fontWeight:900,color:N.primary,lineHeight:1},children:j(e.summary?.scoreDistribution?.median??e.averageScore??0)}),(0,p.jsx)(`span`,{style:{fontSize:12,color:N.textMuted},children:`میانه امتیاز`})]})}),(0,p.jsxs)(`div`,{className:`owj-controls`,style:{display:`flex`,gap:12,alignItems:`center`,marginBottom:16,flexWrap:`wrap`},children:[(0,p.jsxs)(`label`,{className:`owj-search-field`,style:{display:`flex`,alignItems:`center`,gap:8,padding:`9px 14px`,borderRadius:N.radiusSm,background:N.raised,border:`1px solid ${N.border}`,flex:1,minWidth:200,color:N.textMuted},children:[(0,p.jsx)(P,{name:`search`,size:18}),(0,p.jsx)(`input`,{className:`owj-search-input`,type:`search`,"aria-label":`جستجوی آگهی، توکن یا محله`,value:t,onChange:e=>n(e.target.value),placeholder:`جستجوی آگهی، توکن یا محله`,style:{border:`none`,background:`none`,color:N.text,fontSize:13,outline:`none`,width:`100%`,fontFamily:`inherit`,direction:`rtl`}})]}),(0,p.jsx)(`span`,{className:`owj-controls-result`,role:`status`,"aria-live":`polite`,style:{fontSize:12,color:N.textMuted,whiteSpace:`nowrap`},children:l?`در حال بروزرسانی…`:`${j(m.length)} از ${j(s)} آگهی`})]}),(0,p.jsxs)(`div`,{className:`owj-mobile-sort`,children:[(0,p.jsxs)(`label`,{children:[(0,p.jsx)(`span`,{children:`ترتیب بر اساس`}),(0,p.jsxs)(`select`,{"aria-label":`مرتب‌سازی آگهی‌ها بر اساس`,value:r.key,onChange:e=>g(e.target.value),children:[(0,p.jsx)(`option`,{value:`recommendation`,children:`امتیاز نهایی`}),(0,p.jsx)(`option`,{value:`listing`,children:`عنوان آگهی`}),De.map(e=>(0,p.jsx)(`option`,{value:e.key,children:e.label},e.key)),(0,p.jsx)(`option`,{value:`modelDiscountPct`,children:`تخفیف مدل`}),(0,p.jsx)(`option`,{value:`nearbyDiscountPct`,children:`تخفیف نزدیک`})]})]}),(0,p.jsx)(`button`,{type:`button`,onClick:()=>g(r.key),"aria-label":`تغییر جهت مرتب‌سازی آگهی‌ها`,children:r.direction===`desc`?`نزولی ↓`:`صعودی ↑`})]}),(0,p.jsx)(`div`,{className:`owj-table-wrap owj-reco-desktop-table`,style:{overflowX:`auto`,borderRadius:N.radiusSm,border:`1px solid ${N.border}`,marginBottom:8},children:(0,p.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:13,textAlign:`right`},children:[(0,p.jsx)(`thead`,{children:(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{style:{...y,minWidth:220},children:(0,p.jsx)(_,{column:`listing`,children:`آگهی`})}),(0,p.jsx)(`th`,{style:y,children:(0,p.jsx)(_,{column:`recommendation`,title:`امتیاز نهایی تعدیل‌شده`,children:`نهایی`})}),De.map(e=>(0,p.jsx)(`th`,{style:y,title:`${e.description}${e.weight?` · وزن ${j(e.weight*100)}٪`:``}`,children:(0,p.jsxs)(_,{column:e.key,children:[e.short,e.weight&&(0,p.jsxs)(`small`,{style:{display:`block`,fontSize:9,opacity:.5,fontWeight:400},children:[j(e.weight*100),`٪`]})]})},e.key)),(0,p.jsx)(`th`,{style:y,children:(0,p.jsx)(_,{column:`modelDiscountPct`,title:`مثبت = زیر قیمت مدل`,children:`تخفیف مدل`})}),(0,p.jsx)(`th`,{style:y,children:(0,p.jsx)(_,{column:`nearbyDiscountPct`,title:`مثبت = زیر قیمت همسایگی`,children:`تخفیف نزدیک`})}),(0,p.jsx)(`th`,{style:y,children:`شواهد`})]})}),(0,p.jsx)(`tbody`,{children:m.map(e=>{let t=Oe(e,`recommendation`),n=t>=80?`high`:t>=60?`medium`:`low`,r={high:{bg:N.greenBg,c:N.green,b:`rgba(52,211,153,.25)`},medium:{bg:N.orangeBg,c:N.orange,b:`rgba(251,146,60,.25)`},low:{bg:N.redBg,c:N.red,b:`rgba(248,113,113,.25)`}}[n];return(0,p.jsxs)(`tr`,{style:{transition:`background .15s`},onMouseEnter:e=>{e.currentTarget.style.background=N.surfaceHover},onMouseLeave:e=>{e.currentTarget.style.background=`transparent`},children:[(0,p.jsx)(`td`,{style:{...b,minWidth:220},children:(0,p.jsxs)(`a`,{href:`/listing/${encodeURIComponent(e.token)}`,style:{textDecoration:`none`,display:`flex`,flexDirection:`column`,gap:2},children:[(0,p.jsx)(`strong`,{dir:`auto`,style:{fontWeight:700,color:N.text,fontSize:13},children:ge(e.title||e.token)}),(0,p.jsxs)(`span`,{dir:`auto`,style:{fontSize:12,color:N.textSec},children:[ge(e.neighborhood||`منطقه نامشخص`),` ·`,` `,j(e.property?.area??e.area),` متر ·`,` `,he(e.asking?.askingPrice??e.askingPrice)]}),(0,p.jsxs)(`small`,{style:{fontSize:10,color:N.textMuted,fontFamily:`monospace`,direction:`ltr`,textAlign:`right`},children:[ge(e.token),` ·`,` `,e.location?.accuracy??e.coordinateAccuracy??`نامشخص`]})]})}),(0,p.jsx)(`td`,{style:b,children:(0,p.jsx)(`div`,{style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,width:46,height:46,borderRadius:N.radiusSm,background:r.bg,color:r.c,fontWeight:900,fontSize:17,border:`1px solid ${r.b}`},children:j(t)})}),De.map(t=>(0,p.jsx)(`td`,{style:b,children:(0,p.jsx)(ke,{value:Oe(e,t.key),weight:t.weight,inverse:t.inverse})},t.key)),(0,p.jsx)(`td`,{style:b,children:(0,p.jsx)(Ae,{value:Oe(e,`modelDiscountPct`)})}),(0,p.jsx)(`td`,{style:b,children:(0,p.jsx)(Ae,{value:Oe(e,`nearbyDiscountPct`)})}),(0,p.jsx)(`td`,{style:b,children:(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:1,minWidth:90},children:[(0,p.jsxs)(`div`,{style:{display:`flex`,alignItems:`baseline`,gap:5},children:[(0,p.jsx)(`strong`,{style:{fontWeight:800,color:N.white,fontSize:13},children:j(e.evidence?.comparableCount??e.prediction?.modelSampleCount)}),(0,p.jsx)(`span`,{style:{fontSize:11,color:N.textSec},children:e.evidence?`مقایسه`:`نمونه`})]}),(0,p.jsx)(`small`,{style:{fontSize:10,color:N.textMuted,lineHeight:1.3},children:e.evidence?`${M(e.evidence.valuationValidationMedianErrorPct??e.evidence.modelValidationMedianErrorPct)} خطای میانه`:`${j(e.nearby?.count)} همسایه`})]})})]},e.token)})})]})}),(0,p.jsx)(`div`,{className:`owj-mobile-recommendations`,"aria-label":`فهرست آگهی‌ها`,children:m.map(e=>{let t=Oe(e,`recommendation`);return(0,p.jsxs)(`details`,{children:[(0,p.jsxs)(`summary`,{children:[(0,p.jsxs)(`span`,{children:[(0,p.jsx)(`strong`,{dir:`auto`,children:ge(e.title||e.token)}),(0,p.jsxs)(`small`,{children:[ge(e.neighborhood||`منطقه نامشخص`),` ·`,` `,j(e.property?.area??e.area),` متر`]}),(0,p.jsx)(`small`,{children:he(e.asking?.askingPrice??e.askingPrice)}),(0,p.jsx)(`small`,{style:{color:N.primary},children:`برای دیدن جزئیات لمس کنید`})]}),(0,p.jsxs)(`div`,{className:`owj-mobile-score`,"aria-label":`امتیاز نهایی ${j(t)}`,children:[j(t),(0,p.jsx)(`span`,{children:`امتیاز نهایی`})]})]}),(0,p.jsxs)(`div`,{className:`owj-mobile-factor-grid`,children:[De.map(t=>(0,p.jsxs)(`div`,{className:`owj-mobile-factor`,children:[(0,p.jsx)(`span`,{children:t.label}),(0,p.jsx)(ke,{value:Oe(e,t.key),weight:t.weight,inverse:t.inverse})]},t.key)),(0,p.jsxs)(`div`,{className:`owj-mobile-factor`,children:[(0,p.jsx)(`span`,{children:`تخفیف نسبت به مدل`}),(0,p.jsx)(Ae,{value:Oe(e,`modelDiscountPct`)})]}),(0,p.jsxs)(`div`,{className:`owj-mobile-factor`,children:[(0,p.jsx)(`span`,{children:`تخفیف نزدیک`}),(0,p.jsx)(Ae,{value:Oe(e,`nearbyDiscountPct`)})]}),(0,p.jsxs)(`div`,{className:`owj-mobile-evidence`,children:[(0,p.jsx)(P,{name:`database`,size:16}),(0,p.jsx)(`strong`,{children:j(e.evidence?.comparableCount??e.prediction?.modelSampleCount)}),(0,p.jsx)(`span`,{children:e.evidence?`مقایسه`:`نمونه`}),(0,p.jsx)(`span`,{children:`·`}),(0,p.jsx)(`span`,{children:e.evidence?`${M(e.evidence.valuationValidationMedianErrorPct??e.evidence.modelValidationMedianErrorPct)} خطای میانه`:`${j(e.nearby?.count)} همسایه`})]}),(0,p.jsx)(`a`,{className:`owj-view-listing`,href:`/listing/${encodeURIComponent(e.token)}`,children:`مشاهده آگهی`})]})]},e.token)})}),d&&m.length<s&&(0,p.jsx)(`button`,{className:`owj-action-button`,onClick:h,disabled:l,style:{display:`block`,width:`100%`,padding:12,marginTop:8,borderRadius:N.radiusSm,border:`1px solid ${N.borderLight}`,background:`transparent`,color:N.textSec,fontSize:13,fontWeight:600,cursor:`pointer`,fontFamily:`inherit`},children:l?`در حال بارگذاری…`:`نمایش ۱۰۰ آگهی بیشتر`}),!m.length&&(0,p.jsx)(`div`,{style:{textAlign:`center`,padding:40,color:N.textMuted,fontSize:14},children:`هیچ آگهی با این جستجو مطابقت ندارد.`}),(0,p.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:8,fontSize:12,color:N.textMuted,marginTop:14,padding:`12px 14px`,background:N.raised,borderRadius:N.radiusXs,lineHeight:1.55},children:[(0,p.jsx)(P,{name:`alert`,size:16}),`تخفیف مثبت یعنی قیمت درخواستی زیر معیار است. امتیازها از پیش‌بینی‌های cross-validate شده هستند اما قیمت درخواستی، قیمت فروش قطعی نیست.`]})]})}function Me({events:e}){let t={background:N.surface,border:`1px solid ${N.border}`,borderRadius:N.radius,padding:28,marginBottom:24,boxShadow:N.shadow},n={info:N.secondary,warn:N.orange,error:N.red};return(0,p.jsxs)(`section`,{className:`owj-panel`,style:t,children:[(0,p.jsx)(Se,{kicker:`مانیتورینگ`,title:`رویدادهای اخیر سرور`,description:`آخرین رویدادهای ساختاریافته، از قبل توسط لاگر سرور ویرایش شده‌اند.`}),(0,p.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:2},children:(e||[]).slice(0,12).map((e,t)=>(0,p.jsxs)(`div`,{className:`owj-event-row`,style:{display:`flex`,alignItems:`center`,gap:12,padding:`10px 14px`,borderRadius:N.radiusXs,transition:`background .15s`},onMouseEnter:e=>{e.currentTarget.style.background=N.surfaceHover},onMouseLeave:e=>{e.currentTarget.style.background=`transparent`},children:[(0,p.jsx)(`span`,{style:{width:8,height:8,borderRadius:`50%`,background:n[e.level]||N.secondary,flexShrink:0}}),(0,p.jsx)(`time`,{className:`owj-event-time`,style:{fontSize:11,color:N.textMuted,fontFamily:`monospace`,direction:`ltr`,whiteSpace:`nowrap`},children:pe(e.timestamp)}),(0,p.jsx)(`strong`,{className:`owj-event-name`,style:{fontWeight:700,color:N.text,whiteSpace:`nowrap`,fontSize:13},children:ge(e.event)}),(0,p.jsx)(`span`,{className:`owj-event-message`,style:{color:N.textSec,flex:1,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,fontSize:13},children:ge(e.message)})]},`${e.timestamp}-${e.event}-${t}`))})]})}function Ne(){return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(ne,{active:`overview`}),(0,p.jsxs)(`main`,{className:`owj-dashboard owj-state`,style:{direction:`rtl`,fontFamily:`'Vazirmatn', Tahoma, sans-serif`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,minHeight:`100vh`,background:N.bgGradient,color:N.text,textAlign:`center`,padding:40,gap:20},children:[(0,p.jsx)(ye,{}),(0,p.jsx)(`div`,{style:{display:`flex`,gap:10},children:[0,1,2].map(e=>(0,p.jsx)(`span`,{style:{width:14,height:14,borderRadius:`50%`,background:e===1?N.secondary:N.primary,animation:`owjDot 1.3s ${e*.16}s infinite ease-in-out`}},e))}),(0,p.jsx)(`h1`,{className:`owj-state-title`,style:{fontSize:22,fontWeight:800,color:N.white,margin:0},children:`خواندن تله‌متری بازار`}),(0,p.jsx)(`p`,{style:{fontSize:14,color:N.textSec,margin:0},children:`ترکیب آخرین خزش، آگهی‌ها، کیفیت مختصات و وضعیت مدل.`})]})]})}function Pe({error:e,retry:t}){return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(ne,{active:`overview`}),(0,p.jsxs)(`main`,{className:`owj-dashboard owj-state`,style:{direction:`rtl`,fontFamily:`'Vazirmatn', Tahoma, sans-serif`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,minHeight:`100vh`,background:N.bgGradient,color:N.text,textAlign:`center`,padding:40,gap:20},children:[(0,p.jsx)(ye,{}),(0,p.jsx)(`span`,{style:{width:60,height:60,borderRadius:16,background:N.redBg,color:N.red,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,p.jsx)(P,{name:`alert`,size:28})}),(0,p.jsx)(`h1`,{className:`owj-state-title`,style:{fontSize:22,fontWeight:800,color:N.white,margin:0},children:`داده‌های داشبورد در دسترس نیست`}),(0,p.jsx)(`p`,{style:{fontSize:14,color:N.textSec,margin:0},children:ge(e)}),(0,p.jsxs)(`button`,{onClick:t,style:{display:`inline-flex`,alignItems:`center`,gap:8,padding:`12px 28px`,borderRadius:N.radiusSm,border:`none`,background:N.primary,color:`#fff`,fontSize:14,fontWeight:700,cursor:`pointer`,fontFamily:`inherit`,boxShadow:`0 4px 20px ${N.primaryGlow}`},children:[(0,p.jsx)(P,{name:`refresh`,size:18}),` تلاش مجدد`]})]})]})}function Fe({endpoint:e=`/dashboard`,refreshMs:t=3e4}){let[n,r]=(0,f.useState)(null),[i,a]=(0,f.useState)(null),[o,s]=(0,f.useState)(!1),c=(0,f.useRef)(!1),l=(0,f.useCallback)(async({quiet:t=!1}={})=>{if(!c.current){c.current=!0,t||s(!0);try{let t=await fetch(e,{headers:{accept:`application/json`}});if(!t.ok)throw Error(`Server returned HTTP ${t.status}`);let n=await t.json();if(!n?.crawl||!n?.overview)throw Error(`Dashboard response has an unexpected shape`);r(n),a(null)}catch(e){a(e.message||`Unknown dashboard error`)}finally{c.current=!1,s(!1)}}},[e]);if((0,f.useEffect)(()=>{l();let e=window.setInterval(()=>void l({quiet:!0}),t);return()=>window.clearInterval(e)},[l,t]),!n&&!i)return(0,p.jsx)(Ne,{});if(!n&&i)return(0,p.jsx)(Pe,{error:i,retry:()=>l()});let{crawl:u,overview:d,locationQuality:m,areaCoverage:h,model:g,recommendations:_,recentEvents:v}=n,y=u.areasTotal?u.areasCompleted/u.areasTotal*100:0,b=u.status===`completed`?`good`:u.status===`failed`?`bad`:`warn`,x={completed:`تکمیل‌شده`,failed:`ناموفق`,running:`در حال اجرا`,pending:`در انتظار`},S={good:N.green,bad:N.red,warn:N.orange},C={good:N.greenBg,bad:N.redBg,warn:N.orangeBg};return(0,p.jsxs)(`div`,{className:`owj-dashboard`,style:{direction:`rtl`,fontFamily:`'Vazirmatn', Tahoma, sans-serif`,background:N.bgGradient,color:N.text,minHeight:`100vh`,fontSize:14,lineHeight:1.7},children:[(0,p.jsx)(ye,{}),(0,p.jsxs)(`header`,{className:`owj-topbar`,style:{position:`sticky`,top:0,zIndex:100,display:`flex`,alignItems:`center`,gap:16,padding:`0 28px`,height:68,background:N.surfaceGlass,backdropFilter:`blur(24px) saturate(1.8)`,WebkitBackdropFilter:`blur(24px) saturate(1.8)`,borderBottom:`1px solid ${N.border}`},children:[(0,p.jsxs)(`a`,{className:`owj-brand`,href:`/`,style:{display:`flex`,alignItems:`center`,gap:12,textDecoration:`none`,color:N.text,flexShrink:0},children:[(0,p.jsx)(`span`,{className:`owj-brand-icon`,style:{width:40,height:40,borderRadius:12,background:N.primary,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#fff`,fontWeight:900,fontSize:14,boxShadow:`0 2px 12px ${N.primaryGlow}`},children:(0,p.jsx)(P,{name:`building`,size:22})}),(0,p.jsxs)(`span`,{style:{display:`flex`,flexDirection:`column`,lineHeight:1.2},children:[(0,p.jsx)(`strong`,{style:{fontWeight:900,fontSize:17,color:N.white,letterSpacing:-.5},children:`املاک اوج`}),(0,p.jsx)(`small`,{className:`owj-brand-subtitle`,style:{fontSize:11,color:N.textMuted,fontWeight:400},children:`رصدخانه بازار مسکن`})]})]}),(0,p.jsx)(te,{active:`overview`,className:`owj-nav`}),(0,p.jsxs)(`div`,{className:`owj-header-meta`,style:{display:`flex`,alignItems:`center`,gap:12,flexShrink:0},children:[(0,p.jsxs)(`span`,{className:`owj-topbar-status`,style:{display:`inline-flex`,alignItems:`center`,gap:6,fontSize:12,fontWeight:700,padding:`5px 14px`,borderRadius:20,background:C[b],color:S[b]},children:[(0,p.jsx)(`i`,{style:{width:7,height:7,borderRadius:`50%`,background:S[b],display:`inline-block`,animation:b===`good`?`none`:`owjPulse 2s infinite`}}),x[u.status]||u.status]}),(0,p.jsxs)(`span`,{className:`owj-meta-date`,style:{fontSize:12,color:N.textMuted},children:[`بروزرسانی: `,pe(n.sourceUpdatedAt||n.generatedAt)]}),(0,p.jsx)(`button`,{className:`owj-icon-button`,onClick:()=>l(),disabled:o,title:`بازخوانی داشبورد`,style:{width:38,height:38,borderRadius:N.radiusSm,border:`1px solid ${N.borderLight}`,background:`transparent`,color:N.textSec,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`,transition:`all .2s`},children:(0,p.jsx)(P,{name:`refresh`})})]})]}),(0,p.jsxs)(`main`,{className:`owj-main`,style:{maxWidth:1400,margin:`0 auto`,padding:`0 28px 80px`},children:[(0,p.jsxs)(`section`,{className:`owj-hero`,style:{display:`grid`,gridTemplateColumns:`1fr 360px`,gap:36,padding:`52px 0 44px`,alignItems:`center`},children:[(0,p.jsxs)(`div`,{className:`owj-hero-copy`,style:{animation:`owjSlideUp .6s ease both`},children:[(0,p.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:8,fontSize:13,fontWeight:700,color:N.secondaryDark,marginBottom:14},children:[(0,p.jsx)(P,{name:`activity`,size:17}),`هوش عملیاتی / فروش آپارتمان تهران`]}),(0,p.jsxs)(`h1`,{style:{fontSize:34,fontWeight:900,lineHeight:1.4,color:N.white,margin:`0 0 14px`,letterSpacing:-.5},children:[`آیا داده‌های بازار`,` `,(0,p.jsx)(`em`,{style:{fontStyle:`normal`,color:N.primary},children:`قابل اعتماد هستند.`})]}),(0,p.jsx)(`p`,{style:{fontSize:15,color:N.textSec,lineHeight:1.75,margin:0,maxWidth:560},children:`یک نمای عملیاتی از پوشش جمع‌آوری، دقت موقعیت، آمادگی مدل و آگهی‌هایی که ارزش بررسی دارند.`}),(0,p.jsxs)(`div`,{className:`owj-hero-updated`,children:[(0,p.jsx)(P,{name:`refresh`,size:14}),(0,p.jsx)(`span`,{children:`آخرین بروزرسانی:`}),(0,p.jsx)(`time`,{children:pe(n.sourceUpdatedAt||n.generatedAt)})]})]}),(0,p.jsxs)(`div`,{className:`owj-run-card`,style:{background:N.surface,border:`1px solid ${N.border}`,borderRadius:18,padding:26,display:`flex`,flexDirection:`column`,gap:18,boxShadow:N.shadowLg,animation:`owjSlideUp .7s ease both`,position:`relative`,overflow:`hidden`},children:[(0,p.jsx)(`div`,{style:{position:`absolute`,top:0,right:0,left:0,height:3,background:`linear-gradient(90deg, ${N.primary}, ${N.secondary})`}}),(0,p.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,p.jsx)(`span`,{style:{fontSize:13,color:N.textMuted},children:`آخرین خزش`}),(0,p.jsx)(`strong`,{style:{fontSize:13,fontWeight:800,fontFamily:`monospace`,color:N.primaryLight,background:N.primaryBg,padding:`3px 10px`,borderRadius:6},children:ge(u.runId?.slice(0,8)||`—`)})]}),(0,p.jsxs)(`div`,{style:{textAlign:`center`,padding:`8px 0`},children:[(0,p.jsx)(`strong`,{className:`owj-run-count`,style:{fontSize:44,fontWeight:900,color:N.white,display:`block`,lineHeight:1,letterSpacing:-2},children:j(u.processed)}),(0,p.jsx)(`span`,{style:{fontSize:13,color:N.textSec,marginTop:4,display:`block`},children:`آگهی پردازش‌شده`})]}),(0,p.jsx)(be,{value:u.successRate,tone:`cyan`,label:`نرخ موفقیت خزش`}),(0,p.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,fontSize:12,color:N.textMuted,paddingTop:14,borderTop:`1px solid ${N.border}`},children:[(0,p.jsx)(`span`,{children:me(u.durationMs)}),(0,p.jsxs)(`span`,{children:[j(u.areasCompleted),` /`,` `,j(u.areasTotal),` منطقه`]})]})]})]}),(0,p.jsxs)(`section`,{className:`owj-kpi-grid`,style:{display:`grid`,gridTemplateColumns:`repeat(4, 1fr)`,gap:18,marginBottom:36},"aria-label":`معیارهای کلیدی کیفیت`,children:[(0,p.jsx)(xe,{eyebrow:`موفقیت خزش`,value:M(u.successRate),detail:`${j(u.successful)} موفق · ${j(u.failed)} ناموفق`,progress:u.successRate,tone:`cyan`,icon:`check`}),(0,p.jsx)(xe,{eyebrow:`تکمیل مناطق`,value:M(y),detail:`${j(u.areasCompleted)} از ${j(u.areasTotal)} منطقه`,progress:y,tone:`green`,icon:`area`}),(0,p.jsx)(xe,{eyebrow:`پوشش کاندیداها`,value:M(d.candidateCoverage),detail:`${j(u.discovered)} از ${j(d.candidateTarget)} هدف`,progress:d.candidateCoverage,tone:`orange`,icon:`database`}),(0,p.jsx)(xe,{eyebrow:`پوشش مختصات`,value:M(m.coverage),detail:`${j(m.available)} قابل استفاده · ${j(m.missing)} ناموجود`,progress:m.coverage,tone:`violet`,icon:`location`})]}),(0,p.jsxs)(`section`,{style:{marginBottom:36},children:[(0,p.jsx)(Se,{kicker:`دروازه‌های کیفیت`,title:`نیازمند توجه`,description:`اعدادی که می‌توانند تصمیمات جمع‌آوری یا مدل‌سازی را تغییر دهند.`}),(0,p.jsxs)(`div`,{className:`owj-attention-grid`,style:{display:`grid`,gridTemplateColumns:`repeat(4, 1fr)`,gap:16},children:[(0,p.jsx)(Ce,{tone:u.failed?`warn`:`good`,icon:u.failed?`alert`:`check`,value:j(u.failed),title:`رکوردهای جزئیات ناموفق`,text:u.failed?`رویدادهای crawl.listing.failure را قبل از تأیید کامل بودن پوشش بررسی کنید.`:`هیچ خطای جزئیات آگهی در این اجرا وجود ندارد.`}),(0,p.jsx)(Ce,{tone:h.withShortfall?`warn`:`good`,icon:`area`,value:j(h.withShortfall),title:`مناطق زیر هدف`,text:`${j(h.totalShortfall)} آگهی کمتر از هدف تعیین‌شده هر منطقه.`}),(0,p.jsx)(Ce,{tone:m.missing?`warn`:`good`,icon:`location`,value:j(m.missing),title:`آگهی‌های بدون مختصات`,text:`با امنیت ذخیره شده‌اند اما از مقایسه مختصاتی و امتیازدهی حذف می‌شوند.`}),(0,p.jsx)(Ce,{tone:u.contactEndpointAttempts?`bad`:`good`,icon:u.contactEndpointAttempts?`alert`:`check`,value:j(u.contactEndpointAttempts),title:`تلاش‌های endpoint تماس`,text:u.contactEndpointAttempts?`فعالیت guardrail شناسایی شد؛ فوراً بررسی کنید.`:`guardrail جمع‌آوری عمومی بدون مشکل باقی ماند.`})]})]}),(0,p.jsxs)(`section`,{className:`owj-detail-grid`,style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:24,marginBottom:24},children:[(0,p.jsx)(we,{data:m}),(0,p.jsx)(Te,{data:g})]}),(0,p.jsx)(Ee,{data:h}),(0,p.jsx)(`div`,{id:`scored-listings`,children:(0,p.jsx)(je,{data:n.scoring?.available?n.scoring:_})}),(0,p.jsx)(Me,{events:v}),(0,p.jsxs)(`details`,{className:`owj-raw-json`,style:{background:N.surface,border:`1px solid ${N.border}`,borderRadius:N.radius,overflow:`hidden`,marginBottom:24,boxShadow:N.shadow},children:[(0,p.jsxs)(`summary`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,padding:`16px 24px`,cursor:`pointer`,fontSize:14,fontWeight:600,color:N.textSec,listStyle:`none`},children:[(0,p.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,p.jsx)(P,{name:`database`,size:18}),` داده خام JSON`]}),(0,p.jsx)(`span`,{style:{fontSize:12,color:N.textMuted},children:`مشاهده محتوای دقیق API`})]}),(0,p.jsx)(`pre`,{style:{padding:24,margin:0,fontSize:12,color:N.textMuted,background:N.raised,overflowX:`auto`,direction:`ltr`,textAlign:`left`,lineHeight:1.6,fontFamily:`monospace`},children:JSON.stringify(n,null,2)})]})]}),(0,p.jsxs)(`footer`,{className:`owj-footer`,style:{display:`flex`,justifyContent:`space-between`,padding:`22px 28px`,borderTop:`1px solid ${N.border}`,fontSize:12,color:N.textMuted,maxWidth:1400,margin:`0 auto`,flexWrap:`wrap`,gap:8},children:[(0,p.jsxs)(`span`,{children:[(0,p.jsx)(`strong`,{style:{color:N.textSec},children:`املاک اوج`}),` · تحلیل بازار مسکن · فقط داده‌های عمومی`]}),(0,p.jsx)(`span`,{children:`امتیازها ابزارهای تصمیم‌گیری آزمایشی هستند، نه توصیه سرمایه‌گذاری.`})]})]})}var Ie={primary:`#66308d`,primaryMuted:`#f4eef8`,secondary:`#01ae9b`,secondaryDark:`#087f73`,secondaryMuted:`#e9f8f5`,green:`#14785f`,greenMuted:`#eaf7f0`,orange:`#ae6c27`,orangeMuted:`#fff5e8`,red:`#b6404b`,redMuted:`#fff0f1`,gray:`#777e89`},Le=`
  .owj-analytics {
    --oa-page: #f7f8fa;
    --oa-paper: #ffffff;
    --oa-ink: #1d2027;
    --oa-muted: #626a76;
    --oa-faint: #737b85;
    --oa-border: #e9ebef;
    --oa-surface: #f6f7f9;
    --oa-primary: #66308d;
    --oa-secondary: #087f73;
    color: var(--oa-ink);
    background: var(--oa-page);
    direction: rtl;
    font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
    font-size: 14px;
    line-height: 1.75;
    min-height: 100vh;
    text-align: right;
    overflow-x: clip;
  }
  .owj-analytics, .owj-analytics *, .owj-analytics *::before, .owj-analytics *::after { box-sizing: border-box; }
  .owj-analytics h1, .owj-analytics h2, .owj-analytics h3,
  .owj-analytics p, .owj-analytics figure, .owj-analytics dl { margin: 0; }
  .owj-analytics a { color: inherit; text-decoration: none; }
  .owj-analytics button, .owj-analytics select, .owj-analytics input { font: inherit; }
  .owj-analytics button, .owj-analytics a, .owj-analytics select { -webkit-tap-highlight-color: transparent; }
  .owj-analytics :is(button, input, select, summary, a):focus-visible {
    outline: 3px solid rgba(102, 48, 141, .50);
    outline-offset: 3px;
  }
  .oa-main { max-width: 1392px; padding: 26px 28px 88px; margin: 0 auto; min-width: 0; }

  .oa-hero {
    position: relative;
    isolation: isolate;
    border-radius: 24px;
    padding: 36px 38px;
    background: var(--oa-paper);
    border: 1px solid var(--oa-border);
    display: grid;
    grid-template-columns: minmax(0,1fr) minmax(255px,310px);
    align-items: center;
    gap: 32px;
    box-shadow: 0 5px 24px rgba(25, 32, 45, .025);
    overflow: hidden;
    margin-bottom: 22px;
  }
  .oa-hero::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 190px;
    background: radial-gradient(ellipse at top left, rgba(102,48,141,.045), transparent 75%);
    z-index: -1;
    pointer-events: none;
  }
  .oa-hero__eyebrow {
    color: var(--oa-secondary);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 750;
    font-size: 12px;
    margin-bottom: 13px;
    background: #e9f8f5;
    padding: 5px 11px;
    border-radius: 999px;
    width: fit-content;
  }
  .oa-hero h1 {
    font-weight: 850;
    font-size: clamp(24px, 2.6vw, 35px);
    letter-spacing: -.7px;
    line-height: 1.5;
    margin-bottom: 9px;
  }
  .oa-hero h1 span { color: var(--oa-primary); }
  .oa-hero__desc { color: var(--oa-muted); font-size: 13px; line-height: 2; max-width: 695px; }
  .oa-run {
    border-radius: 17px;
    background: #f7f8fa;
    border: 1px solid #eceef2;
    padding: 19px 20px;
    min-width: 0;
  }
  .oa-run__title { display: flex; align-items: center; gap: 8px; font-weight: 750; font-size: 12px; margin-bottom: 14px; }
  .oa-run__title svg { color: var(--oa-primary); }
  .oa-run__item { display: flex; gap: 12px; align-items: flex-start; justify-content: space-between; padding: 10px 0; border-top: 1px solid #e9ebef; }
  .oa-run__item > span { color: var(--oa-muted); font-size: 12px; flex-shrink: 0; }
  .oa-run__item > strong { text-align: left; font-size: 12px; font-weight: 750; overflow-wrap: anywhere; max-width: 69%; }
  .oa-run__method { direction: ltr; unicode-bidi: plaintext; font-size: 11px !important; }

  .oa-kpis { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 14px; margin: 0 0 24px; }
  .oa-kpi {
    --tone: #66308d; --tone-bg: #f4eef8;
    min-width: 0;
    padding: 21px 20px 18px;
    border: 1px solid var(--oa-border);
    border-radius: 18px;
    background: var(--oa-paper);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  .oa-kpi--cyan { --tone: #087f73; --tone-bg: #e9f8f5; }
  .oa-kpi--green { --tone: #14785f; --tone-bg: #eaf7f0; }
  .oa-kpi--orange { --tone: #ae6c27; --tone-bg: #fff5e8; }
  .oa-kpi--violet { --tone: #66308d; --tone-bg: #f4eef8; }
  .oa-kpi__top { width: 100%; display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
  .oa-kpi__label { color: #636a75; font-size: 12px; font-weight: 650; line-height: 1.65; }
  .oa-kpi__mark { height: 30px; width: 30px; display: grid; place-items: center; border-radius: 9px; color: var(--tone); background: var(--tone-bg); flex-shrink: 0; }
  .oa-kpi__value { color: var(--oa-ink); font-weight: 850; font-size: clamp(24px, 2.3vw, 32px); line-height: 1.35; letter-spacing: -.6px; max-width: 100%; overflow-wrap: anywhere; font-variant-numeric: tabular-nums; }
  .oa-kpi__detail { color: #69717c; font-size: 11px; line-height: 1.8; margin-top: 4px; }
  .oa-kpi__rule { margin-top: auto; width: 36px; height: 3px; border-radius: 9px; background: var(--tone); }

  .oa-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 16px; align-items: stretch; margin-bottom: 20px; }
  .oa-panel { min-width: 0; background: var(--oa-paper); border: 1px solid var(--oa-border); border-radius: 19px; padding: 24px; }
  .oa-panel--wide { grid-column: span 2; }
  .oa-panel--full { grid-column: 1 / -1; }
  .oa-panel__eyebrow { display: block; color: var(--oa-secondary); font-weight: 800; font-size: 11px; margin: 0 0 6px; }
  .oa-panel__title { font-weight: 800; color: var(--oa-ink); font-size: clamp(17px, 1.6vw, 19px); line-height: 1.6; }
  .oa-panel__desc { margin: 7px 0 0 !important; color: var(--oa-muted); font-size: 12px; line-height: 2; max-width: 810px; }
  .oa-panel__head { margin-bottom: 19px; }

  .oa-chart-shell { border-radius: 14px; background: #f8f9fa; border: 1px solid #edf0f2; overflow-x: auto; overflow-y: hidden; scrollbar-width: thin; }
  .oa-histogram { height: 235px; min-width: max(100%, 420px); display: flex; align-items: flex-end; gap: 7px; padding: 16px 14px 14px; }
  .oa-histogram__bin { min-width: 0; flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 6px; }
  .oa-histogram__count { color: #555e6b; font-size: 10px; font-weight: 750; line-height: 1.4; white-space: nowrap; }
  .oa-histogram__track { flex: 1; min-height: 0; width: 100%; display: flex; align-items: flex-end; justify-content: center; border-bottom: 1px solid #dde1e6; }
  .oa-histogram__bar { display: block; width: min(100%, 46px); border-radius: 6px 6px 1px 1px; background: #8a659e; min-height: 2px; transition: opacity .2s; }
  .oa-histogram__bin:hover .oa-histogram__bar { opacity: .77; }
  .oa-histogram__label { color: var(--oa-muted); font-size: 10px; direction: ltr; unicode-bidi: plaintext; white-space: nowrap; max-width: 100%; overflow: hidden; text-overflow: ellipsis; }
  .oa-quartiles { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 8px; margin-top: 13px; }
  .oa-quartile { min-width: 0; border: 1px solid #eff0f2; background: #f9fafb; border-radius: 11px; padding: 11px 5px; text-align: center; display: flex; flex-direction: column; gap: 3px; }
  .oa-quartile--median { border-color: #e9daef; background: #f7f2fa; }
  .oa-quartile span { font-size: 10px; font-weight: 650; color: #737b85; }
  .oa-quartile strong { color: #202127; font-size: clamp(13px, 1.4vw, 18px); font-weight: 850; overflow-wrap: anywhere; }
  .oa-quartile--median strong { color: #66308d; }
  .oa-bandlist { display: flex; flex-direction: column; gap: 11px; }
  .oa-band { --band: #66308d; padding: 12px; border: 1px solid #eff1f3; border-radius: 12px; background: #fbfbfc; min-width: 0; }
  .oa-band__top { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 5px; }
  .oa-band__label { color: #30353d; font-size: 12px; font-weight: 750; }
  .oa-band__count { font-size: 12px; font-weight: 800; color: #30353d; white-space: nowrap; }
  .oa-band__meta { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 10px; color: #727985; margin-bottom: 9px; }
  .oa-band__range { direction: ltr; unicode-bidi: plaintext; }
  .oa-band__track { height: 5px; background: #e8ebef; overflow: hidden; border-radius: 99px; }
  .oa-band__fill { display: block; height: 100%; background: var(--band); border-radius: inherit; transition: width .5s ease; }

  .oa-coordinate { display: flex; align-items: center; flex-direction: column; gap: 19px; }
  .oa-donut { width: 168px; height: 168px; border-radius: 50%; display: grid; place-items: center; padding: 13px; margin: 2px 0 0; }
  .oa-donut__inside { width: 100%; height: 100%; border-radius: 50%; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: inset 0 0 0 1px #edf0f2; }
  .oa-donut__inside strong { font-size: 24px; color: #1e252a; font-weight: 850; }
  .oa-donut__inside span { color: var(--oa-muted); font-size: 11px; }
  .oa-legend { width: 100%; display: flex; flex-direction: column; gap: 8px; }
  .oa-legend__row { display: flex; align-items: center; gap: 10px; padding: 11px 13px; background: #f8f9fa; border: 1px solid #f0f1f3; border-radius: 11px; }
  .oa-legend__dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
  .oa-legend__row span:nth-child(2) { color: #626a74; font-size: 12px; flex: 1; }
  .oa-legend__row strong { font-size: 14px; font-weight: 800; }

  .oa-clean-flow { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 10px; margin-bottom: 17px; }
  .oa-clean-step { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 12px; border-radius: 13px; padding: 15px; background: #f8f9fa; border: 1px solid #ebedf0; min-width: 0; }
  .oa-clean-step--accepted { background: #eef9f6; border-color: #d8efe8; }
  .oa-clean-step--scored { background: #f5f0f8; border-color: #eadcf0; }
  .oa-clean-step--rejected { background: #fff4f4; border-color: #f8e1e2; }
  .oa-clean-step span { color: #656c76; font-size: 11px; font-weight: 650; }
  .oa-clean-step strong { font-size: clamp(19px,2vw,25px); font-weight: 850; color: #202127; overflow-wrap: anywhere; line-height: 1.5; }
  .oa-clean-step--accepted strong { color: #14785f; }
  .oa-clean-step--scored strong { color: #66308d; }
  .oa-clean-step--rejected strong { color: #b6404b; }
  .oa-dictionaries { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; }
  .oa-dictionary { background: #fbfbfc; border: 1px solid #edf0f2; border-radius: 13px; padding: 16px; min-width: 0; }
  .oa-dictionary h3 { font-size: 13px; font-weight: 800; margin-bottom: 14px; line-height: 1.8; }
  .oa-dictionary__items { display: flex; flex-direction: column; gap: 13px; }
  .oa-dictionary__row { display: flex; align-items: flex-start; flex-direction: column; gap: 5px; }
  .oa-dictionary__line { display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px; }
  .oa-dictionary__line span { font-size: 12px; color: #5f6671; overflow-wrap: anywhere; }
  .oa-dictionary__line strong { font-size: 12px; font-weight: 800; white-space: nowrap; }
  .oa-dictionary__track { background: #e9ecf0; border-radius: 99px; width: 100%; height: 5px; overflow: hidden; }
  .oa-dictionary__fill { background: #8d7e99; border-radius: inherit; height: 100%; display: block; }
  .oa-empty { padding: 32px 20px; font-size: 12px; color: #727985; text-align: center; }

  .oa-neighborhood-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 15px; flex-wrap: wrap; margin-bottom: 15px; }
  .oa-neighborhood-head .oa-panel__head { margin-bottom: 0; }
  .oa-neighborhood-count { display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px; color: #5e6671; background: #f7f8fa; border: 1px solid #ebedf0; border-radius: 999px; font-size: 11px; white-space: nowrap; }
  .oa-tools { margin-bottom: 14px; }
  .oa-tools input { min-height: 42px; border: 1px solid #e4e7ed !important; background: #fff !important; border-radius: 11px !important; color: #202127 !important; font-size: 13px !important; outline: none; }
  .oa-tools input:focus { border-color: #a986c2 !important; box-shadow: 0 0 0 3px #f5eff8; }
  .oa-table-scroll { overflow: auto; border: 1px solid #e9ebef; border-radius: 13px; max-width: 100%; scrollbar-width: thin; }
  .oa-table { width: 100%; border-collapse: separate; border-spacing: 0; text-align: right; min-width: 1000px; font-size: 12px; }
  .oa-table thead th { background: #f8f9fa; color: #626a75; padding: 13px 12px; text-align: right; white-space: nowrap; border-bottom: 1px solid #e8ebef; font-weight: 700; }
  .oa-table thead th:first-child { position: sticky; right: 0; z-index: 2; background: #f8f9fa; }
  .oa-table thead button { color: #626a75; font-size: 12px; }
  .oa-table tbody td { background: #fff; padding: 14px 12px; border-bottom: 1px solid #eff0f2; white-space: nowrap; color: #4f5761; }
  .oa-table tbody tr:last-child td { border-bottom: 0; }
  .oa-table tbody tr:hover td { background: #fcfbfd; }
  .oa-table tbody td:first-child { position: sticky; right: 0; background: #fff; z-index: 1; box-shadow: -1px 0 0 #eff0f2; color: #202127; font-weight: 750; }
  .oa-table tbody tr:hover td:first-child { background: #fcfbfd; }
  .oa-table__value { font-weight: 750; color: #21252c; }
  .oa-table__risk { color: #a9661b !important; font-weight: 750; }
  .oa-score-pill { display: inline-flex; align-items: center; justify-content: center; min-width: 42px; border-radius: 8px; padding: 4px 8px; font-size: 12px; font-weight: 850; }
  .oa-score-pill--good { color: #14785f; background: #eaf7f0; }
  .oa-score-pill--medium { color: #ae6c27; background: #fff5e8; }
  .oa-score-pill--low { color: #b6404b; background: #fff0f1; }
  .oa-discount--positive { color: #14785f !important; font-weight: 800; }
  .oa-discount--negative { color: #b6404b !important; font-weight: 800; }
  .oa-mobile-sort, .oa-mobile-areas { display: none; }

  .oa-methodology { display: flex; align-items: flex-start; gap: 13px; background: #fff; border: 1px solid #e9ebef; border-radius: 17px; padding: 20px 22px; margin-bottom: 18px; }
  .oa-methodology__icon { width: 37px; height: 37px; flex-shrink: 0; display: grid; place-items: center; border-radius: 11px; background: #f4eef8; color: #66308d; }
  .oa-methodology h2 { font-weight: 800; font-size: 14px; margin-bottom: 5px; }
  .oa-methodology p { color: #626a76; font-size: 12px; line-height: 2; margin-bottom: 12px; }
  .oa-methodology code { color: #555461; font-size: 11px; direction: ltr; unicode-bidi: plaintext; display: block; text-align: left; max-width: 100%; overflow-x: auto; overflow-wrap: anywhere; padding: 12px; border-radius: 10px; background: #f8f9fa; border: 1px solid #eef0f2; }
  .oa-json { background: #fff; border: 1px solid #e9ebef; border-radius: 15px; overflow: hidden; }
  .oa-json > summary { cursor: pointer; padding: 17px 20px; list-style: none; font-size: 12px; font-weight: 750; display: flex; align-items: center; justify-content: space-between; gap: 15px; }
  .oa-json > summary::-webkit-details-marker { display: none; }
  .oa-json > summary span { display: inline-flex; align-items: center; gap: 8px; }
  .oa-json > summary small { color: #737b85; font-weight: 500; font-size: 11px; }
  .oa-json[open] > summary { border-bottom: 1px solid #e9ebef; }
  .oa-json pre { direction: ltr; text-align: left; margin: 0; color: #454c56; background: #f8f9fa; max-height: 460px; overflow: auto; padding: 17px; font: 12px/1.7 ui-monospace, SFMono-Regular, Consolas, monospace; }

  @media (max-width: 1150px) {
    .oa-main { padding-inline: 22px; }
    .oa-kpis { grid-template-columns: repeat(2,minmax(0,1fr)); }
    .oa-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
    .oa-panel--wide { grid-column: span 2; }
    .oa-panel--full { grid-column: 1 / -1; }
    .oa-coordinate { justify-content: center; }
  }
  @media (max-width: 760px) {
    .oa-main { padding: 16px 14px 58px; }
    .oa-hero { padding: 23px 20px; border-radius: 18px; grid-template-columns: minmax(0,1fr); gap: 18px; margin-bottom: 14px; }
    .oa-hero h1 { font-size: clamp(22px,5.3vw,28px); }
    .oa-hero__desc { font-size: 12px; }
    .oa-run { padding: 12px 15px; }
    .oa-run__title { margin-bottom: 5px; }
    .oa-kpis { gap: 9px; margin-bottom: 14px; }
    .oa-kpi { padding: 15px 14px; border-radius: 14px; }
    .oa-kpi__label { font-size: 11px; }
    .oa-kpi__mark { width: 26px; height: 26px; }
    .oa-kpi__value { font-size: clamp(20px,5.4vw,27px); }
    .oa-kpi__detail { font-size: 10px; }
    .oa-grid { display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px; }
    .oa-panel { padding: 18px 15px; border-radius: 16px; width: 100%; }
    .oa-panel__title { font-size: 17px; }
    .oa-panel__desc { font-size: 11px; }
    .oa-panel__head { margin-bottom: 15px; }
    .oa-histogram { height: 194px; gap: 5px; padding: 13px 10px 11px; min-width: max(100%, 370px); }
    .oa-quartiles { gap: 5px; }
    .oa-quartile { padding: 8px 3px; border-radius: 8px; }
    .oa-quartile span { font-size: 9px; }
    .oa-quartile strong { font-size: 13px; }
    .oa-donut { height: 154px; width: 154px; }
    .oa-clean-flow { gap: 8px; grid-template-columns: repeat(2,minmax(0,1fr)); }
    .oa-clean-step { padding: 13px; }
    .oa-clean-step strong { font-size: 21px; }
    .oa-dictionaries { grid-template-columns: 1fr; }
    .oa-table-scroll { display: none; }
    .oa-mobile-sort { display: flex; gap: 9px; align-items: stretch; margin: 10px 0 14px; }
    .oa-mobile-sort label { flex: 1; min-width: 0; display: flex; align-items: center; gap: 7px; background: #fff; border: 1px solid #e6e9ed; border-radius: 11px; padding: 0 10px; }
    .oa-mobile-sort label span { font-size: 11px; color: #67707b; white-space: nowrap; }
    .oa-mobile-sort select { flex: 1; color: #252933; background: none; border: none; outline: none; min-width: 0; height: 43px; font-size: 12px; }
    .oa-mobile-sort button { background: #f7f4f9; color: #66308d; border: 1px solid #ece3f2; border-radius: 11px; padding: 0 12px; font-size: 12px; font-weight: 700; cursor: pointer; min-height: 43px; }
    .oa-mobile-areas { display: grid; grid-template-columns: 1fr; gap: 10px; }
    .oa-area-card { border: 1px solid #ebedf0; background: #fff; border-radius: 13px; padding: 15px; }
    .oa-area-card__head { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 13px; }
    .oa-area-card__name { font-weight: 850; font-size: 14px; color: #23262c; }
    .oa-area-card__badge { font-size: 10px; background: #f4f5f7; border-radius: 99px; padding: 3px 9px; color: #555e69; white-space: nowrap; }
    .oa-area-card__metrics { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; }
    .oa-area-card__metric { border-radius: 9px; padding: 9px 10px; background: #f7f8fa; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .oa-area-card__metric span { font-size: 10px; color: #707884; }
    .oa-area-card__metric strong { font-weight: 800; color: #272c32; font-size: 12px; overflow-wrap: anywhere; }
    .oa-area-card__metric--wide { grid-column: 1 / -1; }
    .oa-area-card__metric--positive strong { color: #14785f; }
    .oa-area-card__metric--negative strong { color: #b6404b; }
    .oa-methodology { padding: 17px; gap: 10px; border-radius: 14px; }
    .oa-methodology__icon { width: 32px; height: 32px; }
    .oa-json > summary { padding: 15px; }
    .oa-json > summary small { display: none; }
  }
  @media (max-width: 380px) {
    .oa-main { padding-inline: 11px; }
    .oa-hero { padding: 20px 16px; }
    .oa-kpi { padding: 13px 11px; }
    .oa-kpi__value { font-size: 20px; }
    .oa-panel { padding: 17px 12px; }
    .oa-quartile strong { font-size: 12px; }
    .oa-run__item > strong { max-width: 66%; }
  }
  @media (prefers-reduced-motion: reduce) {
    .owj-analytics *, .owj-analytics *::before, .owj-analytics *::after {
      transition-duration: .01ms !important;
      animation-duration: .01ms !important;
      scroll-behavior: auto !important;
    }
  }
`,Re={"top-tier":`درجه یک`,"strong-buy":`خرید قوی`,solid:`مطمئن`,watchlist:`لیست پایش`,hold:`نگهداری`,avoid:`اجتناب`,review:`بازبینی`,excellent:`عالی`,good:`خوب`,medium:`متوسط`,low:`پایین`},ze={"missing-price":`قیمت ناموجود`,"missing-area":`متراژ ناموجود`,"missing-location":`موقعیت ناموجود`,"outlier-price":`قیمت پرت`,"outlier-area":`متراژ پرت`,"invalid-coordinates":`مختصات نامعتبر`,duplicate:`تکراری`,"insufficient-data":`داده ناکافی`},Be={floor:`طبقه`,totalFloors:`تعداد طبقات`,rooms:`اتاق‌ها`,constructionYear:`سال ساخت`,buildingAge:`سن بنا`,unitsPerFloor:`واحد در طبقه`,elevator:`آسانسور`,parking:`پارکینگ`,warehouse:`انباری`,balcony:`بالکن`};function Ve(e,t){return t[e]||e.replaceAll(`-`,` `)}function He(e){return e==null?`—`:String(e).replace(/[0-9\u0660-\u0669]/g,e=>{let t=e.charCodeAt(0);return String.fromCharCode(1776+(t>=1632?t-1632:t-48))})}function Ue({label:e,value:t,detail:n,tone:r=`cyan`}){let i={cyan:`database`,green:`check`,orange:`activity`,violet:`trend`}[r]||`database`;return(0,p.jsxs)(`article`,{className:`oa-kpi oa-kpi--${r}`,children:[(0,p.jsxs)(`div`,{className:`oa-kpi__top`,children:[(0,p.jsx)(`span`,{className:`oa-kpi__label`,children:e}),(0,p.jsx)(`span`,{className:`oa-kpi__mark`,"aria-hidden":`true`,children:(0,p.jsx)(E,{name:i,size:16})})]}),(0,p.jsx)(`strong`,{className:`oa-kpi__value`,children:He(t)}),(0,p.jsx)(`small`,{className:`oa-kpi__detail`,children:He(n)}),(0,p.jsx)(`span`,{className:`oa-kpi__rule`,"aria-hidden":`true`})]})}function We({title:e,values:t,dict:n}){let r=Object.entries(t||{}).sort((e,t)=>t[1]-e[1]),i=Math.max(...r.map(([,e])=>e),1);return(0,p.jsxs)(`div`,{className:`oa-dictionary`,children:[(0,p.jsx)(`h3`,{children:e}),(0,p.jsxs)(`div`,{className:`oa-dictionary__items`,children:[r.map(([e,t])=>(0,p.jsxs)(`div`,{className:`oa-dictionary__row`,children:[(0,p.jsxs)(`div`,{className:`oa-dictionary__line`,children:[(0,p.jsx)(`span`,{children:Ve(e,n||{})}),(0,p.jsx)(`strong`,{children:v(t)})]}),(0,p.jsx)(`div`,{className:`oa-dictionary__track`,"aria-hidden":`true`,children:(0,p.jsx)(`span`,{className:`oa-dictionary__fill`,style:{width:`${t/i*100}%`}})})]},e)),!r.length&&(0,p.jsx)(`div`,{className:`oa-empty`,children:`موردی ثبت نشده است.`})]})]})}function Ge({children:e,wide:t=!1,full:n=!1}){return(0,p.jsx)(`section`,{className:`oa-panel${n?` oa-panel--full`:t?` oa-panel--wide`:``}`,children:e})}function Ke({kicker:e,title:t,description:n}){return(0,p.jsxs)(`div`,{className:`oa-panel__head`,children:[(0,p.jsx)(`span`,{className:`oa-panel__eyebrow`,children:e}),(0,p.jsx)(`h2`,{className:`oa-panel__title`,children:t}),n&&(0,p.jsx)(`p`,{className:`oa-panel__desc`,children:n})]})}var qe=[[`name`,`محله`],[`count`,`آگهی`],[`averageScore`,`میانگین امتیاز`],[`property`,`میانگین ملک`],[`risk`,`میانگین ریسک`],[`highRisk`,`ریسک بالا`],[`confidence`,`میانگین اطمینان`],[`price`,`میانگین قیمت / متر`],[`discount`,`میانگین تخفیف مدل`]];function Je(){let[e,t]=(0,f.useState)(null),[n,r]=(0,f.useState)(``),i=se(e?.neighborhoods||[],{searchText:e=>e.name,columns:{name:e=>e.name,count:e=>e.count,averageScore:e=>e.averageScore,property:e=>e.averagePropertyQuality,risk:e=>e.averageRisk,highRisk:e=>e.highRiskCount,confidence:e=>e.averageConfidence,price:e=>e.averageAskingPricePerMeter,discount:e=>e.averageModelDiscountPct},initialSort:{key:`count`,direction:`desc`}});if((0,f.useEffect)(()=>{let e=new AbortController;return fetch(`/score-analytics-data`,{signal:e.signal}).then(async e=>{if(!e.ok)throw Error(`Server returned HTTP ${e.status}`);return e.json()}).then(t).catch(e=>{e.name!==`AbortError`&&r(e.message)}),()=>e.abort()},[]),!e&&!n)return(0,p.jsx)(ie,{message:`در حال ساخت نمای کلی امتیازدهی`});if(n)return(0,p.jsx)(ae,{message:n});let a=e.valuationValidation||e.modelValidation,o=e.cleaning,s=Math.max(...e.distributions.histogram.map(e=>e.count),1),c={"top-tier":Ie.green,excellent:Ie.green,"strong-buy":Ie.secondaryDark,good:Ie.secondaryDark,solid:Ie.primary,medium:Ie.primary,watchlist:Ie.orange,hold:Ie.orange,avoid:Ie.red,low:Ie.red,review:Ie.red};return(0,p.jsxs)(`div`,{className:`owj-analytics`,dir:`rtl`,children:[(0,p.jsx)(`style`,{children:Le}),(0,p.jsx)(ne,{active:`analytics`}),(0,p.jsxs)(`main`,{className:`oa-main`,id:`main-content`,children:[(0,p.jsxs)(`header`,{className:`oa-hero`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsxs)(`span`,{className:`oa-hero__eyebrow`,children:[(0,p.jsx)(E,{name:`trend`,size:16}),` تحلیل هوشمند بازار ·`,` `,He(e.scoringVersion)]}),(0,p.jsxs)(`h1`,{children:[`تحلیل `,(0,p.jsx)(`span`,{children:`امتیازدهی آگهی‌ها`})]}),(0,p.jsxs)(`p`,{className:`oa-hero__desc`,children:[`عملکرد مدل را در تمام آگهی‌ها بررسی کنید؛ از دقت برآورد و توزیع امتیازها تا کیفیت اطلاعات، مختصات و مقایسه محله‌ها. این تحلیل بر اساس`,(0,p.jsxs)(`strong`,{children:[` `,v(e.total),` `]}),` آگهی امتیازدهی‌شده است.`]})]}),(0,p.jsxs)(`aside`,{className:`oa-run`,"aria-label":`جزئیات اجرای امتیازدهی`,children:[(0,p.jsxs)(`div`,{className:`oa-run__title`,children:[(0,p.jsx)(E,{name:`database`,size:17}),` جزئیات گزارش`]}),(0,p.jsxs)(`div`,{className:`oa-run__item`,children:[(0,p.jsx)(`span`,{children:`آخرین بروزرسانی`}),(0,p.jsx)(`strong`,{children:S(e.generatedAt)})]}),(0,p.jsxs)(`div`,{className:`oa-run__item`,children:[(0,p.jsx)(`span`,{children:`روش اعتبارسنجی`}),(0,p.jsx)(`strong`,{className:`oa-run__method`,children:He(a.method?.replaceAll(`-`,` `)||`—`)})]})]})]}),(0,p.jsxs)(`section`,{className:`oa-kpis`,"aria-label":`شاخص‌های اصلی امتیازدهی`,children:[(0,p.jsx)(Ue,{label:`آگهی‌های امتیازدهی‌شده`,value:v(e.total),detail:`${v(o.rejectedCount)} مورد قبل از امتیازدهی رد شد`}),(0,p.jsx)(Ue,{label:`خطای میانه ترکیبی`,value:b(a.medianAbsolutePercentageError),detail:`مدل پایه: ${b(e.modelValidation.medianAbsolutePercentageError)}`,tone:`orange`}),(0,p.jsx)(Ue,{label:`در محدوده ±۲۰٪`,value:b(a.within20Percent),detail:`${b(a.within30Percent)} در محدوده ±۳۰٪ قرار دارند`,tone:`green`}),(0,p.jsx)(Ue,{label:`R² مقیاس لگاریتمی`,value:a.rSquaredLog,detail:`${v(e.distributions.highRiskCount)} آگهی با ریسک بالا علامت‌گذاری شد`,tone:`violet`})]}),(0,p.jsxs)(`div`,{className:`oa-grid`,children:[(0,p.jsxs)(Ge,{wide:!0,children:[(0,p.jsx)(Ke,{kicker:`نگاه به توزیع`,title:`امتیازهای پیشنهاد نهایی`,description:`این نمودار نشان می‌دهد چه تعداد آگهی در هر بازه امتیازی قرار گرفته‌اند؛ پراکندگی امتیازها به تحلیل رفتار مدل کمک می‌کند.`}),(0,p.jsx)(`div`,{className:`oa-chart-shell`,role:`group`,"aria-label":`هیستوگرام امتیاز آگهی‌ها؛ مقادیر روی هر ستون نمایش داده شده‌اند`,children:(0,p.jsx)(`div`,{className:`oa-histogram`,children:e.distributions.histogram.map(e=>{let t=Math.max(2,e.count/s*100);return(0,p.jsxs)(`div`,{className:`oa-histogram__bin`,title:`${He(e.label)}: ${v(e.count)} آگهی`,children:[(0,p.jsx)(`span`,{className:`oa-histogram__count`,children:v(e.count)}),(0,p.jsx)(`div`,{className:`oa-histogram__track`,children:(0,p.jsx)(`i`,{className:`oa-histogram__bar`,style:{height:`${t}%`}})}),(0,p.jsx)(`small`,{className:`oa-histogram__label`,children:He(e.label)})]},e.label)})})}),(0,p.jsx)(`div`,{className:`oa-quartiles`,"aria-label":`شاخص‌های خلاصه توزیع امتیاز`,children:[[`حداقل`,e.distributions.score.minimum],[`P۱۰`,e.distributions.score.p10],[`میانه`,e.distributions.score.median],[`P۹۰`,e.distributions.score.p90],[`حداکثر`,e.distributions.score.maximum]].map(([e,t],n)=>(0,p.jsxs)(`div`,{className:`oa-quartile${n===2?` oa-quartile--median`:``}`,children:[(0,p.jsx)(`span`,{children:e}),(0,p.jsx)(`strong`,{children:He(t)})]},e))})]}),(0,p.jsxs)(Ge,{children:[(0,p.jsx)(Ke,{kicker:`تفکیک نتایج`,title:`محدوده‌های امتیاز`,description:`سهم هر دسته از آگهی‌های ارزیابی‌شده`}),(0,p.jsx)(`div`,{className:`oa-bandlist`,children:e.distributions.bands.map(e=>{let t=c[e.key]||Ie.primary;return(0,p.jsxs)(`div`,{className:`oa-band`,style:{"--band":t},children:[(0,p.jsxs)(`div`,{className:`oa-band__top`,children:[(0,p.jsx)(`strong`,{className:`oa-band__label`,children:Re[e.key]||e.label}),(0,p.jsx)(`strong`,{className:`oa-band__count`,children:v(e.count)})]}),(0,p.jsxs)(`div`,{className:`oa-band__meta`,children:[(0,p.jsxs)(`span`,{children:[`از `,He(e.minimum),` تا`,` `,He(e.maximum)]}),(0,p.jsx)(`span`,{children:b(e.percentage)})]}),(0,p.jsx)(`div`,{className:`oa-band__track`,"aria-label":`${b(e.percentage)} از کل`,children:(0,p.jsx)(`i`,{className:`oa-band__fill`,style:{width:`${e.percentage}%`}})})]},e.key)})})]}),(0,p.jsxs)(Ge,{children:[(0,p.jsx)(Ke,{kicker:`دقت داده‌های مکانی`,title:`کیفیت مختصات`,description:`مقایسه موقعیت‌های دقیق با موقعیت‌های تقریبی`}),(0,p.jsxs)(`div`,{className:`oa-coordinate`,children:[(0,p.jsx)(`div`,{className:`oa-donut`,style:{background:`conic-gradient(${Ie.secondary} 0 ${e.coordinates.exactPercentage}%, #edaa71 ${e.coordinates.exactPercentage}% 100%)`},role:`img`,"aria-label":`${b(e.coordinates.exactPercentage)} از مختصات دقیق هستند`,children:(0,p.jsxs)(`div`,{className:`oa-donut__inside`,children:[(0,p.jsx)(`strong`,{children:b(e.coordinates.exactPercentage)}),(0,p.jsx)(`span`,{children:`مختصات دقیق`})]})}),(0,p.jsxs)(`div`,{className:`oa-legend`,children:[(0,p.jsxs)(`div`,{className:`oa-legend__row`,children:[(0,p.jsx)(`span`,{className:`oa-legend__dot`,style:{background:Ie.secondary}}),(0,p.jsx)(`span`,{children:`موقعیت دقیق`}),(0,p.jsx)(`strong`,{children:v(e.coordinates.exact)})]}),(0,p.jsxs)(`div`,{className:`oa-legend__row`,children:[(0,p.jsx)(`span`,{className:`oa-legend__dot`,style:{background:`#edaa71`}}),(0,p.jsx)(`span`,{children:`موقعیت تقریبی`}),(0,p.jsx)(`strong`,{children:v(e.coordinates.approximate)})]})]})]})]}),(0,p.jsxs)(Ge,{wide:!0,children:[(0,p.jsx)(Ke,{kicker:`کیفیت ورودی`,title:`مسیر پاک‌سازی آگهی‌ها`,description:`رکوردهای ردشده امتیاز نمی‌گیرند. اطلاعات اختیاریِ ناموجود با مقادیر جایگزین تکمیل می‌شوند و اطمینان به کیفیت داده را کاهش می‌دهند.`}),(0,p.jsxs)(`div`,{className:`oa-clean-flow`,"aria-label":`خلاصه مراحل پاک‌سازی داده‌ها`,children:[(0,p.jsxs)(`div`,{className:`oa-clean-step`,children:[(0,p.jsx)(`span`,{children:`ورودی خام`}),(0,p.jsx)(`strong`,{children:v(o.inputCount)})]}),(0,p.jsxs)(`div`,{className:`oa-clean-step oa-clean-step--accepted`,children:[(0,p.jsx)(`span`,{children:`پذیرفته‌شده`}),(0,p.jsx)(`strong`,{children:v(o.acceptedCount)})]}),(0,p.jsxs)(`div`,{className:`oa-clean-step oa-clean-step--scored`,children:[(0,p.jsx)(`span`,{children:`امتیازدهی‌شده`}),(0,p.jsx)(`strong`,{children:v(e.total)})]}),(0,p.jsxs)(`div`,{className:`oa-clean-step oa-clean-step--rejected`,children:[(0,p.jsx)(`span`,{children:`ردشده`}),(0,p.jsx)(`strong`,{children:v(o.rejectedCount)})]})]}),(0,p.jsxs)(`div`,{className:`oa-dictionaries`,children:[(0,p.jsx)(We,{title:`دلایل رد شدن`,values:o.rejectionCounts,dict:ze}),(0,p.jsx)(We,{title:`جایگزینی اطلاعات · ${v(o.recordsWithImputation)} رکورد`,values:o.imputationCounts,dict:Be})]})]}),(0,p.jsxs)(Ge,{full:!0,children:[(0,p.jsxs)(`div`,{className:`oa-neighborhood-head`,children:[(0,p.jsx)(Ke,{kicker:`تحلیل محلی`,title:`مقایسه عملکرد در محله‌ها`,description:`فقط محله‌هایی با حداقل پنج آگهی پذیرفته‌شده نمایش داده می‌شوند. میانگین‌ها نماینده نمونه جمع‌آوری‌شده‌اند، نه همه معاملات تهران.`}),(0,p.jsxs)(`span`,{className:`oa-neighborhood-count`,children:[(0,p.jsx)(E,{name:`location`,size:14}),` `,v(i.rows.length),` محله`]})]}),(0,p.jsx)(`div`,{className:`oa-tools`,children:(0,p.jsx)(ce,{query:i.query,setQuery:i.setQuery,count:i.rows.length,placeholder:`جستجوی محله…`})}),(0,p.jsx)(`div`,{className:`oa-table-scroll`,role:`region`,"aria-label":`جدول قابل پیمایش نتایج محله‌ها`,tabIndex:0,children:(0,p.jsxs)(`table`,{className:`oa-table`,children:[(0,p.jsx)(`thead`,{children:(0,p.jsx)(`tr`,{children:qe.map(([e,t])=>(0,p.jsx)(le,{column:e,sort:i.sort,onSort:i.changeSort,style:{textAlign:`right`,whiteSpace:`nowrap`},children:t},e))})}),(0,p.jsxs)(`tbody`,{children:[!i.rows.length&&(0,p.jsx)(`tr`,{children:(0,p.jsx)(`td`,{colSpan:`9`,className:`oa-empty`,children:`نتیجه‌ای مطابق جستجو پیدا نشد.`})}),i.rows.map(e=>(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{children:(0,p.jsx)(`strong`,{children:e.name})}),(0,p.jsx)(`td`,{children:v(e.count)}),(0,p.jsx)(`td`,{children:(0,p.jsx)(`span`,{className:`oa-score-pill ${e.averageScore>=80?`oa-score-pill--good`:e.averageScore>=55?`oa-score-pill--medium`:`oa-score-pill--low`}`,children:He(e.averageScore)})}),(0,p.jsx)(`td`,{children:v(e.averagePropertyQuality)}),(0,p.jsx)(`td`,{children:v(e.averageRisk)}),(0,p.jsx)(`td`,{className:e.highRiskCount>0?`oa-table__risk`:``,children:v(e.highRiskCount)}),(0,p.jsx)(`td`,{children:b(e.averageConfidence)}),(0,p.jsx)(`td`,{className:`oa-table__value`,children:x(e.averageAskingPricePerMeter)}),(0,p.jsx)(`td`,{className:e.averageModelDiscountPct>=0?`oa-discount--positive`:`oa-discount--negative`,children:(0,p.jsx)(`bdi`,{children:b(e.averageModelDiscountPct,!0)})})]},e.name))]})]})}),(0,p.jsxs)(`div`,{className:`oa-mobile-sort`,"aria-label":`مرتب‌سازی نتایج محله‌ها در موبایل`,children:[(0,p.jsxs)(`label`,{children:[(0,p.jsx)(`span`,{children:`مرتب‌سازی`}),(0,p.jsx)(`select`,{"aria-label":`انتخاب معیار مرتب‌سازی`,value:i.sort.key,onChange:e=>i.changeSort(e.target.value),children:qe.map(([e,t])=>(0,p.jsx)(`option`,{value:e,children:t},e))})]}),(0,p.jsx)(`button`,{type:`button`,onClick:()=>i.changeSort(i.sort.key),"aria-label":`تغییر جهت مرتب‌سازی`,children:i.sort.direction===`desc`?`نزولی ↓`:`صعودی ↑`})]}),(0,p.jsxs)(`div`,{className:`oa-mobile-areas`,"aria-label":`کارت‌های اطلاعات محله‌ها`,children:[!i.rows.length&&(0,p.jsx)(`div`,{className:`oa-empty`,children:`نتیجه‌ای مطابق جستجو پیدا نشد.`}),i.rows.map(e=>(0,p.jsxs)(`article`,{className:`oa-area-card`,children:[(0,p.jsxs)(`div`,{className:`oa-area-card__head`,children:[(0,p.jsx)(`h3`,{className:`oa-area-card__name`,dir:`auto`,children:e.name}),(0,p.jsxs)(`span`,{className:`oa-area-card__badge`,children:[v(e.count),` آگهی`]})]}),(0,p.jsxs)(`div`,{className:`oa-area-card__metrics`,children:[(0,p.jsxs)(`div`,{className:`oa-area-card__metric`,children:[(0,p.jsx)(`span`,{children:`میانگین امتیاز`}),(0,p.jsx)(`strong`,{children:He(e.averageScore)})]}),(0,p.jsxs)(`div`,{className:`oa-area-card__metric`,children:[(0,p.jsx)(`span`,{children:`کیفیت ملک`}),(0,p.jsx)(`strong`,{children:v(e.averagePropertyQuality)})]}),(0,p.jsxs)(`div`,{className:`oa-area-card__metric`,children:[(0,p.jsx)(`span`,{children:`میانگین ریسک`}),(0,p.jsx)(`strong`,{children:v(e.averageRisk)})]}),(0,p.jsxs)(`div`,{className:`oa-area-card__metric`,children:[(0,p.jsx)(`span`,{children:`آگهی با ریسک بالا`}),(0,p.jsx)(`strong`,{children:v(e.highRiskCount)})]}),(0,p.jsxs)(`div`,{className:`oa-area-card__metric`,children:[(0,p.jsx)(`span`,{children:`میانگین اطمینان`}),(0,p.jsx)(`strong`,{children:b(e.averageConfidence)})]}),(0,p.jsxs)(`div`,{className:`oa-area-card__metric ${e.averageModelDiscountPct>=0?`oa-area-card__metric--positive`:`oa-area-card__metric--negative`}`,children:[(0,p.jsx)(`span`,{children:`میانگین تخفیف مدل`}),(0,p.jsx)(`strong`,{children:b(e.averageModelDiscountPct,!0)})]}),(0,p.jsxs)(`div`,{className:`oa-area-card__metric oa-area-card__metric--wide`,children:[(0,p.jsx)(`span`,{children:`میانگین قیمت هر متر`}),(0,p.jsx)(`strong`,{children:x(e.averageAskingPricePerMeter)})]})]})]},e.name))]})]})]}),(0,p.jsxs)(`section`,{className:`oa-methodology`,"aria-label":`روش‌شناسی و محدودیت‌های این تحلیل`,children:[(0,p.jsx)(`span`,{className:`oa-methodology__icon`,"aria-hidden":`true`,children:(0,p.jsx)(E,{name:`alert`,size:18})}),(0,p.jsxs)(`div`,{style:{minWidth:0,flex:1},children:[(0,p.jsx)(`h2`,{children:`این آمار را چطور تفسیر کنیم؟`}),(0,p.jsx)(`p`,{children:e.methodology.limitations.join(` `)}),(0,p.jsx)(`code`,{dir:`ltr`,children:He(e.methodology.recommendationFormula)})]})]}),(0,p.jsxs)(`details`,{className:`oa-json`,children:[(0,p.jsxs)(`summary`,{children:[(0,p.jsxs)(`span`,{children:[(0,p.jsx)(E,{name:`database`,size:18}),` داده خام تحلیل امتیازدهی (JSON)`]}),(0,p.jsx)(`small`,{children:`مشاهده پاسخ اصلی API`})]}),(0,p.jsx)(`pre`,{children:JSON.stringify(e,null,2)})]})]}),(0,p.jsx)(re,{})]})}var Ye={0:`کشور`,1:`استان`,2:`شهر`,4:`محله / منطقه`};function Xe(e){return String(e??``).replace(/[0-9]/g,e=>`۰۱۲۳۴۵۶۷۸۹`[Number(e)])}var Ze=`
  .owj-location-page {
    min-height: 100svh;
    width: 100%;
    min-width: 0;
    overflow-x: clip;
    background: #f7f8fa;
    color: #202127;
    direction: rtl;
    font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
    font-size: 14px;
    line-height: 1.8;
    -webkit-font-smoothing: antialiased;
  }
  .owj-location-page *,
  .owj-location-page *::before,
  .owj-location-page *::after { box-sizing: border-box; }
  .owj-location-page a { color: inherit; text-decoration: none; -webkit-tap-highlight-color: transparent; }
  .owj-location-page button,
  .owj-location-page input { font: inherit; }
  .owj-location-page a:focus-visible,
  .owj-location-page input:focus-visible,
  .owj-location-page button:focus-visible {
    outline: 3px solid rgba(102,48,141,.28);
    outline-offset: 3px;
  }
  .owj-location-page .location-main {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
    padding: 30px 28px 90px;
    min-width: 0;
  }

  /* Breadcrumb trail */
  .owj-location-page .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 5px;
    max-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    padding: 0 1px 12px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #6b707b;
  }
  .owj-location-page .breadcrumbs::-webkit-scrollbar { display: none; }
  .owj-location-page .breadcrumbs > span {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    flex: none;
  }
  .owj-location-page .breadcrumbs b {
    color: #a2a6b0;
    font-size: 20px;
    font-weight: 400;
    line-height: 1;
  }
  .owj-location-page .breadcrumbs a {
    padding: 3px 5px;
    border-radius: 7px;
    transition: color .18s ease, background .18s ease;
  }
  .owj-location-page .breadcrumbs a:hover {
    color: #66308d;
    background: #f4eef8;
  }
  .owj-location-page .breadcrumbs a[aria-current="page"] {
    color: #202127;
    font-weight: 800;
  }

  /* Hero */
  .owj-location-page .location-hero {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 26px;
    min-width: 0;
    padding: 33px 36px;
    background: #fff;
    border: 1px solid #eceef1;
    border-radius: 22px;
    box-shadow: 0 4px 20px rgba(24,31,41,.025);
    overflow: hidden;
    margin: 0 0 19px;
  }
  .owj-location-page .location-hero::before {
    content: "";
    position: absolute;
    top: 32px;
    right: 0;
    width: 4px;
    height: 57px;
    border-radius: 4px 0 0 4px;
    background: #66308d;
  }
  .owj-location-page .location-hero > div {
    flex: 1;
    min-width: 0;
  }
  .owj-location-page .location-kicker {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 10px;
    color: #66308d;
    font-size: 12px;
    font-weight: 800;
  }
  .owj-location-page .location-kicker svg { color: #66308d; }
  .owj-location-page .location-hero h1 {
    margin: 0 0 9px;
    font-size: clamp(27px, 3.4vw, 40px);
    letter-spacing: -.4px;
    line-height: 1.45;
    font-weight: 900;
    color: #17191f;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-hero p {
    margin: 0;
    max-width: 580px;
    color: #666b75;
    font-size: 13px;
    line-height: 2;
  }
  .owj-location-page .tehran-shortcut {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    flex-shrink: 0;
    min-height: 46px;
    padding: 10px 15px;
    border-radius: 12px;
    border: 1px solid #e9daef;
    background: #f7f2fa;
    color: #66308d;
    font-size: 12px;
    font-weight: 800;
    transition: border-color .18s ease, background .18s ease, transform .18s ease;
  }
  .owj-location-page .tehran-shortcut:hover {
    background: #f1e8f6;
    border-color: #d8c1e6;
    transform: translateY(-1px);
  }
  .owj-location-page .tehran-shortcut svg { transform: scaleX(-1); }

  /* Four market summary cards */
  .owj-location-page .location-stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 13px;
    margin: 0 0 18px;
  }
  .owj-location-page .location-stat {
    min-width: 0;
    min-height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 13px;
    padding: 22px;
    background: #fff;
    border: 1px solid #eceef1;
    border-radius: 18px;
    box-shadow: 0 2px 14px rgba(24,31,41,.02);
  }
  .owj-location-page .location-stat > span {
    color: #6b707b;
    font-size: 12px;
    font-weight: 600;
  }
  .owj-location-page .location-stat strong {
    color: #17191f;
    font-size: clamp(19px, 1.9vw, 26px);
    line-height: 1.65;
    font-weight: 900;
    letter-spacing: -.25px;
    overflow-wrap: anywhere;
    font-variant-numeric: tabular-nums;
  }

  /* Score distribution */
  .owj-location-page .score-distribution {
    padding: 23px 24px 20px;
    background: #fff;
    border: 1px solid #eceef1;
    border-radius: 18px;
    margin-bottom: 38px;
  }
  .owj-location-page .score-distribution__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 17px;
  }
  .owj-location-page .score-distribution__head h2 {
    font-size: 14px;
    line-height: 1.6;
    color: #252830;
    margin: 0;
    font-weight: 800;
  }
  .owj-location-page .score-distribution__head small {
    font-size: 11px;
    color: #858994;
  }
  .owj-location-page .score-distribution__bar {
    width: 100%;
    min-height: 13px;
    display: flex;
    direction: rtl;
    overflow: hidden;
    gap: 0;
    background: #edeff2;
    border-radius: 99px;
  }
  .owj-location-page .score-distribution__bar span {
    display: block;
    min-height: 13px;
    flex: none;
    transition: width .4s ease;
  }
  .owj-location-page .score-distribution__legend {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 11px;
    margin-top: 18px;
  }
  .owj-location-page .score-distribution__legend > span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 7px;
    min-width: 0;
    color: #5e626d;
    font-size: 11px;
    line-height: 1.7;
    font-weight: 600;
  }
  .owj-location-page .score-distribution__legend i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    flex: none;
  }

  /* Section headings and controls */
  .owj-location-page .location-section { margin: 0 0 38px; min-width: 0; }
  .owj-location-page .location-section__head {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 16px 24px;
    min-width: 0;
    margin: 0 0 18px;
  }
  .owj-location-page .location-section__head > div:first-child { min-width: 0; }
  .owj-location-page .location-section__head > div:first-child > span {
    display: block;
    font-size: 12px;
    font-weight: 800;
    color: #087a6e;
    margin-bottom: 3px;
  }
  .owj-location-page .location-section__head h2 {
    margin: 0;
    font-size: clamp(19px, 2.3vw, 25px);
    color: #17191f;
    font-weight: 900;
    line-height: 1.55;
  }
  .owj-location-page .location-section__head > small {
    flex: none;
    font-size: 12px;
    color: #767b85;
    line-height: 1.8;
  }
  .owj-location-page .location-search {
    width: min(350px, 100%);
    min-height: 49px;
    flex: none;
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 0 14px;
    color: #767c87;
    background: #fff;
    border: 1px solid #dde0e6;
    border-radius: 13px;
    transition: border-color .18s ease, box-shadow .18s ease;
    cursor: text;
  }
  .owj-location-page .location-search:focus-within {
    border-color: #ac89c5;
    box-shadow: 0 0 0 3px rgba(102,48,141,.08);
  }
  .owj-location-page .location-search input {
    width: 100%;
    min-width: 0;
    min-height: 45px;
    border: 0;
    background: none;
    outline: none;
    box-shadow: none;
    color: #202127;
    font-size: 16px;
    direction: rtl;
  }
  .owj-location-page .location-search input::placeholder {
    opacity: 1;
    color: #8b909a;
    font-size: 13px;
  }
  .owj-location-page .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  /* Navigable location cards */
  .owj-location-page .place-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 13px;
  }
  .owj-location-page .place-card {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
    min-height: 187px;
    padding: 0;
    background: #fff;
    border: 1px solid #e9ebef;
    border-radius: 17px;
    box-shadow: 0 2px 12px rgba(24,31,41,.018);
    transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
  }
  .owj-location-page .place-card__link {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    padding: 20px 22px 18px;
  }
  .owj-location-page .place-card:hover {
    transform: translateY(-2px);
    border-color: #d9c8e4;
    box-shadow: 0 8px 24px rgba(27,28,37,.055);
  }
  .owj-location-page .place-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 10px;
  }
  .owj-location-page .place-card__type {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #6b707b;
    font-size: 11px;
    font-weight: 700;
  }
  .owj-location-page .place-card__type svg { color: #82569f; }
  .owj-location-page .place-card__arrow {
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    background: #f5f5f8;
    color: #7c828e;
    border-radius: 9px;
    flex: none;
    transform: scaleX(-1);
    transition: background .18s ease, color .18s ease;
  }
  .owj-location-page .place-card:hover .place-card__arrow {
    background: #f4eef8;
    color: #66308d;
  }
  .owj-location-page .place-card h3 {
    font-size: 18px;
    line-height: 1.5;
    font-weight: 800;
    color: #202127;
    margin: 0;
    overflow-wrap: anywhere;
  }
  .owj-location-page .place-card__slug {
    font-size: 11px;
    font-weight: 500;
    color: #9499a3;
    text-align: right;
    max-width: 100%;
    direction: ltr;
    unicode-bidi: plaintext;
    overflow-wrap: anywhere;
    margin-top: 4px;
  }
  .owj-location-page .place-card__bottom {
    display: flex;
    align-items: end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    border-top: 1px solid #f0f0f3;
    margin-top: auto;
    padding-top: 14px;
    min-width: 0;
  }
  .owj-location-page .place-card__count {
    display: inline-flex;
    align-items: baseline;
    gap: 5px;
    white-space: nowrap;
  }
  .owj-location-page .place-card__count strong {
    color: #202127;
    font-size: 18px;
    font-weight: 900;
    line-height: 1.4;
  }
  .owj-location-page .place-card__count span {
    color: #727681;
    font-size: 11px;
    font-weight: 600;
  }
  .owj-location-page .place-card__price {
    display: inline-block;
    color: #5e646e;
    font-size: 11px;
    line-height: 1.7;
    overflow-wrap: anywhere;
  }
  .owj-location-page .place-card__action-wrap {
    padding: 0 22px 18px;
  }
  .owj-location-page .place-card__crawl-button {
    width: 100%;
    min-height: 44px;
    padding: 8px 12px;
    border: 1px solid #e1d2ea;
    border-radius: 11px;
    background: #f7f2fa;
    color: #66308d;
    font: inherit;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    transition: background .18s ease, border-color .18s ease, color .18s ease;
  }
  .owj-location-page .place-card__crawl-button:hover:not(:disabled) {
    background: #efe4f5;
    border-color: #cdb3dc;
  }
  .owj-location-page .place-card__crawl-button:disabled {
    cursor: wait;
    opacity: .72;
  }
  .owj-location-page .place-card__job-status {
    display: block;
    min-height: 24px;
    margin-top: 7px;
    color: #646975;
    font-size: 11px;
    line-height: 1.8;
  }
  .owj-location-page .place-card__job-status--error { color: #a23a45; }
  .owj-location-page .place-card__job-status--success { color: #167665; }

  /* Listing list */
  .owj-location-page .location-listings {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
  }
  .owj-location-page .location-listing {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, .85fr) 65px;
    align-items: center;
    gap: 14px 22px;
    min-width: 0;
    min-height: 108px;
    padding: 19px 22px;
    background: #fff;
    border: 1px solid #e9ebef;
    border-radius: 16px;
    transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
  }
  .owj-location-page .location-listing:hover {
    border-color: #d9c8e4;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(27,28,37,.04);
  }
  .owj-location-page .location-listing > div { min-width: 0; }
  .owj-location-page .location-listing__main h3 {
    margin: 0 0 8px;
    color: #202127;
    font-size: 14px;
    font-weight: 800;
    line-height: 1.7;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-listing__main p {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    margin: 0;
    color: #747985;
    font-size: 12px;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-listing__main p svg { color: #9da1a9; }
  .owj-location-page .location-listing__prices {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
    min-width: 0;
  }
  .owj-location-page .location-listing__prices strong {
    font-size: 16px;
    font-weight: 900;
    color: #202127;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-listing__prices span {
    font-size: 12px;
    color: #777c87;
    line-height: 1.75;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-listing__score-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .owj-location-page .location-listing__score-wrap > span {
    font-size: 10px;
    font-weight: 600;
    color: #7d818c;
  }
  .owj-location-page .location-score {
    display: grid;
    place-items: center;
    width: 58px;
    min-height: 48px;
    padding: 8px 4px;
    border-radius: 11px;
    background: #f4eef8;
    color: #66308d;
    font-size: 17px;
    line-height: 1.45;
    font-weight: 900;
    text-align: center;
  }

  /* Loading, API error and empty states */
  .owj-location-page .location-state,
  .owj-location-page .location-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    min-height: 142px;
    padding: 28px 20px;
    border-radius: 17px;
    background: #fff;
    border: 1px solid #edeef1;
    color: #6b707b;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    line-height: 1.9;
    overflow-wrap: anywhere;
  }
  .owj-location-page .location-state { min-height: 230px; }
  .owj-location-page .location-state--error {
    border-color: #f0d8dc;
    color: #a43442;
    background: #fffafa;
  }
  .owj-location-page .location-state__dots {
    display: inline-flex;
    gap: 6px;
    align-items: center;
  }
  .owj-location-page .location-state__dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #66308d;
    animation: owjLocationDot 1.2s ease-in-out infinite;
  }
  .owj-location-page .location-state__dots span:nth-child(2) { animation-delay: .15s; background: #01ae9b; }
  .owj-location-page .location-state__dots span:nth-child(3) { animation-delay: .3s; }
  @keyframes owjLocationDot {
    0%, 80%, 100% { transform: scale(.65); opacity: .35; }
    40% { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 1060px) {
    .owj-location-page .location-main { padding: 23px 20px 64px; }
    .owj-location-page .location-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .owj-location-page .place-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .owj-location-page .score-distribution__legend { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  @media (max-width: 700px) {
    .owj-location-page .location-main { padding: 19px 16px 52px; }
    .owj-location-page .breadcrumbs { margin-bottom: 9px; font-size: 11px; }
    .owj-location-page .location-hero {
      flex-direction: column;
      align-items: stretch;
      gap: 18px;
      padding: 23px 20px;
      border-radius: 18px;
    }
    .owj-location-page .location-hero::before { top: 23px; height: 45px; }
    .owj-location-page .location-hero h1 { font-size: 28px; }
    .owj-location-page .location-hero p { font-size: 12px; }
    .owj-location-page .tehran-shortcut { width: 100%; min-height: 46px; }
    .owj-location-page .location-stats { gap: 10px; margin-bottom: 12px; }
    .owj-location-page .location-stat { min-height: 112px; padding: 16px; border-radius: 15px; }
    .owj-location-page .location-stat strong { font-size: 19px; }
    .owj-location-page .score-distribution { padding: 18px 16px; margin-bottom: 30px; }
    .owj-location-page .score-distribution__legend { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 8px; }
    .owj-location-page .location-section { margin-bottom: 29px; }
    .owj-location-page .location-section__head { flex-direction: column; align-items: stretch; gap: 12px; }
    .owj-location-page .location-section__head h2 { font-size: 21px; }
    .owj-location-page .location-search { width: 100%; min-height: 50px; }
    .owj-location-page .place-grid { grid-template-columns: minmax(0, 1fr); gap: 10px; }
    .owj-location-page .place-card {
      min-height: 166px;
      border-radius: 15px;
    }
    .owj-location-page .place-card__link { padding: 17px 18px 16px; }
    .owj-location-page .place-card__action-wrap { padding: 0 18px 16px; }
    .owj-location-page .place-card h3 { font-size: 17px; }
    .owj-location-page .location-listings { gap: 10px; }
    .owj-location-page .location-listing {
      grid-template-columns: minmax(0, 1fr) auto;
      grid-template-areas: "main main" "price score";
      align-items: center;
      gap: 12px 14px;
      padding: 17px;
      border-radius: 15px;
    }
    .owj-location-page .location-listing__main {
      grid-area: main;
      padding-bottom: 11px;
      border-bottom: 1px solid #f0f0f3;
    }
    .owj-location-page .location-listing__prices { grid-area: price; }
    .owj-location-page .location-listing__score-wrap { grid-area: score; }
    .owj-location-page .location-listing__main h3 { margin-bottom: 5px; }
    .owj-location-page .location-listing__prices strong { font-size: 15px; }
    .owj-location-page .location-score { width: 55px; min-height: 46px; }
  }
  @media (max-width: 390px) {
    .owj-location-page .location-main { padding-inline: 12px; }
    .owj-location-page .location-stat { padding: 14px 12px; }
    .owj-location-page .location-stat > span { font-size: 11px; }
    .owj-location-page .location-stat strong { font-size: 17px; }
    .owj-location-page .score-distribution__legend > span { font-size: 10px; }
    .owj-location-page .location-listing { padding: 15px 13px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .owj-location-page .location-state__dots span { animation: none; }
    .owj-location-page .place-card,
    .owj-location-page .location-listing,
    .owj-location-page .tehran-shortcut { transition: none; }
  }
`;function Qe({label:e,value:t,accent:n=C.text}){return(0,p.jsxs)(`article`,{className:`location-stat`,children:[(0,p.jsx)(`span`,{children:e}),(0,p.jsx)(`strong`,{style:{color:n},children:t})]})}function $e({data:e,total:t}){let n=[[`strong`,`قوی`,C.green],[`promising`,`امیدبخش`,C.secondary],[`fair`,`متوسط`,C.orange],[`weak`,`ضعیف`,C.red],[`unscored`,`بدون امتیاز`,C.textMuted]];return(0,p.jsxs)(`section`,{className:`score-distribution`,"aria-label":`توزیع امتیاز آگهی‌ها`,children:[(0,p.jsxs)(`div`,{className:`score-distribution__head`,children:[(0,p.jsx)(`h2`,{children:`توزیع امتیاز آگهی‌ها`}),(0,p.jsx)(`small`,{children:`پراکندگی آگهی‌ها بر اساس امتیاز`})]}),(0,p.jsx)(`div`,{className:`score-distribution__bar`,children:n.map(([n,r,i])=>e?.[n]?(0,p.jsx)(`span`,{title:`${r}: ${v(e[n])}`,style:{width:`${e[n]/Math.max(t,1)*100}%`,background:i}},n):null)}),(0,p.jsx)(`div`,{className:`score-distribution__legend`,children:n.map(([t,n,r])=>(0,p.jsxs)(`span`,{children:[(0,p.jsx)(`i`,{style:{background:r}}),n,`: `,v(e?.[t]||0)]},t))})]})}function et({slug:e=`iran`}){T();let[t,n]=(0,f.useState)(null),[r,i]=(0,f.useState)(null),[a,o]=(0,f.useState)(``),[s,c]=(0,f.useState)({}),l=(0,f.useCallback)(async t=>{let r=await fetch(`/locations/${encodeURIComponent(e)}`,{signal:t,headers:{accept:`application/json`}});if(!r.ok)throw Error(`HTTP ${r.status}`);let a=await r.json();n(a),i(null)},[e]);(0,f.useEffect)(()=>{let e=new AbortController;return n(null),i(null),l(e.signal).catch(e=>{e.name!==`AbortError`&&i(e.message)}),()=>e.abort()},[l]);let u=(0,f.useMemo)(()=>Object.values(s).filter(e=>e.job?.jobId&&[`queued`,`starting`,`discovering`,`processing`].includes(e.job.status)).map(e=>e.job.jobId).sort(),[s]),d=u.join(`,`);(0,f.useEffect)(()=>{if(!d)return;let e=new AbortController,t=async()=>{let t=!1;await Promise.all(u.map(async n=>{try{let r=await fetch(`/area-crawl-jobs/${encodeURIComponent(n)}`,{signal:e.signal,headers:{accept:`application/json`}});if(!r.ok)return;let{job:i}=await r.json();c(e=>({...e,[i.area.id]:{job:i,error:i.status===`failed`||i.status===`stopped`?`جستجوی محله کامل نشد؛ می‌توانید دوباره تلاش کنید.`:null}})),[`completed`,`failed`,`stopped`].includes(i.status)&&(t=!0)}catch(e){e.name!==`AbortError`&&c(e=>{let t=Object.keys(e).find(t=>e[t].job?.jobId===n);return t?{...e,[t]:{...e[t],error:`وضعیت کار قابل دریافت نیست؛ دوباره تلاش می‌شود.`}}:e})}})),t&&l(e.signal).catch(()=>{})};t();let n=window.setInterval(()=>void t(),3e3);return()=>{e.abort(),window.clearInterval(n)}},[d,l]);let m=(0,f.useCallback)(async e=>{c(t=>({...t,[e.id]:{submitting:!0,job:null,error:null}}));try{let t=await fetch(`/area-crawl-jobs`,{method:`POST`,headers:{"content-type":`application/json`,accept:`application/json`},body:JSON.stringify({areaId:e.id})}),n=await t.json();if(!t.ok){let t=n.reason===`area-job-cooldown`?`این محله به‌تازگی بررسی شده است؛ برای جلوگیری از درخواست تکراری کمی بعد دوباره تلاش کنید.`:n.reason===`platform-cooldown`?`خزش به‌دلیل محدودیت منبع موقتاً متوقف است.`:`ساخت کار جستجوی محله ناموفق بود؛ دوباره تلاش کنید.`;c(r=>({...r,[e.id]:{job:n.job||null,error:t}}));return}c(t=>({...t,[e.id]:{job:n.job,error:null}}))}catch{c(t=>({...t,[e.id]:{job:null,error:`ارتباط با سرویس برقرار نشد؛ دوباره تلاش کنید.`}}))}},[]),h=(0,f.useMemo)(()=>{let e=a.trim().toLocaleLowerCase(`fa`);return(t?.children||[]).filter(t=>!e||`${t.name} ${t.slug}`.toLocaleLowerCase(`fa`).includes(e))},[t,a]);return(0,p.jsxs)(`div`,{className:`location-page owj-location-page`,dir:`rtl`,children:[(0,p.jsx)(`style`,{children:Ze}),(0,p.jsx)(ne,{active:`locations`}),(0,p.jsxs)(`main`,{className:`location-main`,children:[!t&&!r&&(0,p.jsxs)(`div`,{className:`location-state`,role:`status`,"aria-live":`polite`,children:[(0,p.jsxs)(`div`,{className:`location-state__dots`,"aria-hidden":`true`,children:[(0,p.jsx)(`span`,{}),(0,p.jsx)(`span`,{}),(0,p.jsx)(`span`,{})]}),`در حال بارگذاری سلسله‌مراتب رسمی مناطق…`]}),r&&(0,p.jsxs)(`div`,{className:`location-state location-state--error`,role:`alert`,children:[`بارگذاری ناموفق بود: `,Xe(r)]}),t&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`nav`,{className:`breadcrumbs`,"aria-label":`مسیر مکان`,children:t.breadcrumb.map((e,n)=>(0,p.jsxs)(`span`,{children:[n>0&&(0,p.jsx)(`b`,{"aria-hidden":`true`,children:`‹`}),(0,p.jsx)(`a`,{href:`/explore/${e.slug}`,"aria-current":e.id===t.node.id?`page`:void 0,children:Xe(e.name)})]},e.id))}),(0,p.jsxs)(`header`,{className:`location-hero`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsxs)(`span`,{className:`location-kicker`,children:[(0,p.jsx)(E,{name:`location`,size:17}),` `,Ye[t.node.type]]}),(0,p.jsx)(`h1`,{children:Xe(t.node.name)}),(0,p.jsx)(`p`,{children:`کاوش آگهی‌ها بر پایه سلسله‌مراتب رسمی دیوار، از استان و شهر تا محله.`})]}),t.node.slug!==`tehran`&&(0,p.jsxs)(`a`,{className:`tehran-shortcut`,href:`/explore/tehran`,children:[`رفتن مستقیم به تهران`,(0,p.jsx)(E,{name:`arrow`,size:16})]})]}),(0,p.jsxs)(`section`,{className:`location-stats`,"aria-label":`خلاصه بازار`,children:[(0,p.jsx)(Qe,{label:`تعداد آگهی`,value:v(t.summary.listingCount),accent:C.secondaryDark}),(0,p.jsx)(Qe,{label:`میانه قیمت`,value:x(t.summary.medianPrice)}),(0,p.jsx)(Qe,{label:`میانه هر متر`,value:x(t.summary.medianPricePerMeter)}),(0,p.jsx)(Qe,{label:`میانگین امتیاز`,value:t.summary.averageScore===null?`—`:v(t.summary.averageScore),accent:C.primaryPale})]}),(0,p.jsx)($e,{data:t.summary.scoreDistribution,total:t.summary.listingCount}),!!t.children.length&&(0,p.jsxs)(`section`,{className:`location-section`,children:[(0,p.jsxs)(`div`,{className:`location-section__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`سطح بعدی`}),(0,p.jsx)(`h2`,{children:t.node.type===`1`?`شهرها`:t.node.type===`2`?`محله‌ها و مناطق`:`استان‌ها`})]}),(0,p.jsxs)(`label`,{className:`location-search`,children:[(0,p.jsx)(`span`,{className:`sr-only`,children:`جستجوی مکان`}),(0,p.jsx)(E,{name:`location`,size:17}),(0,p.jsx)(`input`,{value:a,onChange:e=>o(e.target.value),placeholder:`جستجوی نام یا شناسه…`})]})]}),(0,p.jsx)(`div`,{className:`place-grid`,children:h.map(e=>{let n=s[e.id]||{},r=n.submitting||[`queued`,`starting`,`discovering`,`processing`].includes(n.job?.status),i=n.job?.status===`completed`;return(0,p.jsxs)(`article`,{className:`place-card`,children:[(0,p.jsxs)(`a`,{className:`place-card__link`,href:`/explore/${e.slug}`,children:[(0,p.jsxs)(`div`,{className:`place-card__top`,children:[(0,p.jsxs)(`span`,{className:`place-card__type`,children:[(0,p.jsx)(E,{name:`location`,size:15}),Ye[e.type]]}),(0,p.jsx)(`span`,{className:`place-card__arrow`,children:(0,p.jsx)(E,{name:`arrow`,size:16})})]}),(0,p.jsx)(`h3`,{children:Xe(e.name)}),(0,p.jsx)(`small`,{className:`place-card__slug`,children:Xe(e.slug)}),(0,p.jsxs)(`div`,{className:`place-card__bottom`,children:[(0,p.jsxs)(`div`,{className:`place-card__count`,children:[(0,p.jsx)(`strong`,{children:v(e.summary.listingCount)}),(0,p.jsx)(`span`,{children:`آگهی`})]}),(0,p.jsxs)(`small`,{className:`place-card__price`,children:[x(e.summary.medianPricePerMeter),` / متر`]})]})]}),t.node.type===`2`&&e.type===`4`&&(0,p.jsxs)(`div`,{className:`place-card__action-wrap`,children:[(0,p.jsx)(`button`,{className:`place-card__crawl-button`,type:`button`,disabled:r,"aria-busy":r?`true`:void 0,onClick:()=>void m(e),children:n.submitting?`در حال ساخت کار…`:n.job?.status===`queued`?`در صف اولویت خزش…`:r?`در حال جستجوی این محله…`:e.summary.listingCount===0?`یافتن آگهی‌های این محله`:`به‌روزرسانی این محله`}),(0,p.jsx)(`span`,{className:`place-card__job-status${n.error?` place-card__job-status--error`:i?` place-card__job-status--success`:``}`,role:n.error?`alert`:`status`,"aria-live":`polite`,children:n.error||(i?`${v(n.job.successful)} آگهی بررسی شد؛ ${v(n.job.newListings)} مورد تازه بود.`:n.job?.status===`queued`?`پس از پایان محله جاری، این محله بررسی می‌شود.`:r&&n.job?`${v(n.job.processed)} از ${v(n.job.discovered)} آگهی بررسی شده است.`:``)})]})]},e.id)})}),!h.length&&(0,p.jsx)(`div`,{className:`location-empty`,children:`مکانی مطابق جستجو پیدا نشد.`})]}),(0,p.jsxs)(`section`,{className:`location-section`,children:[(0,p.jsxs)(`div`,{className:`location-section__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`آگهی‌های منطبق`}),(0,p.jsx)(`h2`,{children:`فهرست آگهی‌ها`})]}),(0,p.jsx)(`small`,{children:`حداکثر ۲۰۰ مورد تازه در این نما`})]}),(0,p.jsxs)(`div`,{className:`location-listings`,children:[t.listings.map(e=>(0,p.jsxs)(`a`,{className:`location-listing`,href:`/listing/${e.token}`,children:[(0,p.jsxs)(`div`,{className:`location-listing__main`,children:[(0,p.jsx)(`h3`,{children:Xe(e.title)}),(0,p.jsxs)(`p`,{children:[(0,p.jsx)(E,{name:`location`,size:14}),Xe(e.resolvedLocation?.name||e.neighborhood||`مکان نامشخص`),` `,`· `,v(e.area),` متر`]})]}),(0,p.jsxs)(`div`,{className:`location-listing__prices`,children:[(0,p.jsx)(`strong`,{children:x(e.price)}),(0,p.jsxs)(`span`,{children:[x(e.pricePerMeter),` / متر`]})]}),(0,p.jsxs)(`div`,{className:`location-listing__score-wrap`,children:[(0,p.jsx)(`span`,{children:`امتیاز`}),(0,p.jsx)(`b`,{className:`location-score`,children:e.score===null?`—`:v(e.score)})]})]},e.token)),!t.listings.length&&(0,p.jsx)(`div`,{className:`location-empty`,children:`هنوز آگهی منطبق برای این مکان ذخیره نشده است.`})]})]})]})]})]})}var tt=Object.freeze({modelValue:45,nearbyValue:40,localPosition:15,valuationWeight:70,propertyWeight:20,neighborhoodWeight:10,confidenceFloor:55,riskPenalty:40,elevatorYes:8,elevatorNo:-8,parkingYes:10,parkingNo:-10,storageYes:5,storageNo:-4,balconyYes:3,balconyNo:-2,basementPenalty:-15,groundFloorPenalty:-5,floorAboveSecondPenalty:-2,noElevatorHighFloorPenalty:-4,topFloorPenalty:-4,newBuildBonus:5,agePerYearPenalty:-.45,singleUnitBonus:4,extraUnitPenalty:-1,areaPer25Sqm:1,roomPoint:1,strongThreshold:80,promisingThreshold:65,fairThreshold:45,neighborhoodScores:{}}),nt=Object.freeze({...tt,valuationWeight:100,propertyWeight:0,neighborhoodWeight:0}),rt=Object.freeze({detailed:{label:`پیشنهاد کامل`,values:tt},baseline:{label:`روش فعلی سامانه`,values:nt},conservative:{label:`سخت‌گیرانه`,values:{...tt,valuationWeight:65,propertyWeight:15,neighborhoodWeight:20,confidenceFloor:45,riskPenalty:55}},local:{label:`تأکید بر محله`,values:{...tt,modelValue:25,nearbyValue:50,localPosition:25,valuationWeight:60,propertyWeight:15,neighborhoodWeight:25}}}),it=(e,t=0,n=100)=>Math.max(t,Math.min(n,Number(e)||0)),at=(e,t,n)=>e===1?t:e===0?n:(t+n)/2;function ot(e,t){return e>=t.strongThreshold?`strong-value`:e>=t.promisingThreshold?`promising`:e>=t.fairThreshold?`fair`:`weak-value`}function st(e){let t=new Map;for(let n of e){if(!Number.isFinite(n.askingPricePerMeter))continue;let e=t.get(n.neighborhood)||[];e.push(n.askingPricePerMeter),t.set(n.neighborhood,e)}let n=[...t].map(([e,t])=>(t.sort((e,t)=>e-t),{name:e,count:t.length,medianPricePerMeter:t[Math.floor(t.length/2)]})).sort((e,t)=>e.medianPricePerMeter-t.medianPricePerMeter);return Object.fromEntries(n.map((e,t)=>{let r=20+(n.length<=1?50:t/(n.length-1)*100)*.8,i=Math.min(1,e.count/20);return[e.name,{...e,score:Math.round(50+(r-50)*i)}]}))}function ct(e,t){let n=e.property||{},r=e.amenities||{},i=Number(n.floor)||0,a={elevator:at(r.elevator,t.elevatorYes,t.elevatorNo),parking:at(r.parking,t.parkingYes,t.parkingNo),storage:at(r.storage,t.storageYes,t.storageNo),balcony:at(r.balcony,t.balconyYes,t.balconyNo),floor:i<0?t.basementPenalty:i===0?t.groundFloorPenalty:i>2?(i-2)*t.floorAboveSecondPenalty:0,noElevatorHighFloor:i>=3&&r.elevator===0?(i-2)*t.noElevatorHighFloorPenalty:0,topFloor:n.isTopFloor?t.topFloorPenalty:0,age:-(Number(n.buildingAge)||0)*Math.abs(t.agePerYearPenalty),newBuild:n.isNewBuild?t.newBuildBonus:0,unitDensity:n.isSingleUnitFloor?t.singleUnitBonus:-Math.max(0,(Number(n.unitsPerFloor)||1)-1)*Math.abs(t.extraUnitPenalty),area:((Number(n.area)||75)-75)/25*t.areaPer25Sqm,rooms:((Number(n.rooms)||2)-2)*t.roomPoint},o=Object.values(a).reduce((e,t)=>e+t,0);return{score:Math.round(it(50+o)),adjustment:Number(o.toFixed(1)),contributions:a}}function lt(e,t=tt){let n=t.modelValue+t.nearbyValue+t.localPosition,r=t.valuationWeight+t.propertyWeight+t.neighborhoodWeight,i=n||1,a=r||1,o=st(e),s=e.map(e=>{let n=(e.scores.modelValue*t.modelValue+e.scores.nearbyValue*t.nearbyValue+e.scores.localPosition*t.localPosition)/i,r=t.modelValue===45&&t.nearbyValue===40&&t.localPosition===15&&Number.isFinite(e.scores.dealValue)?e.scores.dealValue:n,s=ct(e,t),c=o[e.neighborhood]?.score??50,l=it(t.neighborhoodScores?.[e.neighborhood]??c),u=(r*t.valuationWeight+s.score*t.propertyWeight+l*t.neighborhoodWeight)/a,d=it(t.confidenceFloor)/100+e.scores.confidence/100*(1-it(t.confidenceFloor)/100),f=1-e.scores.risk/100*it(t.riskPenalty)/100,p=Math.round(it(u*d*f));return{...e,scenario:{dealValue:Math.round(r),property:s,neighborhoodScore:l,derivedNeighborhoodScore:c,composite:Number(u.toFixed(1)),confidenceGate:d,riskGate:f,recommendation:p,band:ot(p,t),rank:0}}}).sort((e,t)=>t.scenario.recommendation-e.scenario.recommendation||t.scores.confidence-e.scores.confidence||e.token.localeCompare(t.token));s.forEach((e,t)=>{e.scenario.rank=t+1});let c=Array.from({length:10},(e,t)=>({label:t===9?`90–100`:`${t*10}–${t*10+9}`,count:s.filter(e=>Math.min(9,Math.floor(e.scenario.recommendation/10))===t).length})),l=s.map(e=>e.scenario.recommendation).sort((e,t)=>e-t);return{rows:s,histogram:c,dealWeightTotal:n,overallWeightTotal:r,neighborhoods:o,summary:{average:s.length?Number((l.reduce((e,t)=>e+t,0)/s.length).toFixed(1)):0,median:l.length?l[Math.floor(l.length/2)]:0,strong:s.filter(e=>e.scenario.band===`strong-value`).length,promising:s.filter(e=>e.scenario.band===`promising`).length,fair:s.filter(e=>e.scenario.band===`fair`).length,weak:s.filter(e=>e.scenario.band===`weak-value`).length,bandChanges:s.filter(e=>e.scores.band!==e.scenario.band).length,topTenChanges:s.slice(0,10).filter(e=>e.rank>10).length}}}var ut=`
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
`,dt={"strong-value":`فرصت خرید بسیار خوب`,promising:`ارزش بررسی دارد`,fair:`قیمت نسبتاً منصفانه`,"weak-value":`ارزش خرید پایین`},ft={"strong-value":C.green,promising:C.secondaryDark,fair:C.orange,"weak-value":C.red},pt={elevator:`آسانسور`,parking:`پارکینگ`,storage:`انباری`,balcony:`بالکن`,floor:`طبقه`,noElevatorHighFloor:`طبقه بالا بدون آسانسور`,topFloor:`طبقه آخر`,age:`سن بنا`,newBuild:`نوساز بودن`,unitDensity:`تعداد واحد در طبقه`,area:`متراژ`,rooms:`تعداد اتاق`};function mt(e){return String(e??``).replace(/[0-9]/g,e=>`۰۱۲۳۴۵۶۷۸۹`[Number(e)])}function F({id:e,label:t,detail:n,value:r,onChange:i,min:a=0,max:o=100,step:s=1,unit:c=`٪`,signed:l=!1}){let u=`${l&&r>0?`+`:``}${v(r)}${c?` ${c}`:``}`,d=o===a?0:Math.max(0,Math.min(100,(Number(r)-a)/(o-a)*100));return(0,p.jsxs)(`div`,{className:`workshop-control`,children:[(0,p.jsxs)(`div`,{className:`workshop-control__head`,children:[(0,p.jsx)(`label`,{htmlFor:e,children:t}),(0,p.jsx)(`output`,{htmlFor:e,"aria-live":`off`,children:u})]}),(0,p.jsx)(`p`,{children:n}),(0,p.jsxs)(`div`,{className:`workshop-control__inputs`,children:[(0,p.jsx)(`input`,{id:e,type:`range`,min:a,max:o,step:s,value:r,style:{"--wk-fill":`${d}%`},"aria-valuetext":u,onChange:e=>i(Number(e.target.value))}),(0,p.jsx)(`input`,{"aria-label":`${t}`,type:`number`,inputMode:`decimal`,lang:`fa`,min:a,max:o,step:s,value:r,onChange:e=>i(Math.max(a,Math.min(o,Number(e.target.value))))})]})]})}function ht({label:e,value:t,detail:n,tone:r=C.secondary}){return(0,p.jsxs)(`article`,{className:`workshop-stat`,style:{"--workshop-accent":r},children:[(0,p.jsx)(`span`,{children:e}),(0,p.jsx)(`strong`,{children:t}),(0,p.jsx)(`small`,{children:n})]})}function gt({histogram:e}){let t=Math.max(1,...e.map(e=>e.count));return(0,p.jsx)(`div`,{className:`workshop-histogram`,"aria-label":`پراکندگی امتیازهای تنظیم آزمایشی`,children:e.map(e=>(0,p.jsxs)(`div`,{className:`workshop-histogram__bin`,children:[(0,p.jsx)(`b`,{children:v(e.count)}),(0,p.jsx)(`i`,{style:{height:`${Math.max(2,e.count/t*100)}%`}}),(0,p.jsx)(`span`,{dir:`ltr`,children:mt(e.label)})]},e.label))})}function _t(){let[e,t]=(0,f.useState)(null),[n,r]=(0,f.useState)(``),[i,a]=(0,f.useState)(()=>{try{return{...tt,...JSON.parse(localStorage.getItem(`owj-scoring-workshop`)||`{}`)}}catch{return{...tt}}}),[o,s]=(0,f.useState)(``),[c,l]=(0,f.useState)(``),[u,d]=(0,f.useState)(``),[m,h]=(0,f.useState)([]),[g,_]=(0,f.useState)(!1),[y,b]=(0,f.useState)(``),[w,ee]=(0,f.useState)(`settings`);(0,f.useEffect)(()=>{let e=new AbortController;return fetch(`/score-workshop-data`,{signal:e.signal}).then(e=>e.ok?e.json():Promise.reject(Error(`Server returned HTTP ${e.status}`))).then(t).catch(e=>{e.name!==`AbortError`&&r(e.message)}),()=>e.abort()},[]),(0,f.useEffect)(()=>{fetch(`/scoring-scenarios`,{headers:{accept:`application/json`}}).then(e=>e.ok?e.json():Promise.reject(Error(`HTTP ${e.status}`))).then(e=>h(e.scenarios||[])).catch(()=>{})},[]),(0,f.useEffect)(()=>{localStorage.setItem(`owj-scoring-workshop`,JSON.stringify(i))},[i]);let T=(0,f.useMemo)(()=>lt(e?.listings||[],i),[e,i]),D=se(T.rows,{searchText:e=>`${e.title} ${e.neighborhood} ${e.token}`,columns:{rank:e=>e.scenario.rank,listing:e=>e.title,deal:e=>e.scenario.dealValue,property:e=>e.scenario.property.score,neighborhood:e=>e.scenario.neighborhoodScore,confidence:e=>e.scores.confidence,risk:e=>e.scores.risk,current:e=>e.scores.recommendation,experimental:e=>e.scenario.recommendation,movement:e=>e.rank-e.scenario.rank},initialSort:{key:`rank`,direction:`asc`}}),te=D.rows.slice(0,100),oe=i.strongThreshold>i.promisingThreshold&&i.promisingThreshold>i.fairThreshold,O=Object.values(T.neighborhoods).sort((e,t)=>(i.neighborhoodScores?.[t.name]??t.score)-(i.neighborhoodScores?.[e.name]??e.score)),k=(e,t)=>a(n=>({...n,[e]:t})),ue=(e,t)=>a(n=>({...n,neighborhoodScores:{...n.neighborhoodScores,[e]:t}}));return!e&&!n?(0,p.jsx)(ie,{message:`در حال آماده‌سازی کارگاه امتیازدهی`}):n?(0,p.jsx)(ae,{message:n}):(0,p.jsxs)(`div`,{className:`workshop-page`,dir:`rtl`,children:[(0,p.jsx)(`style`,{children:ut}),(0,p.jsx)(ne,{active:`workshop`}),(0,p.jsxs)(`main`,{className:`workshop-main`,children:[(0,p.jsxs)(`section`,{className:`workshop-hero`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsxs)(`span`,{children:[(0,p.jsx)(E,{name:`trend`,size:18}),` محیط آزمایشی امتیازدهی`]}),(0,p.jsx)(`h1`,{children:`آزمایش و تنظیم امتیاز آگهی‌ها`}),(0,p.jsx)(`p`,{children:`سهم هر بخش و اثر هر ویژگی را همراه مدیر تغییر دهید و نتیجه را همان لحظه روی امتیاز و رتبه آگهی‌ها ببینید. تغییرهای این صفحه آزمایشی‌اند و اطلاعات اصلی را عوض نمی‌کنند.`})]}),(0,p.jsxs)(`aside`,{children:[(0,p.jsx)(`span`,{children:`نسخه داده`}),(0,p.jsx)(`strong`,{children:e.scoringVersion}),(0,p.jsxs)(`small`,{children:[v(e.total),` آگهی · `,S(e.generatedAt)]})]})]}),(0,p.jsxs)(`div`,{className:`workshop-mobile-tabs`,role:`group`,"aria-label":`نمای کارگاه در موبایل`,children:[(0,p.jsxs)(`button`,{type:`button`,className:w===`settings`?`is-active`:``,"aria-pressed":w===`settings`,onClick:()=>ee(`settings`),children:[(0,p.jsx)(E,{name:`building`,size:16}),` تنظیمات`]}),(0,p.jsxs)(`button`,{type:`button`,className:w===`results`?`is-active`:``,"aria-pressed":w===`results`,onClick:()=>ee(`results`),children:[(0,p.jsx)(E,{name:`trend`,size:16}),` نتایج زنده`]})]}),(0,p.jsxs)(`div`,{className:`workshop-mobile-pulse`,"aria-live":`polite`,children:[(0,p.jsx)(`span`,{children:`میانگین امتیاز آزمایشی`}),(0,p.jsx)(`strong`,{children:v(T.summary.average)}),(0,p.jsxs)(`small`,{children:[v(T.summary.bandChanges),` تغییر دسته`]})]}),(0,p.jsxs)(`div`,{className:`workshop-layout`,"data-mobile-tab":w,children:[(0,p.jsxs)(`aside`,{className:`workshop-sidebar`,id:`workshop-settings`,"aria-label":`تنظیمات مدل امتیازدهی`,children:[(0,p.jsxs)(`header`,{className:`workshop-sidebar-heading`,children:[(0,p.jsx)(`span`,{children:`پنل کنترل کارگاه`}),(0,p.jsx)(`h2`,{children:`تنظیمات امتیازدهی`}),(0,p.jsx)(`p`,{children:`وزن‌ها و حدنصاب‌ها را تغییر دهید؛ نتیجه همان لحظه در کنار این پنل به‌روز می‌شود.`}),(0,p.jsx)(`a`,{href:`#wk-save`,className:`workshop-sidebar-heading__action`,children:`ذخیره سناریو ←`})]}),(0,p.jsxs)(`section`,{className:`workshop-panel`,children:[(0,p.jsxs)(`div`,{className:`workshop-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`شروع سریع`}),(0,p.jsx)(`h2`,{children:`الگوهای آماده`})]}),(0,p.jsx)(`button`,{type:`button`,onClick:()=>a({...tt}),children:`بازگشت به پیشنهاد اولیه`})]}),(0,p.jsx)(`div`,{className:`workshop-presets`,children:Object.entries(rt).map(([e,t])=>(0,p.jsx)(`button`,{type:`button`,onClick:()=>a({...t.values}),children:t.label},e))})]}),(0,p.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-price`,open:!0,children:[(0,p.jsxs)(`summary`,{className:`workshop-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`مرحله ۱`}),(0,p.jsx)(`h2`,{children:`مناسب‌بودن قیمت`})]}),(0,p.jsxs)(`b`,{className:T.dealWeightTotal===100?`is-valid`:`is-invalid`,children:[v(T.dealWeightTotal),`٪`]})]}),(0,p.jsx)(`p`,{className:`workshop-help`,children:`وزن یعنی سهم هر معیار در نتیجه این مرحله؛ وزن بیشتر، اثر بیشتر. بهتر است جمع سه وزن ۱۰۰٪ باشد.`}),(0,p.jsx)(F,{id:`weight-model`,label:`مقایسه با قیمت برآوردی`,detail:`بررسی می‌کند قیمت آگهی چقدر از قیمت برآوردشده سامانه ارزان‌تر یا گران‌تر است.`,value:i.modelValue,onChange:e=>k(`modelValue`,e)}),(0,p.jsx)(F,{id:`weight-nearby`,label:`مقایسه با آگهی‌های مشابه`,detail:`قیمت این ملک را با آگهی‌های مشابه و نزدیک در همان محدوده مقایسه می‌کند.`,value:i.nearbyValue,onChange:e=>k(`nearbyValue`,e)}),(0,p.jsx)(F,{id:`weight-position`,label:`جایگاه قیمت در محله`,detail:`نشان می‌دهد قیمت هر متر این آگهی در میان قیمت‌های همان محله پایین، معمولی یا بالا است.`,value:i.localPosition,onChange:e=>k(`localPosition`,e)})]}),(0,p.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-overall`,open:!0,children:[(0,p.jsxs)(`summary`,{className:`workshop-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`ترکیب نهایی`}),(0,p.jsx)(`h2`,{children:`سهم بخش‌ها در امتیاز نهایی`})]}),(0,p.jsxs)(`b`,{className:T.overallWeightTotal===100?`is-valid`:`is-invalid`,children:[v(T.overallWeightTotal),`٪`]})]}),(0,p.jsx)(`p`,{className:`workshop-help`,children:`این سه عدد مشخص می‌کنند قیمت، ویژگی‌های ملک و محله هرکدام چه سهمی از امتیاز پیش از تعدیل داشته باشند.`}),(0,p.jsx)(F,{id:`pillar-valuation`,label:`مناسب‌بودن قیمت`,detail:`خلاصه سه مقایسه قیمتی مرحله قبل؛ وزن بیشتر یعنی حساسیت بیشتر به ارزان یا گران بودن آگهی.`,value:i.valuationWeight,onChange:e=>k(`valuationWeight`,e)}),(0,p.jsx)(F,{id:`pillar-property`,label:`ویژگی‌های خودِ ملک`,detail:`امکانات، طبقه، سن بنا، متراژ، تعداد اتاق و تعداد واحد در طبقه را در نظر می‌گیرد.`,value:i.propertyWeight,onChange:e=>k(`propertyWeight`,e)}),(0,p.jsx)(F,{id:`pillar-neighborhood`,label:`امتیاز محله`,detail:`امتیاز عددی محله را وارد نتیجه می‌کند؛ این عدد در بخش «محله‌ها» قابل اصلاح است.`,value:i.neighborhoodWeight,onChange:e=>k(`neighborhoodWeight`,e)})]}),(0,p.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-amenities`,children:[(0,p.jsx)(`summary`,{className:`workshop-panel__head`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`امکانات`}),(0,p.jsx)(`h2`,{children:`اثر امکانات بر امتیاز ملک`})]})}),(0,p.jsx)(`p`,{className:`workshop-help`,children:`امتیاز ویژگی‌های ملک از ۵۰ شروع می‌شود. عدد مثبت به آن اضافه و عدد منفی از آن کم می‌شود؛ نتیجه همیشه بین صفر تا ۱۰۰ می‌ماند.`}),(0,p.jsx)(F,{id:`elevator-yes`,label:`داشتن آسانسور`,detail:`اگر آگهی آسانسور داشته باشد، این مقدار به امتیاز ملک اضافه می‌شود.`,value:i.elevatorYes,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>k(`elevatorYes`,e)}),(0,p.jsx)(F,{id:`elevator-no`,label:`نداشتن آسانسور`,detail:`اگر آگهی آسانسور نداشته باشد، این مقدار روی امتیاز ملک اعمال می‌شود؛ عدد منفی یعنی کسر امتیاز.`,value:i.elevatorNo,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>k(`elevatorNo`,e)}),(0,p.jsx)(F,{id:`parking-yes`,label:`داشتن پارکینگ`,detail:`اگر ملک پارکینگ داشته باشد، این مقدار به امتیاز ملک اضافه می‌شود.`,value:i.parkingYes,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>k(`parkingYes`,e)}),(0,p.jsx)(F,{id:`parking-no`,label:`نداشتن پارکینگ`,detail:`اگر ملک پارکینگ نداشته باشد، این مقدار از امتیاز ملک کم می‌شود.`,value:i.parkingNo,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>k(`parkingNo`,e)}),(0,p.jsx)(F,{id:`storage-yes`,label:`داشتن انباری`,detail:`اثر وجود انباری بر امتیاز ویژگی‌های ملک.`,value:i.storageYes,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>k(`storageYes`,e)}),(0,p.jsx)(F,{id:`storage-no`,label:`نداشتن انباری`,detail:`اثر نبود انباری؛ عدد منفی از امتیاز ملک کم می‌کند.`,value:i.storageNo,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>k(`storageNo`,e)}),(0,p.jsx)(F,{id:`balcony-yes`,label:`داشتن بالکن`,detail:`اثر وجود بالکن بر امتیاز ویژگی‌های ملک.`,value:i.balconyYes,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>k(`balconyYes`,e)}),(0,p.jsx)(F,{id:`balcony-no`,label:`نداشتن بالکن`,detail:`اثر نبود بالکن؛ عدد منفی از امتیاز ملک کم می‌کند.`,value:i.balconyNo,min:-20,max:20,unit:`امتیاز`,signed:!0,onChange:e=>k(`balconyNo`,e)})]}),(0,p.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-building`,children:[(0,p.jsx)(`summary`,{className:`workshop-panel__head`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`مشخصات ساختمان`}),(0,p.jsx)(`h2`,{children:`اثر طبقه، سن و اندازه ملک`})]})}),(0,p.jsx)(F,{id:`floor-third`,label:`هر طبقه بالاتر از طبقه دوم`,detail:`برای طبقه سوم یک‌بار، طبقه چهارم دو بار و به همین ترتیب اعمال می‌شود.`,value:i.floorAboveSecondPenalty,min:-15,max:5,step:.5,unit:`امتیاز`,signed:!0,onChange:e=>k(`floorAboveSecondPenalty`,e)}),(0,p.jsx)(F,{id:`floor-no-elevator`,label:`کسر اضافه برای طبقه بالا بدون آسانسور`,detail:`علاوه بر اثر طبقه، برای هر طبقه بالاتر از دوم در ساختمان بدون آسانسور اعمال می‌شود.`,value:i.noElevatorHighFloorPenalty,min:-20,max:0,step:.5,unit:`امتیاز`,signed:!0,onChange:e=>k(`noElevatorHighFloorPenalty`,e)}),(0,p.jsx)(F,{id:`floor-basement`,label:`واحد زیرزمین`,detail:`این مقدار یک‌بار برای واحدی که در زیرزمین قرار دارد اعمال می‌شود.`,value:i.basementPenalty,min:-30,max:0,unit:`امتیاز`,signed:!0,onChange:e=>k(`basementPenalty`,e)}),(0,p.jsx)(F,{id:`floor-ground`,label:`واحد همکف`,detail:`اثر قرارگرفتن واحد در طبقه همکف بر امتیاز ملک.`,value:i.groundFloorPenalty,min:-20,max:5,unit:`امتیاز`,signed:!0,onChange:e=>k(`groundFloorPenalty`,e)}),(0,p.jsx)(F,{id:`floor-top`,label:`واحد طبقه آخر`,detail:`اثر قرارگرفتن واحد در آخرین طبقه ساختمان، مانند احتمال گرما یا مشکل بام.`,value:i.topFloorPenalty,min:-20,max:5,unit:`امتیاز`,signed:!0,onChange:e=>k(`topFloorPenalty`,e)}),(0,p.jsx)(F,{id:`age-year`,label:`کسر امتیاز به‌ازای هر سال عمر بنا`,detail:`در سن بنا ضرب می‌شود؛ مثلاً منفی ۰٫۵ برای بنای ۱۰ ساله یعنی کسر ۵ امتیاز.`,value:i.agePerYearPenalty,min:-2,max:0,step:.05,unit:`امتیاز`,signed:!0,onChange:e=>k(`agePerYearPenalty`,e)}),(0,p.jsx)(F,{id:`new-build`,label:`امتیاز نوساز بودن`,detail:`اگر عمر بنا صفر یا یک سال باشد، این مقدار یک‌بار به امتیاز ملک اضافه می‌شود.`,value:i.newBuildBonus,min:-10,max:15,unit:`امتیاز`,signed:!0,onChange:e=>k(`newBuildBonus`,e)}),(0,p.jsx)(F,{id:`single-unit`,label:`تک‌واحدی بودن طبقه`,detail:`اگر در هر طبقه فقط یک واحد باشد، این مقدار به امتیاز ملک اضافه می‌شود.`,value:i.singleUnitBonus,min:-10,max:15,unit:`امتیاز`,signed:!0,onChange:e=>k(`singleUnitBonus`,e)}),(0,p.jsx)(F,{id:`extra-unit`,label:`هر واحد اضافه در یک طبقه`,detail:`از واحد دوم به بعد، به‌ازای هر واحد اضافه این مقدار اعمال می‌شود؛ مثلاً سه واحد یعنی دو بار.`,value:i.extraUnitPenalty,min:-10,max:0,step:.5,unit:`امتیاز`,signed:!0,onChange:e=>k(`extraUnitPenalty`,e)}),(0,p.jsx)(F,{id:`area-step`,label:`اثر هر ۲۵ متر اختلاف با ۷۵ متر`,detail:`۷۵ متر نقطه مبنا است؛ ملک ۱۰۰ متری یک بار و ملک ۵۰ متری یک بار در جهت مخالف اثر می‌گیرد.`,value:i.areaPer25Sqm,min:-5,max:5,step:.5,unit:`امتیاز`,signed:!0,onChange:e=>k(`areaPer25Sqm`,e)}),(0,p.jsx)(F,{id:`room-point`,label:`اثر هر اتاق اختلاف با دو اتاق`,detail:`دو اتاق نقطه مبنا است؛ سه‌خوابه یک بار و یک‌خوابه یک بار در جهت مخالف اثر می‌گیرد.`,value:i.roomPoint,min:-5,max:5,step:.5,unit:`امتیاز`,signed:!0,onChange:e=>k(`roomPoint`,e)})]}),(0,p.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-risk`,children:[(0,p.jsx)(`summary`,{className:`workshop-panel__head`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`مرحله ۲`}),(0,p.jsx)(`h2`,{children:`تعدیل بر اساس اعتماد و ریسک`})]})}),(0,p.jsx)(`p`,{className:`workshop-help`,children:`پس از محاسبه قیمت، ملک و محله، قابل‌اعتماد بودن داده و نشانه‌های ریسک می‌توانند امتیاز را کاهش دهند.`}),(0,p.jsx)(F,{id:`confidence-floor`,label:`حداقل سهم امتیاز در نبود اطمینان`,detail:`اگر اعتماد به داده صفر باشد، همین درصد از امتیاز حفظ می‌شود؛ با افزایش اعتماد، سهم حفظ‌شده به ۱۰۰٪ نزدیک می‌شود.`,value:i.confidenceFloor,onChange:e=>k(`confidenceFloor`,e)}),(0,p.jsx)(F,{id:`risk-penalty`,label:`بیشترین کاهش به‌دلیل ریسک`,detail:`اگر ریسک ۱۰۰ باشد، امتیاز حداکثر به‌اندازه این درصد کاهش می‌یابد؛ ریسک کمتر، کاهش کمتری دارد.`,value:i.riskPenalty,onChange:e=>k(`riskPenalty`,e)})]}),(0,p.jsxs)(`details`,{className:`workshop-panel workshop-accordion`,id:`wk-thresholds`,children:[(0,p.jsxs)(`summary`,{className:`workshop-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`مرحله ۳`}),(0,p.jsx)(`h2`,{children:`حد نصاب دسته‌بندی`})]}),(0,p.jsx)(`b`,{className:oe?`is-valid`:`is-invalid`,children:oe?`درست`:`نیاز به اصلاح`})]}),(0,p.jsx)(F,{id:`threshold-strong`,label:`فرصت خرید بسیار خوب`,detail:`هر آگهی با امتیاز برابر یا بیشتر از این عدد در بالاترین دسته قرار می‌گیرد.`,value:i.strongThreshold,unit:`از ۱۰۰`,onChange:e=>k(`strongThreshold`,e)}),(0,p.jsx)(F,{id:`threshold-promising`,label:`ارزش بررسی دارد`,detail:`حداقل امتیاز برای آگهی‌هایی که ارزش بررسی بیشتر دارند.`,value:i.promisingThreshold,unit:`از ۱۰۰`,onChange:e=>k(`promisingThreshold`,e)}),(0,p.jsx)(F,{id:`threshold-fair`,label:`قیمت نسبتاً منصفانه`,detail:`حداقل امتیاز دسته میانی؛ امتیازهای پایین‌تر در دسته «ارزش خرید پایین» قرار می‌گیرند.`,value:i.fairThreshold,unit:`از ۱۰۰`,onChange:e=>k(`fairThreshold`,e)})]}),(0,p.jsxs)(`form`,{className:`workshop-panel scenario-save-form`,id:`wk-save`,onSubmit:async e=>{if(e.preventDefault(),!(!c.trim()||!oe)){_(!0),b(``);try{let e=await fetch(`/scoring-scenarios`,{method:`POST`,headers:{accept:`application/json`,"content-type":`application/json`},body:JSON.stringify({name:c.trim(),description:u.trim(),config:i})}),t=await e.json();if(!e.ok)throw Error(t.message||t.error||`HTTP ${e.status}`);h(e=>[t,...e]),l(``),d(``),b(`سناریو در پایگاه داده ذخیره شد و اکنون در فهرست آگهی‌ها قابل استفاده است.`)}catch(e){b(`ذخیره سناریو ناموفق بود: ${e.message}`)}finally{_(!1)}}},"aria-busy":g,children:[(0,p.jsx)(`div`,{className:`workshop-panel__head`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`ذخیره و استفاده`}),(0,p.jsx)(`h2`,{children:`ساخت سناریوی امتیازدهی`})]})}),(0,p.jsx)(`p`,{className:`workshop-help`,children:`همه تنظیم‌های فعلی، امتیاز محله‌ها و حدنصاب‌ها با این نام ذخیره می‌شوند.`}),(0,p.jsxs)(`label`,{htmlFor:`scenario-name`,children:[`نام سناریو`,(0,p.jsx)(`input`,{id:`scenario-name`,value:c,maxLength:100,required:!0,onChange:e=>l(e.target.value),placeholder:`مثلاً خرید محافظه‌کارانه`})]}),(0,p.jsxs)(`label`,{htmlFor:`scenario-description`,children:[`توضیح کوتاه`,(0,p.jsx)(`textarea`,{id:`scenario-description`,value:u,maxLength:500,onChange:e=>d(e.target.value),placeholder:`این سناریو برای چه نوع جستجویی ساخته شده است؟`})]}),!oe&&(0,p.jsx)(`p`,{className:`workshop-warning`,role:`alert`,children:`برای ذخیره، حدنصاب‌ها باید از بالاترین دسته تا پایین‌ترین به‌ترتیب کاهش یابند.`}),(0,p.jsx)(`button`,{className:`workshop-copy`,type:`submit`,disabled:g||!c.trim()||!oe,children:g?`در حال ذخیره…`:`ذخیره سناریو و فعال‌کردن در آگهی‌ها`}),(0,p.jsx)(`p`,{className:`scenario-save-status`,"aria-live":`polite`,children:y}),!!m.length&&(0,p.jsx)(`div`,{className:`saved-scenario-list`,"aria-label":`سناریوهای ذخیره‌شده`,children:m.slice(0,6).map(e=>(0,p.jsxs)(`article`,{children:[(0,p.jsxs)(`button`,{type:`button`,onClick:()=>a({...tt,...e.config}),children:[(0,p.jsx)(`b`,{children:e.name}),(0,p.jsx)(`small`,{children:`بارگذاری تنظیم‌ها در آزمایشگاه`})]}),(0,p.jsx)(`a`,{href:`/catalog?scenario=${encodeURIComponent(e.scenarioId)}`,children:`مشاهده رتبه‌بندی`})]},e.scenarioId))})]}),(0,p.jsx)(`button`,{className:`workshop-copy`,type:`button`,onClick:async()=>{let t=JSON.stringify({scoringVersion:e.scoringVersion,savedAt:new Date().toISOString(),config:i},null,2);try{await navigator.clipboard.writeText(t),s(`تنظیمات کپی شد`)}catch{s(`مرورگر اجازه کپی نداد`)}window.setTimeout(()=>s(``),2500)},children:`کپی تنظیمات برای جلسه`}),(0,p.jsx)(`div`,{className:`workshop-live`,"aria-live":`polite`,children:o||`تنظیم آزمایشی روی ${v(e.total)} آگهی اعمال شد`})]}),(0,p.jsxs)(`div`,{className:`workshop-results`,id:`workshop-results`,children:[!oe&&(0,p.jsx)(`div`,{className:`workshop-warning`,role:`alert`,children:`حد نصاب‌ها باید از «فرصت خرید بسیار خوب» تا «قیمت نسبتاً منصفانه» به‌ترتیب کمتر شوند.`}),(0,p.jsxs)(`section`,{className:`workshop-panel workshop-guide`,"aria-labelledby":`score-guide-title`,children:[(0,p.jsxs)(`div`,{className:`workshop-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`راهنمای جلسه`}),(0,p.jsx)(`h2`,{id:`score-guide-title`,children:`این امتیاز چگونه ساخته می‌شود؟`})]}),(0,p.jsx)(`strong`,{children:`۰ تا ۱۰۰`})]}),(0,p.jsxs)(`div`,{className:`workshop-guide__grid`,children:[(0,p.jsxs)(`article`,{children:[(0,p.jsx)(`b`,{children:`۱. مناسب‌بودن قیمت`}),(0,p.jsx)(`p`,{children:`قیمت آگهی با قیمت برآوردی، آگهی‌های مشابه و قیمت‌های همان محله سنجیده می‌شود.`})]}),(0,p.jsxs)(`article`,{children:[(0,p.jsx)(`b`,{children:`۲. ویژگی‌های ملک`}),(0,p.jsx)(`p`,{children:`محاسبه از ۵۰ شروع می‌شود؛ امکانات و ویژگی‌های مثبت اضافه و کاستی‌ها کم می‌شوند.`})]}),(0,p.jsxs)(`article`,{children:[(0,p.jsx)(`b`,{children:`۳. امتیاز محله`}),(0,p.jsx)(`p`,{children:`امتیاز خودکار محله یا عددی که مدیر بر اساس شناخت بازار وارد کرده است، استفاده می‌شود.`})]}),(0,p.jsxs)(`article`,{children:[(0,p.jsx)(`b`,{children:`۴. اعتماد و ریسک`}),(0,p.jsx)(`p`,{children:`در پایان، کمبود داده یا نشانه‌های ریسک می‌تواند امتیاز ترکیبی را کاهش دهد.`})]})]})]}),(0,p.jsxs)(`section`,{className:`workshop-stats`,children:[(0,p.jsx)(ht,{label:`میانگین امتیاز آزمایشی`,value:v(T.summary.average),detail:`میانه: ${v(T.summary.median)}`}),(0,p.jsx)(ht,{label:`تغییر دسته`,value:v(T.summary.bandChanges),detail:`آگهی نسبت به امتیاز فعلی`,tone:C.orange}),(0,p.jsx)(ht,{label:`تغییر در ۱۰ رتبه اول`,value:v(T.summary.topTenChanges),detail:`آگهی تازه‌وارد به ۱۰ رتبه اول`,tone:C.primaryPale}),(0,p.jsx)(ht,{label:`فرصت خرید بسیار خوب`,value:v(T.summary.strong),detail:`${v(T.summary.promising)} آگهی ارزش بررسی دارد`,tone:C.green})]}),(0,p.jsxs)(`section`,{className:`workshop-panel workshop-distribution`,children:[(0,p.jsxs)(`div`,{className:`workshop-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`اثر تنظیم آزمایشی`}),(0,p.jsx)(`h2`,{children:`پراکندگی امتیازهای جدید`})]}),(0,p.jsx)(`small`,{children:`امتیاز ترکیبی ← تعدیل اعتماد ← کاهش ریسک`})]}),(0,p.jsx)(gt,{histogram:T.histogram}),(0,p.jsx)(`div`,{className:`workshop-band-summary`,children:[[`strong-value`,T.summary.strong],[`promising`,T.summary.promising],[`fair`,T.summary.fair],[`weak-value`,T.summary.weak]].map(([e,t])=>(0,p.jsxs)(`span`,{children:[(0,p.jsx)(`i`,{style:{background:ft[e]}}),dt[e],` `,(0,p.jsx)(`b`,{children:v(t)})]},e))})]}),(0,p.jsxs)(`section`,{className:`workshop-panel`,children:[(0,p.jsxs)(`div`,{className:`workshop-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`شناخت محدوده`}),(0,p.jsx)(`h2`,{children:`امتیاز محله‌ها`})]}),(0,p.jsx)(`small`,{children:`قابل اصلاح توسط مدیر · از ۱۰۰`})]}),(0,p.jsx)(`p`,{className:`workshop-help`,children:`امتیاز پیشنهادی هر محله از سطح معمول قیمت هر متر و تعداد آگهی‌های قابل‌استفاده آن ساخته می‌شود. برای محله‌هایی که آگهی کمی دارند، عدد به امتیاز میانه ۵۰ نزدیک‌تر می‌ماند. عددی که مدیر وارد کند جای امتیاز پیشنهادی را می‌گیرد.`}),(0,p.jsx)(`div`,{className:`neighborhood-score-grid`,children:O.map(e=>(0,p.jsxs)(`label`,{children:[(0,p.jsxs)(`span`,{children:[(0,p.jsx)(`b`,{children:e.name}),(0,p.jsxs)(`small`,{children:[v(e.count),` آگهی ·`,` `,x(e.medianPricePerMeter),` / متر`]})]}),(0,p.jsx)(`input`,{type:`number`,lang:`fa`,"aria-label":`امتیاز محله ${e.name}`,min:`0`,max:`100`,value:i.neighborhoodScores?.[e.name]??e.score,onChange:t=>ue(e.name,Math.max(0,Math.min(100,Number(t.target.value))))})]},e.name))})]}),(0,p.jsxs)(`section`,{className:`workshop-panel`,children:[(0,p.jsx)(`div`,{className:`workshop-table-head`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:`رتبه‌بندی زنده`}),(0,p.jsx)(`h2`,{children:`اثر تنظیم‌ها بر هر آگهی`})]})}),(0,p.jsx)(ce,{query:D.query,setQuery:D.setQuery,count:D.rows.length,placeholder:`عنوان، محله یا توکن…`}),(0,p.jsxs)(`div`,{className:`workshop-mobile-sort`,children:[(0,p.jsxs)(`label`,{children:[`مرتب‌سازی`,(0,p.jsx)(`select`,{"aria-label":`مرتب‌سازی آگهی‌ها`,value:D.sort.key,onChange:e=>D.changeSort(e.target.value),children:[[`rank`,`رتبه`],[`listing`,`عنوان آگهی`],[`deal`,`مناسب‌بودن قیمت`],[`property`,`ویژگی ملک`],[`neighborhood`,`امتیاز محله`],[`confidence`,`اعتماد`],[`risk`,`ریسک`],[`current`,`امتیاز فعلی`],[`experimental`,`امتیاز آزمایشی`],[`movement`,`تغییر رتبه`]].map(([e,t])=>(0,p.jsx)(`option`,{value:e,children:t},e))})]}),(0,p.jsx)(`button`,{type:`button`,onClick:()=>D.changeSort(D.sort.key),"aria-label":`تغییر جهت مرتب‌سازی`,children:D.sort.direction===`asc`?`صعودی ↑`:`نزولی ↓`})]}),(0,p.jsxs)(`div`,{className:`workshop-mobile-ranking`,"aria-label":`رتبه‌بندی آگهی‌ها در موبایل`,children:[te.map(e=>{let t=e.rank-e.scenario.rank;return(0,p.jsxs)(`article`,{className:`wk-rank-card`,children:[(0,p.jsxs)(`div`,{className:`wk-rank-card__top`,children:[(0,p.jsxs)(`div`,{className:`wk-rank-card__identity`,children:[(0,p.jsx)(`a`,{href:`/listing/${e.token}`,children:e.title}),(0,p.jsxs)(`small`,{children:[e.neighborhood,` · `,x(e.askingPrice)]})]}),(0,p.jsxs)(`span`,{className:`wk-rank-card__rank`,children:[`رتبه `,v(e.scenario.rank)]})]}),(0,p.jsxs)(`div`,{className:`wk-rank-card__score`,children:[(0,p.jsxs)(`span`,{children:[`امتیاز آزمایشی`,(0,p.jsx)(`small`,{children:dt[e.scenario.band]})]}),(0,p.jsx)(`strong`,{style:{color:ft[e.scenario.band]},children:v(e.scenario.recommendation)}),(0,p.jsxs)(`span`,{className:`wk-rank-card__delta ${t>0?`is-up`:t<0?`is-down`:``}`,children:[t>0?`+`:``,v(t),` رتبه`]})]}),(0,p.jsx)(`div`,{className:`wk-rank-card__metrics`,children:[[`امتیاز فعلی`,v(e.scores.recommendation)],[`مناسب‌بودن قیمت`,v(e.scenario.dealValue)],[`ویژگی ملک`,v(e.scenario.property.score)],[`امتیاز محله`,v(e.scenario.neighborhoodScore)],[`اعتماد به داده`,v(e.scores.confidence)],[`ریسک`,v(e.scores.risk)]].map(([e,t])=>(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:e}),(0,p.jsx)(`b`,{children:t})]},e))}),(0,p.jsxs)(`details`,{className:`wk-rank-card__breakdown`,children:[(0,p.jsx)(`summary`,{children:`جزئیات اثر ویژگی‌های ملک`}),(0,p.jsx)(`div`,{children:Object.entries(e.scenario.property.contributions).map(([e,t])=>(0,p.jsxs)(`span`,{children:[pt[e]||e,`:`,` `,(0,p.jsxs)(`b`,{children:[t>0?`+`:``,v(t)]})]},e))})]})]},e.token)}),!te.length&&(0,p.jsx)(`p`,{className:`workshop-warning`,children:`آگهی مطابق جستجو پیدا نشد.`})]}),(0,p.jsx)(`div`,{className:`workshop-table-wrap`,children:(0,p.jsxs)(`table`,{className:`workshop-table`,children:[(0,p.jsx)(`thead`,{children:(0,p.jsx)(`tr`,{children:[[`rank`,`رتبه`],[`listing`,`آگهی`],[`deal`,`مناسب‌بودن قیمت`],[`property`,`ویژگی‌های ملک`],[`neighborhood`,`امتیاز محله`],[`confidence`,`اعتماد به داده`],[`risk`,`ریسک ارزیابی`],[`current`,`امتیاز فعلی`],[`experimental`,`امتیاز آزمایشی`],[`movement`,`تغییر رتبه`]].map(([e,t])=>(0,p.jsx)(le,{column:e,sort:D.sort,onSort:D.changeSort,children:t},e))})}),(0,p.jsx)(`tbody`,{children:te.map(e=>{let t=e.rank-e.scenario.rank;return(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{children:(0,p.jsx)(`strong`,{children:v(e.scenario.rank)})}),(0,p.jsx)(`td`,{children:(0,p.jsxs)(`a`,{href:`/listing/${e.token}`,children:[(0,p.jsx)(`b`,{children:e.title}),(0,p.jsxs)(`small`,{children:[e.neighborhood,` ·`,` `,x(e.askingPrice)]})]})}),(0,p.jsx)(`td`,{children:v(e.scenario.dealValue)}),(0,p.jsx)(`td`,{children:(0,p.jsxs)(`details`,{className:`property-breakdown`,children:[(0,p.jsx)(`summary`,{children:v(e.scenario.property.score)}),(0,p.jsx)(`div`,{children:Object.entries(e.scenario.property.contributions).map(([e,t])=>(0,p.jsxs)(`span`,{children:[pt[e]||e,`:`,` `,(0,p.jsxs)(`b`,{children:[t>0?`+`:``,v(t)]})]},e))})]})}),(0,p.jsx)(`td`,{children:v(e.scenario.neighborhoodScore)}),(0,p.jsx)(`td`,{children:v(e.scores.confidence)}),(0,p.jsx)(`td`,{children:v(e.scores.risk)}),(0,p.jsx)(`td`,{children:v(e.scores.recommendation)}),(0,p.jsxs)(`td`,{children:[(0,p.jsx)(`b`,{className:`workshop-score`,style:{color:ft[e.scenario.band]},children:v(e.scenario.recommendation)}),(0,p.jsx)(`small`,{children:dt[e.scenario.band]})]}),(0,p.jsxs)(`td`,{className:t>0?`movement-up`:t<0?`movement-down`:``,children:[t>0?`+`:``,v(t)]})]},e.token)})})]})}),(0,p.jsx)(`p`,{className:`workshop-table-note`,children:`برای عملکرد بهتر، این جدول ۱۰۰ نتیجه اولِ فیلتر جاری را نشان می‌دهد؛ محاسبات خلاصه روی همه آگهی‌ها انجام شده است.`})]})]})]})]}),(0,p.jsx)(re,{disclaimer:`این صفحه فقط برای آزمایش و گفت‌وگو درباره مدل امتیازدهی است؛ تغییرها در اطلاعات اصلی ذخیره نمی‌شوند.`})]})}var vt={active:`فعال`,"not-seen":`دیده‌نشده`,"possibly-removed":`احتمال حذف`,removed:`حذف‌شده`},yt={"scoring-ready":`آماده امتیازدهی`,"history-only":`فقط سابقه`},bt={personal:`شخصی`,"real-estate-business":`مشاور املاک`,unknown:`نامشخص`},xt=40,St=`
  .listings-page {
    --catalog-bg: ${C.bg};
    --catalog-surface: ${C.surface};
    --catalog-ink: ${C.text};
    --catalog-muted: ${C.textMuted};
    --catalog-border: ${C.borderMed};
    --catalog-primary: ${C.primary};
    --catalog-accent: ${C.secondary};
    min-width: 0;
    min-height: 100svh;
    background: ${C.bg};
    color: ${C.text};
    font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
    direction: rtl;
    overflow-x: clip;
    text-align: right;
  }
  .listings-page *, .listings-page *::before, .listings-page *::after {
    box-sizing: border-box;
  }
  .listings-page :where(a, button, input, select, summary):focus-visible {
    outline: 3px solid rgba(102, 48, 141, .26);
    outline-offset: 3px;
  }
  .listings-page button, .listings-page input, .listings-page select {
    font: inherit;
  }
  .listings-page a { color: inherit; }
  .listings-page .listings-main {
    width: min(100%, 1360px);
    margin-inline: auto;
    padding: clamp(18px, 3.2vw, 42px) clamp(16px, 3vw, 34px) 72px;
  }
  .listings-page .listings-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 22px;
    align-items: center;
    padding: clamp(23px, 3vw, 39px);
    margin: 0 0 22px;
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 23px;
    box-shadow: ${C.shadow};
    position: relative;
    overflow: hidden;
  }
  .listings-page .listings-hero::before {
    content: '';
    position: absolute;
    inset-block: 18px;
    right: 0;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: ${C.primary};
  }
  .listings-page .listings-hero > div { min-width: 0; }
  .listings-page .location-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border-radius: 999px;
    background: ${C.primaryBg};
    color: ${C.primary};
    font-size: 12px;
    font-weight: 700;
    line-height: 1.5;
  }
  .listings-page .listings-hero h1 {
    margin: 14px 0 9px;
    font-size: clamp(25px, 3.1vw, 36px);
    line-height: 1.5;
    font-weight: 900;
    letter-spacing: -.55px;
    color: ${C.text};
  }
  .listings-page .listings-hero p {
    max-width: 650px;
    margin: 0;
    color: ${C.textSec};
    font-size: 13px;
    line-height: 2;
  }
  .listings-page .listing-total {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3px;
    min-width: 142px;
    min-height: 116px;
    padding: 14px 22px;
    background: ${C.raised};
    border: 1px solid ${C.border};
    border-radius: 18px;
    text-align: center;
  }
  .listings-page .listing-total strong {
    color: ${C.primary};
    font-size: clamp(29px, 3vw, 38px);
    line-height: 1.3;
    font-weight: 900;
    font-variant-numeric: tabular-nums;
  }
  .listings-page .listing-total span {
    color: ${C.textSec};
    font-size: 12px;
    font-weight: 650;
  }
  .listings-page .listing-filters {
    display: grid;
    grid-template-columns: minmax(0, 1.7fr) repeat(3, minmax(0, 1fr));
    gap: 14px;
    padding: clamp(17px, 2.6vw, 28px);
    margin-bottom: 23px;
    border: 1px solid ${C.border};
    border-radius: 22px;
    background: ${C.surface};
    box-shadow: ${C.shadow};
  }
  .listings-page .listing-filters__toolbar {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 4px;
  }
  .listings-page .listing-filters__toolbar h2 {
    margin: 0;
    font-size: 17px;
    line-height: 1.6;
    font-weight: 850;
    color: ${C.text};
  }
  .listings-page .listing-filters__toolbar .listing-reset {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-height: 42px;
    padding: 9px 15px;
    background: ${C.surface};
    border: 1px solid ${C.borderLight};
    border-radius: 11px;
    color: ${C.textSec};
    cursor: pointer;
    font-size: 12px;
    font-weight: 750;
    transition: background .18s ease, border-color .18s ease, color .18s ease;
  }
  .listings-page .listing-filters__toolbar .listing-reset:hover {
    background: ${C.primaryBg};
    border-color: ${C.primaryBg2};
    color: ${C.primary};
  }
  .listings-page .listing-filter {
    display: flex;
    flex-direction: column;
    gap: 7px;
    min-width: 0;
    color: ${C.textSec};
    font-size: 12px;
    font-weight: 750;
  }
  .listings-page .listing-filter > span:first-child { line-height: 1.7; }
  .listings-page .listing-filter input,
  .listings-page .listing-filter select {
    display: block;
    width: 100%;
    min-width: 0;
    height: 49px;
    padding: 10px 13px;
    color: ${C.text};
    background: ${C.surface};
    border: 1px solid ${C.borderLight};
    border-radius: 12px;
    outline: none;
    font-size: 13px;
    font-weight: 600;
    direction: rtl;
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
  }
  .listings-page .listing-filter select {
    cursor: pointer;
    padding-inline-end: 10px;
    text-overflow: ellipsis;
  }
  .listings-page .listing-filter input::placeholder {
    color: #91949c;
    font-weight: 450;
  }
  .listings-page .listing-filter :is(input,select):hover,
  .listings-page .listing-range-card input:hover {
    border-color: #b8bbc4;
  }
  .listings-page .listing-filter :is(input,select):focus,
  .listings-page .listing-range-card input:focus {
    outline: none;
    border-color: ${C.primary};
    box-shadow: 0 0 0 3px rgba(102,48,141,.095);
  }
  .listings-page .listing-filter--search { position: relative; }
  .listings-page .listing-filter--search input { padding-inline-start: 42px; }
  .listings-page .listing-search__icon {
    position: absolute;
    inset-inline-start: 14px;
    bottom: 15px;
    display: inline-flex;
    color: ${C.textMuted};
    pointer-events: none;
  }
  .listings-page .listing-multiselect { position: relative; min-width: 0; }
  .listings-page .listing-multiselect > span { display: block; margin-bottom: 7px; color: ${C.textSec}; font-size: 12px; font-weight: 750; }
  .listings-page .listing-multiselect details { position: relative; }
  .listings-page .listing-multiselect summary { display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:49px;padding:10px 13px;border:1px solid ${C.borderLight};border-radius:12px;background:${C.surface};color:${C.text};cursor:pointer;font-size:13px;font-weight:650;list-style:none; }
  .listings-page .listing-multiselect summary::-webkit-details-marker { display:none; }
  .listings-page .listing-multiselect summary small { color:${C.primary};font-size:11px; }
  .listings-page .listing-multiselect__panel { position:absolute;z-index:40;inset-inline:0;top:calc(100% + 7px);display:grid;min-width:min(330px,calc(100vw - 64px));gap:9px;padding:12px;border:1px solid ${C.borderMed};border-radius:13px;background:${C.surface};box-shadow:${C.shadow}; }
  .listings-page .listing-multiselect__panel input[type="search"] { width:100%;height:42px;padding:8px 11px;border:1px solid ${C.borderLight};border-radius:9px;background:${C.surfaceLight};color:${C.text};outline:0; }
  .listings-page .listing-multiselect__options { display:grid;max-height:260px;overflow:auto;overscroll-behavior:contain; }
  .listings-page .listing-multiselect__options label { display:flex;align-items:center;gap:9px;min-height:40px;padding:7px 5px;border-bottom:1px solid ${C.border};color:${C.textSec};cursor:pointer;font-size:12px; }
  .listings-page .listing-multiselect__options input { width:17px;height:17px;accent-color:${C.primary}; }
  .listings-page .listing-multiselect__clear { min-height:38px;border:1px solid ${C.borderLight};border-radius:8px;background:${C.surfaceLight};color:${C.textSec};cursor:pointer;font:inherit;font-size:11px;font-weight:750; }
  .listings-page .listing-filter-chips { grid-column:1/-1;display:flex;flex-wrap:wrap;gap:7px; }
  .listings-page .listing-filter-chips button { display:inline-flex;align-items:center;gap:7px;min-height:34px;padding:5px 10px;border:1px solid ${C.primaryBg2};border-radius:999px;background:${C.primaryBg};color:${C.primary};cursor:pointer;font:inherit;font-size:11px;font-weight:750; }
  .listings-page .scenario-filter-note { grid-column:1/-1;margin:-4px 0 0;color:${C.textMuted};font-size:11px;line-height:1.8; }
  .listings-page .catalog-voice { grid-column:1/-1;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:12px;padding:14px;border:1px solid ${C.primaryBg2};border-radius:14px;background:${C.primaryBg}; }
  .listings-page .catalog-voice__copy { min-width:0; }
  .listings-page .catalog-voice__copy strong { display:block;color:${C.text};font-size:13px; }
  .listings-page .catalog-voice__copy p { margin:4px 0 0;color:${C.textSec};font-size:11px;line-height:1.8;overflow-wrap:anywhere; }
  .listings-page .catalog-voice__actions { display:flex;align-items:center;gap:8px; }
  .listings-page .catalog-voice__button { display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:44px;padding:9px 13px;border:1px solid ${C.primaryBg2};border-radius:11px;background:${C.surface};color:${C.primary};cursor:pointer;font:inherit;font-size:12px;font-weight:800; }
  .listings-page .catalog-voice__button:disabled { cursor:not-allowed;opacity:.5; }
  .listings-page .catalog-voice__button.is-recording { border-color:${C.redBg2};background:${C.redBg};color:${C.red}; }
  .listings-page .catalog-voice__button svg { flex:none; }
  .listings-page .catalog-voice__status { grid-column:1/-1;margin:0;color:${C.textSec};font-size:11px;line-height:1.8; }
  .listings-page .catalog-voice__status[data-error="true"] { color:${C.red}; }
  .listings-page .listing-filters__advanced {
    grid-column: 1 / -1;
    min-width: 0;
    margin-top: 2px;
    border: 1px solid ${C.borderMed};
    background: ${C.surfaceLight};
    border-radius: 15px;
  }
  .listings-page .listing-filters__advanced > summary {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 53px;
    padding: 12px 17px;
    list-style: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 800;
    color: ${C.text};
    user-select: none;
  }
  .listings-page .listing-filters__advanced > summary::-webkit-details-marker { display: none; }
  .listings-page .listing-filters__advanced > summary .listing-filters__count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 27px;
    height: 25px;
    padding: 2px 8px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 800;
    background: ${C.primaryBg};
    color: ${C.primary};
  }
  .listings-page .listing-filters__chevron {
    margin-inline-start: auto;
    display: inline-flex;
    align-items: center;
    transition: transform .18s ease;
    color: ${C.textMuted};
  }
  .listings-page .listing-filters__advanced[open] .listing-filters__chevron {
    transform: rotate(180deg);
  }
  .listings-page .listing-filters__advanced-body {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 17px;
    padding: 21px;
    border-top: 1px solid ${C.border};
  }
  .listings-page .listing-filters__advanced-body > .listing-filter { grid-column: span 2; }
  .listings-page .listing-range-card {
    grid-column: span 2;
    display: grid;
    grid-template-columns: minmax(0,1fr) minmax(0,1fr);
    gap: 10px;
    min-width: 0;
    margin: 0;
    padding: 14px;
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 14px;
  }
  .listings-page .listing-range-card > strong {
    grid-column: 1/-1;
    color: ${C.text};
    font-size: 13px;
    font-weight: 800;
  }
  .listings-page .listing-range-card > label {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 7px;
    color: ${C.textMuted};
    font-size: 11px;
    font-weight: 700;
  }
  .listings-page .listing-range-card input {
    display: block;
    width: 100%;
    min-width: 0;
    height: 45px;
    padding: 9px 10px;
    background: ${C.surface};
    border: 1px solid ${C.borderLight};
    border-radius: 10px;
    color: ${C.text};
    outline: 0;
    direction: rtl;
    font-size: 12px;
    font-weight: 600;
  }
  .listings-page .listing-range-card input::placeholder { color: #9296a1; font-weight: 450; }
  .listings-page .amenity-filter {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 15px 0 0;
    margin: 0;
    border: 0;
    border-top: 1px solid ${C.border};
    min-width: 0;
  }
  .listings-page .amenity-filter legend {
    padding: 0 0 11px;
    color: ${C.text};
    font-size: 13px;
    font-weight: 800;
  }
  .listings-page .amenity-filter button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 43px;
    padding: 9px 16px;
    background: ${C.surface};
    border: 1px solid ${C.borderLight};
    border-radius: 11px;
    color: ${C.textSec};
    cursor: pointer;
    font-size: 12px;
    font-weight: 750;
    transition: border-color .18s ease, background .18s ease, color .18s ease;
  }
  .listings-page .amenity-filter button:hover { border-color: ${C.primary}; color: ${C.primary}; }
  .listings-page .amenity-filter button.is-active {
    background: ${C.primaryBg};
    border-color: ${C.primaryBg2};
    color: ${C.primary};
  }
  .listings-page .amenity-filter button.is-active::before {
    content: '\\2713';
    display: inline-flex;
    align-items: center;
    margin-inline-end: 7px;
    font-size: 14px;
  }
  .listings-page .listing-results {
    display: flex;
    align-items: center;
    min-height: 47px;
    gap: 8px;
    margin: 0 1px 13px;
    color: ${C.textSec};
    font-size: 13px;
    line-height: 1.8;
    font-weight: 600;
  }
  .listings-page .catalog-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }
  .listings-page .catalog-pagination button {
    min-height: 44px;
    padding: 0 16px;
    border: 1px solid ${C.borderMed};
    border-radius: 8px;
    background: ${C.surface};
    color: ${C.text};
    cursor: pointer;
  }
  .listings-page .catalog-pagination button:disabled {
    opacity: .45;
    cursor: not-allowed;
  }
  .listings-page .catalog-pagination span {
    color: ${C.textMuted};
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }
  .listings-page .listing-results::before {
    content: '';
    display: inline-block;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: ${C.secondary};
    flex: none;
  }
  .listings-page .catalog-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 17px;
  }
  .listings-page .catalog-card {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: clamp(18px, 2vw, 24px);
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 20px;
    box-shadow: ${C.shadow};
    transition: box-shadow .2s ease, border-color .2s ease, transform .2s ease;
  }
  .listings-page .catalog-card:hover {
    border-color: ${C.borderLight};
    box-shadow: ${C.shadowLg};
    transform: translateY(-2px);
  }
  .listings-page .catalog-card__top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(150px, .7fr);
    gap: 18px;
    align-items: start;
  }
  .listings-page .catalog-card__identity { min-width: 0; }
  .listings-page .catalog-card__location {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: ${C.textMuted};
    font-size: 11px;
    font-weight: 700;
    line-height: 1.7;
  }
  .listings-page .catalog-card h2 {
    margin: 9px 0 7px;
    font-size: clamp(15px, 1.3vw, 18px);
    line-height: 1.9;
    font-weight: 850;
    color: ${C.text};
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-card h2 a {
    color: inherit;
    text-decoration: none;
  }
  .listings-page .catalog-card h2 a:hover { color: ${C.primary}; }
  .listings-page .catalog-card__identity p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 43px;
    margin: 0;
    color: ${C.textSec};
    font-size: 12px;
    line-height: 1.9;
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-card__price {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    min-width: 0;
    padding-inline-start: 17px;
    border-inline-start: 1px solid ${C.border};
  }
  .listings-page .catalog-card__price-label {
    color: ${C.textMuted};
    font-size: 11px;
    font-weight: 650;
  }
  .listings-page .catalog-card__price > strong {
    color: ${C.text};
    font-size: clamp(15px, 1.4vw, 19px);
    font-weight: 900;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-card__price > span {
    color: ${C.textSec};
    font-size: 11px;
    line-height: 1.7;
  }
  .listings-page .scenario-score-badge {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 3px 6px;
    max-width: 100%;
    padding: 5px 9px;
    margin-top: 9px;
    background: ${C.secondaryBg};
    border: 1px solid ${C.secondaryBg2};
    border-radius: 9px;
    color: ${C.secondaryDark};
    font-size: 10px;
    font-weight: 700;
    overflow-wrap: anywhere;
  }
  .listings-page .scenario-score-badge strong { font-size: 14px; color: ${C.secondaryDark}; font-weight: 900; }
  .listings-page .scenario-score-badge small { font-size: 10px; opacity: .95; }
  .listings-page .catalog-facts {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 9px;
    margin: 0;
    padding: 14px 0;
    border-top: 1px solid ${C.border};
    border-bottom: 1px solid ${C.border};
  }
  .listings-page .catalog-facts > div {
    min-width: 0;
    padding: 10px 11px;
    border-radius: 10px;
    background: ${C.raised};
  }
  .listings-page .catalog-facts dt {
    margin-bottom: 5px;
    color: ${C.textMuted};
    font-size: 11px;
    font-weight: 600;
  }
  .listings-page .catalog-facts dd {
    margin: 0;
    color: ${C.text};
    font-size: 12px;
    font-weight: 800;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-card__foot {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 12px;
    margin-top: auto;
  }
  .listings-page .catalog-tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 7px;
    min-width: 0;
  }
  .listings-page .status-pill, .listings-page .detail-chip {
    display: inline-flex;
    align-items: center;
    min-height: 27px;
    max-width: 100%;
    padding: 4px 9px;
    border: 1px solid ${C.border};
    border-radius: 8px;
    background: ${C.raised};
    color: ${C.textSec};
    font-size: 10px;
    line-height: 1.7;
    font-weight: 700;
    white-space: normal;
  }
  .listings-page .status-pill--active {
    background: ${C.greenBg};
    color: ${C.green};
    border-color: ${C.greenBg2};
  }
  .listings-page .status-pill--not-seen,
  .listings-page .status-pill--possibly-removed {
    background: ${C.orangeBg};
    color: ${C.orange};
    border-color: ${C.orangeBg2};
  }
  .listings-page .status-pill--removed {
    background: ${C.redBg};
    color: ${C.red};
    border-color: ${C.redBg2};
  }
  .listings-page .detail-chip { background: ${C.surface}; }
  .listings-page .catalog-detail-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex: none;
    min-height: 43px;
    padding: 10px 12px;
    border: 1px solid ${C.primaryBg2};
    border-radius: 11px;
    background: ${C.primaryBg};
    color: ${C.primary};
    text-decoration: none;
    font-size: 12px;
    font-weight: 850;
    transition: background .18s ease, transform .18s ease;
  }
  .listings-page .catalog-detail-link:hover {
    background: ${C.primaryBg2};
  }
  .listings-page .catalog-detail-link svg { transform: rotate(180deg); }
  .listings-page .location-state {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    min-height: 135px;
    padding: 28px 18px;
    border: 1px solid ${C.border};
    border-radius: 19px;
    background: ${C.surface};
    color: ${C.textSec};
    text-align: center;
    font-size: 14px;
    font-weight: 650;
  }
  .listings-page .location-state:not(.location-state--error)::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid ${C.primaryBg2};
    border-top-color: ${C.primary};
    border-radius: 50%;
    animation: owjCatalogSpin 750ms linear infinite;
    flex: none;
  }
  .listings-page .location-state--error {
    min-height: 120px;
    border-color: ${C.redBg2};
    background: ${C.redBg};
    color: ${C.red};
    overflow-wrap: anywhere;
  }
  .listings-page .catalog-empty {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    min-height: 300px;
    padding: 36px 18px;
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 20px;
    color: ${C.textSec};
    text-align: center;
  }
  .listings-page .catalog-empty svg { color: ${C.textMuted}; }
  .listings-page .catalog-empty h2 {
    margin: 0;
    color: ${C.text};
    font-size: 18px;
    line-height: 1.6;
    font-weight: 850;
  }
  .listings-page .catalog-empty p { margin: 0; font-size: 13px; line-height: 1.8; }
  .listings-page .catalog-empty button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 11px 20px;
    border: 0;
    border-radius: 11px;
    background: ${C.primary};
    color: white;
    cursor: pointer;
    font-size: 13px;
    font-weight: 800;
  }
  @keyframes owjCatalogSpin { to { transform: rotate(360deg); } }
  @media (max-width: 1180px) {
    .listings-page .catalog-card__top { grid-template-columns: 1fr; }
    .listings-page .catalog-card__price {
      border-inline-start: 0;
      border-top: 1px solid ${C.border};
      padding-inline-start: 0;
      padding-top: 12px;
    }
    .listings-page .listing-filters {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .listings-page .listing-filter--search { grid-column: span 3; }
    .listings-page .listing-filters__advanced-body > .listing-filter { grid-column: span 3; }
    .listings-page .listing-range-card { grid-column: span 3; }
  }
  @media (max-width: 920px) {
    .listings-page .catalog-grid { grid-template-columns: minmax(0, 1fr); }
    .listings-page .catalog-card__top { grid-template-columns: minmax(0,1fr) minmax(180px,.6fr); }
    .listings-page .catalog-card__price {
      border-top: 0;
      border-inline-start: 1px solid ${C.border};
      padding-top: 0;
      padding-inline-start: 18px;
    }
  }
  @media (max-width: 640px) {
    .listings-page .listings-main { padding: 16px 14px 54px; }
    .listings-page .listings-hero {
      grid-template-columns: minmax(0, 1fr);
      gap: 17px;
      padding: 23px 20px;
      border-radius: 18px;
      margin-bottom: 14px;
    }
    .listings-page .listings-hero p { font-size: 12px; }
    .listings-page .listing-total {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      min-height: 74px;
      text-align: right;
      padding: 12px 17px;
      border-radius: 13px;
    }
    .listings-page .listing-total strong { font-size: 29px; }
    .listings-page .listing-filters {
      grid-template-columns: repeat(2, minmax(0,1fr));
      gap: 12px;
      padding: 16px;
      border-radius: 18px;
      margin-bottom: 14px;
    }
    .listings-page .listing-filters__toolbar { gap: 10px; }
    .listings-page .listing-filters__toolbar h2 { font-size: 15px; }
    .listings-page .listing-filters__toolbar .listing-reset { min-height: 41px; padding-inline: 10px; font-size: 11px; }
    .listings-page .listing-filter--search { grid-column: 1 / -1; }
    .listings-page .listing-multiselect { grid-column: 1 / -1; }
    .listings-page .listing-multiselect__panel { position:static;min-width:0;margin-top:7px; }
    .listings-page .listing-filter-chips button { min-height:40px; }
    .listings-page .catalog-voice { grid-template-columns:minmax(0,1fr); }
    .listings-page .catalog-voice__actions { width:100%; }
    .listings-page .catalog-voice__button { flex:1;min-height:48px; }
    .listings-page .listing-filters > .listing-filter[for='lifecycle-filter'] { grid-column: 1 / -1; }
    .listings-page .listing-filter :is(input,select) { height: 49px; }
    .listings-page .listing-filters__advanced-body { grid-template-columns: repeat(2,minmax(0,1fr)); padding: 15px; gap: 12px; }
    .listings-page .listing-filters__advanced-body > .listing-filter { grid-column: 1 / -1; }
    .listings-page .listing-range-card { grid-column: 1 / -1; }
    .listings-page .catalog-card { padding: 17px; gap: 15px; border-radius: 17px; }
    .listings-page .catalog-card__top { grid-template-columns: minmax(0,1fr); gap: 15px; }
    .listings-page .catalog-card__price {
      border-inline-start: 0;
      border-top: 1px solid ${C.border};
      padding-inline-start: 0;
      padding-top: 12px;
      align-items: flex-start;
    }
    .listings-page .catalog-card__price > strong { font-size: 20px; }
    .listings-page .catalog-card h2 { font-size: 16px; }
    .listings-page .catalog-facts { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; }
    .listings-page .catalog-card__foot { flex-direction: column; align-items: stretch; gap: 16px; }
    .listings-page .catalog-detail-link { width: 100%; min-height: 47px; }
    .listings-page .catalog-tags { align-items: flex-start; }
    .listings-page .listing-results { font-size: 12px; line-height: 1.9; }
  }
  @media (max-width: 360px) {
    .listings-page .listing-filters { padding: 13px; gap: 10px; }
    .listings-page .listing-filter :is(input,select) { font-size: 12px; padding-inline: 9px; }
    .listings-page .listing-range-card { padding: 11px; }
    .listings-page .listing-range-card input { font-size: 11px; }
    .listings-page .catalog-card { padding: 15px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .listings-page *, .listings-page *::before, .listings-page *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;function Ct({id:e,label:t,value:n,onChange:r,children:i}){return(0,p.jsxs)(`label`,{className:`listing-filter`,htmlFor:e,children:[(0,p.jsx)(`span`,{children:t}),(0,p.jsx)(`select`,{id:e,value:n,onChange:e=>r(e.target.value),children:i})]})}function wt({id:e,label:t,options:n,values:r,onChange:i}){let[a,o]=(0,f.useState)(``),s=(0,f.useDeferredValue)(a.trim().toLocaleLowerCase(`fa`)),c=s?n.filter(e=>e.toLocaleLowerCase(`fa`).includes(s)):n,l=e=>i(r.includes(e)?r.filter(t=>t!==e):[...r,e]);return(0,p.jsxs)(`div`,{className:`listing-multiselect`,children:[(0,p.jsx)(`span`,{id:`${e}-label`,children:t}),(0,p.jsxs)(`details`,{children:[(0,p.jsxs)(`summary`,{"aria-labelledby":`${e}-label`,children:[(0,p.jsx)(`span`,{children:r.length?`${v(r.length)} محله انتخاب شده`:`همه محله‌ها`}),r.length>0&&(0,p.jsx)(`small`,{children:v(r.length)})]}),(0,p.jsxs)(`div`,{className:`listing-multiselect__panel`,children:[(0,p.jsx)(`input`,{type:`search`,value:a,onChange:e=>o(e.target.value),placeholder:`جستجوی محله`,"aria-label":`جستجوی محله`}),(0,p.jsx)(`div`,{className:`listing-multiselect__options`,role:`group`,"aria-labelledby":`${e}-label`,children:c.map(e=>(0,p.jsxs)(`label`,{children:[(0,p.jsx)(`input`,{type:`checkbox`,checked:r.includes(e),onChange:()=>l(e)}),(0,p.jsx)(`span`,{children:e})]},e))}),r.length>0&&(0,p.jsx)(`button`,{className:`listing-multiselect__clear`,type:`button`,onClick:()=>i([]),children:`پاک کردن محله‌ها`})]})]})]})}function Tt({onApply:e,resultCount:t}){let[n,r]=(0,f.useState)(null),[i,a]=(0,f.useState)(`idle`),[o,s]=(0,f.useState)(``),[c,l]=(0,f.useState)(!1),u=(0,f.useRef)(null),d=(0,f.useRef)(null),m=(0,f.useRef)([]),h=(0,f.useRef)(null);(0,f.useEffect)(()=>{let e=new AbortController;return fetch(`/ai/voice/status`,{signal:e.signal}).then(e=>e.ok?e.json():{enabled:!1}).then(e=>r(!!e.enabled)).catch(()=>r(!1)),()=>e.abort()},[]);let g=()=>{h.current&&window.clearTimeout(h.current),h.current=null,d.current?.getTracks().forEach(e=>e.stop()),d.current=null,u.current=null};(0,f.useEffect)(()=>()=>g(),[]);let _=async t=>{a(`processing`),l(!1),s(`در حال تبدیل صدا و ساخت فیلترها…`);try{let n=await fetch(`/ai/voice/catalog-filters`,{method:`POST`,headers:{"Content-Type":t.type.split(`;`)[0]||`audio/webm`},body:t}),r=await n.json();if(!n.ok)throw Error(r.message||`HTTP ${n.status}`);e(r.filters||{}),s(`درخواست «${r.transcript}» به فیلترهای کاتالوگ تبدیل شد.`)}catch(e){l(!0),s(e.message||`پردازش درخواست صوتی ناموفق بود.`)}finally{a(`idle`)}};return n===!1?(0,p.jsx)(`div`,{className:`catalog-voice`,children:(0,p.jsxs)(`div`,{className:`catalog-voice__copy`,children:[(0,p.jsx)(`strong`,{children:`جستجوی صوتی`}),(0,p.jsx)(`p`,{children:`برای فعال‌شدن ورودی و خروجی صوتی، کلید سرور OpenAI را تنظیم کنید.`})]})}):(0,p.jsxs)(`div`,{className:`catalog-voice`,children:[(0,p.jsxs)(`div`,{className:`catalog-voice__copy`,children:[(0,p.jsx)(`strong`,{children:`فیلتر با صدای شما`}),(0,p.jsx)(`p`,{children:`مثلاً بگویید: «آپارتمان‌های ونک و میرداماد، بالای ۷۰ امتیاز، شخصی و دارای پارکینگ».`})]}),(0,p.jsxs)(`div`,{className:`catalog-voice__actions`,children:[(0,p.jsxs)(`button`,{className:`catalog-voice__button${i===`recording`?` is-recording`:``}`,type:`button`,disabled:n!==!0||![`idle`,`recording`].includes(i),"aria-pressed":i===`recording`,onClick:i===`recording`?()=>{u.current?.state===`recording`&&u.current.stop()}:async()=>{if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder>`u`){l(!0),s(`مرورگر شما ضبط صدا را پشتیبانی نمی‌کند.`);return}try{let e=await navigator.mediaDevices.getUserMedia({audio:!0});d.current=e,m.current=[];let t=[`audio/webm;codecs=opus`,`audio/ogg;codecs=opus`,`audio/webm`].find(e=>MediaRecorder.isTypeSupported(e)),n=new MediaRecorder(e,t?{mimeType:t}:void 0);u.current=n,n.ondataavailable=e=>{e.data.size&&m.current.push(e.data)},n.onstop=()=>{let e=new Blob(m.current,{type:n.mimeType||`audio/webm`});g(),e.size&&_(e)},n.start(),a(`recording`),l(!1),s(`در حال ضبط؛ درخواست ملک را بگویید. ضبط حداکثر ۲۰ ثانیه است.`),h.current=window.setTimeout(()=>n.stop(),2e4)}catch(e){g(),l(!0),s(e.name===`NotAllowedError`?`برای استفاده از جستجوی صوتی، دسترسی میکروفن را فعال کنید.`:`شروع ضبط صدا ناموفق بود.`)}},children:[(0,p.jsxs)(`svg`,{"aria-hidden":`true`,width:`17`,height:`17`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,children:[(0,p.jsx)(`rect`,{x:`9`,y:`2`,width:`6`,height:`12`,rx:`3`}),(0,p.jsx)(`path`,{d:`M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8`})]}),i===`recording`?`پایان ضبط`:i===`processing`?`در حال پردازش`:`گفتن فیلترها`]}),(0,p.jsxs)(`button`,{className:`catalog-voice__button`,type:`button`,disabled:n!==!0||i!==`idle`,onClick:async()=>{a(`speaking`),l(!1),s(`در حال ساخت صدای نتیجه با OpenAI…`);try{let e=await fetch(`/ai/voice/speech`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({text:`طبق فیلترهای فعلی، ${t} آگهی منطبق پیدا شده است.`})});if(!e.ok){let t=await e.json().catch(()=>({}));throw Error(t.message||`HTTP ${e.status}`)}let n=URL.createObjectURL(await e.blob()),r=new Audio(n);r.onended=()=>URL.revokeObjectURL(n),r.onerror=()=>URL.revokeObjectURL(n),await r.play(),s(`صدای پخش‌شده با هوش مصنوعی OpenAI تولید شده است.`)}catch(e){l(!0),s(e.message||`ساخت یا پخش صدا ناموفق بود.`)}finally{a(`idle`)}},children:[(0,p.jsxs)(`svg`,{"aria-hidden":`true`,width:`17`,height:`17`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,children:[(0,p.jsx)(`path`,{d:`M11 5 6 9H2v6h4l5 4V5Z`}),(0,p.jsx)(`path`,{d:`M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12`})]}),`شنیدن نتیجه`]})]}),o&&(0,p.jsx)(`p`,{className:`catalog-voice__status`,role:c?`alert`:`status`,"data-error":c,children:o})]})}function Et({listing:e}){let t=e.propertyDetails||{},n=Object.entries(e.amenities||{}).filter(([,e])=>e===!0);return(0,p.jsxs)(`article`,{className:`catalog-card`,children:[(0,p.jsxs)(`div`,{className:`catalog-card__top`,children:[(0,p.jsxs)(`div`,{className:`catalog-card__identity`,children:[(0,p.jsxs)(`span`,{className:`catalog-card__location`,children:[(0,p.jsx)(E,{name:`location`,size:15}),e.neighborhood||e.district||`مکان نامشخص`]}),(0,p.jsx)(`h2`,{children:(0,p.jsx)(`a`,{href:`/listing/${e.token}`,children:e.title})}),(0,p.jsx)(`p`,{children:e.description||`توضیح عمومی برای این آگهی ثبت نشده است.`})]}),(0,p.jsxs)(`div`,{className:`catalog-card__price`,children:[e.scenarioScore&&(0,p.jsxs)(`div`,{className:`scenario-score-badge`,"aria-label":`امتیاز سناریوی ${e.scenarioScore.scenarioName}`,children:[(0,p.jsx)(`span`,{children:e.scenarioScore.scenarioName}),(0,p.jsx)(`strong`,{children:v(e.scenarioScore.recommendation)}),(0,p.jsxs)(`small`,{children:[`رتبه `,v(e.scenarioScore.rank)]})]}),!e.scenarioScore&&e.marketScore&&(0,p.jsxs)(`div`,{className:`scenario-score-badge`,"aria-label":`امتیاز فعال بازار`,children:[(0,p.jsx)(`span`,{children:`امتیاز بازار`}),(0,p.jsx)(`strong`,{children:v(e.marketScore.recommendation)}),(0,p.jsxs)(`small`,{children:[`رتبه `,v(e.marketScore.rank)]})]}),(0,p.jsx)(`small`,{className:`catalog-card__price-label`,children:`قیمت کل`}),(0,p.jsx)(`strong`,{children:x(e.pricing?.price)}),(0,p.jsxs)(`span`,{children:[`هر متر `,x(e.pricing?.pricePerMeter)]})]})]}),(0,p.jsxs)(`dl`,{className:`catalog-facts`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`متراژ`}),(0,p.jsxs)(`dd`,{children:[v(e.property?.area),` متر`]})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`اتاق`}),(0,p.jsx)(`dd`,{children:v(e.property?.rooms)})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`سال ساخت`}),(0,p.jsx)(`dd`,{children:y(e.property?.constructionYear)})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`طبقه`}),(0,p.jsx)(`dd`,{children:v(e.property?.floor)})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`نوع ملک`}),(0,p.jsx)(`dd`,{children:t.propertyType||`—`})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`تصاویر`}),(0,p.jsx)(`dd`,{children:v(e.imageCount||0)})]})]}),(0,p.jsxs)(`div`,{className:`catalog-card__foot`,children:[(0,p.jsxs)(`div`,{className:`catalog-tags`,"aria-label":`ویژگی‌های آگهی`,children:[(0,p.jsx)(`span`,{className:`status-pill status-pill--${e.lifecycle?.status||`unknown`}`,children:vt[e.lifecycle?.status]||`نامشخص`}),(0,p.jsx)(`span`,{className:`status-pill`,children:yt[e.quality?.outcome]||`طبقه‌بندی‌نشده`}),(0,p.jsx)(`span`,{className:`status-pill status-pill--advertiser-${e.advertiserType}`,children:bt[e.advertiserType]||`نامشخص`}),n.slice(0,4).map(([e])=>(0,p.jsx)(`span`,{className:`detail-chip`,children:e},e))]}),(0,p.jsxs)(`a`,{className:`catalog-detail-link`,href:`/listing/${e.token}`,children:[`مشاهده جزئیات `,(0,p.jsx)(E,{name:`arrow`,size:16})]})]})]})}function Dt(){T();let e=new URLSearchParams(window.location.search),[t,n]=(0,f.useState)([]),[r,i]=(0,f.useState)(!0),[a,o]=(0,f.useState)(null),[s,c]=(0,f.useState)(e.get(`q`)||``),[l,u]=(0,f.useState)([...new Set(e.getAll(`district`).filter(e=>e&&e!==`all`))]),[d,m]=(0,f.useState)(e.get(`category`)||`all`),[h,g]=(0,f.useState)(e.get(`readiness`)||`all`),[_,y]=(0,f.useState)(e.get(`status`)||`active`),[b,x]=(0,f.useState)(e.get(`advertiserType`)||`all`),[S,C]=(0,f.useState)(e.get(`scenario`)||`all`),[w,ee]=(0,f.useState)([]),[D,te]=(0,f.useState)({districts:[],categories:[],bounds:{}}),[ie,ae]=(0,f.useState)(0),[oe,se]=(0,f.useState)(e.get(`minPrice`)||``),[O,k]=(0,f.useState)(e.get(`maxPrice`)||``),[ce,le]=(0,f.useState)(e.get(`minPricePerMeter`)||``),[ue,de]=(0,f.useState)(e.get(`maxPricePerMeter`)||``),[A,j]=(0,f.useState)(e.get(`minArea`)||``),[M,fe]=(0,f.useState)(e.get(`maxArea`)||``),[pe,me]=(0,f.useState)(e.get(`minRooms`)||``),[he,ge]=(0,f.useState)(e.get(`minYear`)||``),[_e,N]=(0,f.useState)(e.get(`minScore`)||``),[ve,ye]=(0,f.useState)(e.get(`maxScore`)||``),[P,be]=(0,f.useState)(e.get(`minConfidence`)||``),[xe,Se]=(0,f.useState)(e.get(`maxRisk`)||``),[Ce,we]=(0,f.useState)(e.get(`scoreBand`)||`all`),[Te,Ee]=(0,f.useState)(e.getAll(`amenity`)),De=JSON.stringify([s,l,d,h,_,b,S,oe,O,ce,ue,A,M,pe,he,_e,ve,P,xe,Ce,Te]),[Oe,ke]=(0,f.useState)({page:0,filterKey:De}),Ae=Oe.filterKey===De?Oe.page:0;(0,f.useEffect)(()=>{let e=new AbortController;i(!0),o(null);let t=setTimeout(()=>{let t=new URLSearchParams({limit:String(xt),offset:String(Ae*xt)}),r=(e,n)=>{n&&n!==`all`&&t.set(e,n)};r(`q`,s.trim()),l.forEach(e=>t.append(`district`,e)),r(`category`,d),r(`readiness`,h),r(`status`,_),r(`advertiserType`,b),r(`minPrice`,oe),r(`maxPrice`,O),r(`minPricePerMeter`,ce),r(`maxPricePerMeter`,ue),r(`minArea`,A),r(`maxArea`,M),r(`minRooms`,pe),r(`minYear`,he),r(`minScore`,_e),r(`maxScore`,ve),r(`minConfidence`,P),r(`maxRisk`,xe),r(`scoreBand`,Ce),Te.forEach(e=>t.append(`amenity`,e));let a=S===`all`?`/listings?${t}`:`/scoring-scenarios/${encodeURIComponent(S)}/scores?${t}`;fetch(a,{signal:e.signal,headers:{accept:`application/json`}}).then(e=>e.ok?e.json():Promise.reject(Error(`HTTP ${e.status}`))).then(e=>{let t=Math.max(0,Math.ceil((e.total||0)/xt)-1);if(Ae>t){ke({page:t,filterKey:De});return}n(e.listings||[]),ae(e.total||0)}).catch(e=>{e.name!==`AbortError`&&o(e.message)}).finally(()=>{e.signal.aborted||i(!1)})},250);return()=>{clearTimeout(t),e.abort()}},[s,l,d,h,_,b,S,oe,O,ce,ue,A,M,pe,he,_e,ve,P,xe,Ce,Te,Ae,De]),(0,f.useEffect)(()=>{fetch(`/listing-facets`).then(e=>e.json()).then(te).catch(()=>{})},[]),(0,f.useEffect)(()=>{fetch(`/scoring-scenarios`).then(e=>e.ok?e.json():{scenarios:[]}).then(e=>ee(e.scenarios||[])).catch(()=>{})},[]);let je=t,Me=Math.ceil(ie/xt),Ne=e=>{ke({page:e,filterKey:De}),document.getElementById(`catalog-results`)?.scrollIntoView({block:`start`})};(0,f.useEffect)(()=>{let e=new URLSearchParams;s&&e.set(`q`,s),l.forEach(t=>e.append(`district`,t)),d!==`all`&&e.set(`category`,d),h!==`all`&&e.set(`readiness`,h),b!==`all`&&e.set(`advertiserType`,b),S!==`all`&&e.set(`scenario`,S),_!==`active`&&e.set(`status`,_),[[`minPrice`,oe],[`maxPrice`,O],[`minPricePerMeter`,ce],[`maxPricePerMeter`,ue],[`minArea`,A],[`maxArea`,M],[`minRooms`,pe],[`minYear`,he],[`minScore`,_e],[`maxScore`,ve],[`minConfidence`,P],[`maxRisk`,xe]].forEach(([t,n])=>{n&&e.set(t,n)}),Te.forEach(t=>e.append(`amenity`,t)),Ce!==`all`&&e.set(`scoreBand`,Ce),window.history.replaceState(null,``,`/catalog${e.size?`?${e}`:``}`)},[s,l,d,h,_,b,S,oe,O,ce,ue,A,M,pe,he,_e,ve,P,xe,Ce,Te]);let Pe=()=>{c(``),u([]),m(`all`),g(`all`),y(`active`),x(`all`),C(`all`),se(``),k(``),le(``),de(``),j(``),fe(``),me(``),ge(``),N(``),ye(``),be(``),Se(``),we(`all`),Ee([])},Fe=e=>Ee(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]),Ie=e=>{let t=e=>Number.isFinite(e)?String(e):``;c(e.query||``),u(Array.isArray(e.districts)?e.districts:[]),m(e.category||`all`),g(e.readiness||`all`),y(e.status||`active`),x(e.advertiserType||`all`),C(e.scenarioId||`all`),se(t(e.minPrice)),k(t(e.maxPrice)),le(t(e.minPricePerMeter)),de(t(e.maxPricePerMeter)),j(t(e.minArea)),fe(t(e.maxArea)),me(t(e.minRooms)),ge(t(e.minYear)),N(t(e.minScore)),ye(t(e.maxScore)),be(t(e.minConfidence)),Se(t(e.maxRisk)),we(e.scoreBand||`all`),Ee(Array.isArray(e.amenities)?e.amenities:[])},Le=[h!==`all`,b!==`all`,!!oe,!!O,!!ce,!!ue,!!A,!!M,!!pe,!!he,!!_e,!!ve,!!P,!!xe,Ce!==`all`].filter(Boolean).length+Te.length;return(0,p.jsxs)(`div`,{className:`listings-page`,dir:`rtl`,children:[(0,p.jsx)(`style`,{children:St}),(0,p.jsx)(ne,{active:`listings`}),(0,p.jsxs)(`main`,{className:`listings-main`,id:`main-content`,children:[(0,p.jsxs)(`header`,{className:`listings-hero`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsxs)(`span`,{className:`location-kicker`,children:[(0,p.jsx)(E,{name:`database`,size:17}),` فهرست داده‌های عمومی`]}),(0,p.jsx)(`h1`,{children:`آگهی‌های جمع‌آوری‌شده`}),(0,p.jsx)(`p`,{children:`جزئیات عمومی ملک‌ها، دسته‌بندی‌شده بر اساس مکان، نوع آگهی، وضعیت انتشار و آمادگی تحلیل.`})]}),(0,p.jsxs)(`div`,{className:`listing-total`,children:[(0,p.jsx)(`strong`,{children:v(ie)}),(0,p.jsx)(`span`,{children:`آگهی منطبق`})]})]}),(0,p.jsxs)(`section`,{className:`listing-filters`,"aria-label":`فیلتر آگهی‌ها`,children:[(0,p.jsxs)(`div`,{className:`listing-filters__toolbar`,children:[(0,p.jsx)(`h2`,{children:`فیلتر آگهی‌ها`}),(0,p.jsx)(`button`,{className:`listing-reset`,type:`button`,onClick:Pe,children:`پاک‌کردن فیلترها`})]}),(0,p.jsx)(Tt,{onApply:Ie,resultCount:ie}),(0,p.jsxs)(`label`,{className:`listing-filter listing-filter--search`,htmlFor:`listing-search`,children:[(0,p.jsx)(`span`,{children:`جستجو`}),(0,p.jsx)(`span`,{className:`listing-search__icon`,"aria-hidden":`true`,children:(0,p.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.9`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,p.jsx)(`circle`,{cx:`10.8`,cy:`10.8`,r:`6.7`}),(0,p.jsx)(`path`,{d:`m16 16 4.2 4.2`})]})}),(0,p.jsx)(`input`,{id:`listing-search`,value:s,onChange:e=>c(e.target.value),placeholder:`عنوان، محله یا شناسه آگهی`})]}),(0,p.jsx)(wt,{id:`district-filter`,label:`محله‌ها`,options:D.districts,values:l,onChange:u}),(0,p.jsxs)(Ct,{id:`category-filter`,label:`دسته`,value:d,onChange:m,children:[(0,p.jsx)(`option`,{value:`all`,children:`همه دسته‌ها`}),D.categories.map(e=>(0,p.jsx)(`option`,{children:e},e))]}),(0,p.jsxs)(Ct,{id:`lifecycle-filter`,label:`وضعیت انتشار`,value:_,onChange:y,children:[(0,p.jsx)(`option`,{value:`all`,children:`همه`}),(0,p.jsx)(`option`,{value:`active`,children:`فعال`}),(0,p.jsx)(`option`,{value:`not-seen`,children:`دیده‌نشده`}),(0,p.jsx)(`option`,{value:`possibly-removed`,children:`احتمال حذف`}),(0,p.jsx)(`option`,{value:`removed`,children:`حذف‌شده`})]}),(0,p.jsxs)(Ct,{id:`scenario-filter`,label:`سناریوی مرتب‌سازی`,value:S,onChange:C,children:[(0,p.jsx)(`option`,{value:`all`,children:`امتیاز اصلی بازار`}),w.map(e=>(0,p.jsx)(`option`,{value:e.scenarioId,children:e.name},e.scenarioId))]}),(0,p.jsx)(`p`,{className:`scenario-filter-note`,children:S===`all`?`فیلتر امتیاز بر اساس آخرین مدل فعال بازار اعمال می‌شود.`:`نتایج با امتیاز سناریوی انتخاب‌شده دوباره محاسبه و از بیشترین امتیاز مرتب می‌شوند.`}),l.length>0&&(0,p.jsx)(`div`,{className:`listing-filter-chips`,"aria-label":`محله‌های انتخاب‌شده`,children:l.map(e=>(0,p.jsxs)(`button`,{type:`button`,onClick:()=>u(t=>t.filter(t=>t!==e)),children:[e,(0,p.jsx)(`span`,{"aria-hidden":`true`,children:`×`})]},e))}),(0,p.jsxs)(`details`,{className:`listing-filters__advanced`,defaultOpen:Le>0,children:[(0,p.jsxs)(`summary`,{children:[(0,p.jsx)(`span`,{children:`فیلترهای بیشتر`}),Le>0&&(0,p.jsx)(`span`,{className:`listing-filters__count`,children:v(Le)}),(0,p.jsx)(`span`,{className:`listing-filters__chevron`,"aria-hidden":`true`,children:(0,p.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.9`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,p.jsx)(`path`,{d:`m6 9 6 6 6-6`})})})]}),(0,p.jsxs)(`div`,{className:`listing-filters__advanced-body`,children:[(0,p.jsxs)(Ct,{id:`readiness-filter`,label:`پوشش داده`,value:h,onChange:g,children:[(0,p.jsx)(`option`,{value:`all`,children:`همه وضعیت‌ها`}),(0,p.jsx)(`option`,{value:`scoring-ready`,children:`آماده امتیازدهی`}),(0,p.jsx)(`option`,{value:`history-only`,children:`فقط سابقه`})]}),(0,p.jsxs)(Ct,{id:`advertiser-filter`,label:`نوع آگهی‌دهنده`,value:b,onChange:x,children:[(0,p.jsx)(`option`,{value:`all`,children:`همه آگهی‌دهندگان`}),(0,p.jsx)(`option`,{value:`personal`,children:`فایل شخصی`}),(0,p.jsx)(`option`,{value:`real-estate-business`,children:`مشاور املاک`}),(0,p.jsx)(`option`,{value:`unknown`,children:`نامشخص`})]}),(0,p.jsxs)(`div`,{className:`listing-range-card`,children:[(0,p.jsx)(`strong`,{children:S===`all`?`امتیاز اصلی بازار`:`امتیاز سناریوی انتخاب‌شده`}),(0,p.jsxs)(`label`,{children:[`از`,(0,p.jsx)(`input`,{inputMode:`numeric`,min:`0`,max:`100`,value:_e,onChange:e=>N(e.target.value),placeholder:`۰`})]}),(0,p.jsxs)(`label`,{children:[`تا`,(0,p.jsx)(`input`,{inputMode:`numeric`,min:`0`,max:`100`,value:ve,onChange:e=>ye(e.target.value),placeholder:`۱۰۰`})]})]}),(0,p.jsxs)(Ct,{id:`score-band-filter`,label:`رده امتیاز`,value:Ce,onChange:we,children:[(0,p.jsx)(`option`,{value:`all`,children:`همه رده‌ها`}),(0,p.jsx)(`option`,{value:`strong-value`,children:`ارزش قوی`}),(0,p.jsx)(`option`,{value:`promising`,children:`امیدبخش`}),(0,p.jsx)(`option`,{value:`fair`,children:`منصفانه`}),(0,p.jsx)(`option`,{value:`weak-value`,children:`ضعیف`})]}),(0,p.jsxs)(`label`,{className:`listing-filter`,children:[(0,p.jsx)(`span`,{children:`حداقل اطمینان`}),(0,p.jsx)(`input`,{inputMode:`numeric`,min:`0`,max:`100`,value:P,onChange:e=>be(e.target.value),placeholder:`مثلاً ۶۰`})]}),(0,p.jsxs)(`label`,{className:`listing-filter`,children:[(0,p.jsx)(`span`,{children:`حداکثر ریسک`}),(0,p.jsx)(`input`,{inputMode:`numeric`,min:`0`,max:`100`,value:xe,onChange:e=>Se(e.target.value),placeholder:`مثلاً ۳۰`})]}),(0,p.jsxs)(`div`,{className:`listing-range-card`,children:[(0,p.jsx)(`strong`,{children:`قیمت کل`}),(0,p.jsxs)(`label`,{children:[`از`,(0,p.jsx)(`input`,{inputMode:`numeric`,value:oe,onChange:e=>se(e.target.value),placeholder:`حداقل تومان`})]}),(0,p.jsxs)(`label`,{children:[`تا`,(0,p.jsx)(`input`,{inputMode:`numeric`,value:O,onChange:e=>k(e.target.value),placeholder:`حداکثر تومان`})]})]}),(0,p.jsxs)(`div`,{className:`listing-range-card`,children:[(0,p.jsx)(`strong`,{children:`قیمت هر متر`}),(0,p.jsxs)(`label`,{children:[`از`,(0,p.jsx)(`input`,{inputMode:`numeric`,value:ce,onChange:e=>le(e.target.value),placeholder:`حداقل`})]}),(0,p.jsxs)(`label`,{children:[`تا`,(0,p.jsx)(`input`,{inputMode:`numeric`,value:ue,onChange:e=>de(e.target.value),placeholder:`حداکثر`})]})]}),(0,p.jsxs)(`div`,{className:`listing-range-card`,children:[(0,p.jsx)(`strong`,{children:`متراژ`}),(0,p.jsxs)(`label`,{children:[`از`,(0,p.jsx)(`input`,{inputMode:`numeric`,value:A,onChange:e=>j(e.target.value),placeholder:`حداقل متر`})]}),(0,p.jsxs)(`label`,{children:[`تا`,(0,p.jsx)(`input`,{inputMode:`numeric`,value:M,onChange:e=>fe(e.target.value),placeholder:`حداکثر متر`})]})]}),(0,p.jsxs)(`label`,{className:`listing-filter`,children:[(0,p.jsx)(`span`,{children:`حداقل اتاق`}),(0,p.jsx)(`input`,{inputMode:`numeric`,value:pe,onChange:e=>me(e.target.value),placeholder:`مثلاً ۲`})]}),(0,p.jsxs)(`label`,{className:`listing-filter`,children:[(0,p.jsx)(`span`,{children:`حداقل سال ساخت`}),(0,p.jsx)(`input`,{inputMode:`numeric`,value:he,onChange:e=>ge(e.target.value),placeholder:`مثلاً ۱۳۹۵`})]}),(0,p.jsxs)(`fieldset`,{className:`amenity-filter`,children:[(0,p.jsx)(`legend`,{children:`امکانات الزامی`}),[[`elevator`,`آسانسور`],[`parking`,`پارکینگ`],[`storage`,`انباری`],[`balcony`,`بالکن`]].map(([e,t])=>(0,p.jsx)(`button`,{type:`button`,"aria-pressed":Te.includes(e),className:Te.includes(e)?`is-active`:``,onClick:()=>Fe(e),children:t},e))]})]})]})]}),(0,p.jsx)(`div`,{id:`catalog-results`,className:`listing-results`,role:`status`,"aria-live":`polite`,children:r?`در حال دریافت نتایج`:a?`دریافت نتایج ناموفق بود`:ie>0?`نمایش ${v(Ae*xt+1)} تا ${v(Ae*xt+je.length)} از ${v(ie)} آگهی منطبق`:`آگهی منطبقی پیدا نشد`}),r&&(0,p.jsx)(`div`,{className:`location-state`,children:`در حال بارگذاری آگهی‌ها…`}),a&&(0,p.jsxs)(`div`,{className:`location-state location-state--error`,children:[`بارگذاری ناموفق بود: `,a]}),!r&&!a&&(0,p.jsxs)(`section`,{className:`catalog-grid`,"aria-label":`نتایج آگهی‌ها`,children:[je.map(e=>(0,p.jsx)(Et,{listing:e},e.token)),!je.length&&(0,p.jsxs)(`div`,{className:`catalog-empty`,children:[(0,p.jsx)(E,{name:`database`,size:32}),(0,p.jsx)(`h2`,{children:`آگهی منطبقی پیدا نشد`}),(0,p.jsx)(`p`,{children:`فیلترها را تغییر دهید یا پاک کنید.`}),(0,p.jsx)(`button`,{type:`button`,onClick:Pe,children:`نمایش آگهی‌های فعال`})]})]}),!a&&Me>1&&(0,p.jsxs)(`nav`,{className:`catalog-pagination`,"aria-label":`صفحه‌بندی آگهی‌ها`,children:[(0,p.jsx)(`button`,{type:`button`,disabled:r||Ae===0,onClick:()=>Ne(Ae-1),children:`صفحه قبل`}),(0,p.jsxs)(`span`,{children:[`صفحه `,v(Ae+1),` از `,v(Me)]}),(0,p.jsx)(`button`,{type:`button`,disabled:r||Ae+1>=Me,onClick:()=>Ne(Ae+1),children:`صفحه بعد`})]})]}),(0,p.jsx)(re,{})]})}var Ot=`modulepreload`,kt=function(e){return`/`+e},At={},jt=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=kt(t,n),t=s(t),t in At)return;At[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Ot,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Mt=`https://static.neshan.org/sdk/maplibre/styles/light.json`,Nt;function Pt(){return Nt||=jt(()=>import(`./neshan-maplibre-sdk-CW35iM0t.js`).then(e=>e.default),[]),Nt}function Ft(e){return Number.isFinite(e?.latitude)&&Number.isFinite(e?.longitude)}function It(e,t){let n=document.createElement(`button`);return n.type=`button`,n.className=`neshan-place-marker neshan-place-marker--${e}`,n.textContent=e===`property`?`ملک`:e===`metro`?`م`:`ا`,n.setAttribute(`aria-label`,t),n.title=t,n}function Lt(e,t){let n=document.createElement(`div`);n.className=`neshan-map-popup`;let r=document.createElement(`strong`);r.textContent=e;let i=document.createElement(`span`);return i.textContent=t,n.append(r,i),n}function Rt(e){if(Number.isFinite(e.routeDurationSeconds)){let t=Math.max(1,Math.round(e.routeDurationSeconds/60));return`${v(e.routeDistanceMeters)} متر · ${v(t)} دقیقه پیاده`}return`${v(e.distanceMeters)} متر`}function zt({coordinates:e,places:t=[]}){let n=(0,f.useRef)(null),r=(0,f.useRef)(null),[i,a]=(0,f.useState)(`loading`),[o,s]=(0,f.useState)(``);return(0,f.useEffect)(()=>{if(!Ft(e))return;let i=new AbortController,o=!1;return a(`loading`),s(``),Promise.all([Pt(),fetch(`/map-config`,{signal:i.signal,headers:{accept:`application/json`}}).then(async e=>{let t=await e.json();if(!e.ok)throw Error(`HTTP ${e.status}`);return t})]).then(([i,c])=>{if(o||!n.current)return;if(!c.key)throw Error(`کلید عمومی نقشه نشان تنظیم نشده است.`);r.current?.remove();let l=[e.longitude,e.latitude],u=new i.Map({container:n.current,style:Mt,center:l,zoom:15,minZoom:2,maxZoom:21,trackResize:!0,apiKey:c.key,logoPosition:`bottom-left`,copyRightPosition:`bottom-right`});u.addControl(new i.NavigationControl({showCompass:!1}),`top-left`);let d=new i.LngLatBounds(l,l),f=new i.Popup({offset:22}).setDOMContent(Lt(`موقعیت تقریبی ملک`,`مختصات عمومی ذخیره‌شده برای آگهی`));new i.Marker({element:It(`property`,`موقعیت تقریبی ملک`),anchor:`bottom`}).setLngLat(l).setPopup(f).addTo(u);for(let e of t.filter(e=>Ft(e.coordinates))){let t=e.category===`metro-station`?`metro`:`bus`,n=[e.coordinates.longitude,e.coordinates.latitude],r=`${e.title}، ${Rt(e)}`;new i.Marker({element:It(t,r),anchor:`bottom`}).setLngLat(n).setPopup(new i.Popup({offset:18}).setDOMContent(Lt(e.title,Rt(e)))).addTo(u),d.extend(n)}t.some(e=>Ft(e.coordinates))&&u.fitBounds(d,{padding:54,maxZoom:16,duration:0}),u.once(`load`,()=>{o||a(`ready`)}),u.on(`error`,e=>{!o&&e?.error&&s(`بخشی از داده‌های نقشه نشان بارگذاری نشد.`)}),r.current=u}).catch(e=>{!o&&e.name!==`AbortError`&&(a(`error`),s(e.message))}),()=>{o=!0,i.abort(),r.current?.remove(),r.current=null}},[e?.latitude,e?.longitude,t]),Ft(e)?(0,p.jsxs)(`div`,{className:`listing-map-shell`,children:[(0,p.jsx)(`div`,{className:`listing-map`,ref:n,"aria-label":`نقشه موقعیت تقریبی ملک، مترو و ایستگاه اتوبوس`}),i===`loading`&&(0,p.jsx)(`p`,{className:`listing-map-loading`,role:`status`,children:`در حال بارگذاری نقشه نشان…`}),o&&(0,p.jsx)(`p`,{className:`listing-map-error`,role:`alert`,children:o}),(0,p.jsxs)(`div`,{className:`listing-map-legend`,"aria-label":`راهنمای نشانگرهای نقشه`,children:[(0,p.jsxs)(`span`,{children:[(0,p.jsx)(`i`,{className:`legend-property`}),`ملک`]}),(0,p.jsxs)(`span`,{children:[(0,p.jsx)(`i`,{className:`legend-metro`}),`مترو`]}),(0,p.jsxs)(`span`,{children:[(0,p.jsx)(`i`,{className:`legend-bus`}),`اتوبوس`]})]})]}):(0,p.jsx)(`div`,{className:`listing-map-empty`,children:`مختصات عمومی برای این آگهی موجود نیست.`})}function Bt(e,t,n){return t<=1?0:(Math.max(0,Math.min(e,t-1))+n+t)%t}function Vt(e,t){let n=t.x-e.x,r=t.y-e.y;return Math.abs(n)<45||Math.abs(n)<Math.abs(r)*1.3?0:n<0?1:-1}function Ht({images:e,title:t}){let n=(0,f.useMemo)(()=>Array.isArray(e)?e.filter(e=>typeof e?.url==`string`&&e.url.trim()):[],[e]),[r,i]=(0,f.useState)(0),[a,o]=(0,f.useState)(!1),[s,c]=(0,f.useState)({}),l=(0,f.useRef)(null),u=(0,f.useRef)(null),d=(0,f.useRef)(0),m=Math.min(r,Math.max(n.length-1,0)),h=n[m],g=(0,f.useCallback)(e=>{n.length<2||i(t=>Bt(t,n.length,e))},[n.length]);(0,f.useEffect)(()=>{if(!a||!n.length)return;let e=l.current;if(!e)return;let t=document.body.style.overflow,r=document.activeElement;return document.body.style.overflow=`hidden`,e.open||e.showModal(),()=>{e.open&&e.close(),document.body.style.overflow=t,r instanceof HTMLElement&&r.isConnected&&r.focus()}},[a,n.length]);let _=e=>{(e.pointerType!==`mouse`||e.button===0)&&(u.current={x:e.clientX,y:e.clientY,id:e.pointerId},e.currentTarget.setPointerCapture?.(e.pointerId))},y=e=>{let t=u.current;if(u.current=null,!t||t.id!==e.pointerId)return;let n=Vt(t,{x:e.clientX,y:e.clientY});n&&(d.current=Date.now()+500,g(n))},b=e=>c(t=>t[e]?t:{...t,[e]:!0}),x=(e,n)=>e.alt||`تصویر ${v(n+1)} ${t||`آگهی`}`;if(!h)return null;let S=(e,t,n)=>s[e.url]?(0,p.jsx)(`span`,{className:`${n} listing-photo__unavailable`,children:`تصویر در دسترس نیست`}):(0,p.jsx)(`img`,{className:n,src:e.url,alt:x(e,t),draggable:`false`,loading:n===`listing-photo__thumbnail-image`?`lazy`:`eager`,referrerPolicy:`no-referrer`,onError:()=>b(e.url)}),C=n.length>1&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`button`,{type:`button`,className:`listing-photo__arrow listing-photo__arrow--left`,onClick:()=>g(-1),"aria-label":`تصویر قبلی`,title:`تصویر قبلی`,children:(0,p.jsx)(E,{name:`back`,size:21})}),(0,p.jsx)(`button`,{type:`button`,className:`listing-photo__arrow listing-photo__arrow--right`,onClick:()=>g(1),"aria-label":`تصویر بعدی`,title:`تصویر بعدی`,children:(0,p.jsx)(E,{name:`arrow`,size:21})})]});return(0,p.jsxs)(`section`,{className:`listing-photo`,"aria-label":`تصاویر آگهی`,children:[(0,p.jsxs)(`div`,{className:`listing-photo__header`,children:[(0,p.jsx)(`h2`,{children:`تصاویر ملک`}),(0,p.jsxs)(`span`,{children:[v(n.length),` تصویر`]})]}),(0,p.jsxs)(`div`,{className:`listing-photo__stage`,children:[(0,p.jsxs)(`button`,{type:`button`,className:`listing-photo__open`,onPointerDown:_,onPointerUp:y,onPointerCancel:()=>{u.current=null},onClick:()=>{Date.now()>=d.current&&o(!0)},"aria-label":`نمایش بزرگ تصویر ${v(m+1)} از ${v(n.length)}`,title:`نمایش بزرگ تصویر`,children:[S(h,m,`listing-photo__image`),(0,p.jsx)(`span`,{className:`listing-photo__expand`,"aria-hidden":`true`,children:(0,p.jsx)(E,{name:`expand`,size:18})})]}),C,(0,p.jsxs)(`span`,{className:`listing-photo__counter`,"aria-live":`polite`,dir:`ltr`,children:[v(m+1),` / `,v(n.length)]})]}),n.length>1&&(0,p.jsx)(`div`,{className:`listing-photo__thumbnails`,"aria-label":`انتخاب تصویر`,children:n.map((e,t)=>(0,p.jsx)(`button`,{type:`button`,className:`listing-photo__thumbnail${t===m?` listing-photo__thumbnail--active`:``}`,onClick:()=>i(t),"aria-label":`نمایش تصویر ${v(t+1)}`,"aria-pressed":t===m,children:S(e,t,`listing-photo__thumbnail-image`)},`${e.url}-${t}`))}),(0,p.jsxs)(`dialog`,{ref:l,className:`listing-photo-viewer`,"aria-label":`نمایش تصاویر ملک`,onClose:()=>o(!1),onKeyDown:e=>{e.key===`ArrowLeft`&&(e.preventDefault(),g(-1)),e.key===`ArrowRight`&&(e.preventDefault(),g(1))},children:[(0,p.jsxs)(`div`,{className:`listing-photo-viewer__bar`,dir:`rtl`,children:[(0,p.jsxs)(`div`,{className:`listing-photo-viewer__heading`,children:[(0,p.jsx)(`strong`,{children:`تصاویر ملک`}),(0,p.jsxs)(`span`,{"aria-live":`polite`,dir:`ltr`,children:[v(m+1),` / `,v(n.length)]})]}),(0,p.jsx)(`button`,{type:`button`,className:`listing-photo-viewer__close`,onClick:()=>o(!1),"aria-label":`بستن نمایش تصاویر`,title:`بستن`,autoFocus:!0,children:(0,p.jsx)(E,{name:`close`,size:22})})]}),(0,p.jsxs)(`div`,{className:`listing-photo-viewer__content`,children:[(0,p.jsx)(`div`,{className:`listing-photo-viewer__swipe`,onPointerDown:_,onPointerUp:y,onPointerCancel:()=>{u.current=null},children:S(h,m,`listing-photo-viewer__image`)}),C]})]})]})}function Ut(e){let t=e?.property||{},n=e?.amenities||{},r=[],i=[];return n.parking===!1&&r.push(`پارکینگ ندارد`),n.elevator===!1&&Number.isFinite(t.floor)&&t.floor>0?r.push(`طبقه بالای همکف بدون آسانسور`):n.elevator===!1&&r.push(`آسانسور ندارد`),(!Number.isFinite(t.area)||t.area<=0)&&i.push(`متراژ`),Number.isFinite(t.constructionYear)||i.push(`سال ساخت`),Number.isFinite(t.floor)||i.push(`طبقه`),e?.propertyDetails?.deedType?.trim()||i.push(`نوع سند`),typeof n.parking!=`boolean`&&i.push(`وضعیت پارکینگ`),typeof n.elevator!=`boolean`&&i.push(`وضعیت آسانسور`),{highlights:r,missing:i}}function Wt(e){let t=e?.listing,n=t?.evidence?.comparableCount,r=t?.valuation?.nearbyPricePerMeter,i=t?.asking?.askingPricePerMeter;if(!Number.isInteger(n)||n<5||!Number.isFinite(r)||r<=0||!Number.isFinite(i)||i<=0)return null;let a=i-r;return{sampleCount:n,reference:r,asking:i,difference:a,percent:a/r*100}}var Gt={active:`فعال`,"not-seen":`دیده‌نشده`,"possibly-removed":`احتمال حذف`,removed:`حذف‌شده`},Kt=new Intl.DateTimeFormat(`fa-IR-u-ca-persian`,{dateStyle:`medium`,timeStyle:`short`,timeZone:`Asia/Tehran`});function qt(e){if(!e)return`نامشخص`;let t=new Date(e);return Number.isNaN(t.valueOf())?`نامشخص`:Kt.format(t)}function Jt({listing:e,scoreDetail:t,scoreLoading:n}){let{highlights:r,missing:i}=Ut(e),a=Wt(t),o=a&&Math.abs(a.percent)>=.05?a.percent>0?`بالاتر`:`پایین‌تر`:null;return(0,p.jsxs)(`section`,{className:`listing-decision`,"aria-labelledby":`listing-decision-title`,children:[(0,p.jsxs)(`div`,{className:`listing-decision__heading`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{className:`listing-decision__eyebrow`,children:`نگاه سریع`}),(0,p.jsx)(`h2`,{id:`listing-decision-title`,children:`خلاصه بررسی آگهی`})]}),(0,p.jsxs)(`a`,{href:`#owj-specs`,children:[`مشخصات کامل `,(0,p.jsx)(E,{name:`back`,size:15})]})]}),(0,p.jsxs)(`dl`,{className:`listing-decision__facts`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`قیمت کل`}),(0,p.jsx)(`dd`,{children:x(e.pricing?.price)})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`قیمت هر متر`}),(0,p.jsx)(`dd`,{children:x(e.pricing?.pricePerMeter)})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`وضعیت آگهی`}),(0,p.jsx)(`dd`,{children:Gt[e.lifecycle?.status]||`نامشخص`})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`آخرین مشاهده آگهی`}),(0,p.jsx)(`dd`,{children:qt(e.lastSeenAt)})]})]}),(0,p.jsxs)(`div`,{className:`listing-decision__columns`,children:[(0,p.jsxs)(`div`,{className:`listing-decision__column`,children:[(0,p.jsxs)(`h3`,{children:[(0,p.jsx)(E,{name:`alert`,size:17}),` نکات قابل توجه`]}),r.length>0?(0,p.jsx)(`ul`,{className:`listing-decision__notes`,children:r.map(e=>(0,p.jsx)(`li`,{children:e},e))}):(0,p.jsx)(`p`,{children:`مورد مشخصی از اطلاعات موجود شناسایی نشد.`}),i.length>0&&(0,p.jsxs)(`p`,{className:`listing-decision__missing`,children:[(0,p.jsx)(`strong`,{children:`اطلاعات نامشخص:`}),` `,i.join(`، `)]})]}),(0,p.jsxs)(`div`,{className:`listing-decision__column listing-decision__comparison`,children:[(0,p.jsxs)(`h3`,{children:[(0,p.jsx)(E,{name:`trend`,size:17}),` مقایسه قیمت هر متر`]}),n?(0,p.jsx)(`p`,{role:`status`,children:`در حال دریافت تحلیل قیمت…`}):a?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`p`,{className:`listing-decision__result`,children:o?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(`strong`,{children:[v(Math.round(Math.abs(a.percent)*10)/10),`٪ `,o]}),` `,`از مبنای نمونه‌ها`]}):(0,p.jsx)(`strong`,{children:`تقریباً برابر با مبنای نمونه‌ها`})}),(0,p.jsxs)(`p`,{children:[`قیمت هر متر آگهی در زمان تحلیل:`,` `,(0,p.jsx)(`b`,{children:x(a.asking)})]}),(0,p.jsxs)(`p`,{children:[`میانه وزنی تعدیل‌شده نمونه‌ها:`,` `,(0,p.jsx)(`b`,{children:x(a.reference)})]}),o&&(0,p.jsxs)(`p`,{children:[`اختلاف هر متر:`,` `,(0,p.jsx)(`b`,{children:x(Math.abs(a.difference))})]}),(0,p.jsxs)(`small`,{children:[`بر اساس `,v(a.sampleCount),` آگهی مشابه در تحلیل `,qt(t.generatedAt),`. قیمت‌ها پیشنهادی‌اند، نه قیمت معامله قطعی؛ مبنای مقایسه برای تفاوت ویژگی‌های ملک تعدیل شده است.`]}),(0,p.jsxs)(`a`,{href:`#owj-comparables`,children:[`مشاهده نمونه‌ها `,(0,p.jsx)(E,{name:`back`,size:14})]})]}):(0,p.jsx)(`p`,{children:`تحلیل قیمت با حداقل ۵ نمونه مشابه معتبر در دسترس نیست.`})]})]})]})}var Yt={personal:`فایل شخصی`,"real-estate-business":`مشاور املاک`,unknown:`نامشخص`},Xt={elevator:`آسانسور`,parking:`پارکینگ`,storage:`انباری`,balcony:`بالکن`,rooftop:`روف‌گاردن`,lobby:`لابی`,doorman:`سرایدار`,security:`امنیت`,pool:`استخر`,sauna:`سونا`,gym:`باشگاه`,centralAntenna:`آنتن مرکزی`,airConditioning:`تهویه`,heating:`گرمایش`},Zt={deedType:`نوع سند`,buildingDirection:`جهت ساختمان`,unitPosition:`موقعیت واحد`,propertyType:`نوع ملک`,buildingCondition:`وضعیت بنا`,heating:`گرمایش`,cooling:`سرمایش`},Qt={"strong-value":`فرصت خرید بسیار خوب`,promising:`ارزش بررسی دارد`,fair:`قیمت نسبتاً منصفانه`,"weak-value":`ارزش خرید پایین`};function $t(e){return e==null||typeof e!=`string`&&typeof e!=`number`?e:String(e).replace(/[0-9\u0660-\u0669]/g,e=>{let t=e.charCodeAt(0),n=t>=1632?t-1632:t-48;return String.fromCharCode(1776+n)})}var en=new Intl.DateTimeFormat(`fa-IR-u-ca-persian`,{dateStyle:`medium`,timeZone:`Asia/Tehran`}),tn=new Intl.DateTimeFormat(`fa-IR-u-ca-persian`,{dateStyle:`medium`,timeStyle:`short`,timeZone:`Asia/Tehran`});function nn(e){if(!e)return`زمان انتشار نامشخص`;if(typeof e==`string`&&/^\d{4}-\d{2}-\d{2}(?:T|\s|$)/.test(e)){let t=new Date(e);if(!Number.isNaN(t.valueOf()))return/[T\s]\d{2}:\d{2}/.test(e)?tn.format(t):en.format(t)}return $t(e)}function rn(e){let t=Number.isFinite(e.routeDistanceMeters)?e.routeDistanceMeters:e.distanceMeters,n=Number.isFinite(e.routeDurationSeconds)?Math.max(1,Math.round(e.routeDurationSeconds/60)):null;return{distance:`${v(t)} متر`,duration:n===null?null:`${v(n)} دقیقه پیاده`}}var an=`
/* All presentation rules are intentionally embedded in SavedListingDetailPage.jsx.
   They are scoped to .owj-detail-page to avoid affecting other OWJ screens. */
.owj-detail-page {
  min-height: 100svh;
  min-width: 0;
  background: ${C.bg};
  color: ${C.text};
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
  color: ${C.textMuted};
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
  color: ${C.textSec};
  transition: color .18s ease;
}
.owj-detail-page .saved-detail-breadcrumb a:hover { color: ${C.primary}; }
.owj-detail-page .saved-detail-breadcrumb span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${C.text};
}
.owj-detail-page .saved-detail-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 365px);
  gap: clamp(20px, 3vw, 40px);
  align-items: start;
  padding: clamp(22px, 3vw, 38px);
  margin: 0 0 20px;
  background: ${C.surface};
  border: 1px solid ${C.border};
  border-radius: 24px;
  box-shadow: ${C.shadow};
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
  background: ${C.primary};
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
  border: 1px solid ${C.borderMed};
  border-radius: 999px;
  background: ${C.raised};
  color: ${C.textSec};
  font-size: 11px;
  font-weight: 650;
  line-height: 1.65;
  white-space: normal;
  overflow-wrap: anywhere;
}
.owj-detail-page .status-pill--active {
  background: ${C.secondaryBg};
  color: ${C.secondaryDark};
  border-color: ${C.secondaryBg2};
}
.owj-detail-page .score-tag {
  background: ${C.primaryBg};
  color: ${C.primary};
  border-color: ${C.primaryBg2};
}
.owj-detail-page .score-tag--strong-value {
  background: ${C.greenBg}; color: ${C.green}; border-color: ${C.greenBg2};
}
.owj-detail-page .score-tag--fair,
.owj-detail-page .score-tag--weak-value {
  background: ${C.orangeBg}; color: ${C.orange}; border-color: ${C.orangeBg2};
}
.owj-detail-page .score-tag--scenario {
  background: ${C.raised}; color: ${C.textSec}; border-color: ${C.border};
}
.owj-detail-page .saved-detail-hero h1 {
  max-width: 760px;
  margin: 0 0 13px;
  color: ${C.text};
  font-size: clamp(23px, 3vw, 35px);
  font-weight: 900;
  letter-spacing: -.5px;
  line-height: 1.65;
  overflow-wrap: anywhere;
}
.owj-detail-page .saved-description__text {
  margin: 0;
  max-width: 750px;
  color: ${C.textSec};
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
  color: ${C.primary};
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
  border-top: 1px solid ${C.border};
}
.owj-detail-page .saved-detail-highlights > span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 13px;
  background: ${C.raised};
  border: 1px solid ${C.border};
  border-radius: 12px;
  font-size: 12px;
  color: ${C.textSec};
}
.owj-detail-page .saved-detail-highlights strong {
  font-size: 13px; color: ${C.text}; font-weight: 800;
}
.owj-detail-page .saved-detail-price {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 11px;
  align-self: stretch;
  padding: 24px 21px;
  border-radius: 20px;
  background: ${C.raised};
  border: 1px solid ${C.borderMed};
}
.owj-detail-page .saved-detail-price > span {
  color: ${C.textMuted}; font-size: 12px; font-weight: 650;
}
.owj-detail-page .saved-detail-price > strong {
  color: ${C.text};
  font-size: clamp(25px, 2.3vw, 31px);
  font-weight: 900;
  line-height: 1.65;
  letter-spacing: -.55px;
  overflow-wrap: anywhere;
}
.owj-detail-page .saved-detail-price > small {
  color: ${C.textSec};
  font-size: 12px;
  line-height: 1.9;
  padding-bottom: 19px;
  margin-bottom: 6px;
  border-bottom: 1px solid ${C.borderMed};
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
  background: ${C.primary};
  border: 1px solid ${C.primary};
  color: #fff;
}
.owj-detail-page .saved-detail-price > a:hover { background: ${C.primaryLight}; transform: translateY(-1px); }
.owj-detail-page .saved-detail-price > button {
  order: 1;
  background: ${C.surface};
  border: 1px solid ${C.borderLight};
  color: ${C.text};
}
.owj-detail-page .saved-detail-price > button:hover:not(:disabled) { background: ${C.surfaceHover}; }
.owj-detail-page :where(.saved-detail-price button, .nearby-refresh):disabled {
  opacity: .58; cursor: not-allowed;
}
.owj-detail-page .saved-refetch-status {
  order: 2;
  margin: 0;
  color: ${C.textSec};
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
  border: 1px solid ${C.borderMed};
  background: ${C.surface};
  color: ${C.textSec};
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: color .18s ease, background .18s ease, border-color .18s ease;
}
.owj-detail-page .saved-detail-jumps a:hover,
.owj-detail-page .saved-detail-jumps a:focus-visible {
  border-color: ${C.primaryBg2};
  background: ${C.primaryBg};
  color: ${C.primary};
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
  background: ${C.surface};
  border: 1px solid ${C.border};
  border-radius: 21px;
  box-shadow: ${C.shadow};
  scroll-margin-top: 100px;
}
.owj-detail-page .saved-panel--wide,
.owj-detail-page .saved-panel--map {
  grid-column: 1 / -1;
}
.owj-detail-page .saved-panel h2 {
  margin: 0 0 15px;
  color: ${C.text};
  font-size: clamp(16px, 1.7vw, 19px);
  font-weight: 850;
  line-height: 1.65;
}
.owj-detail-page .saved-panel > p,
.owj-detail-page .saved-panel__head p {
  margin: 5px 0 0;
  color: ${C.textSec};
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
  border-color: ${C.primaryBg2};
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
  border: 1px solid ${C.primaryBg2};
  background: ${C.primaryBg};
  color: ${C.primary};
  font-size: 31px;
  font-weight: 900;
  line-height: 1.4;
  text-align: center;
}
.owj-detail-page .score-final small {
  color: ${C.primary};
  font-size: 10px;
  font-weight: 750;
  line-height: 1.6;
  text-align: center;
}
.owj-detail-page .score-final--strong-value {
  color: ${C.green}; border-color: ${C.greenBg2}; background: ${C.greenBg};
}
.owj-detail-page .score-final--strong-value small { color: ${C.green}; }
.owj-detail-page .score-final--weak-value {
  color: ${C.red}; border-color: ${C.redBg2}; background: ${C.redBg};
}
.owj-detail-page .score-final--weak-value small { color: ${C.red}; }
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
  background: ${C.raised};
  border: 1px solid ${C.border};
  border-radius: 13px;
}
.owj-detail-page :where(.saved-facts, .score-component-grid, .score-valuation-grid) dt,
.owj-detail-page .saved-stack dt {
  margin: 0;
  color: ${C.textMuted};
  font-size: 11px;
  font-weight: 650;
  line-height: 1.7;
}
.owj-detail-page :where(.saved-facts, .score-component-grid, .score-valuation-grid) dd,
.owj-detail-page .saved-stack dd {
  margin: 0;
  color: ${C.text};
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
  background: ${C.primaryBg};
  border: 1px dashed ${C.primaryBg2};
  color: ${C.textSec};
  overflow-x: auto;
  scrollbar-width: thin;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.owj-detail-page .score-equation span {
  color: ${C.text}; font-size: 16px; font-weight: 800; background:white;
}
.owj-detail-page .score-equation b { color: ${C.textMuted}; font-size: 17px; }
.owj-detail-page .score-equation strong {
  color: ${C.primary}; font-size: 20px; font-weight: 900;
}
.owj-detail-page .score-valuation-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.owj-detail-page .score-valuation-grid > div { background: ${C.surface}; border-color: ${C.borderMed}; }
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
  background: ${C.raised};
  color: ${C.textSec};
  font-size: 12px;
  line-height: 1.95;
  overflow-wrap: anywhere;
}
.owj-detail-page .score-explanations li::before {
  content: '•';
  position: absolute;
  top: 10px;
  right: 12px;
  color: ${C.secondaryDark};
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
  background: ${C.raised};
  border: 1px solid ${C.border};
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
  color: ${C.textMuted}; font-size: 11px; font-weight: 650;
}
.owj-detail-page .comparable-list article a {
  color: ${C.text}; font-size: 13px; font-weight: 800;
  line-height: 1.8; text-decoration: none;
  overflow-wrap: anywhere;
}
.owj-detail-page .comparable-list article a:hover { color: ${C.primary}; }
.owj-detail-page .comparable-list article small {
  color: ${C.textSec}; font-size: 11px; line-height: 1.8;
}
.owj-detail-page .comparable-list article strong {
  color: ${C.text}; font-size: 14px; font-weight: 850;
  white-space: nowrap;
}
.owj-detail-page .comparable-list article b {
  display: inline-flex;
  padding: 4px 10px;
  border: 1px solid ${C.secondaryBg2};
  background: ${C.secondaryBg};
  color: ${C.secondaryDark};
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
  border: 1px solid ${C.borderLight};
  background: ${C.surface};
  color: ${C.text};
  border-radius: 11px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  transition: background .18s ease;
}
.owj-detail-page .nearby-refresh:hover:not(:disabled) { background: ${C.raised}; }
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
  border: 1px solid ${C.border};
  background: ${C.raised};
  border-radius: 13px;
}
.owj-detail-page .nearby-place-list article > span {
  flex: none;
  display: grid;
  place-items: center;
  min-width: 53px;
  min-height: 38px;
  padding: 7px 10px;
  color: ${C.secondaryDark};
  background: ${C.secondaryBg};
  border-radius: 10px;
  font-size: 11px;
  font-weight: 750;
}
.owj-detail-page .nearby-place-list article > div {
  display: flex; flex: 1; min-width: 0; flex-direction: column; gap: 4px;
}
.owj-detail-page .nearby-place-list article strong {
  color: ${C.text}; font-size: 12px; font-weight: 800; line-height: 1.7;
}
.owj-detail-page .nearby-place-list article small {
  color: ${C.textMuted}; font-size: 11px; line-height: 1.6; overflow-wrap: anywhere;
}
.owj-detail-page .nearby-place-list article b {
  display: flex; flex-direction: column; align-items: flex-end; gap: 3px;
  color: ${C.text}; flex: none; font-size: 12px; font-weight: 800;
  white-space: nowrap;
}
.owj-detail-page .nearby-place-list article b small {
  color: ${C.secondaryDark}; font-size: 10px; font-weight: 750;
}
.owj-detail-page .nearby-place-list > p {
  grid-column: 1/-1;
  margin: 0;
  color: ${C.textMuted};
  padding: 15px;
  border-radius: 13px;
  background: ${C.raised};
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
  border-bottom: 1px solid ${C.border};
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
  background: ${C.secondaryBg};
  color: ${C.secondaryDark};
  border: 1px solid ${C.secondaryBg2};
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
  border: 1px solid ${C.borderMed};
  border-radius: 11px;
  background: ${C.raised};
  color: ${C.textSec};
  font-size: 12px;
  font-weight: 650;
  line-height: 1.7;
}
.owj-detail-page .saved-amenity::before {
  content: '•'; font-size: 14px; font-weight: 900; line-height: 1;
}
.owj-detail-page .saved-amenity--yes {
  color: ${C.green}; background: ${C.greenBg}; border-color: ${C.greenBg2};
}
.owj-detail-page .saved-amenity--yes::before { content: '✓'; }
.owj-detail-page .saved-amenity--no {
  color: ${C.textMuted}; background: ${C.raised}; border-color: ${C.border};
}
.owj-detail-page .saved-amenity--no::before { content: '−'; }
.owj-detail-page .saved-amenity--unknown::before { content: none; }
.owj-detail-page .coverage-meter {
  display: block;
  height: 9px;
  width: 100%;
  margin: 8px 0 17px;
  overflow: hidden;
  background: ${C.borderLight};
  border-radius: 999px;
}
.owj-detail-page .coverage-meter > span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: ${C.secondary};
  transition: width .5s ease;
}
.owj-detail-page .saved-panel > strong:not(.saved-advertiser) {
  color: ${C.text}; font-size: 26px; font-weight: 900;
}
.owj-detail-page .owj-detail-state {
  display: grid;
  place-items: center;
  min-height: min(67vh, 650px);
  margin: 20px 0;
  padding: 28px 16px;
  border: 1px solid ${C.border};
  border-radius: 22px;
  background: ${C.surface};
  box-shadow: ${C.shadow};
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
  background: ${C.primaryBg};
  color: ${C.primary};
}
.owj-detail-page .owj-detail-state--error .owj-detail-state__icon {
  background: ${C.redBg}; color: ${C.red};
}
.owj-detail-page .owj-detail-state h1 {
  font-size: 21px;
  line-height: 1.7;
  margin: 0 0 8px;
  font-weight: 900;
  color: ${C.text};
}
.owj-detail-page .owj-detail-state p {
  color: ${C.textSec};
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
  border: 1px solid ${C.primaryBg2};
  background: ${C.primaryBg};
  color: ${C.primary};
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

`;function I({label:e,value:t}){return(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:e}),(0,p.jsx)(`dd`,{children:$t(t??`—`)})]})}function on({description:e}){let t=(0,f.useRef)(null),[n,r]=(0,f.useState)(!1),[i,a]=(0,f.useState)(!1),o=$t(e||`توضیح عمومی برای این آگهی ذخیره نشده است.`);return(0,f.useEffect)(()=>r(!1),[e]),(0,f.useLayoutEffect)(()=>{let e=t.current;if(!e)return;let n=!0,r=()=>{if(!n)return;let t=Number.parseFloat(window.getComputedStyle(e).lineHeight);a(Number.isFinite(t)&&e.scrollHeight>t*3+1)};r();let i=typeof ResizeObserver>`u`?null:new ResizeObserver(r);return i?.observe(e),window.addEventListener(`resize`,r),document.fonts?.ready.then(r),()=>{n=!1,i?.disconnect(),window.removeEventListener(`resize`,r)}},[o,n]),(0,p.jsxs)(`div`,{className:`saved-description`,children:[(0,p.jsx)(`p`,{id:`listing-description`,ref:t,className:`saved-description__text${n?``:` saved-description__text--collapsed`}`,children:o}),i&&(0,p.jsx)(`button`,{className:`saved-description__toggle`,type:`button`,"aria-expanded":n,"aria-controls":`listing-description`,onClick:()=>r(e=>!e),children:n?`نمایش کمتر`:`نمایش بیشتر`})]})}function sn({token:e}){T();let[t,n]=(0,f.useState)(null),[r,i]=(0,f.useState)(null),[a,o]=(0,f.useState)(!1),[s,c]=(0,f.useState)(``),[l,u]=(0,f.useState)(!1),[d,m]=(0,f.useState)(null),[h,g]=(0,f.useState)([]),[_,b]=(0,f.useState)(!0);(0,f.useEffect)(()=>{let t=new AbortController;return fetch(`/listings/${encodeURIComponent(e)}`,{signal:t.signal,headers:{accept:`application/json`}}).then(e=>e.ok?e.json():Promise.reject(Error(e.status===404?`آگهی ذخیره‌شده پیدا نشد.`:`HTTP ${e.status}`))).then(n).catch(e=>{e.name!==`AbortError`&&i(e.message)}),()=>t.abort()},[e]),(0,f.useEffect)(()=>{let t=new AbortController;return b(!0),Promise.all([fetch(`/score-details/${encodeURIComponent(e)}`,{signal:t.signal}).then(e=>e.ok?e.json():null),fetch(`/listings/${encodeURIComponent(e)}/scenario-scores`,{signal:t.signal}).then(e=>e.ok?e.json():{scores:[]})]).then(([e,t])=>{m(e),g(t?.scores||[])}).catch(e=>{e.name!==`AbortError`&&m(null)}).finally(()=>{t.signal.aborted||b(!1)}),()=>t.abort()},[e]);let S=async()=>{o(!0),c(``);try{let t=await fetch(`/listings/${encodeURIComponent(e)}/refetch`,{method:`POST`,headers:{accept:`application/json`}}),r=await t.json();if(!t.ok)throw Error(r.message||`HTTP ${t.status}`);n(r.listing),c(r.changed?`جزئیات تازه دریافت و ذخیره شد.`:`آگهی بررسی شد؛ تغییری وجود نداشت.`)}catch(e){c(`بازیابی ناموفق بود: ${e.message}`)}finally{o(!1)}},C=async()=>{u(!0),c(``);try{let t=await fetch(`/listings/${encodeURIComponent(e)}/nearby-places`,{method:`POST`,headers:{accept:`application/json`}}),r=await t.json();if(!t.ok)throw Error(r.message||`HTTP ${t.status}`);n(r.listing),c(`${v(r.nearbyPlaces.length)} مکان حمل‌ونقل عمومی ذخیره شد.`)}catch(e){c(`دریافت مکان‌های اطراف ناموفق بود: ${e.message}`)}finally{u(!1)}};if(!t&&!r)return(0,p.jsxs)(`div`,{className:`owj-detail-page`,dir:`rtl`,children:[(0,p.jsx)(`style`,{children:an}),(0,p.jsx)(ne,{active:`listings`}),(0,p.jsx)(`main`,{className:`saved-detail-main`,children:(0,p.jsx)(`section`,{className:`owj-detail-state`,role:`status`,"aria-live":`polite`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{className:`owj-detail-state__icon`,children:(0,p.jsx)(E,{name:`building`,size:29})}),(0,p.jsx)(`h1`,{children:`در حال بارگذاری جزئیات آگهی…`}),(0,p.jsx)(`p`,{children:`اطلاعات ملک، قیمت و موقعیت مکانی در حال دریافت است.`})]})})})]});if(r)return(0,p.jsxs)(`div`,{className:`owj-detail-page`,dir:`rtl`,children:[(0,p.jsx)(`style`,{children:an}),(0,p.jsx)(ne,{active:`listings`}),(0,p.jsx)(`main`,{className:`saved-detail-main`,children:(0,p.jsx)(`section`,{className:`owj-detail-state owj-detail-state--error`,role:`alert`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{className:`owj-detail-state__icon`,children:(0,p.jsx)(E,{name:`alert`,size:29})}),(0,p.jsx)(`h1`,{children:`جزئیات آگهی در دسترس نیست`}),(0,p.jsx)(`p`,{children:$t(r)}),(0,p.jsx)(`a`,{href:`/catalog`,children:`بازگشت به فهرست آگهی‌ها`})]})})})]});let w=t.property||{},ee=t.pricing||{},D=d?.listing,te=D?.evidence?.comparables||[];return(0,p.jsxs)(`div`,{className:`owj-detail-page`,dir:`rtl`,children:[(0,p.jsx)(`style`,{children:an}),(0,p.jsx)(ne,{active:`listings`}),(0,p.jsxs)(`main`,{className:`saved-detail-main`,id:`main-content`,children:[(0,p.jsxs)(`nav`,{className:`saved-detail-breadcrumb`,"aria-label":`مسیر صفحه`,children:[(0,p.jsx)(`a`,{href:`/catalog`,children:`آگهی‌ها`}),(0,p.jsx)(`span`,{"aria-hidden":`true`,children:`‹`}),(0,p.jsx)(`span`,{children:$t(t.neighborhood||t.token)})]}),(0,p.jsxs)(`header`,{className:`saved-detail-hero`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsxs)(`div`,{className:`catalog-tags`,children:[(0,p.jsx)(`span`,{className:`status-pill status-pill--active`,children:$t(Yt[t.advertiserType]||`نامشخص`)}),(0,p.jsx)(`span`,{className:`status-pill`,children:$t(t.neighborhood||`مکان نامشخص`)}),(0,p.jsx)(`span`,{className:`status-pill`,children:nn(t.publishedText)}),D&&(0,p.jsxs)(`span`,{className:`score-tag score-tag--${D.scores.band}`,children:[`امتیاز اصلی `,v(D.scores.recommendation),` ·`,` `,Qt[D.scores.band]]}),h.map(e=>(0,p.jsxs)(`span`,{className:`score-tag score-tag--scenario`,children:[$t(e.name),`: `,v(e.recommendation)]},e.scenarioId))]}),(0,p.jsx)(`h1`,{children:$t(t.title)}),(0,p.jsx)(on,{description:t.description},t.token),(0,p.jsxs)(`div`,{className:`saved-detail-highlights`,"aria-label":`مشخصات کلیدی ملک`,children:[(0,p.jsxs)(`span`,{children:[`متراژ `,(0,p.jsxs)(`strong`,{children:[v(w.area),` متر`]})]}),(0,p.jsxs)(`span`,{children:[`اتاق `,(0,p.jsx)(`strong`,{children:v(w.rooms)})]}),(0,p.jsxs)(`span`,{children:[`سال ساخت`,` `,(0,p.jsx)(`strong`,{children:y(w.constructionYear)})]})]})]}),(0,p.jsxs)(`aside`,{className:`saved-detail-price`,children:[(0,p.jsx)(`span`,{children:`قیمت کل`}),(0,p.jsx)(`strong`,{children:x(ee.price)}),(0,p.jsxs)(`small`,{children:[`هر متر `,x(ee.pricePerMeter)]}),(0,p.jsxs)(`button`,{type:`button`,onClick:S,disabled:a,children:[(0,p.jsx)(E,{name:`refresh`,size:16}),a?`در حال دریافت…`:`دریافت دوباره جزئیات`]}),(0,p.jsxs)(`a`,{href:t.url,target:`_blank`,rel:`noreferrer`,children:[`مشاهده آگهی `,(0,p.jsx)(E,{name:`external`,size:16})]}),(0,p.jsx)(`p`,{className:`saved-refetch-status`,"aria-live":`polite`,children:$t(s)})]})]}),(0,p.jsx)(Jt,{listing:t,scoreDetail:d,scoreLoading:_}),(0,p.jsx)(Ht,{images:t.images,title:t.title},t.token),(0,p.jsxs)(`nav`,{className:`saved-detail-jumps`,"aria-label":`دسترسی سریع به بخش‌های آگهی`,children:[(0,p.jsx)(`a`,{href:`#owj-specs`,children:`مشخصات ملک`}),(0,p.jsx)(`a`,{href:`#owj-pricing`,children:`قیمت‌گذاری`}),(0,p.jsx)(`a`,{href:`#owj-amenities`,children:`امکانات`}),(0,p.jsx)(`a`,{href:`#owj-map`,children:`موقعیت روی نقشه`}),D&&(0,p.jsx)(`a`,{href:`#owj-score`,children:`تحلیل امتیاز`}),D&&(0,p.jsx)(`a`,{href:`#owj-comparables`,children:`خانه‌های مشابه`})]}),(0,p.jsxs)(`div`,{className:`saved-detail-grid`,children:[D&&(0,p.jsxs)(`section`,{id:`owj-score`,className:`saved-panel saved-panel--wide score-detail-panel`,children:[(0,p.jsxs)(`div`,{className:`saved-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h2`,{children:`امتیاز، محاسبه و نتیجه نهایی`}),(0,p.jsxs)(`p`,{children:[`نسخه `,$t(d.scoringVersion),` · رتبه`,` `,v(d.population.rank),` از`,` `,v(d.population.total)]})]}),(0,p.jsxs)(`strong`,{className:`score-final score-final--${D.scores.band}`,children:[v(D.scores.recommendation),(0,p.jsx)(`small`,{children:Qt[D.scores.band]})]})]}),(0,p.jsxs)(`div`,{className:`score-component-grid`,children:[(0,p.jsx)(I,{label:`ارزش قیمت ترکیبی`,value:v(D.scores.dealValue)}),(0,p.jsx)(I,{label:`مقایسه با مدل`,value:v(D.scores.modelValue)}),(0,p.jsx)(I,{label:`آگهی‌های مشابه`,value:v(D.scores.nearbyValue)}),(0,p.jsx)(I,{label:`جایگاه محلی`,value:v(D.scores.localPosition)}),(0,p.jsx)(I,{label:`اعتماد داده`,value:v(D.scores.confidence)}),(0,p.jsx)(I,{label:`ریسک`,value:v(D.scores.risk)}),(0,p.jsx)(I,{label:`کیفیت ملک`,value:v(D.scores.propertyQuality)}),(0,p.jsx)(I,{label:`کیفیت داده`,value:v(D.scores.dataQuality)})]}),(0,p.jsxs)(`div`,{className:`score-equation`,dir:`ltr`,children:[(0,p.jsx)(`span`,{children:v(D.scores.dealValue)}),(0,p.jsx)(`b`,{children:`×`}),(0,p.jsx)(`span`,{children:$t(D.formula.appliedConfidenceGate.toFixed(3))}),(0,p.jsx)(`b`,{children:`×`}),(0,p.jsx)(`span`,{children:$t(D.formula.appliedRiskGate.toFixed(3))}),(0,p.jsx)(`b`,{children:`=`}),(0,p.jsx)(`strong`,{children:v(D.scores.recommendation)})]}),(0,p.jsxs)(`div`,{className:`score-valuation-grid`,children:[(0,p.jsx)(I,{label:`قیمت برآوردی`,value:x(D.valuation.predictedPrice)}),(0,p.jsx)(I,{label:`بازه پایین برآورد`,value:x(D.valuation.predictionRangeLow)}),(0,p.jsx)(I,{label:`بازه بالای برآورد`,value:x(D.valuation.predictionRangeHigh)}),(0,p.jsx)(I,{label:`اختلاف قیمت آگهی با برآورد`,value:x(D.valuation.askingVsPrediction)})]}),!!D.explanations?.length&&(0,p.jsx)(`ul`,{className:`score-explanations`,children:D.explanations.map(e=>(0,p.jsx)(`li`,{children:$t(e)},e))})]}),D&&!te.length&&(0,p.jsxs)(`section`,{id:`owj-comparables`,className:`saved-panel saved-panel--wide`,children:[(0,p.jsx)(`h2`,{children:`خانه‌های مشابه مورد مقایسه`}),(0,p.jsx)(`p`,{children:`برای این آگهی مقایسه مشابه کافی در خروجی فعلی وجود ندارد.`})]}),!!te.length&&(0,p.jsxs)(`section`,{id:`owj-comparables`,className:`saved-panel saved-panel--wide`,children:[(0,p.jsx)(`div`,{className:`saved-panel__head`,children:(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h2`,{children:`خانه‌های مشابه مورد مقایسه`}),(0,p.jsxs)(`p`,{children:[v(te.length),` آگهی نزدیک و مشابه که در برآورد این ملک استفاده شده‌اند.`]})]})}),(0,p.jsx)(`div`,{className:`comparable-list`,children:te.map(e=>(0,p.jsxs)(`article`,{children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{children:$t(e.neighborhood)}),(0,p.jsx)(`a`,{href:`/listing/${e.token}`,children:$t(e.title)}),(0,p.jsxs)(`small`,{children:[v(e.area),` متر ·`,` `,v(e.rooms),` اتاق · فاصله`,` `,v(e.distanceMeters),` متر`]})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`strong`,{children:x(e.askingPrice)}),(0,p.jsxs)(`small`,{children:[`هر متر `,x(e.askingPricePerMeter)]}),(0,p.jsxs)(`b`,{children:[`شباهت `,v(e.similarity),`٪`]})]})]},e.token))})]}),(0,p.jsxs)(`section`,{id:`owj-map`,className:`saved-panel saved-panel--map`,children:[(0,p.jsxs)(`div`,{className:`saved-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h2`,{children:`موقعیت و حمل‌ونقل عمومی`}),(0,p.jsx)(`p`,{children:`مختصات عمومی آگهی ممکن است تقریبی باشد.`})]}),(0,p.jsx)(`button`,{className:`nearby-refresh`,type:`button`,onClick:C,disabled:l,children:l?`در حال جستجو…`:`به‌روزرسانی مکان‌های اطراف`})]}),(0,p.jsx)(zt,{coordinates:t.coordinates,places:t.nearbyPlaces||[]}),(0,p.jsxs)(`div`,{className:`nearby-place-list`,children:[(t.nearbyPlaces||[]).map(e=>{let t=rn(e);return(0,p.jsxs)(`article`,{children:[(0,p.jsx)(`span`,{children:e.category===`metro-station`?`مترو`:`اتوبوس`}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`strong`,{children:$t(e.title)}),(0,p.jsx)(`small`,{children:e.routeMode===`pedestrian`?`مسیر پیاده محاسبه‌شده توسط نشان`:`فاصله برآوردی سرویس مکان‌های نزدیک نشان`})]}),(0,p.jsxs)(`b`,{children:[t.distance,t.duration&&(0,p.jsx)(`small`,{children:t.duration})]})]},e.poiHash||`${e.category}-${e.title}-${e.distanceMeters}`)}),!t.nearbyPlaces?.length&&(0,p.jsx)(`p`,{children:`هنوز مکان عمومی اطراف این ملک دریافت نشده است.`})]})]}),(0,p.jsxs)(`section`,{id:`owj-specs`,className:`saved-panel saved-panel--wide`,children:[(0,p.jsx)(`h2`,{children:`مشخصات ملک`}),(0,p.jsxs)(`dl`,{className:`saved-facts`,children:[(0,p.jsx)(I,{label:`متراژ`,value:w.area==null?`—`:`${v(w.area)} متر`}),(0,p.jsx)(I,{label:`اتاق`,value:v(w.rooms)}),(0,p.jsx)(I,{label:`سال ساخت`,value:y(w.constructionYear)}),(0,p.jsx)(I,{label:`طبقه`,value:v(w.floor)}),(0,p.jsx)(I,{label:`تعداد طبقات`,value:v(w.totalFloors)}),(0,p.jsx)(I,{label:`واحد در طبقه`,value:v(w.unitsPerFloor)}),Object.entries(t.propertyDetails||{}).map(([e,t])=>(0,p.jsx)(I,{label:Zt[e]||e,value:t},e))]})]}),(0,p.jsxs)(`section`,{id:`owj-pricing`,className:`saved-panel saved-panel--facts`,children:[(0,p.jsx)(`h2`,{children:`قیمت‌گذاری`}),(0,p.jsxs)(`dl`,{className:`saved-stack`,children:[(0,p.jsx)(I,{label:`قیمت کل`,value:x(ee.price)}),(0,p.jsx)(I,{label:`قیمت هر متر`,value:x(ee.pricePerMeter)}),(0,p.jsx)(I,{label:`ودیعه`,value:x(ee.deposit)}),(0,p.jsx)(I,{label:`اجاره`,value:x(ee.rent)})]})]}),(0,p.jsxs)(`section`,{className:`saved-panel`,children:[(0,p.jsx)(`h2`,{children:`نوع آگهی‌دهنده`}),(0,p.jsx)(`strong`,{className:`saved-advertiser`,children:$t(Yt[t.advertiserType]||`نامشخص`)}),(0,p.jsx)(`p`,{children:`ابتدا برچسب عمومی دیوار بررسی می‌شود و سپس زبان توضیحات آگهی، با محافظت در برابر عبارت‌هایی مانند «املاک تماس نگیرد». هیچ اطلاعات تماسی در این طبقه‌بندی ذخیره نمی‌شود.`})]}),(0,p.jsxs)(`section`,{id:`owj-amenities`,className:`saved-panel saved-panel--wide`,children:[(0,p.jsx)(`h2`,{children:`امکانات`}),(0,p.jsx)(`div`,{className:`saved-amenities`,children:Object.entries(t.amenities||{}).map(([e,t])=>(0,p.jsxs)(`span`,{className:`saved-amenity saved-amenity--${t===!0?`yes`:t===!1?`no`:`unknown`}`,children:[$t(Xt[e]||e),`:`,` `,t===!0?`دارد`:t===!1?`ندارد`:`نامشخص`]},e))})]}),(0,p.jsxs)(`section`,{className:`saved-panel saved-panel--facts`,children:[(0,p.jsx)(`h2`,{children:`مکان و منبع`}),(0,p.jsxs)(`dl`,{className:`saved-stack`,children:[(0,p.jsx)(I,{label:`شهر`,value:t.city}),(0,p.jsx)(I,{label:`محله`,value:t.neighborhood}),(0,p.jsx)(I,{label:`دقت مختصات`,value:t.coordinates?.accuracy}),(0,p.jsx)(I,{label:`منبع استخراج`,value:t.extraction?.source})]})]}),(0,p.jsxs)(`section`,{className:`saved-panel`,children:[(0,p.jsx)(`h2`,{children:`پوشش استخراج`}),(0,p.jsx)(`div`,{className:`coverage-meter`,children:(0,p.jsx)(`span`,{style:{width:`${t.extraction?.coveragePercent||0}%`}})}),(0,p.jsxs)(`strong`,{children:[v(t.extraction?.coveragePercent||0),`٪`]}),(0,p.jsxs)(`p`,{children:[v(t.extraction?.presentFields?.length||0),` `,`فیلد کلیدی موجود است.`]})]}),!!t.attributes?.length&&(0,p.jsxs)(`section`,{className:`saved-panel saved-panel--wide`,children:[(0,p.jsx)(`h2`,{children:`ویژگی‌های ساختاریافته`}),(0,p.jsx)(`dl`,{className:`saved-facts`,children:t.attributes.map(e=>(0,p.jsx)(I,{label:e.label,value:e.value},`${e.key}-${e.label}`))})]})]})]}),(0,p.jsx)(re,{})]})}var cn={description:`توضیحات عمومی`,coordinates:`مختصات معتبر`,images:`تصویر`,"advertiser-classified":`نوع آگهی‌دهنده مشخص`,"nearby-places":`مکان‌های اطراف`},ln={"not-scoring-ready":`کیفیت داده برای امتیازدهی کافی نیست`,"missing-or-out-of-bounds-coordinates":`مختصات مفقود یا خارج از تهران`,"invalid-or-implausible-area":`متراژ نامعتبر یا غیرمنطقی`,"invalid-or-implausible-price":`قیمت نامعتبر یا غیرمنطقی`,"invalid-or-implausible-price-per-meter":`قیمت هر متر نامعتبر یا غیرمنطقی`,"subcategory-out-of-scope":`نوع ملک خارج از محدوده مدل`,"listing-removed":`آگهی حذف شده`},un={personal:`شخصی`,"real-estate-business":`مشاور املاک`,unknown:`نامشخص`};function dn(e){let t=Number(e);return Number.isFinite(t)?new Intl.NumberFormat(`fa-IR`,{minimumFractionDigits:1,maximumFractionDigits:1}).format(t):`—`}var fn=`
.owj-quality {
  --quality-bg: #f7f8fa;
  --quality-surface: #ffffff;
  --quality-ink: #1d2028;
  --quality-muted: #6b707a;
  --quality-subtle: #9298a2;
  --quality-border: #e9ebf0;
  --quality-primary: #66308d;
  --quality-teal: #01ae9b;
  --quality-success: #137e67;
  --quality-warn: #a36b25;
  --quality-shadow: 0 3px 22px rgba(23,31,44,.035), 0 1px 4px rgba(23,31,44,.02);
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--quality-bg);
  color: var(--quality-ink);
  direction: rtl;
  font-family: var(--font-family, 'Vazirmatn', Tahoma, sans-serif);
  font-size: 14px;
  line-height: 1.75;
  overflow-x: clip;
}
.owj-quality *, .owj-quality *::before, .owj-quality *::after { box-sizing: border-box; }
.owj-quality :is(h1,h2,h3,p,dl,dt,dd) { margin: 0; }
.owj-quality .quality-main { width: min(100%, 1392px); margin-inline: auto; padding: 34px 30px 90px; }
.owj-quality .quality-hero {
  background: var(--quality-surface);
  border: 1px solid var(--quality-border);
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
  padding: 30px 34px;
  position: relative;
  box-shadow: var(--quality-shadow);
  overflow: hidden;
}
.owj-quality .quality-hero::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: linear-gradient(90deg,#e5e8ed 0%, #e5e8ed 60%, #66308d 100%);
}
.owj-quality .quality-hero__content { min-width: 0; flex: 1; }
.owj-quality .quality-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #66308d;
  background: #f5eff9;
  padding: 5px 12px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 13px;
}
.owj-quality .quality-hero h1 {
  font-size: clamp(23px, 2.2vw, 34px);
  font-weight: 900;
  line-height: 1.45;
  letter-spacing: -.5px;
  color: #16191f;
}
.owj-quality .quality-hero p {
  color: var(--quality-muted);
  font-size: 13px;
  font-weight: 500;
  line-height: 2;
  margin-top: 8px;
  max-width: 650px;
}
.owj-quality .quality-updated {
  flex: none;
  min-width: 236px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 16px;
  padding: 16px 18px;
  background: #f8f9fb;
  border: 1px solid #eef0f3;
}
.owj-quality .quality-updated__label {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--quality-muted);
  font-size: 11px;
  font-weight: 650;
}
.owj-quality .quality-updated__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--quality-teal); }
.owj-quality .quality-updated time { color: #30333d; font-size: 13px; font-weight: 800; unicode-bidi: plaintext; }
.owj-quality .quality-quicknav {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  padding: 16px 2px 2px;
  margin-bottom: 26px;
}
.owj-quality .quality-quicknav::-webkit-scrollbar { display: none; }
.owj-quality .quality-quicknav a {
  flex: none;
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 8px 14px;
  border: 1px solid #e6e8ee;
  background: #fff;
  border-radius: 11px;
  text-decoration: none;
  color: #626773;
  font-size: 12px;
  font-weight: 700;
  transition: color .16s, border-color .16s, background .16s;
}
.owj-quality .quality-quicknav a:hover { color: var(--quality-primary); border-color: #d9c8e3; background: #faf7fc; }
.owj-quality .quality-section-intro { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 15px; }
.owj-quality .quality-section-intro h2 { font-size: 17px; font-weight: 850; color: #242630; }
.owj-quality .quality-section-intro p { font-size: 12px; color: #858a94; }
.owj-quality .quality-metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-bottom: 26px; }
.owj-quality .quality-metric {
  min-width: 0;
  min-height: 146px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  padding: 19px 20px;
  border: 1px solid var(--quality-border);
  border-radius: 18px;
  background: var(--quality-surface);
  box-shadow: var(--quality-shadow);
  position: relative;
}
.owj-quality .quality-metric::before {
  content: '';
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  top: 25px;
  left: 20px;
  background: #d0d3da;
}
.owj-quality .quality-metric--good::before { background: var(--quality-teal); }
.owj-quality .quality-metric--warn::before { background: #e6ac5c; }
.owj-quality .quality-metric__label { padding-left: 9px; color: #626873; font-size: 12px; font-weight: 700; line-height: 1.8; }
.owj-quality .quality-metric__value { color: #17191f; font-size: clamp(26px, 2.4vw, 34px); font-weight: 900; line-height: 1.3; font-variant-numeric: tabular-nums; letter-spacing: -.5px; }
.owj-quality .quality-metric__note { color: #7c818b; font-size: 11px; font-weight: 500; line-height: 1.85; overflow-wrap: anywhere; }
.owj-quality .quality-layout { display: grid; grid-template-columns: minmax(0,1.35fr) minmax(0,1fr); gap: 16px; align-items: stretch; }
.owj-quality .quality-panel {
  min-width: 0;
  background: #fff;
  border: 1px solid var(--quality-border);
  border-radius: 21px;
  padding: 25px;
  box-shadow: var(--quality-shadow);
  scroll-margin-top: 104px;
}
.owj-quality .quality-panel--wide { grid-column: 1 / -1; }
.owj-quality .quality-panel__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 23px;
}
.owj-quality .quality-panel__head h2 { color: #22252e; font-size: 17px; font-weight: 850; line-height: 1.5; }
.owj-quality .quality-panel__head p { color: #8a8f98; font-size: 12px; line-height: 1.9; margin-top: 4px; }
.owj-quality .quality-panel__icon {
  width: 39px;
  height: 39px;
  border-radius: 12px;
  border: 1px solid #ede9f0;
  color: #66308d;
  background: #f9f6fb;
  display: grid;
  place-items: center;
  flex: none;
}
.owj-quality .quality-coverage { display: flex; flex-direction: column; gap: 18px; }
.owj-quality .quality-coverage__row { display: grid; grid-template-columns: 1fr auto; gap: 8px 12px; align-items: center; }
.owj-quality .quality-coverage__label { display: block; color: #353944; font-size: 13px; font-weight: 750; line-height: 1.8; }
.owj-quality .quality-coverage__meta { display: block; color: #9297a0; font-size: 11px; margin-top: 1px; }
.owj-quality .quality-coverage__percent { align-self: center; color: #252936; font-size: 16px; font-weight: 900; white-space: nowrap; }
.owj-quality .quality-bar { width: 100%; height: 9px; background: #eef0f4; border-radius: 99px; overflow: hidden; grid-column: 1/-1; }
.owj-quality .quality-bar > span { display: block; height: 100%; background: #01ae9b; border-radius: inherit; transition: width .35s ease; }
.owj-quality .quality-classifications { display: flex; flex-direction: column; gap: 12px; }
.owj-quality .quality-classifications__item { background: #fbfcfd; border: 1px solid #edf0f3; border-radius: 14px; padding: 15px 16px; }
.owj-quality .quality-classifications__top { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.owj-quality .quality-classifications__title { color: #444a54; font-size: 12px; font-weight: 750; }
.owj-quality .quality-classifications__count { font-size: 20px; font-weight: 850; color: #21252d; line-height: 1.4; }
.owj-quality .quality-classifications__footer { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 10px; }
.owj-quality .quality-classifications__percentage { font-size: 11px; color: #7c838f; font-weight: 700; white-space: nowrap; }
.owj-quality .quality-classifications__bar { height: 7px; flex: 1; background: #eaeef2; border-radius: 99px; overflow: hidden; }
.owj-quality .quality-classifications__bar > i { display: block; height: 100%; background: #818995; border-radius: inherit; }
.owj-quality .quality-classifications__item:nth-child(2) .quality-classifications__bar > i { background: #66308d; }
.owj-quality .quality-classifications__item:nth-child(3) .quality-classifications__bar > i { background: #e1a962; }
.owj-quality .quality-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  border-radius: 99px;
  padding: 7px 12px;
  background: #f5f6f8;
  border: 1px solid #edeef1;
  color: #626773;
  font-size: 11px;
  font-weight: 700;
  overflow-wrap: anywhere;
}
.owj-quality .quality-status::before { content: ''; width: 7px; height: 7px; border-radius: 50%; flex: none; background: #01ae9b; }
.owj-quality .quality-table-wrap { border: 1px solid #eceef1; border-radius: 15px; overflow: hidden; }
.owj-quality .quality-table { width: 100%; border-collapse: collapse; font-size: 13px; text-align: right; }
.owj-quality .quality-table th {
  background: #f8f9fb;
  border-bottom: 1px solid #eaedf1;
  color: #6b717c;
  padding: 14px 19px;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}
.owj-quality .quality-table th:first-child { width: 67%; }
.owj-quality .quality-table td { padding: 16px 19px; border-bottom: 1px solid #edf0f3; color: #414750; vertical-align: middle; }
.owj-quality .quality-table tbody tr:last-child td { border-bottom: 0; }
.owj-quality .quality-table tbody tr:hover { background: #fbfafc; }
.owj-quality .quality-table__reason { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
.owj-quality .quality-table__reason strong { color: #30333d; font-size: 13px; font-weight: 750; }
.owj-quality .quality-table__reason code {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 10px;
  color: #8c929c;
  direction: ltr;
  text-align: right;
  unicode-bidi: plaintext;
  max-width: 100%;
  overflow-wrap: anywhere;
}
.owj-quality .quality-table__number { font-weight: 850; color: #292d36; font-size: 14px; }
.owj-quality .quality-table__percent { font-weight: 750; color: #616874; }
.owj-quality .quality-empty { padding: 28px 16px; text-align: center; color: #8b919d; font-size: 13px; }
.owj-quality .quality-facts { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 12px; }
.owj-quality .quality-facts__item { min-width:0; display: flex; flex-direction: column; justify-content: space-between; gap: 9px; padding: 17px 18px; border: 1px solid #ecedf2; border-radius: 14px; background: #fbfcfd; }
.owj-quality .quality-facts dt { color: #7a808a; font-size: 11px; font-weight: 650; line-height: 1.75; }
.owj-quality .quality-facts dd { color: #292d35; font-size: 15px; font-weight: 850; line-height: 1.85; overflow-wrap: anywhere; }
.owj-quality .quality-state { display: flex; flex-direction: column; gap: 14px; align-items: center; justify-content: center; text-align: center; min-height: 390px; background: #fff; border: 1px solid #edf0f3; border-radius: 22px; margin-top: 22px; padding: 30px; }
.owj-quality .quality-state__icon { width: 60px; height:60px; display:grid;place-items:center; border:1px solid #e6dcef; color:#66308d; background:#f6f1f9; border-radius:18px; }
.owj-quality .quality-state h1 { font-size: 19px; font-weight: 850; line-height: 1.5; }
.owj-quality .quality-state p { font-size: 13px; color: #7e858f; max-width: 460px; overflow-wrap: anywhere; }
.owj-quality .quality-state--error .quality-state__icon { background:#fff3f3; color:#ba4853; border-color:#f6dce1; }
.owj-quality .quality-state__spinner { width: 24px; height: 24px; border-radius: 50%; border: 3px solid #e8dff0; border-top-color: #66308d; animation: owjQualitySpin 1s linear infinite; }
@keyframes owjQualitySpin { to { transform: rotate(360deg); } }
.owj-quality :is(a,button,input,summary):focus-visible { outline: 3px solid rgba(102,48,141,.34); outline-offset: 3px; }
@media (max-width: 1100px) {
  .owj-quality .quality-main { padding-inline: 24px; }
  .owj-quality .quality-facts { grid-template-columns: repeat(2,minmax(0,1fr)); }
}
@media (max-width: 860px) {
  .owj-quality .quality-layout { grid-template-columns: minmax(0,1fr); }
  .owj-quality .quality-panel--wide { grid-column: auto; }
  .owj-quality .quality-metrics { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .owj-quality .quality-panel__head { margin-bottom: 17px; }
}
@media (max-width: 600px) {
  .owj-quality .quality-main { padding: 15px 16px 64px; }
  .owj-quality .quality-hero { padding: 23px 20px; flex-direction: column; align-items: stretch; gap: 16px; border-radius: 20px; }
  .owj-quality .quality-hero h1 { font-size: 25px; }
  .owj-quality .quality-hero p { font-size: 12px; margin-top: 7px; }
  .owj-quality .quality-updated { min-width: 0; padding: 11px 13px; border-radius: 12px; }
  .owj-quality .quality-updated time { font-size: 12px; }
  .owj-quality .quality-quicknav { margin-bottom: 22px; padding-top: 13px; }
  .owj-quality .quality-section-intro { align-items: center; }
  .owj-quality .quality-section-intro h2 { font-size: 16px; }
  .owj-quality .quality-section-intro p { font-size: 11px; }
  .owj-quality .quality-metrics { gap: 10px; margin-bottom: 18px; }
  .owj-quality .quality-metric { min-height: 142px; padding: 15px 14px; border-radius: 15px; }
  .owj-quality .quality-metric::before { top: 19px; left: 13px; }
  .owj-quality .quality-metric__label { font-size: 11px; line-height: 1.7; }
  .owj-quality .quality-metric__value { font-size: clamp(23px, 6.6vw, 30px); }
  .owj-quality .quality-metric__note { font-size: 10px; line-height: 1.8; }
  .owj-quality .quality-layout { gap: 12px; }
  .owj-quality .quality-panel { padding: 20px 16px; border-radius: 18px; }
  .owj-quality .quality-panel__head h2 { font-size: 16px; }
  .owj-quality .quality-panel__head p { font-size: 11px; }
  .owj-quality .quality-panel__icon { width: 36px; height: 36px; border-radius: 11px; }
  .owj-quality .quality-coverage { gap: 17px; }
  .owj-quality .quality-coverage__label { font-size: 12px; }
  .owj-quality .quality-coverage__meta { font-size: 10px; }
  .owj-quality .quality-coverage__percent { font-size: 15px; }
  .owj-quality .quality-panel__head--wrap { flex-direction: column; align-items: stretch; }
  .owj-quality .quality-status { align-self: flex-start; }
  .owj-quality .quality-table-wrap { border: 0; border-radius: 0; overflow: visible; }
  .owj-quality .quality-table,
  .owj-quality .quality-table tbody { display: block; width: 100%; }
  .owj-quality .quality-table thead { display:none; }
  .owj-quality .quality-table tbody { display:flex; flex-direction:column; gap: 9px; }
  .owj-quality .quality-table tbody tr { display: grid; grid-template-columns: 1fr 1fr; border:1px solid #e9ebf0; border-radius: 13px; overflow: hidden; background: #fff; }
  .owj-quality .quality-table tbody td { display:flex; flex-direction:column; gap: 3px; padding: 12px 14px; border: 0; min-width:0; }
  .owj-quality .quality-table tbody td:first-child { grid-column: 1 / -1; border-bottom: 1px solid #eff0f3; padding: 12px 14px; background: #fafbfc; }
  .owj-quality .quality-table tbody td:nth-child(2) { border-left:1px solid #eff0f3; }
  .owj-quality .quality-table tbody td[data-label]::before { content:attr(data-label); color:#8b919a; font-size:10px; font-weight:650; }
  .owj-quality .quality-table__reason strong { font-size: 12px; }
  .owj-quality .quality-table__reason code { font-size: 9px; }
  .owj-quality .quality-facts { gap: 9px; }
  .owj-quality .quality-facts__item { padding: 13px; border-radius: 12px; }
  .owj-quality .quality-facts dt { font-size: 10px; }
  .owj-quality .quality-facts dd { font-size: 12px; }
  .owj-quality .quality-state { margin-top: 14px; min-height: 320px; }
}
@media (max-width: 370px) {
  .owj-quality .quality-main { padding-inline: 12px; }
  .owj-quality .quality-metric { padding: 14px 12px; }
  .owj-quality .quality-facts__item { padding: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  .owj-quality *, .owj-quality *::before, .owj-quality *::after { animation: none !important; scroll-behavior: auto !important; transition-duration: .01ms !important; }
}
`;function pn({children:e}){return(0,p.jsxs)(`div`,{className:`owj-quality`,dir:`rtl`,children:[(0,p.jsx)(`style`,{children:fn}),(0,p.jsx)(ne,{active:`quality`}),e]})}function mn({label:e,value:t,note:n,tone:r=`neutral`}){return(0,p.jsxs)(`article`,{className:`quality-metric quality-metric--${r}`,children:[(0,p.jsx)(`span`,{className:`quality-metric__label`,children:e}),(0,p.jsx)(`strong`,{className:`quality-metric__value`,children:v(t)}),(0,p.jsx)(`small`,{className:`quality-metric__note`,children:n})]})}function hn(){T();let[e,t]=(0,f.useState)(null),[n,r]=(0,f.useState)(``);if((0,f.useEffect)(()=>{let e=new AbortController;return fetch(`/data-quality-data`,{signal:e.signal}).then(e=>e.ok?e.json():Promise.reject(Error(`HTTP ${e.status}`))).then(t).catch(e=>{e.name!==`AbortError`&&r(e.message)}),()=>e.abort()},[]),!e&&!n)return(0,p.jsx)(pn,{children:(0,p.jsx)(`main`,{className:`quality-main`,id:`main-content`,children:(0,p.jsxs)(`div`,{className:`quality-state`,role:`status`,"aria-busy":`true`,children:[(0,p.jsx)(`span`,{className:`quality-state__icon`,"aria-hidden":`true`,children:(0,p.jsx)(`span`,{className:`quality-state__spinner`})}),(0,p.jsx)(`h1`,{children:`در حال محاسبه خط پایه کیفیت داده…`}),(0,p.jsx)(`p`,{children:`اطلاعات پوشش و کیفیت آگهی‌ها در حال بارگذاری است.`})]})})});if(n)return(0,p.jsx)(pn,{children:(0,p.jsx)(`main`,{className:`quality-main`,id:`main-content`,children:(0,p.jsxs)(`div`,{className:`quality-state quality-state--error`,role:`alert`,children:[(0,p.jsx)(`span`,{className:`quality-state__icon`,"aria-hidden":`true`,children:(0,p.jsx)(E,{name:`alert`,size:26})}),(0,p.jsx)(`h1`,{children:`محاسبه کیفیت داده ناموفق بود`}),(0,p.jsx)(`p`,{children:n})]})})});let i=Object.fromEntries(e.classifications.advertiser.map(e=>[e.key,e.count]));return(0,p.jsxs)(pn,{children:[(0,p.jsxs)(`main`,{className:`quality-main`,id:`main-content`,children:[(0,p.jsxs)(`header`,{className:`quality-hero`,children:[(0,p.jsxs)(`div`,{className:`quality-hero__content`,children:[(0,p.jsxs)(`span`,{className:`quality-kicker`,children:[(0,p.jsx)(E,{name:`activity`,size:16}),` خط پایه فاز صفر`]}),(0,p.jsx)(`h1`,{children:`کنترل کیفیت و پوشش داده`}),(0,p.jsx)(`p`,{children:`این صفحه منبع واحد اندازه‌گیری برای بک‌فیل، طبقه‌بندی و افزایش پوشش امتیازدهی است.`})]}),(0,p.jsxs)(`div`,{className:`quality-updated`,children:[(0,p.jsxs)(`span`,{className:`quality-updated__label`,children:[(0,p.jsx)(`span`,{className:`quality-updated__dot`,"aria-hidden":`true`}),`آخرین محاسبه`]}),(0,p.jsx)(`time`,{dateTime:e.generatedAt,children:new Date(e.generatedAt).toLocaleString(`fa-IR`)})]})]}),(0,p.jsxs)(`nav`,{className:`quality-quicknav`,"aria-label":`دسترسی سریع به بخش‌های گزارش`,children:[(0,p.jsx)(`a`,{href:`#quality-summary`,children:`شاخص‌های اصلی`}),(0,p.jsx)(`a`,{href:`#quality-coverage`,children:`پوشش فیلدها`}),(0,p.jsx)(`a`,{href:`#quality-advertisers`,children:`نوع آگهی‌دهنده`}),(0,p.jsx)(`a`,{href:`#quality-blockers`,children:`موانع امتیازدهی`}),(0,p.jsx)(`a`,{href:`#quality-health`,children:`سلامت خروجی`})]}),(0,p.jsxs)(`div`,{className:`quality-section-intro`,id:`quality-summary`,children:[(0,p.jsx)(`h2`,{children:`وضعیت داده‌ها در یک نگاه`}),(0,p.jsx)(`p`,{children:`شاخص‌های اصلی کیفیت`})]}),(0,p.jsxs)(`section`,{className:`quality-metrics`,"aria-label":`شاخص‌های اصلی`,children:[(0,p.jsx)(mn,{label:`کل آگهی‌ها`,value:e.inventory.total,note:`${v(e.inventory.active)} آگهی فعال`}),(0,p.jsx)(mn,{label:`واجد شرایط امتیاز`,value:e.scoring.eligible,note:`طبق قوانین فعلی پاک‌سازی`,tone:`good`}),(0,p.jsx)(mn,{label:`امتیاز ثبت‌شده`,value:e.scoring.totalScored,note:`${v(e.scoring.populationCoveragePercent)}٪ از کل داده · ${v(e.scoring.coveragePercent)}٪ از واجدین`,tone:e.scoring.populationCoveragePercent>=95?`good`:`warn`}),(0,p.jsx)(mn,{label:`کل آگهی‌های بدون امتیاز`,value:e.scoring.unscoredTotal,note:`${dn((100-e.scoring.populationCoveragePercent).toFixed(1))}٪ از کل داده`,tone:e.scoring.unscoredTotal?`warn`:`good`}),(0,p.jsx)(mn,{label:`واجد شرایط ولی بدون امتیاز`,value:e.scoring.eligibleUnscored,note:`خطای همگام‌سازی پایپ‌لاین`,tone:e.scoring.eligibleUnscored?`warn`:`good`}),(0,p.jsx)(mn,{label:`تغییر از آخرین امتیازدهی`,value:e.scoring.staleListingsSinceScore,note:`آگهی جدید یا به‌روزشده`,tone:e.scoring.staleListingsSinceScore?`warn`:`good`})]}),(0,p.jsxs)(`div`,{className:`quality-layout`,children:[(0,p.jsxs)(`section`,{className:`quality-panel`,id:`quality-coverage`,"aria-labelledby":`coverage-title`,children:[(0,p.jsxs)(`div`,{className:`quality-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h2`,{id:`coverage-title`,children:`پوشش فیلدهای کلیدی`}),(0,p.jsx)(`p`,{children:`فاصله دقیق هر بخش تا پوشش کامل`})]}),(0,p.jsx)(`span`,{className:`quality-panel__icon`,"aria-hidden":`true`,children:(0,p.jsx)(E,{name:`check`,size:19})})]}),(0,p.jsx)(`div`,{className:`quality-coverage`,children:e.coverage.map(e=>(0,p.jsxs)(`article`,{className:`quality-coverage__row`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`strong`,{className:`quality-coverage__label`,children:cn[e.key]||e.key}),(0,p.jsxs)(`span`,{className:`quality-coverage__meta`,children:[v(e.count),` موجود ·`,` `,v(e.missing),` مفقود`]})]}),(0,p.jsxs)(`b`,{className:`quality-coverage__percent`,children:[v(e.percent),`٪`]}),(0,p.jsx)(`div`,{className:`quality-bar`,role:`progressbar`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":e.percent,"aria-label":`${cn[e.key]||e.key}: ${v(e.percent)} درصد`,children:(0,p.jsx)(`span`,{style:{width:`${e.percent}%`}})})]},e.key))})]}),(0,p.jsxs)(`section`,{className:`quality-panel`,id:`quality-advertisers`,"aria-labelledby":`advertiser-title`,children:[(0,p.jsxs)(`div`,{className:`quality-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h2`,{id:`advertiser-title`,children:`نوع آگهی‌دهنده`}),(0,p.jsx)(`p`,{children:`هدف فاز طبقه‌بندی: کاهش موارد نامشخص`})]}),(0,p.jsx)(`span`,{className:`quality-panel__icon`,"aria-hidden":`true`,children:(0,p.jsx)(E,{name:`building`,size:19})})]}),(0,p.jsx)(`div`,{className:`quality-classifications`,children:[`personal`,`real-estate-business`,`unknown`].map(t=>{let n=((i[t]||0)/e.inventory.total*100).toFixed(1);return(0,p.jsxs)(`div`,{className:`quality-classifications__item`,children:[(0,p.jsxs)(`div`,{className:`quality-classifications__top`,children:[(0,p.jsx)(`span`,{className:`quality-classifications__title`,children:un[t]}),(0,p.jsx)(`strong`,{className:`quality-classifications__count`,children:v(i[t]||0)})]}),(0,p.jsxs)(`div`,{className:`quality-classifications__footer`,children:[(0,p.jsxs)(`span`,{className:`quality-classifications__percentage`,children:[dn(n),`٪ از کل`]}),(0,p.jsx)(`div`,{className:`quality-classifications__bar`,"aria-hidden":`true`,children:(0,p.jsx)(`i`,{style:{width:`${Number.isFinite(Number(n))?n:0}%`}})})]})]},t)})})]}),(0,p.jsxs)(`section`,{className:`quality-panel quality-panel--wide`,id:`quality-blockers`,"aria-labelledby":`blockers-title`,children:[(0,p.jsxs)(`div`,{className:`quality-panel__head quality-panel__head--wrap`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h2`,{id:`blockers-title`,children:`دلایل حذف از امتیازدهی`}),(0,p.jsx)(`p`,{children:`یک آگهی ممکن است بیش از یک مانع داشته باشد.`})]}),(0,p.jsxs)(`span`,{className:`quality-status`,children:[`وضعیت پایپ‌لاین: `,(0,p.jsx)(`b`,{dir:`auto`,children:e.scoring.pipelineStatus})]})]}),(0,p.jsx)(`div`,{className:`quality-table-wrap`,children:(0,p.jsxs)(`table`,{className:`quality-table`,children:[(0,p.jsx)(`thead`,{children:(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{scope:`col`,children:`مانع`}),(0,p.jsx)(`th`,{scope:`col`,children:`تعداد`}),(0,p.jsx)(`th`,{scope:`col`,children:`درصد کل داده`})]})}),(0,p.jsxs)(`tbody`,{children:[e.blockers.map(e=>(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{children:(0,p.jsxs)(`div`,{className:`quality-table__reason`,children:[(0,p.jsx)(`strong`,{children:ln[e.reason]||e.reason}),(0,p.jsx)(`code`,{children:e.reason})]})}),(0,p.jsx)(`td`,{"data-label":`تعداد`,children:(0,p.jsx)(`span`,{className:`quality-table__number`,children:v(e.count)})}),(0,p.jsx)(`td`,{"data-label":`درصد کل داده`,children:(0,p.jsxs)(`span`,{className:`quality-table__percent`,children:[v(e.percent),`٪`]})})]},e.reason)),!e.blockers.length&&(0,p.jsx)(`tr`,{children:(0,p.jsx)(`td`,{colSpan:3,className:`quality-empty`,children:`مانعی برای نمایش ثبت نشده است.`})})]})]})})]}),(0,p.jsxs)(`section`,{className:`quality-panel quality-panel--wide`,id:`quality-health`,"aria-labelledby":`health-title`,children:[(0,p.jsxs)(`div`,{className:`quality-panel__head`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h2`,{id:`health-title`,children:`سلامت خروجی امتیازدهی`}),(0,p.jsx)(`p`,{children:`اختلاف میان وضعیت فعلی MongoDB و آخرین فایل امتیازدهی`})]}),(0,p.jsx)(`span`,{className:`quality-panel__icon`,"aria-hidden":`true`,children:(0,p.jsx)(E,{name:`database`,size:19})})]}),(0,p.jsxs)(`dl`,{className:`quality-facts`,children:[(0,p.jsxs)(`div`,{className:`quality-facts__item`,children:[(0,p.jsx)(`dt`,{children:`زمان آخرین امتیازدهی`}),(0,p.jsx)(`dd`,{children:e.scoring.generatedAt?new Date(e.scoring.generatedAt).toLocaleString(`fa-IR`):`اجرا نشده`})]}),(0,p.jsxs)(`div`,{className:`quality-facts__item`,children:[(0,p.jsx)(`dt`,{children:`واجد شرایط و امتیازدار`}),(0,p.jsx)(`dd`,{children:v(e.scoring.eligibleScored)})]}),(0,p.jsxs)(`div`,{className:`quality-facts__item`,children:[(0,p.jsx)(`dt`,{children:`امتیاز قدیمی ولی اکنون غیرواجد`}),(0,p.jsx)(`dd`,{children:v(e.scoring.scoredButCurrentlyIneligible)})]}),(0,p.jsxs)(`div`,{className:`quality-facts__item`,children:[(0,p.jsx)(`dt`,{children:`آخرین مشاهده داده`}),(0,p.jsx)(`dd`,{children:e.inventory.latestListingAt?new Date(e.inventory.latestListingAt).toLocaleString(`fa-IR`):`—`})]})]})]})]})]}),(0,p.jsx)(re,{})]})}var gn={elevator:`آسانسور`,parking:`پارکینگ`,storage:`انباری`,balcony:`بالکن`,rooftop:`روف‌گاردن`,lobby:`لابی`,doorman:`سرایدار`,security:`نگهبانی`,pool:`استخر`,sauna:`سونا`,gym:`باشگاه`,centralAntenna:`آنتن مرکزی`,airConditioning:`سرمایش`,heating:`گرمایش`},_n={transactionType:`buy`,propertyTypes:[`buy-residential-apartment`],locations:[],minPrice:``,maxPrice:``,minDeposit:``,maxDeposit:``,minRent:``,maxRent:``,minArea:``,maxArea:``,minRooms:``,maxBuildingAge:``,requiredAmenities:[],optionalAmenities:[],urgency:`normal`,financingStatus:`unknown`},vn=e=>e===``?null:Number(e),yn=e=>Number.isFinite(Number(e))?new Intl.NumberFormat(`fa-IR`).format(Number(e)):`—`;function bn({label:e,value:t,onChange:n,children:r}){return(0,p.jsxs)(`label`,{className:`buyer-field`,children:[(0,p.jsx)(`span`,{children:e}),(0,p.jsx)(`select`,{value:t,onChange:n,children:r})]})}function L({label:e,value:t,onChange:n,placeholder:r}){return(0,p.jsxs)(`label`,{className:`buyer-field`,children:[(0,p.jsx)(`span`,{children:e}),(0,p.jsx)(`input`,{inputMode:`numeric`,min:`0`,type:`number`,value:t,onChange:n,placeholder:r})]})}function xn({match:e}){let{listing:t,marketScore:n}=e,r=t.images?.[0];return(0,p.jsxs)(`article`,{className:`buyer-result-card`,children:[(0,p.jsxs)(`div`,{className:`buyer-result-score`,"aria-label":`امتیاز تطبیق ${e.matchScore} از ۱۰۰`,children:[(0,p.jsx)(`strong`,{children:yn(e.matchScore)}),(0,p.jsx)(`span`,{children:`تطبیق`})]}),(0,p.jsx)(`div`,{className:`buyer-result-image`,children:r?(0,p.jsx)(`img`,{src:r.thumbnailUrl||r.url,alt:r.alt||t.title,loading:`lazy`}):(0,p.jsx)(`span`,{children:`بدون تصویر`})}),(0,p.jsxs)(`div`,{className:`buyer-result-copy`,children:[(0,p.jsxs)(`div`,{className:`buyer-result-heading`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`small`,{children:t.neighborhood||`محله نامشخص`}),(0,p.jsx)(`h2`,{children:t.title})]}),(0,p.jsxs)(`strong`,{children:[yn(t.pricing?.price),` تومان`]})]}),(0,p.jsxs)(`dl`,{className:`buyer-result-facts`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`متراژ`}),(0,p.jsxs)(`dd`,{children:[yn(t.property?.area),` متر`]})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`اتاق`}),(0,p.jsx)(`dd`,{children:yn(t.property?.rooms)})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`سال ساخت`}),(0,p.jsx)(`dd`,{children:yn(t.property?.constructionYear)})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`dt`,{children:`امتیاز بازار`}),(0,p.jsx)(`dd`,{children:yn(n?.recommendation)})]})]}),(0,p.jsx)(`div`,{className:`buyer-result-reasons`,children:e.reasons.length?e.reasons.map(e=>(0,p.jsx)(`span`,{children:e.replaceAll(`-`,` `)},e)):(0,p.jsx)(`span`,{children:`مطابق فیلترهای الزامی`})}),(0,p.jsx)(`a`,{href:`/listing/${t.token}`,children:`مشاهده جزئیات آگهی`})]})]})}function Sn(){let[e,t]=(0,f.useState)(_n),[n,r]=(0,f.useState)({propertyTypes:[],locations:[],amenities:[]}),[i,a]=(0,f.useState)(``),[o,s]=(0,f.useState)([]),[c,l]=(0,f.useState)(null),[u,d]=(0,f.useState)(null),[m,h]=(0,f.useState)(!1),[g,_]=(0,f.useState)(null);(0,f.useEffect)(()=>{T(),fetch(`/buyer-matches/options`,{headers:{accept:`application/json`}}).then(e=>e.ok?e.json():Promise.reject(Error(`HTTP ${e.status}`))).then(r).catch(e=>_(e.message))},[]);let v=(0,f.useMemo)(()=>({...e,minPrice:vn(e.minPrice),maxPrice:vn(e.maxPrice),minDeposit:vn(e.minDeposit),maxDeposit:vn(e.maxDeposit),minRent:vn(e.minRent),maxRent:vn(e.maxRent),minArea:vn(e.minArea),maxArea:vn(e.maxArea),minRooms:vn(e.minRooms),maxBuildingAge:vn(e.maxBuildingAge)}),[e]),y=e=>n=>t(t=>({...t,[e]:n.target.value})),b=(e,n)=>t(t=>{let r=n===`requiredAmenities`?`optionalAmenities`:`requiredAmenities`,i=t[n].includes(e);return{...t,[n]:i?t[n].filter(t=>t!==e):[...t[n],e],[r]:t[r].filter(t=>t!==e)}}),x=()=>{let n=i.trim();!n||e.locations.includes(n)||(t(e=>({...e,locations:[...e.locations,n]})),a(``))},S=async({append:e=!1}={})=>{h(!0),_(null);try{let t=await fetch(`/buyer-matches/search`,{method:`POST`,headers:{accept:`application/json`,"content-type":`application/json`},body:JSON.stringify({requirement:v,page:{limit:30,cursor:e?u:null}})}),n=await t.json();if(!t.ok)throw Error(n.message||n.error||`HTTP ${t.status}`);s(t=>e?[...t,...n.matches]:n.matches),l({total:n.total,evaluated:n.evaluated,truncated:n.truncated,model:n.model}),d(n.nextCursor)}catch(e){_(e.message)}finally{h(!1)}};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(ne,{active:`matching`}),(0,p.jsxs)(`main`,{className:`buyer-page`,dir:`rtl`,children:[(0,p.jsxs)(`header`,{className:`buyer-header`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`a`,{href:`/catalog`,children:`بازگشت به آگهی‌ها`}),(0,p.jsx)(`p`,{children:`تطبیق تقاضای خریدار`}),(0,p.jsx)(`h1`,{children:`فایل مناسب را از میان داده‌های بازار پیدا کنید`}),(0,p.jsx)(`span`,{children:`فیلترهای الزامی در MongoDB اجرا می‌شوند و فقط حداکثر ۵۰۰ نامزد برای امتیاز تطبیق بررسی می‌شود.`})]}),c&&(0,p.jsxs)(`div`,{className:`buyer-summary`,children:[(0,p.jsx)(`strong`,{children:yn(c.total)}),(0,p.jsx)(`span`,{children:`فایل منطبق با شروط اصلی`}),(0,p.jsxs)(`small`,{children:[yn(c.evaluated),` فایل امتیازدهی شد`]})]})]}),(0,p.jsxs)(`form`,{className:`buyer-form`,onSubmit:e=>{e.preventDefault(),S()},children:[(0,p.jsxs)(`section`,{children:[(0,p.jsx)(`h2`,{children:`نوع معامله و بودجه`}),(0,p.jsxs)(`div`,{className:`buyer-grid`,children:[(0,p.jsxs)(bn,{label:`نوع معامله`,value:e.transactionType,onChange:y(`transactionType`),children:[(0,p.jsx)(`option`,{value:`buy`,children:`خرید`}),(0,p.jsx)(`option`,{value:`rent`,children:`رهن و اجاره`})]}),(0,p.jsxs)(bn,{label:`نوع ملک`,value:e.propertyTypes[0]||``,onChange:e=>t(t=>({...t,propertyTypes:e.target.value?[e.target.value]:[]})),children:[(0,p.jsx)(`option`,{value:``,children:`همه انواع`}),n.propertyTypes.map(e=>(0,p.jsx)(`option`,{value:e,children:e},e))]}),e.transactionType===`buy`?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(L,{label:`حداقل قیمت`,value:e.minPrice,onChange:y(`minPrice`),placeholder:`تومان`}),(0,p.jsx)(L,{label:`حداکثر قیمت`,value:e.maxPrice,onChange:y(`maxPrice`),placeholder:`تومان`})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(L,{label:`حداقل ودیعه`,value:e.minDeposit,onChange:y(`minDeposit`),placeholder:`تومان`}),(0,p.jsx)(L,{label:`حداکثر ودیعه`,value:e.maxDeposit,onChange:y(`maxDeposit`),placeholder:`تومان`}),(0,p.jsx)(L,{label:`حداقل اجاره`,value:e.minRent,onChange:y(`minRent`),placeholder:`تومان`}),(0,p.jsx)(L,{label:`حداکثر اجاره`,value:e.maxRent,onChange:y(`maxRent`),placeholder:`تومان`})]})]})]}),(0,p.jsxs)(`section`,{children:[(0,p.jsx)(`h2`,{children:`موقعیت و مشخصات ملک`}),(0,p.jsxs)(`div`,{className:`buyer-location-row`,children:[(0,p.jsxs)(`label`,{className:`buyer-field`,children:[(0,p.jsx)(`span`,{children:`افزودن محله`}),(0,p.jsx)(`input`,{list:`buyer-locations`,value:i,onChange:e=>a(e.target.value),onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),x())}})]}),(0,p.jsx)(`button`,{type:`button`,onClick:x,children:`افزودن`})]}),(0,p.jsx)(`datalist`,{id:`buyer-locations`,children:n.locations.map(e=>(0,p.jsx)(`option`,{value:e},e))}),(0,p.jsx)(`div`,{className:`buyer-chips`,children:e.locations.map(e=>(0,p.jsxs)(`button`,{type:`button`,onClick:()=>t(t=>({...t,locations:t.locations.filter(t=>t!==e)})),children:[e,(0,p.jsx)(`span`,{"aria-hidden":`true`,children:`×`})]},e))}),(0,p.jsxs)(`div`,{className:`buyer-grid`,children:[(0,p.jsx)(L,{label:`حداقل متراژ`,value:e.minArea,onChange:y(`minArea`)}),(0,p.jsx)(L,{label:`حداکثر متراژ`,value:e.maxArea,onChange:y(`maxArea`)}),(0,p.jsx)(L,{label:`حداقل اتاق`,value:e.minRooms,onChange:y(`minRooms`)}),(0,p.jsx)(L,{label:`حداکثر سن بنا`,value:e.maxBuildingAge,onChange:y(`maxBuildingAge`)})]})]}),(0,p.jsxs)(`section`,{children:[(0,p.jsx)(`h2`,{children:`امکانات`}),(0,p.jsx)(`p`,{className:`buyer-help`,children:`هر امکان را می‌توانید الزامی یا ترجیحی کنید.`}),(0,p.jsx)(`div`,{className:`buyer-amenities`,children:n.amenities.map(t=>(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`strong`,{children:gn[t]||t}),(0,p.jsx)(`button`,{type:`button`,className:e.requiredAmenities.includes(t)?`is-active`:``,onClick:()=>b(t,`requiredAmenities`),children:`الزامی`}),(0,p.jsx)(`button`,{type:`button`,className:e.optionalAmenities.includes(t)?`is-active is-optional`:``,onClick:()=>b(t,`optionalAmenities`),children:`ترجیحی`})]},t))})]}),(0,p.jsxs)(`section`,{children:[(0,p.jsx)(`h2`,{children:`وضعیت تقاضا`}),(0,p.jsxs)(`div`,{className:`buyer-grid`,children:[(0,p.jsxs)(bn,{label:`فوریت`,value:e.urgency,onChange:y(`urgency`),children:[(0,p.jsx)(`option`,{value:`low`,children:`کم`}),(0,p.jsx)(`option`,{value:`normal`,children:`عادی`}),(0,p.jsx)(`option`,{value:`high`,children:`زیاد`}),(0,p.jsx)(`option`,{value:`immediate`,children:`فوری`})]}),(0,p.jsxs)(bn,{label:`وضعیت تأمین مالی`,value:e.financingStatus,onChange:y(`financingStatus`),children:[(0,p.jsx)(`option`,{value:`unknown`,children:`نامشخص`}),(0,p.jsx)(`option`,{value:`ready`,children:`آماده`}),(0,p.jsx)(`option`,{value:`needs_financing`,children:`نیازمند تأمین مالی`}),(0,p.jsx)(`option`,{value:`not_ready`,children:`آماده نیست`})]})]})]}),g&&(0,p.jsxs)(`p`,{className:`buyer-error`,role:`alert`,children:[`خطا: `,g]}),(0,p.jsxs)(`div`,{className:`buyer-actions`,children:[(0,p.jsx)(`button`,{type:`submit`,disabled:m,children:m?`در حال جست‌وجو…`:`پیدا کردن فایل‌ها`}),(0,p.jsx)(`button`,{type:`button`,onClick:()=>{t(_n),s([]),l(null),d(null)},children:`پاک کردن فرم`})]})]}),(0,p.jsxs)(`section`,{className:`buyer-results`,"aria-live":`polite`,children:[o.map(e=>(0,p.jsx)(xn,{match:e},e.listing.token)),!m&&c&&!o.length&&(0,p.jsxs)(`div`,{className:`buyer-empty`,children:[(0,p.jsx)(`h2`,{children:`فایلی پیدا نشد`}),(0,p.jsx)(`p`,{children:`محدوده بودجه، محله یا امکانات الزامی را کمی بازتر کنید.`})]}),u&&(0,p.jsx)(`button`,{className:`buyer-load-more`,type:`button`,disabled:m,onClick:()=>void S({append:!0}),children:`نمایش نتایج بیشتر`})]})]}),(0,p.jsx)(re,{})]})}function Cn(){let e=window.location.pathname.replace(/\/$/,``)||`/`;if(e===`/score-analytics`)return(0,p.jsx)(Je,{});if(e===`/score-workshop`)return(0,p.jsx)(_t,{});if(e===`/catalog`)return(0,p.jsx)(Dt,{});if(e===`/data-quality`)return(0,p.jsx)(hn,{});if(e===`/buyer-matching`)return(0,p.jsx)(Sn,{});let t=e.match(/^\/explore(?:\/([a-z0-9-]+))?$/i);if(t)return(0,p.jsx)(et,{slug:t[1]||`iran`});let n=e.match(/^\/listing\/([A-Za-z0-9_-]+)$/);return n?(0,p.jsx)(sn,{token:n[1]}):(0,p.jsx)(Fe,{})}(0,d.createRoot)(document.getElementById(`root`)).render((0,p.jsx)(f.StrictMode,{children:(0,p.jsx)(Cn,{})}));