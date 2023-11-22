import { call, delay } from "../../redux-saga/effects"

function test(arg) {
    console.log("this->", this)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(arg)
        }, 2000);
    })
}

/**
* saga任务
*/
export default function* () {
    const result = yield call(test, "abc")
    console.log(result);
    console.log(delay(1000)) 
    yield delay(1000);
    console.log("saga 完成")
}
