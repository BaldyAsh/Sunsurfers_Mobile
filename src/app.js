import React, { Component } from 'react';
import { Image } from 'react-native';
import { Router, Scene, ActionConst, Tabs } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import MapForm from './components/MapForm';
import CredForm from './components/CredForm';
import CheckEmailForm from './components/CheckEmailForm';
import NavBar from './components/common/NavBar';

import locImg from './images/location.png';
import prfImg from './images/user.png';
import Colors from './helpers/Colors.js';

const LocTabIcon = () => {
  return (
    <Image
      source={locImg}
      style={{
        alignItems: 'center',
        resizeMode: 'stretch',
        alignSelf: 'center',
        height: 30,
        width: 30,
        color: 'white'
      }}
    />
  );
};

const PrfTabIcon = () => {
  return (
    <Image
      source={prfImg}
      style={{
        alignItems: 'center',
        resizeMode: 'stretch',
        alignSelf: 'center',
        height: 30,
        width: 30,
        color: 'white'
      }}
    />
  );
};

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
            <Scene
              key="checkEmailForm"
              component={CheckEmailForm}
              animation='fade'
              hideNavBar
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
          />
          <Scene
            key="credForm"
            component={CredForm}
            animation='fade'
            back={false}
            hideNavBar
          />
          <Scene
            key="tabs"
            tabs
            showLabel={false}
            swipeEnabled
            activeBackgroundColor={Colors.main}
            inactiveBackgroundColor="gray"
            inactiveTintColor="white"
            hideNavBar
            activeTintColor="white"
            initial
          >
            <Scene
              key="mapForm"
              component={MapForm}
              animation='fade'
              title='Location'
              icon={LocTabIcon}
              navBar={NavBar}
              back={false}
            />
            <Scene
              key="credForm"
              component={CredForm}
              animation='fade'
              title='Profile'
              icon={PrfTabIcon}
              navBar={NavBar}
              back={false}
            />
          </Scene>
          <Scene
            key="checkEmailForm"
            component={CheckEmailForm}
            animation='fade'
            hideNavBar
          />
        </Scene>
      </Router>
    );
  }
}

export default Sunsurfers;
