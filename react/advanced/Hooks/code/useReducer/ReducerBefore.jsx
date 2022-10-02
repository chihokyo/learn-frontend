import { useState } from 'react';

// 以前的话，这样很麻烦
function ReducerBefore() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>{counter}</h1>
      <button
        onClick={(e) => {
          setCounter(counter + 1);
        }}
      >
        +1
      </button>
      <button
        onClick={(e) => {
          setCounter(counter - 1);
        }}
      >
        -1
      </button>
      <button
        onClick={(e) => {
          setCounter(counter + 5);
        }}
      >
        +5
      </button>
      <button
        onClick={(e) => {
          setCounter(counter - 5);
        }}
      >
        -5
      </button>
    </div>
  );
}

export default ReducerBefore;
