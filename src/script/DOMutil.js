import {stypeof} from "./util.js.js"
//ele构造函数
const Ele = function(dom){
    this.ele = dom;
}
//设置css
Ele.prototype.css = function(text){
    this.ele.style.cssText = text;
    return this;
}
//设置innerHTML(第二个参数为是否添加)
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
//转化为原始元素对象
Ele.prototype.get = function(){
    return this.ele;
}
//取元素
const $ = function (selector, isAll) {
    let dom = null
    if (!isAll) {
        dom = document.querySelector(selector);
    } else {
        dom = document.querySelectorAll(selector);
    }
    return new Ele(dom);
}
//DOM工具
const clone = function (element, data, dataType) {/*clone:
    element为要克隆的元素;
    data为要修改的属性如:
        'ct-a-img':{href:"12314142312.jpg"},
        'ct-img':{src:"https://gsfb031beeb6.jpg"},
        'ct-price':{text:"12"},
        'ct-salenum':{},
    (ct-a-img为要修改属性的自定义标签,!自定义属性不可以和元素内任何内容重名,用来寻找元素)
    (值为要修改元素的所有属性);
    dataType为返回数据类型，text或者元素;*/
    let cloneElement = element.cloneNode(true);
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

export {
    $,clone
}