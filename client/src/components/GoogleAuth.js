import React from "react";
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '225861768353-4k47meveg5lqiu10063ehh6av067rceo.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn === true) {
            const profile = this.auth.currentUser.get().getBasicProfile();
            this.props.signIn(profile.getId(), profile.getName());
        }
        else {
            this.props.signOut();
        }
    }

    onSignInCLick = () => {
        this.auth.signIn();
    };
    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        }
        else if (this.props.isSignedIn) {

            return (
                <span>
                    Welcome <b>{this.props.username}</b> &nbsp;&nbsp;
                    <button onClick={this.onSignOutClick} className="ui red google button">
                        <i className="google icon" />
                        Sign out
                    </button>

                </span>

            );
        }
        else {
            return (
                <button onClick={this.onSignInCLick} className="ui green google button">
                    <i className="google icon" />
                    Sign in with google
                </button>


            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {

    return {
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId,
        username: state.auth.username
    };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);