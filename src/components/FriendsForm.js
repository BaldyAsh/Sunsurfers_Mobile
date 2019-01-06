import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { NavBar, Card } from './common';

import DataManager from '../helpers/DataManager';
import Colors from '../helpers/Colors.js';

class FriendsForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      loading: false,
      error: null,
      firstname: '',
      lastname: '',
      image: {},
      data: [],
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this._getCurrentUser();
    this._searchFriends();
  }

  _searchUsers = async (text) => {
    console.log(text);
    console.log(this.arrayholder);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.firstname.toUpperCase()} ${item.lastname.toUpperCase()} ${item.email.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    // const newData = {
    //   error: null,
    //   users: [
    //     {
    //       image: 'https://pp.userapi.com/c844320/v844320808/c01af/sfgaqv9If8I.jpg',
    //       firstname: 'Semen',
    //       lastname: 'Makhonin',
    //       email: 'dfddfdff@dakfj.comdfdff'
    //     },
    //   ],
    // };
    this.setState({
      data: newData,
    });
  }

  _chooseUser(user, forEdit) {
    console.log(user.email);
    Actions.usrForm({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      image: user.image,
      editable: forEdit
    });
  }

  _getCurrentUser = async () => {
    const data = await DataManager.getInstance();
    const email = await data.getUserEmail();
    const state = {
      email: email,
      error: null,
      firstname: 'Anton',
      lastname: 'Grigorev',
      image: { uri: 'https://pp.userapi.com/c850520/v850520044/30aed/9FqqbZWmOCs.jpg' },
    };
    this.setState({
      email: email,
      firstname: state.firstname,
      lastname: state.lastname,
      image: state.image
    });
  }

  _searchFriends = async () => {
    const data = DataManager.getInstance();
    const email = data.getUserEmail();
    this.setState({ loading: true });
    // const url = `https://randomuser.me/api/?&results=20`;
    //
    // fetch(url)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       data: res.results,
    //       error: res.error || null,
    //       loading: false,
    //     });
    //     this.arrayholder = res.results;
    //   })
    //   .catch(error => {
    //     this.setState({ error, loading: false });
    //   });

    //TODO: - should be fetched friends list
    const state = {
      error: null,
      users: [
        {
          image: { uri: 'https://pp.userapi.com/c628326/v628326604/1dfac/YmFsRXY3e3k.jpg' },
          firstname: 'Svetlana',
          lastname: 'Tselisheva',
          email: 'email2@sun.com'
        },
        {
          image: { uri: 'https://pp.userapi.com/c848536/v848536342/20924/p8MEWlwP0ag.jpg' },
          firstname: 'Oksana',
          lastname: 'Tolstikova',
          email: 'email3@sun.com'
        },
        {
          image: { uri: 'https://pp.userapi.com/c844320/v844320808/c01af/sfgaqv9If8I.jpg' },
          firstname: 'Semen',
          lastname: 'Makhonin',
          email: 'email4@sun.com'
        },
      ],
    };
    this.setState({
      data: state.users,
      friends: state.users,
      error: state.error || null,
      loading: false,
    });
    this.arrayholder = state.users;
  }

  renderHeader() {
    return (
      <SearchBar
        placeholder="Search user..."
        round
        onChangeText={text => this._searchUsers(text)}
        autoCorrect={false}
      />
    );
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: Colors.gray,
          marginLeft: '14%',
        }}
      />
    );
  }

  render() {
    const currentUser = {
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      image: this.state.image,
    };

    if (this.state.loading) {
      return (
        <View style={styles.background}>
          <StatusBar
            barStyle="light-content"
          />
          <NavBar
           leftText={`${this.state.firstname} ${this.state.lastname}`}
           leftIconUrl={this.state.image}
           onLeft={() => this._chooseUser(currentUser, true)}
          />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.background}>
        <StatusBar
          barStyle="light-content"
        />
        <NavBar
         leftText={`${this.state.firstname} ${this.state.lastname}`}
         leftIconUrl={this.state.image}
         onLeft={() => this._chooseUser(currentUser, true)}
        />
        <View style={styles.list}>
          <FlatList
            data={this.state.data}
            renderItem={({ item, separators }) => (
              <TouchableOpacity
                onPress={() => this._chooseUser(item, false)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
              >
                <Card
                 firstname={item.firstname}
                 lastname={item.lastname}
                 email={item.email}
                 image={item.image}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.email}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
      </View>
    );
  }
}

// <View style={styles.list}>
//   <ListView
//     enableEmptySections
//     dataSource={this.state.dataSource}
//     renderRow={this.renderRow.bind(this)}
//     renderEmptyResult={this.renderEmptyResult.bind(this)}
//     renderEmpty={this.renderEmpty.bind(this)}
//   />
// </View>

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
    width: null,
    height: null,
    elevation: 1,
    resizeMode: 'cover',
    backgroundColor: 'white'
  },
});

export default FriendsForm;
