import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size || 'large'} />
  </View>
);

const styles = {
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    height: 50,
    marginHorizontal: 10,
    marginVertical: 5,
  }
};

export { Spinner };
