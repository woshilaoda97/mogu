import Lr from './loginRegistry.js';//new Lr().init();
import Detail from './details.js';//new Detail().init();
import GoodList from './index.js';//new GoodList().init();
let bodyid = document.querySelector('body').id;
switch(bodyid){
    case 'module-lg' : new Lr().init();break;
    case 'module-details' : new Detail().init();break;
    case 'module-index' : new GoodList().init();break;
}
