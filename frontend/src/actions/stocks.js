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

export const addStock = name => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        
        let body = JSON.stringify({name, });
        return fetch("http://127.0.0.1:8000/api/stocks/", {headers, body, method: "POST"})
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
