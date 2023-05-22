import React, { Component } from 'react'
import { withNavigation } from '../withNavigation'
import { withTracker } from "meteor/react-meteor-data";
import NotficationWatcher from '../../api/classes/client/NotficationWatcher';
import Bell from './extra/Bell';

class Footer extends Component {
    constructor(props) {
        super(props);
        NotficationWatcher.setWatcher(this, "NOTIFICATIONWATCHER");
    }

    render() {
        let totalNotif = this.props.TotalNotify;
        let Loading = this.props.isLoading;
        return (
            <div className="bot-nav">
                <a onClick={() => this.props.navigate('/game')} className="bot-nav-icon w-inline-block"><img src="images/Asset-5.svg" loading="lazy" alt="" /></a>
                <a onClick={() => this.props.navigate('/home')} className="bot-nav-icon w-inline-block"><img src="images/Asset-6.svg" loading="lazy" alt="" /></a>
                <a onClick={() => this.props.navigate('/notification')} className="bot-nav-icon w-inline-block"><Bell bell={totalNotif} /></a>
            </div>
        )
    }
}
export default withTracker(({ }) => {
    NotficationWatcher.initiateWatch("NOTIFICATIONWATCHER");
    const isReady = NotficationWatcher.getSubscribeNotify();
    return { isLoading: !isReady, TotalNotify: NotficationWatcher.NotifyDBData }
})(withNavigation(Footer));