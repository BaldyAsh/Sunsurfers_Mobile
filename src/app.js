import React, { Component } from 'react';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import MapForm from './components/MapForm';
import CredForm from './components/CredForm';

class Sunsurfers extends Component {
  state = { loggedIn: null };

  // componentWillMount() {
  //   firebase.initializeApp({
  //     apiKey: 'AIzaSyAK9MCG3l6dC2I85sepp1Vx8fPOOa0qzaQ',
  //     authDomain: 'sunsurfers-9dc7c.firebaseapp.com',
  //     databaseURL: 'https://sunsurfers-9dc7c.firebaseio.com',
  //     projectId: 'sunsurfers-9dc7c',
  //     storageBucket: 'sunsurfers-9dc7c.appspot.com',
  //     messagingSenderId: '902563320929'
  //   });
  //
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ loggedIn: true });
  //     } else {
  //       this.setState({ loggedIn: false });
  //     }
  //   });
  // }

  // renderContent() {
  //   switch (this.state.loggedIn) {
  //     case true:
  //       return (
  //         <Button onPress={() => firebase.auth().signOut()}>
  //           Log Out
  //         </Button>
  //       );
  //     case false:
  //       return <LoginForm />;
  //     default:
  //       return <Spinner size="large" />;
  //   }
  // }

  render() {
    if (this.state.loggedIn) {
      return (
        <Router>
          <Scene key="root">
            <Scene
              key="loginForm"
              component={LoginForm}
              animation='fade'
              hideNavBar
            />
            <Scene
              key="credForm"
              component={CredForm}
              animation='fade'
              hideNavBar
            />
            <Scene
              key="mapForm"
              component={MapForm}
              animation='fade'
              hideNavBar
              initial
            />
          </Scene>
        </Router>
      );
    }
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="loginForm"
            component={LoginForm}
            animation='fade'
            hideNavBar
            initial
          />
          <Scene
            key="credForm"
            component={CredForm}
            animation='fade'
            hideNavBar
          />
          <Scene
            key="mapForm"
            component={MapForm}
            animation='fade'
            hideNavBar
          />
        </Scene>
      </Router>
    );
  }
}

export default Sunsurfers;
