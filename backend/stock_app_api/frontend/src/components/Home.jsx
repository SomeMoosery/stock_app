import React, { Component } from 'react';
import {connect} from 'react-redux';

import {stocks, auth} from '../actions';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class Home extends React.Component{
  state = {
    name: "",
    updateStockId: null,
  }

  resetForm = () => {
    this.setState({name: "", updateStockId: null});
  }

  selectForEdit = (id) => {
    let stock = this.props.stocks[id];
    this.setState({name: stock.name, updateStockId: id});
  }

  submitStock = (e) => {
    e.preventDefault();
    if (this.state.updateStockId === null) {
      console.log(this.state.name);
      this.props.addStock(this.state.name);
      window.location.reload();
    } else {
      this.props.updateStock(this.state.name, this.state.updateStockId);
    }
    this.resetForm();
    // window.location.reload();
  }

  componentDidMount(){
    // this.props.fetchAllStocks();
    this.props.fetchUserStocks(this.props.user.id);
    // window.location.reload();
    // console.log(this.props.user.id);
  }

  render(){
    return(
      <div>
        <h2>Welcome to Stock App!</h2><br/>

        <div style={{textAlign: "right"}}>
          {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
        </div>

        <h3>Stocks</h3>
        <table>
          <tbody>
          {this.props.stocks.map((stock, id) => (
            <tr key={`stock_${id}`}>
              <td>{id}</td>
              <td>{stock.name}</td>
              <td><Button onClick={()=>this.selectForEdit(id)} color='default' variant='outlined'>Edit</Button></td>
              <td><Button onClick={()=>this.props.deleteStock(id)} color='secondary' variant='outlined'>Delete</Button></td>
            </tr>
          ))}
          </tbody>
        </table>
        <h3>Add new stock</h3>
        <form onSubmit={this.submitStock}>
          <input value={this.state.name} placeholder="Enter stock here" onChange={(e) => this.setState({name: e.target.value})} required />
          <Button type="submit" color="primary" variant='outlined'>Save Stock</Button>
          <Button onClick={this.resetForm} color="secondary" variant='outlined'>Reset</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  //Just returns an object (containing stocks: state.stocks where state.stocks is Redux state)
  return {
    stocks: state.stocks,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addStock: (name) => {
      dispatch(stocks.addStock(name));
    },
    updateStock: (id,name) => {
      dispatch(stocks.updateStock(id, name));
    },
    deleteStock: (id) => {
      dispatch(stocks.deleteStock(id));
    },
    fetchAllStocks: () => {
      dispatch(stocks.fetchAllStocks());
    },
    fetchUserStocks: (id) => {
      dispatch(stocks.fetchUserStocks());
    },
    logout: () => {
      dispatch(auth.logout());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
