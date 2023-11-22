/**
 * 贪心算法：找零问题
 * @param {*} total 找零总数
 * @param {*} deno 面额
 */
function exchange(total, deno) {
    var result = []; //找零结果
    while (total > 0) {
        //还要找
        var max = -1; //最大可用面额
        for (var i = 0; i < deno.length; i++) {
            var d = deno[i]; //当前面额
            if (d > max && d <= total) {
                max = d;
            }
        }
        result.push(max); //找钱结果
        total -= max;
    }
    return result;
}

var result = exchange(41, [25, 20, 10, 5, 1]) 
console.log(result);