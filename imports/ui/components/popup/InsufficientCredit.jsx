import React from 'react'

export default function InsufficientCredit() {
    return (
        <div className="insufficient_credits_modal" style={{ display: 'flex' }}>
            <div className="popup-div">
                <div className="popup_image v2 mobile-65">
                    <img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/62389a187434bf12edde3e41_pop_up_01.svg" loading="lazy" alt="" /></div>
                <div className="div-block-47">
                    <h5 className="heading-2 text-blue text-center">Sorry. <br />You have no credits left.</h5>
                    <p className="p_style_1-2 text-center">Scan the QR code in our stores to check-in and earn free credits.</p>
                </div>
                <div data-w-id="c3d75377-aca6-e1c8-9054-217e951ade84" className="close_popup_icon-2">
                    <img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/623899e2561cce52ab22b3ea_close_icon.svg" loading="lazy" alt="" /></div>
            </div>
        </div>
    )
}
