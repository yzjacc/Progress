const randomNumber = (min: number, max: number): number => {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}
export default randomNumber;