import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import axios from 'axios';
import{
  // BroswerRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import stockApp from './reducers';
// import {stocks} from './actions';
import Profile from './components/Profile';
import Stock from './components/Stock';

let store = createStore(stockApp, applyMiddleware(thunk));

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render() {
    return (
      <Provider store={store}>
      <div style = {styles.general}>
        <Link to={"/main"}>Home</Link>
        <br/>
        <Route path="/main" component={Main}/>
        <Route path='/profiles/:userId' component={Profile}/>
        <Route path='/stocks/:stockId' component={Stock}/>
      </div>
      </Provider>
    );
  }
}

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profiles: [],
    };
  }

  async componentDidMount(){
    try{
      const res = await fetch('http://127.0.0.1:8000/api/profiles/');
      const profiles = await res.json();
      this.setState({
        profiles
      });
    } catch(e){
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <h1>Test React Stock App</h1>
        {this.state.profiles.map(profile => (
          <div key = {profile.id}>
            <span><Link to={`/profiles/${profile.id}`}>id: {profile.id}</Link></span><span>    |     </span>
            <span>{profile.user}</span>
          </div>
        ))}
        <br/>
      </div>
    );
  }
}

const styles = {};

styles.general = {
  padding: "20px"
}

export default App;
