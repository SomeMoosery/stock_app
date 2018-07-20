import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {plaid, transactions} from '../actions';

import Button from '@material-ui/core/Button';

class BankDetail extends React.Component{

    state = { 
        bank_name: "",
        transaction_list: [],
    }

    componentDidMount(){
        setTimeout(() => this.setState({loading: false}), 2000);
        this.props.banks.length = 0;
        let startDate = this.formatDateOld(Date.now());
        let endDate = this.formatDateNow(Date.now());
        this.props.fetchBankDetail(this.props.match.params.bank);
        setTimeout(() => {
            this.props.fetchTransactions(this.props.banks[0].access_token, startDate, endDate);
        }, 2000);
    }

    formatDateNow(date){
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    formatDateOld(date){
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month === 2){
            month = ''+ 12;
        }
        if (month === 1){
            month = '' + 11;
        }
        else{
            month = '' + (d.getMonth() - 1);
        }
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
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
                    <p>Loading Ask</p>
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
                        {this.props.banks.map((bank, id) => (  
                            <tr key={`bank_${id}`}>
                                <td>
                                    {bank.bank_name}<br/>
                                </td>
                            </tr>
                        ))}
                        {this.props.transactions.map((transaction, id) => (  
                            <tr key={`transaction_${id}`}>
                                <td>
                                    {transaction.account_id}<br/>
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
      banks: state.plaid,
      transactions: state.transactions,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchBankDetail: (id)=> {
            dispatch(plaid.fetchBankDetail(id));
        },
        fetchTransactions: (accessToken, startDate, endDate) => {
            dispatch(transactions.fetchTransactions(accessToken, startDate, endDate));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankDetail);