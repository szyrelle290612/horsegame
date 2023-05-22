import React, { Component } from 'react'
import { withTracker } from "meteor/react-meteor-data";
import ClientWatcher from '../../api/classes/client/ClientWatcher';
import BetWatcher from '../../api/classes/client/BetWatcher';

class SubTopNav extends Component {
    constructor(props) {
        super(props);
        ClientWatcher.setWatcher(this, "SUBTOPNAVWATCHER");
    }
    render() {
        ClientWatcher.initiateWatch("SUBTOPNAVWATCHER");
        let balance = this.props.balance
        return (
            <div className="main-content">
                <div className="sub-top-nav">
                    {/* <div className="div-block-56">
                        <div data-hover="false" data-delay="0" className="video-dropdown w-dropdown">
                            <div className="video-dropdown-toggle w-dropdown-toggle">
                                <div className="video-dropdown-icon w-icon-dropdown-toggle"></div>
                                <div className="div-block-57">
                                    <div className="play-icon-small">
                                        <img src="images/Asset-90.svg" loading="lazy" alt="" /></div>
                                    <div className="text-block-3">Watching</div>
                                    <div className="race-name">Royal Handwick</div>
                                    <div className="race-number">Race 05</div>
                                </div>
                            </div>
                            <nav className="w-dropdown-list">
                                <a href="#" className="w-dropdown-link">Link 1</a>
                                <a href="#" className="w-dropdown-link">Link 2</a>
                                <a href="#" className="w-dropdown-link">Link 3</a>
                            </nav>
                        </div>
                    </div> */}
                    <div className="credits-div"><img src="images/Asset-10a.svg" loading="lazy" alt="" className="credit_icon" />
                        <div className="credits-number">{balance}</div>
                        <div className="credit_text">credits</div>
                    </div>
                </div>
                {this.props.Component}
            </div>

        )
    }
}
export default withTracker(({ }) => {
    let balance = 0
    if (ClientWatcher.Balance && ClientWatcher.Balance[0] && ClientWatcher.Balance[0].profile.credit) {
        balance = ClientWatcher.Balance[0].profile.credit
    }

    return { balance }
})(SubTopNav);