import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { bigFontSize, buttonDefaultColor, buttonDefaultBorderColor } from '../style';

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 8,
    borderColor: buttonDefaultBorderColor
  },
  iconContainer: {
    alignSelf: 'center'
  },
  label: {
    fontSize: bigFontSize,
    textAlign: 'center',
    color: buttonDefaultColor,
    fontWeight: 'bold'
  }
});

const Button = ({ icon, text, onPress, style }) => {
  let body = icon
    ?
      <Icon name={icon} size={24} />
    :
      <Text style={[ styles.label ]}>{ text }</Text>
    ;
  let containerStyle = icon ? styles.iconContainer : styles.container;
  return (
    <TouchableOpacity style={ [containerStyle, style] } onPress={ onPress }>
      { body }
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: View.propTypes.style,
  text: PropTypes.string,
  icon: PropTypes.string
};

export default Button;