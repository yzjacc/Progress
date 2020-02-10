import { constructProxy } from "./proxy.js";
import { mount } from "./mount.js";

let uid = 0;

export function initMixin(Due){

    Due.prototype._init = function(options){
        const vm = this;
        vm.uid = uid ++;
        vm._isDue = true;
        if(options && options.data){
            vm._data = constructProxy(vm,options.data,"");
        }
        if(options && options.el){
            let rootDom = document.getElementById(options.el);
            mount(vm,rootDom);
        }
    }

    
}