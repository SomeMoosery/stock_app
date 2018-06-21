export const addStock = name => {
  return dispatch => {
    let headers = {'Content-Type': 'application/json'};
    let body = JSON.stringify({name, });
    return fetch('/api/stocks/', {headers, method: 'POST', body})
    .then(res => res.json())
    .then(stock => {
      type: 'ADD_STOCK',
      stock
    })
  }
}

export const updateStock = (name, index) => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({name, });
    let stockId = getState().stocks[index].id;

    return fetch(`/api/stocks/${stockId}/`, {headers, method: "PUT", body})
      .then(res => res.json())
      .then(stock => {
        return dispatch({
          type: 'UPDATE_STOCK',
          stock,
          index
        })
      })
  }
}

export const deleteStock = index => {
  return (dispatch, getState) => {
    let headers = {'Content-Type': 'application/json'};
    let stockId = getState().stocks[index].id;

    return fetch(`/api/stocks/${stockId}`, {headers, method: 'DELETE'})
    .then(res => {
      if (res.ok){
        return dispatch({
          type: 'DELETE_STOCK',
          index
        })
      }
    })
  }
}

export const fetchStocks = () => {
  return dispatch => {
    let headers = {'Content-Type': 'application/json'};
    //NOTE This runs fine on localhost:8000 (the server we're running Django on, which we want)
    //NOTE IF we want this running on localhost:3000 for some reason we need to specify:
    //localhost:8000/api/stocks/
    return fetch('/api/stocks/', {headers, })
    .then(res => res.json())
    .then(stocks => {
      return dispatch({
        type: 'FETCH_STOCKS',
        stocks
      })
    })
  }
}
