import React, { Component } from 'react'
import hoc from "./hoc"
/**
 * 一组多选框
 */
class CheckBoxGroup extends Component {


    handleChange = e => {
        let newArr;
        if (e.target.checked) {
            newArr = [...this.props.chooseDatas, e.target.value];
        }
        else {
            newArr = this.props.chooseDatas.filter(it => it !== e.target.value);
        }
        this.props.onChange && this.props.onChange(newArr, this.props.name, e);
    }

    /**
     * 得到一组多选框
     */

    render() {
        return (
            <label key={this.props.value}>
                <input
                    type="checkbox"
                    name={this.props.name}
                    value={this.props.value}
                    checked={this.props.chooseDatas.includes(it.value)}
                    onChange={this.handleChange}
                />
                {this.props.text}
            </label>
        )
    }
}

hoc(CheckBoxGroup);