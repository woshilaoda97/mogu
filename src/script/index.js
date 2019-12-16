import { $ } from './DOMutil.js';
import { ajax } from './ajaxpromise.js';
class GoodList {
    constructor() {
        this.wrap = $('#wrap');
        this.bli =  $('.bli');
    }
    init() {
        this.render();
    }
    render() {
        window.onload = () => {//按照不同屏幕宽度设置列数
            let cw = document.body.clientWidth;
            if (cw >= 1686) {
                this.setLayout('lgLayout',1686);
            }else if(cw < 1686&&cw>=1198){
                this.setLayout('mdLayout',1200);
            }else if(cw < 1200){
                this.setLayout('smLayout',954);
            }
        }
        this.picLoad();
    }
    picLoad(){
        ajax({
            url:"http://localhost/mogu/php/good_show.php",
            dataType:"json"
        }).then((data)=>{
            console.log(data);
        })
    }
    setLayout(size,minWid) {
        let left = 0
        if (size === 'mdLayout' || size === 'smLayout') {
            
            left = 244;
        } else {
            left = 488;
        }
        //按照屏幕宽度设置中间块的left
        this.bli.css(`left:${left/100}rem`)
        let modelLayout = `
            <div class="li" style="margin-top:12.02rem"></div>
            <div class="li" style="margin-top:12.02rem"></div>
            `;
        let smLayout = `
            ${modelLayout}
            <div class="li" style="margin:12.02rem 0 0"></div>
        `;
        let mdLayout = `
            ${modelLayout}
            <div class="li" style="margin-top:12.02rem"></div>
            <div class="li" style="margin-right:0"></div>
        `;
        let lgLayout = `
            <div class="li"></div>
            ${modelLayout}
            <div class="li" style="margin-top:12.02rem"></div>
            <div class="li"></div>
            <div class="li" style="margin-right:0"></div>
        `;
        let str = size === 'smLayout' ? smLayout : (size === 'mdLayout' ? mdLayout : lgLayout);
        let searchWidth = size === 'smLayout' ? 2.8 : (size === 'mdLayout'?5.52:9)
        let w = `width:${minWid/100}rem`
        this.wrap.html(str,true);
        this.wrap.css(w);
        $('.header-nav-wrap').css(w);
        $('.header-wrap').css(w);
        $('.normal-search-content').css(`width:${searchWidth}rem`);
        $('#outer-wrap').css(`min-width:${(minWid+30)/100}rem`);
    }
    testData(){
        
    }
}
new GoodList().init();