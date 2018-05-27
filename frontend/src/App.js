import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import{
  BroswerRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render() {
    return (
      <div style = {styles.general}>
        <Link to={"/main"}>Home</Link>
        <br/>
        <Route path="/main" component={Main}/>
        <Route path='/profiles/:userId' component={Profile}/>
        <Route path='/stocks/:stockId' component={Stock}/>
      </div>
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

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: '',
      bio: '',
      location: '',
      age: null,
      university: '',
      stocks: [],
    }
  }
  componentDidMount(){
    const { match : { params } } = this.props;
    const emptyStocks = false;
    axios.get(`http://127.0.0.1:8000/api/profiles/${params.userId}`)
    .then(({ data: profile }) => {
      // console.log(profile);
      this.setState({
        user: profile.user,
        email: profile.email,
        bio: profile.bio,
        location: profile.location,
        age: profile.age,
        university: profile.university,
      });
      // console.log(this.state.email);
    })
    .catch(function(err){
      console.log("Error! " + err);
    });
    axios.get(`http://127.0.0.1:8000/api/profiles/${params.userId}/stocks/`)
    .then((response) => {
      this.setState({stocks: response.data});
      //TODO: Figure out where to implement this capitalization so that all stocks are capitalized. Probably in form to submit new stock.
      this.state.stocks.forEach(function(res){
        res = res.name.toUpperCase();
        console.log(res);
      });
    })
    .catch(function(err){
      console.log("Error!: " + err);
    });
  }
  render(){
    return(
      <div>
        <h1>Profile Detail Page for {this.state.user}</h1>
        <h4>User: {this.state.user}</h4>
        <h5>Email: {this.state.email}</h5>
        <h5>Bio: {this.state.bio}</h5>
        <h5>Location: {this.state.location}</h5>
        <h5>Age: {this.state.age}</h5>
        <h5>University: {this.state.university}</h5>
        <br/>
        <h3> Owned Stocks for {this.state.user}</h3>
        {this.state.stocks.map(stock => (
          <div key = {stock.id}>
            {this.state.userId}
            <span><Link to={`/stocks/${stock.id}`}>{stock.name}:</Link> {stock.count} shares.</span>
          </div>
        ))}
      </div>
    );
  }
}

class Stock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      owner: '',
      name: '',
      count: null,
      first_bought_date: '',
      open_price_today: null,
      high_price_today: null,
      low_price_today: null,
      close_price_today: null,
      total_value_today: null, //how much you own (count * close for now)
    }
  }
  componentDidMount(){
    const { match : { params } } = this.props;
    const alpha = require('alphavantage')({ key: 'B5VDVRB32WH3LOLR' });
    console.log("Stock id: " + params.stockId);
    axios.get(`http://127.0.0.1:8000/api/stocks/${params.stockId}`)
    .then(({ data: stock }) => {
      this.setState({
        owner: stock.owner,
        name: stock.name.toUpperCase(),
        count: stock.count,
        first_bought_date: stock.first_bought_date,
      });
      alpha.data.daily(this.state.name)
      .then(data=>{
        // console.log(data["Time Series (Daily)"]["2018-05-22"]["1. open"]);
        // console.log(data["Time Series (Daily)"]["2018-05-22"]["2. high"]);
        console.log(parseFloat(data["Time Series (Daily)"]["2018-05-22"]["4. close"]).toFixed(4));
        this.setState({
          open_price_today: data["Time Series (Daily)"]["2018-05-22"]["1. open"],
          high_price_today: data["Time Series (Daily)"]["2018-05-22"]["2. high"],
          low_price_today: data["Time Series (Daily)"]["2018-05-22"]["3. low"],
          close_price_today: data["Time Series (Daily)"]["2018-05-22"]["4. close"],
          total_value_today: parseFloat(data["Time Series (Daily)"]["2018-05-22"]["4. close"] * this.state.count).toFixed(4),
        });
      });
    })
    .catch(function(err){
      console.log("Error! " + err);
    });
  }
  render(){
    return(
      <div>
        <h1>Stock Detail Page for {this.state.name} stock of User {this.state.owner}</h1>
        <h5>You Own {this.state.count} shares of {this.state.name}</h5>
        <h5>{this.state.name} Open Price Today: {this.state.open_price_today}</h5>
        <h5>{this.state.name} High Price Today: {this.state.high_price_today}</h5>
        <h5>{this.state.name} Low Price Today: {this.state.low_price_today}</h5>
        <h5>{this.state.name} Close Price Today: {this.state.close_price_today}</h5>
        <h5>Your Current Investment in {this.state.name}: {this.state.total_value_today}</h5>
      </div>
    );
  }
}

const styles = {};

styles.general = {
  padding: "20px"
}

export default App;
