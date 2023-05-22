import React, { Component } from 'react'
import { withNavigation } from '../withNavigation'
import moment from 'moment'
import { subtract } from 'lodash'
import RecordWatcher from '../../api/classes/client/RecordWatcher'


class MatchHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: null
        }
        RecordWatcher.setWatcher(this, "MATCHHISTORYWATCHER")
    }
    componentDidMount() {
        RecordWatcher.getMatchHistory(false)
    }

    componentWillUnmount() {
        RecordWatcher.setclearDB()
    }
    render() {
        RecordWatcher.initiateWatch("MATCHHISTORYWATCHER")
        let record = RecordWatcher.MatchData
        return (
            <div className="main-content">
                <div className="sub-top-nav-2 hide">
                    <div></div>
                    <div className="credits-div-2"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/6238972bf3ea0b5941166dfd_home_icon_03.svg" loading="lazy" alt="" className="credit_icon" />
                        <div className="credits-number">10</div>
                        <div className="credit_text">credits</div>
                    </div>
                </div>
                <div className="home-main-content">
                    <div className="div-block-27">
                        <div className="div-block-48">
                            <div className="w-form">
                                <form id="email-form" name="email-form" data-name="Email Form" method="get">
                                    <div className="div-block-49"><label htmlFor="name" className="field-label">Select Date</label>
                                        <div className="div-block-12">
                                            <input type="date" onChange={(e) => this.setState({ date: e.target.value })} className="textfield-no-outline w-input" maxLength="256" name="name-2" data-name="Name 2" placeholder="" id="name-2" />
                                        </div>
                                        <div className="div-block-50">
                                            <a onClick={() => RecordWatcher.getMatchHistory(false, this.state.date)} className="btn_primary-2 w-button">Search</a>
                                        </div>
                                    </div>
                                </form>
                                <div className="w-form-done">
                                    <div>Thank you! Your submission has been received!</div>
                                </div>
                                <div className="w-form-fail">
                                    <div>Oops! Something went wrong while submitting the form.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="div-block-80">
                        <div className="div-block-43 margin-top-zero">
                            <h4 className="h3-2">Previous Races</h4>
                            <div className="div-block-44">
                            </div>
                        </div>

                        <div className="div-block-81">
                            {record && record.map((item) => (
                                <>
                                    {item.schedule && <div>{moment(item.schedule).calendar()}</div>}
                                    <a key={item._id} className="card_link-2 w-inline-block">
                                        <div>
                                            <div className="div-block-79">
                                                <div className="race_number-2">{item.raceNo}</div>
                                            </div>
                                            <h5 className="heading-2">{item.raceLocation}</h5>
                                            <div className="div-block-46"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/6238a7040d1b3e1a24a69b25_icon_medal.svg" loading="lazy" alt="" className="icon" />
                                                <div className="horsewinner_text-2">{item.winner}</div>
                                            </div>
                                        </div>
                                        {/* <div><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/6238a70452514855bab78ac1_arrow_icon_black_right.svg" loading="lazy" alt="" className="icon _w-30" /></div> */}
                                    </a>
                                </>
                            ))}
                            {record.length === 0 &&
                                <div>No Record Found!</div>
                            }
                            {
                                record.length >= 10 &&
                                <div onClick={() => RecordWatcher.getMatchHistory(true, this.state.date)} className="card_link-2" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <a >{"Load More"}</a>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withNavigation(MatchHistory);