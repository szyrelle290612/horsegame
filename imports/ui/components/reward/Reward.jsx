import React, { Component } from 'react'
import AllReward from './AllReward'

export default class Reward extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 0x1
        }
    }

    render() {
        return (
            <div className="rewards-list-main ">
                {/* <div className="div-block-77">
                        <p className="p_style_1">Total winnings worth</p>
                        <div className="div-block-70">
                            <div className="dollar-sign">$</div>
                            <div className="total-winnings-worth">1008.94</div>
                        </div>
                    </div> */}

                <div>
                    <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" className="w-tabs">
                        <div className="tabs-menu w-tab-menu">
                            <a data-w-tab="Tab 1" onClick={() => this.setState({ activeTab: 0x1 })} className={`tab_style_1 leftedge w-inline-block w-tab-link ${this.state.activeTab === 0x1 && "w--current"} `}>
                                <div>All</div>
                            </a>
                            <a data-w-tab="Tab 2" onClick={() => this.setState({ activeTab: 0x2 })} className={`tab_style_1 w-inline-block w-tab-link ${this.state.activeTab === 0x2 && "w--current"} `}>
                                <div>Available</div>
                            </a>
                            <a data-w-tab="Tab 3" onClick={() => this.setState({ activeTab: 0x3 })} className={`tab_style_1 w-inline-block w-tab-link ${this.state.activeTab === 0x3 && "w--current"}`}>
                                <div>Used</div>
                            </a>
                            <a data-w-tab="Tab 4" onClick={() => this.setState({ activeTab: 0x4 })} className={`tab_style_1 rightedge w-inline-block w-tab-link ${this.state.activeTab === 0x4 && "w--current"}`}>
                                <div>Expired</div>
                            </a>
                        </div>
                        <div className="w-tab-content">
                            {/* tab 1 */}

                            <div data-w-tab="Tab 1" className={`tab-pane w-tab-pane ${this.state.activeTab === 0x1 && "w--tab-active"}`}>
                                {this.state.activeTab === 0x1 &&
                                    <AllReward status={"all"} />
                                }
                            </div>

                            {/* tab 2 */}
                            <div data-w-tab="Tab 2" className={`tab-pane w-tab-pane ${this.state.activeTab === 0x2 && "w--tab-active"}`}>
                                {this.state.activeTab === 0x2 &&
                                    <AllReward status={"available"} />
                                }
                            </div>
                            {/* tab 3 */}
                            <div data-w-tab="Tab 3" className={`tab-pane w-tab-pane ${this.state.activeTab === 0x3 && "w--tab-active"}`}>
                                {this.state.activeTab === 0x3 &&
                                    <AllReward status={"used"} />
                                }
                            </div>
                            {/* tab 4 */}
                            <div data-w-tab="Tab 4" className={`tab-pane w-tab-pane ${this.state.activeTab === 0x4 && "w--tab-active"}`}>
                                {this.state.activeTab === 0x4 &&
                                    <AllReward status={"expired"} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
