import moment from 'moment';
import React, { Component, PropTypes} from 'react';
import { Text, View } from 'react-native';
import {
  Button,
  Container,
  Link,
  Paragraph,
  Title
} from '../../components';

export default class Charge extends Component {

  static propTypes = {
    config: PropTypes.object.isRequired,
    navigation: PropTypes.object,
    onAccept: PropTypes.func.isRequired,
    onDismiss: PropTypes.func,
    todaysCigarettes: PropTypes.number.isRequired,
    todaysCigarettesList: PropTypes.array,
    total: PropTypes.number.isRequired
  };

  state = {
    loading: false
  }

  handleSubmit = () => {
    let { customerId, cardId, dailyCigarettes } = this.props.config;
    let { todaysCigarettes, total } = this.props;
    this.setState({ loading: true }, async () => {
      try {
        await this.props.onAccept(customerId, cardId, total, dailyCigarettes, todaysCigarettes);
      }
      catch(e) {
        alert(e.message || e);
        this.setState({ loading: false });
      }
    });
  }

  handleDismiss = () => {
    this.props.onDismiss();
  }

  render() {
    let { dailyCigarettes } = this.props.config;
    let {
      todaysCigarettes,
      todaysCigarettesList,
      total
    } = this.props;

    let exceeded = todaysCigarettesList.slice(dailyCigarettes).map((cigarette, index) => {
      let status = cigarette.charged ? 'charged' : 'not charged';
      let amount = Math.pow(2, index);
      return (
        <Text key={ index }>{ `${moment(cigarette.timestamp).fromNow()}, USD${amount} ${status}.` }</Text>
      );
    });
    return (
      <Container>
        <Button
          source={ require('../../../assets/icons/close.png') }
          style={ {
            position: 'absolute',
            right: 30,
            top: 30
          } }
          onPress={ this.handleDismiss }
        />
        <View style={ {flex: 1} }>
          <Title text="No pain no gain!"/>
          <Paragraph
            text="By tapping on Accept you agree to being charged because of the cigarettes you smoked that exceeded your daily quota."
          />
          <Paragraph
            text={ `Today you smoked ${this.props.todaysCigarettes} cigarettes. You exceeded your quota by ${todaysCigarettes - dailyCigarettes}.` }
          />
          { exceeded }
        </View>
        <Paragraph
          text={ `Total to be charged (USD): ${total}.00` }
        />
        { total > 0 ?
            <View>
              <Button
                loading={ this.state.loading }
                text="Accept"
                onPress={ this.handleSubmit }
              />
              <Link text="Later" onPress={ this.handleDismiss } />
            </View>
          :
            null
        }
      </Container>
    );
  }
}
