import React, { PureComponent } from 'react';
import { inAction, addAction } from '../store/actionCreators';

// import { connect } from '../utils/connect';
import { connect } from 'react-redux'; // 用redux的 不用自己写的

class Home extends PureComponent {
  render() {
    const { counter } = this.props;
    return (
      <>
        <h1>Home class component</h1>
        <h2>count: {counter}</h2>
        <button onClick={(e) => this.props.increment()}>+1</button>
        <button onClick={(e) => this.props.addNumber(5)}>+5</button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch(inAction());
    },
    addNumber: (num) => {
      dispatch(addAction(num));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
