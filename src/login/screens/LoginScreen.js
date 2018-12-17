import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../views/Logo';
import CredForm from '../components/CredForm';
import Wallpaper from '../views/Wallpaper';
import ButtonSubmit from '../components/ButtonSubmit';
import SignupSection from '../components/SignupSection';

export default class LoginScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <View style={styles.frame}>
          <Logo />
          <CredForm />
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
