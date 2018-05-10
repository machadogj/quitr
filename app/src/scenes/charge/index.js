import Component from './component';

import { connect } from 'react-redux';
import { actions as mainActions} from '../../store/models/main';
import { selectors as mainSelectors } from '../../store/models/main';
const { charge, dismiss } = mainActions;

export default connect(
    (state) => ({
      config: state.get('config').toJS(),
      todaysCigarettes: mainSelectors.todaysCigarettes(state),
      todaysCigarettesList: mainSelectors.todaysCigarettesList(state),
      total: mainSelectors.totalCost(state),
    }),
    (dispatch, props) => ({
      onDismiss: () => {
        dispatch(dismiss());
        props.navigation.goBack(null);
      },
      onAccept: async (customerId, cardId, amount, dailyCigarettes, currentCigarettes) => {
        await dispatch(charge(customerId, cardId, amount, dailyCigarettes, currentCigarettes));
        props.navigation.goBack(null);
      }
    })
)(Component);