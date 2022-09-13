import React from 'react';

import { deAction, subAction } from '../store/actionCreators';
// import { connect } from '../utils/connect';
import { connect } from 'react-redux'; // 用redux的 不用自己写的

function About(props) {
  const { banners, recommends } = props;
  return (
    <>
      <h1>About funtion component</h1>
      <h2>count: {props.counter}</h2>
      <button onClick={(e) => props.decrement()}>-1</button>
      <button onClick={(e) => props.subNumber(5)}>-5</button>
      <ul>
        <h2>banners</h2>
        {banners.map((item, index) => {
          return <li key={item.acm}>{item.title}</li>;
        })}

        <h2>recommends</h2>
        {recommends.map((item, index) => {
          return <li key={item.acm}>{item.title}</li>;
        })}
      </ul>
    </>
  );
}

const mapStateToProps = (state) => ({
  counter: state.counter,
  banners: state.banners,
  recommends: state.recommends,
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
