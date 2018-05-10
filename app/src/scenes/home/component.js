import React, { Component, PropTypes} from 'react';
import { Text, View } from 'react-native';
import {
  Button,
  Callout,
  CircleButton,
  Container,
  Title
} from '../../components';
import { darkText } from '../../style';

const styles = {
  low: {
    titleColor: darkText,
    backgroundColor: 'rgb(255, 224, 178)',
    circleBackgroundColor: 'rgb(253, 203, 128)',
    circleTextColor: 'rgb(230, 81, 0)'
  },
  medium: {
    titleColor: 'white',
    backgroundColor: 'rgb(255, 152, 0)',
    circleBackgroundColor: 'rgb(255, 183, 77)',
    circleTextColor: 'rgb(230, 81, 0)'
  },
  high: {
    titleColor: 'white',
    backgroundColor: 'rgb(230, 81, 0)',
    circleBackgroundColor: 'rgb(245, 124, 0)',
    circleTextColor: 'rgb(255, 224, 178)'
  }
};

export default class Home extends Component {

  static propTypes = {
    cardId: PropTypes.string,
    dailyCigarettes: PropTypes.number.isRequired,
    navigation: PropTypes.object,
    nextCigaretteCost: PropTypes.number,
    onAdd: PropTypes.func.isRequired,
    todaysCigarettes: PropTypes.number.isRequired,
    willExceedBugdet: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {
    this.props.onAdd();
  }

  handleAddCreditCard = () => {
    this.props.navigation.navigate('credit-card');
  }

  handleSettings = () => {
    this.props.navigation.navigate('settings');
  }

  handleOnLayout = ({nativeEvent: {layout: {width}}}) => {
    this.setState({counterWidth: width * 0.8})
  }

  renderCallout() {
    let { todaysCigarettes, nextCigaretteCost, willExceedBugdet } = this.props;
    if (willExceedBugdet) {
      return (
        <Callout
          text={ 'You have exceeded your monthly budget, so you won\'t be charged!' }
          textColor="red"
        />
      );
    }
    else if (nextCigaretteCost) {
      return (
        <Callout
          text={ `You will be charged USD${nextCigaretteCost}.00 to your credit card. So think twice before you smoke that next cigarette!` }
          textColor="red"
        />
      );
    }
    else if (todaysCigarettes === 0) {
      return (
        <Callout
          backgroundColor={ styles.medium.circleBackgroundColor }
          text="Every time you smoke, tap on the add button below!"
        />
      );
    }
    else {
      return null;
    }
  }

  render() {
    let { dailyCigarettes, todaysCigarettes, cardId } = this.props;
    
    let currentStyle = styles.low;
    if (todaysCigarettes / dailyCigarettes >= 1) {
      currentStyle = styles.high;
    } else if (todaysCigarettes / dailyCigarettes >= 0.5) {
      currentStyle = styles.medium;
    }

    return (
      <Container style={ {backgroundColor: currentStyle.backgroundColor} }>
        <View style={ {flex: 1} }>
          <Title text="Hang in there!" style={ {color: currentStyle.titleColor} }/>
          <Button
            source={ require('../../../assets/icons/settings.png') }
            style={ {
              position: 'absolute',
              right: -20,
              top: 12
            } }
            onPress={ this.handleSettings }
          />
          <View
            style={ {flex: 1, justifyContent: 'center', alignItems: 'center'} }
            onLayout={ this.handleOnLayout }
          >
            <View style={ {
              height: this.state.counterWidth,
              width: this.state.counterWidth,
              borderRadius: this.state.counterWidth / 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: currentStyle.circleBackgroundColor
            } }
            >
              <Text style={ {fontSize: 32, color: currentStyle.circleTextColor} }>{ `${todaysCigarettes} / ${dailyCigarettes}` }</Text>
            </View>
          </View>
          { this.renderCallout() }
        </View>
        <CircleButton
          style={ {borderColor: currentStyle.circleBackgroundColor} }
          text="+"
          onPress={ this.handleSubmit }
        />
      </Container>
    );
  }
}