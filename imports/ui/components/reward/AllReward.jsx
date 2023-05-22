import React, { Component } from 'react'
import RewardWatcher from '../../../api/classes/client/RewardWatcher'
import moment from 'moment'
import { withNavigation } from '../../withNavigation'
import RewardBarcode from '../RewardBarcode'
import PopUpModal from '../popup/PopUpModal'

class AllReward extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        RewardWatcher.setWatcher(this, "ALLREWARDWATCHER")
    }
    componentDidMount() {
        RewardWatcher.getReward(false, this.props.status)
    }

    handleUseReward(item, e) {
        e.preventDefault();
        RewardWatcher.setConfig({ coupon: item._id })
        this.props.navigate('/reward-barcode')
    }

    render() {
        RewardWatcher.initiateWatch("ALLREWARDWATCHER")
        let rewards = RewardWatcher.RewardData
        return (
            <>
                <div className="tab_main_div match-history">
                    <div className="div-block-72">
                        {/* <h5 className="h3">Today</h5>
                        <div className="live_divide"></div> */}
                        {rewards && rewards.map((item, index) => (
                            <div key={item._id} className={`card_link ${item.status == "used" && "disabled"}`} >
                                <div className="div-block-46">
                                    <div className={`image_div ${item.status == "used" ? "disabled" : item.status == "expired" ? "disabled" : ""}`}><img src={item.image} loading="lazy" alt="" /></div>
                                    <div>
                                        <div className="div-block-24">
                                            {item.type == "spin" && <div className="race_number">Daily Win</div>}
                                            {item.type == "bet" && <div className="race_number">Horse Race Win</div>}
                                        </div>
                                        <h5 className={`heading-2 text-smaller ${item.status == "used" || item.status == "expired" && "disabled"}`}>{item.description}</h5>
                                        <div className="div-block-31">

                                            {item.status == "available" &&
                                                <a aria-disabled onClick={this.handleUseReward.bind(this, item)} className={`btn_primary _w-110 w-button`}>Use Coupon</a>}
                                            {item.status == "used" &&
                                                <a aria-disabled className={`btn_primary disabled _w-110 w-button`}>Used</a>}
                                            {item.status == "expired" &&
                                                <a aria-disabled className={`btn_primary disabled _w-110 w-button`}>Expired</a>}
                                        </div>
                                    </div>
                                </div>
                                <div className="div-block-30">
                                    <div className="div-block-32">
                                        <div className="validity_label">Valid until: {moment.utc(item.validity).format("MMMM DD YYYY")}</div>
                                        {/* <div className="prize_amount">$2.98</div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 
                    <div className="div-block-73">
                        <h5 className="h3">Last week</h5>
                        <div className="live_divide"></div>
                    </div> */}
                    {rewards.length === 0 &&
                        <div>No Record Found!</div>
                    }
                    {rewards.length >= 10 &&
                        <div onClick={() => RewardWatcher.getReward(true, this.props.status)} className="card_link-2" style={{ display: 'flex', justifyContent: 'center' }}>
                            <a >{"Load More"}</a>
                        </div>
                    }
                </div >



            </>
        )
    }
}

export default withNavigation(AllReward)
