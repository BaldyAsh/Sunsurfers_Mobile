import React from 'react';
import { StyleSheet, Image } from 'react-native';

import logoImg from '../../images/logo.png';

const {
  DEVICE_HEIGHT
} = require('../../helpers/Constants');

const Logo = () => {
  const { image } = styles;
  return (
    <Image source={logoImg} style={image} />
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: 20,
    height: DEVICE_HEIGHT * 0.2,
  }
});

export { Logo };
