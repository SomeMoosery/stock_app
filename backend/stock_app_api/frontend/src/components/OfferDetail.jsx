import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {offer} from '../actions';

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
        setTimeout(() => offerOwnerId = this.props.offers.map((offer, id) => (offer.id)), 2000);
    }
    
    render(){

        const { loading } = this.state;
        let isUserOffer;

        if (userId === offerOwnerId){
            isUserOffer = <div>HELLO</div>
        }
        else{
            isUserOffer = <div>FUCK</div>
        }

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
                    <Button color='secondary' variant='outlined'>
                        <p>Back</p>
                    </Button>
                </Link>
                <table>
                    <tbody>
                        {this.props.offers.map((offer, id) => (
                            <tr key={`offer_${id}`}>
                                <td>
                                    {offer.title}<br/>
                                    {offer.description}<br/>
                                    {offer.amount}<br/>
                                    {offer.weeks}<br/>
                                    {offer.interest}<br/>
                                </td>
                            </tr>
                            // if (userId === offer.id){
                            //     <div>HELLO</div>
                            // }
                        ))}
                        {(() => {
                            if (this.props.offers.map((offer,id) => offer.id === userId)) {
                                <div>HELLO</div>
                            }
                        })()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
      offers: state.offer,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchOfferDetail: (id) => {
            dispatch(offer.fetchOfferDetail(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetail);