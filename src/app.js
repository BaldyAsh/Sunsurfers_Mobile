import React, { Component } from 'react';
import { Image } from 'react-native';
import { Router, Scene, Tabs, Stack } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import MapForm from './components/MapForm';
import CredForm from './components/CredForm';
import EnterScreen from './components/EnterScreen';
import UserForm from './components/UserForm';
import FriendsForm from './components/FriendsForm';
import CheckEmailForm from './components/CheckEmailForm';

import locImg from './images/location.png';
import prfImg from './images/user.png';
import Colors from './helpers/Colors.js';

const LocTabIcon = () => (
  <Image
    source={locImg}
    style={{
      alignItems: 'center',
      resizeMode: 'stretch',
      alignSelf: 'center',
      height: 30,
      width: 30,
    }}
  />
);

const PrfTabIcon = () => (
  <Image
    source={prfImg}
    style={{
      alignItems: 'center',
      resizeMode: 'stretch',
      alignSelf: 'center',
      height: 30,
      width: 30,
    }}
  />
);

export default class Sunsurfers extends Component<{}> {

  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene
            key="enterScreen"
            component={EnterScreen}
            animation='fade'
            hideNavBar
            initial
          />
          <Scene
            key="loginForm"
            component={LoginForm}
            animation='fade'
            hideNavBar
          />
          <Scene
            key="credForm"
            component={CredForm}
            animation='fade'
            back={false}
            hideNavBar
          />
          <Scene
            hideNavBar
            panHandlers={null}
            type="replace"
          >
            <Tabs
              key="tabs"
              showLabel={false}
              swipeEnabled
              activeBackgroundColor={Colors.main}
              inactiveBackgroundColor={Colors.gray}
              inactiveTintColor="white"
              hideNavBar
              activeTintColor="white"
              lazy
            >
              <Stack
                key="tab1"
                icon={LocTabIcon}
                hideNavBar
              >
                <Scene
                  key="mapForm"
                  component={MapForm}
                  animation='fade'
                  back={false}
                />
                <Scene
                  key="usrForm"
                  component={UserForm}
                  animation='fade'
                  back
                />
              </Stack>
              <Stack
                key="tab2"
                icon={PrfTabIcon}
                hideNavBar
              >
                <Scene
                  key="friendsForm"
                  component={FriendsForm}
                  animation='fade'
                  back={false}
                />
              </Stack>
            </Tabs>
          </Scene>
          <Scene
            key="checkEmailForm"
            component={CheckEmailForm}
            animation='fade'
            hideNavBar
          />
        </Stack>
      </Router>
    );
  }
}
