import React, { Component, PropTypes} from 'react';
import { Text, View } from 'react-native';
import {
  Container,
  Title,
  Button,
  ListItem
} from '../../components';
import { lightText, buttonDefaultColor } from '../../style';

const StrongLabel = ({children}) => (
  <Text style={{color: buttonDefaultColor}}>{children}</Text>
);

const LightLabel = ({children}) => (
  <Text style={{color: lightText}}>{children}</Text>
);

export default class Settings extends Component {

  static propTypes = {
    dailyCigarettes: PropTypes.number,
    cardId: PropTypes.string,
    email: PropTypes.string,
    monthly: PropTypes.number,
    navigation: PropTypes.object
  };

  render() {
    return (
      <Container>
        <Title text="Settings"/>
        <Button
          source={ require('../../../assets/icons/close.png') }
          style={ {
            position: 'absolute',
            right: 30,
            top: 30
          } }
          onPress={ () => this.props.navigation.goBack(null) }
        />
        <ListItem onPress={ () => this.props.navigation.navigate('daily', {backEnabled: true}) }>
          <StrongLabel>Daily Cigarettes</StrongLabel>
          <LightLabel>{ this.props.dailyCigarettes }</LightLabel>
        </ListItem>
        <ListItem onPress={ () => this.props.navigation.navigate('monthly', {backEnabled: true}) }>
          <StrongLabel>Monthly Budget</StrongLabel>
          <LightLabel>USD{ this.props.monthly }</LightLabel>
        </ListItem>
        <ListItem onPress={ () => this.props.navigation.navigate('email', {backEnabled: true}) }>
          <StrongLabel>Email</StrongLabel>
          <LightLabel>{ this.props.email }</LightLabel>
        </ListItem>
        <ListItem onPress={ () => this.props.navigation.navigate('credit-card', {backEnabled: true}) }>
          <StrongLabel>Credit Card</StrongLabel>
          { !this.props.cardId ? null : (
            <LightLabel>xxxx....xxxx</LightLabel>
          )}
        </ListItem>
        <ListItem onPress={ () => this.props.navigation.navigate('charge') }>
          <StrongLabel>Cigarettes History</StrongLabel>
        </ListItem>
        <ListItem>
          <StrongLabel>Privacy Policy</StrongLabel>
        </ListItem>
        <ListItem>
          <StrongLabel>About Us</StrongLabel>
        </ListItem>
      </Container>
    );
  }
}