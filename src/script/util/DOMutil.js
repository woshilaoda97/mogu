import { stypeof } from "./util.js"
//Ele类
export const Ele = function (selector) {
    return new Ele.fn.init(selector);
}
export const $ = Ele;
//构造函数init绑定在Ele类的原型下
Ele.fn = Ele.prototype = {
    //取元素//转化为Ele元素对象//
    init: function (selector) {
        if (stypeof(selector) === 'string') {
            this.ele = [...document.querySelectorAll(selector)];
            this.length = this.ele.length;
            this.selector = selector;
            return this;
        } else if (selector.nodeType) {//如果是元素节点则转化为Ele对象
            //如果是元素对象则转化
            this.ele = [selector];
            this.length = 1;
            return this;
        } else if (stypeof(selector) === 'array' || stypeof(selector) === 'nodelist') {
            this.ele = [...selector];
            this.length = this.ele.length;
            return this
        } else {
            throw new Error("类型错误");
        }
    }
}
//将构造函数的原型指向Ele类的原型(实例._proto-->Ele.prototype.init.prototype-->Ele.prototype)
Ele.fn.init.prototype = Ele.prototype;
/***********************************************************核心************************************************************/
//遍历
Ele.fn.each = function (callback) {
    if (stypeof(this.ele) === 'array') {
        this.ele.map(v => $(v)).forEach(callback);
        return this;
    } else {
        throw new Error("ele不为数组");
    }
}
//将ele对象转化为原始元素对象/返回第num个对象
Ele.fn.get = function (num) {
    if (num > 0) {
        if (num < this.ele.length) {
            return this.ele[num];
        } else {
            return this.ele[this.ele.length];
        }
    } else {
        return this.ele[0];
    }
}
//返回索引
Ele.fn.index = function (n) {
    n = n || 0;
    let p = this.ele[n].parentNode
    return [...p.children].indexOf(this.ele[0]);
}
/***********************************************************属性************************************************************/
//设置/获取innerHTML(第二个参数为是否添加)
Ele.fn.html = function (text, isAdd) {
    if (stypeof(text) === 'string' || stypeof(text) === 'number') {
        if (!isAdd) {
            this.ele[0].innerHTML = text;
        } else {
            this.ele[0].innerHTML += text;
        }
        return this;
    } else if (!text) {
        return this.ele[0].innerHTML;
    } else {
        throw new Error("类型错误");
    }
}
//添加className//this.ele.getAttribute('class')
Ele.fn.addClass = function (classname) {
    for (let v of this.ele) {//不存在则添加
        let attr = v.getAttribute('class');
        if (attr) {
            if (!new RegExp(`\\s${classname}$|\\s${classname}\\s|${classname}`).test(attr)) {
                v.setAttribute('class', attr + ' ' + classname);
            }
        } else {
            this.ele[0].setAttribute('class', classname);
        }
    }
    return this;
}
//删除className
Ele.fn.removeClass = function (classname) {
    if (classname) {//如果有参数则删除参数类
        for (let v of this.ele) {
            let attr = v.getAttribute('class');
            let reg = new RegExp(`\\s\*${classname}`)
            if (reg.test(attr)) {
                v.setAttribute('class', attr.replace(reg, ''));
            }
        }
    } else {//否则清空
        this.ele[0].setAttribute('class', '');
    }
    return this;
}
//更改/添加/读取属性
Ele.fn.attr = function (key, value) {
    if (!value) {
        return this.ele[0].getAttribute(key);
    } else {
        this.ele[0].setAttribute(key, value);
        return this;
    }
}
/***********************************************************css************************************************************/
//清空内嵌css
Ele.fn.clearStyle = function () {
    this.ele[0].style.cssText = '';
    return this;
}
//设置/获取css
Ele.fn.css = function (text) {
    if (stypeof(text) === 'object') {//如果是对象则添加css
        this.ele.forEach(v => {
            let str = '';
            for (let v in text) {
                str += `${v}:${text[v]};`
            }
            v.style.cssText += str;
        })
        return this;
    } else if (stypeof(text) === 'string') {//如果是字符串则返回字符串属性的属性值
        if (getComputedStyle) {
            return getComputedStyle(this.ele[0])[text];
        } else {
            return this.ele[0].currentStyle[text];
        }
    } else if (!text) {//如果为空返回所有css
        return getComputedStyle ? getComputedStyle(this.ele[0]) : this.ele[0].currentStyle;
    } else {
        throw new Error("类型错误");
    }
}
//获取元素宽高
Ele.fn.width = function (index) {
    index = index || 0;
    return this.ele[index].offsetWidth;
}
Ele.fn.height = function (index) {
    index = index || 0;
    return this.ele[index].offsetHeight;
}
//获取元素top/left
Ele.fn.left = function (index) {
    index = index || 0;
    return this.ele[index].offsetLeft;
}
Ele.fn.top = function (index) {
    index = index || 0;
    return this.ele[index].offsetTop;
}
/***********************************************************筛选************************************************************/
//获取父节点
Ele.fn.parent = function () {
    let arr = [];
    this.ele.forEach(v => {
        arr.push(v.parentNode)
    })
    return $(arr);
}
//获取子节点
Ele.fn.children = function () {
    let arr = [];
    this.ele.forEach(v => {
        arr.push(...v.children)
    })
    return $(arr);
}
//eq
Ele.fn.eq = function (num) {
    return $(this.ele[num]);
}
//获取其他兄弟节点
Ele.fn.siblings = function () {
    let prev = this.ele[0];
    let childs = this.ele[0].parentNode.children;
    let arr = [];
    for (let v of childs) {
        if (v !== prev) {
            arr.push(v);
        }
    }
    return $(arr);
}
//获取第一个
Ele.fn.first = function () {
    return $(this.ele[0]);
}
//获取最后一个
Ele.fn.last = function () {
    return $(this.ele[this.length - 1]);
}
//获取第一个子元素
Ele.fn.firstChild = function () {
    return this.children().first();
}
//获取最后一个子元素
Ele.fn.lastChild = function () {
    return this.children().last();
}
/*********************************************************文档处理************************************************************/
//插入元素
Ele.fn.append = function ($obj) {
    this.ele.forEach((v) => {
        v.appendChild($obj.get());
    })
    return this;
}
//删除元素
Ele.fn.remove = function () {
    console.log(this.parent().get(), this.ele[0]);
    this.ele.forEach((v) => {
        this.parent().get().removeChild(this.ele[0]);
    })
}
//DOM克隆
Ele.fn.clone = function (data, dataType) {/*clone:
    data为要修改的属性如:
        'data-a-img':{href:"12314142312.jpg"},
        'data-img':{src:"https://gsfb031beeb6.jpg"},
        'data-price':{text:"12"},
        'data-salenum':{},
    (data-a-img为要修改属性的自定义标签,!自定义属性不可以和元素内任何内容重名,用来寻找元素)
    (值为要修改元素的所有属性);
    dataType为返回数据类型，text或者元素;*/
    let cloneElement = this.ele[0].cloneNode(true);
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
/***********************************************************事件************************************************************/
//事件绑定
Ele.fn.on = function (eventType, callback) {
    if (this.ele[0].addEventListener) {
        for (let v of this.ele) {//将回调函数中的this指向绑定的Ele对象
            v.addEventListener(eventType, callback.bind($(v)), true);
        }
    } else {
        for (let v of this.ele) {
            v.attachEvent('on' + eventType, callback.bind($(v)));
        }
    }
    return this;
}
Ele.fn.hover = function (overfn, outfn) {
    if (this.ele[0].addEventListener) {
        for (let v of this.ele) {//将回调函数中的this指向绑定的Ele对象
            v.addEventListener('mouseover', overfn.bind($(v)), true);
            v.addEventListener('mouseout', outfn.bind($(v)), true);
        }
    } else {
        for (let v of this.ele) {
            v.attachEvent('onmouseover', overfn.bind($(v)));
            v.attachEvent('mouseout', outfn.bind($(v)));
        }
    }
}
/***********************************************************效果************************************************************/
//显示元素
Ele.fn.show = function () {
    this.ele.forEach(v => {
        $(v).css({ display: 'block' });
    })
    return this;
}
//隐藏元素
Ele.fn.hide = function () {
    this.ele.forEach(v => {
        $(v).css({ display: 'none' });
    })
    return this;
}
//animation动画效果
// Ele.fn.animate = function (data, time, fn) {
//     var speed = 0;
//     clearInterval(obj.timer); //防止事件下面定时器叠加
//     obj.timer = setInterval(function () {
//         var flag = true; //假设运动已经结束
//         //开始属性遍历运动
//         for (var attr in data) { //attr:css属性名称  data[attr]:目标点 前面的target
//             //1.求当前的css属性值
//             var currentValue = null;
//             if (attr === 'opacity') { //透明度
//                 // currentValue =  getStyle(obj, attr) * 100;
//                 currentValue = this.css(attr)
//             } else { //px单位的属性
//                 data[attr] = parseInt(data[attr]);//如果不是透明度则将目标值取整
//                 currentValue = parseInt(getStyle(obj, attr));
//             }
//             speed = (data[attr] - currentValue) / 15; //10：运动因子
//             speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
//             //3.判断运动开启和停止
//             if (currentValue !== data[attr]) { //没到目标继续运动
//                 if (attr === 'opacity') { //透明度
//                     obj.style.opacity = (currentValue + speed) / 100;
//                     obj.style.filter = 'alpha(opacity=' + (currentValue + speed) + ');'; //IE
//                 }
//                 obj.style[attr] = currentValue + speed + 'px'; //属性一定要用中括号。
//                 flag = false; //运动没有结束
//             }
//         }

//         if (flag) { //判断所有的属性都已经到了目标点了，如果没到继续运动falg=false,不满足此条件
//             clearInterval(obj.timer);
//             fn && typeof fn === 'function' && fn(); //运动完成，执行回调函数。
//         }
//     }, 10);
// }