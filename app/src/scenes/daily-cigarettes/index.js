import Component from './component';
import { connect } from 'react-redux';
import { actions as configActions} from '../../store/models/config';
const { setDailyCigarettes } = configActions;

export default connect(
  (state) => ({
    amount: state.get('config').toJS().dailyCigarettes
  }),
  (dispatch, props) => ({
    onAmountChange: (amount) => {
      if (amount === undefined ||
          amount === null ||
          amount < 0) {
        alert('Amount has be 0 or bigger!');
      }
      else {
        dispatch(setDailyCigarettes(amount))
      }
    },
    onSubmit: (amount) => {
      let { navigation } = props;
      if (amount === undefined ||
        amount === null ||
        amount < 0) {
        return alert('Amount has be 0 or bigger!');
      }
      const { params } = navigation.state;
      if (params && params.backEnabled) {
        navigation.goBack(null);
      }
      else {
        navigation.navigate('home');
      }
    }
  })
)(Component);
