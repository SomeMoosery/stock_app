const initialState = [];

export default function plaid(state=initialState, action){
  switch(action.type){

    case 'EXCHANGE_PUBLIC_TOKEN':
      return [...state, action.publicToken];

    case 'ADD_BANK':
      return [
        ...state, 
        {
          access_token: action.access_token, 
          item_id: action.item_id,
           bank_name: action.bank_name
        }
      ];

    case 'FETCH_USER_BANKS':
      return [...state, ...action.banks];

    default:
      return state;
  }
}
