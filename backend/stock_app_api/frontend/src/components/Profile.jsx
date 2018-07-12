import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';

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
                <Button color = 'secondary' variant='outlined' ><Link to='/' style={{textDecoration:'none', color:'red'}}>Back</Link></Button>
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
    return {
      user: state.auth.user,
      banks: state.plaid,
    }
  }

const mapDispatchToProps = dispatch => {
    return{
        fetchUserBanks: (id) => {
            dispatch(plaid.fetchUserBanks());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);