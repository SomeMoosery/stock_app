import React from 'react';

import {connect} from 'react-redux';

import {Link, Redirect} from 'react-router-dom';

import {offer} from '../actions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
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
        setTimeout(() => {
            window.location.reload();
        }, 1000);
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
                        multiline
                        style={{width:'30%'}}
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
                    <FormControl fullWidth className={classes.margin} style={{margin:'0 auto'}}><br/>
                        <Input
                            id="offerAmount"
                            style={{width:'30%', margin:'0 auto'}}
                            label="Offer Amount"
                            placeholder="How much are you willing to loan?"
                            className={classes.textField}
                            margin="normal"
                            htmlFor="offerAmount"
                            type="text"
                            onChange={e => this.setState({offerAmount: e.target.value})}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl><br/>
                    <TextField
                        id="offerNumWeeks"
                        style={{width:'30%'}}
                        label="Number of Weeks"
                        placeholder="Over how many weeks will you expect repayment?"
                        className={classes.textField}
                        margin="normal"
                        htmlFor="offerNumWeeks"
                        type="text"
                        onChange={e => this.setState({offerNumWeeks: e.target.value})}
                    /><br/>
                    <FormControl fullWidth className={classes.margin} style={{margin:'0 auto'}}><br/>
                        <Input
                            id="offerInterest"
                            style={{width:'30%', margin:'0 auto'}}
                            label="Offer Interest"
                            placeholder="How much interest do you want to charge?"
                            className={classes.textField}
                            margin="normal"
                            htmlFor="offerInterest"
                            type="text"
                            onChange={e => this.setState({offerInterest: e.target.value})}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                        />
                    </FormControl><br/>
                    <div style={{height:'3em'}}></div>
                    <Button type="submit" color="primary" style={{height:'4.4em'}}>Post an Offer</Button>
                    <Link to='/profile' style={{textDecoration:'none', color:'red'}}>
                        <Button color='secondary'>
                            <p>Cancel</p>
                        </Button>
                    </Link>
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