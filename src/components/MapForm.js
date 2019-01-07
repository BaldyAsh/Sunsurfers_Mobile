import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
  Text,
  StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { NavBar } from './common';
import Colors from '../helpers/Colors.js';

import DataManager from '../helpers/DataManager';

const {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  SIZE
} = require('../helpers/Constants');

const CARD_HEIGHT = DEVICE_HEIGHT / 5;
const CARD_WIDTH = 2 * CARD_HEIGHT / 3;
const MARKER_WIDTH = 200;

class MapForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    console.log(`email from data manager:${email}`);
    const state = {
      email: email,
      error: '',
      firstname: 'Anton',
      lastname: 'Grigorev',
      image: { uri: 'https://pp.userapi.com/c850520/v850520044/30aed/9FqqbZWmOCs.jpg' },
    };
    this.setState({
      email: state.email,
      firstname: state.firstname,
      lastname: state.lastname,
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
            latitude: 45.526698,
            longitude: -122.6655507,
          },
          title: 'Svetlana Tselisheva',
          description: 'email2@sun.com',
          image: { uri: 'https://pp.userapi.com/c628326/v628326604/1dfac/YmFsRXY3e3k.jpg' },
        },
        {
          coordinate: {
            latitude: 45.5230786,
            longitude: -122.6801034,
          },
          title: 'Oksana Tolstikova',
          description: 'email3@sun.com',
          image: { uri: 'https://pp.userapi.com/c848536/v848536342/20924/p8MEWlwP0ag.jpg' },
        },
        {
          coordinate: {
            latitude: 45.550016,
            longitude: -122.6661917,
          },
          title: 'Semen Makhonin',
          description: 'email4@sun.com',
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
  }
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


  _chooseUser(user) {
    console.log(user.email);
    Actions.usrForm({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      image: user.image,
      editable: true
    });
  }

  _markerPressed = async (index) => {
    this.setState({ selectedMarkerIndex: index });
    clearTimeout(this.regionTimeout);
    this.regionTimeout = setTimeout(() => {
      if (this.index !== index) {
        this.index = index;
        const { coordinate } = this.state.markers[index];
        this.map.animateToRegion(
          {
            ...coordinate,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          },
          350
        );
      }
    }, 10);
  }

  watchLocation = async () => {
    // eslint-disable-next-line no-undef
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const region = {
        // latitude: position.coords.latitude,
        // longitude: position.coords.longitude,
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
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

      this._markerPressed(index);
    });
  }

  _searchLocation = async (text) => {
    console.log(text);
    const region = {
      // latitude: position.coords.latitude,
      // longitude: position.coords.longitude,
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5
    };
    this.onRegionChange(region);
  }

  interpolate(marker, index) {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];
    const scale = this.animation.interpolate({
      inputRange,
      outputRange: [1.0, 2.0, 1.0],
      extrapolate: 'clamp',
    });
    const opacity = this.animation.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });
    return { scale, opacity };
  }

  mapViewRender(marker, index) {
    const interpolations = this.state.markers.map((marker, index) => {
      return this.interpolate(marker, index);
    });
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
    if (this.state.selectedMarkerIndex === index) {
      return (
          <MapView.Marker key={index} coordinate={marker.coordinate}>
            <View style={styles.markerDescription}>
              <Text style={styles.markerHeaderText}>
                {marker.title}
              </Text>
              <Text style={styles.markerDescriptionText}>
                {marker.description}
              </Text>
            </View>
            <TouchableOpacity onPress={() => this._markerPressed(index)}>
              <View style={styles.markerWrapSelected}>
                <View style={styles.ringSelected} />
                  <View style={styles.marker}>
                    <Image
                      source={marker.image}
                      style={styles.markerImage}
                      resizeMode='cover'
                    />
                  </View>
              </View>
            </TouchableOpacity>
          </MapView.Marker>
      );
    }
    return (
        <MapView.Marker key={index} coordinate={marker.coordinate}>
          <TouchableOpacity onPress={() => this._markerPressed(index)} >
            <View style={styles.markerWrap}>
              <View style={styles.ring} />
                <View style={styles.marker} />
            </View>
          </TouchableOpacity>
        </MapView.Marker>
    );
  }

  render() {
    console.log(`email from state:${this.state.email}`);

    const currentUser = {
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      image: this.state.image,
    };

    return (
      <View style={styles.background}>
        <StatusBar
          barStyle="light-content"
        />
        <NavBar
         leftText={`${this.state.firstname} ${this.state.lastname}`}
         leftIconUrl={this.state.image}
         onLeft={() => this._chooseUser(currentUser)}
         onRight={() => console.log('pressed search')}
        />
        <SearchBar
          placeholder="Search location..."
          round
          onChangeText={text => this._searchLocation(text)}
          autoCorrect={false}
        />
        <View style={styles.container}>
          <MapView
            ref={map => this.map = map}
            style={styles.container}
            showsUserLocation
            followUserLocation
            onRegionChangeComplete={this._fetchMarkers.bind(this)}
          >
            {this.state.markers.map((marker, index) => {
              return this.mapViewRender(marker, index)
            })}
          </MapView>
          <Animated.ScrollView
            ref="scrollView"
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={true}
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
                  <Text numberOfLines={2} style={styles.cardtitle}>
                    {marker.title}
                  </Text>
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
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: DEVICE_WIDTH - CARD_WIDTH,
  },
  markerDescription: {
    padding: 5,
    bottom: 20,
    elevation: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.main,
    backgroundColor: 'white',
    marginHorizontal: 10,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    width: MARKER_WIDTH,
    overflow: 'hidden',
    flex: 1
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderColor: Colors.main,
    borderWidth: 1,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    width: CARD_WIDTH,
    overflow: 'hidden',
    flex: 1
  },
  cardImage: {
    width: 0.9 * CARD_WIDTH,
    height: 0.9 * CARD_WIDTH,
    alignSelf: 'center',
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf: 'center',
  },
  textContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cardtitle: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
    color: Colors.main
  },
  cardDescription: {
    fontSize: 10,
    color: Colors.lightGray,
  },
  markerWrapSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1.0
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.main,
  },
  ringSelected: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.main,
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.main,
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
  markerHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  markerDescriptionText: {
    fontSize: 12,
  }
});

export default MapForm;
