import { $ } from './DOMutil.js';
import { ajax } from './util.js';
import StackHeader from './effect.js';
class GoodList {
    constructor() {
        this.$wrap = $('#wrap');
        this.$bli = $('.bli');
        this.$picMode = $('.opic').clone();
    }
    init() {
        this.render();
    }
    //渲染
    render() {
        let cw = document.body.clientWidth;
        if (cw >= 1686) {
            this.setLayout('lgLayout', 1686);
        } else if (cw < 1686 && cw >= 1198) {
            this.setLayout('mdLayout', 1200);
        } else if (cw < 1200) {
            this.setLayout('smLayout', 954);
        }
        this.picLoad();
    }
    picLoad() {
        let _this = this;
        ajax({
            url: "http://localhost/mogu/php/good_show.php",
            dataType: "json"
        }).then((data) => {
            _this.picrender(data);
        })
    }
    //瀑布流渲染商品
    picrender(data) {
        $('.li').get().innerHTML = '';
        for (let v of data) {
            $('.li', true)
                .get(this.minHeight())
                .html(this.$picMode.clone({
                    'data-wrap-a': { style: `height:${v.mpicheight}rem`,sid:v.gid},
                    'data-main-img': { src: v.picurls.split(';')[0] },
                    'data-name-p': { text: v.name },
                    'data-price-p': { text: '￥' + v.price }
                }, 'text'), true)
        }
    }
    //每次获取新的列；返回出高度最短列的索引
    minHeight() {
        let minindex = 0;
        let minvalue = $('.li', true).get(0).height();
        $('.li', true).each((val, index) => {
            // console.log(val.height(), index);
            if (minvalue > val.height()) {
                minindex = index;
                minvalue = val.height();
            }
        })
        return minindex;
    }
    //按照不同屏幕宽度设置列数
    setLayout(size, minWid) {
        let left = 0
        if (size === 'mdLayout' || size === 'smLayout') {
            left = 244;
        } else {
            left = 488;
        }
        //按照屏幕宽度设置中间块的left
        this.$bli.css({left:`${left / 100}rem`})
        //不同尺寸的layout
        let modelLayout = `
            <div class="li" style="padding-top:12.02rem"></div>
            <div class="li" style="padding-top:12.02rem"></div>
            `;
        let smLayout = `
            ${modelLayout}
            <div class="li" style=" padding-top:12.02rem;margin:0"></div>
        `;
        let mdLayout = `
            ${modelLayout}
            <div class="li" style="padding-top:12.02rem"></div>
            <div class="li" style="margin-right:0"></div>
        `;
        let lgLayout = `
            <div class="li"></div>
            ${modelLayout}
            <div class="li" style="padding-top:12.02rem"></div>
            <div class="li"></div>
            <div class="li" style="margin-right:0"></div>
        `;
        //按尺寸渲染样式
        let str = size === 'smLayout' ? smLayout : (size === 'mdLayout' ? mdLayout : lgLayout);
        let searchWidth = size === 'smLayout' ? 2.8 : (size === 'mdLayout' ? 5.52 : 9)
        let w = {width:`${minWid / 100}rem`}
        this.$wrap.html(str, true);
        this.$wrap.css(w);
        $('.header-nav-wrap').css(w);
        $('.header-wrap').css(w);
        $('.normal-search-content').css({width:`${searchWidth}rem`});
        $('#outer-wrap').css({'min-width':`${(minWid + 30) / 100}rem`});
    }
}
new GoodList().init();
new StackHeader($('.header-outer')).init();