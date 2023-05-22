import React, { Component } from 'react'
import { withTracker } from "meteor/react-meteor-data";
import AdminWatcher from '../../../api/classes/client/AdminWatcher';

class AssignWinner extends Component {
    constructor(props) {
        super(props);
        AdminWatcher.setWatcher(this, "ASSIGNWINNERWATCHER");
    }

    componentDidMount() {
        AdminWatcher.getHorseOnRace();

    }

    render() {
        AdminWatcher.initiateWatch("ASSIGNWINNERWATCHER");
        let data = AdminWatcher.HorseOnRaceList;
        let selectedData = AdminWatcher.Config.selectedWinner
        return (
            <>
                <h4>Select Winner</h4>

                {data && data.horse.map((item, index) => (
                    <div key={item.horseId} className="div-block-36">
                        <div className="div-block-37">
                            <div className="div-block-38">
                                <div className="horse_number">{item.horseNumber}</div>
                            </div>
                            <div className="div-block-39" style={{ width: '200px' }}>
                                <h5 className="horse_name">{item.horseName}</h5>
                            </div>
                        </div>
                        <div>
                            {
                                selectedData?.horseName !== item.horseName ?
                                    <a onClick={() => AdminWatcher.setConfig({ selectedWinner: { _id: data._id._str, horseName: item.horseName } })} className="btn_primary w-button">Select</a>
                                    :
                                    <a className="btn_primary disabled w-button">Selected</a>
                            }
                        </div>
                    </div>
                ))
                }
            </>
        )
    }
}
export default withTracker(({ }) => {

})(AssignWinner);
