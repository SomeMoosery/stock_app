import React from 'react';

import {connect} from 'react-redux';

import {Link, Redirect} from 'react-router-dom';

import {offer} from '../actions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';

import AppBar from './AppBar';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
  });

class AddOffer extends React.Component{
    state = {
        offerTitle: "",
        offerDescription: "",
        offerAmount: "",
        offerNumWeeks: "",
        offerInterest: "",
        submitted: false,
    };

    submitOffer = (e) => {
        e.preventDefault();
        this.props.addOffer(this.state.offerTitle, this.state.offerDescription, this.state.offerAmount, this.state.offerNumWeeks, this.state.offerInterest);
        this.setState({submitted: true});
    }

    resetOfferForm = () => {
        this.setState({
            offerTitle: "", 
            offerDescription: "", 
            offerAmount: "",
            offerNumWeeks: "",
            offerInterest: "",
        });
    }

    render(){
        const {classes} = this.props;

        if (this.state.submitted){
            return <Redirect to='/profile'/>
        }

        return(
            <div>
                <AppBar/>
                <div style={{height:'6em'}}></div>
                <form onSubmit={this.submitOffer} style={{textAlign:'center', marginLeft:'1em'}}>
                    <TextField
                        required
                        style={{width:'30%'}}
                        value={this.state.offerTitle}
                        id="offerTitle"
                        label="Offer Title"
                        placeholder="Enter offer here"
                        className={classes.textField}
                        margin="normal"
                        htmlFor="offerTitle"
                        type="text"
                        onChange={e => this.setState({offerTitle: e.target.value})}
                    /><br/>
                    <TextField
                        required
                        style={{width:'60%'}}
                        value={this.state.offerDescription}
                        id="offerDescription"
                        label="Offer Description"
                        placeholder="Tell us about your offer"
                        className={classes.textField}
                        margin="normal"
                        htmlFor="offerDescription"
                        type="text"
                        onChange={e => this.setState({offerDescription: e.target.value})}
                    /><br/>
                    <TextField
                        id="offerAmount"
                        style={{width:'30%'}}
                        label="Offer Amount"
                        placeholder="How much are you willing to loan?"
                        className={classes.textField}
                        margin="normal"
                        htmlFor="offerAmount"
                        type="text"
                        onChange={e => this.setState({offerAmount: e.target.value})}
                    /><br/>
                    <TextField
                        id="offerNumWeeks"
                        style={{width:'30%'}}
                        label="Offer Number of Weeks"
                        placeholder="Over how many weeks will you expect repayment?"
                        className={classes.textField}
                        margin="normal"
                        htmlFor="offerNumWeeks"
                        type="text"
                        onChange={e => this.setState({offerNumWeeks: e.target.value})}
                    /><br/>
                    <TextField
                        id="offerInterest"
                        style={{width:'30%'}}
                        label="Offer Interest"
                        placeholder="How much interest do you want to charge?"
                        className={classes.textField}
                        margin="normal"
                        htmlFor="offerInterest"
                        type="text"
                        onChange={e => this.setState({offerInterest: e.target.value})}
                    /><br/>
                    <div style={{height:'3em'}}></div>
                    <Button type="submit" color="primary" variant='outlined'>Post an Offer</Button><br/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
      offers: state.offer,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addOffer: (offerTitle, offerDescription, offerAmount, offerNumWeeks, offerInterest) => {
            dispatch(offer.addOffer(offerTitle, offerDescription, offerAmount, offerNumWeeks, offerInterest));
        },
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
  )(AddOffer);