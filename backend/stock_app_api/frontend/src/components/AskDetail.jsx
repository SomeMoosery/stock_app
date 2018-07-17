import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {ask} from '../actions';

import Button from '@material-ui/core/Button';

class AskDetail extends React.Component{

    state = { 
        askTitle: "",
        updateAskId: null,
    }

    componentDidMount(){
        this.props.asks.length = 0;
        this.props.fetchAskDetail(this.props.match.params.ask);
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
                        {this.props.asks.map((ask, id) => (  
                            <tr key={`ask_${id}`}>
                                <td>
                                    {ask.title}
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
      asks: state.ask,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchAskDetail: (id) => {
            dispatch(ask.fetchAskDetail(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AskDetail);