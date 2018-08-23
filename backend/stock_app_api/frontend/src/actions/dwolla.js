export const fetchDwollaCustomer = (customerID) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token){
            headers["Authorization"] = `Token ${token}`;
        }

        console.log(customerID);

        return fetch(`http://localhost:8000/api/dwolla/customers/${customerID}`, {headers, })
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
              getState().dwolla.push(res.data);
              return dispatch({type: 'FETCH_DWOLLA_CUSTOMER_DETAIL', dwolla: res.data});
            } else if (res.status === 401 || res.status === 403) {
              dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
              throw res.data;
            }
          })
    }
}