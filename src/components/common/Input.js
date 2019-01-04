import React from 'react';
import { TextInput } from 'react-native';

const {
  DEVICE_WIDTH
} = require('../../helpers/Constants');

const Input = ({ borderColor,
                 textColor,
                 placeholderColor,
                 value,
                 onChangeText,
                 placeholder,
                 secureTextEntry }) => {
  const { inputStyle } = styles;

  return (
    <TextInput
      borderColor={borderColor}
      color={textColor}
      placeholderTextColor={placeholderColor}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCorrect={false}
      style={inputStyle}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = {
  inputStyle: {
    height: 50,
    fontSize: 20,
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 5,
    width: DEVICE_WIDTH - 60,
    borderRadius: 25,
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
  }
};

export { Input };
