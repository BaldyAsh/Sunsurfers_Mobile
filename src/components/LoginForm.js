import React, { Component } from 'react';
import { KeyboardAvoidingView, AsyncStorage, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Button, Input, Spinner, Logo, Error } from './common';
import Wallpaper from './common/Wallpaper';
import Colors from '../helpers/Colors.js';
import DataManager from '../helpers/DataManager';

const {
  API
} = require('../helpers/Constants');
const axios = require('axios');

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: 'Sunsurfers', error: '', loading: false, authToken: '' };
  }

  componentWillMount() {
    console.log('Mounted 0.5');
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    this.authenticate(email, password)
      .then((authToken) => {
        console.log(authToken);
        this.onLoginSuccess(email, authToken).bind(this)
      })
      .catch((error) => {
        console.log(error);
        this.register(email, password)
          .then((authToken) => {
            console.log(authToken);
            this.onRegistrationSuccess(email, authToken).bind(this)
          })
          .catch((error) => {
            console.log(error);
            this.onLoginFail.bind(this)
          })
      })
  }

  authenticate = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        axios.post(API+'auth', {
          email: email,
        })
        .then(function (response) {
          console.log(response);
          resolve(response.data.data.authToken);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
      }, 10000);
    })
  }

  register = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        axios.post(API+'registration', {
          email: email,
        })
        .then(function (response) {
          console.log(response);
          resolve(response.data.data.authToken);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
      }, 10000);
    })
  }

  onLoginFail() {
    console.log('Authentication Failed');
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess = async (email, authToken) => {
    try {
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('TOKEN', authToken);
      const data = DataManager.getInstance();
      data.setUserEmail(email);
      data.setAuthToken(authToken);
      this.setState({
        email: '',
        password: '',
        loading: false,
        error: '',
        authToken: ''
      });
      Actions.tab1();
    } catch (error) {
      // Error saving data
    }
  }

  onRegistrationSuccess = async (email, authToken) => {
    try {
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('TOKEN', authToken);
      const data = DataManager.getInstance();
      data.setUserEmail(email);
      data.setAuthToken(authToken);
      this.setState({
        email: '',
        password: '',
        loading: false,
        error: '',
        authToken: ''
      });
      Actions.credForm();
    } catch (error) {
      // Error saving data
    }
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Send invite
      </Button>
    );
  }

  render() {
    return (
      <Wallpaper>
        <StatusBar
          barStyle="light-content"
        />
        <KeyboardAvoidingView
          style={styles.frame}
          behavior="padding"
        >
          <Logo />
          <Input
            borderColor={Colors.main}
            textColor='white'
            placeholderColor='white'
            placeholder="E-mail"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Error text={this.state.error} />
          {this.renderButton()}
        </KeyboardAvoidingView>
      </Wallpaper>
    );
  }
}

const styles = {
  frame: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default LoginForm;

