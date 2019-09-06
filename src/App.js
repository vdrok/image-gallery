import React from 'react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import store, { history } from './store';

import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Home} />
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
