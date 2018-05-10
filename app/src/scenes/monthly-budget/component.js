import React, { Component, PropTypes } from 'react';
import { Image, View } from 'react-native';
import {
  Button,
  Container,
  NumberField,
  Paragraph,
  Title
} from '../../components';

export default class Monthly extends Component {

  static propTypes = {
    amount: PropTypes.number,
    navigation: PropTypes.object,
    onAmountChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container splitBackground>
        <Title text={ 'How committed\nare you?' }/>
        { params && params.backEnabled
          ?
            <Button
              source={ require('../../../assets/icons/close.png') }
              style={ {
                position: 'absolute',
                right: 30,
                top: 30
              } }
              onPress={ () => this.props.navigation.goBack(null) }
            />
          :
            null
        }
        <Paragraph
          text="Once you reach the max for the day, you will have to pay for each extra you smoke. To make sure you don't overcommit, we'd like to ask that you set a limit for yourself."
        />
        <View style={ {flex: 1, justifyContent: 'center'} }>
          <NumberField
            label="Monthly amount (USD)"
            placeholder="$$.$$"
            number={ this.props.amount }
            type="numeric"
            onChangeNumber={ this.props.onAmountChange }
          />
        </View>
        <Image
          resizeMode="contain"
          source={ require('../../../assets/images/onboarding-how-committed.png') }
          style={ {
            flex:0.5,
            height: undefined,
            width: undefined,
            marginBottom: 40
          } }
        />
        <Button text="I'm committed!" onPress={ this.props.onSubmit }/>
      </Container>
    );
  }
}
