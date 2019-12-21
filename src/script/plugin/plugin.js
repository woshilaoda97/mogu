import { $ } from '../util/DOMutil.js';
import { bufferMove } from '../util/util.js';
//全局提示框//需要导入plugin.css
class Message {
    constructor(content, type, time, callback) {
        this.content = content;
        this.type = type || 'success';
        this.time = time || 3000
        this.callback = callback || null;
        this.$wrap = $('.pg-message-wrap');
    }
    init() {
        this.insertWrap();
    }
    insertWrap() {
        if (this.$wrap.length) {//如果长度不为0说明有此元素则直接插入
            this.$wrap.append(this.megbox());
        }else{//如果长度为0需要创建外框
            this.wrapBox();
            document.body.append(this.$wrap.get());
        }
    }
    wrapBox() {
        this.$wrap = $(document.createElement('DIV'));//创建外框
        this.$wrap.addClass('pg-message-wrap').append(this.megbox());
    }
    megbox() {
        let $megbox = $(document.createElement('SPAN'))//创建内部提示框message框
        $megbox.addClass('success').html(this.content);
        bufferMove($megbox.get(),{bottom:0});//创建动画
        $megbox.timer = setTimeout(() => {
            bufferMove($megbox.get(),{height:0,opacity:0,padding:0},()=>{//删除动画
                $megbox.remove();//缓冲运动完删除此message框
                if(!this.$wrap.children().get()){//判断外框内还有没有message框//若没有删除外框
                    this.$wrap.remove();
                }
            })
        }, this.time)
        return $megbox;
    }
}
export { Message }