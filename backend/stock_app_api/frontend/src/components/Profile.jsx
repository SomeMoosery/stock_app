import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { plaid, offer, ask } from '../actions';
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
        this.props.offers.length = 0;
        if (this.props.offers.length === 0){
            this.props.fetchUserOffers();
        }
        this.props.asks.length = 0;
        if (this.props.asks.length === 0){
            this.props.fetchUserAsks();
        }
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

    resetOfferForm = () => {
        this.setState({offerTitle: "", updateOfferId: null});
    }
    
    submitAsk = (e) => {
        e.preventDefault();
        if (this.state.updateAskId === null) {
            this.props.addAsk(this.state.askTitle);
            alert('Ask added!');
            setTimeout(function(){window.location.reload();},3000);        
        }
        else{
            this.props.updateAsk(this.state.askTitle, this.state.updateAskId);
        }
        this.resetAskForm();
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
                        <h3>{username}'s Offers:</h3>
                        <table>
                            <tbody>
                            {this.props.offers.map((offer, id) => (
                                <tr key={`offer_${id}`}>
                                    <td>{offer.title}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <form onSubmit={this.submitAsk}>
                            <input value={this.state.askName} placeholder="Enter ask here" onChange={(e) => this.setState({askTitle: e.target.value})} required />
                            <Button type="submit" color="primary" variant='outlined'>Post an Ask</Button>
                            <Button onClick={this.resetAskForm} color="secondary" variant='outlined'>Reset</Button>
                        </form>
                        <h3>{username}'s Asks:</h3>
                        <table>
                            <tbody>
                            {this.props.asks.map((ask, id) => (
                                <tr key={`ask_${id}`}>
                                    <td>{ask.title}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
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
      asks: state.ask,
    }
  }

const mapDispatchToProps = dispatch => {
    return{
        fetchUserBanks: (id) => {
            dispatch(plaid.fetchUserBanks());
        },
        fetchUserOffers: (id) => {
            dispatch(offer.fetchUserOffers());
        },
        addOffer: (offerTitle) => {
            dispatch(offer.addOffer(offerTitle));
        },
        updateOffer: (id, offerTitle) => {
            dispatch(offer.updateOffer(id, offerTitle));
        },
        fetchUserAsks: () => {
            dispatch(ask.fetchUserAsks());
        },
        addAsk: (askTitle) => {
            dispatch(ask.addAsk(askTitle));
        },
        updateAsk: (id, askTitle) => {
            dispatch(ask.updateAsk(id, askTitle));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);