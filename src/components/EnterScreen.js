import React, { Component } from 'react';
import { AsyncStorage, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DataManager from '../helpers/DataManager';
import Wallpaper from './common/Wallpaper';

class EnterScreen extends Component {

  componentDidMount() {
    AsyncStorage.getItem('EMAIL').then((value) => {
      if (value !== null) {
        console.log(`email:${value}`);
        const data = DataManager.getInstance();
        data.setUserEmail(value);
        const emailCheck = data.getUserEmail();
        console.log(`email check:${emailCheck}`);
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
