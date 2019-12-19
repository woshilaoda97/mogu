import { ajax } from './util.js'
import { $ } from './DOMutil.js';
import { tabSwitch } from './effect.js';
class Detail {
    constructor() {
        this.$btns = $('.login_mod_tab').children();
        this.$contents = $('#signform').children()
    }
    init() {
        new tabSwitch(this.$btns,this.$contents).init()
    }
}
new Detail().init();