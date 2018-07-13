import React, { Component } from 'react';
import {connect} from 'react-redux';

class UserBanks extends React.Component{

    render(){
        return(
            <div>
                <h3>Banks</h3>
                <table>
                <tbody>
                {this.props.banks.map((bank, id) => (
                    <tr key={`bank_${id}`}>
                    <td>{bank.owner}</td>
                    <td>{bank.bank_name}</td>
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