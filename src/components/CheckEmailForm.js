import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Wallpaper from './common/Wallpaper';
import { Logo } from './common';

class CheckEmailForm extends Component {

  render() {
    return (
      <Wallpaper>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center' }}
        >
          <Logo />
          <View
            style={{
              height: 30,
              marginHorizontal: 10,
              marginVertical: 5,
              paddingVertical: 5,
              justifyContent: 'flex-start',
              backgroundColor: 'transparent' }}
          >
            <Text style={styles.text}>
              We send invitation link to
            </Text>
          </View>
          <View
            style={{
              height: 30,
              marginHorizontal: 10,
              marginVertical: 5,
              paddingVertical: 5,
              justifyContent: 'flex-start',
              backgroundColor: 'transparent' }}
          >
            <Text style={styles.boldText}>
              {this.props.email}
            </Text>
          </View>
          <View
            style={{
              height: 30,
              marginHorizontal: 10,
              marginVertical: 5,
              paddingVertical: 5,
              justifyContent: 'flex-start',
              backgroundColor: 'transparent' }}
          >
            <Text style={styles.text}>
              Please, check it
            </Text>
          </View>
        </View>
      </Wallpaper>
    );
  }
}

const styles = {
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
  },
  boldText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
};

export default CheckEmailForm;
