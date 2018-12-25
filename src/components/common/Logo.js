import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import logoImg from '../../images/logo.png';

const logoWidth = 70;
const logoHeight = 90;

const Logo = () => {
  const { container, image } = styles;
  return (
    <View style={container}>
      <Image source={logoImg} style={image} />
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

export { Logo };
