import {
 View, StatusBar, Image, TouchableWithoutFeedback
} from 'react-native';
import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';

import Colors from '../../helpers/Colors.js';
import usr from '../../images/user_icon.png';

class NavBar extends Component {
  render() {
    return (
      <View style={styles.backgroundStyle}>
        <StatusBar />
          <View style={styles.containerStyle}>
            <TouchableWithoutFeedback onPress={() => Actions.credScreen()}>
              <Image
              source={usr}
              style={styles.usrIconStyle}
              />
            </TouchableWithoutFeedback>
          </View>
      </View>
    );
  }

}
const styles = {
  usrIconStyle: {
    resizeMode: 'contain',
    flexDirection: 'row',
    width: 40,
    height: 40,
  },
  containerStyle: {
    top: 25,
    flexDirection: 'row',
    left: 10,
  },
  backgroundStyle: {
    backgroundColor: Colors.gray,
    height: 75
  },
  backarrowStyle: {
    resizeMode: 'contain',
    flexDirection: 'row',
    width: 50,
    height: 50,
    left: 0,
    justifyContent: 'flex-start'
  },
  helpStyle: {
    resizeMode: 'contain',
      width: 50,
      height: 50,
      left: 220,
      justifyContent: 'flex-end',
      position: 'relative'

  },
  settingStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    justifyContent: 'flex-end',
    position: 'relative',
    left: 210
  }
};


export default NavBar;

// <View style={styles.backgroundStyle}>
// <StatusBar />
// <View style={{ flexDirection: 'row' }}>
// <TouchableWithoutFeedback onPress={() => Actions.homeScreen()}>
// <Image
// source={require('../../images/logo.png')}
// style={styles.backarrowStyle} />
// </TouchableWithoutFeedback>
//
// <Image
// source={require('../../images/left-arrow.png')}
// style={styles.helpStyle} />
//
//
// <Image
// source={require('../../images/eye_black.png')}
// style={styles.settingStyle} />
// </View>
// </View>
