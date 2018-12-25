import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner, Logo } from './common';
import Wallpaper from './common/Wallpaper';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAK9MCG3l6dC2I85sepp1Vx8fPOOa0qzaQ',
      authDomain: 'sunsurfers-9dc7c.firebaseapp.com',
      databaseURL: 'https://sunsurfers-9dc7c.firebaseio.com',
      projectId: 'sunsurfers-9dc7c',
      storageBucket: 'sunsurfers-9dc7c.appspot.com',
      messagingSenderId: '902563320929'
    });
    console.log('Mounted 0.5');
  }

  componentDidMount() {
    console.log('Mounted 1');
  }

  componentWillUnmount() {
    console.log('Unmounted 1');
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onRegistrationSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    console.log('Authentication Failed')
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    console.log('Go to app');
    const email = this.state.email;
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    Actions.mapForm({ email: email });
  }

  onRegistrationSuccess() {
    console.log('Go to cred');
    const email = this.state.email;
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    Actions.credForm({ email: email });
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
                borderColor='#FBBF09'
                textColor='#FFFFFF'
                placeholderColor='white'
                placeholder="E-mail"
                label="Email"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </CardSection>
            <CardSection>
              <Input
                borderColor='#FBBF09'
                textColor='#FFFFFF'
                placeholderColor='white'
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
    alignItems: 'center',
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
