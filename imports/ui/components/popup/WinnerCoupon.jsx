import React from 'react'

export default function WinnerCoupon() {
    return (
        <div className="win_minorprize_modal" style={{ display: 'flex' }}>
            <div className="popup-div">
                <div className="div-block-93"><h5 className="h2_v2 text-blue text-center">Success!</h5>
                    <div className="popup_image">
                        <img src="https://assets.website-files.com/623844b9c48492f6b2d6d1c3/623977dd2dc7b794ef8e979d_pop_up_06.svg" loading="lazy" alt="" className="assetwidth_100" />
                    </div>
                </div>
                <div className="div-block-47 winlose">
                    <h5 className="heading-2 text-center">You won</h5>
                    <h5 className="h2_v2 text-blue text-center">Lay's classNameic Potato Chips, 8 oz Bag</h5>
                    <p className="p_style_1-2 text-center">Please present barcode to a store staff to claim your reward. <br />Keep on playing the game to win more prizes.</p>
                    <div className="div-block-90 popup margin-top">
                        <div className="_40 _w-48"><a data-w-id="f0616078-220b-9bd4-65c7-64508168d39b" href="#" className="btn_primary-2 block secondary w-button">Close</a>
                        </div><div className="_40 _w-48"><a href="/rewards-list" className="btn_primary-2 block w-button">Redeem</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
