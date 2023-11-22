import React, { Component } from 'react'

/**
 * 一组多选框
 */
export default class RadioBoxGroup extends Component {


    handleChange = e => {
        this.props.onChange && this.props.onChange(e.target.value, this.props.name, e);
    }

    /**
     * 得到一组多选框
     */
    getCheckBoxes() {
        return this.props.datas.map(it => (
            <label key={it.value}>
                <input
                    type="radiobox"
                    name={this.props.name}
                    value={it.value}
                    checked={this.props.chooseDatas.includes(it.value)}
                    onChange={this.handleChange}
                />
                {it.text}
            </label>
        ));
    }

    render() {
        const bs = this.getCheckBoxes();
        return (
            <div>
                {bs}
            </div>
        )
    }
}
