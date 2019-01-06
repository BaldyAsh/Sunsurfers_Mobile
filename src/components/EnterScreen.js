import React, { Component } from 'react';
import { AsyncStorage, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DataManager from '../helpers/DataManager';
import Wallpaper from './common/Wallpaper';

class EnterScreen extends Component {

  componentDidMount() {
    AsyncStorage.getItem('USER').then((value) => {
      if (value !== null) {
        console.log(`user:${value}`);
        const data = DataManager.getInstance();
        data.setUserEmail(value);
        const emailCheck = data.getUserEmail();
        console.log(`user check:${emailCheck}`);
        setTimeout(() => {
          Actions.tab1();
        }, 500);
      } else {
        setTimeout(() => {
          Actions.loginForm();
        }, 500);
      }
    });
  }

  render() {
    return (
      <Wallpaper>
        <StatusBar
          barStyle="light-content"
        />
      </Wallpaper>
    );
  }
}

export default EnterScreen;
