import React, { Component } from 'react'
import Nav from '../Nav'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import { withTracker } from "meteor/react-meteor-data";
import { withNavigation } from '../../withNavigation';
import ClientWatcher from '../../../api/classes/client/ClientWatcher';
import LoadingSpinner from '../extra/LoadingSpinner';
import NotFound from '../../Notfound';

class UserMainComponent extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {
        let privilage = this.props.allow
        let authUser = this.props.authUser

        if (authUser && authUser.includes(privilage)) {
            return (
                <div className="div-block-25">
                    <div className="screensize">
                        <div className="container">
                            <Nav />
                            <Outlet />
                            <Footer />
                        </div>
                    </div>
                </div>
            )
        } else {
            return this.props.navigate("/")
        }
    }
}
export default withTracker(() => {
    ClientWatcher.initiateWatch("NAVWATCHER");
    let authUser;
    let user = ClientWatcher.init();
    if (user[0]?.profile.roles) {
        authUser = user[0]?.profile.roles
    }
    return { authUser }
})(withNavigation(UserMainComponent))