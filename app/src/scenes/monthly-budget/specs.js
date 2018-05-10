import Component from './component';

export default {
  type: Component,
  props: [{
    name: 'empty',
    navigation: { state: {} },
    onSubmit: (amount) => alert(`submitted: ${amount}`)
  }, {
    name: 'filled',
    navigation: { state: {} },
    amount: 10,
    onSubmit: (amount) => alert(`submitted: ${amount}`)
  }, {
    name:'back enabled',
    navigation: { state: { params: { backEnabled: true} } },
    onSubmit: (amount) => alert(`submitted: ${amount}`)
  }]
}
