export function getValue(obj, name) {
  if (!obj) {
    return obj;
  }
  let nameList = name.split(".");
  let temp = obj;
  for (let i = 0; i < nameList.length; i++) {
    if (temp[nameList[i]]) {
      temp = temp[nameList[i]];
    } else {
      return undefined;
    }
  }
  return temp;
}
export function setValue(obj, data ,value) {
  if (!obj) {
    return obj;
  }
  let attrList = data.split(".");
  let temp = obj;
  for (let i = 0; i < attrList.length - 1; i++) {
    if (temp[attrList[i]]) {
      temp = temp[attrList[i]];
    } else {
      return undefined;
    }
  }
  if(temp[attrList[attrList.length - 1]] != null){
    temp[attrList[attrList.length - 1]] = value;

  }
  return temp;
}
