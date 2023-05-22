import React, { Component } from 'react'
import QRCode from "react-qr-code";
import moment from 'moment';
import AdminWatcher from '../../../api/classes/client/AdminWatcher';
import RewardWatcher from '../../../api/classes/client/RewardWatcher';
import Utilities from '../../../api/classes/Utilities';
import LoadingSpinner from '../extra/LoadingSpinner';
import { withNavigation } from '../../withNavigation';
import { v4 as uuidv4 } from 'uuid';

class RewardDetails extends Component {
    constructor(props) {
        super(props)
        RewardWatcher.setWatcher(this, "REWARDBARCODEWATCHER")
    }
    componentDidMount() {
        console.log(RewardWatcher.ID.rewardId)
        RewardWatcher.getRewardDetails(RewardWatcher.ID.rewardId);
    }

    componentWillUnmount() {
        RewardWatcher.resetId({ forceRender: true })
    }

    render() {
        RewardWatcher.initiateWatch("REWARDBARCODEWATCHER")
        let coupon = RewardWatcher.CouponDetails

        return (
            <>

                {RewardWatcher.Config.isLoading && <LoadingSpinner />}

                <div className="div-block-96">
                    <div className="popup_image barcode" style={{ width: '100px' }}>
                        {/* <img src={coupon?.image} loading="lazy" alt="" /> */}
                    </div>
                    <div className="div-block-47 reward">
                        <h5 className="heading-2 text-blue text-center product-name">Reward</h5>
                        <div className="div-block-78">
                            {/* <p class="p_style_1 text-center"><strong>Reward Ref:</strong>{coupon?._id._str}</p> */}
                            <p className="p_style_1 text-center"><strong>Status:</strong>{coupon?.status == "available" ? "Not Claim" : "Claimed"}</p>
                        </div>
                    </div>


                    {(coupon && coupon.bet) &&
                        <QRCode size={150} value={coupon.bet.qrcode} />
                    }
                    {(coupon && coupon.spin) &&
                        <QRCode size={150} value={coupon.spin.qrcode} />
                    }
                    {coupon?.status == "available" &&
                        <>
                            <div style={{ margin: '10px 0' }} className="validity_label margin-0 barcode">Valid until: {moment(coupon?.validity).format("MMMM DD YYYY")}</div>
                            < a onClick={() => this.props.navigate('/admin-qrscan')} className="btn_primary w-button">Validate using QR Scan</a>
                        </>
                    }
                </div >
            </>
        )
    }
}
export default withNavigation(RewardDetails)