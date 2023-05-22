import React from "react";
import { withTracker } from "meteor/react-meteor-data";
const watcherName = "login-watcher";
import withRouter from "../../withRouter";
import ClientWatcher from "../../../api/classes/client/ClientWatcher";

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        ClientWatcher.setWatcher(this, watcherName);
    }

    inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        ClientWatcher.setUsers({
            [name]: value
        });
    };

    componentWillUnmount() {
        ClientWatcher.reset({ forceRender: true });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        ClientWatcher.forgotPassword(ClientWatcher.UserNameAccount.email);
    };
    
    render() {
        return (
            <div className='div-block-25'>
                <div className='screensize'>
                    <div className="container">

                        <div className="div-block-48">
                            <div className="w-form" onSubmit={this.handleSubmit}>
                                <form id="email-form" name="email-form" data-name="Email Form" method="get">
                                    <div className="div-block-49" style={{ backgroundColor: '#fff' }}>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <br />
                                            <input
                                                required
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder=" Email here..."
                                                value={ClientWatcher.UserNameAccount["email"]}
                                                onChange={this.inputChange}
                                            />
                                        </div>

                                        <div className="div-block-50">
                                            <button type="submit" className="btn_primary-2 w-button">Submit</button>
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
                </div>
            </div>

        );
    }
}

export default withRouter(
    withTracker(() => {
        // make watcher start watching for changes on this component
        ClientWatcher.initiateWatch(watcherName);
    })(ForgotPassword)
);
