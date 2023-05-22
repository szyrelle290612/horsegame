import React, { Component } from 'react'
import { withNavigation } from '../withNavigation'
import ClientWatcher from '../../api/classes/client/ClientWatcher'
import { Toast } from './extra/Toast'
import LoadingSpinner from './extra/LoadingSpinner'
import { withTracker } from 'meteor/react-meteor-data';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        ClientWatcher.setWatcher(this, "LOGINWATCHER");
    }

    componentDidUpdate(prevProps) {
        if (this.props.user && !prevProps.user) {
            let privilages = this.props.user.profile.roles;

            if ((privilages.includes("admin"))) {
                this.props.navigate("/admin-live")
            }
            if ((privilages.includes("user"))) {
                this.props.navigate("/home")
            }
        }
    }

    handleLogin = async (e) => {
        ClientWatcher.setLoading(true);
        try {
            await ClientWatcher.loginWithPassword(this.state.email, this.state.password)
            let user = ClientWatcher.init();
            if (user[0]?.profile.roles.includes("user") && user[0]?.emails[0]?.verified) {
                this.props.navigate("/home")
                Toast({ text: `Welcome ${user[0].profile.email}`, type: "success" });
            };
            if (user[0]?.profile.roles.includes("admin") && user[0]?.emails[0]?.verified) {
                this.props.navigate("/admin-live")
            };
            if (!user[0]?.emails[0]?.verified) {
                Toast({ text: "Please verify your email.", type: "error" });
            }
            ClientWatcher.setLoading(false);
        } catch (err) {
            if (err?.message) {
                Toast({ text: err?.message, type: "error" });
            } else {
                Toast({ text: "Something went wrong.", type: "error" });
            }
            ClientWatcher.setLoading(false);
        }
    }
    render() {
        ClientWatcher.initiateWatch("LOGINWATCHER");
        if (ClientWatcher.UserNameAccount.isLoading || this.props.loading) return <LoadingSpinner />
        return (
            <div className="div-block-51 height_auto">
                <div className="screensize-2 height-auto">
                    <div className="container-2 height-auto">
                        <div className="main-content-2">
                            <div className="form-container-2">
                                <div className="div-block-2">
                                    <h3 className="form-title">Log In</h3>
                                    <div className="signup-form-div-2">
                                        <div className="w-form">
                                            <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form">
                                                <div className="form-control"><label htmlFor="name" className="field-label-2">Email</label>
                                                    <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} type="text" className="text-field w-input" maxLength="256" name="name" data-name="Name" placeholder="" id="name" /></div>
                                                <div className="form-control"><label htmlFor="email" className="field-label-2">Password</label>
                                                    <input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type="password" className="text-field w-input" maxLength="256" name="email" data-name="Email" placeholder="" id="email" required="" />
                                                    <a onClick={() => this.props.navigate('/forgotpassword')} className="link">Forgot Password</a>
                                                </div>
                                                <div className="div-block-53" onClick={this.handleLogin.bind(this)}>
                                                    <a className="sign-up-button w-button">Log In</a>
                                                </div>
                                                <div className="div-block-54">
                                                    {/* <p className="p-form">or</p>
                                                    <div className="div-block-53">
                                                        <a href="#" className="google-sign-up w-button">Log In with Google</a>
                                                    </div>
                                                    <div className="div-block-53">
                                                        <a href="#" className="apple-sign-up w-button">Log In with Apple</a>
                                                    </div> */}
                                                </div>
                                                <div className="div-block-52">
                                                    <p className="p-form larger">Don&#x27;t have an account?
                                                        <a onClick={() => this.props.navigate('/signup')} className="p-form-link">Sign Up</a>
                                                    </p>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default withTracker(() => {
    ClientWatcher.initiateWatch("LOGINWATCHER");
    const isReady = ClientWatcher.getSubscribeUser()

    return {
        user: ClientWatcher.user(),
        loading: !isReady
    };
})(withNavigation(Login));

