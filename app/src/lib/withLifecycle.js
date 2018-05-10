import React, { Component } from 'react';

const withLifecycle = ({onMount, onUpdate}) => Cmp => {
  class WithLifecycle extends Component {
    render() {
      return <Cmp {...this.props}/>
    }
  }

  if (onMount) {
    WithLifecycle.prototype.componentDidMount = onMount;
  }
  if (onUpdate) {
    console.log('attaching onUpdate');
    WithLifecycle.prototype.componentDidUpdate = onUpdate;
  }

  return WithLifecycle
}

export default withLifecycle;