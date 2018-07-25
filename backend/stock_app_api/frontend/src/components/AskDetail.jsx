import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {ask, auth} from '../actions';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { compose } from 'redux';

class AskDetail extends React.Component{

    state = { 
        askTitle: "",
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

    componentDidMount(){
        setTimeout(() => this.setState({loading: false}), 2000);
        this.props.asks.length = 0;
        this.props.fetchAskDetail(this.props.match.params.ask);

        setTimeout(() => {
            this.props.fetchUserDetail(this.props.asks[0].owner);
        }, 1500);
    }
    
    render(){

        const { loading } = this.state;
        const { fullScreen } = this.props;

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
                <Link to='/' style={{textDecoration:'none', color:'red'}}>
                    <Button color='secondary'>
                        <p>Back</p>
                    </Button>
                </Link>
                <table>
                    <tbody>
                        {this.props.asks.map((ask, id) => (
                            <tr key={`ask_${id}`}>
                                <td>
                                    <p style={{marginBottom:'0.5em', fontSize: '2em'}}>{ask.title}</p>
                                    <p style={{marginBottom:'0.2em', fontSize: '1.5em'}}>{ask.description}</p>
                                    <p style={{marginBottom:'0.2em', fontSize: '1.5em'}}>Offering to loan ${ask.amount}</p>
                                    <p style={{marginBottom:'0.2em', fontSize: '1.5em'}}>For {ask.weeks} weeks</p>
                                    <p style={{marginBottom:'0.2em', fontSize: '1.5em'}}>With {ask.interest}% interest</p>
                                    <p style={{fontSize:'1.5em'}}>Offered by {this.props.user.user} ({this.props.user.rating})</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{height:'6em'}}></div>
                <div style={{margin:'auto', width:'50%', padding: '10px'}}>
                    <Button color='primary' style={{width:'100%'}} variant='outlined' onClick={this.handleClickOpen}><p>Give Loan</p></Button>
                    <Dialog
                        fullScreen={fullScreen}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        >
                        <DialogTitle id="responsive-dialog-title">{"Are you sure you want to give this loan?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            <table><tbody>
                            {this.props.asks.map((ask, id) => (
                                <tr key={`ask_${id}`}>
                                    <td>
                                        By clicking 'Agree,' you will be accepting to give {this.props.user.user} a loan for 
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AskDetail);