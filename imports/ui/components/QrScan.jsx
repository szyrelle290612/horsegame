import React, { Component } from 'react'
import QrReader from "react-qr-reader";
import LoadingSpinner from './extra/LoadingSpinner';
import RewardWatcher from '../../api/classes/client/RewardWatcher';
import Utilities from '../../api/classes/Utilities';
import { Toast } from './extra/Toast';
import { withNavigation } from '../withNavigation';

class QrScan extends Component {
    constructor(props) {
        super(props)
        RewardWatcher.setWatcher(this, "QrScan");
    }
    handleScan = async (scanData) => {
        if (scanData && scanData !== "" && scanData.length) {
            const decode = Utilities.decodeBase64(scanData);
            const parseObject = JSON.parse(decode);
            switch (parseObject.type) {
                case "dailyCredit":
                    RewardWatcher.getDailyCredit(parseObject)
                    break;
                case "claimReward":
                    RewardWatcher.UpdateClaimReward(parseObject)
                    break;
            }
        };
    };

    handleError = (err) => {
        console.error(err);
    };


    render() {
        RewardWatcher.initiateWatch("QrScan");
        const { isLoading, creditReceived, error } = RewardWatcher.Config


        return (
            <>
                {isLoading ? <LoadingSpinner /> :
                    <div class="div-block-51">
                        <div class="screensize">
                            <div class="container">
                                <div class="main-content-2">
                                    <div class="qr-scan-main-content">
                                        <div className="App">
                                            {creditReceived == 0 && error == "" &&
                                                < QrReader
                                                    delay={1000}
                                                    onError={this.handleError}
                                                    onScan={this.handleScan}
                                                    // chooseDeviceId={() => selected}
                                                    style={{ width: "300px" }}
                                                />
                                            }
                                        </div>
                                        <div class="div-block-65">
                                            <p class="paragraph">Scan the QR code in our stores to check-in and earn free credits.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >}
                {error &&
                    <div class="credits_added_modal" style={{ display: 'flex' }}>
                        <div class="popup-div">
                            <div class="div-block-47">
                                <h5 class="heading-2 text-blue text-center larger">QR CODE IS USED!</h5>
                                <p class="p_style_1-2 text-center popup">{error}.<br />Please comeback Tomorrow.</p>
                            </div>
                            <div onClick={() => RewardWatcher.setConfig({ error: "" })} data-w-id="5d86ef99-c337-4666-bdb5-df9d20d13604" class="close_popup_icon-2"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/623899e2561cce52ab22b3ea_close_icon.svg" loading="lazy" alt="" /></div>
                        </div>
                    </div>
                }
                {creditReceived > 0 &&
                    <div class="credits_added_modal" style={{ display: 'flex' }}>
                        <div class="popup-div">
                            <div class="popup_image v2 mobile-65"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/62398b3b1b365c5e24125474_notification_icon_03.svg" loading="lazy" alt="" class="assetwidth_100" /></div>
                            <div class="div-block-47">
                                <h5 class="heading-2 text-blue text-center larger">You’ve got {creditReceived} Free Credit!</h5>
                                <p class="p_style_1-2 text-center popup">We’ve added the credit to your account.<br />Keep checking in on our stores daily to earn free credits.</p>
                            </div>
                            <div onClick={() => RewardWatcher.setConfig({ creditReceived: "" })} data-w-id="5d86ef99-c337-4666-bdb5-df9d20d13604" class="close_popup_icon-2"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/623899e2561cce52ab22b3ea_close_icon.svg" loading="lazy" alt="" /></div>
                        </div>
                    </div>
                }
            </>
        )
    }
}
export default withNavigation(QrScan)