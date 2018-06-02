export const fetchAllStocks = () => {
  return (dispatch, getState) => {
    let headers = {'Content-Type': 'application/json'};
    let {token} = getState().auth;

    if (token){
      headers['Authorization'] = `Token ${token}`;
    }

    return fetch('http://127.0.0.1:8000/api/stocks/', {headers, })
    .then(res => {
      if (res.status < 500){
        return res.json().then(data => {
          return {status: res.status, data};
        })
      }
      else{
        console.log("Server Error!");
        throw res;
      }
    })
    .then(res => {
      if (res.status === 200){
        // console.log(res);
        return dispatch({type: 'FETCH_ALL_STOCKS', stocks: res.data});
      }
      else if (res.status === 401 || res.status === 403){
        dispatch({type: 'AUTHENTICATION_ERROR', data: res.data});
        throw res.data;
      }
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
