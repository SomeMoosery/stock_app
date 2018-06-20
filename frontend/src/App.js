import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import axios from 'axios';
import{
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import stockApp from './reducers';
import {auth} from './actions';
import Main from './components/Main';
import Profile from './components/Profile';
import Stock from './components/Stock';
import Login from './components/Login';
import Register from './components/Register';

let store = createStore(stockApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

  componentDidMount(){
    this.props.loadUser();
  }
  // constructor(props){
  //   super(props);
  //   this.state={};
  // }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        // console.log(this.props.auth.user);
        return <ChildComponent {...props} />
      }
    }} />
  }

  render() {
    let {PrivateRoute} = this;
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path = '/' component = {Main}/>
            <Route exact path = '/login' component = {Login}/>
            <Route exact path = '/profiles/:userId' component = {Profile}/>
            <Route exact path = '/stocks/:stockId' component = {Stock}/>
            <Route exact path = '/register' component = {Register}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
}

const styles = {};

styles.general = {
  padding: "20px"
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}
