import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
  }
};

export { Card };
