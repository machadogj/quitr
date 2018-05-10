import Component from './component';

export default {
  type: Component,
  props: [{
    name: 'empty'
  }, {
    name: 'configured',
    dailyCigarettes: 5,
    monthly: 10,
    email: 'machadogj@gmail.com',
    cardId: 'abc'
  }]
}
