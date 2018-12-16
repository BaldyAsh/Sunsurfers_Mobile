import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import logoImg from '../../../images/logo.png';

const logoWidth = 70;
const logoHeight = 90;

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: logoWidth,
    height: logoHeight,
  }
});
