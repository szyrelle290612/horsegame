import React, { Component } from 'react'
import AdminWatcher from '../../../api/classes/client/AdminWatcher';
import { Toast } from '../extra/Toast';

export default class HorseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: {}
        }
        AdminWatcher.setWatcher(this, "HORSELISTWATCHER")
    }
    componentDidMount() {
        AdminWatcher.listen("horse")
        AdminWatcher.getHorseList(false)
    }

    handleSearch(e) {
        AdminWatcher.getHorseList(true, e.target.value)
    }

    handleSelectHorse(item, index, e) {
        e.preventDefault()
        let horseNumberdata = this.state.number[`horseNumber${index}`]
        if (AdminWatcher.NewRace.horse.find(horse => horse.horseNumber == parseInt(horseNumberdata))) {
            return Toast({ text: "Number is Already Exist", type: "error" });
        }

        if (typeof horseNumberdata === 'string' && horseNumberdata.length) {
            let newhorse = {}
            const { horseName, trainerName, ownership, _id } = item
            newhorse = {
                horseId: _id,
                horseName,
                trainerName,
                ownership,
                horseNumber: parseInt(horseNumberdata)
            }
            AdminWatcher.setNewRace({ horse: [...AdminWatcher.NewRace.horse, newhorse] })
        }
    }

    handeChange(e) {
        let value = e.target.value
        let name = e.target.id
        let fields = this.state.number;
        fields[name] = value;
        this.setState({ fields });
    }

    render() {
        AdminWatcher.initiateWatch("HORSELISTWATCHER")
        let data = AdminWatcher.HorseData;
        let horse = AdminWatcher.NewRace.horse;
        return (
            <>
                <div style={{ display: 'flex' }}>
                    <div>search: </div>
                    <input onChange={this.handleSearch.bind(this)} />
                </div>
                <h5 className="heading-2 text-blue">Horses</h5>
                <div className="live_divide"></div>
                <div style={{ height: '400px', overflowY: 'auto' }}>
                    {/* {AdminWatcher.Config.isLoading && <LoadingSpinner />} */}
                    {data && data.map((item, index) => (
                        <div key={item._id} className="card_link">
                            <div className="div-block-37">
                                {!horse.find(x => x.horseId === item._id) &&
                                    <input id={`horseNumber${index}`} name={`horseNumber${index}`} onChange={this.handeChange.bind(this)} value={this.state.number[index]} type='number' min="1" max="2" maxLength="2" />
                                }
                                <div className="div-block-39">
                                    <h5 className="horse_name">{item.horseName}</h5>
                                    <div className="trainers">{item.trainerName}</div>
                                </div>
                            </div>
                            <div>
                                {/* <a onClick={() => this.handleHorseId(item)} className="btn_primary w-button">Select</a> */}
                            </div>
                            {!horse.find(x => x.horseId === item._id) &&
                                <a onClick={this.handleSelectHorse.bind(this, item, index)} className="btn_primary w-button">select</a>
                            }
                        </div>

                    ))}
                    {data.length === 0 ?
                        <div>No Record Found!</div>
                        :
                        <div onClick={() => AdminWatcher.getHorseList(true)} className="card_link-2" style={{ display: 'flex', justifyContent: 'center' }}>
                            <a >{"Load More"}</a>
                        </div>
                    }
                </div>
            </>

        )
    }
}
