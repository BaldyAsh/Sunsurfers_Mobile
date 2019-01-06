import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import { Button, Input, Spinner, Photo } from './common';

import Colors from '../helpers/Colors.js';
import DataManager from '../helpers/DataManager';
import photoImg from '../images/photo.png';

const {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  API
} = require('../helpers/Constants');

class CredForm extends Component {

  constructor(props) {
    super(props)

    this.state = { firstname: '',
                   lastname: '',
                   info: '',
                   loading: false,
                   error: '',
                   pictureUrl: photoImg,
                   picture: null
                 };
  }

  onButtonPress() {
    const { firstname,
            lastname,
            info,
            pictureUrl,
            picture } = this.state;
    const data = DataManager.getInstance();
    const email = data.getUserEmail();

    console.log(email);

    this.setState({ error: '', loading: true });

    // fetch(API+'registration', {
    //      method: 'POST',
    //      headers: {
    //        Accept: 'application/json',
    //        'Content-Type': 'application/json'
    //      },
    //      body: JSON.stringify({
    //        authToken: this.props.authToken,
    //        firstname: firstname,
    //        lastname: lastname,
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
    this.setState({
      firstname: '',
      lastname: '',
      info: '',
      pictureUrl: '',
      loading: false,
      error: '',
      picture: null
    });
    //Actions.mapForm();
    //TODO: set users creds
    Actions.tab1();
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
          <Input
            borderColor={Colors.gray}
            textColor='black'
            placeholderColor={Colors.gray}
            placeholder='First name'
            label='First name'
            value={this.state.firstname}
            onChangeText={firstname => this.setState({ firstname })}
          />
          <Input
            borderColor={Colors.gray}
            textColor='black'
            placeholderColor={Colors.gray}
            placeholder='Last name'
            label='Last name'
            value={this.state.lastname}
            onChangeText={lastname => this.setState({ lastname })}
          />
          <Input
            borderColor={Colors.gray}
            textColor='black'
            placeholderColor={Colors.gray}
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
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
  },
  botHeaderTextStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
  },
  addPhotoTextStyle: {
    alignSelf: 'center',
    color: 'black',
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
