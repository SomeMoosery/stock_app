import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';

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

  state = {
    loading: true,
  }

  componentDidMount() {
    setTimeout(() => this.setState({loading: false}), 2000);
    this.props.loadUser();
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
    const { loading } = this.state;

        if (loading){
            return (
                <div style={{textAlign:'center'}}>
                    <div class="sk-cube-grid">
                        <div class="sk-cube sk-cube1"></div>
                        <div class="sk-cube sk-cube2"></div>
                        <div class="sk-cube sk-cube3"></div>
                        <div class="sk-cube sk-cube4"></div>
                        <div class="sk-cube sk-cube5"></div>
                        <div class="sk-cube sk-cube6"></div>
                        <div class="sk-cube sk-cube7"></div>
                        <div class="sk-cube sk-cube8"></div>
                        <div class="sk-cube sk-cube9"></div>
                    </div>
                    <p>Welcome</p>
                </div>
            )
        }
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
