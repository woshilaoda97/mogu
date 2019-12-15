import { $ } from './util.js';
import { ajax } from './ajaxpromise.js';
class GoodList {
    constructor() {
        this.outerWrap = $('#outer-wrap');
        this.wrap = $('#wrap');
    }
    init() {
        this.render()
    }
    render() {
        window.onload = () => {//
            let cw = document.body.clientWidth;
            if (cw >= 1686) {
                this.setLayout('lgLayout',1686);
            }else if(cw < 1686&&cw>=1198){
                this.setLayout('mdLayout',1200);
            }else if(cw < 1200){
                this.setLayout('smLayout',954);
            }
        }
    }
    setLayout(size,minWid) {
        let left = 0
        if (size === 'mdLayout' || size === 'smLayout') {
            left = 244;
        } else {
            left = 488;
        }
        let modelLayout = `
            <div class="li" style="margin-top:12.02rem"></div>
            <div class="li" style="margin-top:12.02rem"></div>
            <div class="bli" style="left:${left/100}rem"></div>
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
        let str = size === 'smLayout' ? smLayout : (size === 'smLayout' ? smLayout : (size === 'mdLayout' ? mdLayout : (size === 'lgLayout' ? lgLayout : null)));
        let w = `width:${minWid/100}rem`
        this.wrap.innerHTML += str;
        this.wrap.style.cssText = w;
        $('.header-nav-wrap').style.cssText = w;
        $('.header-wrap').style.cssText = w;
        this.outerWrap.style.cssText = `min-width:${(minWid+30)/100}rem`;
    }
    testData(){
        
    }
}
new GoodList().init();