import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { lightBackgroundColor, darkBackgroundColor } from '../style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 40,
    backgroundColor: lightBackgroundColor
  }
});

export default class Container extends Component {
  
  state = {
    darkBackgroundTop: null
  }

  handleOnLayout = ({nativeEvent: {layout: {height}}}) => {
    if (!this.props.splitBackground) return;
    let top = height / 3 * 2;
    this.setState({ darkBackgroundTop: top });
  }

  render() {
    let { style, children } = this.props;
    let darkBackground = this.state.darkBackgroundTop === null ? null : (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: darkBackgroundColor,
          top: this.state.darkBackgroundTop
        }}
      >
      </View>
    );
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={[ styles.container, style ]}
        keyboardShouldPersistTaps="always"
        horizontal={false}
        bounces={false}
        onLayout={ this.handleOnLayout }
      >
        { darkBackground }
        { children }
      </KeyboardAwareScrollView>
    );
  }
}

Container.propTypes = {
  style: View.propTypes.style,
  splitBackground: PropTypes.bool
};
