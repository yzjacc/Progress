import React ,{ Component }from 'react';
import './index.css'
export default class Ball extends Component {

    state = {
        top: this.props.top || 0,
        left: this.props.left || 0,
        xSpeed: this.props.xSpeed,
        ySpeed: this.props.ySpeed
    }

    constructor(props) {

        super(props);

        const duration = 16; //间隔的毫秒数

        setInterval(() => {
            const xDis = this.state.xSpeed * duration / 1000;
            const yDis = this.state.ySpeed * duration / 1000;
            //根据速度，改变left和top值
            let newLeft = this.state.left + xDis;
            let newTop = this.state.top + yDis;
            if (newLeft <= 0) {
                newLeft = 0;
                this.setState({
                    xSpeed: -this.state.xSpeed //横坐标反向
                })
            }
            else if (newLeft >= document.documentElement.clientWidth - 100) {
                newLeft = document.documentElement.clientWidth - 100;
                this.setState({
                    xSpeed: -this.state.xSpeed //横坐标反向
                })
            }

            if (newTop <= 0) {
                newTop = 0;
                this.setState({
                    ySpeed: -this.state.ySpeed //纵坐标反向
                })
            }
            else if (newTop >= document.documentElement.clientHeight - 100) {
                newTop = document.documentElement.clientHeight - 100;
                this.setState({
                    ySpeed: -this.state.ySpeed //纵坐标反向
                })
            }

            this.setState({
                left: newLeft,
                top: newTop
            });
        }, duration);
    }
    render() {
        return <div style={{top: this.state.top, left: this.state.left,background: this.props.bg || "#f40"
        }}></div>
    }

}