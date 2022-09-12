import React from 'react';

import { deAction, subAction } from '../store/actionCreators';
import { connect } from '../utils/connect';

function About(props) {
  return (
    <>
      <h1>About funtion component</h1>
      <h2>count: {props.counter}</h2>
      <button onClick={(e) => props.decrement()}>-1</button>
      <button onClick={(e) => props.subNumber(5)}>-5</button>
    </>
  );
}

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
  decrement: () => {
    dispatch(deAction());
  },
  subNumber: (num) => {
    dispatch(subAction(num));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(About);
