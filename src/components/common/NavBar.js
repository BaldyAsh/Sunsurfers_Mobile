import {
 View, Image, TouchableOpacity, Text
} from 'react-native';
import React from 'react';

import Colors from '../../helpers/Colors.js';
import usrIcon from '../../images/simp_logo.png';

const {
  DEVICE_WIDTH
} = require('../../helpers/Constants');

const NavBar = props => (
  <View style={styles.backgroundStyle}>
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onPress={props.onLeft}
        style={styles.leftItemStyle}
      >
        <Image
          source={props.leftIconUrl ? props.leftIconUrl : usrIcon}
          style={styles.usrIconStyle}
        />
        <Text
          style={styles.leftTextStyle}
        >
          {props.leftText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onRight}
        style={styles.rightItemStyle}
      >
        <Image
          source={props.rightIconUrl}
          style={styles.rightIconStyle}
        />
      </TouchableOpacity>
    </View>
  </View>
);

// class NavBar extends Component {
//   render() {
//     return (
//       <View style={styles.backgroundStyle}>
//         <StatusBar />
//           <View style={styles.containerStyle}>
//             <TouchableWithoutFeedback onPress={() => Actions.credScreen()}>
//               <Image
//               source={usr}
//               style={styles.usrIconStyle}
//               />
//             </TouchableWithoutFeedback>
//           </View>
//       </View>
//     );
//   }
// }

const styles = {
  leftItemStyle: {
    resizeMode: 'contain',
    flexDirection: 'row',
    width: DEVICE_WIDTH / 2,
    height: 40,
    alignItems: 'center'
  },
  rightItemStyle: {
    resizeMode: 'contain',
    flexDirection: 'row',
    width: DEVICE_WIDTH / 2,
    height: 40,
    justifyContent: 'flex-end',
  },
  usrIconStyle: {
    resizeMode: 'contain',
    flexDirection: 'row',
    width: 40,
    height: 40,
  },
  rightIconStyle: {
    resizeMode: 'contain',
    flexDirection: 'row',
    width: 40,
    height: 40,
    marginRight: 30,
  },
  containerStyle: {
    top: 35,
    flexDirection: 'row',
    left: 20,
    right: 20,
  },
  backgroundStyle: {
    backgroundColor: Colors.gray,
    height: 80
  },
  leftTextStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    left: 10,
  }
};

export { NavBar };

// <View style={styles.backgroundStyle}>
// <StatusBar />
// <View style={{ flexDirection: 'row' }}>
// <TouchableWithoutFeedback onPress={() => Actions.homeScreen()}>
// <Image
// source={require('../../images/logo.png')}
// style={styles.backarrowStyle} />
// </TouchableWithoutFeedback>
//
// <Image
// source={require('../../images/left-arrow.png')}
// style={styles.helpStyle} />
//
//
// <Image
// source={require('../../images/eye_black.png')}
// style={styles.settingStyle} />
// </View>
// </View>
