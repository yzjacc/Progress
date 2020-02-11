export const abs = num => {
  let res = num;

  if(num < 0) {
    return -num;
  }

  if(typeof num !== "number") {
    return NaN;
  }

  return res;
}

export const add = (...rest) => rest.reduce((prev, next) => prev + next);