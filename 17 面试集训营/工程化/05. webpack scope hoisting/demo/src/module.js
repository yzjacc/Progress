export function getRandom(min, max) {
  const n = Math.random() * (max - min);
  return Math.floor(n) + min;
}
