import { $ } from './util/DOMutil.js';
import { ajax } from './util/util.js';
import {StickHeader,Upfloat,LazyLoad} from './effect/effect.js';
class GoodList {
    constructor() {
        this.$wrap = $('#wrap');
        this.$bli = $('.bli');
        this.$picMode = $('.opic').clone();
        this.maxWidth = parseFloat($('#outer-wrap').css('min-width'))
        this.canLoad = true;//开始加载图片改为false;在ajax回调中改回true
    }
    init() {
        this.render();
        new StickHeader($('.header-outer'),this.maxWidth).init();
        new LazyLoad(this.picLoad.bind(this)).init();
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
        this.canLoad = 
        ajax({
            url: "http://localhost/mogu/php/good_show.php",
            dataType: "json"
        }).then((data) => {
            _this.picrender(data);
            new Upfloat($('.opic')).init();//给所有商品框添加hover上浮
        })
    }
    //瀑布流渲染商品
    picrender(data) {
        $('.li').get(0).innerHTML = '';
        for (let v of data) {
            $('.li')
            .eq(this.minHeight())
            .html(this.$picMode.clone({
                'data-wrap-a': { style: `height:${v.mpicheight}rem`,href:`./details.html?gid=${v.gid}`,target:"_blank"},
                'data-main-img': { src: v.picurls.split(';')[0] },
                'data-name-p': { text: v.name },
                'data-price-p': { text: '￥' + v.price }
            }, 'text'),true)
        }
    }
    //每次获取新的列；返回出高度最短列的索引
    minHeight() {
        let minindex = 0;
        let minvalue = $('.li').eq(0).height();
        $('.li').each((val, index) => {
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
export default GoodList;
