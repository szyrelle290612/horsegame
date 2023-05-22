import React, { Component } from 'react'
import InputText from '../extra/InputText'
import AdminWatcher from '../../../api/classes/client/AdminWatcher';
import PopUpModal from '../popup/PopUpModal';
import HorseList from './HorseList';




export default class CreateNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHorseList: false,
            currentTab: false,
        }
        AdminWatcher.setWatcher(this, "CREATENEWWATCHER");
    }

    handleShowModal = (e) => {
        this.setState(({ showHorseList }) => ({ showHorseList: !showHorseList }));
    };

    handleSelectStore = (e) => {
        AdminWatcher.setNewRace({ storeId: e.target.value })
    }


    render() {
        AdminWatcher.initiateWatch("CREATENEWWATCHER");
        let storelist = AdminWatcher.SettingDBData
        return (
            <>
                <div className='div-block-27'>
                    <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" className="w-tabs">
                        <div className="tabs-menu w-tab-menu">
                            <a data-w-tab="Tab 1" onClick={() => this.setState({ currentTab: false })} className={`tab_style_1-2 rightedge w-inline-block w-tab-link ${!this.state.currentTab && 'w--current'}`}>
                                <div>New Race</div>
                            </a>
                            <a data-w-tab="Tab 2" onClick={() => this.setState({ currentTab: true })} className={`tab_style_1-2 rightedge w-inline-block w-tab-link ${this.state.currentTab && 'w--current'}`}>
                                <div>New Horse</div>
                            </a>
                        </div>
                        <div className="w-tab-content">
                            <div data-w-tab="Tab 1" className={`tab-pane w-tab-pane ${!this.state.currentTab && 'w--tab-active'}`}>
                                {!this.state.currentTab &&
                                    <div className="div-block-48" >
                                        <div className="w-form">
                                            <form onSubmit={AdminWatcher.handleSubmitRace}>
                                                <div className="div-block-49" style={{ backgroundColor: '#fff' }}>
                                                    <div style={{ border: '1px solid gray', padding: '30px', margin: '10px 0', borderRadius: '15px' }}>
                                                        <h4>Location & Schedule</h4>
                                                        <div className="live_divide"></div>
                                                        <InputText
                                                            label={"Location"}
                                                            type={"text"}
                                                            id={"raceLocation"}
                                                            name={"raceLocation"}
                                                            handleChange={AdminWatcher.handleChangeNewRace}
                                                            value={AdminWatcher.NewRace.raceLocation}
                                                            placeholder={"Ex : Mornington Racecourse"}
                                                            o
                                                        />
                                                        <InputText
                                                            label={"Live Link"}
                                                            type={"text"}
                                                            id={"videoLink"}
                                                            name={"videoLink"}
                                                            handleChange={AdminWatcher.handleChangeNewRace}
                                                            value={AdminWatcher.NewRace.videoLink}
                                                            placeholder={"Ex : 5qap5aO4i9A"}
                                                        />
                                                        <InputText
                                                            label={"Scheduled Date"}
                                                            type={"datetime-local"}
                                                            id={"schedule"}
                                                            name={"schedule"}
                                                            handleChange={AdminWatcher.handleChangeNewRace}
                                                            value={AdminWatcher.NewRace.schedule}
                                                            placeholder={"Ex : December 25, 2020"}
                                                        />
                                                        <InputText
                                                            label={"Race number"}
                                                            type={"number"}
                                                            id={"raceNo"}
                                                            name={"raceNo"}
                                                            handleChange={AdminWatcher.handleChangeNewRace}
                                                            value={AdminWatcher.NewRace.raceNo}
                                                            placeholder={"Ex : 1"}
                                                        />
                                                        <h4>Horse</h4>
                                                        {AdminWatcher.NewRace.horse && AdminWatcher.NewRace.horse.length > 0 && AdminWatcher.NewRace.horse.map((item, index) => (
                                                            <div key={index} className="div-block-36">
                                                                <div className="div-block-37">
                                                                    <div className="div-block-38">
                                                                        <div className="horse_number">{item.horseNumber}</div>
                                                                    </div>
                                                                    <div className="div-block-39" style={{ width: '200px' }}>
                                                                        <h5 className="horse_name">{item.horseName}</h5>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <a onClick={() => AdminWatcher.deleteHorse(index)} className="btn_primary w-button">Remove</a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <a className="btn_primary-2 w-button" onClick={this.handleShowModal.bind(this)}>+</a>
                                                    </div>
                                                    <div style={{ border: '1px solid gray', padding: '30px', margin: '10px 0', borderRadius: '15px' }}>
                                                        <h4>Prize</h4>
                                                        <div className="live_divide"></div>
                                                        <label htmlFor="name" className="field-label">Select Store</label>
                                                        <select value={AdminWatcher.NewRace.storeId} onChange={this.handleSelectStore.bind(this)}>
                                                            <option value="">Select Store</option>
                                                            {storelist && storelist.map((item, index) => (
                                                                <option key={index} value={item._id}>{item._id._str}</option>
                                                            ))}
                                                        </select>
                                                        <InputText
                                                            label={"Description"}
                                                            type={"text"}
                                                            id={"description"}
                                                            name={"description"}
                                                            handleChange={AdminWatcher.handleChangeNewRace}
                                                            value={AdminWatcher.NewRace.description}
                                                            placeholder={"Optional"}
                                                        />
                                                        <InputText
                                                            label={"Validity"}
                                                            type={"date"}
                                                            id={"validity"}
                                                            name={"validity"}
                                                            handleChange={AdminWatcher.handleChangeNewRace}
                                                            value={AdminWatcher.NewRace.validity}
                                                            placeholder={"Ex : 1"}
                                                        />
                                                        {/* <img style={{ width: '100px' }} src={this.state.file} />
                                                  <label htmlFor="name" className="field-label">Image</label>
                                                  <input id="dropzone-file" onChange={this.fileSelected.bind(this)} type="file" accept="pdf/*" className="hidden" /> */}
                                                    </div>
                                                    {AdminWatcher.Validation.error && (
                                                        <p className="field-label" style={{ color: "darkred" }}>
                                                            {AdminWatcher.Validation.error}
                                                        </p>
                                                    )}

                                                    {AdminWatcher.Validation.validate && (
                                                        <p className="field-label" style={{ color: "darkgreen" }}>
                                                            {AdminWatcher.Validation.validate}
                                                        </p>
                                                    )}
                                                    <div className="div-block-50">
                                                        <button type='submit' className="btn_primary-2 w-button">Submit</button>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>

                                }
                            </div>
                            <div data-w-tab="Tab 2" className={`tab-pane w-tab-pane ${this.state.currentTab && 'w--tab-active'}`}>
                                {this.state.currentTab &&
                                    <div className="div-block-48" >
                                        <div className="div-block-48">
                                            <div className="w-form">
                                                <form onSubmit={AdminWatcher.handleSubmit}>
                                                    <div className="div-block-49" style={{ backgroundColor: '#fff' }}>
                                                        <InputText
                                                            label={"Horse Name"}
                                                            type={"text"}
                                                            name={"horseName"}
                                                            id={"horseName"}
                                                            placeholder={"Ex : Black pegasus"}
                                                            handleChange={AdminWatcher.handleChangeNewHorse}
                                                            value={AdminWatcher.NewHorse.horseName}
                                                        />
                                                        <InputText
                                                            label={"Description"}
                                                            type={"text"}
                                                            id={"description"}
                                                            name={"description"}
                                                            placeholder={"Description"}
                                                            handleChange={AdminWatcher.handleChangeNewHorse}
                                                            value={AdminWatcher.NewHorse.description}
                                                        />
                                                        <InputText
                                                            label={"Trainer Name"}
                                                            type={"text"}
                                                            id={"trainerName"}
                                                            name={"trainerName"}
                                                            placeholder={"Ex : John doe"}
                                                            handleChange={AdminWatcher.handleChangeNewHorse}
                                                            value={AdminWatcher.NewHorse.trainerName}
                                                        />
                                                        <InputText
                                                            label={"win"}
                                                            type={"number"}
                                                            id={"win"}
                                                            name={"win"}
                                                            placeholder={"Ex : 1"}
                                                            handleChange={AdminWatcher.handleChangeNewHorse}
                                                            value={AdminWatcher.NewHorse.win}
                                                        />
                                                        <InputText
                                                            label={"runs"}
                                                            type={"number"}
                                                            id={"runs"}
                                                            name={"runs"}
                                                            placeholder={"Ex : 1"}
                                                            handleChange={AdminWatcher.handleChangeNewHorse}
                                                            value={AdminWatcher.NewHorse.runs}
                                                        />
                                                        <InputText
                                                            label={"place"}
                                                            type={"number"}
                                                            id={"place"}
                                                            name={"place"}
                                                            placeholder={"Ex : 1"}
                                                            handleChange={AdminWatcher.handleChangeNewHorse}
                                                            value={AdminWatcher.NewHorse.place}
                                                        />
                                                        <InputText
                                                            label={"Syndicate Name"}
                                                            type={"text"}
                                                            id={"syndicateName"}
                                                            name={"syndicateName"}
                                                            placeholder={"Ex : Fantooshers"}
                                                            handleChange={AdminWatcher.handleChangeNewHorse}
                                                            value={AdminWatcher.NewHorse.syndicateName}
                                                        />
                                                        <InputText
                                                            label={"Manager"}
                                                            type={"text"}
                                                            id={"manager"}
                                                            name={"manager"}
                                                            placeholder={"Ex : John doe"}
                                                            handleChange={AdminWatcher.handleChangeNewHorse}
                                                            value={AdminWatcher.NewHorse.manager}
                                                        />
                                                        <InputText
                                                            label={"Ownership %"}
                                                            type={"number"}
                                                            id={"ownerShip"}
                                                            name={"ownerShip"}
                                                            placeholder={"0-100%"}
                                                            handleChange={AdminWatcher.handleChangeNewHorse}
                                                            value={AdminWatcher.NewHorse.ownerShip}
                                                        />
                                                        {AdminWatcher.Validation.error && (
                                                            <p className="field-label" style={{ color: "darkred" }}>
                                                                {AdminWatcher.Validation.error}
                                                            </p>
                                                        )}

                                                        {AdminWatcher.Validation.validate && (
                                                            <p className="field-label" style={{ color: "darkgreen" }}>
                                                                {AdminWatcher.Validation.validate}
                                                            </p>
                                                        )}
                                                        <div className="div-block-50">
                                                            <button type="submit" className="btn_primary-2 w-button">Submit</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>

                <PopUpModal
                    component={<HorseList />}
                    show={this.state.showHorseList}
                    handleShowModal={this.handleShowModal} />
            </>
        )
    }
}
