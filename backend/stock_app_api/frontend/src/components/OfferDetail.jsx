import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {offer} from '../actions';

import Button from '@material-ui/core/Button';

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
    }
    
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