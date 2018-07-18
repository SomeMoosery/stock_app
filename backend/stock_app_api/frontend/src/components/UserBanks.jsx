import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class UserBanks extends React.Component{

    render(){
        return(
            <div>
                <h3>Banks</h3>
                <table>
                <tbody>
                {this.props.banks.map((bank, id) => (
                    <tr key={`bank_${id}`}>
                    <td><Link to={'/banks/' + bank.id} params={{ bankId: id}} style={{textDecoration:'none', color:'black'}}>{bank.bank_name}</Link></td>
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