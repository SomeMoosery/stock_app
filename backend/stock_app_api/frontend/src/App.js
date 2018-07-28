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
import OfferDetail from './components/OfferDetail';
import AskDetail from './components/AskDetail';
import AddOffer from './components/AddOffer';
import AddAsk from './components/AddAsk';
import BankDetail from './components/BankDetail';
import AppBar from './components/AppBar';
import About from './components/About';
import Pricing from './components/Pricing';

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
        return (
          <div style={{textAlign:'center'}}>
                    <div className="sk-cube-grid">
                        <div className="sk-cube sk-cube1"></div>
                        <div className="sk-cube sk-cube2"></div>
                        <div className="sk-cube sk-cube3"></div>
                        <div className="sk-cube sk-cube4"></div>
                        <div className="sk-cube sk-cube5"></div>
                        <div className="sk-cube sk-cube6"></div>
                        <div className="sk-cube sk-cube7"></div>
                        <div className="sk-cube sk-cube8"></div>
                        <div className="sk-cube sk-cube9"></div>
                    </div>
                    <p>Welcome</p>
                </div>
        )
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return (
          <div>
          <ChildComponent {...props} />
          </div>
        )
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
          <Route exact path="/offers/:offer" component={OfferDetail}/>
          <Route exact path="/asks/:ask" component={AskDetail}/>
          <Route exact path="/add-offer" component={AddOffer}/>
          <Route exact path="/add-ask" component={AddAsk}/>
          <Route exact path="/banks/:bank" component={BankDetail}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/pricing" component={Pricing}/>
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
