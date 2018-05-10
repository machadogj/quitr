import React, { Component, PropTypes} from 'react';
import { View } from 'react-native';
import {
  Container,
  Title,
  Paragraph,
  Button,
  TextField
} from '../../components';


export default class AddCreditCard extends Component {

  static propTypes = {
    email: PropTypes.string.isRequired,
    navigation: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    name: '',
    number: '',
    cvc: '',
    exp_month: '',
    exp_year: '',
    loading: false
  };

  handleSubmit = () => {
    this.setState({ loading: true }, async () => {
      const cc = {
        name: this.state.name,
        number: this.state.number,
        cvc: this.state.cvc,
        exp_month: this.state.exp_month,
        exp_year: this.state.exp_year
      };
      try {
        await this.props.onSubmit(cc, this.props.email);
      }
      catch (e) {
        alert(e.message || e);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <Title text={ 'Add Credit Card' }/>
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
          text="Please enter your credit card information in the form below. We will never charge you without confirmation first."
        />
        <TextField
          label="Card holder name"
          placeholder="(ie: John Doe)"
          text={ this.state.name }
          onChangeText={ (name) => this.setState({name}) }
        />
        <TextField
          label="Credit card number"
          placeholder="(ie: 4444555566667777)"
          text={ this.state.number }
          onChangeText={ (number) => this.setState({number}) }
        />
        <View style={ {flexDirection: 'row'} }>
          <View style={ {flex:1, marginRight: 5} }>
            <TextField
              label="Expiration month"
              placeholder="(ie: 07)"
              text={ this.state.exp_month }
              onChangeText={ (exp_month) => this.setState({exp_month}) }
            />
          </View>
          <View style={ {flex: 1, marginLeft: 5} }>
            <TextField
              label="Expiration year"
              placeholder="(ie: 19)"
              text={ this.state.exp_year }
              onChangeText={ (exp_year) => this.setState({exp_year}) }
            />
          </View>
        </View>
        <TextField
          label="Security code"
          placeholder="(ie: 123 or 2345)"
          text={ this.state.cvc }
          onChangeText={ (cvc) => this.setState({cvc}) }
        />
        <View style={ {flex:1} } />
        <Button
          loading={ this.state.loading }
          text="Save"
          onPress={ this.handleSubmit }
        />
      </Container>
    );
  }
}
