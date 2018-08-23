const initialState = [];

export default function dwolla(state=initialState, action){
    let dwollaList = state.slice();
    switch(action.type){
        case 'FETCH_DWOLLA_CUSTOMER_DETAIL':
            console.log(action);
            return [...state, ...action.dwolla_customer_detail];

        default:
            return state;
    }
}
