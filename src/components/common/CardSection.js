import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    padding: 5,
    marginTop: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    alignSelf: 'center'
  }
};

export { CardSection };
