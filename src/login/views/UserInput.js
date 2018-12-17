import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';

const {
  DEVICE_WIDTH
} = require('../../helpers/Constants');

export default class UserInput extends Component {
  render() {
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

UserInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    width: DEVICE_WIDTH - 40,
    height: 50,
    marginHorizontal: 20,
    paddingLeft: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FBBF09',
    color: '#FFFFFF',
  },
  inputWrapper: {
    flex: 1,
  }
});
