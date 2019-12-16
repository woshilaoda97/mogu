export function ajax(obj){
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