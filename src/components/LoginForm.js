import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner, Logo } from './common';
import Wallpaper from './common/Wallpaper';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    Actions.mapForm();
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Wallpaper>
        <View style={styles.frame}>
          <Card>
            <CardSection>
              <Logo />
            </CardSection>
            <CardSection>
              <Input
                placeholder="E-mail"
                label="Email"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                placeholder="Password"
                label="Password"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </CardSection>
            <CardSection>
              <Text style={styles.errorTextStyle}>
                {this.state.error}
              </Text>
            </CardSection>
            <CardSection>
              {this.renderButton()}
            </CardSection>
          </Card>
        </View>
      </Wallpaper>
    );
  }
}

const styles = {
  frame: {
    top: 50,
    flex: 1,
    maxHeight: 500,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
