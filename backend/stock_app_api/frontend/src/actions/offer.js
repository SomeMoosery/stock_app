export const addOffer = (offerTitle, offerDescription, offerAmount, offerNumWeeks, offerInterest) => {
return (dispatch, getState) => {
  let headers = {"Content-Type": "application/json"};
  let {token} = getState().auth;

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  let title = offerTitle
  let description = offerDescription;
  let amount = offerAmount;
  let weeks = offerNumWeeks;
  let interest = offerInterest;
  let body = JSON.stringify({title, description, amount, weeks, interest});
  console.log(body);

  return fetch("http://localhost:8000/api/offers/", {headers, method: "POST", body})
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
        return dispatch({type: 'ADD_OFFER', offers: res.data});
      } else if (res.status === 401 || res.status === 403) {
        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
        throw res.data;
      }
    })
}
}

export const updateOffer = (offerTitle, offerDescription, offerAmount, offerNumWeeks, offerInterest, index) => {
return (dispatch, getState) => {

  let headers = {"Content-Type": "application/json"};
  let {token} = getState().auth;

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  let id = index;
  let title = offerTitle;
  let description = offerDescription;
  let amount = offerAmount;
  let weeks = offerNumWeeks;
  let interest = offerInterest;
  let body = JSON.stringify({id, title, description, amount, weeks, interest});

  console.log(body);
  return fetch(`http://localhost:8000/api/offers/${index}/`, {headers, method: "PUT", body})
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
        console.log(res.data);
        return dispatch({type: 'UPDATE_OFFER', offer: res.data, id, title});
      } else if (res.status === 401 || res.status === 403) {
        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
        throw res.data;
      }
    })
}
}

export const fetchOffers = () => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("http://localhost:8000/api/offers/", {headers, })
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
          return dispatch({type: 'FETCH_OFFERS', offers: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const fetchUserOffers = index => {
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

    return fetch(`http://localhost:8000/api/profiles/${userId}/offers`, {headers, })
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
        return dispatch({type: 'FETCH_USER_OFFERS', offers: res.data});
      } else if (res.status === 401 || res.status === 403) {
        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
        throw res.data;
      }
    })
  }
}

export const fetchOfferDetail = index => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let offerId = index

    return fetch(`http://localhost:8000/api/offers/${offerId}/`, {headers, })
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
        getState().offer.push(res.data);
        return dispatch({type: 'FETCH_OFFER_DETAIL', offers: res.data});
      } else if (res.status === 401 || res.status === 403) {
        dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
        throw res.data;
      }
    })
  }
}