import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import UserInput from './UserInput';

export default class Form extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
          placeholder="Login"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
        />
        <UserInput
          secureTextEntry={true}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
