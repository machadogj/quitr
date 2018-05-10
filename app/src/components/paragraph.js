import React, { PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  lightText,
  smallFontSize,
  mediumFontSize
} from '../style';

const styles = StyleSheet.create({
  message: {
    color: lightText,
    marginVertical: 10,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  mediumMessage: {
    fontSize: mediumFontSize
  },
  smallMessage: {
    fontSize: smallFontSize
  }
});

const Paragraph = ({ text, type, style }) => {
  let size = type === 'small' ? styles.smallMessage : styles.mediumMessage;
  return <Text style={[ styles.message, size, style ]}>{ text }</Text>
};

Paragraph.propTypes = {
  style: Text.propTypes.style,
  text: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default Paragraph;