/**
 * 获取模板中带有花括号的部分
 * @param {*} template 
 */
function getFragments(template) {
    var matches = template.match(/{{[^}]+}}/g)
    return matches || [];
}

function replaceFragment(template, frag, envObj) {
    var exp = frag.replace("{{", "").replace("}}", "");
    var value = getExpressionValue(exp, envObj);
    return template.replace(frag, value)
}

function getExpressionValue(exp, envObj) {
    var props = exp.split(".");
    var result = envObj;
    for (var i = 0; i < props.length; i++) {
        result = result[props[i]];
    }
    return result;
}


/**
 * 编译一个模板字符串，得到最终的编译结果
 * @param {*} template 模板字符串
 * @param {object} envObj 模板环境中使用的对象
 */
export default function compile(template, envObj) {
    var frags = getFragments(template);
    var result = template;
    for (var i = 0; i < frags.length; i++) {
        var frag = frags[i];
        //替换模板中的frag
        result = replaceFragment(result, frag, envObj);
    }
    return result;
}