import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const logoWidth = 100;
const logoHeight = 100;

const Photo = ({ source }) => {
  const { container, image } = styles;
  return (
    <View style={container}>
      <Image source={source} style={image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'column',
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    alignItems: 'center'
  },
  image: {
    width: logoWidth,
    height: logoHeight,
  }
});

export { Photo };
