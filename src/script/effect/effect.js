import { $ } from '../util/DOMutil.js';
import { bufferMove } from '../util/util.js';
//粘性导航栏($header为Ele对象)
class StickHeader {
    constructor($header, maxWidth) {
        this.$header = $header;
        this.clone = $header.clone();
        this.height = this.$header.height() + this.$header.top();
        this.maxWidth = maxWidth || 1000;
        this.parent = $header.parent();
    }
    init() {
        let _this = this;
        window.addEventListener('scroll', function () {
            _this.posFixed();
        }, true)
    }
    posFixed() {
        let _this = this;
        if (window.scrollY > this.height) {//当滚动条大于header的bottom距离文档顶部的高度时;添加固定定位;向下缓存运动
            this.$header.addClass('tofixed')//更改样式
                        .css({
                            'width': `100%`,
                            'min-width': `${this.maxWidth / 100}rem`
                        })
            bufferMove(this.$header.get(), {
                top: 0
            })
            _this.parent.append(this.clone);//创建克隆填补位置
        } if (window.scrollY <= this.height) {//当滚动条小于header的bottom距离文档顶部的高度时;向上运动(在回调函数中去除固定定位);

            bufferMove(this.$header.get(), {
                top: -this.$header.height()
            }, function () {
                try {//删除克隆
                    _this.parent.get().removeChild(_this.clone.get());
                } catch (e) {
                    // console.log(e);
                } finally {
                    _this.$header
                        .clearStyle()
                        .css({//改回样式
                            'width': '100%',
                        })
                        .removeClass('tofixed');
                }
            })
        }
    }
}
//tab切换
class TabSwitch {
    constructor($btns, $contents) {
        this.$btns = $btns;
        this.$contents = $contents;
    }
    init() {
        let _this = this;
        this.$btns.on('click',function(){
            _this.changTab(this);
        })
    }
    changTab(tab){
        tab.addClass('tab_on').siblings().removeClass('tab_on');
        this.$contents.eq(tab.index()).show().siblings().hide();
    }
}
//hover元素上浮
class Upfloat {
    constructor($obj) {
        this.$obj = $obj;
    }
    init() {
        this.$obj.css({ position: 'relative' })
                 .hover(function () {
                     bufferMove(this.get(), { bottom: 6 }, null, [15, 15])
                 }, function () {
                     bufferMove(this.get(), { bottom: 0 }, null, [15, 15])
                 })
    }
}
//懒加载
class LazyLoad {
    constructor(callback) {
        this.callback = callback;
    }
    init() {
        let _this = this;
        window.addEventListener('scroll', function () {
            if (window.scrollY + document.documentElement.clientHeight > document.body.clientHeight - 500) {
                _this.callback();
                console.log('ok');
            }
        },true)
    }
}
//提示框

export { StickHeader, TabSwitch, Upfloat, LazyLoad };