import Component from './component';

export default {
  type: Component,
  props: [{
    name: 'empty',
    navigation: { state: {} },
    onAmountChange: a => a,
    onSubmit: (amount) => alert(`submitted: ${amount}`)
  }, {
    name: 'filled',
    navigation: { state: {} },
    amount: 3,
    onAmountChange: a => a,
    onSubmit: (amount) => alert(`submitted: ${amount}`)
  }, {
    name:'back enabled',
    navigation: { state: { params: { backEnabled: true} } },
    onAmountChange: a => a,
    onSubmit: (amount) => alert(`submitted: ${amount}`)
  }]
}
