import React, { Component } from 'react';
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

  render(){

    const { classes } = this.props;
    const { value } = this.state;

    return(

        <div className={classes.root}>
          {value === 0 && <TabContainer>
            <h3 style={{textAlign:'center'}}>Offers</h3>
            <div className='scale-up-ver-top' style ={{display:'flex', justifyContent:'center', width:'100%'}}>
            <table style={{alignSelf:'center'}}>
              <tbody>
                {this.props.offers.map((offer, id) => (
                  <tr key={`offer_${id}`}>
                    <td>
                      <Card style = {{minWidth:275}}>
                        <CardContent>
                            <Typography style={{marginBottom:'16', fontSize:'14'}}>
                                {offer.title}
                            </Typography>
                            <Typography style={{marginBottom:'12'}}>
                                {offer.description}
                            </Typography>
                            <Typography component='p'>
                                Loan Amount Offered: {offer.amount}<br/>
                                Weeks Until Full Repayment: {offer.weeks}<br/>
                                Interest Offered: {offer.interest}
                            </Typography>
                        </CardContent>
                      </Card>
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
            <table style={{alignSelf:'center'}}>
              <tbody>
                {this.props.asks.map((ask, id) => (
                  <tr key={`ask_${id}`}><td>
                    <Card style = {{minWidth:275}}>
                      <CardContent>
                          <Typography style={{marginBottom:'16', fontSize:'14'}}>
                              {ask.title}
                          </Typography>
                          <Typography style={{marginBottom:'12'}}>
                              {ask.description}
                          </Typography>
                          <Typography component='p'>
                              Loan Amount Needed: {ask.amount}<br/>
                              Weeks Until Full Repayment: {ask.weeks}<br/>
                              Interest Asked: {ask.interest}
                          </Typography>
                      </CardContent>
                  </Card>
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
    
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

OfferAskFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(OfferAskFeed);