import { createReducer } from 'redux-immutablejs';
import { createAction } from 'redux-actions';
import createAsyncAction from '../lib/createAsyncAction';
import { createToken } from '../lib/stripe';
import { addCard } from '../lib/lambda';

const initialState = {
  monthly: null,
  dailyCigarettes: null,
  email: null,
  customerId: null,
  cardId: null
};

const actions = {
  setMonthly: createAction('CONFIG_SET_MONTHLY'),
  setDailyCigarettes: createAction('CONFIG_SET_DAILY_CIGARETTES'),
  setEmail: createAction('CONFIG_SET_EMAIL'),
  addCreditCard: createAsyncAction('CONFIG_ADD_CREDIT_CARD', async (cc, email) => {
    //make network request
    let token = await createToken(cc);
    console.log('stripe card token', token);
    let customerId = `cust_${email}`;
    let cardToken = token.id;
    let cardId = token.card.id;
    let card = await addCard({
      customerId,
      email,
      cardToken,
      cardId
    });
    console.log('lambda card', card);
    return {
      customerId,
      cardId
    };
  })
};

const handlers = {
  [ actions.setMonthly ]: (state, action) => state.merge({ monthly: action.payload }),
  [ actions.setDailyCigarettes ]: (state, action) => state.merge({ dailyCigarettes: action.payload }),
  [ actions.setEmail ]: (state, action) => state.merge({ email: action.payload }),
  [ actions.addCreditCard.SUCCEED ]: (state, action) => {
    //ie: id = "tok_19YFwOKNM6Ex33RvaPtfr5la"
    let { customerId, cardId } = action.payload;
    return state.merge({ customerId, cardId });
  }
};

const reducer = createReducer(
    initialState,
    handlers
);

export {
  actions,
  reducer
}
