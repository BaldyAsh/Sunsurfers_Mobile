import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ListView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import { Button, Input, Spinner, Photo, NavBar, Card } from './common';

import Colors from '../helpers/Colors.js';
import photoImg from '../images/photo.png';
import addIcon from '../images/plus.png';
import navIcon from '../images/left-arrow.png';

const {
  DEVICE_HEIGHT,
} = require('../helpers/Constants');

class FriendsForm extends Component {


  componentDidMount() {
    console.log('Mounted 2');
    console.log(this.props.email);
  }

  componentWillUnmount() {
    console.log('Unmounted 2');
  }

  constructor(props) {
    super(props);
    const data = {
      error: '',
      name: 'Anton Grigorev',
      uri: 'https://pp.userapi.com/c850520/v850520044/30aed/9FqqbZWmOCs.jpg',
      friends: [
        {
          image: 'https://pp.userapi.com/c628326/v628326604/1dfac/YmFsRXY3e3k.jpg',
          username: 'Svetlana Tselisheva'
        },
        {
          image: 'https://pp.userapi.com/c848536/v848536342/20924/p8MEWlwP0ag.jpg',
          username: 'Oksana Tolstikova'
        },
        {
          image: 'https://pp.userapi.com/c844320/v844320808/c01af/sfgaqv9If8I.jpg',
          username: 'Semen Makhonin'
        },
      ],
    };
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(data.friends),
      name: data.name,
      uri: data.uri,
    };
  }

  render() {
    return (
      <View style={styles.background}>
        <NavBar
         leftText={this.state.name}
         rightIconUrl={addIcon}
         onLeft={() => Actions.usrForm()}
         onRight={() => console.log('pressed search')}
        />
        <View style={styles.list}>
          <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={(user) => (
              <TouchableOpacity>
                <Card
                 username={user.username}
                 image={user.image}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
    elevation: 1,
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    padding: 15,
    width: null,
    height: null,
    elevation: 1,
    resizeMode: 'cover',
    backgroundColor: 'white'
  },
});

export default FriendsForm;
