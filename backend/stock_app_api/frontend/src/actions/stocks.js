export const addStock = text => {
  return{
    type: 'ADD_STOCK',
    text
  }
}

export const updateStock = (id, text) => {
  return {
    type: 'UPDATE_STOCK',
    id,
    text
  }
}

export const deleteStock = id => {
  return{
    type: 'DELETE_STOCK',
    id
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
