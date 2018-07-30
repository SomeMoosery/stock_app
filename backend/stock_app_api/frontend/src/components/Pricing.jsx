import React, { Component } from 'react';
import {connect} from 'react-redux';

import { compose } from 'redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
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


class Pricing extends React.Component{

    state = {
        loading: true,
    };

    render(){

        const { classes } = this.props;
        
        return(
            <div>
                <AppBar/>
                <div style = {{width: '100%'}}>
                <div style={{height:'5em'}}></div>
                    <table style={{width:'100%'}}>
                    <tbody>
                    <tr>
                    <td style={{width:'50%'}}>
                    <div style={{margin:'0 auto', width:'70%', height:'25em'}}>
                    <Card style = {{minWidth:275, height:'100%'}}>
                      <CardContent>
                          <Typography style={{marginBottom:'1em', fontSize:'24px', textAlign:'center'}}>
                            EARN MONEY SECURELY
                          </Typography><hr style={{width:'60%'}}/>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            One of two core goals of Unloan is to provide you, the savvy investor, with a 
                            means to make sound investments with higher-than-average returns. No longer will
                            you have to use your hard-earned funds betting on those call options. 
                            No longer will you have to hope this new biotech will be the one to take off.
                            Invest wisely and enjoy great returns, hassle-free and with certainty.
                          </Typography>
                      </CardContent>
                    </Card>
                    </div></td>
                    <td style={{width:'50%'}}>
                    <div style={{margin:'0 auto', width:'70%', height:'25em'}}>
                    <Card style = {{minWidth:275, height:'100%'}}>
                      <CardContent>
                          <Typography style={{marginBottom:'1em', fontSize:'24px', textAlign:'center'}}>
                            RECEIVE LOANS INEXPENSIVELY
                          </Typography><hr style={{width:'60%'}}/>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            We get it. You have your job, your prospects, and your wonderful life to starting living.
                            But you're just starting out. You'll have the cash, but you need some time to accumulate
                            that base. We've got you covered. When was the last time you thought to go to a bank to 
                            get a loan for the new Macbook Pro you want now instead of eight months down the line 
                            when you can pay for it all at once? When was the last time you saw rates this low in general? 
                          </Typography>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            Get a jumpstart on the life you worked your ass off to get.
                          </Typography>
                      </CardContent>
                    </Card>
                  </div></td>
                  </tr>
                  </tbody>
                  </table>

                  <div style={{margin:'0 auto', width:'50%', marginTop:'3em'}}>
                    <Card style = {{minWidth:275}}>
                      <CardContent>
                          <Typography style={{marginBottom:'1em', fontSize:'24px', textAlign:'center'}}>
                            PRICING
                          </Typography><hr style={{width:'60%'}}/>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            Below, you'll find the pricing model we found worked best here at Unloan. 
                            We've crunched a lot of numbers to ensure a perfect medium to ensure that 
                            whether you're giving a loan or receiving a loan, you're happy. Take a look:
                          </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div style={{height:'3em'}}></div>
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
  )(Pricing);