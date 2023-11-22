import React , { Component } from 'react'
export default class A extends Component{
    state = {
        n: 10
    }
    constructor(props) {
        super(props);
        this.timer = setInterval(() => {
            this.setState({
                n: this.state.n - 1
            })
            if(this.state.n === 0) {
                //停止计时器
                clearInterval(this.timer);
            }
        },500)
    }

    render(){
        return <C n={this.state.n}></C>
        }
}

function C(prop) {
    return (
        <div>
        <div>C number</div>
        <h2>{prop.n}</h2>
        </div>
        )
}