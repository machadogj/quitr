import React, {} from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Immutable from 'immutable';

import InitScene from './scenes/init';
import TourScene from './scenes/tour';
import MonthlyScene from './scenes/monthly-budget';
import DailyScene from './scenes/daily-cigarettes';
import HomeScene from './scenes/home';
import EmailScene from './scenes/email';
import CreditCardScene from './scenes/credit-card';
import ChargeScene from './scenes/charge';
import SettingsScene from './scenes/settings';

const Navigator = StackNavigator({
  'init': { screen: InitScene },
  'tour': { screen: TourScene },
  'monthly': { screen: MonthlyScene },
  'daily': { screen: DailyScene },
  'home': { screen: HomeScene },
  'email': { screen: EmailScene },
  'credit-card': { screen: CreditCardScene },
  'charge': { screen: ChargeScene },
  'settings': { screen: SettingsScene }
}, {
  headerMode: 'none'
});

const initialState = Immutable.fromJS({
  index: 0,
  routes: [{ routeName: 'init', key: 'init' }]
});
const reducer = ( state = initialState, action ) => {
  return state.merge(Navigator.router.getStateForAction(action, state.toJS()));
}

const selectors = {
  currentRoute: state => {
    let nav = state.get('nav').toJS();
    return nav.routes[nav.index].routeName;
  }
}

export { reducer, selectors }

const NavigatorWithState = ({dispatch, nav}) => {
  return (
    <Navigator navigation={addNavigationHelpers({
      dispatch: dispatch,
      state: nav,
    })}
    />
  );
}

export default connect(
  state => ({ nav: state.get('nav').toJS() })
)(NavigatorWithState);
