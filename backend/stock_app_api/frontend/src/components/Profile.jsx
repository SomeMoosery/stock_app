import React, { Component } from 'react';
import {connect} from 'react-redux';

import { auth } from '../actions';

class Profile extends React.Component{

    constructor(props){
        super(props);
    }

    state = {};

    componentDidMount(){
        this.props.loadUser();
        console.log(this.props);
    }

    render(){
        return(
            <div>Hello {this.props.user.username} </div>
        )
    }
}

const mapStateToProps = state => {
    //Just returns an object (containing stocks: state.stocks where state.stocks is Redux state)
    return {
    //   stocks: state.stocks,
      user: state.auth.user,
    //   banks: state.plaid,
    //   offers: state.offer,
    //   asks: state.ask,
    }
  }

const mapDispatchToProps = dispatch => {
    return{
        loadUser: () => {
            dispatch(auth.loadUser());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);