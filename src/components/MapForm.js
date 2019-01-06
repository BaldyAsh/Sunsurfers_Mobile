import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  PermissionsAndroid,
  Platform,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker } from 'react-native-maps';
import { NavBar } from './common';
import Colors from '../helpers/Colors.js';

import DataManager from '../helpers/DataManager';

const {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  SIZE
} = require('../helpers/Constants');

const CARD_HEIGHT = DEVICE_HEIGHT / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class MapForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      firstname: '',
      lastname: '',
      image: {},
      markers: [],
      region: {},
    };
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    this._getCurrentUser();
    this._getCurrentLocation();
    this._animationListener();
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    if (this.watchID) navigator.geolocation.clearWatch(this.watchID);
  }

  _getCurrentUser = async () => {
    const data = await DataManager.getInstance();
    const email = await data.getUserEmail();
    const state = {
      error: '',
      firstname: 'Anton',
      lastname: 'Grigorev',
      image: { uri: 'https://pp.userapi.com/c850520/v850520044/30aed/9FqqbZWmOCs.jpg' },
    };
    this.setState({
      firstname: state.firstname,
      lastname: 'Grigorev',
      image: state.image
    });
  }

  _fetchMarkers = async (region) => {
    const data = await DataManager.getInstance();
    const email = await data.getUserEmail();
    const state = {
      markers: [
        {
          coordinate: {
            latitude: 45.524698,
            longitude: -122.6655507,
          },
          title: 'Svetlana Tselisheva',
          description: 'This is the second best place in Portland',
          image: { uri: 'https://pp.userapi.com/c628326/v628326604/1dfac/YmFsRXY3e3k.jpg' },
        },
        {
          coordinate: {
            latitude: 45.5230786,
            longitude: -122.6701034,
          },
          title: 'Oksana Tolstikova',
          description: 'This is the third best place in Portland',
          image: { uri: 'https://pp.userapi.com/c848536/v848536342/20924/p8MEWlwP0ag.jpg' },
        },
        {
          coordinate: {
            latitude: 45.521016,
            longitude: -122.6561917,
          },
          title: 'Semen Makhonin',
          description: 'This is the fourth best place in Portland',
          image: { uri: 'https://pp.userapi.com/c844320/v844320808/c01af/sfgaqv9If8I.jpg' },
        },
      ],
    };
    this.setState({
      markers: state.markers
    });
  }

  onRegionChange(region) {
    this.setState({
      region: region
    });
    this.map.animateToRegion(
      {
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude,
        latitudeDelta: this.state.region.latitudeDelta,
        longitudeDelta: this.state.region.longitudeDelta,
      },
      10
    );
    // this._fetchMarkers();
    //// Fetching markers data from server
    // return fetch('server' + '?latitude=' + this.state.region.latitude + '&longitude=' + this.state.region.logitude, { method: 'GET' })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     const newState = Object.assign({}, this.state);
    //     newState.markers = responseJson;
    //     this.setState(newState);
    //     console.log(responseJson);
    //   });
  }

  _getCurrentLocation = async () => {
    if (this.props.coordinate) return;

    if (Platform.OS === 'android') {
      PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(granted => {
          if (granted && this.mounted) this.watchLocation();
        });
    } else {
      this.watchLocation();
    }
  }

  watchLocation = async () => {
    // eslint-disable-next-line no-undef
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const region = {
        // latitude: position.coords.latitude,
        // longitude: position.coords.longitude,
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068
      };
      console.log(region);
      this.onRegionChange(region);
    }, null, this.props.geolocationOptions);
  }

  _animationListener = async () => {
    this.animation.addListener(({ value }) => {
      // animate 30% away from landing on the next item
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: 'clamp',
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: 'clamp',
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.background}>
        <NavBar
         leftText={`${this.state.firstname} ${this.state.lastname}`}
         leftIconUrl={this.state.image}
         onLeft={() => Actions.usrForm()}
         onRight={() => console.log('pressed search')}
        />
        <View style={styles.container}>
          <MapView
            ref={map => this.map = map}
            style={styles.container}
            showsUserLocation
            followUserLocation
            onRegionChange={this._fetchMarkers.bind(this)}
          >
            {this.state.markers.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity,
              };
              return (
                <MapView.Marker key={index} coordinate={marker.coordinate}>
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[styles.ring, scaleStyle]} />
                    <View style={styles.marker} />
                  </Animated.View>
                </MapView.Marker>
              );
            })}
          </MapView>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
            style={styles.scrollView}
            contentContainerStyle={styles.endPadding}
          >
            {this.state.markers.map((marker, index) => (
              <View style={styles.card} key={index}>
                <Image
                  source={marker.image}
                  style={styles.cardImage}
                  resizeMode='cover'
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.description}
                  </Text>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
        </View>
      </View>
    );
  }

  // onRegionChange(region) {
  //   return fetch('server' + '?latitude=' + this.state.region.latitude + '&longitude=' + this.state.region.logitude, { method: 'GET' })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       const newState = Object.assign({}, this.state);
  //       newState.markers = responseJson;
  //       newState.region.latitude = region.latitude;
  //       newState.region.longitude = region.longitude;
  //       this.setState(newState);
  //       console.log(responseJson);
  //     });
  // }

}

const styles = StyleSheet.create({
  container: {
    //...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: DEVICE_WIDTH - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    marginHorizontal: 10,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: Colors.main,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.main,
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.main,
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.main,
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
  header: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    elevation: 1,
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
});

export default MapForm;

// changePosition(latOffset, lonOffset) {
//   const latitude = this.state.region.latitude + latOffset;
//   const longitude = this.state.region.longitude + lonOffset;
//   this.setState({ region: { latitude, longitude } });
//   this.updateMap();
// }
//
// updateMap() {
//   const { curPos, prevPos } = this.state;
//   const curRot = this.getRotation(prevPos, curPos);
//   this.map.animateCamera({ heading: curRot, center: curPos, pitch: curAng });
// }

// onMapPress(e) {
//   const region = {
//     latitude:       e.nativeEvent.coordinate.latitude,
//     longitude:      e.nativeEvent.coordinate.longitude,
//     latitudeDelta:  0.00922*1.5,
//     longitudeDelta: 0.00421*1.5
//   }
//   console.log(region);
//   this.onRegionChange(region, region.latitude, region.longitude);
// }

// _getCurrentPosition = async () => {
//   navigator.geolocation.watchPosition((position) => {
//     // Create the object to update this.state.mapRegion through the onRegionChange function
//     const region = {
//       latitude:       position.coords.latitude,
//       longitude:      position.coords.longitude,
//       latitudeDelta:  0.00922*1.5,
//       longitudeDelta: 0.00421*1.5
//     };
//     console.log(region);
//     this.onRegionChange(region);
//   }, (error) => console.log(error));
// }
