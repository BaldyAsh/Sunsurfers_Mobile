import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Button, Input, Spinner, Photo, Error } from './common';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import photoImg from '../images/photo.png';

const {
  DEVICE_WIDTH,
  DEVICE_HEIGHT
} = require('../helpers/Constants');

class CredForm extends Component {
  state = { login: '', firstname: '', secondname: '', loading: false, error: '', pictureUrl: photoImg, picture: null };

  componentDidMount() {
    console.log('Mounted 2');
    console.log(this.props.email);
  }

  componentWillUnmount() {
    console.log('Unmounted 2');
  }

  onButtonPress() {
    const { login, firstname, secondname, pictureUrl, city, picture } = this.state;

    this.setState({ error: '', loading: true });

    this.onLoginSuccess();
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(this.onLoginSuccess.bind(this))
    //   .catch(() => {
    //     firebase.auth().createUserWithEmailAndPassword(email, password)
    //       .then(this.onRegistrationSuccess.bind(this))
    //       .catch(this.onLoginFail.bind(this));
    //   });
  }

  onLoginFail() {
    console.log('Wrong login');
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
      error: '',
      picture: null
    });
    //Actions.mapForm();
    Actions.mapForm({ email: email });
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(source);
        console.log(response.data);
        this.setState({
          pictureUrl: source,
          picture: response.data
        });
      }
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Save and sign in
      </Button>
    );
  }

  render() {
    const { pictureUrl } = this.state;
    console.log('pic uri: ', pictureUrl);
    return (
      <View style={styles.background}>
        <KeyboardAvoidingView
          style={styles.frame}
          behavior="padding"
        >
          <View
            style={{
              height: 40,
              marginHorizontal: 10,
              marginVertical: 5,
              paddingVertical: 5,
              width: DEVICE_WIDTH - 60,
              justifyContent: 'flex-start',
              backgroundColor: 'transparent' }}
          >
            <Text style={styles.topHeaderTextStyle}>
              Welcome to #sunsurfers!
            </Text>
          </View>
          <View
            style={{
              height: 40,
              marginHorizontal: 10,
              marginVertical: 5,
              paddingVertical: 5,
              width: DEVICE_WIDTH - 60,
              justifyContent: 'flex-start',
              backgroundColor: 'transparent' }}
          >
            <Text style={styles.botHeaderTextStyle}>
              Please fill this form :)
            </Text>
          </View>
          <TouchableOpacity
            onPress={this.selectPhotoTapped.bind(this)}
            style={{
              marginBottom: 20,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              height: DEVICE_HEIGHT * 0.2,
              width: DEVICE_HEIGHT * 0.2,
            }}
          >
            <Photo
              source={pictureUrl}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.selectPhotoTapped.bind(this)}
            style={{
              alignItems: 'center',
              width: 100,
              height: 40,
            }}
          >
            <Text style={styles.addPhotoTextStyle}>
              Add photo
            </Text>
          </TouchableOpacity>
          <Input
            borderColor='#979797'
            textColor='#333333'
            placeholderColor='#979797'
            placeholder='Login'
            label='Login'
            value={this.state.login}
            onChangeText={login => this.setState({ login })}
          />
          <Input
            borderColor='#979797'
            textColor='#333333'
            placeholderColor='#979797'
            placeholder='First name'
            label='First name'
            value={this.state.firstname}
            onChangeText={firstname => this.setState({ firstname })}
          />
          <Input
            borderColor='#979797'
            textColor='#333333'
            placeholderColor='#979797'
            placeholder='Second name'
            label='Second name'
            value={this.state.secondname}
            onChangeText={secondname => this.setState({ secondname })}
          />
          <Input
            borderColor='#979797'
            textColor='#333333'
            placeholderColor='#979797'
            placeholder='City'
            label='City'
            value={this.state.city}
            onChangeText={city => this.setState({ city })}
          />
          {this.renderButton()}
        </KeyboardAvoidingView>
      </View>
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
  topHeaderTextStyle: {
    alignSelf: 'center',
    color: '#333333',
    fontSize: 20,
    fontWeight: '800',
  },
  botHeaderTextStyle: {
    alignSelf: 'center',
    color: '#333333',
    fontSize: 20,
    fontWeight: '400',
  },
  addPhotoTextStyle: {
    alignSelf: 'center',
    color: '#333333',
    fontSize: 20,
    fontWeight: '400',
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
};

export default CredForm;
