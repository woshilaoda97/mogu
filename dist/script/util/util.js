"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var stypeof=function(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()},toolcookie={setcookie:function(e,t,a){var o=new Date;o.setDate(o.getDate()+a),document.cookie=e+"="+t+";expires="+o},getcookie:function(e){var t=document.cookie.match(new RegExp(e+"=[^;]+"));if(t)return t[0].substring(t[0].indexOf("=")+1);throw new Error('cookie不存在键"'+e+'"')},delcookie:function(e){this.setcookie(e,"",-1)}},bufferMove=function(o,r,n,e){var c=0;e=e||{factor:15,frame:100},Array.isArray(e)&&(e={factor:e[0],frame:e[1]});var s=e.factor,t=e.frame;function i(e,t){return window.getComputedStyle?window.getComputedStyle(e)[t]:e.currentStyle[t]}clearInterval(o.timer),o.timer=setInterval(function(){var e=!0;for(var t in r){var a=null;a="opacity"===t?100*i(o,t):(r[t]=parseInt(r[t]),parseInt(i(o,t))),c=0<(c=(r[t]-a)/s)?Math.ceil(c):Math.floor(c),a!==r[t]&&("opacity"===t&&(o.style.opacity=(a+c)/100,o.style.filter="alpha(opacity="+(a+c)+");"),o.style[t]=a+c+"px",e=!1)}e&&(clearInterval(o.timer),n&&"function"==typeof n&&n())},1e3/t)},ajax=function(r){function n(e,t,a){if(200===e.status){var o=null;if(r.dataType=r.dataType&&r.dataType.toUpperCase(),void 0!==r.dataType&&"JSON"!==r.dataType&&a("你输入的数据类型有误"),r.dataType&&"JSON"===r.dataType.toUpperCase())try{o=JSON.parse(e.responseText)}catch(e){a("后端返回的数据不为json类型")}else o=e.responseText;t(o)}else a("err"+e.status)}return new Promise(function(e,t){var a=new XMLHttpRequest,o=r.type||"GET";"POST"!==(o=o.toUpperCase())&&"GET"!==o&&t("请求类型有误"),"Object"===Object.prototype.toString.call(r.data).slice(8,-1)&&(r.data=function(e){var t=[];if("Object"!==Object.prototype.toString.call(e).slice(8,-1))return e;for(var a in e)t.push(a+"="+e[a]);return t.join("&")}(r.data)),r.url||t("url不能为空"),"GET"===o&&r.data&&(r.url+="?"+r.data),!1===r.async||"false"===r.async?r.async=!1:r.async=!0,a.open(o,r.url,r.async),"GET"!==o&&r.data?(a.setRequestHeader("content-type","application/x-www-form-urlencoded"),a.send(r.data)):a.send(),r.async?a.onreadystatechange=function(){4===a.readyState&&n(a,e,t)}:n(a,e,t)})};exports.bufferMove=bufferMove,exports.toolcookie=toolcookie,exports.stypeof=stypeof,exports.ajax=ajax;