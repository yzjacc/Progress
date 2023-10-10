"use strict";
// 该游戏是一个猜数字的游戏
// 玩家输入 4 位 0-9 不重复的数字，和电脑所生成 4 位 0-9 不重复的数字进行一个比较
// 如果位置和大小都正确，计入 A
// 如果数字正确但是位置不对，计入 B
// 电脑 1 2 3 4
// 玩家 5 2 1 7
// 返回 1A1B
const readline = require("readline-sync");
const { isRepeat, randomNum } = require("./utils/tools");
/**
 * 游戏的主函数
 */
function main() {
    // guessNum 用户输入的猜的数字，a 代表 A 的个数，b 代表 B 的个数
    // chance 代表猜测的机会
    let guessNum, a = 0, b = 0, chance = 10;
    // 电脑所生成的 4 位不重复的数字
    const comNum = randomNum();
    // 鼓励语句
    const arr = [
        "加油！",
        "还差一点了",
        "你马上就要猜中了",
        "很简单的，再想想",
        "也许你需要冷静一下",
    ];
    while (chance) {
        console.log("请输入你要猜测的数字");
        guessNum = readline.question("");
        if (guessNum.length !== 4) {
            console.log("长度必须为4");
        }
        else if (isNaN(Number(guessNum))) {
            console.log("输入的数字有问题");
        }
        else {
            // 符合要求，进行一个判断
            // 判断是否重复 需要将字符串转换为数组
            let guessNum2 = [...guessNum];
            if (!isRepeat(guessNum2)) {
                // 如果能够进入到此 if 说明玩家输入的数字是OK的 可以开始进行判断
                for (let i = 0; i < guessNum2.length; i++) {
                    for (let j = 0; j < comNum.length; j++) {
                        if (guessNum2[i] == comNum[j].toString()) {
                            // 如果能够进入到此 if 说明数字相同
                            if (i === j) {
                                // 如果进入此 if  说明 位置也相同
                                a++;
                            }
                            else {
                                b++;
                            }
                        }
                    }
                }
                if (a === 4) {
                    // 如果进入此 if 说明玩家全部猜对了 跳出while
                    break;
                }
                else {
                    console.log(`${a}A${b}B`);
                    chance--;
                    if (chance !== 0) {
                        let index = Math.floor(Math.random() * arr.length);
                        console.log(`你还剩下${chance}次机会,${arr[index]}`);
                    }
                    a = b = 0; // 清空 a 和 b 的值
                }
            }
            else {
                console.log("你输入的数字重复了, 请重新输入!");
            }
        }
    }
    // 如果跳出了上面的while 说明游戏结束了 但是 分为 2 种情况
    // 1. 提前猜对了   2. 机会用完了
    if (chance === 0) {
        // 进入此 if 说明是机会用完了
        console.log("很遗憾,你已经没有机会了！");
        console.log(`电脑生成的随机数为${comNum}`);
    }
    else {
        console.log("恭喜你,猜测正确,游戏结束");
        console.log("Thank you for playing");
    }
}
main();
