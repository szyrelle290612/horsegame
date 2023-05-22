import React, { Component } from 'react'
import BetWatcher from '../../../api/classes/client/BetWatcher'

export default class Live extends Component {
    constructor(props) {
        super(props)
        BetWatcher.setWatcher(this, "LIVEWATCHER")
    }
    render() {
        BetWatcher.initiateWatch("LIVEWATCHER");
        const { isLive, videoLink, raceNo, raceLocation, description, winner } = BetWatcher.VideoSelect;
        return (

            <div className="game-screen-main-content">
                <div className="div-block-27 wider">
                    <div className="div-block-13">
                        <div className="div-block-14 game-screen">
                            <div style={{ paddingTop: '56.17021276595745%' }} className="w-embed-youtubevideo video-div">
                                <iframe src={(isLive && videoLink) ? `https://www.youtube.com/embed/${videoLink}?rel=0&amp;controls=0&amp;autoplay=1&amp;mute=0&amp;start=0` : ""} frameBorder="0" style={{ position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', pointerEvents: 'auto' }} allow="autoplay; encrypted-media" allowFullScreen="" title="Mornington Horse Races November 2016 - 4K Footage"></iframe></div>
                        </div>
                        <div className="div-block-29">
                            <div className="div-block-59">
                                <div className="div-block-58">
                                    {winner !== "" ?
                                        < div className="live_text inactive">GAME END</div>
                                        :
                                        (isLive ?
                                            <div>
                                                <div className="live_text">LIVE</div>
                                            </div>
                                            :
                                            <div>
                                                <div className="live_text inactive">LIVE</div>
                                            </div>
                                        )

                                    }
                                    <div className="race_number larger">{raceNo}</div>
                                    <h5 className="heading-2 larger">{raceLocation}</h5>

                                </div>
                                <div className="div-block-61">
                                    <div className="race_number larger">Grand Prize</div>
                                    <div className="div-block-60">
                                        <div className="prize_amount larger">{description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.Component}
            </div >
        )
    }
}
