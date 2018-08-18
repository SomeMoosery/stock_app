export const addAsk = (askTitle, askDescription, askAmount, askNumWeeks, askInterest) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let title = askTitle;
    let description = askDescription;
    let amount = askAmount;
    let weeks = askNumWeeks;
    let interest = askInterest;
    let body = JSON.stringify({title, description, amount, weeks, interest});

    return fetch("http://localhost:8000/api/asks/", {headers, method: "POST", body})
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
          return dispatch({type: 'ADD_ASKS', asks: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const updateAsk = (askTitle, askDescription, askAmount, askNumWeeks, askInterest, index) => {
  return (dispatch, getState) => {
  
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;
  
    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
  
    let id = index;
    let title = askTitle;
    let description = askDescription;
    let amount = askAmount;
    let weeks = askNumWeeks;
    let interest = askInterest;
    let body = JSON.stringify({id, title, description, amount, weeks, interest});
  
    console.log(body);
    return fetch(`http://localhost:8000/api/asks/${index}/`, {headers, method: "PUT", body})
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
          return dispatch({type: 'UPDATE_ASK', ask: res.data, id, title});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
  }

export const fetchAsks = () => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let {token} = getState().auth;
  
      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }
  
      return fetch("http://localhost:8000/api/asks/", {headers, })
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
            return dispatch({type: 'FETCH_ASKS', asks: res.data});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }
        })
    }
  }

  export const fetchUserAsks = index => {
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
  
      return fetch(`http://localhost:8000/api/profiles/${userId}/asks`, {headers, })
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
          return dispatch({type: 'FETCH_USER_ASKS', asks: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
    }
  }

export const fetchAskDetail = index => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let askId = index

    return fetch(`http://localhost:8000/api/asks/${askId}/`, {headers, })
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
        getState().ask.push(res.data);
        return dispatch({type: 'FETCH_ASK_DETAIL', asks: res.data});
      } else if (res.status === 401 || res.status === 403) {
        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
        throw res.data;
      }
    })
  }
}

export const deleteAsk = index => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`http://localhost:8000/api/asks/${index}/`, {headers, method: "DELETE"})
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
          return dispatch({type: 'DELETE_ASK', index});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}