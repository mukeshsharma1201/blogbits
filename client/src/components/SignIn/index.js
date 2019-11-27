import React, { Component, useLayoutEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { SignInUser, toggleClose, toggleOpen } from '../../redux/actions/actions';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';

ReactModal.setAppElement('#root');
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccess: function(authResult) {
      console.log('signInSuccess', authResult);
      toggleClose();
      // var user = authResult.user;
      // var credential = authResult.credential;
      // var isNewUser = authResult.additionalUserInfo.isNewUser;
      // var providerId = authResult.additionalUserInfo.providerId;
      // var operationType = authResult.operationType;
      //push('/');
      return true;
    },
    signInFailure: function(error) {
      push('/');
    },
  },
};

class SignInWith extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      prevUser: firebase.auth().currentUser,
    };
  }

  handleOpenModal = () => {
    this.props.toggleOpen();
    this.setState({ showModal: true });
  };

  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ prevUser: null });
      })
      .catch(error => {
        console.log('Error Signing Out : ', error);
      });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    this.props.toggleClose();
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    //No Previous User found
    // if (!this.state.prevUser) {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('onAuthStateChanged user >>>', user);
        this.props.SignInUser({
          name: user.displayName,
          uid: user.uid,
          provider_pic: user.photoURL,
          username: user.email,
          role: 'Author',
          authtoken: user.refreshToken,
        });
        // this.props.toggleClose();
        this.setState({ prevUser: user });
      } else {
        console.log('No User Found', firebase.auth().currentUser);
      }
    });
    // }
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    // if(this.unregisterAuthObserver){
    this.unregisterAuthObserver();
    // }
  }

  render() {
    return (
      <div>
        {/* {this.state.prevUser ? <Button onClick={this.signOutUser}>Sign Out</Button> : null} */}
        {this.props.modalMode ? (
          <ReactModal
            isOpen={this.props.modalMode}
            contentLabel='Sign In/ Sign Up'
            onRequestClose={this.handleCloseModal}
          >
            <Button onClick={this.handleCloseModal}>Close Modal</Button>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </ReactModal>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    modalMode: state.common.modalMode,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    toggleClose,
    toggleOpen,
    SignInUser,
    push,
  })(SignInWith),
);
