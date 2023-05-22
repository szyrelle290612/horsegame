import React, { Component } from 'react'

export default class InputText extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <label htmlFor="name" className="field-label">{this.props.label}</label>
                <div className="div-block-12">
                    <input
                        type={this.props.type}
                        id={this.props.id}
                        name={this.props.name}
                        onChange={this.props.handleChange}
                        placeholder={this.props.placeholder}
                        value={this.props.value || ""}
                        maxLength={this.props.maxLength || "256"}
                        className="textfield-no-outline w-input" />
                </div>
            </>
        )
    }
}
