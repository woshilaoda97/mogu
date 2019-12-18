import {ajax} from './util.js'
import {bufferMove} from './util.js';
!function(){
    class Detail{
        constructor(){
            this.wrap = document.querySelector('.wrap');
            this.spic = document.getElementById('spic');
            this.smallpic = document.getElementById('smallpic');
            this.sf = document.getElementById('sf');
            this.bpic = document.getElementById('bpic');
            this.bf = document.getElementById('bf');

            this.title = document.querySelector('.loadtitle');
            this.price = document.querySelector('.p-price strong em');
            
            this.picList = document.querySelector('#ulist ul');
            this.btnLeft = document.getElementById('left');
            this.btnRight = document.getElementById('right');
            this.current = 0;

            this.btnAddcar = document.querySelector('.p-btn a');
            this.num = document.getElementById('count').value;

            this.sid = window.location.search.substring(1);
        }
        init(){
            this.render();
            this.scale();
            this.magnifier();
            this.changPic();
            this.shopcarOpt();
        }
        render(){
            let _this = this;
            ajax({
                dataType:'json',
                url:'http://localhost/step2_week6/taobao/server/detail.php?'+this.sid
            }).then((data)=>{
                data = data[0];
                //小图列表的遍历
                let picArr = data.urls.split(',');
                let spListStr = ''
                for(let oSp of picArr){
                    spListStr+=`<li><img src="${oSp}" alt=""></li>`
                }
                this.smallpic.src = data.url;
                this.bpic.src = data.url;
                this.title.innerHTML = data.title;
                this.price.innerHTML = data.price;
                this.picList.innerHTML = spListStr;
                this.picListBtn();
        })
        }
        //放大镜事件
        magnifier(){
            let _this = this;
            this.spic.onmouseover = function(){
                _this.sf.style.visibility = 'visible';
                _this.bf.style.visibility = 'visible';
                this.onmousemove = function(ev){
                    var ev = ev || window.event;
                    let shortX = ev.clientX-_this.wrap.offsetLeft-_this.sf.offsetWidth/2;
                    let shortY = ev.clientY-_this.wrap.offsetTop-_this.sf.offsetHeight/2;
                    shortX = shortX<0?0:(shortX>_this.wrap.offsetWidth-_this.sf.offsetWidth?_this.wrap.offsetWidth-_this.sf.offsetWidth:shortX);
                    shortY = shortY<0?0:(shortY>_this.wrap.offsetHeight-_this.sf.offsetHeight?_this.wrap.offsetHeight-_this.sf.offsetHeight:shortY);
                    _this.sf.style.top = shortY+'px';
                    _this.sf.style.left = shortX+'px';
                    _this.bpic.style.left = -shortX*_this.proportion+'px';
                    _this.bpic.style.top = -shortY*_this.proportion+'px';
                }
            }
            this.spic.onmouseout = function(){
                _this.sf.style.visibility = 'hidden';
                _this.bf.style.visibility = 'hidden';
                this.onmousemove = null;
            }
        }
        //放大镜比例
        scale(){
            this.proportion = this.bpic.offsetHeight/this.spic.offsetHeight;
            this.bf.style.width = '500px';
            this.bf.style.height = '500px';
            this.sf.style.width = this.bf.offsetWidth/this.proportion+'px';
            this.sf.style.height = this.bf.offsetHeight/this.proportion+'px';
        }
        //小图列表左右按钮点击
        picListBtn(){
            let _this = this;
            this.len = document.querySelectorAll('li').length;
            let morePic = this.len-6;
            if(morePic<0){
                this.btnRight.style.opacity = 0;
                this.btnRight.onclick = null;
                this.btnLeft.onclick = null;
            }else{
                this.btnRight.onclick = function(){
                    _this.current++;
                    _this.btnOpacity(morePic);
                    bufferMove(_this.picList,{left:-_this.current*62});
                }
                this.btnLeft.onclick = function(){
                    _this.current--;
                    _this.btnOpacity(morePic);
                    bufferMove(_this.picList,{left:-_this.current*62});
                }

            }
        }
        //判断小图列表是否还有图片来更改按钮点击
        btnOpacity(morePic){
            if(this.current<=0){
                this.current = 0;
                this.btnLeft.style.color = 'white';
            }else if(this.current>=morePic){
                this.current = morePic;
                this.btnRight.style.color = 'white';
            }else{
                this.btnLeft.style.color='black';
                this.btnRight.style.color='black';
            }
        }
        //点击小图更换大图
        changPic(){
            let _this = this;
            this.picList.onclick = function(ev){
                var ev = ev || window.event;
                let element = ev.target || ev.srcElement;
                if(element.nodeName==='IMG'){
                    _this.smallpic.src = element.src;
                    _this.bpic.src = element.src;
                }
            }
        }
        //购物车
        shopcarOpt(){
            let _this = this;
            function addGood(){

            }
            this.btnAddcar.onclick = function(){
                if(Number(_this.num)!==NaN){
                    let data = {
                        sid : _this.sid,
                        num : _this.num
                    }
                    console.log(JSON.stringify(data))
                }else{
                    alert('您输入的不是数字');
                    return false;
                }

            }
        }
    }
    new Detail().init();
}()