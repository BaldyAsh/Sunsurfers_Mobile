import React from 'react';
import { View, Text, Image } from 'react-native';

import Colors from '../../helpers/Colors.js';

const Card = (props) => (
  <View
    style={styles.box}
  >
    <Image
      style={styles.image}
      source={{ uri: props.image }}
    />
    <Text
      style={styles.username}
    >
      {props.username}
    </Text>
  </View>
);

const styles = {
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
  },
  username: {
    color: Colors.gray,
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 10
  },
  image: {
    borderRadius: 20,
    width: 40,
    height: 40,
  }
};

export { Card };
