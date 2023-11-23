import { count, increase } from './counter.js';
import * as counter from './counter.js';
const { count: c } = counter;
increase();
console.log(count);
console.log(counter.count);
console.log(c);
