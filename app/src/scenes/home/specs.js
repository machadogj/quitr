import Component from './component';

export default {
  type: Component,
  props: [{
    name: 'zero',
    dailyCigarettes: 10,
    cardId: 'abc',
    todaysCigarettes: 0,
    availableCigarettes: 10,
    nextCigaretteCost: 0,
    onAdd: () => alert('added!')
  }, {
    name: 'some',
    dailyCigarettes: 10,
    cardId: 'abc',
    todaysCigarettes: 5,
    availableCigarettes: 5,
    nextCigaretteCost: 0,
    onAdd: () => alert('added!')
  }, {
    name: 'limit',
    dailyCigarettes: 10,
    cardId: 'abc',
    todaysCigarettes: 10,
    availableCigarettes: 0,
    nextCigaretteCost: 1,
    onAdd: () => alert('added!')
  }]
}
