import Component from './component';
import { connect } from 'react-redux';
import { actions as configActions} from '../../store/models/config';
const { addCreditCard } = configActions;

export default connect(
    (state) => ({
      email: state.get('config').toJS().email
    }), //eslint-disable-line
    (dispatch, props) => ({
      onSubmit: async (cc, email) => {
        await dispatch(addCreditCard(cc, email));
        const { navigation } = props;
        const { params } = navigation.state;
        if (params && params.backEnabled) {
          navigation.goBack();
        }
        else {
          navigation.goBack('home');
        }
      }
    })
)(Component);