const initialState = [];

export default function plaid(state=initialState, action){
  switch(action.type){

    case 'FETCH_TRANSACTIONS':
      console.log(action.transactions);
      return [...state, ...action.transactions];

    default:
      return state;
  }
}
