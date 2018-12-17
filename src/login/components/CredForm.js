import React, { Component } from 'react';
import {
  KeyboardAvoidingView
} from 'react-native';
import UserInput from '../views/UserInput';

const {
  inputsForm
} = require('../styles/InputsForm');

export default class CredForm extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={inputsForm.container}>
        <UserInput
          placeholder="Login"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
        />
        <UserInput
          secureTextEntry
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
      </KeyboardAvoidingView>
    );
  }
}
