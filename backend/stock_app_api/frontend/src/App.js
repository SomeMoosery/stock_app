import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
// import 'typeface-roboto';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import stockApp from './reducers';
import {auth, plaid} from './actions';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

let store = createStore(stockApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.loadUser();
    let user = this.props.user;
    // this.props.fetchUserBanks(this.props.user.id);
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  render() {
    let {PrivateRoute} = this;
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state.auth);
  return {
    auth: state.auth,
    user: state.auth.user,
    banks: state.plaid,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    },
    fetchUserBanks: (id) => {
      dispatch(plaid.fetchUserBanks());
    },
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);
