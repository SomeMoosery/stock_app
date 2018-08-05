import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class UserBanks extends React.Component{

    render(){
        return(
            <div>
                <h3>Your Banks:</h3>
                <table>
                <tbody>
                {this.props.banks.map((bank, id) => (
                    <tr key={`bank_${id}`}>
                    <td>
                        <Link to={'/banks/' + bank.id} params={{ bankId: id}} style={{textDecoration:'none', color:'black'}}>
                        <div style={{width:'60%'}}>
                            <Card style = {{minWidth:200}} className='profileCard'>
                                <CardContent>
                                    <Typography style={{marginBottom:'16', fontSize:'14'}} variant="headline" align='center'>
                                        {bank.bank_name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        </Link>
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
    return {
      banks: state.plaid,
    }
  }

const mapDispatchToProps = dispatch => {
    return{
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBanks);