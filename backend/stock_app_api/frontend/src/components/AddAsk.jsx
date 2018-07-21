import React from 'react';

import {connect} from 'react-redux';

import {Link, Redirect} from 'react-router-dom';

import {ask} from '../actions';

import Button from '@material-ui/core/Button';

class AddAsk extends React.Component{
    state = {
        askTitle: "",
        askDescription: "",
        askAmount: "",
        askNumWeeks: "",
        askInterest: "",
        submitted: false,
    };

    submitAsk = (e) => {
        e.preventDefault();
        this.props.addOffer(this.state.askTitle, this.state.askDescription, this.state.askAmount, this.state.askNumWeeks, this.state.askInterest);
        this.setState({submitted: true});
    }

    resetOfferForm = () => {
        this.setState({
            askTitle: "", 
            askDescription: "", 
            askAmount: "",
            askNumWeeks: "",
            askInterest: "",
        });
    }

    render(){
        if (this.state.submitted){
            return <Redirect to='/profile'/>
        }

        return(
            <div>
                <Link to='/profile' style={{textDecoration:'none', color:'red'}}>
                    <Button color='secondary'>
                        <p>Back</p>
                    </Button>
                </Link>
                <form onSubmit={this.submitAsk}>
                    <input value={this.state.askTitle} placeholder="Enter ask here" onChange={(e) => this.setState({askTitle: e.target.value})} style = {{width: '80%'}} required /><br/>
                    <input value={this.state.askDescription} placeholder="Add a description" onChange={(e) => this.setState({askDescription: e.target.value})} style = {{width: '80%'}} required /><br/>                            
                    <input value={this.state.askAmount} placeholder="How much do you need?" onChange={(e) => this.setState({askAmount: e.target.value})} style = {{width: '80%'}} required/><br/>
                    <input value={this.state.askNumWeeks} placeholder="Over how many weeks will you settle up?" onChange={(e) => this.setState({askNumWeeks: e.target.value})} style = {{width: '80%'}} required/><br/>
                    <input value={this.state.askInterest} placeholder="What interest do you want to ask?" onChange={(e) => this.setState({askInterest: e.target.value})} style = {{width: '80%'}} required/><br/>
                    <Button type="submit" color="primary" variant='outlined'>Post an Ask</Button><br/>
                    <Button onClick={this.resetOfferForm} color="secondary" variant='outlined'>Reset</Button>
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
        addOffer: (askTitle, askDescription, askAmount, askNumWeeks, askInterest) => {
            dispatch(ask.addAsk(askTitle, askDescription, askAmount, askNumWeeks, askInterest));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAsk);