import React, { PureComponent } from 'react';
import About from './pages/About';
import Home from './pages/Home';

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home />
        <About />
      </div>
    );
  }
}
