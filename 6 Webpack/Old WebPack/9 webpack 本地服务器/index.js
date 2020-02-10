import './index.css';
import $ from 'jquery';
// var json = require('./data.json');

// console.log(json);
console.log(1113232321,'fsfsd');
console.log(1113232321,'fsfsd');
console.log(1113232321,'fsfsd');
console.log(1113232321,'fsfsd');



$.ajax({
    url:'http://localhost:9091/data.json',
    success:function(data){
        console.log(data);
    },
    error:function(){
        console.log('error');
    }
})
