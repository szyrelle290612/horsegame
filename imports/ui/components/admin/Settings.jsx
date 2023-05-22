import React, { Component } from 'react'
import AdminWatcher from '../../../api/classes/client/AdminWatcher';
import { withTracker } from "meteor/react-meteor-data";
import LoadingSpinner from '../extra/LoadingSpinner';
import { Toast } from '../extra/Toast';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            email: "",
            dailyReward: "",
            creditPerBet: "",
            creditPerSpin: "",
            betTimer: "",
            show: {
                show1: true,
                show2: true,
                show3: true,
                show4: true,
            }
        }
        AdminWatcher.setWatcher(this, "SETTINGSWATCHER");
    }


    handleSubmit = (data, e) => {
        e.preventDefault()
        switch (data) {
            case "daily":
                AdminWatcher.UpdateSetting({ dailyReward: this.state.dailyReward })
                this.setState(prevState => ({ show: { ...prevState.show, show1: true } }))
                break;
            case "credit":
                AdminWatcher.UpdateSetting({ creditPerBet: this.state.creditPerBet })
                this.setState(prevState => ({ show: { ...prevState.show, show2: true } }))
                break;
            case "spin":
                AdminWatcher.UpdateSetting({ creditPerSpin: this.state.creditPerSpin })
                this.setState(prevState => ({ show: { ...prevState.show, show3: true } }))
                break;
            case "timer":
                AdminWatcher.UpdateSetting({ betTimer: this.state.betTimer })
                this.setState(prevState => ({ show: { ...prevState.show, show4: true } }))
                break;
            // AdminWatcher.UpdateSetting()
        }
    }
    handleUpdateBalance() {
        AdminWatcher.UpdateBalance(this.state.balance, this.state.email)
        Toast({ text: "Balance Updated", type: "success" });
    }


    render() {
        AdminWatcher.initiateWatch("SETTINGSWATCHER");
        let storeSetting = AdminWatcher.SettingDBData[0]

        return (

            <div className='home-main-content'>
                <div className='div-block-27'>
                    <h4>Settings</h4>
                    <div className="div-block-48">
                        <div className="w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" method="get">
                                <div className="div-block-49" style={{ backgroundColor: '#fff' }}>
                                    <label htmlFor="name" className="field-label">Daily Reward Credit</label>
                                    <div className="div-block-12">
                                        <input disabled={this.state.show.show1} type="text" className="textfield-no-outline w-input" maxLength="256" name="name-2" data-name="Name 2" placeholder="" id="name-2" defaultValue={storeSetting?.dailyReward} onChange={(e) => this.setState({ dailyReward: parseInt(e.target.value) })} />
                                    </div>

                                    {
                                        this.state.show.show1 ? <a onClick={() => this.setState(prevState => ({ show: { ...prevState.show, show1: false } }))} className="btn_primary-2 w-button">Edit</a>
                                            :
                                            <>
                                                <button onClick={this.handleSubmit.bind(this, "daily")} className="btn_primary-2 w-button">Save</button>
                                                <button style={{ marginLeft: '10px' }} onClick={() => this.setState(prevState => ({ show: { ...prevState.show, show1: true } }))} className="btn_secondary-2 w-button">cancel</button>
                                            </>
                                    }

                                    <div className="live_divide"></div>
                                    <label htmlFor="name" className="field-label">Credit per bet</label>
                                    <div className="div-block-12">
                                        <input disabled={this.state.show.show2} type="text" className="textfield-no-outline w-input" maxLength="256" name="name-1" data-name="Name 2" placeholder="" id="name-2" defaultValue={storeSetting?.creditPerBet} onChange={(e) => this.setState({ creditPerBet: parseInt(e.target.value) })} />
                                    </div>
                                    {
                                        this.state.show.show2 ? <a onClick={() => this.setState(prevState => ({ show: { ...prevState.show, show2: false } }))} className="btn_primary-2 w-button">Edit</a>
                                            :
                                            <>
                                                <button onClick={this.handleSubmit.bind(this, "credit")} className="btn_primary-2 w-button">Save</button>
                                                <button style={{ marginLeft: '10px' }} onClick={() => this.setState(prevState => ({ show: { ...prevState.show, show2: true } }))} className="btn_secondary-2 w-button">cancel</button>
                                            </>
                                    }
                                    <div className="live_divide"></div>
                                    <label htmlFor="name" className="field-label">Credit per Spin</label>
                                    <div className="div-block-12">
                                        <input disabled={this.state.show.show3} type="text" className="textfield-no-outline w-input" maxLength="256" name="name-3" data-name="Name 2" placeholder="" id="name-2" defaultValue={storeSetting?.creditPerSpin} onChange={(e) => this.setState({ creditPerSpin: parseInt(e.target.value) })} />
                                    </div>
                                    {
                                        this.state.show.show3 ? <a onClick={() => this.setState(prevState => ({ show: { ...prevState.show, show3: false } }))} className="btn_primary-2 w-button">Edit</a>
                                            :
                                            <>
                                                <button onClick={this.handleSubmit.bind(this, "spin")} className="btn_primary-2 w-button">Save</button>
                                                <button style={{ marginLeft: '10px' }} onClick={() => this.setState(prevState => ({ show: { ...prevState.show, show3: true } }))} className="btn_secondary-2 w-button">cancel</button>
                                            </>
                                    }
                                    <div className="live_divide"></div>
                                    <label htmlFor="name" className="field-label">Close Betting Timer (min)</label>
                                    <div className="div-block-12">
                                        <input disabled={this.state.show.show4} type="text" className="textfield-no-outline w-input" maxLength="256" name="name-3" data-name="Name 2" placeholder="" id="name-2" defaultValue={storeSetting?.betTimer} onChange={(e) => this.setState({ betTimer: parseInt(e.target.value) })} />
                                    </div>
                                    {
                                        this.state.show.show4 ? <a onClick={() => this.setState(prevState => ({ show: { ...prevState.show, show4: false } }))} className="btn_primary-2 w-button">Edit</a>
                                            :
                                            <>
                                                <button onClick={this.handleSubmit.bind(this, "timer")} className="btn_primary-2 w-button">Save</button>
                                                <button style={{ marginLeft: '10px' }} onClick={() => this.setState(prevState => ({ show: { ...prevState.show, show3: true } }))} className="btn_secondary-2 w-button">cancel</button>
                                            </>
                                    }
                                    {/* <label htmlFor="name" className="field-label">Horse Selection per Race </label>
                                            <div className="div-block-12">
                                                <input type="text" className="textfield-no-outline w-input" maxLength="256" name="name-2" data-name="Name 2" placeholder="" id="name-2" defaultValue={setting[0].horseSelection} onChange={(e) => AdminWatcher.UpdateSetting({ horseSelection: e.target.value })} />
                                            </div> */}
                                    {/* <div className="div-block-50">
                                    <a href="#" className="btn_primary-2 w-button">Search</a>
                                </div> */}
                                </div>
                            </form>
                            <div className="w-form-done">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="w-form-fail">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                    </div >
                </div >
                <div className='div-block-27'>
                    <h4>Update balance User</h4>
                    <div className="div-block-48">
                        <div className="w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" method="get">
                                <div className="div-block-49" style={{ backgroundColor: '#fff' }}>
                                    <label htmlFor="name" className="field-label">Email</label>
                                    <input type='email' onChange={(e) => this.setState({ email: e.target.value })} />
                                    <label htmlFor="name" className="field-label">Credit</label>
                                    <input type='number' onChange={(e) => this.setState({ balance: e.target.value })} />
                                    <div className="div-block-31">
                                        <a onClick={this.handleUpdateBalance.bind(this)} className="btn_primary w-button">update</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        )

    }
}
export default Settings;