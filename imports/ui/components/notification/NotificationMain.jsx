import React, { Component } from 'react'
import NotificationLogs from './NotificationLogs'
import BetLogs from './BetLogs'

export default class NotificationMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: false
        }
    }

    render() {
        return (
            <div className="main-content">
                <div className="sub-top-nav-2 hide">
                    <div></div>
                    <div className="credits-div-2"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/6238972bf3ea0b5941166dfd_home_icon_03.svg" loading="lazy" alt="" className="credit_icon" />
                        <div className="credits-number">10</div>
                        <div className="credit_text">credits</div>
                    </div>
                </div>
                <div className="home-main-content justify_center">
                    <div className="div-block-27 notification">
                        <div>
                            <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" className="w-tabs">
                                <div className="tabs-menu w-tab-menu">
                                    <a data-w-tab="Tab 1" onClick={() => this.setState({ currentTab: false })} className={`tab_style_1-2 rightedge w-inline-block w-tab-link ${!this.state.currentTab && 'w--current'}`}>
                                        <div>Notifications</div>
                                    </a>
                                    <a data-w-tab="Tab 2" onClick={() => this.setState({ currentTab: true })} className={`tab_style_1-2 rightedge w-inline-block w-tab-link ${this.state.currentTab && 'w--current'}`}>
                                        <div>Bets</div>
                                    </a>
                                </div>
                                <div className="w-tab-content">
                                    <div data-w-tab="Tab 1" className={`tab-pane w-tab-pane ${!this.state.currentTab && 'w--tab-active'}`}>
                                        {!this.state.currentTab &&
                                            <NotificationLogs />
                                        }
                                    </div>
                                    <div data-w-tab="Tab 2" className={`tab-pane w-tab-pane ${this.state.currentTab && 'w--tab-active'}`}>
                                        {this.state.currentTab &&
                                            <BetLogs />
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
