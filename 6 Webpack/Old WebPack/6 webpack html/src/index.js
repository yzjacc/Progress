// import './demo.less';
import obj from'./math';
var json = require('./data.json');
console.log(json)
import $ from 'jquery';
import './demo.less'

console.log(121,obj)
obj.fn()

$.ajax({
    url:'http://localhost:9090/data.json',
    success:function(data){
        console.log(data)
    },
    error:function(){
        console.log('error')
    }
});
console.log("sss1111sadsdsa1")
console.log("sss1111sadsdsa1")

if(module.hot){
     module.hot.accept();
}


