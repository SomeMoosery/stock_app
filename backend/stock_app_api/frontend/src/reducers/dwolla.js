const initialState = [];

export default function dwolla(state=initialState, action){
    let dwollaList = state.slice();
    switch(action.type){
        case 'FETCH_DWOLLA_CUSTOMER_DETAIL':
            console.log(action.dwolla);
            return [...state, ...action.dwolla];

        default:
            return state;
    }
}
