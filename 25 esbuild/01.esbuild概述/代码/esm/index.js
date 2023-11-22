import fn1 from './module1.js';
import debounce from './node_modules/lodash-es/debounce.js';
fn1();
debounce(() => console.log('debounce'), 1000)();