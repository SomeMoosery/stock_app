import React, { Component } from 'react';
import {connect} from 'react-redux';

import { auth, plaid } from '../actions';
import UserBanks from './UserBanks';

import PlaidLink from 'react-plaid-link';

const userId = window.localStorage.getItem('user_id');
const username = window.localStorage.getItem('username');


class Profile extends React.Component{

    constructor(props){
        super(props);
    }

    state = {};

    componentDidMount(){
        // console.log(this.props);
        // console.log(this.state);
        // var username = window.localStorage.getItem('username');
        // // var userId = window.localStorage.getItem('user_id');
        // console.log(userId);
        // this.props.loadUser();
        if (this.props.banks.length == 0){
            this.props.fetchUserBanks(userId);
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

    render(){
        return(
            <div>
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
        )
    }
}

const mapStateToProps = state => {
    //Just returns an object (containing stocks: state.stocks where state.stocks is Redux state)
    return {
    //   stocks: state.stocks,
      user: state.auth.user,
      banks: state.plaid,
    //   offers: state.offer,
    //   asks: state.ask,
    }
  }

const mapDispatchToProps = dispatch => {
    return{
        loadUser: () => {
            dispatch(auth.loadUser());
        },
        fetchUserBanks: (id) => {
            dispatch(plaid.fetchUserBanks());
        },
        addBank: (public_token, bank_name) => {
            dispatch(plaid.addBank(public_token, bank_name));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);