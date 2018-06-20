import React, { Component } from 'react';
import {connect} from 'react-redux';

import {stocks} from '../actions';

class Home extends React.Component{
  state = {
    text: "",
    updateStockId: null,
  }

  resetForm = () => {
    this.setState({text: "", updateStockId: null});
  }

  selectForEdit = (id) => {
    let stock = this.props.stocks[id];
    this.setState({text: stock.text, updateStockId: id});
  }

  submitStock = (e) => {
    e.preventDefault();
    if (this.state.updateStockId === null) {
      this.props.addStock(this.state.text);
    } else {
      this.props.deleteStock(this.state.updateStockId);
      this.props.updateStock(this.state.text, this.state.updateStockId);
    }
    this.resetForm();
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
              <td>{stock.text}</td>
              <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
              <td><button onClick={() => this.props.deleteStock(id)}>delete</button></td>
            </tr>
          ))}
          </tbody>
        </table>
        <h3>Add new stock</h3>
        <form onSubmit={this.submitStock}>
          <input value={this.state.text} placeholder="Enter stock here" onChange={(e) => this.setState({text: e.target.value})} required />
          <input type="submit" value="Save Stock" />
          <button onClick={this.resetForm}>Reset</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addStock: (text) => {
      dispatch(stocks.addStock(text));
    },
    updateStock: (id,text) => {
      dispatch(stocks.addStock(id, text));
    },
    deleteStock: (id) => {
      dispatch(stocks.deleteStock(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
