import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';

import { plaid, offer, ask, auth } from '../actions';
import UserBanks from './UserBanks';

import PlaidLink from 'react-plaid-link';
import AppBar from './AppBar';

const styles = {
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  };


class About extends React.Component{

    state = {
        loading: true,
    };

    render(){

        const { classes } = this.props;
        
        return(
            <div>
                <AppBar/>
                
                <div style = {{width: '100%'}}>
                    <Link to='/' style={{textDecoration:'none', color:'red', marginTop:'3em'}}>
                        <Button color='secondary'>
                            <p>Back</p>
                        </Button>
                    </Link>
                    <div style={{margin:'0 auto', width:'50%', marginTop:'3em'}}>
                    <Card style = {{minWidth:275}}>
                      <CardContent>
                          <Typography style={{marginBottom:'16', fontSize:'24'}}>
                            ABOUT US
                          </Typography>
                          <Typography style={{marginBottom:'16', fontSize:'20'}}>
                            OUR MISSION
                          </Typography>
                          <Typography style={{marginBottom:'16', fontSize:'16'}}>
                            To empower young adults with the ability to make the most out of their savings in a safer way than penny stocks,
                            options trading, or any other high-risk investments. No pesky taxes, no hassle, just some extra cash right when you need it.
                          </Typography>
                      </CardContent>
                  </Card>
                  </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
     
    }
  }

const mapDispatchToProps = dispatch => {
    return{

    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
  )(About);