import React, { Component } from 'react';
import { withNavigation } from '../withNavigation';
import { withTracker } from "meteor/react-meteor-data";
import BetWatcher from '../../api/classes/client/BetWatcher';
import moment from 'moment';
import LoadingSpinner from './extra/LoadingSpinner';
import AdminWatcher from '../../api/classes/client/AdminWatcher';
import CountdownTimer from './extra/CountdownTimer';

class GameScreen extends Component {
    constructor(props) {
        super(props);
        BetWatcher.setWatcher(this, "BETWATCHERGAMESCREEN");
        AdminWatcher.setWatcher(this, "ADMINWATCHER");
    }

    handleHorseList(item, e) {
        e.preventDefault()
        BetWatcher.setConfig({
            race: {
                storeId: item.storeId,
                raceId: item._id,
                raceLocation: item.raceLocation,
                schedule: item.schedule,
                raceNo: item.raceNo
            }
        })
        // const id = { id: BetWatcher.Config.race.raceId }
        // localStorage.setItem('raceId', id)
        this.props.navigate('/placebet')
    }

    videoSelected(item, e) {
        e.preventDefault();
        BetWatcher.setVideoSelected({
            raceLocation: item.raceLocation,
            raceNo: item.raceNo,
            description: item.description,
            videoLink: item.videoLink,
            isLive: item.isLive,
            winner: item.winner,
        })
    }


    render() {
        BetWatcher.initiateWatch("BETWATCHERGAMESCREEN");
        AdminWatcher.initiateWatch("ADMINWATCHER");
        let loading = this.props.isLoading;
        let game = this.props.GameData;

        return (
            <div className="div-block-21">
                <h4 className="h2">Today</h4>
                <div className="div-block-22">
                    {loading ? <LoadingSpinner /> :
                        game && game.map((item, index) => {

                            return (
                                <div key={index} className={`card_link `} onClick={this.videoSelected.bind(this, item)} >
                                    <div>
                                        <div className="div-block-24">
                                            <div className="race_number" >{item.raceNo}</div>
                                        </div>
                                        <h5 className="heading-2" >{item.raceLocation}</h5>
                                        {item.winner ?
                                            <div className="div-block-46"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/6238a7040d1b3e1a24a69b25_icon_medal.svg" loading="lazy" alt="" className="icon" />
                                                <div className="horsewinner_text-2" >{item.winner}</div>
                                            </div>
                                            :
                                            !BetWatcher.Time?.["index" + index] &&
                                            <div className="div-block-31">
                                                <a aria-disabled onClick={this.handleHorseList.bind(this, item)} className="btn_primary w-button">Bet</a>
                                            </div>}
                                    </div>
                                    <div className="div-block-30">
                                        {item.winner !== "" ?
                                            < div className="live_text inactive">GAME END</div>
                                            :
                                            (item.isLive ?
                                                <div>
                                                    <div className="live_text">LIVE</div>
                                                </div>
                                                :
                                                <div>
                                                    <div className="live_text inactive">LIVE</div>
                                                </div>
                                            )

                                        }
                                        {(item.winner === "" && !item.isLive) &&
                                            <CountdownTimer index={index} schedule={item.schedule} />
                                        }
                                        <div className="div-block-32">
                                            <div className="race_number">Grand Prize</div>
                                            <div className="prize_amount">{item.prize}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    {game.length === 0 &&
                        < div >
                            No Schedule for Today
                        </div>}
                </div>
            </div >
        )
    }
}
export default withTracker(({ }) => {
    BetWatcher.initiateWatch("BETWATCHER");
    const isReady = BetWatcher.getSubscribeGame();
    return { isLoading: !isReady, GameData: BetWatcher.GameDBData }
})(withNavigation(GameScreen));