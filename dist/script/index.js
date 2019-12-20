"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function a(t,i){for(var e=0;e<i.length;e++){var a=i[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,i,e){return i&&a(t.prototype,i),e&&a(t,e),t}}(),_DOMutil=require("./util/DOMutil.js"),_util=require("./util/util.js"),_effect=require("./effect/effect.js");function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var GoodList=function(){function t(){_classCallCheck(this,t),this.$wrap=(0,_DOMutil.$)("#wrap"),this.$bli=(0,_DOMutil.$)(".bli"),this.$picMode=(0,_DOMutil.$)(".opic").clone(),this.maxWidth=parseFloat((0,_DOMutil.$)("#outer-wrap").css("min-width")),this.canLoad=!0}return _createClass(t,[{key:"init",value:function(){this.render(),new _effect.StickHeader((0,_DOMutil.$)(".header-outer"),this.maxWidth).init(),new _effect.LazyLoad(this.picLoad.bind(this)).init()}},{key:"render",value:function(){var t=document.body.clientWidth;1686<=t?this.setLayout("lgLayout",1686):t<1686&&1198<=t?this.setLayout("mdLayout",1200):t<1200&&this.setLayout("smLayout",954),this.picLoad()}},{key:"picLoad",value:function(){var i=this;this.canLoad=(0,_util.ajax)({url:"http://localhost/mogu/php/good_show.php",dataType:"json"}).then(function(t){i.picrender(t),new _effect.Upfloat((0,_DOMutil.$)(".opic")).init()})}},{key:"picrender",value:function(t){var i=!((0,_DOMutil.$)(".li").get(0).innerHTML=""),e=!1,a=void 0;try{for(var n,l=t[Symbol.iterator]();!(i=(n=l.next()).done);i=!0){var s=n.value;(0,_DOMutil.$)(".li").eq(this.minHeight()).html(this.$picMode.clone({"data-wrap-a":{style:"height:"+s.mpicheight+"rem",href:"./details.html?gid="+s.gid,target:"_blank"},"data-main-img":{src:s.picurls.split(";")[0]},"data-name-p":{text:s.name},"data-price-p":{text:"￥"+s.price}},"text"),!0)}}catch(t){e=!0,a=t}finally{try{!i&&l.return&&l.return()}finally{if(e)throw a}}}},{key:"minHeight",value:function(){var e=0,a=(0,_DOMutil.$)(".li").eq(0).height();return(0,_DOMutil.$)(".li").each(function(t,i){a>t.height()&&(e=i,a=t.height())}),e}},{key:"setLayout",value:function(t,i){var e=0;e="mdLayout"===t||"smLayout"===t?244:488,this.$bli.css({left:e/100+"rem"});var a="smLayout"===t?'\n            \n            <div class="li" style="padding-top:12.02rem"></div>\n            <div class="li" style="padding-top:12.02rem"></div>\n            \n            <div class="li" style=" padding-top:12.02rem;margin:0"></div>\n        ':"mdLayout"===t?'\n            \n            <div class="li" style="padding-top:12.02rem"></div>\n            <div class="li" style="padding-top:12.02rem"></div>\n            \n            <div class="li" style="padding-top:12.02rem"></div>\n            <div class="li" style="margin-right:0"></div>\n        ':'\n            <div class="li"></div>\n            \n            <div class="li" style="padding-top:12.02rem"></div>\n            <div class="li" style="padding-top:12.02rem"></div>\n            \n            <div class="li" style="padding-top:12.02rem"></div>\n            <div class="li"></div>\n            <div class="li" style="margin-right:0"></div>\n        ',n="smLayout"===t?2.8:"mdLayout"===t?5.52:9,l={width:i/100+"rem"};this.$wrap.html(a,!0),this.$wrap.css(l),(0,_DOMutil.$)(".header-nav-wrap").css(l),(0,_DOMutil.$)(".header-wrap").css(l),(0,_DOMutil.$)(".normal-search-content").css({width:n+"rem"}),(0,_DOMutil.$)("#outer-wrap").css({"min-width":(i+30)/100+"rem"})}}]),t}();exports.default=GoodList;