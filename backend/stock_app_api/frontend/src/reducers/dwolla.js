const initialState = [];

export default function dwolla(state=initialState, action){
    let dwollaList = state.slice();
    switch(action.type){
        case 'FETCH_DWOLLA_USER_DETAIL':
            return [...state, ...action.dwolla_customer_detail];
    }
}
