import React from 'react';
import { StyleSheet, Image } from 'react-native';

const {
  DEVICE_HEIGHT
} = require('../../helpers/Constants');

const Photo = ({ source }) => {
  const { image } = styles;
  return (
    <Image source={source} style={image} />
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: 20,
    width: DEVICE_HEIGHT * 0.1,
  }
});

export { Photo };
