"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("redux"),e=require("react-redux");function r(t,e){var r=Symbol(t);function n(t){return{type:r,payload:t}}return n.actionType=r,n.type=t,n.parent=e,n}var n=function(){return n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},n.apply(this,arguments)};var o=function(t){var r=e.useDispatch();return[function(e){r(t(e))}]},u=function(t){var r,n=t.parent,o=t.type,u=(r=function(t){var e,r;return n?((e={})[o]=t[n][o],e):((r={})[o]=t[o],r)},e.useSelector(r,e.shallowEqual));return[u[o]]};exports.autoActions=void 0;exports.initReducers=function(e){exports.autoActions=function(t,e){void 0===e&&(e="");var n={};return Object.keys(t).map((function(o){var u=t[o];"[object Object]"===Object.prototype.toString.call(u)&&Object.keys(u).length?(n[o]={},Object.keys(u).map((function(t){n[o][t]=r(t,o)}))):n[o]=r(o,e)})),n}(e);var o=t.combineReducers(function(t){var e={};return Object.keys(t).map((function(r){var o=t[r];e[r]=function(t,e){var r;void 0===t&&(t=null);var u=e.payload,c=e.type;if("function"==typeof o)return o.actionType===c?u:t;for(var a=Object.keys(o),i=0;i<a.length;i++){var s=a[i];if(o[s].actionType===c)return n(n({},t),((r={})[s]=u,r))}return t}})),e}(exports.autoActions));return{autoActions:exports.autoActions,reducers:o}},exports.useAutoRedux=function(t){return[u(t)[0],o(t)[0]]},exports.useFetchAction=function(t,r,n){var o=e.useDispatch();return[function(){for(var e=[],u=0;u<arguments.length;u++)e[u]=arguments[u];r.apply(void 0,e).then((function(e){o(t(e)),n&&n(e)})).catch((function(t){n&&n(null,t)}))}]},exports.useReduxActions=o,exports.useReduxState=u;
