import TourTests from './src/scenes/tour/specs';
import MonthlyBudgetTests from './src/scenes/monthly-budget/specs';
import DailyCigarettesTests from './src/scenes/daily-cigarettes/specs';
import HomeTests from './src/scenes/home/specs';
import SettingsTests from './src/scenes/settings/specs';
import EmailTests from './src/scenes/email/specs';
import AddCreditCardTests from './src/scenes/credit-card/specs';
import ChargeTests from './src/scenes/charge/specs';

import Button from './src/components/button';

export default [
  TourTests,
  MonthlyBudgetTests,
  DailyCigarettesTests,
  HomeTests,
  SettingsTests,
  EmailTests,
  AddCreditCardTests,
  ChargeTests,
  {
    type: Button,
    props: [{
      name: 'default',
      text: 'Go!',
      onPress: () => alert('gone')
    }, {
      name: 'loading',
      text: 'Go!',
      loading: true,
      onPress: () => alert('gone')
    }]
  }
];
