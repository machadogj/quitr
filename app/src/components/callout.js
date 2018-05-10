import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Paragraph from './paragraph';

import { smallFontSize } from '../style';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10
  },
  label: {
    fontSize: smallFontSize
  },
  calloutTriangle: {
    backgroundColor: 'transparent',
    width: 20,
    height: 20,

    alignSelf:'center',
    marginLeft: 0,

    borderStyle: 'solid',
    borderBottomColor: '#ccc',
    borderBottomWidth:15,

    borderLeftWidth:10,
    borderLeftColor: 'transparent',

    borderRightWidth:10,
    borderRightColor: 'transparent',
  },
  transformTriangleDown: {
    transform: [
      {rotate: '180deg'}
    ]
  },
});

const Callout = ({ backgroundColor, text, textColor }) => {
  let containerStyle = [ styles.container, backgroundColor && { backgroundColor }]
  let labelStyle = [ styles.label, textColor && { color: textColor }]
  return (
    <View>
      <View style={ [containerStyle] }>
        <Paragraph
          style={ labelStyle }
          text={ text }
        />
      </View>
      <View style={ [styles.calloutTriangle, styles.transformTriangleDown, backgroundColor && { borderBottomColor: backgroundColor }] }>
      </View>
    </View>
  );
};

Callout.propTypes = {
  backgroundColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string
};

export default Callout;
/*
  calloutTriangle: {
    backgroundColor: 'transparent',
    width: 20,
    height: 20,

    alignSelf:'center',
    marginLeft: 20,

    borderStyle: 'solid',
    borderBottomColor: '#EF4836',
    borderBottomWidth:15,

    borderLeftWidth:10,
    borderLeftColor: 'transparent',

    borderRightWidth:10,
    borderRightColor: 'transparent',
  },

  transformTriangleDown: {
    transform: [
      {rotate: '180deg'}
    ]
  },
*/