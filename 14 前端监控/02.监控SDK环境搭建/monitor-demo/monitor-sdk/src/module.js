export const fn = () => { 
  console.log('fn');
  return [1,2,3,4].map(item => item + 1);
}