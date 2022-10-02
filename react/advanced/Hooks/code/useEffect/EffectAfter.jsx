import React, { useEffect, useState } from 'react';

function EffectAfter() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    document.title = counter;
  });
  return (
    <div>
      EffectAfter
      <h1>{counter}</h1>
      <button
        onClick={(e) => {
          setCounter(counter + 1);
        }}
      >
        +1
      </button>
    </div>
  );
}

export default EffectAfter;
