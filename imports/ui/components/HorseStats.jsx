import React, { Component } from 'react'
import BetConfirm from './popup/BetConfirm'
import BetWatcher from '../../api/classes/client/BetWatcher';
import PopUpModal from './popup/PopUpModal';
import LoadingSpinner from './extra/LoadingSpinner';
import ClientWatcher from '../../api/classes/client/ClientWatcher';
import AdminWatcher from '../../api/classes/client/AdminWatcher';
import NoCredit from './popup/NoCredit';
import { withNavigation } from '../withNavigation';

class HorseStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            showAlert: false
        }
        BetWatcher.setWatcher(this, "HORSESTATSWATCHER");
        AdminWatcher.setWatcher(this, "HORSESTATSWATCHER");
    }

    componentDidMount() {
        BetWatcher.getHorseDetails();
    }

    componentDidUpdate() {
        const { raceId } = BetWatcher.Config.race;
        if (raceId === "") {
            this.props.navigate('/game')
        }
    }


    handleShowModal = (e) => {
        this.setState(({ showAlert }) => ({ showAlert: !showAlert }));
    };

    SubmitBet = (e) => {
        e.preventDefault();
        let requiredBet = AdminWatcher.SettingDBData[0].creditPerBet
        let myBalance = ClientWatcher.Balance[0].profile.credit
        if (requiredBet > myBalance) {
            this.setState({ showAlert: true })
            this.setState({ showComponent: true })
            return
        } else {
            BetWatcher.placeBet(requiredBet);
        }

    }
    render() {
        BetWatcher.initiateWatch("HORSESTATSWATCHER");
        AdminWatcher.initiateWatch("HORSESTATSWATCHER");
        let horseData = BetWatcher.HorseDetails
        let requiredBet = AdminWatcher.SettingDBData[0]?.creditPerBet
        let isAlreadyBet = BetWatcher.Config.isAlreadyBet
        return (
            <>
                {BetWatcher.Config.isLoading && <LoadingSpinner />}
                <div className="main-content">
                    <div className="select-horse-main-content">
                        <div className="horse-image"><img src="images/horse-image.png" loading="lazy" sizes="(max-width: 479px) 55vw, (max-width: 767px) 35vw, (max-width: 991px) 30vw, 25vw" srcSet="images/horse-image-p-500.png 500w, images/horse-image.png 618w" alt="" /></div>
                        <div className="horse-stats-div">
                            <h5 className="heading-2 text-blue larger">{horseData?.horseName}</h5>
                            <div className="p_style_1">{horseData?.description}</div>
                            <div className="horse-stats-container">
                                <div className="div-block-66">
                                    <div className="stats-text">runs</div>
                                    <div className="stats-text">{horseData?.runs}</div>
                                </div>
                                <div className="div-block-66">
                                    <div className="stats-text">wins</div>
                                    <div className="stats-text">{horseData?.win}</div>
                                </div>
                                <div className="div-block-66">
                                    <div className="stats-text">places</div>
                                    <div className="stats-text">{horseData?.places}</div>
                                </div>
                                <div className="div-block-66">
                                    <div className="stats-text">TFR</div>
                                    <div className="stats-text">108</div>
                                </div>
                            </div>
                            <div className="live_divide"></div>
                            <div className="div-block-67">
                                <div className="div-block-69">
                                    <div className="div-block-68">
                                        <div className="p_style_1 lighter">Trainer name</div>
                                    </div>
                                    <div className="div-block-95">
                                        <div className="p_style_1">{horseData?.trainerName}</div>
                                    </div>
                                </div>
                                <div className="div-block-69">
                                    <div className="div-block-68">
                                        <div className="p_style_1 lighter">Syndicate name</div>
                                    </div>
                                    <div className="div-block-95">
                                        <div className="p_style_1">{horseData?.syndicateName}</div>
                                    </div>
                                </div>
                                <div className="div-block-69">
                                    <div className="div-block-68">
                                        <div className="p_style_1 lighter">Manager</div>
                                    </div>
                                    <div className="div-block-95">
                                        <div className="p_style_1">{horseData?.manager}</div>
                                    </div>
                                </div>
                                <div className="div-block-69">
                                    <div className="div-block-68">
                                        <div className="p_style_1 lighter">Ownership</div>
                                    </div>
                                    <div className="div-block-95">
                                        <div className="p_style_1">{horseData?.ownership}</div>
                                    </div>
                                </div>

                                <h5>Credit:{requiredBet}</h5>

                            </div>
                            <div className="div-block-42 v2 horse-stat">
                                <div className="_40 _w-48">
                                    <a onClick={() => this.props.navigate(-1)} className="btn_primary block secondary w-button">Back</a>
                                </div>
                                <div className="_40 _w-48">
                                    {!isAlreadyBet &&
                                        < a data-w-id="1f257936-bd9e-62ec-d207-5787dc3361dd" onClick={this.SubmitBet.bind(this)} className="btn_primary block w-button">Place Bet</a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                <PopUpModal
                    component={this.state.showComponent ? <NoCredit /> : <BetConfirm />}
                    show={this.state.showAlert}
                    handleShowModal={this.handleShowModal}
                />
            </>


        )
    }
}
export default withNavigation(HorseStats)