import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import './App.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import stockApp from './reducers';

import Home from './components/Home';

let store = createStore(stockApp, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
