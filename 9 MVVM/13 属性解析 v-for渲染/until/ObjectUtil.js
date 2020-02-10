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

export function setValue(obj, data, value) {
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
  if (temp[attrList[attrList.length - 1]] != null) {
    temp[attrList[attrList.length - 1]] = value;
  }
  return temp;
}

export function mergeAttr(obj1, obj2) {
  if (obj1 == null) {
    return clone(obj2);
  }
  if (obj2 == null) {
    return clone(obj1);
  }
  let result = {};
  let obj1Attrs = Object.getOwnPropertyNames(obj1);
  for (let i = 0; i < obj1Attrs.length; i++) {
    result[obj1Attrs[i]] = obj1[obj1Attrs[i]];
  }
  let obj2Attrs = Object.getOwnPropertyNames(obj2);
  for (let i = 0; i < obj2Attrs.length; i++) {
    result[obj2Attrs[i]] = obj2[obj2Attrs[i]];
  }
  return result;
}

// function clone(obj){// 无法合并对象
//   JSON.parse(JSON.stringify(obj));
// }

function clone(obj) { 
  if (obj instanceof Array) {
    return cloneArray(obj);
  } else if (obj instanceof Object) {
    return cloneObject(obj);
  } else {
    return obj;
  }
}
function cloneObject(obj) {
  let result = {};
  let names = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < names.length; i++) {
    result[names[i]] = clone(obj[names[i]]);
    return result;
  }
}

function cloneArray(obj) {
  let result = new Array(obj.length);
  for (let i = 0; i < obj.length; i++) {
    result[i] = clone(obj[i]);
  }
  return result;
}
