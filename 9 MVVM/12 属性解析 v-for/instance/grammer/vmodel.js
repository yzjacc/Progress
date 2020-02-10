import { setValue } from "../../until/ObjectUtil.js"

export function vmodel(vm,elm,data){
    elm.onchange = function(event){
        setValue(vm._data,data,elm.value);//vue对象 该元素绑定属性 该元素新value
    }
}