import Component from './component';

export default {
  type: Component,
  props: [{
    name: 'empty',
    navigation: { state: {} },
    email: null,
    onSubmit: () => alert('added!')
  }, {
    name: 'filled',
    navigation: { state: {} },
    email: 'machadogj@gmail.com',
    onSubmit: () => alert('added!')
  }, {
    name:'back enabled',
    navigation: { state: { params: { backEnabled: true} } },
    email: null,
    onSubmit: () => alert('added!')
  }]
}
