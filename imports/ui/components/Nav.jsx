import React, { Component } from 'react'
import ClientWatcher from '../../api/classes/client/ClientWatcher'
import { withTracker } from "meteor/react-meteor-data";
import { withNavigation } from '../withNavigation';
import AdminWatcher from '../../api/classes/client/AdminWatcher';
import LoadingSpinner from './extra/LoadingSpinner';
import { Toast } from './extra/Toast';
import RewardWatcher from '../../api/classes/client/RewardWatcher';
import Utilities from '../../api/classes/Utilities';

class Nav extends Component {
    constructor(props) {
        super(props);
        ClientWatcher.setWatcher(this, "NAVWATCHER");
        AdminWatcher.setWatcher(this, "NAVWATCHER");
        RewardWatcher.setWatcher(this, "NAVWATCHER");
    }

    handleLogout(e) {
        e.preventDefault()
        ClientWatcher.logoutUser();
        this.props.navigate('/login')
    }

    handleQRcode(e) {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                const scanData = result.text;
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
            },
            function (error) {
                Toast({ text: "Scanning failed: " + error })
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: false, // iOS and Android
                showTorchButton: false, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: false, // Android, save scan history (default false)
                prompt: "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
        );
    }


    render() {
        ClientWatcher.initiateWatch("NAVWATCHER");
        AdminWatcher.initiateWatch("NAVWATCHER");
        RewardWatcher.initiateWatch("NAVWATCHER");
        const { isLoading, creditReceived, error } = RewardWatcher.Config

        let loading = this.props.isLoading

        if (loading || isLoading) return <LoadingSpinner />

        return (
            <>
                <div className="top-nav">
                    <div className="left">
                        <a onClick={() => this.props.navigate(-1)} className="icon-link-div-2 w-inline-block"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/623896308698bbd2bce86566_top_nav_icon_01.svg" loading="lazy" alt="" /></a>
                    </div>
                    <div className="screen-title">
                        <div className="h1"></div>
                    </div>
                    <div className="right">
                        <a data-w-id="cd972bd5-c124-c42f-0329-b1410807f735" onClick={this.handleQRcode.bind(this)} className="icon-link-div w-inline-block">
                            <img src="images/Asset-70.svg" loading="lazy" alt="" /></a>
                        <a href="#" className="icon-link-div w-inline-block"><img src="images/Asset-80.svg" loading="lazy" alt="" /></a>
                        <a onClick={this.handleLogout.bind(this)} href="#" className="home_main_btn secondary w-inline-block">
                            <div>Logout</div>
                        </a>
                        <div className="daily_checkin_modal">
                            <div className="popup-div scanqqr">
                                <a href="qr-scan.html" className="link-block-2 w-inline-block">
                                    <div>SCAN QR</div><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/62389d553e07a2afac81e833_pop_up_02.svg" loading="lazy" alt="" className="image-4" />
                                </a>
                                <div className="div-block-47">
                                    <h5 className="heading-2 text-blue text-center">Scan QR for daily check in</h5>
                                    <p className="p_style_1-2 text-center">Scan the QR code in our stores to check-in and earn free credits.</p>
                                </div>
                                <div data-w-id="cd972bd5-c124-c42f-0329-b1410807f744" className="close_popup_icon-2"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/623899e2561cce52ab22b3ea_close_icon.svg" loading="lazy" alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>

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

export default withTracker(() => {
    ClientWatcher.initiateWatch("NAVWATCHER");
    AdminWatcher.initiateWatch("NAVWATCHER");
    const isReady = AdminWatcher.getSubscribeSettings();
    let user = ClientWatcher.init()
    return { user, isLoading: !isReady }
})(withNavigation(Nav))
