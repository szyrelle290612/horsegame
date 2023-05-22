import React, { Component } from 'react'
import RewardWatcher from '../../../api/classes/client/RewardWatcher'
import { withNavigation } from '../../withNavigation';
import QRCode from "react-qr-code";
import LoadingSpinner from '../extra/LoadingSpinner';
import { v4 as uuidv4 } from 'uuid';
import Utilities from '../../../api/classes/Utilities';

class BetDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
        RewardWatcher.setWatcher(this, "REWARDWATCHER");
    }

    componentDidMount() {
        if (RewardWatcher.ID.betId) {
            RewardWatcher.getBetDetails(RewardWatcher.ID.betId)
        }
        if (RewardWatcher.ID.spinId) {
            RewardWatcher.getSpinDetails(RewardWatcher.ID.spinId)
        }
        RewardWatcher.getRewardDetails(RewardWatcher.ID.rewardId._str);
    }

    componentDidUpdate() {
        if (RewardWatcher.ID === "") {
            this.props.navigate('/qrscan')
        }
    }

    handleUpdateQrCode(id, e) {
        const data = { type: "claimReward", rewardId: id, Qrcode: uuidv4() }
        const encode = Utilities.encodeBase64(JSON.stringify(data))
        this.setState({ value: encode })
        // RewardWatcher.updateReward(id, RewardWatcher.Config.qrcode)
    }

    render() {
        let details = RewardWatcher.BetDetails
        let coupon = RewardWatcher.CouponDetails
        if (RewardWatcher.Config.isLoading) return <LoadingSpinner />
        console.log(coupon)
        return (
            <>
                <div className="rewards-barcode-main-content">
                    <div className="popup-div barcode">
                        <h5 className="heading-2 text-blue text-center product-name">Winning {coupon?.type === "spin" ? "Spin" : "Bet"}</h5>
                        {/* <div className="popup_image barcode"><img src={coupon?.image} loading="lazy" alt="" /></div> */}
                        <div className="div-block-96">
                            <div className="div-block-47 reward">
                                <div>
                                    {/* <p className="p_style_1 text-center">Store ID:{details?.race.storeId}</p> */}
                                    <p className="p_style_1 text-center">Name:{details?.name}</p>
                                    <p className="p_style_1 text-center">Status:{details?.win ? "Winner" : "Lose"}</p>
                                </div>
                            </div>

                            {coupon?.spin?.qrcode &&
                                <QRCode size={150} value={coupon?.spin?.qrcode} />
                            }
                            {coupon?.bet?.qrcode &&
                                <QRCode size={150} value={coupon?.bet?.qrcode} />
                            }
                            <p className="p_style_1 text-center">{coupon?.type == "spin" ? "Spin Wheel" : "Horse Race"}</p>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '10px' }} />
                        <h5 className="heading-2 text-blue text-center product-name">Reward</h5>
                        {
                            this.state.value &&
                            <>
                                <p className="p_style_1 text-center">Scan to Claim Reward.</p>
                                <QRCode level='H' size={150} value={this.state.value} />
                            </>
                        }
                        <p className="p_style_1 text-center"><strong>Status:</strong>{coupon?.status == "available" ? "Not Claim" : "Claimed"}</p>
                        {
                            coupon?.status == "available" &&
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <a onClick={this.handleUpdateQrCode.bind(this, coupon?._id)} className="btn_primary w-button">Generate QR</a>
                            </div>
                        }
                    </div>

                </div>

            </>
        )
    }
}
export default withNavigation(BetDetails)