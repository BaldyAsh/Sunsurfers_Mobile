import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const {
  DEVICE_HEIGHT
} = require('../../helpers/Constants');

const Photo = ({ source }) => {
  const { image } = styles;
  return (
    <View style={styles.ImageContainer}>
      <Image source={source} style={image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: DEVICE_HEIGHT * 0.2 / 2,
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    alignSelf: 'center',
    height: DEVICE_HEIGHT * 0.2,
    width: DEVICE_HEIGHT * 0.2,
  },
  ImageContainer: {
    borderRadius: DEVICE_HEIGHT * 0.2 / 2,
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: DEVICE_HEIGHT * 0.2,
    width: DEVICE_HEIGHT * 0.2,
  },
});

export { Photo };
