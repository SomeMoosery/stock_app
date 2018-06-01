export const fetchAllStocks = () => {
  return dispatch => {
    let headers = {'Content-Type': 'application/json'};
    return fetch('http://127.0.0.1:8000/api/stocks/', {headers, })
    .then(res => res.json())
    .then(stocks => {
      return dispatch({
        type: 'FETCH_ALL_STOCKS',
        stocks
      })
    })
    .catch(function(err){
      console.log("Error: " + err);
    })
  }
}

export const fetchUserStocks = userId => {
  return (dispatch, getState) => {
    let headers = {'Content-Type': 'application/json'};
    let noteId = getState();

    console.log(getState().user);
  }
}

export const addStock = text => {
  // console.log(text);
  // // console.log(user);
  // return{
  //   type: 'ADD_STOCK',
  //   text
  // }
  return (dispatch, getState) => {
    let headers = {'Content-Type': 'application/json'};
    let body = JSON.stringify({text, });
    let stockId = getState().stocks;
    let user = getState().stocks[0].owner;

    console.log(stockId);
    console.log(user);
  }
}

export const updateStock = (id, count) => {
  return{
    type: 'UPDATE_STOCK',
    id,
    count
  }
}

export const deleteStock = id => {
  return{
    type: 'DELETE_STOCK',
    id
  }
}
