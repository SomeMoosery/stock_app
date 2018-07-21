const initialState = [];

export default function transactions(state=initialState, action){
  switch(action.type){

    case 'FETCH_TRANSACTIONS':
      console.log(action.transactions.return_data);
      return [...state, ...action.transactions.return_data];

    default:
      return state;
  }
}
