import { memo } from 'react';
import { connect } from 'react-redux';
import counterSlice from './modules/counter';

const ReduxHookBefore = memo((props) => {
  const { counter, addNumber, subNumber } = props;

  const addNumberHandle = (num) => {
    addNumber(num);
  };

  const subNumberHandle = (num) => {
    subNumber(num);
  };
  return (
    <div>
      <h1>counter is {counter}</h1>
      <button onClick={(e) => addNumberHandle(1)}>+1</button>
      <button onClick={(e) => addNumberHandle(5)}>+5</button>
      <button onClick={(e) => subNumberHandle(-5)}>-5</button>
    </div>
  );
});

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
});

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(counterSlice.actions.addNumberAction(num));
  },
  subNumber(num) {
    dispatch(counterSlice.actions.subNumberAction(num));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxHookBefore);
