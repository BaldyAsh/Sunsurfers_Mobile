import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { Button, Input, Spinner, Logo, Error } from './common';
import Wallpaper from './common/Wallpaper';

const {
  API
} = require('../helpers/Constants');

class LoginForm extends Component {
  state = { email: '', password: 'Sunsurfers', error: '', loading: false, authToken: '' };

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

    // fetch(API+'registration', {
    //      method: 'POST',
    //      headers: {
    //        Accept: 'application/json',
    //        'Content-Type': 'application/json'
    //      },
    //      body: JSON.stringify({
    //        email: this.state.email
    //      }),
    //   })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //      console.log(responseJson);
    //      let resp = JSON.parse();
    //      let authToken = resp.data.authToken;
    //      this.onLoginSuccess.bind(this)
    //   })
    //   .catch((error) => {
    //      this.onLoginFail.bind(this);
    //   });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onRegistrationSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    console.log('Authentication Failed');
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    console.log('Go to app');
    const email = this.state.email;
    const authToken = this.state.authToken;
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
      authToken: ''
    });
    Actions.mapForm({ email: email, authToken: authToken });
  }

  onRegistrationSuccess() {
    console.log('Go to cred');
    const email = this.state.email;
    const authToken = this.state.authToken;
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
      authToken: ''
    });
    Actions.credForm({ email: email, authToken: authToken });
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
        <KeyboardAvoidingView
          style={styles.frame}
          behavior="padding"
        >
          <Logo />
          <Input
            borderColor='#FBBF09'
            textColor='#FFFFFF'
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

// <Card>
//   <CardSection>
//     <Logo />
//   </CardSection>
//   <CardSection>
//     <Input
//       borderColor='#FBBF09'
//       textColor='#FFFFFF'
//       placeholderColor='white'
//       placeholder="E-mail"
//       label="Email"
//       value={this.state.email}
//       onChangeText={email => this.setState({ email })}
//     />
//   </CardSection>
//   <CardSection>
//     <Input
//       borderColor='#FBBF09'
//       textColor='#FFFFFF'
//       placeholderColor='white'
//       secureTextEntry
//       placeholder="Password"
//       label="Password"
//       value={this.state.password}
//       onChangeText={password => this.setState({ password })}
//     />
//   </CardSection>
//   <CardSection>
//     <Error text={this.state.error} />
//   </CardSection>
//   <CardSection>
//     {this.renderButton()}
//   </CardSection>
// </Card>
