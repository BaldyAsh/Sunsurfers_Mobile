import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const {
  DEVICE_WIDTH,
  MARGIN
} = require('../../helpers/Constants');

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle, container } = styles;

  return (
    <View style={container}>
      <TouchableOpacity
        onPress={onPress}
        style={buttonStyle}
        activeOpacity={1}
      >
        <Text style={textStyle}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textStyle: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    backgroundColor: 'transparent',
    paddingBottom: 10
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBBF09',
    height: MARGIN,
    width: DEVICE_WIDTH - 40,
    borderRadius: 20,
    zIndex: 100,
  }
};

export { Button };
