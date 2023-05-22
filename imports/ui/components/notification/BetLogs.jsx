import React, { Component } from 'react'
import NotficationWatcher from '../../../api/classes/client/NotficationWatcher';

export default class BetLogs extends Component {
    constructor(props) {
        super(props)
        NotficationWatcher.setWatcher(this, 'BETLOGS')
    }

    componentDidMount() {
        NotficationWatcher.getBetLogs(false)
    }

    componentWillUnmount() {
        NotficationWatcher.clearDB("betlogs")
    }

    render() {
        NotficationWatcher.initiateWatch("BETLOGS");
        let logs = NotficationWatcher.BetData
        return (
            <div className="tab_main_div notification">
                {logs && logs.map((item) => (
                    <div key={item._id} className="card_link-2">
                        <div className="div-block-46">
                            <div>
                                <div className="div-block-79">
                                    <div className="race_number-2">{item.race.raceNo}</div>
                                    {/* <div className="live_text-2">LIVE</div> */}
                                </div>
                                <h5 className="heading-2 text-smaller">{item.race.raceLocation}</h5>
                                <div className="p_style_1-2">03/18/2022</div>
                            </div>
                        </div>
                        <div className="div-block-30 move-down">
                            <div className="text-block">{item.horse.horseName}</div>
                        </div>
                        {
                            item.win === "no_assign" ?
                                (
                                    <div className="bet_status_div-2 ongoing">
                                        <div>ONGOING</div>
                                    </div>
                                )
                                :
                                item.win ?
                                    (
                                        <div className="bet_status_div-2">
                                            <div>WIN</div>
                                        </div>
                                    )
                                    :
                                    (
                                        < div className="bet_status_div-2 lose">
                                            <div>LOSE</div>
                                        </div>
                                    )

                        }
                    </div>
                ))
                }
                {logs && logs.length === 0 &&
                    <div>No History Found!</div>
                }
                {logs && logs.length >= 10 &&
                    <div onClick={() => NotficationWatcher.getBetLogs(true)} className="card_link-2" style={{ display: 'flex', justifyContent: 'center' }}>
                        <a >{"Load More"}</a>
                    </div>
                }

                {/* <div data-w-id="5d90f7c4-b12b-a321-308c-9e85db2de3e5" className="card_link-2">
                    <div className="div-block-46">
                        <div>
                            <div className="div-block-79">
                                <div className="race_number-2">Race 04</div>
                                <div className="live_text-2">LIVE</div>
                            </div>
                            <h5 className="heading-2 text-smaller">Rosehills Gardens</h5>
                            <div className="p_style_1-2">03/18/2022</div>
                        </div>
                    </div>
                    <div className="div-block-30 move-down">
                        <div className="text-block">SONIC (IRE)</div>
                    </div>
                    <div className="bet_status_div-2">
                        <div>WIN</div>
                    </div>
                </div>
                <div data-w-id="5d90f7c4-b12b-a321-308c-9e85db2de409" className="card_link-2">
                    <div className="div-block-46">
                        <div>
                            <div className="div-block-79">
                                <div className="race_number-2">Race 04</div>
                                <div className="live_text-2">LIVE</div>
                            </div>
                            <h5 className="heading-2 text-smaller">Rosehills Gardens</h5>
                            <div className="p_style_1-2">03/18/2022</div>
                        </div>
                    </div>
                    <div className="div-block-30 move-down">
                        <div className="text-block">SONIC (IRE)</div>
                    </div>
                    <div className="bet_status_div-2 lose">
                        <div>LOSE</div>
                    </div>
                </div> */}
            </div >
        )
    }
}
