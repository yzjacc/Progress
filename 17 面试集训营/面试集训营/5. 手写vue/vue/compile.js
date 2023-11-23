//姓名：{{name}}, 年龄：{{age}}，居住省份：{{addr.province}}
//返回：  ["{{name}}", "{{age}}", "{{addr.province}}"]
function getFragments(template) {
    var matches = template.match(/{{[^}]+}}/g);
    return matches || [];
}

/**
 * 根据片段的内容，从环境对象中取出相应的数据
 * @param {*} fragment 
 * @param {*} envObj 
 */
function getValue(fragment, envObj) {
    // exp: 花括号内部的表达式
    var exp = fragment.replace("{{", "").replace("}}", "");
    var props = exp.split("."); //将表达式分割为一个属性数组
    var obj = envObj;
    for (var i = 0; i < props.length; i++) {
        obj = obj[props[i]];
    }
    return obj;
}

/**
 * 根据模板和环境对象，得到编译结果
 * @param {*} template 模板字符串
 * @param {*} envObj 环境对象
 */
export default function compile(template, envObj) {
    //提取模板中的 {{xxxx}}
    var frags = getFragments(template);
    var result = template; //先保存模板到result中, result保存了最终的编译结果
    for (var i = 0; i < frags.length; i++) {
        var frag = frags[i]; //拿到其中一个片段
        result = result.replace(frag, getValue(frag, envObj));
    }
    return result;
}