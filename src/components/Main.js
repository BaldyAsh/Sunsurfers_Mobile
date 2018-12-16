import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import LoginScreen from './login/screens/LoginScreen';
import AppScreen from './app/screens/AppScreen';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="loginScreen"
            component={LoginScreen}
            animation='fade'
            hideNavBar={true}
            initial={true}
          />
          <Scene
            key="appScreen"
            component={AppScreen}
            animation='fade'
            hideNavBar={true}
          />
        </Scene>
      </Router>
    );
	}
}
