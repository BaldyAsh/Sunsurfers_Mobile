import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Colors from '../../helpers/Colors.js';

const {
  DEVICE_WIDTH
} = require('../../helpers/Constants');

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      activeOpacity={1}
    >
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    paddingTop: 10,
    backgroundColor: 'transparent',
    paddingBottom: 10
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.main,
    width: DEVICE_WIDTH - 60,
    borderRadius: 25,
    zIndex: 100,
    height: 50,
    marginHorizontal: 10,
    marginVertical: 5,
  }
};

export { Button };
