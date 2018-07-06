export const exchangeToken = publicToken => {
  return (dispatch, getState) => {
    let headers = {'Content-Type' : 'application/json'};

    let body = JSON.stringify({publicToken, });
    console.log(publicToken);
    console.log(body);
    return fetch('http://localhost:8000/api/exchange-public-token/', {headers, method: 'POST', body})
      .then(res => {
        return dispatch({type: 'EXCHANGE_PUBLIC_TOKEN', publicToken: res.publicToken});
      });
  }
}

export const addBank = (publicToken, bank_name) => {
  return (dispatch, getState) => {
    let headers = {'Content-Type' : 'application/json'};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    
    //Body is the access_token, item_id, and bank_name we'll get from exchanging
    //Pass this back into Django and do the creation from the server side
    let body = JSON.stringify({publicToken, });
    return fetch('http://localhost:8000/api/exchange-public-token/', {headers, method: 'POST', body})    
    .then(res => {
      res.json().then(data => {
        let access_token = data.return_data['access_token'];
        let item_id = data.return_data['item_id'];
        let newBody = JSON.stringify({access_token, item_id, bank_name, });
        console.log(newBody);
        console.log(newBody.access_token);
        return fetch("http://localhost:8000/api/banks/", {headers, method: "POST", body: newBody})
        .then(res => {
          console.log(res);
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
            console.log(access_token);
            return dispatch({type: 'ADD_BANK', access_token: access_token, item_id: item_id, bank_name: bank_name});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }
        });
      });
    });
  }
}
