import { stypeof } from "./util.js"
//ele构造函数
const Ele = function (dom) {
    this.ele = dom;
}
//取元素//转化为Ele元素对象//[object HTML...Element]
export const $ = function (selector, isAll) {
    let dom = null
    //如果是字符串
    if (stypeof(selector) === 'string') {
        if (!isAll) {
            dom = document.querySelector(selector);
            return new Ele(dom);
        } else {//如果为多元素/this.ele为数组每一项都为ele对象
            dom = document.querySelectorAll(selector);
            let arr = [...dom].map((v) => {
                return new Ele(v);
            })
            return new Ele(arr);
        }
    } else if (/\[object HTML/.test(Object.prototype.toString.call(selector))) {
        //如果是元素对象则转化
        return new Ele(selector);
    } else {
        throw new Error("类型错误");
    }
}
//清空内嵌css
Ele.prototype.clearStyle = function(){
    this.ele.style.cssText='';
    return this;
}  
//设置/获取css
Ele.prototype.css = function (text) {
    if (stypeof(text) === 'object') {//如果是对象则添加css
        let str = '';
        for(let v in text){
            str+=`${v}:${text[v]};`
        }
        this.ele.style.cssText += str;
        return this;
    } else if (stypeof(text) === 'string') {//如果是字符串则返回字符串属性的属性值
        if(getComputedStyle){
            return getComputedStyle(this.ele)[text];
        }else{
            return this.ele.currentStyle[text];
        }
    } else if (!text) {//如果为空返回所有css
        return getComputedStyle ? getComputedStyle(this.ele) : this.ele.currentStyle;
    } else {
        throw new Error("类型错误");
    }
}
//设置/获取innerHTML(第二个参数为是否添加)
Ele.prototype.html = function (text, isAdd) {
    if (stypeof(text) === 'string' || stypeof(text) === 'number') {
        if (!isAdd) {
            this.ele.innerHTML = text;
        } else {
            this.ele.innerHTML += text;
        }
        return this;
    } else if (!text) {
        return this.ele.innerHTML;
    } else {
        throw new Error("类型错误");
    }
}
//获取元素宽高
Ele.prototype.width = function () {
    if (stypeof(this.ele) !== 'array') {
        return this.ele.offsetWidth;
    } else {
        throw new Error("对象不能为元素数组");
    }
}
Ele.prototype.height = function () {
    if (stypeof(this.ele) !== 'array') {
        return this.ele.offsetHeight;
    } else {
        throw new Error("对象不能为元素数组");
    }
}
//获取元素top/left
Ele.prototype.left = function () {
    if (stypeof(this.ele) !== 'array') {
        return this.ele.offsetLeft;
    } else {
        throw new Error("对象不能为元素数组");
    }
}
Ele.prototype.top = function () {
    if (stypeof(this.ele) !== 'array') {
        return this.ele.offsetTop;
    } else {
        throw new Error("对象不能为元素数组");
    }
}
//添加/删除className//this.ele.getAttribute('class')
Ele.prototype.addClass = function (classname) {
    let attr = this.ele.getAttribute('class');
    if (attr) {
        //不存在则添加
        if (!new RegExp(`\\s${classname}$|\\s${classname}\\s`).test(attr)) {
            this.ele.setAttribute('class', attr + ' ' + classname);
        }
    } else {
        this.ele.setAttribute('class', classname);
    }
    return this;
}
Ele.prototype.removeClass = function (classname) {
    let attr = this.ele.getAttribute('class');
    if (classname) {//如果有参数则删除参数类
        this.ele.setAttribute('class', attr.replace(new RegExp(`\\s${classname}`), ''));
    } else {//否则清空
        this.ele.setAttribute('class', '');
    }
    return this;
}
//更改/添加/读取属性
Ele.prototype.attr = function (key,value){
    if(!value){
        this.ele.getAttribute(key);
    }else{
        this.ele.setAttribute(key,value);
        return this;
    }
}
//将ele对象转化为原始元素对象/返回第num个对象
Ele.prototype.get = function (num) {
    if (this.ele.length > 0) {
        if (num < this.ele.length) {
            return this.ele[num]
        } else {
            return this.ele[this.ele.length]
        }
    } else {
        return this.ele;
    }
}
//遍历
Ele.prototype.each = function (callback) {
    if (stypeof(this.ele) === 'array') {
        this.ele.forEach(callback);
        return this;
    } else {
        throw new Error("对象不为nodelist");
    }
}
//插入元素
Ele.prototype.append = function($obj){
    this.ele.appendChild($obj.get());
    return this;
}
// Ele.prototype.eq = function (num) {
//     if (this.ele.length > 1) {
//         return
//     }
// }
//DOM克隆
Ele.prototype.clone = function (data, dataType) {/*clone:
    data为要修改的属性如:
        'data-a-img':{href:"12314142312.jpg"},
        'data-img':{src:"https://gsfb031beeb6.jpg"},
        'data-price':{text:"12"},
        'data-salenum':{},
    (data-a-img为要修改属性的自定义标签,!自定义属性不可以和元素内任何内容重名,用来寻找元素)
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
        return $(tDiv.children[0]);
    } else {
        return outerhtml;
    }
}
//事件绑定
Ele.prototype.on = function (eventType, callback) {
    if (this.ele.addEventListener) {
        this.ele.addEventListener(eventType, callback, true);
    } else {
        this.ele.attachEvent('on' + eventType, callback);
    }
}