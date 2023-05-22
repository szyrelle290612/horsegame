import React, { Component } from 'react'
import InsufficientCredit from './popup/InsufficientCredit'
import { withNavigation } from '../withNavigation'
import BetWatcher from '../../api/classes/client/BetWatcher';
import { withTracker } from "meteor/react-meteor-data";

class HomeScreen extends Component {
    render() {
        let mybet = this.props.MybetData;
        let loading = this.props.isLoading;

        return (
            <>
                <div className="home-main-content">
                    <div className="div-block-27">
                        <div className="div-block-13">
                            <div className="div-block-14">
                                <div style={{ paddingTop: '56.17021276595745%' }} className="w-embed-youtubevideo video-div">
                                    <iframe style={{ position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', pointerEvents: 'auto' }}
                                        src="https://www.youtube.com/embed/Ar9msmDo8NI?rel=0&amp;controls=0&amp;autoplay=1&amp;mute=0&amp;start=0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen="" title="Mornington Horse Races November 2016 - 4K Footage"></iframe>
                                </div>
                            </div>
                            <div className="div-block-29">
                                <div className="div-block-15">
                                    <div className="div-block-28">
                                        {/* <div className="track">Royal Handwick</div>
                                        <div className="race_number">Race 05</div> */}
                                    </div>
                                    <div className="div-block-28">
                                        {/* <div className="track">My Bet:</div>
                                        <div className="race_number">Sonic (IRE)</div> */}
                                    </div>
                                </div>
                                <div className="div-block-16">
                                    <div className="div-block-19">
                                        <a onClick={() => this.props.navigate('/game')} className="home_main_btn w-inline-block">
                                            <img src="images/Asset-40.svg" loading="lazy" alt="" className="icon_btn" />
                                            <div>Play horse race</div>
                                        </a>
                                        <a onClick={() => this.props.navigate('/roulette')} className="home_main_btn secondary w-inline-block">
                                            <img src="images/Asset-50.svg" loading="lazy" alt="" className="icon_btn _w-20" />
                                            <div>See other games</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation to other pages */}
                        <div className="div-block-17">
                            <a onClick={() => this.props.navigate('/match-history')} className="link-block w-inline-block">
                                <div className="div-block-20">
                                    <img src="images/Asset-2.svg" loading="lazy" alt="" /></div>
                                <div>Match History</div>
                            </a>
                            <a onClick={() => this.props.navigate('/upcoming-race')} className="link-block w-inline-block">
                                <div className="div-block-20">
                                    <img src="images/Asset-3.svg" loading="lazy" alt="" /></div>
                                <div>Race Schedule</div>
                            </a>
                            <a onClick={() => this.props.navigate('/reward')} className="link-block w-inline-block">
                                <div className="div-block-20">
                                    <img src="images/Asset-4.svg" loading="lazy" alt="" /></div>
                                <div>View All Winnings</div>
                            </a>
                        </div>
                    </div>

                    <div className="div-block-21 homescreen">
                        <h4 className="h2">My Bets</h4>
                        <div className="div-block-22">
                            {loading ? (<div>Loading...</div>) :
                                (mybet.length ?
                                    (
                                        mybet.map((item, index) => (
                                            <a key={item._id}
                                                // onClick={() => this.props.navigate('/mybet')} 
                                                className="card_link w-inline-block">
                                                <div>
                                                    <div className="div-block-24">
                                                        <div className="race_number">{item.race.raceNo}</div>
                                                        {/* <div className="live_text">LIVE</div> */}
                                                    </div>
                                                    <h5 className="heading-2">{item.race.raceLocation}</h5>
                                                </div>
                                                <div>
                                                    <div className="text-block">{item.horse.horseName}</div>
                                                </div>
                                            </a>
                                        ))
                                    )
                                    :
                                    (<div>No bets found</div>)
                                )
                            }
                        </div>
                    </div>
                </div>
                {/* <InsufficientCredit /> */}
            </>
        )
    }
}

export default withTracker(({ }) => {
    const isReady = BetWatcher.getSubscribeMyBet()
    return { isLoading: !isReady, MybetData: BetWatcher.MyBetDBData }
})(withNavigation(HomeScreen));