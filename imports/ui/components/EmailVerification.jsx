import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import ClientWatcher from "../../api/classes/client/ClientWatcher";
import withRouter from "../withRouter";


class EmailVerification extends React.Component {
    constructor(props) {
        super(props);
        ClientWatcher.setWatcher(this, "EMAILVERIFICATIONWATCHER");
    }

    componentDidMount() {
        this.verifyEmail();
    }

    verifyEmail = async () => {
        const { token } = this.props.params;
        try {
            await ClientWatcher.verifyEmail(token);
            alert("Email verified successfully.")
            window.location.href = "/login";
        } catch (err) {
            alert("Email verification failed.")
            window.location.href = "/login";
        }
    };

    render() {
        return <div>Loading...</div>
    }
}

export default withRouter(
    withTracker(() => {
        ClientWatcher.initiateWatch("EMAILVERIFICATIONWATCHER");
    })(EmailVerification)
);
