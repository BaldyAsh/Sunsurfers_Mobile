import React, { Component } from 'react';
import { KeyboardAvoidingView, View, TouchableOpacity, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import { Button, Input, Spinner, Photo, NavBar } from './common';

import Colors from '../helpers/Colors.js';
import photoImg from '../images/photo.png';
import navIcon from '../images/left-arrow.png';

const {
  DEVICE_HEIGHT,
} = require('../helpers/Constants');

class UserForm extends Component {
  constructor(props) {
    super(props);
    console.log(`email from props:${props.email}`);
    this.state = { delete: props.delete,
                   add: props.add,
                   editable: props.editable,
                   changed: false,
                   firstname: props.firstname,
                   lastname: props.lastname,
                   email: props.email,
                   info: '',
                   loading: false,
                   error: '',
                   pictureUrl: props.image,
                   picture: null
                 };
  }

  componentDidMount() {
    this._getUser();
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    if (this.props.delete) {
      return (
        <Button onPress={this.onDeletePress.bind(this)}>
          Delete
        </Button>
      );
    }

    if (this.props.add) {
      return (
        <Button onPress={this.onAddPress.bind(this)}>
          Add
        </Button>
      );
    }

    if (this.state.changed) {
      return (
        <Button onPress={this.onSavePress.bind(this)}>
          Save changes
        </Button>
      );
    }
  }

  _getUser = async () => {
    const state = {
      info: this.state.email,
      error: null,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      pictureUrl: this.state.pictureUrl,
    };
    this.setState({
      firstname: state.firstname,
      lastname: state.lastname,
      pictureUrl: state.pictureUrl,
      info: state.info
    });
  }

  onSavePress() {
    const { firstname,
            lastname,
            info,
            pictureUrl,
            picture } = this.state;

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

  onAddPress() {
    const { firstname,
            lastname,
            info,
            pictureUrl,
            picture } = this.state;

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

  onDeletePress() {
    const { firstname,
            lastname,
            info,
            pictureUrl,
            picture } = this.state;

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
    const email = this.props.email;
    const authToken = this.props.authToken;
    this.setState({
      changed: false,
      firstname: '',
      lastname: '',
      info: '',
      pictureUrl: '',
      loading: false,
      error: '',
      picture: null
    });
    //Actions.mapForm();
    Actions.pop();
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
          picture: response.data,
          changed: true
        });
      }
    });
  }

  render() {
    const { pictureUrl, firstname, lastname, info } = this.state;
    const pic = pictureUrl || photoImg;
    console.log('pic uri: ', pic);
    return (
      <View style={styles.background}>
        <StatusBar
          barStyle="light-content"
        />
        <NavBar
         leftIconUrl={navIcon}
         onLeft={() => Actions.pop()}
         onRight={() => console.log('pressed search')}
        />
        <KeyboardAvoidingView
          style={styles.frame}
          behavior="padding"
        >
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
              source={pic}
            />
          </TouchableOpacity>
          <Input
            borderColor={Colors.gray}
            textColor='black'
            placeholderColor={Colors.gray}
            placeholder='First name'
            label='First name'
            value={firstname}
            onChangeText={firstname => this.setState({ firstname: firstname, changed: true })}
            editable={this.state.editable}
          />
          <Input
            borderColor={Colors.gray}
            textColor='black'
            placeholderColor={Colors.gray}
            placeholder='Last name'
            label='Last name'
            value={lastname}
            onChangeText={lastname => this.setState({ lastname: lastname, changed: true })}
            editable={this.state.editable}
          />
          <Input
            borderColor={Colors.gray}
            textColor='black'
            placeholderColor={Colors.gray}
            placeholder='Info & contacts'
            label='Info & contacts'
            value={info}
            onChangeText={info => this.setState({ info: info, changed: true })}
            editable={this.state.editable}
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

export default UserForm;
