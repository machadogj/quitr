import React, { Component, PropTypes} from 'react';
import { View } from 'react-native';
import {
  Container,
  Title,
  Paragraph,
  Button,
  TextField
} from '../../components';


export default class EmailAddress extends Component {

  static propTypes = {
    email: PropTypes.string,
    onEmailChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <Title text={ 'Tell us your email' }/>
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
          text="Please enter your email address below."
        />
        <TextField
          label="Email"
          onChangeText={ this.props.onEmailChange }
          placeholder="(ie: john.doe@email.com)"
          text={this.props.email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View style={{flex:1}}></View>
        <Button text="Save" onPress={ () => this.props.onSubmit(this.props.email) }/>
      </Container>
    );
  }
}
