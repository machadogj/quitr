import React, {} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { lightText } from '../style';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
    borderBottomWidth:2,
    borderBottomColor: lightText,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const ListItem = ({ children, onPress }) => (
  <TouchableOpacity style={ styles.container } onPress={ onPress }>
    { children }
  </TouchableOpacity>
)

export default ListItem;