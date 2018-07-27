import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {offer, auth} from '../actions';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { compose } from 'redux';


const userId = window.localStorage.getItem('user_id');
let offerOwnerId = 0;

class OfferDetail extends React.Component{

    state = { 
        offerTitle: "",
        updateOfferId: null,
        loading: true,
        open: false,
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };  

    componentDidMount(){
        setTimeout(() => this.setState({loading: false}), 2000);
        this.props.offers.length = 0;
        this.props.fetchOfferDetail(this.props.match.params.offer);

        setTimeout(() => {
            this.props.fetchUserDetail(this.props.offers[0].owner);
        }, 1500);
    }
    
    render(){

        const { loading } = this.state;
        const { fullScreen } = this.props;
        let isUserOffer;

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
                    <p>Loading Offer</p>
                </div>
            )
        }

        return(
            <div>
                <table>
                    <tbody>
                        {this.props.offers.map((offer, id) => (
                            <tr key={`offer_${id}`}>
                                <td>
                                    <p style={{marginBottom:'0.5em', fontSize: '2em'}}>{offer.title}</p>
                                    <p style={{marginBottom:'0.2em', fontSize: '1.5em'}}>{offer.description}</p>
                                    <p style={{marginBottom:'0.2em', fontSize: '1.5em'}}>Offering to loan ${offer.amount}</p>
                                    <p style={{marginBottom:'0.2em', fontSize: '1.5em'}}>For {offer.weeks} weeks</p>
                                    <p style={{marginBottom:'0.2em', fontSize: '1.5em'}}>With {offer.interest}% interest</p>
                                    <p style={{fontSize:'1.5em'}}>Offered by {this.props.user.user} ({this.props.user.rating})</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{height:'6em'}}></div>
                <div style={{margin:'auto', width:'50%', padding: '10px'}}>
                    <Button color='primary' style={{width:'100%'}} variant='outlined' onClick={this.handleClickOpen}><p>Take Offer</p></Button>
                    <Dialog
                        fullScreen={fullScreen}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        >
                        <DialogTitle id="responsive-dialog-title">{"Are you sure you want to take this loan?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            <table><tbody>
                            {this.props.offers.map((offer, id) => (
                                <tr key={`offer_${id}`}>
                                    <td>
                                        By clicking 'Agree,' you will be accepting to take {this.props.user.user}'s offer 
                                        for ${offer.amount} for {offer.weeks} weeks, with {offer.interest}% interest - and 
                                        hereby agree to Unloan's terms and conditions.
                                    </td>
                                </tr>
                            ))}</tbody></table>.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                            Cancel
                            </Button>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                            Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

OfferDetail.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
  };

const mapStateToProps = state => {
    return{
      offers: state.offer,
      user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchOfferDetail: (id) => {
            dispatch(offer.fetchOfferDetail(id));
        },
        fetchUserDetail: (id) => {
            dispatch(auth.fetchUserDetail(id));
        },
    }
}

export default compose(
    withMobileDialog(),
    connect(mapStateToProps, mapDispatchToProps)
  )(OfferDetail);