import React, { Component } from 'react'
import AdminWatcher from '../../../api/classes/client/AdminWatcher';
import { withTracker } from "meteor/react-meteor-data";
import BetWatcher from '../../../api/classes/client/BetWatcher';
import AssignWinner from './AssignWinner';
import PopUpModal from '../popup/PopUpModal';
import Settings from './Settings';
import CreateNewHorse from './CreateNewHorse';
import CreateNewRace from './CreateNewRace';

class RaceSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            balance: 0
        }
        AdminWatcher.setWatcher(this, "RACESCHEDULEWATCHER");
        BetWatcher.setWatcher(this, "RACESCHEDULEWATCHER");
    }

    handleShowModal = (id) => {
        AdminWatcher.setRaceId(id)
        this.setState(({ show }) => ({ show: !show }));
    };

    render() {
        AdminWatcher.initiateWatch("RACESCHEDULEWATCHER");
        BetWatcher.initiateWatch("RACESCHEDULEWATCHER");
        let loading = this.props.isLoading;
        let game = this.props.GameData;


        return (
            <>
                <div className='div-block-25'>
                    <div className='screensize'>
                        <div className="container">
                            <div className="home-main-content">
                                <div className='div-block-27'>
                                    {loading ? <div>Loading...</div>
                                        :
                                        <>
                                            <h4>Broadcast Manager</h4>
                                            {game && game.map((item, index) => (
                                                <div className='card_link ' key={index}>
                                                    {item.raceNo} <span>{item.raceLocation}</span>

                                                    {item.winner === "" ?
                                                        <div style={{ display: 'flex' }}>
                                                            {item.isLive ?
                                                                <div className="div-block-31">
                                                                    <a onClick={() => AdminWatcher.GoLive(item._id, false)} className="btn_primary-2 block secondary">Remove Live</a>
                                                                </div>
                                                                :
                                                                <div className="div-block-31">
                                                                    <a onClick={() => AdminWatcher.GoLive(item._id, true)} className="btn_primary w-button">Go Live</a>
                                                                </div>
                                                            }

                                                            <div className="div-block-31">
                                                                <a onClick={this.handleShowModal.bind(this, item._id)} className="btn_secondary w-button">Assign Winner</a>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="div-block-46"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/6238a7040d1b3e1a24a69b25_icon_medal.svg" loading="lazy" alt="" className="icon" />
                                                            <div className="horsewinner_text-2">{item.winner}</div>
                                                            <button onClick={() => AdminWatcher.UpdateWinner({ _id: item._id, horseName: "" })}>Undo</button>
                                                        </div>
                                                    }
                                                </div>
                                            ))
                                            }
                                        </>
                                    }
                                </div>
                                <div className='div-block-27'>
                                    <Settings />
                                </div>
                                {/* <div className='div-block-27'>
                                    <CreateNewHorse />
                                </div>
                                <div className='div-block-27'>
                                    <CreateNewRace />
                                </div> */}
                            </div>
                            <div className="bot-nav">

                                <a onClick={() => this.props.navigate('/home')} className="bot-nav-icon w-inline-block"><img src="images/Asset-103.svg" loading="lazy" alt="" /></a>
                                <a onClick={() => this.props.navigate('/notification')} className="bot-nav-icon w-inline-block"><img src="images/Asset-7.svg" loading="lazy" alt="" /></a>
                                <a onClick={() => this.props.navigate('/notification')} className="bot-nav-icon w-inline-block"><img src="images/Asset-7.svg" loading="lazy" alt="" /></a>
                                <a onClick={() => this.props.navigate('/game')} className="bot-nav-icon w-inline-block"><img src="images/Asset-102.svg" loading="lazy" alt="" /></a>
                            </div>
                        </div>
                    </div >
                </div >
                <PopUpModal
                    title={"Add New Teacher"}
                    component={<AssignWinner />}
                    show={this.state.show}
                    handleShowModal={this.handleShowModal}
                />
            </>
        )
    }

}

export default withTracker(({ }) => {
    const isReady = BetWatcher.getSubscribeGame();
    return { isLoading: !isReady, GameData: BetWatcher.GameDBData }
})(RaceSchedule)
