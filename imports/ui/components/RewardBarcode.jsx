import React, { Component } from 'react'
import RewardWatcher from '../../api/classes/client/RewardWatcher'
import QRCode from "react-qr-code";
import moment from 'moment';
import { withNavigation } from '../withNavigation';
import LoadingSpinner from './extra/LoadingSpinner';

class RewardBarcode extends Component {
    constructor(props) {
        super(props)
        RewardWatcher.setWatcher(this, "REWARDBARCODEWATCHER")
    }
    componentDidMount() {
        RewardWatcher.getRewardDetails(RewardWatcher.Config.coupon);
    }

    componentWillUnmount() {
        RewardWatcher.resetCouponDetails({ forceRender: true })
    }

    componentDidUpdate() {
        if (RewardWatcher.CouponDetails == "") {
            this.props.navigate("/reward")
        }
    }


    render() {
        RewardWatcher.initiateWatch("REWARDBARCODEWATCHER")
        let coupon = RewardWatcher.CouponDetails
        return (

            RewardWatcher.Config.isLoading || coupon === "" ? <LoadingSpinner />
                :
                <>
                    <div class="rewards-barcode-main-content">
                        <div class="popup-div barcode">
                            <h5 class="heading-2 text-blue text-center product-name">Winning {coupon?.type == "spin" ? "Spin" : "Bet"}</h5>
                            {/* <div class="popup_image barcode"><img src={coupon?.image} loading="lazy" alt="" /></div> */}
                            <div class="div-block-96">
                                <div class="div-block-47 reward">
                                    <h5 class="heading-2 text-blue text-center product-name">{coupon?.description}</h5>
                                    <h5 class="heading-2 text-blue text-center normal"></h5>
                                    <div class="div-block-78">
                                        {/* <p class="p_style_1 text-center">Reward Ref:{coupon?._id._str}</p> */}
                                        <p class="p_style_1 text-center">Submit to Store to claim your prize.</p>
                                    </div>
                                </div>

                                {(coupon && coupon.bet) &&
                                    <QRCode size={150} value={coupon?.bet.qrcode} />
                                }

                                {(coupon && coupon.spin) &&
                                    <QRCode size={150} value={coupon?.spin.qrcode} />
                                }
                                <div class="validity_label margin-0 barcode">Valid until: {moment.utc(coupon?.validity).format("MMMM DD YYYY")}</div>
                            </div>
                        </div>
                    </div>
                </>

        )
    }
}
export default withNavigation(RewardBarcode)