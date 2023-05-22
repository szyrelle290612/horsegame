import React from 'react';
import moment from 'moment';
import AdminWatcher from '../../../api/classes/client/AdminWatcher';
import BetWatcher from '../../../api/classes/client/BetWatcher';

class CountdownTimer extends React.Component {
    constructor(props) {

        super(props);
        BetWatcher.setWatcher(this, "BETWATCHERCOUNTDOWN");
        const targetDate = moment(this.props.schedule);
        const timeLeft = moment.duration(targetDate.diff(moment()));
        this.state = {
            timeLeft,
            countdownInterval: null
        };
    }

    componentDidMount() {
        const countdownInterval = setInterval(() => {
            const timeLeft = moment.duration(this.state.timeLeft.asMilliseconds() - 1000);
            this.setState({ timeLeft });
            BetWatcher.setTime({ ["index" + this.props.index]: timeLeft.asSeconds() <= AdminWatcher.SettingDBData[0].betTimer * 60 })
            if (timeLeft.asSeconds() <= 0) {
                clearInterval(this.state.countdownInterval);
            }
        }, 1000);

        this.setState({ countdownInterval });
    }

    componentWillUnmount() {
        clearInterval(this.state.countdownInterval);
    }

    render() {
        BetWatcher.initiateWatch("BETWATCHER");

        const { timeLeft } = this.state;

        return (
            timeLeft.asSeconds() >= 0 &&
            <div className="div-block-30">
                <div className='race_number'>start in {timeLeft.hours().toString().padStart(2, '0')}:{timeLeft.minutes().toString().padStart(2, '0')}:{timeLeft.seconds().toString().padStart(2, '0')}</div>
            </div>

        );
    }
}

export default CountdownTimer;
