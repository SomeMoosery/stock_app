export const exchangeToken = publicToken => {
  return (dispatch, getState) => {
    let headers = {'Content-Type' : 'application/json'};

    let body = JSON.stringify({publicToken, });
    console.log(publicToken);
    console.log(body);
    return fetch('http://localhost:8000/api/exchange-public-token/', {headers, method: 'POST', body})
      .then(res => {
        res.json().then(data => {
          console.log(data.return_data);
          console.log(data.return_data['access_token']);
        });
        return dispatch({type: 'EXCHANGE_PUBLIC_TOKEN', publicToken: res.publicToken});
      });
  }
}
