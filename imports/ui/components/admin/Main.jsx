import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import ClientWatcher from '../../../api/classes/client/ClientWatcher'
import AdminWatcher from '../../../api/classes/client/AdminWatcher'
import LoadingSpinner from '../extra/LoadingSpinner'
import { withTracker } from "meteor/react-meteor-data";
import Utilities from '../../../api/classes/Utilities'
import RewardWatcher from '../../../api/classes/client/RewardWatcher'
import { Toast } from '../extra/Toast'
import { withNavigation } from '../../withNavigation'

class Main extends Component {
    constructor(props) {
        super(props)
        AdminWatcher.setWatcher(this, "MAINWATCHER")
        RewardWatcher.setWatcher(this, "MAINWATCHER")
    }
    handleLogout(e) {
        e.preventDefault()
        ClientWatcher.logoutUser();
        this.props.navigate('/login')
    }

    async handleQRcode() {
        const scanData = await AdminWatcher.scanResult().then((res) => {
            return res
        }).catch((err) => {
            console.log(err)
        })

        if (!scanData) return

        const decode = Utilities.decodeBase64(scanData);
        const parseObject = JSON.parse(decode);
        switch (parseObject.type) {
            case "dailyCredit":
                RewardWatcher.getDailyCredit(parseObject)
                break;
            case "claimReward":
                RewardWatcher.UpdateClaimReward(parseObject)
                break;
            case "verifyWinner":
                const res = await RewardWatcher.ValidateWinner(scanData)
                if (res) {
                    RewardWatcher.setID({ betId: res.id, rewardId: res.rewardId })
                    this.props.navigate("/admin-bet-details")
                } else {
                    Toast({ type: "error", text: "Invalid QR Code" })
                }
                break;
            case "verifyWinnerSpin":
                const res1 = await RewardWatcher.ValidateWinnerSpin(scanData)
                if (res1) {
                    RewardWatcher.setID({ spinId: res1.id, rewardId: res1.rewardId })
                    this.props.navigate("/admin-bet-details")
                } else {
                    Toast({ type: "error", text: "Invalid QR Code" })
                }
                break;
        }
    }

    render() {
        RewardWatcher.initiateWatch("MAINWATCHER")
        AdminWatcher.initiateWatch("MAINWATCHER")

        let loading = this.props.isLoading

        if (loading) return <LoadingSpinner />

        return (

            <div className='div-block-51'>
                <div className='screensize'>
                    <div className="container">
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
                        <div className='main-content'>
                            <Outlet />
                        </div>
                        <div className="bot-nav">
                            <a onClick={() => this.props.navigate('/admin-live')} className="bot-nav-icon w-inline-block"><img src="images/Asset-104.svg" loading="lazy" alt="" /></a>
                            {/* <a onClick={() => this.props.navigate('/admin-add')} className="bot-nav-icon w-inline-block"><img src="images/Asset-103.svg" loading="lazy" alt="" /></a> */}
                            <a onClick={() => this.props.navigate('/admin-settings')} className="bot-nav-icon w-inline-block"><img src="images/Asset-102.svg" loading="lazy" alt="" /></a>
                            <a onClick={() => this.props.navigate('/admin-qr')} className="bot-nav-icon w-inline-block"><img src="images/Asset-106.svg" loading="lazy" alt="" /></a>
                            <a onClick={() => this.props.navigate('/admin-roulette')} className="bot-nav-icon w-inline-block"><img src="images/Asset-107.svg" loading="lazy" alt="" /></a>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

export default withTracker(() => {
    AdminWatcher.initiateWatch("SETTINGSWATCHER");
    const isReady = AdminWatcher.getSubscribeSettings();
    return { isLoading: !isReady }
})(withNavigation((Main)))