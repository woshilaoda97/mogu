import { ajax } from './util/util.js';
import { $ } from './util/DOMutil.js';
import { StickHeader } from './effect/effect.js';
class Detail {
    constructor() {
        this.gid = window.location.search.substring(5);
        this.$main = $('#body_wrap');
        this.pics = null
        this.$header = $('#header-search');
    }
    init() {
        this.render();
        new StickHeader(this.$header).init();
    }
    render() {
        ajax({
            url: 'http://localhost/test/mogu/php/good_detail.php',
            data: { gid: this.gid },
            dataType: 'json',
        }).then(([data]) => {
            $('title').html(data.name)
            this.pics = data.picurls.split(';');
            //小图列表
            let spics = ''
            this.pics.forEach(v => {
                spics += `<li><img src=${v}><i></i></li>`
            })
            //渲染
            let clone = this.$main.children().clone({
                'data-name-span': { text: data.name },
                'data-price-span': { text: '￥' + data.price },
                'data-bpic-img': { src: this.pics[0] },
                'data-spics-ul': { text: spics }
            }, 'text');
            this.$main.html(clone);
            this.spicEffect(data)
        })
    }
    //小图效果
    spicEffect(data) {
        let $spics = $('#spics').children();
        $spics.on('mouseover', function () {
            //给当前元素加class/并且使下划线出现
            this.addClass('c').lastChild().show();
            //移除其他元素class/并且使其他下划线消失
            this.siblings()
            .removeClass('c').each(v=>{
                v.lastChild().hide();
            });
            //改变大图
            $('.big-img').children()
            .attr('src',this.firstChild().attr('src'));
        })
    }
}
export default Detail
