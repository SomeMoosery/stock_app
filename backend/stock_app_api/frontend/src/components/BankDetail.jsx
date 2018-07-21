import React from 'react';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {plaid, transactions} from '../actions';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class BankDetail extends React.Component{

    state = { 
        bank_name: "",
        transaction_list: [],
        loading: true,
    }

    componentDidMount(){
        setTimeout(() => this.setState({loading: false}), 3000);
        this.props.banks.length = 0;
        let startDate = this.formatDateOld(Date.now());
        let endDate = this.formatDateNow(Date.now());
        this.props.fetchBankDetail(this.props.match.params.bank);
        setTimeout(() => {
            this.props.fetchTransactions(this.props.banks[0].access_token, startDate, endDate);
            setTimeout(() => console.log(this.props), 1000);
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
                    <p>Getting your transactions</p>
                </div>
            )
        }
        return(
            <div>
                <Link to='/profile' style={{textDecoration:'none', color:'red'}}>
                    <Button color='secondary'>
                        <p>Back</p>
                    </Button>
                </Link>
                <div className='scale-up-ver-top' style ={{display:'flex', justifyContent:'center', width:'100%'}}>
                <table style={{alignSelf:'center', width:'60%'}}>
                    <tbody>
                        {this.props.banks.map((bank, id) => (  
                            <tr key={`bank_${id}`} style ={{width:'100%', textAlign:'center'}}>
                                <td style={{fontSize:'2em'}}>
                                    {window.localStorage.getItem('username').charAt(0).toUpperCase()}{window.localStorage.getItem('username').substr(1)}'s {bank.bank_name} Account
                                </td>
                            </tr>
                        ))}
                        <tr><td><div style={{height:'3em'}}></div></td></tr>
                        {this.props.transactions.map((transaction, id) => (  
                            
                            <tr key={`transaction_${id}`}>
                                <td>
                                    <Card style = {{minWidth:275}}>
                                        <CardContent>
                                            <Typography style={{marginBottom:'16', fontSize:'14'}} color="textSecondary">
                                                Account ID: {transaction.account_id}
                                            </Typography>
                                            <Typography variant="headline" component="h2">
                                               {transaction.name}
                                            </Typography>
                                            {transaction.category.map((category, id) => {
                                                return (
                                                    <div key={`category_${id}`}>
                                                        <Typography styles={{marginBottom:'12'}} color="textSecondary">
                                                            {category}
                                                        </Typography>
                                                    </div>
                                                )
                                            })}
                                            <Typography component="p">
                                                {transaction.date}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
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