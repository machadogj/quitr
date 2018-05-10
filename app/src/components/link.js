import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { mediumFontSize, buttonDefaultColor } from '../style';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: mediumFontSize,
    textAlign: 'center',
    color: buttonDefaultColor,
    fontWeight: 'bold'
  }
});

const Link = ({ text, onPress, style }) => (
  <TouchableOpacity style={ [styles.container, style] } onPress={ onPress }>
    <Text style={ styles.label }>{ text }</Text>
  </TouchableOpacity>
);

Link.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: View.propTypes.style,
  text: PropTypes.string
};

export default Link;