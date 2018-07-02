const initialState = [];

export default function plaid(state=intialState, action){
  switch(action.type){

    case 'EXCHANGE_PUBLIC_TOKEN':
      console.log(action);
      return [...state, action.publicToken];

    default:
      return state;
  }
}
