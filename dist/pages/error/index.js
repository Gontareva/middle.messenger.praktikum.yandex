parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vfTH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});
},{}],"saRr":[function(require,module,exports) {
"use strict";var e;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=o;var t=new Uint8Array(16);function o(){if(!e&&!(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(t)}
},{}],"Kfyb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;exports.default=e;
},{}],"dh4g":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./regex.js"));function t(e){return e&&e.__esModule?e:{default:e}}function r(t){return"string"==typeof t&&e.default.test(t)}var u=r;exports.default=u;
},{"./regex.js":"Kfyb"}],"Okf7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./validate.js"));function r(e){return e&&e.__esModule?e:{default:e}}for(var t=[],i=0;i<256;++i)t.push((i+256).toString(16).substr(1));function o(r){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=(t[r[i+0]]+t[r[i+1]]+t[r[i+2]]+t[r[i+3]]+"-"+t[r[i+4]]+t[r[i+5]]+"-"+t[r[i+6]]+t[r[i+7]]+"-"+t[r[i+8]]+t[r[i+9]]+"-"+t[r[i+10]]+t[r[i+11]]+t[r[i+12]]+t[r[i+13]]+t[r[i+14]]+t[r[i+15]]).toLowerCase();if(!(0,e.default)(o))throw TypeError("Stringified UUID is invalid");return o}var u=o;exports.default=u;
},{"./validate.js":"dh4g"}],"ds1e":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e,r,s=o(require("./rng.js")),n=o(require("./stringify.js"));function o(e){return e&&e.__esModule?e:{default:e}}var u=0,t=0;function a(o,a,l){var d=a&&l||0,i=a||new Array(16),c=(o=o||{}).node||e,v=void 0!==o.clockseq?o.clockseq:r;if(null==c||null==v){var f=o.random||(o.rng||s.default)();null==c&&(c=e=[1|f[0],f[1],f[2],f[3],f[4],f[5]]),null==v&&(v=r=16383&(f[6]<<8|f[7]))}var q=void 0!==o.msecs?o.msecs:Date.now(),m=void 0!==o.nsecs?o.nsecs:t+1,p=q-u+(m-t)/1e4;if(p<0&&void 0===o.clockseq&&(v=v+1&16383),(p<0||q>u)&&void 0===o.nsecs&&(m=0),m>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");u=q,t=m,r=v;var w=(1e4*(268435455&(q+=122192928e5))+m)%4294967296;i[d++]=w>>>24&255,i[d++]=w>>>16&255,i[d++]=w>>>8&255,i[d++]=255&w;var _=q/4294967296*1e4&268435455;i[d++]=_>>>8&255,i[d++]=255&_,i[d++]=_>>>24&15|16,i[d++]=_>>>16&255,i[d++]=v>>>8|128,i[d++]=255&v;for(var g=0;g<6;++g)i[d+g]=c[g];return a||(0,n.default)(i)}var l=a;exports.default=l;
},{"./rng.js":"saRr","./stringify.js":"Okf7"}],"i9qQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./validate.js"));function r(e){return e&&e.__esModule?e:{default:e}}function t(r){if(!(0,e.default)(r))throw TypeError("Invalid UUID");var t,s=new Uint8Array(16);return s[0]=(t=parseInt(r.slice(0,8),16))>>>24,s[1]=t>>>16&255,s[2]=t>>>8&255,s[3]=255&t,s[4]=(t=parseInt(r.slice(9,13),16))>>>8,s[5]=255&t,s[6]=(t=parseInt(r.slice(14,18),16))>>>8,s[7]=255&t,s[8]=(t=parseInt(r.slice(19,23),16))>>>8,s[9]=255&t,s[10]=(t=parseInt(r.slice(24,36),16))/1099511627776&255,s[11]=t/4294967296&255,s[12]=t>>>24&255,s[13]=t>>>16&255,s[14]=t>>>8&255,s[15]=255&t,s}var s=t;exports.default=s;
},{"./validate.js":"dh4g"}],"jljL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=s,exports.URL=exports.DNS=void 0;var e=t(require("./stringify.js")),r=t(require("./parse.js"));function t(e){return e&&e.__esModule?e:{default:e}}function n(e){e=unescape(encodeURIComponent(e));for(var r=[],t=0;t<e.length;++t)r.push(e.charCodeAt(t));return r}var a="6ba7b810-9dad-11d1-80b4-00c04fd430c8";exports.DNS=a;var o="6ba7b811-9dad-11d1-80b4-00c04fd430c8";function s(t,s,u){function i(t,a,o,i){if("string"==typeof t&&(t=n(t)),"string"==typeof a&&(a=(0,r.default)(a)),16!==a.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var d=new Uint8Array(16+t.length);if(d.set(a),d.set(t,a.length),(d=u(d))[6]=15&d[6]|s,d[8]=63&d[8]|128,o){i=i||0;for(var f=0;f<16;++f)o[i+f]=d[f];return o}return(0,e.default)(d)}try{i.name=t}catch(d){}return i.DNS=a,i.URL=o,i}exports.URL=o;
},{"./stringify.js":"Okf7","./parse.js":"i9qQ"}],"z990":[function(require,module,exports) {
"use strict";function n(n){if("string"==typeof n){var t=unescape(encodeURIComponent(n));n=new Uint8Array(t.length);for(var o=0;o<t.length;++o)n[o]=t.charCodeAt(o)}return r(e(u(n),8*n.length))}function r(n){for(var r=[],t=32*n.length,e=0;e<t;e+=8){var u=n[e>>5]>>>e%32&255,o=parseInt("0123456789abcdef".charAt(u>>>4&15)+"0123456789abcdef".charAt(15&u),16);r.push(o)}return r}function t(n){return 14+(n+64>>>9<<4)+1}function e(n,r){n[r>>5]|=128<<r%32,n[t(r)-1]=r;for(var e=1732584193,u=-271733879,f=-1732584194,a=271733878,v=0;v<n.length;v+=16){var s=e,d=u,p=f,g=a;e=c(e,u,f,a,n[v],7,-680876936),a=c(a,e,u,f,n[v+1],12,-389564586),f=c(f,a,e,u,n[v+2],17,606105819),u=c(u,f,a,e,n[v+3],22,-1044525330),e=c(e,u,f,a,n[v+4],7,-176418897),a=c(a,e,u,f,n[v+5],12,1200080426),f=c(f,a,e,u,n[v+6],17,-1473231341),u=c(u,f,a,e,n[v+7],22,-45705983),e=c(e,u,f,a,n[v+8],7,1770035416),a=c(a,e,u,f,n[v+9],12,-1958414417),f=c(f,a,e,u,n[v+10],17,-42063),u=c(u,f,a,e,n[v+11],22,-1990404162),e=c(e,u,f,a,n[v+12],7,1804603682),a=c(a,e,u,f,n[v+13],12,-40341101),f=c(f,a,e,u,n[v+14],17,-1502002290),e=i(e,u=c(u,f,a,e,n[v+15],22,1236535329),f,a,n[v+1],5,-165796510),a=i(a,e,u,f,n[v+6],9,-1069501632),f=i(f,a,e,u,n[v+11],14,643717713),u=i(u,f,a,e,n[v],20,-373897302),e=i(e,u,f,a,n[v+5],5,-701558691),a=i(a,e,u,f,n[v+10],9,38016083),f=i(f,a,e,u,n[v+15],14,-660478335),u=i(u,f,a,e,n[v+4],20,-405537848),e=i(e,u,f,a,n[v+9],5,568446438),a=i(a,e,u,f,n[v+14],9,-1019803690),f=i(f,a,e,u,n[v+3],14,-187363961),u=i(u,f,a,e,n[v+8],20,1163531501),e=i(e,u,f,a,n[v+13],5,-1444681467),a=i(a,e,u,f,n[v+2],9,-51403784),f=i(f,a,e,u,n[v+7],14,1735328473),e=h(e,u=i(u,f,a,e,n[v+12],20,-1926607734),f,a,n[v+5],4,-378558),a=h(a,e,u,f,n[v+8],11,-2022574463),f=h(f,a,e,u,n[v+11],16,1839030562),u=h(u,f,a,e,n[v+14],23,-35309556),e=h(e,u,f,a,n[v+1],4,-1530992060),a=h(a,e,u,f,n[v+4],11,1272893353),f=h(f,a,e,u,n[v+7],16,-155497632),u=h(u,f,a,e,n[v+10],23,-1094730640),e=h(e,u,f,a,n[v+13],4,681279174),a=h(a,e,u,f,n[v],11,-358537222),f=h(f,a,e,u,n[v+3],16,-722521979),u=h(u,f,a,e,n[v+6],23,76029189),e=h(e,u,f,a,n[v+9],4,-640364487),a=h(a,e,u,f,n[v+12],11,-421815835),f=h(f,a,e,u,n[v+15],16,530742520),e=l(e,u=h(u,f,a,e,n[v+2],23,-995338651),f,a,n[v],6,-198630844),a=l(a,e,u,f,n[v+7],10,1126891415),f=l(f,a,e,u,n[v+14],15,-1416354905),u=l(u,f,a,e,n[v+5],21,-57434055),e=l(e,u,f,a,n[v+12],6,1700485571),a=l(a,e,u,f,n[v+3],10,-1894986606),f=l(f,a,e,u,n[v+10],15,-1051523),u=l(u,f,a,e,n[v+1],21,-2054922799),e=l(e,u,f,a,n[v+8],6,1873313359),a=l(a,e,u,f,n[v+15],10,-30611744),f=l(f,a,e,u,n[v+6],15,-1560198380),u=l(u,f,a,e,n[v+13],21,1309151649),e=l(e,u,f,a,n[v+4],6,-145523070),a=l(a,e,u,f,n[v+11],10,-1120210379),f=l(f,a,e,u,n[v+2],15,718787259),u=l(u,f,a,e,n[v+9],21,-343485551),e=o(e,s),u=o(u,d),f=o(f,p),a=o(a,g)}return[e,u,f,a]}function u(n){if(0===n.length)return[];for(var r=8*n.length,e=new Uint32Array(t(r)),u=0;u<r;u+=8)e[u>>5]|=(255&n[u/8])<<u%32;return e}function o(n,r){var t=(65535&n)+(65535&r);return(n>>16)+(r>>16)+(t>>16)<<16|65535&t}function f(n,r){return n<<r|n>>>32-r}function a(n,r,t,e,u,a){return o(f(o(o(r,n),o(e,a)),u),t)}function c(n,r,t,e,u,o,f){return a(r&t|~r&e,n,r,u,o,f)}function i(n,r,t,e,u,o,f){return a(r&e|t&~e,n,r,u,o,f)}function h(n,r,t,e,u,o,f){return a(r^t^e,n,r,u,o,f)}function l(n,r,t,e,u,o,f){return a(t^(r|~e),n,r,u,o,f)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var v=n;exports.default=v;
},{}],"Nc2A":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./v35.js")),r=t(require("./md5.js"));function t(e){return e&&e.__esModule?e:{default:e}}var u=(0,e.default)("v3",48,r.default),d=u;exports.default=d;
},{"./v35.js":"jljL","./md5.js":"z990"}],"HQTZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./rng.js")),r=t(require("./stringify.js"));function t(e){return e&&e.__esModule?e:{default:e}}function u(t,u,n){var a=(t=t||{}).random||(t.rng||e.default)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,u){n=n||0;for(var f=0;f<16;++f)u[n+f]=a[f];return u}return(0,r.default)(a)}var n=u;exports.default=n;
},{"./rng.js":"saRr","./stringify.js":"Okf7"}],"F2vf":[function(require,module,exports) {
"use strict";function r(r,e,t,a){switch(r){case 0:return e&t^~e&a;case 1:return e^t^a;case 2:return e&t^e&a^t&a;case 3:return e^t^a}}function e(r,e){return r<<e|r>>>32-e}function t(t){var a=[1518500249,1859775393,2400959708,3395469782],o=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof t){var n=unescape(encodeURIComponent(t));t=[];for(var s=0;s<n.length;++s)t.push(n.charCodeAt(s))}else Array.isArray(t)||(t=Array.prototype.slice.call(t));t.push(128);for(var f=t.length/4+2,u=Math.ceil(f/16),c=new Array(u),l=0;l<u;++l){for(var i=new Uint32Array(16),v=0;v<16;++v)i[v]=t[64*l+4*v]<<24|t[64*l+4*v+1]<<16|t[64*l+4*v+2]<<8|t[64*l+4*v+3];c[l]=i}c[u-1][14]=8*(t.length-1)/Math.pow(2,32),c[u-1][14]=Math.floor(c[u-1][14]),c[u-1][15]=8*(t.length-1)&4294967295;for(var h=0;h<u;++h){for(var p=new Uint32Array(80),y=0;y<16;++y)p[y]=c[h][y];for(var d=16;d<80;++d)p[d]=e(p[d-3]^p[d-8]^p[d-14]^p[d-16],1);for(var A=o[0],g=o[1],w=o[2],M=o[3],x=o[4],U=0;U<80;++U){var C=Math.floor(U/20),_=e(A,5)+r(C,g,w,M)+x+a[C]+p[U]>>>0;x=M,M=w,w=e(g,30)>>>0,g=A,A=_}o[0]=o[0]+A>>>0,o[1]=o[1]+g>>>0,o[2]=o[2]+w>>>0,o[3]=o[3]+M>>>0,o[4]=o[4]+x>>>0}return[o[0]>>24&255,o[0]>>16&255,o[0]>>8&255,255&o[0],o[1]>>24&255,o[1]>>16&255,o[1]>>8&255,255&o[1],o[2]>>24&255,o[2]>>16&255,o[2]>>8&255,255&o[2],o[3]>>24&255,o[3]>>16&255,o[3]>>8&255,255&o[3],o[4]>>24&255,o[4]>>16&255,o[4]>>8&255,255&o[4]]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var a=t;exports.default=a;
},{}],"oZbo":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./v35.js")),r=t(require("./sha1.js"));function t(e){return e&&e.__esModule?e:{default:e}}var u=(0,e.default)("v5",80,r.default),s=u;exports.default=s;
},{"./v35.js":"jljL","./sha1.js":"F2vf"}],"Bkgj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e="00000000-0000-0000-0000-000000000000";exports.default=e;
},{}],"kmp0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./validate.js"));function r(e){return e&&e.__esModule?e:{default:e}}function t(r){if(!(0,e.default)(r))throw TypeError("Invalid UUID");return parseInt(r.substr(14,1),16)}var u=t;exports.default=u;
},{"./validate.js":"dh4g"}],"D6fo":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"v1",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"v3",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(exports,"v4",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(exports,"v5",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(exports,"NIL",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(exports,"version",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(exports,"validate",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(exports,"stringify",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(exports,"parse",{enumerable:!0,get:function(){return s.default}});var e=a(require("./v1.js")),r=a(require("./v3.js")),t=a(require("./v4.js")),n=a(require("./v5.js")),u=a(require("./nil.js")),i=a(require("./version.js")),o=a(require("./validate.js")),f=a(require("./stringify.js")),s=a(require("./parse.js"));function a(e){return e&&e.__esModule?e:{default:e}}
},{"./v1.js":"ds1e","./v3.js":"Nc2A","./v4.js":"HQTZ","./v5.js":"oZbo","./nil.js":"Bkgj","./version.js":"kmp0","./validate.js":"dh4g","./stringify.js":"Okf7","./parse.js":"i9qQ"}],"GjfU":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r=function(){function t(){e(this,t),this.listeners={}}return n(t,[{key:"on",value:function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}},{key:"off",value:function(e,t){if(!this.listeners[e])throw new Error("Нет события: ".concat(e));this.listeners[e]=this.listeners[e].filter(function(e){return e!==t})}},{key:"emit",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];if(!this.listeners[e])throw new Error("Нет события: ".concat(e));this.listeners[e].forEach(function(e){e.apply(void 0,n)})}}]),t}(),i=r;exports.default=i;
},{}],"mUMD":[function(require,module,exports) {
"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(t)}function t(r){return i(r)||o(r)||n(r)||e()}function e(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(r,t){if(r){if("string"==typeof r)return u(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?u(r,t):void 0}}function o(r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(r))return Array.from(r)}function i(r){if(Array.isArray(r))return u(r)}function u(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n}function y(e,n){if(e===n)return!0;if(Array.isArray(e)&&Array.isArray(n))return e.length===n.length&&f(e,n,t(e.keys()));if("object"===r(e)&&"object"===r(n)){var o=Object.keys(e).sort();if(y(o,Object.keys(n).sort()))return f(e,n,o)}return!1}function f(r,t,e){return e.every(function(e){return r[e]===t[e]||y(r[e],t[e])})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y;
},{}],"Fv9L":[function(require,module,exports) {
"use strict";function t(o){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(o)}function o(e){return Array.isArray(e)?e.map(o):e&&"object"===t(e)?Object.keys(e).reduce(function(t,r){return t[r]=o(e[r]),t},{}):e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=o;
},{}],"ylRh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("uuid"),t=o(require("../eventBus")),n=o(require("../isEqual")),i=o(require("../deepCopy"));function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach(function(t){s(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function l(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}var p=function(){function o(n){var r=this;c(this,o),this.setProps=function(e){e&&Object.assign(r.props,e)},this._makePropsProxy=function(e){return new Proxy(e,{get:function(e,t){if(!t.startsWith("_"))return"function"==typeof e[t]?e[t].bind(self):e[t]},set:function(e,t,n){if(!t.startsWith("_")){var u=(0,i.default)(e);e[t]=n,r._eventBus().emit(o.EVENTS.FLOW_SCU,u,e)}return!0},deleteProperty:function(){throw new Error("Нет доступа")}})};var s=new t.default;this._meta={props:n},this._id=(0,e.v4)(),this._props=(0,i.default)(n),this.props=this._makePropsProxy(u({events:{}},n)),this._eventBus=function(){return s},this._registerEvents(s),s.emit(o.EVENTS.INIT)}return l(o,[{key:"_registerEvents",value:function(e){e.on(o.EVENTS.INIT,this._init.bind(this)),e.on(o.EVENTS.FLOW_CDM,this._componentDidMount.bind(this)),e.on(o.EVENTS.FLOW_CDU,this._componentDidUpdate.bind(this)),e.on(o.EVENTS.FLOW_RENDER,this._render.bind(this)),e.on(o.EVENTS.FLOW_CWU,this._componentWillUnmount.bind(this)),e.on(o.EVENTS.FLOW_SCU,this._shouldComponentUpdate.bind(this))}},{key:"_createResources",value:function(){this._parent=o._createDocumentElement("div"),this._eventBus().emit(o.EVENTS.FLOW_RENDER),this._eventBus().emit(o.EVENTS.FLOW_CDM)}},{key:"_init",value:function(){this.init(),this._createResources()}},{key:"init",value:function(){}},{key:"_componentDidMount",value:function(){this.componentDidMount()}},{key:"componentDidMount",value:function(){}},{key:"_componentDidUpdate",value:function(e,t){this.componentDidUpdate(e,t)}},{key:"componentDidUpdate",value:function(e,t){}},{key:"_shouldComponentUpdate",value:function(e,t){this.shouldComponentUpdate(e,t)&&(this._eventBus().emit(o.EVENTS.FLOW_RENDER),this._eventBus().emit(o.EVENTS.FLOW_CDU,e,t))}},{key:"shouldComponentUpdate",value:function(e,t){return!(0,n.default)(e,t)}},{key:"element",get:function(){return this._element}},{key:"_render",value:function(){var e=this,t=this.render();this._element&&(this._element.parentNode.replaceChild(t,this._element),delete this._element),this._element=t,Object.keys(this.props.events).forEach(function(t){e._element.addEventListener(t,e.props.events[t])})}},{key:"render",value:function(){}},{key:"getContent",value:function(){return this.element}},{key:"_componentWillUnmount",value:function(){this.componentWillUnmount()}},{key:"componentWillUnmount",value:function(){}},{key:"getPlaceholderHtml",value:function(){return"<div data-id=".concat(this._id,"></div>")}},{key:"insertInElement",value:function(e){var t=e.querySelector("[data-id='".concat(this._id,"']"));t&&t.parentNode.replaceChild(this.element,t)}}],[{key:"_createDocumentElement",value:function(e){return document.createElement(e)}}]),o}();p.EVENTS={INIT:"init",FLOW_CDM:"flow:component-did-mount",FLOW_CDU:"flow:component-did-update",FLOW_CWU:"flow:component-will-unmount",FLOW_SCU:"flow:should-component-update",FLOW_RENDER:"flow:render"};var d=p;exports.default=d;
},{"uuid":"D6fo","../eventBus":"GjfU","../isEqual":"mUMD","../deepCopy":"Fv9L"}],"cyFB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"IBlockProps",{enumerable:!0,get:function(){return e.IBlockProps}}),exports.default=void 0;var e=require("./types"),r=t(require("./Block"));function t(e){return e&&e.__esModule?e:{default:e}}var o=r.default;exports.default=o;
},{"./types":"vfTH","./Block":"ylRh"}],"AUHY":[function(require,module,exports) {
"use strict";function e(e){var t=new FormData(e);return Object.fromEntries(t)}function t(t){t.preventDefault();var n=e(t.target);return console.log(n),n}function n(e){var t=document.getElementById("app");return console.log(e.getContent()),t.appendChild(e.getContent()),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getData=e,exports.onSubmitForm=t,exports.renderPage=n;
},{}],"ef1p":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;var t=e(require("./Block/Block"));function e(t){return t&&t.__esModule?t:{default:t}}function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){var n=[],r=c(e,n),o=document.createElement("div");return o.innerHTML=t(r),n.forEach(function(t){t.insertInElement(o)}),o.firstElementChild}function o(e,n){return e instanceof t.default?e.getPlaceholderHtml():!e||f(e)||"function"==typeof e?e:c(e,n)}function u(e,n){var r=o(e,n);return e instanceof t.default&&n.push(e),r}function c(e,r){return Array.isArray(e)?e.map(function(t){return u(t,r)}):!e||"object"!==n(e)||e instanceof t.default?u(e,r):Object.keys(e).reduce(function(t,n){return t[n]=c(e[n],r),t},{})}function f(t){return Object(t)!==t}
},{"./Block/Block":"ylRh"}],"pbb4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("../../utils/Block")),t=require("../../utils/common"),r=n(require("../../utils/compile"));function n(e){return e&&e.__esModule?e:{default:e}}function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach(function(t){i(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t,r){return t&&l(e.prototype,t),r&&l(e,r),e}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){var t=d();return function(){var r,n=v(e);if(t){var o=v(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return b(this,r)}}function b(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?O(e):t}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var h=function(n){p(u,e.default);var o=y(u);function u(e){var t;return f(this,u),t=o.call(this,c({render:function(){return null}},e)),document.title=e.title,t}return a(u,[{key:"componentDidMount",value:function(){(0,t.renderPage)(this)}},{key:"render",value:function(){var e=this.props,t=e.template,n=e.render;return(0,r.default)(t,n())}}]),u}();exports.default=h;
},{"../../utils/Block":"cyFB","../../utils/common":"AUHY","../../utils/compile":"ef1p"}],"IhHB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"IPageProps",{enumerable:!0,get:function(){return e.IPageProps}}),exports.default=void 0;var e=require("./types"),r=t(require("./Page"));function t(e){return e&&e.__esModule?e:{default:e}}var u=r.default;exports.default=u;
},{"./types":"vfTH","./Page":"pbb4"}],"Owr6":[function(require,module,exports) {
function e(e){var r=""+e,s=a.exec(r);if(!s)return e;var d,i,n,o="";for(d=s.index,i=0;d<r.length;d++){switch(r.charCodeAt(d)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}i!==d&&(o+=r.substring(i,d)),i=d+1,o+=n}return i!==d?o+r.substring(i,d):o}var a=/["&<>]/;function r(a){var r,s="",d=a||{};return function(a,d){s=s+'<div class="page"><div class="page__body page__body_column error"><h1 class="error__code">'+e(null==(r=a)?"":r)+'</h1><div class="error__message">'+e(null==(r=d)?"":r)+'</div><div class="error__link"><a href="/chat">Назад к чатам</a></div></div></div>'}.call(this,"code"in d?d.code:"undefined"!=typeof code?code:void 0,"message"in d?d.message:"undefined"!=typeof message?message:void 0),s}module.exports=r;
},{}],"Auhc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("../../components/Page")),t=r(require("../../../dist/pages/Error.template.js"));function r(e){return e&&e.__esModule?e:{default:e}}var u=new e.default({title:"Ошибка",template:t.default,render:function(){return{code:404,message:"Не туда попали"}}}),a=u;exports.default=a;
},{"../../components/Page":"IhHB","../../../dist/pages/Error.template.js":"Owr6"}],"BnRj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./Error"));function r(e){return e&&e.__esModule?e:{default:e}}var t=e.default;exports.default=t;
},{"./Error":"Auhc"}]},{},["BnRj"], null)
//# sourceMappingURL=/pages/error/index.js.map