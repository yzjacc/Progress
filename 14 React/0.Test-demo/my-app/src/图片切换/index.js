import React from 'react';
import ReactDOM from 'react-dom';
import src1 from './assets/1.jpg'
import src2 from './assets/2.jpg'
import src3 from './assets/3.jpg'

let srcArr = [src1, src2, src3];

let index = 0;

let time = null

let container = document.getElementById('root');

function render(){
    clearInterval(time);
    time = setInterval(() => {
        index = (++index) % 3;
        ReactDOM.render(<div><img src={srcArr[index]} alt=""/></div>,container);
    },1000)
}

render()

function stop() {
    clearInterval(time);
}


container.onmouseenter = function () {
    stop();
}

container.onmouseleave = function () {
    render();
}
