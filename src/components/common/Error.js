import React from 'react';
import { View, Text } from 'react-native';

import Colors from '../../helpers/Colors.js';

const {
  DEVICE_WIDTH
} = require('../../helpers/Constants');

const Error = ({ text }) => {
  const { errorTextStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={errorTextStyle}>
        {text}
      </Text>
    </View>
  );
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: Colors.error
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    width: DEVICE_WIDTH - 60
  }
};

export { Error };
