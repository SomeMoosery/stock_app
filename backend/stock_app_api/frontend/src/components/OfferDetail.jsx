import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {auth, offer} from '../actions';

import Button from '@material-ui/core/Button';

class OfferDetail extends React.Component{

    state = { 
        offerTitle: "",
        updateOfferId: null,
    }

    componentDidMount(){
        // this.props.offers.length = 0;
        // if (this.props.offers.length === 0){
        //     this.props.fetchUserOffers();
        // }
    }
    
    render(){
        return(
            <div>
                <Link to='/profile' style={{textDecoration:'none', color:'red'}}>
                    <Button color='secondary' variant='outlined'>
                        <p>Back</p>
                    </Button>
                </Link>
                <div>Here</div>
            </div>
        )
    }
}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetail);