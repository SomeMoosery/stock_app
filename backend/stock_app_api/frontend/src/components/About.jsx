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
                    <div style={{height:'5em'}}></div>
                    <div style={{margin:'0 auto', width:'50%', marginTop:'3em'}}>
                    <Card style = {{minWidth:275}}>
                      <CardContent>
                          <Typography style={{marginBottom:'1em', fontSize:'24px', textAlign:'center'}}>
                            OUR MISSION
                          </Typography><hr style={{width:'60%'}}/>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            To empower young adults with the ability to make the most out of their savings in a safer way than penny stocks,
                            options trading, or any other high-risk investments. No pesky taxes, no hassle, just some extra cash right when you need it.
                          </Typography>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            We intend to reach every young adult with their financial security and future in mind, and provide them with an easy-to-use
                            and hassle-free platform to diversify their investments to generate passive income.
                          </Typography>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            We seek to forge lasting partnerships with each one of our clients through secure, seamless transfers of funds.
                          </Typography>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            We hope you enjoy using our product, it's been a real labor of love.
                          </Typography>
                      </CardContent>
                    </Card>
                    </div>

                    <div style={{margin:'0 auto', width:'50%', marginTop:'3em'}}>
                    <Card style = {{minWidth:275}}>
                      <CardContent>
                          <Typography style={{marginBottom:'1em', fontSize:'24px', textAlign:'center'}}>
                            OUR TEAM
                          </Typography><hr style={{width:'60%'}}/>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            We are a team of passionate finance and technology enthusiasts based out of Hoboken, New Jersey -
                            right across the river from the financial capital of the world, New York City. 
                          </Typography>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            While we are based out of Hoboken, we are still in our infancy and led individuals entering their 
                            senior year at top universities. Therefore, a bulk of our software engineering is done remotely, from
                            Madison, Wisconsin - one of the fastest-growing tech cities in the nation, and home to a top-tier university.
                          </Typography>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            We are on the lookout for talented engineers and desingers to join in the movement to decentralize and uncomplicate
                            loaning for good. If you're interested, please check out our jobs page.
                          </Typography>
                          <Typography style={{marginBottom:'0.5em', fontSize:'16px'}}>
                            If you have any questions, comments, or concerns about Unloan, feel free to contact us using the form below.
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