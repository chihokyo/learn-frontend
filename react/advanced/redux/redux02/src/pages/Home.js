import React, { PureComponent } from 'react';

import store from '../store';
import { inAction, addAction } from '../store/actionCreators';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: store.getState().counter,
    };
  }

  //   必须要订阅 才能知道最新的情况
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        counter: store.getState().counter,
      });
    });
  }

  //   卸载组件的时候也要取消订阅
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { counter } = this.state;
    return (
      <>
        <h1>Home</h1>
        <h2>count: {counter}</h2>
        <button onClick={(e) => this.increment()}>+1</button>
        <button onClick={(e) => this.addNumber(5)}>+5</button>
      </>
    );
  }

  increment() {
    store.dispatch(inAction());
  }

  addNumber(num) {
    store.dispatch(addAction(num));
  }
}
