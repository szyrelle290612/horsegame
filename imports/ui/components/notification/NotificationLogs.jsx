import React, { Component } from 'react'
import NotficationWatcher from '../../../api/classes/client/NotficationWatcher';
import moment from 'moment';

export default class NotificationLogs extends Component {
    constructor(props) {
        super(props)
        NotficationWatcher.setWatcher(this, 'LOGS')
    }
    componentDidMount() {
        NotficationWatcher.getLogs(false)
    }

    componentWillUnmount() {
        NotficationWatcher.clearDB("logs")
        NotficationWatcher.AlreadySeen();
    }

    renderImage(status) {
        switch (status) {
            case 'Success':
                return <div className="image_div-2 notif_imagtion"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/62398b3b50eca65c3a29387f_notification_icon_01.svg" loading="lazy" alt="" /></div>
            case 'placebet':
                return <div className="image_div-2 notif_imagtion"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/623977dc28b4e09a9e35c08b_pop_up_04.svg" loading="lazy" alt="" /></div>
            case 'Congrats':
                return <div className="image_div-2 notif_imagtion"><img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/62398b3bc859ef4b882e4af3_notification_icon_02.svg" loading="lazy" alt="" /></div>
            case 'credit_redeem':
                return <div className="image_div-2 notif_imagtion" > <img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/62398b3b1b365c5e24125474_notification_icon_03.svg" loading="lazy" alt="" /></div >
            default:
                return <div className="image_div-2 notif_imagtion" > <img src="https://uploads-ssl.webflow.com/623844b9c48492f6b2d6d1c3/62398b3b1b365c5e24125474_notification_icon_03.svg" loading="lazy" alt="" /></div >
        }
    }

    render() {
        NotficationWatcher.initiateWatch('LOGS')
        let logs = NotficationWatcher.LogData
        return (
            <div className="tab_main_div notification">

                {logs && logs.map((item) => (
                    <a key={item._id} data-w-id="5d90f7c4-b12b-a321-308c-9e85db2de38f" href="#" className={`card_link-2 ${!item.seen && "bg-gold"} w-inline-block`}>
                        <div className="div-block-46">
                            {this.renderImage(item.status)}
                            <div>
                                <h5 className={`heading-2 ${!item.seen && "text-white"}`}>{item.title}</h5>
                                <div className={`p_style_1-2 ${!item.seen && "text-white"}`}>{item.status == "credit_redeem" && item.credit} {item.description}</div>
                                <div className={`race_number-2 ${!item.seen && "text-white"}`}>{moment(item.createdAt).startOf().fromNow()}</div>
                            </div>
                        </div>
                    </a >))
                }

                {logs && logs.length === 0 &&
                    <div>No Notification found!</div>
                }
                {logs && logs.length >= 10 &&
                    <div onClick={() => NotficationWatcher.getLogs(true)} className="card_link-2" style={{ display: 'flex', justifyContent: 'center' }}>
                        <a >{"Load More"}</a>
                    </div>
                }


            </div >
        )
    }
}
