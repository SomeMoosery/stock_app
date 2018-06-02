import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

import {stocks, auth} from '../actions';

import {connect} from 'react-redux';

// import stockApp from './reducers';


class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profiles: [],
    };
  }

  async componentDidMount(){
    this.props.fetchAllStocks();
    // console.log(this.props.auth);
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
        <div>
          <p>Hello, {this.props.user.username}</p>
          <button onClick={this.props.logout}>logout</button>
        </div>
        <br/>
        {this.state.profiles.map(profile => (
          <div key = {profile.id}>
            <span><Link to={`/profiles/${profile.id}`}>id: {profile.id}</Link></span><span>    |     </span>
            <span>{profile.user}</span>
          </div>
        ))}
        {this.props.stocks.map((stock, id) => (
          <div key = {stock.id}>
            <p>{stock.name}</p>
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.auth.user);
  return {
    stocks: state.stocks,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllStocks: () => {
      dispatch(stocks.fetchAllStocks());
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
