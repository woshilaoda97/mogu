"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),_util=require("./util/util.js"),_DOMutil=require("./util/DOMutil.js"),_effect=require("./effect/effect.js"),_plugin=require("./plugin/plugin.js");function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Lr=function(){function t(){_classCallCheck(this,t),this.$btns=(0,_DOMutil.$)(".login_mod_tab").children(),this.$contents=(0,_DOMutil.$)("#signform").children(),this.$lginputs=(0,_DOMutil.$)("#lg_form input"),this.$rtinputs=(0,_DOMutil.$)("#rt_form input")}return _createClass(t,[{key:"init",value:function(){new _effect.TabSwitch(this.$btns,this.$contents).init()}},{key:"registry",value:function(){var t=this.$rtinputs.eq(0),e=(this.$rtinputs.eq(1),this.$rtinputs.eq(2),this.$rtinputs.eq(3),this.$rtinputs.eq(4),this.$rtinputs.eq(5));console.log(),e.on("click",function(){console.log(t.get().value)})}}]),t}();exports.default=Lr;