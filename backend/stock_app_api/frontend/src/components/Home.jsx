import React, { Component } from 'react';
import {connect} from 'react-redux';

import { stocks, auth, plaid, offer, ask } from '../actions';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'; 

import OfferAskFeed from './OfferAskFeed';

import PlaidLink from 'react-plaid-link';
import { compose } from 'redux';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Home extends React.Component{
  state = {
    name: "",
    updateStockId: null,
    value: 0,
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleOnSuccess = (token, metadata) => {
    this.props.addBank(metadata.public_token, metadata.institution.name);
    window.alert("Bank account added. Click 'OK' to refresh");
    window.location.reload();
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

    const { classes } = this.props;
    const { value } = this.state;

    return(
      <div>
        <h2>Welcome to Loaning App!</h2><br/>

        <div style={{textAlign: "left"}}>
          Logged in as {this.props.user.username} <Button onClick={this.props.logout} color='secondary' variant='outlined'>logout</Button>
        </div>

        <PlaidLink
          clientName = 'LoanApp'
          env = 'sandbox'
          product = {['auth', 'transactions']}
          publicKey = '707d6df9798a9bf35257173c18e86b'
          onExit = {this.handleOnExit}
          onSuccess = {this.handleOnSuccess}>
          Link a Bank Account
        </PlaidLink>

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

        <hr/>

        <OfferAskFeed/>

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

        {/* <h3>Add new stock</h3>
        <form onSubmit={this.submitStock}>
          <input value={this.state.name} placeholder="Enter stock here" onChange={(e) => this.setState({name: e.target.value})} required />
          <Button type="submit" color="primary" variant='outlined'>Save Stock</Button>
          <Button onClick={this.resetForm} color="secondary" variant='outlined'>Reset</Button>
        </form> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
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

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Home);