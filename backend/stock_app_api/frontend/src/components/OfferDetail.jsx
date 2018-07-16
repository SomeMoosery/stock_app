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
        if (this.props.offers.length === 0){
            this.props.fetchOfferDetail(this.props.match.params.offer);
        }
        setTimeout(() => console.log(this.props), 4000);
    }
    
    render(){
        return(
            <div>
                <Link to='/profile' style={{textDecoration:'none', color:'red'}}>
                    <Button color='secondary' variant='outlined'>
                        <p>Back</p>
                    </Button>
                </Link>
                <p>Here</p>
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