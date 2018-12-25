import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner, Photo } from './common';
import Wallpaper from './common/Wallpaper';
import { Actions } from 'react-native-router-flux';
import photoImg from '../images/photo.png';

const {
  DEVICE_WIDTH,
  MARGIN
} = require('../helpers/Constants');

class CredForm extends Component {
  state = { login: '', firstname: '', secondname: '', loading: false, error: '', pictureUrl: '' };

  componentDidMount() {
    console.log('Mounted 2');
    console.log(this.props.email);
  }

  componentWillUnmount() {
    console.log('Unmounted 2');
  }

  onButtonPress() {
    const { username, firstname, secondname, pictureUrl, city } = this.state;

    this.setState({ error: '', loading: true });

    this.onLoginSuccess()
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(this.onLoginSuccess.bind(this))
    //   .catch(() => {
    //     firebase.auth().createUserWithEmailAndPassword(email, password)
    //       .then(this.onRegistrationSuccess.bind(this))
    //       .catch(this.onLoginFail.bind(this));
    //   });
  }

  onLoginFail() {
    console.log('Wrong login')
    this.setState({ error: 'Wrong login', loading: false });
  }

  onLoginSuccess() {
    console.log('Go to app');
    const email = this.props.email;
    this.setState({
      login: '',
      firsname: '',
      secondname: '',
      city: '',
      pictureUrl: '',
      loading: false,
      error: ''
    });
    //Actions.mapForm();
    Actions.mapForm({ email: email });
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

  changePhoto = async () => {
    console.log('photo changed!');
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({
        pictureUrl: result.uri
      });
    }
  }

  render() {
    const { pictureUrl } = this.state;
    return (
      <View style={styles.background}>
        <View style={styles.frame}>
          <Card>
            <CardSection>
              <View
                style={{
                  justifyContent: 'flex-start',
                  height: 40,
                  flex: 1,
                  backgroundColor: 'transparent' }}
              >
              <Text style={styles.topHeaderTextStyle}>
                Welcome to #sunsurfers!
              </Text>
            </View>
            </CardSection>
            <CardSection>
              <View
                style={{
                  justifyContent: 'flex-start',
                  height: 40,
                  flex: 1,
                  backgroundColor: 'transparent' }}
              >
                <Text style={styles.botHeaderTextStyle}>
                  Please fill this form :)
                </Text>
              </View>
            </CardSection>
            <CardSection>
              <TouchableHighlight onPress={() => this.changePhoto()}>
                {pictureUrl ? (
                  <Photo
                    source={pictureUrl}
                    onPress={this.changePhoto}
                  />
                ) : photoImg}
              </TouchableHighlight>
            </CardSection>
            <CardSection>
              <View
                style={{
                  justifyContent: 'flex-start',
                  height: 40,
                  flex: 1,
                  backgroundColor: 'transparent' }}
              >
                <Text style={styles.addPhotoTextStyle}>
                  Add photo
                </Text>
              </View>
            </CardSection>
            <CardSection>
              <Input
                borderColor='#979797'
                textColor='#333333'
                placeholderColor='#979797'
                placeholder='Login'
                label='Login'
                value={this.state.login}
                onChangeText={login => this.setState({ login })}
              />
            </CardSection>
            <CardSection>
              <Input
                borderColor='#979797'
                textColor='#333333'
                placeholderColor='#979797'
                placeholder='First name'
                label='First name'
                value={this.state.firstname}
                onChangeText={firstname => this.setState({ firstname })}
              />
            </CardSection>
            <CardSection>
              <Input
                borderColor='#979797'
                textColor='#333333'
                placeholderColor='#979797'
                placeholder='City'
                label='City'
                value={this.state.city}
                onChangeText={city => this.setState({ city })}
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
      </View>
    );
  }
}

const styles = {
  frame: {
    top: 50,
    color: 'transparent',
    backgroundColor: 'transparent',
    flex: 1,
    maxHeight: 500,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    alignItems: 'center',
    color: 'red'
  },
  topHeaderTextStyle: {
    alignSelf: 'center',
    color: '#333333',
    fontSize: 20,
    fontWeight: '800',
    paddingTop: 10,
    backgroundColor: 'transparent',
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  botHeaderTextStyle: {
    alignSelf: 'center',
    color: '#333333',
    fontSize: 20,
    fontWeight: '400',
    paddingTop: 10,
    backgroundColor: 'transparent',
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  addPhotoTextStyle: {
    alignSelf: 'center',
    color: '#333333',
    fontSize: 20,
    fontWeight: '400',
    paddingTop: 10,
    backgroundColor: 'transparent',
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  background: {
    flex: 1,
    backgroundColor: 'white',
    resizeMode: 'cover',
  },
};

export default CredForm;
