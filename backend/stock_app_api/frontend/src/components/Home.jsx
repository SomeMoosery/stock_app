import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import { stocks, auth, plaid, offer, ask } from '../actions';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'; 

import OfferAskFeed from './OfferAskFeed';
import UserBanks from './UserBanks';

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

const initialState = {};

class Home extends React.Component{

  constructor(props){
    super(props);
  }

  state = {
    name: "",
    updateStockId: null,
    value: 0,
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

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
      this.props.addStock(this.state.name);
      window.location.reload();
    } else {
      this.props.updateStock(this.state.name, this.state.updateStockId);
    }
    this.resetForm();
    // window.location.reload();
  }

  componentDidMount(){
    if (this.props.offers.length == 0){
      this.props.fetchOffers();
    }
    if (this.props.asks.length == 0){
      this.props.fetchAsks();
    }
    if (this.props.banks.length == 0){
      this.props.fetchUserBanks(this.props.user.id);
    }
    window.localStorage.setItem('username', this.props.user.username);
    window.localStorage.setItem('user_id', this.props.user.id);
  }
  render(){

    const { classes } = this.props;
    const { value } = this.state;

    return(
      <div>
        <div style = {{width: '100%', float: 'left' }}>
          <div style = {{float: 'left', paddingLeft: '10px', textAlign: 'center' }}>
            <h2>Welcome to Loaning App!</h2>
          </div>
          <div style={{float: "right", paddingRight: '10px', textAlign: 'center'}}>
            <h2>Logged in as {this.props.user.username}</h2> 
            <Button onClick={this.props.logout} color='secondary' variant='outlined'>logout</Button>
            <div><Button color = 'default' variant='outlined' ><Link to='/profile' style={{ textDecoration: 'none', color:'black' }} user={this.props.user}>Profile</Link></Button></div>
          </div>
        </div>
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
  return {
    auth: state.auth,
    stocks: state.stocks,
    user: state.auth.user,
    banks: state.plaid,
    offers: state.offer,
    asks: state.ask,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    logout: () => {
      dispatch(auth.logout());
    },
    fetchOffers: () => {
      dispatch(offer.fetchOffers());
    },
    fetchAsks: () => {
      dispatch(ask.fetchAsks());
    },
    fetchUserBanks: (id) => {
      dispatch(plaid.fetchUserBanks());
    },
  }
}

const styles = theme => ({
  body: {
    overflowX: 'hidden',
    overflowY: 'scroll',
  }
});

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Home);