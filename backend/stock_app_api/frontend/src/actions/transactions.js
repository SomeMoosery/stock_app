export const fetchTransactions = (accessToken, startDate, endDate) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let {token} = getState().auth;
  
      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }
  
      let access_token = accessToken;
      let start_date = startDate;
      let end_date = endDate;
  
      let newBody = JSON.stringify({access_token, start_date, end_date});
      return fetch("http://localhost:8000/api/get-transactions/", {headers, method: "POST", body: newBody})
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
        if (res.status === 201 || res.status === 200) {
          return dispatch({type: 'FETCH_TRANSACTIONS', transactions: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
    }
  }