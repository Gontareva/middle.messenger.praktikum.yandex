function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;function messageTemplateTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (fileUrl, isOwnMessage, modifiers, modifiersHelper, status, text, time) {pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["message",modifiersHelper('message', modifiers)], [false,true]), false, false)) + "\u003E";
if (fileUrl) {
pug_html = pug_html + "\u003Cimg" + (" class=\"message__file\""+pug_attr("src", fileUrl, true, false)) + "\u002F\u003E";
}
if (text) {
pug_html = pug_html + "\u003Cdiv class=\"message__text\"\u003E" + (null == (pug_interp = text) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"message__label\"\u003E";
if (isOwnMessage && status) {
pug_html = pug_html + "\u003Cspan" + (pug_attr("class", pug_classes(["message__status",modifiersHelper('message__status', [status])], [false,true]), false, false)) + "\u003E\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003Cspan class=\"message__time\"\u003E" + (pug_escape(null == (pug_interp = time) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"fileUrl" in locals_for_with?locals_for_with.fileUrl:typeof fileUrl!=="undefined"?fileUrl:undefined,"isOwnMessage" in locals_for_with?locals_for_with.isOwnMessage:typeof isOwnMessage!=="undefined"?isOwnMessage:undefined,"modifiers" in locals_for_with?locals_for_with.modifiers:typeof modifiers!=="undefined"?modifiers:undefined,"modifiersHelper" in locals_for_with?locals_for_with.modifiersHelper:typeof modifiersHelper!=="undefined"?modifiersHelper:undefined,"status" in locals_for_with?locals_for_with.status:typeof status!=="undefined"?status:undefined,"text" in locals_for_with?locals_for_with.text:typeof text!=="undefined"?text:undefined,"time" in locals_for_with?locals_for_with.time:typeof time!=="undefined"?time:undefined));;return pug_html;} module.exports = messageTemplateTemplate;