import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'; 

import { compose } from 'redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { auth } from '../actions';

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

class OfferAskFeed extends React.Component{
  state = {
    name: "",
    updateStockId: null,
    value: 0,
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  searchUser(id){
    for (var i = 0; i < this.props.users.length; i++){
      if (id === this.props.users[i].id){
        return this.props.users[i].user;
      }
    }
  }

  searchUserGetRating(id){
    for (var i = 0; i < this.props.users.length; i++){
      if (id === this.props.users[i].id){
        return this.props.users[i].rating;
      }
    }
  }

  render(){

    const { classes } = this.props;
    const { value } = this.state;

    return(

        <div className={classes.root}>
          {value === 0 && <TabContainer>
            <h3 style={{textAlign:'center'}}>Offers</h3>
            <div className='scale-up-ver-top' style ={{display:'flex', justifyContent:'center', width:'100%'}}>
            <table style={{alignSelf:'center', width:'60%'}}>
              <tbody>
                {this.props.offers.map((offer, id) => (
                  <tr key={`offer_${id}`}>
                    <td>
                      <Link to={'/offers/' + offer.id} params={{ offerId: id }} style={{textDecoration:'none', color:'black', width:'100%'}}>
                      <Card style = {{minWidth:275}}>
                        <CardContent>
                            <Typography style={{marginBottom:'16', fontSize:'14'}}>
                                {offer.title}
                            </Typography>
                            <Typography style={{marginBottom:'12'}}>
                                {offer.description}
                            </Typography>
                            <Typography>
                                Loan Amount Offered: {offer.amount}<br/>
                                Weeks Until Full Repayment: {offer.weeks}<br/>
                                Interest Offered: {offer.interest}<br/>
                                Offered by: {this.searchUser(offer.owner)} ({this.searchUserGetRating(offer.owner)}/10)<br/>
                            </Typography>
                        </CardContent>
                      </Card>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </TabContainer>}
          {value === 1 && <TabContainer>
            <h3 style={{textAlign:'center'}}>Asks</h3>
            <div className='scale-up-ver-top' style ={{display:'flex', justifyContent:'center', width:'100%'}}>
            <table style={{alignSelf:'center', width: '60%'}}>
              <tbody>
                {this.props.asks.map((ask, id) => (
                  <tr key={`ask_${id}`}><td style={{width:'60%'}}>
                    <Link to={'/asks/' + ask.id} params={{ askId: id }} style={{textDecoration:'none', color:'black', width:'100%'}}>
                    <Card style = {{minWidth:275}}>
                      <CardContent>
                          <Typography style={{marginBottom:'16', fontSize:'14'}}>
                              {ask.title}
                          </Typography>
                          <Typography style={{marginBottom:'12'}}>
                              {ask.description}
                          </Typography>
                          <Typography>
                              Loan Amount Needed: {ask.amount}<br/>
                              Weeks Until Full Repayment: {ask.weeks}<br/>
                              Interest Asked: {ask.interest}<br/>
                              Asked by: {this.searchUser(ask.owner)}
                          </Typography>
                      </CardContent>
                  </Card>
                  </Link>
                  </td></tr>
                ))}
              </tbody>
            </table>
            </div>
          </TabContainer>}
          <AppBar position="static" style={{position: 'fixed', width: '100%', bottom: 0}}>
            <Tabs value={value} onChange={this.handleTabChange} centered>
              <Tab label="Offers" />
              <Tab label="Asks" />
            </Tabs>
          </AppBar>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks,
    user: state.auth.user,
    users: state.auth.users,
    banks: state.plaid,
    offers: state.offer,
    asks: state.ask,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    fetchUsers: () => {
      dispatch(auth.fetchUsers());
    }
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#ecf0f1',
  },
});

OfferAskFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(OfferAskFeed);