import React, { Component } from 'react';
import Logo from '../forms/Logo';
import Form from '../forms/Form';
import Wallpaper from '../forms/Wallpaper';
import ButtonSubmit from '../forms/ButtonSubmit';
import SignupSection from '../forms/SignupSection';
import { StyleSheet, View } from 'react-native';

export default class LoginScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <View style={styles.frame}>
          <Logo />
          <Form />
          <SignupSection />
          <ButtonSubmit />
        </View>
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  frame: {
    top: 50,
    flex: 1,
    maxHeight: 500,
  },
});
