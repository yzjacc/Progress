var m1 = require('./modules/m1');
var m2 = require('./modules/m2');
var m3 = require('./modules/m3');

console.log(m1.foo(),m2(),m3.foo());

var unique = require('uniq');

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

console.log(unique(data));
