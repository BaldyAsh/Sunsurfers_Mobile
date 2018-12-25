import React from 'react';
import { TextInput, KeyboardAvoidingView, Text } from 'react-native';

const {
  DEVICE_WIDTH
} = require('../../helpers/Constants');

const Input = ({ borderColor, textColor, placeholderColor, label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <KeyboardAvoidingView behavior="padding" style={containerStyle}>
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
    </KeyboardAvoidingView>
  );
};

const styles = {
  inputStyle: {
    backgroundColor: 'transparent',
    width: DEVICE_WIDTH - 40,
    height: 50,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 25,
    borderWidth: 2
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2
  }
};

export { Input };
