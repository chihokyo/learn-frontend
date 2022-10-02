import React, { Component } from 'react';

// 实现一个counter变化 页面的title也变化的效果
export class EffectBefore extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    document.title = this.state.counter;
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    document.title = this.state.counter;
  }
  render() {
    return (
      <div>
        EffectBefore
        <h1>{this.state.counter}</h1>
        <button
          onClick={(e) => {
            this.setState({ counter: this.state.counter + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default EffectBefore;
