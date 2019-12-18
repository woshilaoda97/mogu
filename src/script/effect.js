import { $ } from './DOMutil.js';
import { bufferMove } from './util.js';
class StackHeader {
    constructor($header) {
        this.$header = $header;
        this.clone = $header.clone();
        this.height = this.$header.height() + this.$header.top();
        this.maxWidth = parseFloat($('#outer-wrap').css('min-width'));
    }
    init() {
        let _this = this;
        console.log(this.maxWidth, this.bWidth);
        window.onscroll = function () {
            _this.posFixed();
        }
    }
    posFixed() {
        let _this = this;
        if (window.scrollY > this.height) {//当滚动条大于header的bottom距离文档顶部的高度时;添加固定定位;向下缓存运动
            this.$header.addClass('tofixed');//更改样式
            this.$header.css({
                'width': `100%`,
                'min-width': `${this.maxWidth / 100}rem`
            })
            bufferMove(this.$header.get(), {
                top: 0
            })
            $('header').append(this.clone);//创建克隆填补位置
        } if (window.scrollY <= this.height) {//当滚动条小于header的bottom距离文档顶部的高度时;向上运动(在回调函数中去除固定定位);

            bufferMove(this.$header.get(), {
                top: -this.$header.height()
            }, function () {
                try {//删除克隆
                    $('header').get().removeChild(_this.clone.get());
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
export default StackHeader;