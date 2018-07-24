import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {offer, auth} from '../actions';

import Button from '@material-ui/core/Button';

const userId = window.localStorage.getItem('user_id');
let offerOwnerId = 0;

class OfferDetail extends React.Component{

    state = { 
        offerTitle: "",
        updateOfferId: null,
        loading: true,
    }

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
                <Link to='/profile' style={{textDecoration:'none', color:'red'}}>
                    <Button color='secondary'>
                        <p>Back</p>
                    </Button>
                </Link>
                <table>
                    <tbody>
                        <tr>
                            <td>
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
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                {this.props.user.user}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetail);