import React, { Component } from 'react'
import PopUpModal from '../popup/PopUpModal';
import AdminWatcher from '../../../api/classes/client/AdminWatcher';
import BetWatcher from '../../../api/classes/client/BetWatcher';
import { withTracker } from "meteor/react-meteor-data";
// import React, { Component } from 'react'
// import AdminWatcher from '../../../api/classes/client/AdminWatcher';
// import { withTracker } from "meteor/react-meteor-data";
// import BetWatcher from '../../../api/classes/client/BetWatcher';
import AssignWinner from './AssignWinner';
import CreateNew from './CreateNew';
// import PopUpModal from '../popup/PopUpModal';
// import Settings from './Settings';
// import CreateNewHorse from './CreateNewHorse';
// import CreateNewRace from './CreateNewRace';
class Broadcast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            balance: 0
        }
        AdminWatcher.setWatcher(this, "BROADCASTWATCHER");
        BetWatcher.setWatcher(this, "BROADCASTWATCHER");
    }

    handleShowModal = (id) => {
        AdminWatcher.setRaceId(id)
        this.setState(({ show }) => ({ show: !show }));
        AdminWatcher.reset({ forceRender: true })
    };

    componentDidMount() {
        AdminWatcher.getGame(false)
        AdminWatcher.listen("races")
    }

    handleDate(e) {
        AdminWatcher.setConfig({ date: e.target.value })
        AdminWatcher.getGame(false)
    }

    handleConfirm = () => {
        AdminWatcher.UpdateWinner()
        this.setState({ show: false })

    }

    render() {
        AdminWatcher.initiateWatch("BROADCASTWATCHER");
        BetWatcher.initiateWatch("BROADCASTWATCHER");
        let game = AdminWatcher.RacesData
        let store = AdminWatcher.SettingDBData[0]
        return (
            <>
                <div className='home-main-content'>
                    <div className='div-block-27'>
                        {AdminWatcher.Config.isLoading ? <div>Loading...</div>
                            :
                            <>
                                <div>
                                    <h4>Broadcast Manager</h4>
                                    {/* <p>Store ID: {store?._id._str}</p> */}
                                    <input type='date' value={AdminWatcher.Config.date} onChange={this.handleDate.bind(this)} />
                                </div>
                                <div className="live_divide"></div>
                                <div className="div-block-35" style={{ overflowY: 'auto', width: '100%' }}>
                                    {game && game.map((item, index) => (
                                        <div className='card_link ' key={index}>
                                            <div>
                                                <div className="div-block-24">
                                                    <div className="race_number" >{item.raceNo}</div>
                                                </div>
                                                <h5 className="heading-2" >{item.raceLocation}</h5>
                                                {item.winner === "" ?
                                                    <>
                                                        {/* <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                            <input value={item.videoLink} placeholder='Live link: ex. adgsx21' />
                                                            <button>Update</button>
                                                        </div> */}
                                                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                                                            {item.isLive ?
                                                                <div className="div-block-31" >
                                                                    <button onClick={() => AdminWatcher.GoLive(item._id, false)} >UnLive</button>
                                                                </div>
                                                                :
                                                                <div className="div-block-31" >
                                                                    <button onClick={() => AdminWatcher.GoLive(item._id, true)} >Go Live</button>
                                                                </div>
                                                            }

                                                            <div className="div-block-31" >
                                                                <button onClick={this.handleShowModal.bind(this, item._id)} >Assign Winner</button>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="div-block-46" ><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/6238a7040d1b3e1a24a69b25_icon_medal.svg" loading="lazy" alt="" className="icon" />
                                                            <div className="horsewinner_text-2">{item.winner}</div>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                                                            {/* <button onClick={() => AdminWatcher.UpdateWinner({ _id: item._id, horseName: "" })}>Undo</button> */}
                                                            {/* <div className="div-block-31" >
                                                            <button onClick={() => AdminWatcher.sendToAllWinner(item._id)} >Send</button>
                                                        </div> */}
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    ))
                                    }
                                    {game.length == 0 && <div>No Schedule Found!</div>}
                                </div>

                            </>
                        }
                    </div >
                    <CreateNew />
                </div>
                <PopUpModal
                    component={<AssignWinner />}
                    show={this.state.show}
                    button2={true}
                    handleShowModal={this.handleShowModal}
                    handleConfirm={this.handleConfirm}
                    confirmLabel={"Confirm"}
                />
            </>
        );
    }
}

export default withTracker(({ }) => {
})(Broadcast)
