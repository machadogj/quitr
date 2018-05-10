import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { mediumFontSize, buttonDefaultColor } from '../style';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 46,
    borderRadius: 23,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 1.0
  },
  iconContainer: {
    alignSelf: 'center'
  },
  imageContainer: {
    alignSelf: 'center'
  },
  label: {
    fontSize: mediumFontSize,
    textAlign: 'center',
    color: buttonDefaultColor,
    fontWeight: 'bold'
  }
});

const TextButton = ({ text, onPress, style, loading }) => (
  <TouchableOpacity style={ [styles.container, style] } onPress={ onPress }>
    {
      loading ? 
        <ActivityIndicator animating color={ buttonDefaultColor } />
      : 
        <Text style={ styles.label }>{ text }</Text>
    }
  </TouchableOpacity>
)

const IconButton = ({ icon, onPress, style, loading }) => (
  <TouchableOpacity style={ [styles.iconContainer, style] } onPress={ onPress }>
    <Icon name={ icon } size={ 24 } />
  </TouchableOpacity> 
);

const ImageButton = ({ source, onPress, style, loading }) => (
  <TouchableOpacity style={ [styles.imageContainer, style] } onPress={ onPress }>
    <Image source={ source } />
  </TouchableOpacity> 
);

const Button = ({ icon, text, source, disabled, onPress, style, loading }) => {
  const onPressHandler = !disabled && !loading && onPress || (a => a);
  if (text)   return <TextButton text={ text } onPress={ onPressHandler } style={ style } loading={ loading }/>
  if (icon)   return <IconButton icon={ icon } onPress={ onPressHandler } style={ style }/>
  if (source) return <ImageButton source={ source } onPress={ onPressHandler } style={ style }/>
};

Button.propTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: View.propTypes.style,
  text: PropTypes.string
};

export default Button;