import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import{
  BroswerRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Stock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      owner: '',
      owner_id: null,
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
        owner_id: stock.owner_id,
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
        <h1>Stock Detail Page for {this.state.name} stock of User {this.state.owner} (ID: {this.state.owner_id})</h1>
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

export default Stock;
