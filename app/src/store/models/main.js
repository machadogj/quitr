import moment from 'moment';
import { createReducer } from 'redux-immutablejs';
import { createAction } from 'redux-actions';
import createAsyncAction from '../lib/createAsyncAction';
import { charge } from '../lib/lambda';

const initialState = {
  dismissed: false,
  cigarettes :[ /*{
    timestamp: new Date().getTime(),
    charged: true|false
  }*/
  ],
  charges: [ /*{
    timestamp: new Date().getTime(),
    amount: number
  }*/
  ]
};

const actions = {
  addCigarette: createAction('MAIN_ADD_CIGARETTE'),
  dismiss: createAction('MAIN_DISMISS_CHARGE'),
  charge: createAsyncAction('MAIN_ACCEPT_CHARGE', (customerId, cardId, amount, dailyCigarettes, currentCigarettes) => {
    //TODO: charge!!
    return charge({
      amount,
      customerId,
      cardId,
      dailyCigarettes,
      currentCigarettes
    });
  })
};

const handlers = {
  
  [ actions.addCigarette ]: (state) => {
    let cigarettes = state.get('cigarettes').push({
      timestamp: new Date().getTime(),
      charged: false
    });
    return state.merge({ dismissed: false, cigarettes });
  },
  
  [ actions.dismiss ]: (state) => state.merge({ dismissed: true }),
  
  [ actions.charge.SUCCEED ]: (state, action) => {
    let cigarettes = state.get('cigarettes').toJS();
    let charges = state.get('charges');
    return state.merge({
      dismissed: false,
      cigarettes: cigarettes.map( c => ({ timestamp: c.timestamp, charged: true })),
      charges: charges.push({
        timestamp: new Date().getTime(),
        amount: action.payload.amount
      })
    });
  }
};

const reducer = createReducer(
    initialState,
    handlers
);

const selectors = {
  todaysCigarettesList (state) {
    return state
      .getIn(['main', 'cigarettes'])
      .toJS()
      .filter((c) => moment().startOf('day').isBefore(c.timestamp));
  },
  todaysCigarettes (state) {
    return this.todaysCigarettesList(state).length;
  },
  availableCigarettes (state) {
    let { dailyCigarettes } = state.get('config').toJS();
    let todaysCigarettes = this.todaysCigarettes(state);
    return dailyCigarettes - todaysCigarettes;
  },
  needToCharge (state) {
    let { dailyCigarettes } = state.get('config').toJS();
    let todaysCigarettesList = this.todaysCigarettesList(state);
    let exceeded = todaysCigarettesList.slice(dailyCigarettes);
    return exceeded.filter(c => !c.charged).length;
  },
  nextCigaretteCost (state) {
    let availableCigarettes = this.availableCigarettes(state);
    return availableCigarettes > 0 ? 0 : Math.pow(2, Math.abs(availableCigarettes));
  },
  totalCost (state) {
    let { dailyCigarettes } = state.get('config').toJS();
    return this.todaysCigarettesList(state)
      .slice(dailyCigarettes) // don't charge for the daily quota
      .map((cigarette, index) => {
        // don't charge twice!
        return cigarette.charged ? 0 : Math.pow(2, index);
      })
      .reduce((a, b) => a+b, 0)
  },
  spentThisMonth(state) {
    return state
      .getIn(['main', 'charges'])
      .toJS()
      .filter((c) => moment().startOf('month').isBefore(c.timestamp))
      .map(c => c.amount)
      .reduce((a, b) => a + b, 0);
  },
  willExceedBugdet(state) {
    let { monthly } = state.get('config').toJS();
    let nextCigaretteCost = this.nextCigaretteCost(state);
    let spentThisMonth = this.spentThisMonth(state);
    return spentThisMonth + nextCigaretteCost > monthly;
  }
}

export {
  actions,
  reducer,
  selectors
}
