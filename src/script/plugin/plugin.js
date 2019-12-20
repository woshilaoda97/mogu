import {$} from '../util/DOMutil.js';
//全局提示框
class Message{
    constructor(content,type,time,callback){
        this.content = content;
        this.type = type || 'success';
        this.time = time || 3000
        this.callback = callback || null;
    }
    init(){
        this.insertWrap();
    }
    insertWrap(){
        document.body.append(this.wrapBox().get())
    }
    wrapBox(){
        let str = '';
        let $wrap = $(document.createElement('DIV'));//创建外框
        $wrap.addClass('pg-message-wrap').append(this.megbox());
        return $wrap;
    }
    megbox(){
        let $megbox = $(document.createElement('SPAN'))//创建内部提示框
        $megbox.addClass('success').html(this.content);
        $megbox.timer = setTimeout(()=>{
            $megbox.remove();
        },this.time)
        return $megbox;
    }
}
export{Message}