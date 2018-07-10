import React, { Component } from 'react';
import {connect} from 'react-redux';

import { stocks, auth, plaid, offer, ask } from '../actions';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import PlaidLink from 'react-plaid-link';

class Home extends React.Component{
  state = {
    name: "",
    updateStockId: null,
  }

  handleOnSuccess = (token, metadata) => {
    this.props.addBank(metadata.public_token, metadata.institution.name);
  }

  handleOnExit(){
    console.log('Exit!');
  }

  resetForm = () => {
    this.setState({name: "", updateStockId: null});
  }

  selectForEdit = (id) => {
    let stock = this.props.stocks[id];
    this.setState({name: stock.name, updateStockId: id});
  }

  submitStock = (e) => {
    e.preventDefault();
    if (this.state.updateStockId === null) {
      console.log(this.state.name);
      this.props.addStock(this.state.name);
      window.location.reload();
    } else {
      this.props.updateStock(this.state.name, this.state.updateStockId);
    }
    this.resetForm();
    // window.location.reload();
  }

  componentDidMount(){
    // this.props.fetchAllStocks();
    // this.props.fetchUserStocks(this.props.user.id);
    this.props.fetchUserBanks(this.props.user.id);
    this.props.fetchOffers();
    this.props.fetchAsks();
    // window.location.reload();
    // console.log(this.props.user.id);
  }

  render(){
    return(
      <div>
        <h2>Welcome to Loaning App!</h2><br/>

        <PlaidLink
          clientName = 'LoanApp'
          env = 'sandbox'
          product = {['auth', 'transactions']}
          publicKey = '707d6df9798a9bf35257173c18e86b'
          onExit = {this.handleOnExit}
          onSuccess = {this.handleOnSuccess}>
          Link a Bank Account
        </PlaidLink>


        <div style={{textAlign: "left"}}>
          Logged in as {this.props.user.username} <Button onClick={this.props.logout} color='secondary' variant='outlined'>logout</Button>
        </div>

        {/* <h3>Stocks</h3>
        <table>
          <tbody>
          {this.props.stocks.map((stock, id) => (
            <tr key={`stock_${id}`}>
              <td>{id}</td>
              <td>{stock.name}</td>
              <td><Button onClick={()=>this.selectForEdit(id)} color='default' variant='outlined'>Edit</Button></td>
              <td><Button onClick={()=>this.props.deleteStock(id)} color='secondary' variant='outlined'>Delete</Button></td>
            </tr>
          ))}
          </tbody>
        </table> */}

        <h3>Banks</h3>
        <table>
          <tbody>
          {this.props.banks.map((bank, id) => (
            <tr key={`bank_${id}`}>
              <td>{bank.owner}</td>
              <td>{bank.bank_name}</td>
            </tr>
          ))}
          </tbody>
        </table>

        {/* <h3>Add new stock</h3>
        <form onSubmit={this.submitStock}>
          <input value={this.state.name} placeholder="Enter stock here" onChange={(e) => this.setState({name: e.target.value})} required />
          <Button type="submit" color="primary" variant='outlined'>Save Stock</Button>
          <Button onClick={this.resetForm} color="secondary" variant='outlined'>Reset</Button>
        </form> */}

        <h3>Offers</h3>
        <table>
          <tbody>
            {this.props.offers.map((offer, id) => (
              <tr key={`offer_${id}`}>
                <td>{offer.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Asks</h3>
        <table>
          <tbody>
            {this.props.asks.map((ask, id) => (
              <tr key={`ask_${id}`}>
                <td>{ask.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  //Just returns an object (containing stocks: state.stocks where state.stocks is Redux state)
  return {
    stocks: state.stocks,
    user: state.auth.user,
    banks: state.plaid,
    offers: state.offer,
    asks: state.ask,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addStock: (name) => {
      dispatch(stocks.addStock(name));
    },
    updateStock: (id,name) => {
      dispatch(stocks.updateStock(id, name));
    },
    deleteStock: (id) => {
      dispatch(stocks.deleteStock(id));
    },
    fetchAllStocks: () => {
      dispatch(stocks.fetchAllStocks());
    },
    fetchUserStocks: (id) => {
      dispatch(stocks.fetchUserStocks());
    },
    logout: () => {
      dispatch(auth.logout());
    },
    addBank: (public_token, bank_name) => {
      dispatch(plaid.addBank(public_token, bank_name));
    },
    fetchUserBanks: (id) => {
      dispatch(plaid.fetchUserBanks());
    },
    fetchOffers: () => {
      dispatch(offer.fetchOffers());
    },
    fetchAsks: () => {
      dispatch(ask.fetchAsks());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
