import { f3 } from './b';
export function f1() {
  console.log('f1');
}

export function f2() {
  console.log('f2');
  f3();
}
