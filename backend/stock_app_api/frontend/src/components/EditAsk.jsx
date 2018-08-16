import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {ask, auth} from '../actions';

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
let askOwnerId = 0;

class EditAsk extends React.Component{

    state = { 
        askTitle: "",
        askDescription: "",
        askAmount: "",
        askNumWeeks: "",
        askInterest: "",
        updateAskId: null,
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
        this.props.updateAsk(this.state.askTitle, this.state.askDescription, 
            this.state.askAmount, this.state.askNumWeeks, 
            this.state.askInterest, this.props.asks[0].id);
        setTimeout(function(){window.location.reload();},2000);        
    }

    componentDidMount(){
        setTimeout(() => this.setState({loading: false}), 2000);
        this.props.asks.length = 0;
        this.props.fetchAskDetail(this.props.match.params.ask);

        setTimeout(() => {
            this.props.fetchUserDetail(this.props.asks[0].owner);
            this.setState({
                askTitle: this.props.asks[0].title,
                askDescription: this.props.asks[0].description,
                askAmount: this.props.asks[0].amount,
                askNumWeeks: this.props.asks[0].weeks,
                askInterest: this.props.asks[0].interest
            });
        }, 1500);
    }
    
    render(){

        const { loading } = this.state;
        const { fullScreen } = this.props;
        const { classes } = this.props;
        let isUserAsk;

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
                    <p>Loading Ask</p>
                </div>
            )
        }

        return(
            <div>
                <AppBar/>
                <div style={{height:'6em'}}></div>
                <table style={{width:'100%', margin:'0 auto'}}>
                    <tbody style={{width:'100%', margin:'0 auto'}}>
                        {this.props.asks.map((ask, id) => (
                            <tr key={`ask_${id}`} style={{width:'100%', margin:'0 auto'}}>
                                <td style={{textAlign:'center', width:'100%', }}>
                                    <TextField
                                        required
                                        style={{width:'30%'}}
                                        value={this.state.askTitle}
                                        id="askTitle"
                                        className={classes.textField}
                                        margin="normal"
                                        htmlFor="askTitle"
                                        type="text"
                                        onChange={e => this.setState({askTitle: e.target.value})}
                                    /><br/>
                                     <TextField
                                        required
                                        style={{width:'30%'}}
                                        value={this.state.askDescription}
                                        id="askDescription"
                                        className={classes.textField}
                                        margin="normal"
                                        htmlFor="askDescription"
                                        type="text"
                                        onChange={e => this.setState({askDescription: e.target.value})}
                                    /><br/>
                                     <TextField
                                        required
                                        style={{width:'30%'}}
                                        value={this.state.askAmount}
                                        id="askAmount"
                                        className={classes.textField}
                                        margin="normal"
                                        htmlFor="askAmount"
                                        type="text"
                                        onChange={e => this.setState({askAmount: e.target.value})}
                                    /><br/>
                                     <TextField
                                        required
                                        style={{width:'30%'}}
                                        value={this.state.askNumWeeks}
                                        id="askNumWeeks"
                                        className={classes.textField}
                                        margin="normal"
                                        htmlFor="askNumWeeks"
                                        type="text"
                                        onChange={e => this.setState({askNumWeeks: e.target.value})}
                                    /><br/>
                                     <TextField
                                        required
                                        style={{width:'30%'}}
                                        value={this.state.askInterest}
                                        id="askInterest"
                                        className={classes.textField}
                                        margin="normal"
                                        htmlFor="askInterest"
                                        type="text"
                                        onChange={e => this.setState({askInterest: e.target.value})}
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
                            {this.props.asks.map((ask, id) => (
                                <tr key={`ask_${id}`}>
                                    <td>
                                        By clicking 'Agree,' you will be accepting to take {this.props.user.user}'s ask 
                                        for ${ask.amount} for {ask.weeks} weeks, with {ask.interest}% interest - and 
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

EditAsk.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
  };

const mapStateToProps = state => {
    return{
      asks: state.ask,
      user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchAskDetail: (id) => {
            dispatch(ask.fetchAskDetail(id));
        },
        fetchUserDetail: (id) => {
            dispatch(auth.fetchUserDetail(id));
        },
        updateAsk: (askTitle, askDescription, askAmount, askNumWeeks, askInterest, id) => {
            dispatch(ask.updateAsk(askTitle, askDescription, askAmount, askNumWeeks, askInterest, id));
        }
    }
}

export default compose(
    withMobileDialog(),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
  )(EditAsk);