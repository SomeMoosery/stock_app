import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { plaid, offer } from '../actions';
import UserBanks from './UserBanks';

import PlaidLink from 'react-plaid-link';

const userId = window.localStorage.getItem('user_id');
const username = window.localStorage.getItem('username');


class Profile extends React.Component{

    state = {
        offerTitle: "",
        askTitle: "",
        updateOfferId: null,
        updateAskId: null,
    };

    componentDidMount(){
        if (this.props.banks.length === 0){
            this.props.fetchUserBanks(userId);
        }
        if (this.props.offers.length === 0){
            this.props.fetchOffers();
        }
    }

    componentWillMount(){
        console.log(this.props);
    }

    handleOnSuccess = (token, metadata) => {
        this.props.addBank(metadata.public_token, metadata.institution.name);
        setTimeout(function(){window.location.reload();},3000);
    }
    
    handleOnExit(){
        console.log('Exit!');
    }

    submitOffer = (e) => {
        e.preventDefault();
        if (this.state.updateOfferId === null) {
            this.props.addOffer(this.state.offerTitle);
            alert('Offer added!');
            setTimeout(function(){window.location.reload();},3000);        
        }
        else{
            this.props.updateOffer(this.state.offerTitle, this.state.updateOfferId);
        }
        this.resetOfferForm();
    }
    
    submitAsk = (e) => {
        e.preventDefault();
        if (this.state.updateAskId === null) {
            this.props.addStock(this.state.askName);
            window.location.reload();
        }
        else{
            this.props.updateAsk(this.state.askTitle, this.state.updateAskId);
        }
        this.resetAskForm();
    }

    resetOfferForm = () => {
        this.setState({offerTitle: "", updateOfferId: null});
    }

    resetAskForm = () => {
        this.setState({askTitle: "", updateAskId: null});
    }

    render(){
        return(
            <div>
                <Button color = 'secondary' variant='outlined' ><Link to='/' style={{textDecoration:'none', color:'red'}}>Back</Link></Button>
                <div style = {{width: '100%', float: 'left' }}>
                    <div style = {{float: 'left', textAlign: 'center' }}>
                        <div style = {{textAlign: "center"}}>Hello {username} </div>
                        <PlaidLink
                            clientName = 'LoanApp'
                            env = 'sandbox'
                            product = {['auth', 'transactions']}
                            publicKey = '707d6df9798a9bf35257173c18e86b'
                            onExit = {this.handleOnExit}
                            onSuccess = {this.handleOnSuccess}>
                            Link a Bank Account
                        </PlaidLink>
                        <UserBanks/>
                    </div>
                    <div style={{float: "right", paddingRight: '10px', textAlign: 'center'}}>
                        <form onSubmit={this.submitOffer}>
                            <input value={this.state.offerTitle} placeholder="Enter offer here" onChange={(e) => this.setState({offerTitle: e.target.value})} required />
                            <Button type="submit" color="primary" variant='outlined'>Post an Offer</Button>
                            <Button onClick={this.resetOfferForm} color="secondary" variant='outlined'>Reset</Button>
                        </form>
                        <form onSubmit={this.submitAsk}>
                            <input value={this.state.askName} placeholder="Enter ask here" onChange={(e) => this.setState({askTitle: e.target.value})} required />
                            <Button type="submit" color="primary" variant='outlined'>Post an Ask</Button>
                            <Button onClick={this.resetAskForm} color="secondary" variant='outlined'>Reset</Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      user: state.auth.user,
      banks: state.plaid,
      offers: state.offer,
    }
  }

const mapDispatchToProps = dispatch => {
    return{
        fetchUserBanks: (id) => {
            dispatch(plaid.fetchUserBanks());
        },
        fetchOffers: () => {
            dispatch(offer.fetchOffers());
        },
        addOffer: (offerTitle) => {
            dispatch(offer.addOffer(offerTitle));
        },
        updateOffer: (id, offerTitle) => {
            dispatch(offer.updateOffer(id, offerTitle));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);