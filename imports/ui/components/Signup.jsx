import React, { Component } from 'react'
import { withNavigation } from '../withNavigation'
import ClientWatcher from '../../api/classes/client/ClientWatcher';
import { Toast } from './extra/Toast';
import Utilities from '../../api/classes/Utilities';
import LoadingSpinner from './extra/LoadingSpinner';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            check: false
        }
        ClientWatcher.setWatcher(this, "SIGNUPWATCHER");
    }

    handleSubmit = async (e) => {
        e.preventDefault();


        if (Utilities.checkEmailFormat(ClientWatcher.UserNameAccount.email) === false || ClientWatcher.UserNameAccount.email === "") {
            return Toast({ text: "Email must be valid.", type: "warning" });
        }

        else if (ClientWatcher.UserNameAccount.password === "" || ClientWatcher.UserNameAccount.password.length < 8) {
            return Toast({ text: "Password must be at least 8 characters.", type: "warning" });
        }

        else if (!this.state.check) {
            Toast({ text: "Please agree to the Terms and Privacy Policy.", type: "warning" });

        } else {
            try {
                ClientWatcher.createUserAccount();

            } catch (err) {
                if (err?.message) {
                    Toast({ text: err?.message, type: "error" });
                } else {
                    Toast({ text: "Something went wrong.", type: "error" });
                }
            }
        }
    }
    render() {
        ClientWatcher.initiateWatch("SIGNUPWATCHER");

        if (ClientWatcher.UserNameAccount.isLoading) return <LoadingSpinner />;
        return (
            <div className="div-block-51 height_auto">
                <div className="screensize-2 height-auto">
                    <div className="container-2 height-auto">
                        <div className="main-content-2">
                            <div className="form-container-2">
                                <div className="div-block-2">
                                    <h3 className="form-title">Sign Up</h3>
                                    <div className="signup-form-div">
                                        <div className="w-form">
                                            <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form">
                                                <div className="form-control"><label htmlFor="name-2" className="field-label-2">First Name</label>
                                                    <input value={ClientWatcher.UserNameAccount.firstName} onChange={(e) => ClientWatcher.setUsers({ firstName: e.target.value })} type="text" className="text-field w-input" placeholder="" />
                                                </div>
                                                <div className="form-control"><label htmlFor="name-2" className="field-label-2">Last Name</label>
                                                    <input value={ClientWatcher.UserNameAccount.lastName} onChange={(e) => ClientWatcher.setUsers({ lastName: e.target.value })} type="text" className="text-field w-input" placeholder="" />
                                                </div>
                                                <div className="form-control"><label htmlFor="name-2" className="field-label-2">Email</label>
                                                    <input value={ClientWatcher.UserNameAccount.email} onChange={(e) => ClientWatcher.setUsers({ email: e.target.value })} type="email" className="text-field w-input" maxLength="256" placeholder="" id="name-2" />
                                                </div>
                                                <div className="form-control"><label htmlFor="email-2" className="field-label-2">Password</label>
                                                    <input value={ClientWatcher.UserNameAccount.password} onChange={(e) => ClientWatcher.setUsers({ password: e.target.value })} type="password" className="text-field w-input" maxLength="256" name="email-2" data-name="Email 2" placeholder="" id="email-2" required="" />
                                                    <p className="p-form text-center">Use 8 or more characters with a mix of letters, numbers, and symbols.</p>
                                                </div>
                                                <div className="div-block-55 checkboxk"><label className="w-checkbox checkbox-field-2">
                                                    <input onChange={(e) => this.setState({ check: e.target.checked })} type="checkbox" value={this.state.check} id="checkbox-2" name="checkbox-2" data-name="Checkbox 2" className="w-checkbox-input checkbox" />
                                                    <span className="checkbox-label w-form-label" htmlFor="checkbox-2">I agree to the <a href="#" className="form-span-link">Terms</a> and <a href="#" className="form-span-link">Privacy Policy</a>.</span></label></div>
                                                <div className="div-block-53">
                                                    <a className="sign-up-button w-button" onClick={this.handleSubmit.bind(this)}>Sign Up</a>
                                                </div>
                                                {/* <div className="div-block-54">
                                                    <p>or</p>
                                                    <div className="div-block-53">
                                                        <a href="#" className="google-sign-up w-button">Sign Up with Google</a>
                                                    </div>
                                                    <div className="div-block-53">
                                                        <a href="#" className="apple-sign-up w-button">Sign Up with Apple</a>
                                                    </div>
                                                </div> */}
                                                <div className="div-block-52">
                                                    <p className="p-form larger">Already have an account? <a onClick={() => this.props.navigate("/login")} className="p-form-link">Log in</a>
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
export default withNavigation(Signup);