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
    // this.props.fetchAllStocks();
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
        <div style={{textAlign: "right"}}>
          {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
        </div>
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
const mapStateToProps = state => {
  return {
    stocks: state.stocks,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
