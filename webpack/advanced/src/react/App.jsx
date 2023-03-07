import { memo, useState } from 'react';

const App = memo((props) => {
  const [c, setC] = useState(1);
  return (
    <div>
      <h2>{c}</h2>
      <button onClick={(e) => setC(c + 1)}>+1</button>
    </div>
  );
});

App.propTypes = {};

export default App;
