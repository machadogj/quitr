import Component from './component';
import { connect } from 'react-redux';
import { actions as configActions} from '../../store/models/config';
const { setEmail } = configActions;

export default connect(
    (state) => ({
      email: state.get('config').toJS().email
    }), //eslint-disable-line
    (dispatch, props) => ({
      onEmailChange: (email) => {
        dispatch(setEmail(email));
      },
      onSubmit: async (email) => {
        if (!email) {
          return alert('Email can\'t be empty');
        }
        const { navigation } = props;
        const { params } = navigation.state;
        if (params && params.backEnabled) {
          navigation.goBack(null);
        }
        else {
          navigation.navigate('credit-card');
        }
      }
    })
)(Component);