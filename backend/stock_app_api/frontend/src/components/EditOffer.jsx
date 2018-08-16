import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {offer, auth} from '../actions';

import AppBar from './AppBar';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { compose } from 'redux';
import { TextField, withStyles } from '@material-ui/core';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
  });


const userId = window.localStorage.getItem('user_id');
let offerOwnerId = 0;

class EditOffer extends React.Component{

    state = { 
        offerTitle: "",
        offerDescription: "",
        offerAmount: "",
        offerNumWeeks: "",
        offerInterest: "",
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
    
    handleAgree = () => {
        this.props.updateOffer(this.state.offerTitle, this.state.offerDescription, 
            this.state.offerAmount, this.state.offerNumWeeks, 
            this.state.offerInterest, this.props.offers[0].id);
        setTimeout(function(){window.location.reload();},2000);        
    }

    componentDidMount(){
        setTimeout(() => this.setState({loading: false}), 2000);
        this.props.offers.length = 0;
        this.props.fetchOfferDetail(this.props.match.params.offer);

        setTimeout(() => {
            this.props.fetchUserDetail(this.props.offers[0].owner);
            this.setState({
                offerTitle: this.props.offers[0].title,
                offerDescription: this.props.offers[0].description,
                offerAmount: this.props.offers[0].amount,
                offerNumWeeks: this.props.offers[0].weeks,
                offerInterest: this.props.offers[0].interest
            });
        }, 1500);
    }
    
    render(){

        const { loading } = this.state;
        const { fullScreen } = this.props;
        const { classes } = this.props;
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
                <AppBar/>
                <div style={{height:'6em'}}></div>
                <table style={{width:'100%', margin:'0 auto'}}>
                    <tbody style={{width:'100%', margin:'0 auto'}}>
                        {this.props.offers.map((offer, id) => (
                            <tr key={`offer_${id}`} style={{width:'100%', margin:'0 auto'}}>
                                <td style={{textAlign:'center', width:'100%', }}>
                                    <TextField
                                        required
                                        style={{width:'30%'}}
                                        value={this.state.offerTitle}
                                        id="offerTitle"
                                        className={classes.textField}
                                        margin="normal"
                                        htmlFor="offerTitle"
                                        type="text"
                                        onChange={e => this.setState({offerTitle: e.target.value})}
                                    /><br/>
                                     <TextField
                                        required
                                        style={{width:'30%'}}
                                        value={this.state.offerDescription}
                                        id="offerDescription"
                                        className={classes.textField}
                                        margin="normal"
                                        htmlFor="offerDescription"
                                        type="text"
                                        onChange={e => this.setState({offerDescription: e.target.value})}
                                    /><br/>
                                     <TextField
                                        required
                                        style={{width:'30%'}}
                                        value={this.state.offerAmount}
                                        id="offerAmount"
                                        className={classes.textField}
                                        margin="normal"
                                        htmlFor="offerAmount"
                                        type="text"
                                        onChange={e => this.setState({offerAmount: e.target.value})}
                                    /><br/>
                                     <TextField
                                        required
                                        style={{width:'30%'}}
                                        value={this.state.offerNumWeeks}
                                        id="offerNumWeeks"
                                        className={classes.textField}
                                        margin="normal"
                                        htmlFor="offerNumWeeks"
                                        type="text"
                                        onChange={e => this.setState({offerNumWeeks: e.target.value})}
                                    /><br/>
                                     <TextField
                                        required
                                        style={{width:'30%'}}
                                        value={this.state.offerInterest}
                                        id="offerInterest"
                                        className={classes.textField}
                                        margin="normal"
                                        htmlFor="offerInterest"
                                        type="text"
                                        onChange={e => this.setState({offerInterest: e.target.value})}
                                    /><br/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{height:'6em'}}></div>
                <div style={{margin:'auto', width:'50%', padding: '10px'}}>
                    <Button color='primary' style={{width:'100%'}} variant='outlined' onClick={this.handleClickOpen}><p>Update</p></Button>
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
                            <Button onClick={this.handleAgree} color="primary" autoFocus>
                            Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

EditOffer.propTypes = {
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
        updateOffer: (offerTitle, offerDescription, offerAmount, offerNumWeeks, offerInterest, id) => {
            dispatch(offer.updateOffer(offerTitle, offerDescription, offerAmount, offerNumWeeks, offerInterest, id));
        }
    }
}

export default compose(
    withMobileDialog(),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
  )(EditOffer);