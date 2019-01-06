import React from 'react';
import { View, Text, Image } from 'react-native';

import Colors from '../../helpers/Colors.js';
import usrIcon from '../../images/simp_logo.png';

const Card = (props) => (
  <View
    style={styles.box}
  >
    <View
      style={styles.rawbox}
    >
      <Image
        style={styles.image}
        source={props.image ? props.image : usrIcon}
      />
      <Text
        style={styles.username}
      >
        {`${props.firstname} ${props.lastname}`}
      </Text>
    </View>
    <Text
      style={styles.email}
    >
      {props.email}
    </Text>
  </View>
);

const styles = {
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2,
    height: 70
  },
  rawbox: {
    flexDirection: 'row'
  },
  username: {
    color: Colors.gray,
    fontSize: 18,
    alignSelf: 'center',
    left: 25
  },
  email: {
    color: Colors.lightGray,
    fontSize: 14,
    alignSelf: 'flex-start',
    left: 65
  },
  image: {
    left: 15,
    borderRadius: 20,
    width: 40,
    height: 40,
    top: 10
  }
};

export { Card };
