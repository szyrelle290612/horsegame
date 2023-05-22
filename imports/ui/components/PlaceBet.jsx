import React, { Component } from 'react'
import { withNavigation } from '../withNavigation'
import BetWatcher from '../../api/classes/client/BetWatcher';
import LoadingSpinner from './extra/LoadingSpinner';

class PlaceBet extends Component {
    constructor(props) {
        super(props);
        BetWatcher.setWatcher(this, "PLACEBETWATCHER")

    }

    componentDidMount() {
        // const raceId = localStorage.getItem('raceId');
        BetWatcher.getHorseOnRace();
        BetWatcher.setConfig({ horse: "" })
    }

    componentDidUpdate() {
        const { raceId } = BetWatcher.Config.race;
        if (raceId === "") {
            this.props.navigate('/game')
        }
    }

    handleHorseId(data) {
        BetWatcher.setConfig({
            horse: {
                horseId: data.horseId,
                horseNumber: data.horseNumber,
                horseName: data.horseName
            }
        })
        this.props.navigate('/horse-stats')
    }
    render() {
        BetWatcher.initiateWatch("PLACEBETWATCHER");
        let data = BetWatcher.HorseList;

        return (
            <div className="div-block-21 auto">
                <div className="bet-screen-div">
                    <h5 className="heading-2 text-blue">Horses</h5>
                    <div className="live_divide"></div>
                    <div className="div-block-35">
                        {BetWatcher.Config.isLoading && <LoadingSpinner />}
                        {data && data.horse && data.horse.map((item, index) => (
                            <div key={item.horseId} className="div-block-36">
                                <div className="div-block-37">
                                    <div className="div-block-38">
                                        <div className="horse_number">{item.horseNumber}</div>
                                    </div>
                                    <div className="div-block-39">
                                        <h5 className="horse_name">{item.horseName}</h5>
                                        <div className="trainers">{item.trainerName}</div>
                                    </div>
                                </div>
                                <div>
                                    <a onClick={() => this.handleHorseId(item)} className="btn_primary w-button">Select</a>
                                </div>
                            </div>

                        ))}
                    </div>
                    <div className="live_divide"></div>
                    <div className="div-block-40">
                        <div className="div-block-41">
                            <div className="text-block-2">Alert Notification</div>
                            <div className="p_style_1">Alert me with results for this wager</div>
                        </div>
                        <div>
                            <a href="#" data-ix="toggle" className="togglebutton w-inline-block">
                                <div data-ix="toggle" data-w-id="f7895db5-145c-e474-af6c-2c75e9d4131a" className="togglebuttongreen"></div>
                                <div className="buttontoggle"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withNavigation(PlaceBet);