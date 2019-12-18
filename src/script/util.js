//判断元素对象
const stypeof = function(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}
//cookie工具增删改查
const toolcookie = {
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

//缓冲运动
 const bufferMove = function(obj, json, fn) {
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
            speed = (json[attr] - currentValue) / 15; //10：运动因子
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
//ajax
const ajax = function (obj){
    function objToString(o){
        let arr = [];
        if(Object.prototype.toString.call(o).slice(8,-1)==='Object'){
            for(let i in o){
                arr.push(`${i}=${o[i]}`);
            }
            return arr.join('&');
        }
        return o;
    }
    function isSuccess(xhr,resolve,rejected){
        if(xhr.status===200){
            let res = null;
            obj.dataType = obj.dataType&&obj.dataType.toUpperCase();
            if(obj.dataType!==undefined&&obj.dataType!=='JSON'){
                rejected('你输入的数据类型有误');
            }
            if(obj.dataType&&obj.dataType.toUpperCase()==='JSON'){
                try {//后端返回数据是否为json类型
                    res = JSON.parse(xhr.responseText);
                } catch (error) {
                    rejected('后端返回的数据不为json类型');
                }
            }else{
                res = xhr.responseText;
            }
            resolve(res);
        }else{
            rejected('err'+xhr.status);
        }
    }
    return new Promise((resolve,rejected)=>{
        let xhr = new XMLHttpRequest();
        //type
        let type = obj.type || 'GET';
        type = type.toUpperCase();
        if(type!=='POST' && type!=='GET'){
            rejected('请求类型有误');
        }
        //data
        if(Object.prototype.toString.call(obj.data).slice(8,-1)==='Object'){
            obj.data = objToString(obj.data);
        }
        //url
        if(!obj.url){
            rejected('url不能为空');
        }
        if(type==='GET'&&obj.data){
            obj.url+='?'+obj.data;
        }
        //async
        if(obj.async===false||obj.async==='false'){
            obj.async = false;
        }else{
            obj.async = true;
        }
        xhr.open(type,obj.url,obj.async);

        if(type==='GET'||!obj.data){
            xhr.send();
        }else{
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
            xhr.send(obj.data);
        }
        //是否异步
        if(obj.async){
            xhr.onreadystatechange = function(){
                if(xhr.readyState===4){
                    isSuccess(xhr,resolve,rejected);
                }
            }
        }else{
            isSuccess(xhr,resolve,rejected);
        }
    })
}
export {
    bufferMove,toolcookie,stypeof,ajax
}