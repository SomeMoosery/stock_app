import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import SquareEditOutlineIcon from '@material-ui/icons/SquareEditOutline';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { plaid, offer, ask, auth, dwolla } from '../actions';
import UserBanks from './UserBanks';

import PlaidLink from 'react-plaid-link';
import AppBar from './AppBar';

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
        this.props.fetchDwollaCustomer(userId);
        setTimeout(()=>this.props.getDwollaCustomer(this.props.dwolla[0].account_url), 2500);
        setTimeout(()=>this.props.fetchUserDetail(userId), 1200);
        setTimeout(()=>console.log(this.props.dwolla[0].account_url), 2500);
    };

    handleOnSuccess = (token, metadata) => {
        this.props.addBank(metadata.public_token, metadata.institution.name);
        this.setState({loading: true});
        setTimeout(() => this.setState({loading: false}), 2000);
        setTimeout(function(){window.location.reload();},1000);
    };
    
    handleOnExit(){
        console.log('Exit!');
    };

    handleOfferDelete = (id) => {
        this.props.deleteOffer(id);
        setTimeout(function(){window.location.reload();},1000);
    };

    handleAskDelete = (id) => {
        this.props.deleteAsk(id);
        setTimeout(function(){window.location.reload();},1000);
    };

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
                <AppBar/>
                <div style={{height:'6em'}}></div>
                <div style = {{width: '90%', margin:'0 auto'}}>
                    <div style = {{float: 'left', textAlign: 'center', width:'100%'}}>
                        <div style = {{textAlign: "center", width:'100%', fontSize:'2em'}}>{this.props.user.user.charAt(0).toUpperCase()}{this.props.user.user.substr(1)}'s Loaning Home Base</div>
                        {/* <div style = {{textAlign: "center", width:'100%', fontSize:'2em'}}>{this.props.user.university}</div> */}
                        <div style ={{display:'flex', justifyContent:'center', width:'100%'}}>
                        <table style={{alignSelf:'center'}}>
                            <tbody>
                                <tr style={{verticalAlign:'top', height:'100%'}}>
                                    <td style={{padding:'3em'}}>
                                        <UserBanks/>
                                        <div style={{height:'2em'}}></div>
                                        <PlaidLink
                                            clientName = 'LoanApp'
                                            env = 'sandbox'
                                            product = {['auth', 'transactions']}
                                            publicKey = '707d6df9798a9bf35257173c18e86b'
                                            onExit = {this.handleOnExit}
                                            onSuccess = {this.handleOnSuccess}
                                            style= {{width:'100%', textDecoration:'none', backgroundColor:'transparent', border:'none'}}>
                                            <AddCircleOutlineIcon style={{fontSize:50}}/>
                                        </PlaidLink>
                                    </td>
                                    <td style={{padding:'3em', height:'100%'}}>
                                        <h3>Your Offers:</h3>
                                        <table>
                                            <tbody>
                                            {this.props.offers.map((offer, id) => (
                                                <tr key={`offer_${id}`}>
                                                    <td>
                                                        <Link to={'/offers/' + offer.id} params={{ offerId: id }} style={{textDecoration:'none', color:'black', width:'100%'}}>
                                                        <div style={{width:'100%', marginBottom:'0.3em'}}>
                                                            <Card style = {{minWidth:200}} className="profileCard">
                                                                <CardContent>
                                                                    <Typography style={{textAlign: 'left'}} variant="headline" align='center'>
                                                                        {offer.title}
                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                        </Link>
                                                    </td>
                                                    <td><Link to={'/edit/offers/' + offer.id} params={{ offerId: id }} style={{textDecoration:'none', color:'black', width:'100%'}}>EDIT</Link></td>
                                                    <td><Button value={offer.id} onClick={() => this.handleOfferDelete(offer.id)}>Delete</Button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        <div style={{height:'2em'}}></div>
                                        <Link to='/add-offer' style={{textDecoration:'none', color:'black'}}>
                                            <AddCircleOutlineIcon style={{fontSize:50}}/>
                                        </Link>
                                    </td>
                                    <td style={{padding:'3em'}}>
                                        <h3>Your Asks:</h3>
                                        <table style = {{width:'100%'}}>
                                            <tbody>
                                            {this.props.asks.map((ask, id) => (
                                                <tr key={`ask_${id}`}>
                                                    <td>
                                                        <Link to={'/asks/' + ask.id} params={{ askId: id }} style={{textDecoration:'none', color:'black', width:'100%'}}>
                                                        <div style={{width:'100%', marginBottom:'0.3em'}}>
                                                            <Card style = {{minWidth:200}}  className="profileCard">
                                                                <CardContent>
                                                                    <Typography style={{marginBottom:'16', fontSize:'14', textAlign: 'left'}} variant="headline" align='center'>
                                                                        {ask.title}
                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                        </Link>
                                                    </td>
                                                    <td><Link to={'/edit/asks/' + ask.id} params={{ askId: id }} style={{textDecoration:'none', color:'black', width:'100%'}}>EDIT</Link></td>
                                                    <td><Button onClick={() => this.handleAskDelete(ask.id)}>Delete</Button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        <div style={{height:'2em'}}></div>
                                        <Link to='/add-ask' style={{textDecoration:'none', color:'black'}}>
                                            <AddCircleOutlineIcon style={{fontSize:50}}/>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div style={{float: "right", paddingRight: '10px', textAlign: 'center'}}>
                        
                        
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
      dwolla: state.dwolla,
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
        fetchUserDetail: (id) => {
            dispatch(auth.fetchUserDetail(id));
        },
        deleteOffer: (id) => {
            dispatch(offer.deleteOffer(id));
        },
        deleteAsk: (id) => {
            dispatch(ask.deleteAsk(id));
        },
        fetchDwollaCustomer: (id) => {
            dispatch(dwolla.fetchDwollaCustomer(id));
        },
        getDwollaCustomer: (account_url) => {
            dispatch(dwolla.getDwollaCustomer(account_url));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);