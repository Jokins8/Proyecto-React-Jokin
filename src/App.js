import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Tienda from './containers/Tienda/Tienda';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Tienda />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
