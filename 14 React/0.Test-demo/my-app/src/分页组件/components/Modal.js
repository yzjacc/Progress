import React , {Component} from "react";
import "./Modal.css"

export default class Modal extends Component{

    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        if(!this.props.isLoading){
            return null
        }
        return <div className="modal" > 请稍等 请稍等 请稍等 请稍等 请稍等 请稍等 </div>;
    }

}