import React, {Component} from 'react';
import LKHeader from "../Header/LKHeader";
import LKAside from "../Aside/LKAside";

class LayOut extends Component {
    render() {
        return (
            <div>
                <LKHeader/>
                <div className="main">
                    <LKAside/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LayOut;