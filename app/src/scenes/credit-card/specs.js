import Component from './component';

export default {
  type: Component,
  props: [{
    name: 'empty',
    navigation: { state: {} },
    email: 'machadogj@gmail.com',
    onSubmit: (cc, email) => alert(`Added\n${JSON.stringify(cc, 0, 2)}\nEmail: ${email}`)
  }, {
    name: 'back enabled',
    navigation: { state: { params: { backEnabled: true} } },
    email: 'machadogj@gmail.com',
    onSubmit: (cc, email) => alert(`Added\n${JSON.stringify(cc, 0, 2)}\nEmail: ${email}`)
  }]
}
