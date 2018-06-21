export const addStock = name => {
  // return dispatch => {
  //   let headers = {'Content-Type': 'application/json'};
  //   let body = JSON.stringify({name, });
  //   return fetch('/api/stocks/', {headers, method: 'POST', body})
  //   .then(res => res.json())
  //   .then(stock => {
  //     type: 'ADD_STOCK',
  //     stock
  //   })
  // }
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({name, });
    return fetch("/api/stocks/", {headers, method: "POST", body})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 201) {
          return dispatch({type: 'ADD_STOCK', stock: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const updateStock = (name, index) => {
  // return (dispatch, getState) => {
  //
  //   let headers = {"Content-Type": "application/json"};
  //   let body = JSON.stringify({name, });
  //   let stockId = getState().stocks[index].id;
  //
  //   return fetch(`/api/stocks/${stockId}/`, {headers, method: "PUT", body})
  //     .then(res => res.json())
  //     .then(stock => {
  //       return dispatch({
  //         type: 'UPDATE_STOCK',
  //         stock,
  //         index
  //       })
  //     })
  // }
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({name, });
    let stockId = getState().stock[index].id;

    return fetch(`/api/stocks/${stockId}/`, {headers, method: "PUT", body})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: 'UPDATE_NOTE', stock: res.data, index});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const deleteStock = index => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let stockId = getState().stocks[index].id;

    return fetch(`/api/stocks/${stockId}/`, {headers, method: "DELETE"})
      .then(res => {
        if (res.status === 204) {
          return {status: res.status, data: {}};
        } else if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 204) {
          return dispatch({type: 'DELETE_STOCK', index});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const fetchStocks = () => {
  // return dispatch => {
  //   let headers = {'Content-Type': 'application/json'};
  //   //NOTE This runs fine on localhost:8000 (the server we're running Django on, which we want)
  //   //NOTE IF we want this running on localhost:3000 for some reason we need to specify:
  //   //localhost:8000/api/stocks/
  //   return fetch('/api/stocks/', {headers, })
  //   .then(res => res.json())
  //   .then(stocks => {
  //     return dispatch({
  //       type: 'FETCH_STOCKS',
  //       stocks
  //     })
  //   })
  // }
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/stocks/", {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        }
        else {
          console.log("Server Error!");
          console.log(res);
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: 'FETCH_STOCKS', stocks: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}
