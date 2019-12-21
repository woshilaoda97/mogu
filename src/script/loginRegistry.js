import { ajax } from './util/util.js'
import { $ } from './util/DOMutil.js';
import { TabSwitch } from './effect/effect.js';
import { Message } from './plugin/plugin.js';
class Lr {
    constructor() {
        this.$btns = $('.login_mod_tab').children();
        this.$contents = $('#signform').children();
        this.$lginputs = $('#lg_form input');
        this.$rtinputs = $('#rt_form input');
    }
    init() {
        let tabSwitch = new TabSwitch(this.$btns,this.$contents);
        tabSwitch.init();
        this.registry();
    }
    registry(){
        let $username = this.$rtinputs.eq(0);
        let $pass = this.$rtinputs.eq(1);
        let $repass = this.$rtinputs.eq(2);
        let $email = this.$rtinputs.eq(3);
        let $tel = this.$rtinputs.eq(4);
        let $rtbtn = this.$rtinputs.eq(5)
        $rtbtn.on('click',function(){
            new Message('this is a success message','success',2000).init();
        })
    }
}
export default Lr
