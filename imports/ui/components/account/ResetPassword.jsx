import React from "react";

import { withTracker } from "meteor/react-meteor-data";
const watcherName = "auth-watcher-reset-password";
import ClientWatcher from "../../../api/classes/client/ClientWatcher";
import withRouter from "../../withRouter";
import { withNavigation } from "../../withNavigation";
import { Toast } from "../extra/Toast";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        ClientWatcher.setWatcher(this, watcherName);
        this.state={
            password:"",
            password2:""
        }
    }

    inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        ClientWatcher.setUsers({
            [name]: value
        });
    };

    isMatchingPassword = () => {
        return this.state.password !== this.state.password2;
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { token } = this.props.params;

        if (this.isMatchingPassword()) {
            Toast({text:"Password and Confirm Password don't match!",type:'warning'});
        }

        try {
            const result = await ClientWatcher.resetPassword(token, this.state.password);
            ClientWatcher.reset({ forceRender: true });
            alert(result)
            this.props.navigate("/login");
        } catch (err) {
            alert("We are sorry but something went wrong.");
            this.props.navigate("/login");
            ClientWatcher.reset({ forceRender: true });
        }
    };

    render() {
        return (
            <div id="page-container">
                <div id="et-main-area">
                    <div id="main-content">
                        <div className="container">
                            <div id="content-area" className="clearfix">
                                <div id="left-area">
                                    <article id="post-130" className="post-130 page type-page status-publish hentry">
                                        <div className="entry-content">
                                            <div id="try"></div>
                                            <div className="row">
                                                <div className="col-md-6 col-md-offset-3">
                                                    <div className="page-header">
                                                        <h5>Enter your desired new password.</h5>
                                                    </div>
                                                    <div id="login-alert" />
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="form-group">
                                                            <label>New password</label>
                                                            <br />
                                                            <input
                                                                type="password"
                                                                id="password"
                                                                name="password"
                                                                className="form-control"
                                                                placeholder=" Password here..."
                                                                value={this.state.password}
                                                                onChange={this.inputChange}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Confirm password</label>
                                                            <br />
                                                            <input
                                                                type="password"
                                                                id="password2"
                                                                name="password2"
                                                                className="form-control"
                                                                placeholder=" Confirm password here..."
                                                                value={this.state.password2}
                                                                onChange={this.inputChange}
                                                            />
                                                        </div>
                                                        <p>
                                                            <button type="submit" id="login" className="btn btn-secondary">
                                                                Submit
                                                            </button>
                                                            <br />
                                                        </p>
                                                    </form>
                                                    <p />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigation(withRouter(ResetPassword));
