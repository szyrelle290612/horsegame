import React, { Component } from 'react'
import BetWatcher from '../../../api/classes/client/BetWatcher'

export default class BetConfirm extends Component {
    render() {
        return (
            <>
                <div className="popup_image betconfirm"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/623977dc28b4e09a9e35c08b_pop_up_04.svg" loading="lazy" alt="" className="assetwidth_100" /></div>
                <div className="div-block-47">
                    <h5 className="heading-2 text-blue text-center">Your bet has been placed!</h5>
                    <p className="p_style_1-2 text-center">Thank you for submitting your bet. Good Luck!</p>
                </div>
            </>
        )
    }
}
