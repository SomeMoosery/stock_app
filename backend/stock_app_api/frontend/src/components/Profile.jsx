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
        loading: true,
    };

    componentDidMount(){
        setTimeout(() => this.setState({loading: false}), 2000);
        this.props.banks.length = 0;
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
        this.setState({loading: true});
        setTimeout(() => this.setState({loading: false}), 2000);
        setTimeout(function(){window.location.reload();},2000);
    }
    
    handleOnExit(){
        console.log('Exit!');
    }

    render(){

        const { loading } = this.state;

        if (loading){
            return (
                <div style={{textAlign:'center'}}>
                    <div className="sk-cube-grid">
                        <div className="sk-cube sk-cube1"></div>
                        <div className="sk-cube sk-cube2"></div>
                        <div className="sk-cube sk-cube3"></div>
                        <div className="sk-cube sk-cube4"></div>
                        <div className="sk-cube sk-cube5"></div>
                        <div className="sk-cube sk-cube6"></div>
                        <div className="sk-cube sk-cube7"></div>
                        <div className="sk-cube sk-cube8"></div>
                        <div className="sk-cube sk-cube9"></div>
                    </div>
                    <p>Loading Profile</p>
                </div>
            )
        }
        
        return(
            <div>
                <Link to='/' style={{textDecoration:'none', color:'red'}}>
                    <Button color='secondary' variant='outlined'>
                        <p>Back</p>
                    </Button>
                </Link>
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
                        <Link to='/add-offer' style={{textDecoration:'none', color:'black'}}>
                            <Button color='primary' variant='outlined'>
                                <p>Add an Offer!</p>
                            </Button>
                        </Link>
                        <h3>{username}'s Offers:</h3>
                        <table>
                            <tbody>
                            {this.props.offers.map((offer, id) => (
                                
                                <tr key={`offer_${id}`}>
                                    <td>
                                        <Link to={'/offers/' + offer.id} params={{ offerId: id }} style={{textDecoration:'none', color:'black'}}>{offer.title}</Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Link to='/add-ask' style={{textDecoration:'none', color:'black'}}>
                            <Button color='primary' variant='outlined'>
                                <p>Add an Ask!</p>
                            </Button>
                        </Link>
                        <h3>{username}'s Asks:</h3>
                        <table>
                            <tbody>
                            {this.props.asks.map((ask, id) => (
                                <tr key={`ask_${id}`}>
                                    <td><Link to={'/asks/' + ask.id} params={{ askId: id }} style={{textDecoration:'none', color:'black'}}>{ask.title}</Link></td>
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
        addBank: (token, bank_name) => {
            dispatch(plaid.addBank(token, bank_name));
        },
        fetchUserOffers: (id) => {
            dispatch(offer.fetchUserOffers());
        },
        fetchUserAsks: () => {
            dispatch(ask.fetchUserAsks());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);