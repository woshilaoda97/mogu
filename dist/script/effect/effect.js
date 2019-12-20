"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LazyLoad=exports.Upfloat=exports.TabSwitch=exports.StickHeader=void 0;var _createClass=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),_DOMutil=require("../util/DOMutil.js"),_util=require("../util/util.js");function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var StickHeader=function(){function i(t,e){_classCallCheck(this,i),this.$header=t,this.clone=t.clone(),this.height=this.$header.height()+this.$header.top(),this.maxWidth=e||1e3,this.parent=t.parent()}return _createClass(i,[{key:"init",value:function(){var t=this;window.addEventListener("scroll",function(){t.posFixed()},!0)}},{key:"posFixed",value:function(){var t=this;window.scrollY>this.height&&(this.$header.addClass("tofixed").css({width:"100%","min-width":this.maxWidth/100+"rem"}),(0,_util.bufferMove)(this.$header.get(),{top:0}),t.parent.append(this.clone)),window.scrollY<=this.height&&(0,_util.bufferMove)(this.$header.get(),{top:-this.$header.height()},function(){try{t.parent.get().removeChild(t.clone.get())}catch(t){}finally{t.$header.clearStyle().css({width:"100%"}).removeClass("tofixed")}})}}]),i}(),TabSwitch=function(){function i(t,e){_classCallCheck(this,i),this.$btns=t,this.$contents=e}return _createClass(i,[{key:"init",value:function(){var t=this;this.$btns.on("click",function(){t.changTab(this)})}},{key:"changTab",value:function(t){t.addClass("tab_on").siblings().removeClass("tab_on"),this.$contents.eq(t.index()).show().siblings().hide()}}]),i}(),Upfloat=function(){function e(t){_classCallCheck(this,e),this.$obj=t}return _createClass(e,[{key:"init",value:function(){this.$obj.css({position:"relative"}).hover(function(){(0,_util.bufferMove)(this.get(),{bottom:6},null,[15,15])},function(){(0,_util.bufferMove)(this.get(),{bottom:0},null,[15,15])})}}]),e}(),LazyLoad=function(){function e(t){_classCallCheck(this,e),this.callback=t}return _createClass(e,[{key:"init",value:function(){var t=this;window.addEventListener("scroll",function(){window.scrollY+document.documentElement.clientHeight>document.body.clientHeight-500&&(t.callback(),console.log("ok"))},!0)}}]),e}();exports.StickHeader=StickHeader,exports.TabSwitch=TabSwitch,exports.Upfloat=Upfloat,exports.LazyLoad=LazyLoad;