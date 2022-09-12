import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import store from './store';
import { StoreContext } from './utils/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);
