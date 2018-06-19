import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
