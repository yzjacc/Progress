import lodash from 'lodash-es'; 

const sum = function(){
    console.log('sum')
}
const isArray = function(arg){
    console.log(lodash.isArray(arg))
}
export {
    sum,
    isArray
}