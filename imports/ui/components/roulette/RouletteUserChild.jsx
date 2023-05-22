import React, { Component } from "react";
import { Wheel } from "react-custom-roulette";
import RouletteWatcher from "../../../api/classes/client/RouletteWatcher";
import PopUpModal from "../popup/PopUpModal";
import Lose from "../popup/Lose";
import SpinWin from "../popup/SpinWin";
import { withNavigation } from "../../withNavigation";
import AdminWatcher from "../../../api/classes/client/AdminWatcher";
import ClientWatcher from "../../../api/classes/client/ClientWatcher";
import NoCredit from "../popup/NoCredit";


class RouletteUserChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mustSpin: false,
            prizeNumber: 0,
            rouletteData: props.data,
            showModal: false,
            component: "",
            twoButton: false
        };
    }

    handleSpinClick = () => {
        let deduction = this.props.creditPerSpin
        let myBalance = ClientWatcher.Balance[0].profile.credit
        if (myBalance < deduction) return this.setState({ component: "nobalance", showModal: true, twoButton: false });
        RouletteWatcher.DeductCreditPerSpin(-deduction)
        const newPrizeNumber = Math.floor(Math.random() * this.props.data.length);
        this.setState({ prizeNumber: newPrizeNumber, mustSpin: true });
    };

    addShortString = () => {
        const addShortString = this.props.data.map((item) => {
            return {
                completeOption: item.text,
                status: item.status,
                option:
                    item.text.length >= 30
                        ? item.text.substring(0, 30).trimEnd() + "..."
                        : item.text
            };
        });
        this.setState({ rouletteData: addShortString });
    };

    componentDidMount() {
        this.addShortString();
    }

    handleShowModal = (e) => {
        this.setState(({ showModal }) => ({ showModal: !showModal }));
    };


    handleRedeem = () => {
        this.props.navigate('/reward')
    };


    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.addShortString();
        }
    }

    render() {
        const { mustSpin, prizeNumber, rouletteData } = this.state;
        let deduction = this.props.creditPerSpin

        return (
            <>
                <div align="center" className="roulette-container">
                    {!this.state.showModal && (
                        <Wheel
                            mustStartSpinning={mustSpin}
                            spinDuration={[0.5]}
                            prizeNumber={prizeNumber}
                            data={rouletteData}
                            outerBorderColor={["#ccc"]}
                            outerBorderWidth={[9]}
                            innerBorderColor={["#f2f2f2"]}
                            radiusLineColor={["tranparent"]}
                            radiusLineWidth={[1]}
                            textColors={["#f5f5f5"]}
                            textDistance={55}
                            fontSize={[16]}
                            backgroundColors={[
                                "#3f297e",
                                "#175fa9",
                                "#169ed8",
                                "#239b63",
                                "#64b031",
                                "#efe61f",
                                "#f7a416",
                                "#e6471d",
                                "#dc0936",
                                "#e5177b",
                                "#be1180",
                                "#871f7f"
                            ]}
                            onStopSpinning={() => {
                                this.setState({ mustSpin: false });
                                if (rouletteData[prizeNumber].status) {
                                    RouletteWatcher.CreateSpin(rouletteData[prizeNumber].status, rouletteData[prizeNumber].completeOption, this.props.storeId)
                                    this.setState({ component: "win", showModal: true, twoButton: true });
                                } else {
                                    RouletteWatcher.CreateSpin(rouletteData[prizeNumber].status, rouletteData[prizeNumber].completeOption)
                                    this.setState({ component: "lose", showModal: true, twoButton: false });
                                }
                            }}
                        />
                    )}
                </div>
                {
                    !this.state.mustSpin &&
                    <a className="btn_primary w-button" onClick={this.handleSpinClick}>
                        Spin
                    </a>
                }
                <p className="p_style_1 text-center">
                    Result: {!mustSpin ? rouletteData[prizeNumber].completeOption : "Loading..."}
                </p>
                <p className="p_style_1 text-center">
                    1 Spin = {deduction} Credit
                </p>
                {/* 
            status: {!mustSpin ? rouletteData[prizeNumber].status ? "WIN" : "LOSE" : "Loading..."} */}
                <PopUpModal
                    component={this.state.component == "lose" ? <Lose /> : this.state.component == "win" ? <SpinWin message={rouletteData[prizeNumber].completeOption} /> : <NoCredit />}
                    button2={this.state.twoButton}
                    show={this.state.showModal}
                    handleShowModal={this.handleShowModal}
                    handleConfirm={this.handleRedeem}
                    confirmLabel={"Redeem"}
                />

            </>


        );
    }
}

export default withNavigation(RouletteUserChild);
