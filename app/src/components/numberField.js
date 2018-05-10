import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import TextField from './textField';
import Button from './button';

const invalidValues = ['null', 'undefined'];

const NumberField = ({number, onChangeNumber, ...props}) => {
  let text = String(number);
  return (
    <TextField
      onChangeText={(text) => onChangeNumber(~~text)}
      text={invalidValues.indexOf(text) > -1 ? '' : text} {...props}
    />
  );
};

NumberField.propTypes = {
  number: PropTypes.number,
  onChangeNumber: PropTypes.func
};

export default class NumberFieldWithHelpers extends Component {

  static propTypes = {
    number: PropTypes.number,
    onChangeNumber: PropTypes.func
  }

  constructor(props){
    super(props);
    this.state = {
      number: props.number
    };
  }

  componentWillReceiveProps(nextProps) {
    let { number } = nextProps;
    this.setState({ number });
  }

  handleDecrease = () => {
    let number = (this.state.number === undefined || this.state.number === null)
      ? 0
      : this.state.number;
    this.handleNewNumber(number - 1);
  }

  handleIncrease = () => {
    let number = (this.state.number === undefined || this.state.number === null)
      ? 0
      : this.state.number;
    this.handleNewNumber(number + 1);
  }

  handleNewNumber = (number) => {
    this.setState({number}, () => {
      if (this.props.onChangeNumber) {
        this.props.onChangeNumber(number);
      }
    });
  }

  render() {
    return (
      <View style={{alignSelf:'stretch'}}>
        <NumberField
          number={this.state.number}
          onChangeNumber={this.handleNewNumber}
          {...this.props}
        />
        <View style={styles.buttons}>
          <Button
            onPress={this.handleDecrease}
            style={styles.button}
            source={require('../../assets/icons/decrease.png')}
          />
          <Button
            onPress={this.handleIncrease}
            style={styles.button}
            source={require('../../assets/icons/increase.png')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    position: 'absolute',
    right: 0,
    top: 10,
    bottom: 0,
    flexDirection: 'row'
  },
  button: {
    marginLeft: 10
  }
})