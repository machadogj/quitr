import React, { Component, PropTypes} from 'react';
import { Image, View } from 'react-native';
import {
  Button,
  Container,
  NumberField,
  Paragraph,
  Title
} from '../../components';

export default class DailyCigarettes extends Component {

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
        <Title text={ 'How many daily cigarettes would you like?' }/>
        { params && params.backEnabled
          ?
            <Button
              source={require('../../../assets/icons/close.png')}
              style={{
                position: 'absolute',
                right: 30,
                top: 30
              }}
              onPress={ () => this.props.navigation.goBack(null) }
            />
          :
            null
        }
        <Paragraph
          text="When you reach your daily allowance, keep lowering the amount until you quit!"
        />
        <View style={ {flex: 1, justifyContent: 'center'} }>
          <NumberField
            label="Daily cigarettes"
            number={this.props.amount}
            onChangeNumber={this.props.onAmountChange}
            placeholder="(ie: 10)"
            type="numeric"
          />
        </View>
        <Image
          style={{
            flex:1  ,
            height: undefined,
            width: undefined,
            marginBottom: 40
          }}
          source={require('../../../assets/images/onboarding-daily.png')}
          resizeMode="contain"
        />
        <Button text="Let's go!!!" onPress={ () => this.props.onSubmit(this.props.amount) } />
      </Container>
    );
  }
}
