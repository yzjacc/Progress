export default function createResponsive(originalObj, targetObj, callback) {
    for (var prop in originalObj) {
        setProp(originalObj, targetObj, prop, callback);
    }
}

function setProp(originalObj, targetObj, prop, callback) {
    var propType = typeof originalObj[prop];

    if (propType === "object") {
        var proxyObj = {};
        createResponsive(originalObj[prop], proxyObj, callback);
        Object.defineProperty(targetObj, prop, {
            get: function () {
                return proxyObj;
            },
            set: function (value) {
                proxyObj = value;
                originalObj[prop] = value;
                callback && callback(prop);
            }
        })
    }
    else {
        Object.defineProperty(targetObj, prop, {
            get: function () {
                return originalObj[prop];
            },
            set: function (value) {
                originalObj[prop] = value;
                callback && callback(prop);
            }
        })
    }
}