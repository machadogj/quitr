import React, { PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { darkText } from '../style';

const styles = StyleSheet.create({
  container: {
    color: darkText,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 25,
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});

const Title = ({ text, style }) => (
  <Text style={[ styles.container, style ]}>{ text }</Text>
);

Title.propTypes = {
  style: Text.propTypes.style,
  text: PropTypes.string.isRequired
};

export default Title;