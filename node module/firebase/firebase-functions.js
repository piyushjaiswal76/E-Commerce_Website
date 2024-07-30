import{_registerComponent as e,registerVersion as t,_getProvider,getApp as n}from"https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";const r={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){const o=e[t],s=t+1<e.length,i=s?e[t+1]:0,a=t+2<e.length,c=a?e[t+2]:0,u=o>>2,l=(3&o)<<4|i>>4;let h=(15&i)<<2|c>>6,d=63&c;a||(d=64,s||(h=64)),r.push(n[u],n[l],n[h],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let o=e.charCodeAt(r);o<128?t[n++]=o:o<2048?(t[n++]=o>>6|192,t[n++]=63&o|128):55296==(64512&o)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(o=65536+((1023&o)<<10)+(1023&e.charCodeAt(++r)),t[n++]=o>>18|240,t[n++]=o>>12&63|128,t[n++]=o>>6&63|128,t[n++]=63&o|128):(t[n++]=o>>12|224,t[n++]=o>>6&63|128,t[n++]=63&o|128)}return t}(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const o=e[n++];if(o<128)t[r++]=String.fromCharCode(o);else if(o>191&&o<224){const s=e[n++];t[r++]=String.fromCharCode((31&o)<<6|63&s)}else if(o>239&&o<365){const s=((7&o)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(s>>10)),t[r++]=String.fromCharCode(56320+(1023&s))}else{const s=e[n++],i=e[n++];t[r++]=String.fromCharCode((15&o)<<12|(63&s)<<6|63&i)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){const o=n[e.charAt(t++)],s=t<e.length?n[e.charAt(t)]:0;++t;const i=t<e.length?n[e.charAt(t)]:64;++t;const a=t<e.length?n[e.charAt(t)]:64;if(++t,null==o||null==s||null==i||null==a)throw new DecodeBase64StringError;const c=o<<2|s>>4;if(r.push(c),64!==i){const e=s<<4&240|i>>2;if(r.push(e),64!==a){const e=i<<6&192|a;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class DecodeBase64StringError extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const getDefaultsFromGlobal=()=>function getGlobal(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,getDefaultsFromCookie=()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&function(e){try{return r.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null}(e[1]);return t&&JSON.parse(t)},getDefaults=()=>{try{return getDefaultsFromGlobal()||(()=>{if("undefined"==typeof process||void 0===process.env)return;const e=process.env.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||getDefaultsFromCookie()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},getDefaultEmulatorHostnameAndPort=e=>{const t=(e=>{var t,n;return null===(n=null===(t=getDefaults())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]})(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]};class FirebaseError extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,FirebaseError.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ErrorFactory.prototype.create)}}class ErrorFactory{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,s=this.errors[e],i=s?function replaceTemplate(e,t){return e.replace(o,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(s,n):"Error",a=`${this.serviceName}: ${i} (${r}).`;return new FirebaseError(r,a,n)}}const o=/\{\$([^}]+)}/g;function getModularInstance(e){return e&&e._delegate?e._delegate:e}class Component{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}function mapValues(e,t){const n={};for(const r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}function encode(e){if(null==e)return null;if(e instanceof Number&&(e=e.valueOf()),"number"==typeof e&&isFinite(e))return e;if(!0===e||!1===e)return e;if("[object String]"===Object.prototype.toString.call(e))return e;if(e instanceof Date)return e.toISOString();if(Array.isArray(e))return e.map((e=>encode(e)));if("function"==typeof e||"object"==typeof e)return mapValues(e,(e=>encode(e)));throw new Error("Data cannot be encoded in JSON: "+e)}function decode(e){if(null==e)return e;if(e["@type"])switch(e["@type"]){case"type.googleapis.com/google.protobuf.Int64Value":case"type.googleapis.com/google.protobuf.UInt64Value":{const t=Number(e.value);if(isNaN(t))throw new Error("Data cannot be decoded from JSON: "+e);return t}default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map((e=>decode(e))):"function"==typeof e||"object"==typeof e?mapValues(e,(e=>decode(e))):e}const s={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class FunctionsError extends FirebaseError{constructor(e,t,n){super(`functions/${e}`,t||""),this.details=n}}class ContextProvider{constructor(e,t,n){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then((e=>this.auth=e),(()=>{})),this.messaging||t.get().then((e=>this.messaging=e),(()=>{})),this.appCheck||n.get().then((e=>this.appCheck=e),(()=>{}))}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return null==e?void 0:e.accessToken}catch(e){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return await this.messaging.getToken()}catch(e){return}}async getAppCheckToken(e){if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){return{authToken:await this.getAuthToken(),messagingToken:await this.getMessagingToken(),appCheckToken:await this.getAppCheckToken(e)}}}class FunctionsService{constructor(e,t,n,r,o="us-central1",s){this.app=e,this.fetchImpl=s,this.emulatorOrigin=null,this.contextProvider=new ContextProvider(t,n,r),this.cancelAllRequests=new Promise((e=>{this.deleteService=()=>Promise.resolve(e())}));try{const e=new URL(o);this.customDomain=e.origin,this.region="us-central1"}catch(e){this.customDomain=null,this.region=o}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;if(null!==this.emulatorOrigin){return`${this.emulatorOrigin}/${t}/${this.region}/${e}`}return null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function httpsCallable$1(e,t,n){return r=>function call(e,t,n,r){const o=e._url(t);return callAtURL(e,o,n,r)}(e,t,r,n||{})}async function postJSON(e,t,n,r){let o;n["Content-Type"]="application/json";try{o=await r(e,{method:"POST",body:JSON.stringify(t),headers:n})}catch(e){return{status:0,json:null}}let s=null;try{s=await o.json()}catch(e){}return{status:o.status,json:s}}async function callAtURL(e,t,n,r){const o={data:n=encode(n)},i={},a=await e.contextProvider.getContext(r.limitedUseAppCheckTokens);a.authToken&&(i.Authorization="Bearer "+a.authToken),a.messagingToken&&(i["Firebase-Instance-ID-Token"]=a.messagingToken),null!==a.appCheckToken&&(i["X-Firebase-AppCheck"]=a.appCheckToken);const c=function failAfter(e){let t=null;return{promise:new Promise(((n,r)=>{t=setTimeout((()=>{r(new FunctionsError("deadline-exceeded","deadline-exceeded"))}),e)})),cancel:()=>{t&&clearTimeout(t)}}}(r.timeout||7e4),u=await Promise.race([postJSON(t,o,i,e.fetchImpl),c.promise,e.cancelAllRequests]);if(c.cancel(),!u)throw new FunctionsError("cancelled","Firebase Functions instance was deleted.");const l=function _errorForResponse(e,t){let n,r=function codeForHTTPStatus(e){if(e>=200&&e<300)return"ok";switch(e){case 0:case 500:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(e),o=r;try{const e=t&&t.error;if(e){const t=e.status;if("string"==typeof t){if(!s[t])return new FunctionsError("internal","internal");r=s[t],o=t}const i=e.message;"string"==typeof i&&(o=i),n=e.details,void 0!==n&&(n=decode(n))}}catch(e){}return"ok"===r?null:new FunctionsError(r,o,n)}(u.status,u.json);if(l)throw l;if(!u.json)throw new FunctionsError("internal","Response is not valid JSON object.");let h=u.json.data;if(void 0===h&&(h=u.json.result),void 0===h)throw new FunctionsError("internal","Response is missing data field.");return{data:decode(h)}}const i="@firebase/functions";function getFunctions(e=n(),t="us-central1"){const r=_getProvider(getModularInstance(e),"functions").getImmediate({identifier:t}),o=getDefaultEmulatorHostnameAndPort("functions");return o&&connectFunctionsEmulator(r,...o),r}function connectFunctionsEmulator(e,t,n){!function connectFunctionsEmulator$1(e,t,n){e.emulatorOrigin=`http://${t}:${n}`}(getModularInstance(e),t,n)}function httpsCallable(e,t,n){return httpsCallable$1(getModularInstance(e),t,n)}function httpsCallableFromURL(e,t,n){return function httpsCallableFromURL$1(e,t,n){return r=>callAtURL(e,t,r,n||{})}(getModularInstance(e),t,n)}!function registerFunctions(n,r){e(new Component("functions",((e,{instanceIdentifier:t})=>{const r=e.getProvider("app").getImmediate(),o=e.getProvider("auth-internal"),s=e.getProvider("messaging-internal"),i=e.getProvider("app-check-internal");return new FunctionsService(r,o,s,i,t,n)}),"PUBLIC").setMultipleInstances(!0)),t(i,"0.10.0",r),t(i,"0.10.0","esm2017")}(fetch.bind(self));export{connectFunctionsEmulator,getFunctions,httpsCallable,httpsCallableFromURL};

//# sourceMappingURL=firebase-functions.js.map
