let uid = 0;

export function initMixin(Due){

    Due.prototype._init = function(options){
        const vm = this;
        vm.uid = uid ++;
        vm._isDue = true;
    }
}