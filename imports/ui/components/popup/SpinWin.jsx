import React, { Component } from 'react'

export default class SpinWin extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <div className="div-block-93"><h5 className="h2_v2 text-blue text-center">Congratulations !!!</h5>
                    <div className="popup_image v3 sidepaddings">
                        <img src="https://assets.website-files.com/623844b9c48492f6b2d6d1c3/623977dc407d0841ff7b101c_pop_up_05.svg" loading="lazy" alt="" className="assetwidth_100" />
                    </div>
                </div>
                <div className="div-block-47 winlose">
                    <h5 className="heading-2 text-center">You won</h5>
                    <p className="p_style_1-2 text-center">{this.props.message}</p>
                </div>
            </>
        )
    }
}
