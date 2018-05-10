import Component from './component';

export default {
  type: Component,
  props: [{
    name: 'many',
    config: {
      customerId: 'machadogj@gmail.com',
      cardId: 'abc',
      dailyCigarettes: 2
    },
    todaysCigarettes: 5,
    todaysCigarettesList: [{
      timestamp: new Date().getTime() - 1000 * 60 * 180,
      charged: true
    }, {
      timestamp: new Date().getTime() - 1000 * 60 * 120,
      charged: true
    }, {
      timestamp: new Date().getTime() - 1000 * 60 * 60,
      charged: true
    }, {
      timestamp: new Date().getTime() - 1000 * 60 * 30,
      charged: false
    }, {
      timestamp: new Date().getTime() - 1000 * 60 * 1,
      charged: false
    }],
    total: 6,
    onAccept: (...args) => alert(`Added\n${JSON.stringify(args, 0, 2)}`)
  }]
}
