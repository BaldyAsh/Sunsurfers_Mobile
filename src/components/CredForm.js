import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Button, Input, Spinner, Photo, Error } from './common';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import photoImg from '../images/photo.png';

const {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  API,
  API_TOKEN
} = require('../helpers/Constants');

class CredForm extends Component {
  state = { name: '', surname: '', info: '', loading: false, error: '', pictureUrl: photoImg, picture: null };

  componentDidMount() {
    console.log('Mounted 2');
    console.log(this.props.email);
  }

  componentWillUnmount() {
    console.log('Unmounted 2');
  }

  onButtonPress() {
    const { name, surname, info, pictureUrl, picture } = this.state;

    this.setState({ error: '', loading: true });

    // fetch(API+'registration', {
    //      method: 'POST',
    //      headers: {
    //        Accept: 'application/json',
    //        'Content-Type': 'application/json'
    //      },
    //      body: JSON.stringify({
    //        authToken: this.props.authToken,
    //        name: name,
    //        surname: surname,
    //        info: info,
    //        picture: picture,
    //      }),
    //   })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //      console.log(responseJson);
    //      this.onUpdatingProfileSuccess.bind(this)
    //   })
    //   .catch((error) => {
    //      this.onUpdatingProfileFail.bind(this);
    //   });

    this.onUpdatingProfileSuccess();
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(this.onLoginSuccess.bind(this))
    //   .catch(() => {
    //     firebase.auth().createUserWithEmailAndPassword(email, password)
    //       .then(this.onRegistrationSuccess.bind(this))
    //       .catch(this.onLoginFail.bind(this));
    //   });
  }

  onUpdatingProfileFail() {
    console.log('Wrong data');
    this.setState({ error: 'Wrong data', loading: false });
  }

  onUpdatingProfileSuccess() {
    console.log('Go to app');
    const email = this.props.email;
    const authToken = this.props.authToken;
    this.setState({
      name: '',
      surname: '',
      info: '',
      pictureUrl: '',
      loading: false,
      error: '',
      picture: null
    });
    //Actions.mapForm();
    Actions.mapForm({ email: email, authToken: authToken });
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
        Ready
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
              Please fill out the profile to make it easier to find you
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
            placeholder='Name'
            label='Name'
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
          <Input
            borderColor='#979797'
            textColor='#333333'
            placeholderColor='#979797'
            placeholder='Surname'
            label='Surname'
            value={this.state.surname}
            onChangeText={surname => this.setState({ surname })}
          />
          <Input
            borderColor='#979797'
            textColor='#333333'
            placeholderColor='#979797'
            placeholder='Info & contacts'
            label='Info & contacts'
            value={this.state.info}
            onChangeText={info => this.setState({ info })}
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
