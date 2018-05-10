import React, {} from 'react';
import { View } from 'react-native';
import Container from '../components/container';
import Title from '../components/title';
import withLifecycle from '../lib/withLifecycle';
import { connect } from 'react-redux';
import * as app from '../store/models/app';
import * as router from '../router';

const Init = () => (
  <Container>
    <View style={ {flex: 1, justifyContent: 'center', alignItems: 'center'} }>
      <Title text="Quitr"/>
    </View>
  </Container>
);

export default connect(
  state => ({
    monthly: state.get('config').toJS().monthly,
    dailyCigarettes: state.get('config').toJS().dailyCigarettes,
    initialized: state.get('app').toJS().initialized,
    currentRoute: router.selectors.currentRoute(state)
  }),
  dispatch => ({
    init: () => dispatch(app.actions.init())
  })
)(withLifecycle({
  onMount: function () {
    this.props.init();
  },
  onUpdate: function () {
    let { initialized, monthly, dailyCigarettes, currentRoute } = this.props;
    let onboarded = monthly && dailyCigarettes;
    if (currentRoute !== 'init') return;
    if (initialized && !onboarded) {
      this.props.navigation.navigate('tour');
    }
    else if (initialized) {
      this.props.navigation.navigate('home');
    }
  }
})(Init));
