//cookie工具增删改查
export const toolcookie = {
    setcookie: function (key, value, days) {
        let date = new Date();
        date.setDate(date.getDate() + days);
        document.cookie = `${key}=${value};expires=${date}`;
    },
    getcookie: function (key) {
        let data = document.cookie;
        let res = data.match(new RegExp(`${key}\=[^;]+`));
        if (res) {
            return res[0].substring(res[0].indexOf('=') + 1);
        } else {
            throw new Error('cookie不存在键"' + key + '"');
        }
    },
    delcookie: function (key) {
        this.setcookie(key, '', -1);
    }
}
//DOM工具
export const toolElement = {/*clone:
    element为要克隆的元素;
    data为要修改的属性如:
        'ct-a-img':{href:"12314142312.jpg"},
        'ct-img':{src:"https://gsfb031beeb6.jpg"},
        'ct-price':{text:"12"},
        'ct-salenum':{},
    (ct-a-img为要修改属性的自定义标签,!自定义属性不可以和元素内任何内容重名,用来寻找元素)
    (值为要修改元素的所有属性);
    dataType为返回数据类型，text或者元素;*/
    clone: function (element, data, dataType) {
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
}
//取元素
export function $(selector,isAll) {
    if(!isAll){
        return document.querySelector(selector);
    }else{
        return document.querySelectorAll(selector);
    }
}
//缓冲运动
export function bufferMove(obj, json, fn) {
    var speed = 0;
    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }
    clearInterval(obj.timer); //防止事件下面定时器叠加
    obj.timer = setInterval(function () {
        var flag = true; //假设运动已经结束

        //开始属性遍历运动
        for (var attr in json) { //attr:css属性名称  json[attr]:目标点 前面的target
            //1.求当前的css属性值
            var currentValue = null;
            if (attr === 'opacity') { //透明度
                currentValue = getStyle(obj, attr) * 100; //扩展100倍，透明度的目标100
            } else { //px单位的属性
                json[attr] = parseInt(json[attr]);//如果不是透明度则将目标值取整
                currentValue = parseInt(getStyle(obj, attr));
            }
            //2.求速度
            speed = (json[attr] - currentValue) / 5; //10：运动因子
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3.判断运动开启和停止
            if (currentValue !== json[attr]) { //没到目标继续运动
                if (attr === 'opacity') { //透明度
                    obj.style.opacity = (currentValue + speed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (currentValue + speed) + ');'; //IE
                }
                obj.style[attr] = currentValue + speed + 'px'; //属性一定要用中括号。
                flag = false; //运动没有结束
            }
        }

        if (flag) { //判断所有的属性都已经到了目标点了，如果没到继续运动falg=false,不满足此条件
            clearInterval(obj.timer);
            fn && typeof fn === 'function' && fn(); //运动完成，执行回调函数。
        }
    }, 10);
}