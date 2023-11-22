function jumpTemp(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;
    return jumpTemp(n - 1) + jumpTemp(n - 2);
}

/**
 * 青蛙跳n级台阶一共有多少种跳法
 * @param {*} n 
 */
function jump(n) {
    var table = []; //用一个数组记录已经跳过的台阶结果

    function _jump(n) {
        if (table[n]) return table[n]; //已经算过了，不用再算了
        //没有算过
        var newRecord; //用于记录这一次运算的结果
        if (n === 1) newRecord = 1;
        else if (n === 2) newRecord = 2;
        else {
            newRecord = _jump(n - 1) + _jump(n - 2);
        }
        table[n] = newRecord;
        return newRecord;
    }

    var result = _jump(n);
    console.log(table);
    return result;
}

/**
 * 
 * @param {*} str1 
 * @param {*} str2 
 */
function LCS(str1, str2) {
    var table = [];

    function _LCS(str1, str2) {
        //判断目前的输入值是否有对应的计算结果（是不是已经存过了）
        for (var i = 0; i < table.length; i++) {
            if (table[i].str1 === str1 && table[i].str2 === str2) {
                return table[i].result;
            }
        }
        //没有存储结果
        var newResult; //用于计算最终计算的结果
        if (!str1 || !str2) newResult = "";// 其中有一个字符串没东西
        else if (str1[0] === str2[0]) {
            //开头相同
            newResult = str1[0] + _LCS(str1.substr(1), str2.substr(1));
        }
        else {
            var s1 = _LCS(str1, str2.substr(1));
            var s2 = _LCS(str1.substr(1), str2);
            if (s1.length < s2.length) {
                newResult = s2;
            }
            else {
                newResult = s1;
            }
        }
        table.push({
            str1: str1,
            str2: str2,
            result: newResult
        })
        return newResult;
    }

    var result = _LCS(str1, str2);
    console.log(table)
    return result;

}

var result = LCS("邓哥特有的贵族气质吸引了很多女孩", "邓哥喜欢吃秋葵和香菜，但是他的女朋友们不喜欢");
console.log(result);