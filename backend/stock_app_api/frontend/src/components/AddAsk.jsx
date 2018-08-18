import React from 'react';

import {connect} from 'react-redux';

import {Link, Redirect} from 'react-router-dom';

import {ask} from '../actions';

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

class Addask extends React.Component{
    state = {
        askTitle: "",
        askDescription: "",
        askAmount: "",
        askNumWeeks: "",
        askInterest: "",
        submitted: false,
    };

    submitask = (e) => {
        e.preventDefault();
        this.props.addAsk(this.state.askTitle, this.state.askDescription, this.state.askAmount, this.state.askNumWeeks, this.state.askInterest);
        this.setState({submitted: true});
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    resetaskForm = () => {
        this.setState({
            askTitle: "", 
            askDescription: "", 
            askAmount: "",
            askNumWeeks: "",
            askInterest: "",
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
                <form onSubmit={this.submitask} style={{textAlign:'center', marginLeft:'1em'}}>
                    <TextField
                        required
                        style={{width:'30%'}}
                        value={this.state.askTitle}
                        id="askTitle"
                        label="Ask Title"
                        placeholder="Enter ask here"
                        className={classes.textField}
                        margin="normal"
                        htmlFor="askTitle"
                        type="text"
                        onChange={e => this.setState({askTitle: e.target.value})}
                    /><br/>
                    <TextField
                        required
                        multiline
                        style={{width:'30%'}}
                        value={this.state.askDescription}
                        id="askDescription"
                        label="Ask Description"
                        placeholder="Tell us about your ask"
                        className={classes.textField}
                        margin="normal"
                        htmlFor="askDescription"
                        type="text"
                        onChange={e => this.setState({askDescription: e.target.value})}
                    /><br/>
                    <FormControl fullWidth className={classes.margin} style={{margin:'0 auto'}}><br/>
                        <Input
                            id="askAmount"
                            style={{width:'30%', margin:'0 auto'}}
                            label="Ask Amount"
                            placeholder="How much do you need?"
                            className={classes.textField}
                            margin="normal"
                            htmlFor="askAmount"
                            type="text"
                            onChange={e => this.setState({askAmount: e.target.value})}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl><br/>
                    <TextField
                        id="askNumWeeks"
                        style={{width:'30%'}}
                        label="Number of Weeks"
                        placeholder="Over how many weeks will you repay this loan?"
                        className={classes.textField}
                        margin="normal"
                        htmlFor="askNumWeeks"
                        type="text"
                        onChange={e => this.setState({askNumWeeks: e.target.value})}
                    /><br/>
                    <FormControl fullWidth className={classes.margin} style={{margin:'0 auto'}}><br/>
                        <Input
                            id="askInterest"
                            style={{width:'30%', margin:'0 auto'}}
                            label="ask Interest"
                            placeholder="How much interest do you want to pay?"
                            className={classes.textField}
                            margin="normal"
                            htmlFor="askInterest"
                            type="text"
                            onChange={e => this.setState({askInterest: e.target.value})}
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                        />
                    </FormControl><br/>
                    <div style={{height:'3em'}}></div>
                    <Button type="submit" color="primary" style={{height:'4.4em'}}>Post an ask</Button>
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
      asks: state.ask,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addAsk: (askTitle, askDescription, askAmount, askNumWeeks, askInterest) => {
            dispatch(ask.addAsk(askTitle, askDescription, askAmount, askNumWeeks, askInterest));
        },
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
  )(Addask);