import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import{
  BroswerRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {stocks} from '../actions';

const mapDispatchToProps = dispatch => {
  return{
    addStock: (id, text) => {
      dispatch(stocks.addStock(id, text));
    },
    updateStock: (id, count) => {
      dispatch(stocks.addStock(id, count));
    },
    deleteStock: (id) => {
      dispatch(stocks.deleteStock(id));
    }
  }
}

const mapStateToProps = state => {
  return{
    stocks: state.stocks,
  }
}

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: '',
      bio: '',
      email: '',
      location: '',
      age: null,
      university: '',
      stocks: [],
      add_stock_text: '',
    }
  }
  submitStock = (e) => {
    e.preventDefault();
    const { match : { params } } = this.props;
    console.log(params.userId);
    axios.post(`http://127.0.0.1:8000/api/stocks/`,{
      owner: this.state.user,
      name: this.state.add_stock_text,
      count: 4,
    })
    .then(function(res){
      console.log(res);
    })
    .catch(function(err){
      console.log(err);
    });
    // console.log(this.state.user);
    // this.props.addStock(this.state.add_stock_text);
    // console.log(this.state.add_stock_text);
    // this.setState({text: ''});
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
      console.log(this.state.stocks[1].id);
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
            <button onClick={()=>this.selectForEdit(this.state.id)}>Edit</button>
            <button onClick={()=>this.props.deleteStock(this.state.id)}>Delete</button>
          </div>
        ))}
        <h3> Add new Stock </h3>
        <form onSubmit={this.submitStock}>
          <input
            value={this.state.add_stock_text}
            placeholder="Enter stock here"
            onChange={(e) => this.setState({add_stock_text: e.target.value})}
            required/>
          <input type="submit" value="Save Stock"/>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
