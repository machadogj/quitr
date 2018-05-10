import React, { PropTypes } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { mediumFontSize, grey } from '../style';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderBottomWidth: 2,
    marginBottom: 5
  },
  label: {
    color: grey
  },
  input: {
    fontSize: mediumFontSize,
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: 'transparent'
  }
});

const TextField = ({label, text, type, style, ...props }) => (
  <View style={ styles.container }>
    <Text style={ styles.label }>{ label }</Text>
    <TextInput
      placeholderTextColor="black"
      keyboardType={type}
      value={text}
      style={[ styles.input, style ]}
      underlineColorAndroid={'transparent'}
      {...props}
    />
  </View>
);

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  style: View.propTypes.style,
  text: PropTypes.string,
  type: PropTypes.string
};

export default TextField;