import React, { Component } from 'react';
import {connect} from 'react-redux';

import PlaidLink from 'react-plaid-link';


import { auth, plaid } from '../actions';


class UserBanks extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h3>Banks</h3>
                <table>
                <tbody>
                {this.props.banks.map((bank, id) => (
                    <tr key={`bank_${id}`}>
                    <td>{bank.owner}</td>
                    <td>{bank.bank_name}</td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
      banks: state.plaid,
    }
  }

const mapDispatchToProps = dispatch => {
    return{
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBanks);