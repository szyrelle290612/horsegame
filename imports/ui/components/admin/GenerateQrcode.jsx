import React, { Component } from 'react'
import QRCode from "react-qr-code";
import Utilities from '../../../api/classes/Utilities';
import AdminWatcher from '../../../api/classes/client/AdminWatcher';
import { withNavigation } from '../../withNavigation';
import { withTracker } from "meteor/react-meteor-data";
import LoadingSpinner from '../extra/LoadingSpinner';
import { v4 as uuidv4 } from 'uuid';
import RewardWatcher from '../../../api/classes/client/RewardWatcher';

class GenerateQrcode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            date: "",
            show: false,
        }
        AdminWatcher.setWatcher(this, "GENERATEQRCODEWATCHER");
    }

    componentDidMount() {
        let store = AdminWatcher.SettingDBData[0]
        const data = { type: "dailyCredit", storeId: store?._id._str, Qrcode: uuidv4() }
        const encode = Utilities.encodeBase64(JSON.stringify(data))
        this.setState({ value: encode })
        AdminWatcher.getAllRewards(false)
    }

    handleGenerate(id, e) {
        e.preventDefault();
        const data = { type: "dailyCredit", storeId: id, Qrcode: uuidv4() }
        const encode = Utilities.encodeBase64(JSON.stringify(data))
        this.setState({ value: encode })
        // AdminWatcher.saveQrcode(generate)
    }

    handleSelectDate(e) {
        this.setState({ date: e.target.value })
        AdminWatcher.getAllRewards(false, e.target.value)
    }

    handleSelectRewardUser(item, e) {
        e.preventDefault();
        RewardWatcher.setID({ rewardId: item })
        this.props.navigate('/admin-reward')

    }

    render() {
        AdminWatcher.initiateWatch("GENERATEQRCODEWATCHER");
        let data = AdminWatcher.RewardData;
        let store = AdminWatcher.SettingDBData[0]

        return (
            <>
                <div className='home-main-content'>
                    <div className='div-block-27'>
                        <h4>QR CODE DAILY REWARD</h4>
                        <p>StoreId:{store?._id._str}</p>
                        <div className="div-block-37" style={{ padding: '20px' }}>
                            <div className="div-block-49" style={{ backgroundColor: '#fff' }}>
                                {this.state.value &&
                                    <QRCode
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        size={130} value={this.state.value} />
                                }
                                <div style={{ textAlign: 'center' }}>
                                    <a onClick={this.handleGenerate.bind(this, store?._id._str)} className="btn_primary w-button">Generate QR</a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='div-block-27'>
                        <h4 className="h2">Winner</h4>
                        <div className="div-block-12">
                            <input type="date" onChange={this.handleSelectDate.bind(this)} value={this.state.date} className="textfield-no-outline w-input" maxLength="256" name="name-2" data-name="Name 2" placeholder="" id="name-2" />
                        </div>
                        <div className="div-block-22">
                            {data && data.map((item, index) => {
                                return <a key={item._id} className="card_link w-inline-block" onClick={this.handleSelectRewardUser.bind(this, item._id)}>
                                    <div>
                                        <div className="div-block-24">
                                            <div className="race_number">ref:{item._id}</div>
                                        </div>
                                        <div className="div-block-46"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/6238a7040d1b3e1a24a69b25_icon_medal.svg" loading="lazy" alt="" className="icon" />
                                            {(item && item.bet) && <div className="horsewinner_text-2">Horse Race</div>}
                                            {(item && item.spin) && <div className="horsewinner_text-2">Spin Wheel</div>}
                                        </div>
                                        {/* <h5 className="heading-2">{item.bet.raceLocation}</h5> */}
                                    </div>
                                    <div>
                                        <div className="text-block" style={{ backgroundColor: item.status == "available" ? "green" : "red", color: '#fff' }}>{item.status == "available" ? "CLAIM NOW" : "ALREADY CLAIM"}</div>
                                    </div>
                                </a>
                            })
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default withNavigation(GenerateQrcode)