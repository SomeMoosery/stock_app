import React, { Component } from 'react';
import {connect} from 'react-redux';

import { auth, plaid } from '../actions';

class Profile extends React.Component{

    // constructor(props){
    //     super(props);
    // }

    state = {};

    componentDidMount(){
        this.props.loadUser();
        // this.props.fetchUserBanks(this.props.user.id);
        console.log(this.props);
    }

    render(){
        return(
            <div>
                <div style = {{textAlign: "center"}}>Hello {this.props.user.username} </div>

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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);