import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

import {stocks, auth} from '../actions';

import {connect} from 'react-redux';

// import stockApp from './reducers';


class Main extends React.Component{
  state = {
    profiles: [],
  };

  async componentDidMount(){
    console.log('here');
    this.props.fetchAllStocks();
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

  resetForm = () => {
    this.setState({name: ""});
  }
  submitStock = (e) => {
    this.props.addStock(this.state.name).then(this.resetForm);
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


        <h3>Add Stock for {this.props.user.username}</h3>
        <form onSubmit={this.submitNote}>
          <input value={this.state.name} placeholder="Enter note here..." onChange={(e) => this.setState({name: e.target.value})} required />
          <button onClick={this.resetForm}>Reset</button>
          <input type="submit" value="Save Note" />
        </form>
        {this.props.stocks.map((stock, id) => (
          <div key = {stock.id}>
            <p>{stock.name}</p>
          </div>
        ))}
      </div>
    );
  }
}
let count = 1;
const mapStateToProps = state => {
  console.log("pass" + count);
  count = count + 1;
  console.log(state);
  return {
    stocks: state.stocks,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addStock: (name) => {
      return dispatch(stocks.addStock(name));
    },
    fetchAllStocks: () => {
      dispatch(stocks.fetchAllStocks());
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
