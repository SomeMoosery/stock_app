import React, { Component } from 'react';
import {connect} from 'react-redux';

import {stocks} from '../actions';

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
    } else {
      this.props.updateStock(this.state.name, this.state.updateStockId);
    }
    this.resetForm();
  }

  componentDidMount(){
    this.props.fetchStocks();
  }

  render(){
    return(
      <div>
        <h2>Welcome to Stock App!</h2><br/>

        <h3>Stocks</h3>
        <table>
          <tbody>
          {this.props.stocks.map((stock, id) => (
            <tr key={`stock_${id}`}>
              <td>{id}</td>
              <td>{stock.name}</td>
              <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
              <td><button onClick={() => this.props.deleteStock(id)}>delete</button></td>
            </tr>
          ))}
          </tbody>
        </table>
        <h3>Add new stock</h3>
        <form onSubmit={this.submitStock}>
          <input value={this.state.name} placeholder="Enter stock here" onChange={(e) => this.setState({name: e.target.value})} required />
          <input type="submit" value="Save Stock" />
          <button onClick={this.resetForm}>Reset</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  //Just returns an object (containing stocks: state.stocks where state.stocks is Redux state)
  return {
    stocks: state.stocks,
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
    fetchStocks: () => {
      dispatch(stocks.fetchStocks());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
