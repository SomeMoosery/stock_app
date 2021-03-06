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
        return fetch("http://localhost:8000/api/banks/", {headers, method: "POST", body: newBody})
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
            return dispatch({type: 'ADD_BANK', banks: res.data});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }
        });
      });
    });
  }
}

export const fetchUserBanks = index => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    
    let userId = null;
    try{
      userId = getState().auth.user.id
    }
    catch(e){
      userId = window.localStorage.getItem('user_id'); 
    }

    return fetch(`http://localhost:8000/api/profiles/${userId}/banks`, {headers, })
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
        return dispatch({type: 'FETCH_USER_BANKS', banks: res.data});
      } else if (res.status === 401 || res.status === 403) {
        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
        throw res.data;
      }
    })
  }
}

export const fetchBankDetail = (index) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let bankId = index

    return fetch(`http://localhost:8000/api/banks/${bankId}/`, {headers, })
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
        getState().plaid.push(res.data);
        
      } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
    })
  }
}