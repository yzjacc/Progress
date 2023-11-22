import React ,{ Component }from 'react';
import Ball from './Ball'

function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
export default class BallList extends Component{
    state = {
        ballList:[]
    }

    constructor(props) {
        super(props);


        this.timer = setInterval(() => {
            let info = {
                left: getRandom(0, document.documentElement.clientWidth - 100),
                top: getRandom(0, document.documentElement.clientHeight - 100),
                xSpeed: getRandom(50, 500),
                ySpeed: getRandom(50, 500),
                bg: `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 255)})`
            }
            this.setState({
                ballList : [...this.state.ballList,info]
            })
        },5000)

    }

    render() {
       let BallList =  this.state.ballList.map(item => <Ball {...item} ></Ball>)

        return <>
            {BallList}
        </>;
    }


}