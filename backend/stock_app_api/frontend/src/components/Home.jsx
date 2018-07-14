import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import { auth, plaid, offer, ask } from '../actions';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'; 

import OfferAskFeed from './OfferAskFeed';

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
    loading: true
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

  componentDidMount(){
    setTimeout(() => this.setState({loading: false}), 2000);
    this.props.offers.length = 0;
    if (this.props.offers.length === 0){
      this.props.fetchOffers();
    }
    this.props.asks.length = 0;
    if (this.props.asks.length === 0){
      this.props.fetchAsks();
    }
    if (this.props.banks.length === 0){
      this.props.fetchUserBanks(this.props.user.id);
    }
    window.localStorage.setItem('username', this.props.user.username);
    window.localStorage.setItem('user_id', this.props.user.id);
  }
  render(){

    const { classes } = this.props;
    const { value } = this.state;
    const { loading } = this.state;

        if (loading){
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
                    <p>Loaning, decentralized</p>
                </div>
            )
        }

    return(
      <div>
        <div style = {{width: '100%', float: 'left' }}>
          <div style = {{float: 'left', paddingLeft: '10px', textAlign: 'center' }}>
            <h2>Welcome to Loaning App!</h2>
          </div>
          <div style={{float: "right", paddingRight: '10px', textAlign: 'center'}}>
            <h2>Logged in as {this.props.user.username}</h2> 
            <div style = {{width:'100%', float:'left'}}>
              <div style = {{float: 'left'}}>
                <Button onClick={this.props.logout} color='secondary' variant='outlined'>logout</Button>
              </div>
              <div style={{float:'right'}}>
                <div><Button color = 'default' variant='outlined' ><Link to='/profile' style={{ textDecoration: 'none', color:'black' }} user={this.props.user}>Profile</Link></Button></div>
              </div>
            </div>
          </div>
        </div>
        <hr/>

        <OfferAskFeed/>
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