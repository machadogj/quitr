import { connect } from 'react-redux';
import Component from './component';

export default connect(
    (state) => {
      let config = state.get('config').toJS();
      return {
        dailyCigarettes: config.dailyCigarettes,
        cardId: config.cardId,
        email: config.email,
        monthly: config.monthly
      }
    }, //eslint-disable-line
    (/*dispatch, props*/) => ({
    })
)(Component);