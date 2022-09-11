import React, { PureComponent } from 'react';

import store from '../store';

import { deAction, subAction } from '../store/actionCreators';

export default class About extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: store.getState().counter,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        counter: store.getState().counter,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { counter } = this.state;
    return (
      <>
        <h1>About</h1>
        <h2>count: {counter}</h2>
        <button onClick={(e) => this.decrement()}>-1</button>
        <button onClick={(e) => this.subNumber(5)}>-5</button>
      </>
    );
  }

  decrement() {
    store.dispatch(deAction());
  }

  subNumber(num) {
    store.dispatch(subAction(num));
  }
}
