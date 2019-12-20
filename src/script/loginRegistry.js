import { ajax } from './util/util.js'
import { $ } from './util/DOMutil.js';
import { TabSwitch } from './effect/effect.js';
import { Message } from './plugin/plugin.js';
<<<<<<< HEAD
class Detail {
=======
class Lr {
>>>>>>> 打包
    constructor() {
        this.$btns = $('.login_mod_tab').children();
        this.$contents = $('#signform').children();
        this.$lginputs = $('#lg_form input');
        this.$rtinputs = $('#rt_form input');
    }
    init() {
        let tabSwitch = new TabSwitch(this.$btns,this.$contents);
        tabSwitch.init();
<<<<<<< HEAD
        this.registry();
=======
        // this.registry();
>>>>>>> 打包
    }
    registry(){
        let $username = this.$rtinputs.eq(0);
        let $pass = this.$rtinputs.eq(1);
        let $repass = this.$rtinputs.eq(2);
        let $email = this.$rtinputs.eq(3);
        let $tel = this.$rtinputs.eq(4);
        let $rtbtn = this.$rtinputs.eq(5)
        console.log();
        $rtbtn.on('click',function(){
            console.log($username.get().value);
        })
    }
}
<<<<<<< HEAD
new Detail().init();
=======
export default Lr
>>>>>>> 打包
