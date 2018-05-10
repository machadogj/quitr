import Component from './component';
import { connect } from 'react-redux';
import { actions as configActions} from '../../store/models/config';
const { setMonthly } = configActions;

export default connect(
  (state) => ({
    amount: state.get('config').toJS().monthly
  }), //eslint-disable-line
  (dispatch, props) => ({
    onAmountChange: (amount) => {
      if (amount === undefined ||
          amount === null ||
          amount < 1) {
        alert('Amount has be 1 or bigger!');
      }
      else {
        dispatch(setMonthly(amount))
      }
    },
    onSubmit: (amount) => {
      const { navigation } = props;
      if (amount === undefined ||
        amount === null ||
        amount < 1) {
        return alert('Amount has be 1 or bigger!');
      }
      const { params } = navigation.state;
      if (params && params.backEnabled) {
        navigation.goBack(null);
      }
      else {
        navigation.navigate('daily');
      }
    }
  })
)(Component);