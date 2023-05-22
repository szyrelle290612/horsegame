import React, { Component } from 'react'
import AdminWatcher from '../../../api/classes/client/AdminWatcher'
import { withTracker } from "meteor/react-meteor-data";
import { withNavigation } from '../../withNavigation';
import RouletteUserChild from './RouletteUserChild';
class RouletteUserParent extends Component {
    constructor(props) {
        super(props)
        AdminWatcher.setWatcher(this, "ADMINWATCHER");
    }

    render() {
        AdminWatcher.initiateWatch("ADMINWATCHER");
        let settingRoulette = this.props.setting[0]
        let loading = this.props.isLoading

        if (loading) {
            return <div>Loading...</div>
        }
        return (
            <>
                <div className="rewards-barcode-main-content">
                    <div className="popup-div barcode">
                        <h5 className="heading-2 text-blue text-center product-name">Spin The Wheel</h5>
                        <div className="div-block-96">
                            <div className="div-block-47 reward">
                                <RouletteUserChild data={settingRoulette.rouletteSettings} storeId={settingRoulette._id._str} creditPerSpin={settingRoulette.creditPerSpin} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default withTracker(() => {
    AdminWatcher.initiateWatch("NAVWATCHER");
    const isReady = AdminWatcher.getSubscribeSettings();
    return { isLoading: !isReady, setting: AdminWatcher.SettingRoulette }
})(withNavigation(RouletteUserParent))
