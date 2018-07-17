import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {offer} from '../actions';

import Button from '@material-ui/core/Button';

class OfferDetail extends React.Component{

    state = { 
        offerTitle: "",
        updateOfferId: null,
    }

    componentDidMount(){
        this.props.offers.length = 0;
        this.props.fetchOfferDetail(this.props.match.params.offer);
        this.props.offers.length = 0;
    }
    
    render(){
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
                                    {offer.title}
                                </td>
                            </tr>
                        ))}
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