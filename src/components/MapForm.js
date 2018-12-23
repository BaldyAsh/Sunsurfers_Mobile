import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

import arrowImg from '../images/left-arrow.png';

const SIZE = 40;

export default class AppScreen extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this._onPress = this._onPress.bind(this);
    this.growAnimated = new Animated.Value(0);
  }

  _onPress() {
    if (this.state.isLoading) return;

    this.setState({ isLoading: true });

    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      Actions.pop();
    }, 500);
  }

  render() {
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, SIZE],
    });

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 59.32,
            longitude: 18.07,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
        </MapView>
        <TouchableOpacity
          onPress={this._onPress}
          style={styles.button}
          activeOpacity={1}
        >
          <Image style={styles.image} source={arrowImg} />
        </TouchableOpacity>
        <Animated.View
          style={[styles.circle, { transform: [{ scale: changeScale }] }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
    borderRadius: 100,
    zIndex: 99,
    backgroundColor: 'transparent',
  },
  circle: {
    height: SIZE,
    width: SIZE,
    marginTop: -SIZE,
    borderRadius: 100,
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});
