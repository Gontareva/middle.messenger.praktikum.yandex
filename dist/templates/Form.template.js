function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;function formTemplateTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (body, className, footer) {pug_html = pug_html + "\u003Cform" + (pug_attr("class", pug_classes(["form",className], [false,true]), false, false)) + "\u003E\u003Cdiv class=\"form__body\"\u003E";
if (body && body.length) {
// iterate body
;(function(){
  var $$obj = body;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + (null == (pug_interp = item) ? "" : pug_interp);
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + (null == (pug_interp = item) ? "" : pug_interp);
    }
  }
}).call(this);

}
else {
pug_html = pug_html + (null == (pug_interp = body) ? "" : pug_interp);
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
if (footer) {
pug_html = pug_html + "\u003Cdiv class=\"form__footer\"\u003E" + (null == (pug_interp = footer) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fform\u003E";}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"className" in locals_for_with?locals_for_with.className:typeof className!=="undefined"?className:undefined,"footer" in locals_for_with?locals_for_with.footer:typeof footer!=="undefined"?footer:undefined));;return pug_html;} module.exports = formTemplateTemplate;