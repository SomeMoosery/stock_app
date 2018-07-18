import React from 'react';

import {connect} from 'react-redux';

import {Link, Redirect} from 'react-router-dom';

import {offer} from '../actions';

import Button from '@material-ui/core/Button';

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
        if (this.state.submitted){
            return <Redirect to='/profile'/>
        }

        return(
            <div>
                <Link to='/profile' style={{textDecoration:'none', color:'red'}}>
                    <Button color='secondary' variant='outlined'>
                        <p>Back</p>
                    </Button>
                </Link>
                <form onSubmit={this.submitOffer}>
                    <input value={this.state.offerTitle} placeholder="Enter offer here" onChange={(e) => this.setState({offerTitle: e.target.value})} style = {{width: '80%'}} required /><br/>
                    <input value={this.state.offerDescription} placeholder="Add a description" onChange={(e) => this.setState({offerDescription: e.target.value})} style = {{width: '80%'}} required /><br/>                            
                    <input value={this.state.offerAmount} placeholder="How much are you willing to loan?" onChange={(e) => this.setState({offerAmount: e.target.value})} style = {{width: '80%'}} required/><br/>
                    <input value={this.state.offerNumWeeks} placeholder="Over how many weeks will you expect a settlement?" onChange={(e) => this.setState({offerNumWeeks: e.target.value})} style = {{width: '80%'}} required/><br/>
                    <input value={this.state.offerInterest} placeholder="What interest do you want to charge?" onChange={(e) => this.setState({offerInterest: e.target.value})} style = {{width: '80%'}} required/><br/>
                    <Button type="submit" color="primary" variant='outlined'>Post an Offer</Button><br/>
                    <Button onClick={this.resetOfferForm} color="secondary" variant='outlined'>Reset</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddOffer);