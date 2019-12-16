import {stypeof} from "./util.js"
//ele构造函数
const Ele = function(dom){
    this.ele = dom;
}
//取元素//转化为Ele元素对象//[object HTMLDivElement]
export const $ = function (selector, isAll) {
    let dom = null
    //如果是字符串
    if(stypeof(selector)==='string'){
        if (!isAll) {
            dom = document.querySelector(selector);
        } else {
            dom = document.querySelectorAll(selector);
        }
        return new Ele(dom);
    }else if(Object.prototype.toString.call(selector)==='[object HTMLDivElement]'){
    //如果是元素对象则转化
        return new Ele(selector);
    }else{
        throw new Error("类型错误");
    }
}
//设置/获取css
Ele.prototype.css = function(text){
    if(stypeof(text)==='string'){
        this.ele.style.cssText = text;
        return this;
    }else if(!text){
        return getComputedStyle?getComputedStyle(this.ele):this.ele.currentStyle;
    }else{
        throw new Error("类型错误");
    }
}
//设置/获取innerHTML(第二个参数为是否添加)
Ele.prototype.html = function(text,isAdd){
    if(stypeof(text)==='string'){
        if(!isAdd){
            this.ele.innerHTML = text;
        }else{
            this.ele.innerHTML += text;
        }
        return this;
    }else if(!text){
        return this.ele.innerHTML;
    }else{
        throw new Error("类型错误");
    }
}
//转化为原始元素对象/返回第num个对象
Ele.prototype.get = function(num){
    if(this.ele.length>1){
        if(num<this.ele.length){
            return this.ele[num]
        }else{
            return this.ele[this.ele.length]
        }
    }else{
        return this.ele;
    }
}
//DOM克隆
Ele.prototype.clone = function (data, dataType) {/*clone:
    data为要修改的属性如:
        'ct-a-img':{href:"12314142312.jpg"},
        'ct-img':{src:"https://gsfb031beeb6.jpg"},
        'ct-price':{text:"12"},
        'ct-salenum':{},
    (ct-a-img为要修改属性的自定义标签,!自定义属性不可以和元素内任何内容重名,用来寻找元素)
    (值为要修改元素的所有属性);
    dataType为返回数据类型，text或者元素;*/
    let cloneElement = this.ele.cloneNode(true);
    let outerhtml = cloneElement.outerHTML;
    outerhtml = outerhtml.replace('none', 'block');
    for (let e in data) {//遍历要修改的标签
        let tempReg = new RegExp(`<[^>]*${e}[^<]*>`);//寻找要修改的标签
        for (let attr in data[e]) {
            outerhtml = outerhtml.replace(tempReg, re => {
                if (attr !== 'text') {//如果标签需改的属性不为text
                    let regAttr = new RegExp(`(${attr})=('|").*?('|")`);
                    return regAttr.test(re) ?//要修改的标签属性存在则替换
                        re.replace(regAttr, (ra, va) => {
                            return va + `="${data[e][attr]}"`
                        }) :
                        `${re.slice(0, -1)} ${attr}="${data[e][attr]}">`//不存在则添加
                } else {
                    return re + data[e][attr];//如果为text则添加在标签内部
                }
            })
        }
    }
    if (!dataType || dataType !== "text") {
        let tDiv = document.createElement('div')
        tDiv.innerHTML = outerhtml;
        return tDiv.children[0];
    } else {
        return outerhtml;
    }
}