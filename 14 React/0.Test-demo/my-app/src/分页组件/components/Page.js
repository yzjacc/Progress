import React from "react";
import Pager from "./Page.css"
export default function Page(props){
    const number = getNumber(props);
    console.log(number)
    if (number === 0) {
        return null;
    }
    const numList = []
    const min = getMinNumber(props);//最小数字
    const max = getMaxNumber(min, number, props);
    for (let i = min; i <= max; i++) {
        numList.push(<div key={i} onClick={() => { toPage(i, props) }} className={i === props.current ? "item active" : "item"}>{i}</div>)

    }
    return(<div>
        <div  className={props.current === 1 ? "item disabled" : "item"}
              onClick={() => toPage(1,props)}>首页</div>
        <div onClick={() => toPage(props.current > 1 ? props.current - 1  : 1 ,props)}
             className={props.current === 1 ? "item disabled" : "item"}>上一页</div>
        {numList}
        <div onClick={() => toPage(props.current >= number - 1 ? number   : props.current + 1 ,props)}
             className={props.current === number ? "item disabled" : "item"}>下一页</div>
        <div onClick={() => toPage(number,props)}
             className={props.current === number ? "item disabled" : "item"}>尾页</div>
    </div>)

}


function toPage(target, props) {
    if (props.current === target) {
        return ; //目标页码和当前页码相同
    }
    props.handleChange && props.handleChange(target);
}

function getNumber(props){
    return Math.floor(props.total / props.limit);

}
function getMinNumber(props) {
    var min = props.current - Math.floor(props.panelNumber / 2)
    if (min < 1) {
        min = 1;
    }
    return min;
}

/**
 * 计算最大数字
 * @param {*} min
 * @param {*} pageNumber
 */
function getMaxNumber(min, pageNumber, props) {
    var max = min + props.panelNumber - 1;
    if (max > pageNumber) {
        max = pageNumber;
    }
    return max;
}