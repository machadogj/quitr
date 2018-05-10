import Component from './component';
import { connect } from 'react-redux';
import withLifecycle from '../../lib/withLifecycle';
import { actions as mainActions} from '../../store/models/main';
import { selectors as mainSelectors } from '../../store/models/main';
import * as router from '../../router';
const { addCigarette } = mainActions;

export default connect(
    (state) => ({
      dailyCigarettes: state.get('config').toJS().dailyCigarettes,
      cardId: state.get('config').toJS().cardId,
      email: state.get('config').toJS().email,
      dismissed: state.get('main').toJS().dismissed,
      todaysCigarettes: mainSelectors.todaysCigarettes(state),
      availableCigarettes: mainSelectors.availableCigarettes(state),
      nextCigaretteCost: mainSelectors.nextCigaretteCost(state),
      needToCharge: mainSelectors.needToCharge(state),
      currentRoute: router.selectors.currentRoute(state),
      monthly: state.get('config').toJS().monthly,
      willExceedBugdet: mainSelectors.willExceedBugdet(state)
    }),
    (dispatch/*, props*/) => ({
      onAdd: () => dispatch(addCigarette())
    })
)(withLifecycle({
  onMount: checkPendingNavigations,
  onUpdate: checkPendingNavigations
})(Component));

function checkPendingNavigations() {
  let { cardId, email, needToCharge, currentRoute, dismissed, willExceedBugdet } = this.props;
  if (currentRoute !== 'home') return;
  if (willExceedBugdet) return;
  if (needToCharge && !email) {
    setTimeout(()=> {
      this.props.navigation.navigate('email');
    }, 0);
  }
  else if (needToCharge && !cardId) {
    setTimeout(()=> {
      this.props.navigation.navigate('credit-card');
    }, 0);
  }
  else if (needToCharge && cardId && !dismissed) {
    setTimeout(()=> {
      this.props.navigation.navigate('charge');
    }, 0);
  }
}
