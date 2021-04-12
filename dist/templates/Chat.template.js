function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;function chatTemplateTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (avatar, days, form, modifiersHelper, userName) {pug_html = pug_html + "\u003Cdiv class=\"chat\"\u003E\u003Cdiv class=\"chat__header\"\u003E\u003Cdiv class=\"chat__avatar\"\u003E" + (null == (pug_interp = avatar) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__user-name\"\u003E" + (pug_escape(null == (pug_interp = userName) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__body\"\u003E\u003Cdiv class=\"chat__body-inner\"\u003E";
// iterate days
;(function(){
  var $$obj = days;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var day = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv class=\"chat__date\"\u003E" + (pug_escape(null == (pug_interp = day.date) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
// iterate day.messages
;(function(){
  var $$obj = day.messages;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var message = $$obj[pug_index1];
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["chat__message",modifiersHelper('chat__message', message.modifiers)], [false,true]), false, false)) + "\u003E" + (null == (pug_interp = message.node) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var message = $$obj[pug_index1];
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["chat__message",modifiersHelper('chat__message', message.modifiers)], [false,true]), false, false)) + "\u003E" + (null == (pug_interp = message.node) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var day = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv class=\"chat__date\"\u003E" + (pug_escape(null == (pug_interp = day.date) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
// iterate day.messages
;(function(){
  var $$obj = day.messages;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var message = $$obj[pug_index2];
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["chat__message",modifiersHelper('chat__message', message.modifiers)], [false,true]), false, false)) + "\u003E" + (null == (pug_interp = message.node) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var message = $$obj[pug_index2];
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["chat__message",modifiersHelper('chat__message', message.modifiers)], [false,true]), false, false)) + "\u003E" + (null == (pug_interp = message.node) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__footer\"\u003E" + (null == (pug_interp = form) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"avatar" in locals_for_with?locals_for_with.avatar:typeof avatar!=="undefined"?avatar:undefined,"days" in locals_for_with?locals_for_with.days:typeof days!=="undefined"?days:undefined,"form" in locals_for_with?locals_for_with.form:typeof form!=="undefined"?form:undefined,"modifiersHelper" in locals_for_with?locals_for_with.modifiersHelper:typeof modifiersHelper!=="undefined"?modifiersHelper:undefined,"userName" in locals_for_with?locals_for_with.userName:typeof userName!=="undefined"?userName:undefined));;return pug_html;} module.exports = chatTemplateTemplate;