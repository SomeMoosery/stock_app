const initialState = [];

export default function notes(state=initialState, action){
  let stockList = state.slice();

  switch(action.type){
    case 'ADD_STOCK':
      return [...state, {name: action.name}];

    case 'UPDATE_STOCK':
      let stockToUpdate = stockList[action.id];
      stockToUpdate.count = action.count;
      stockList.splice(action.id, 1, stockToUpdate);
      return stockList;

    case 'DELETE_STOCK':
      stockList.splice(action.id, 1);
      return stockList;

    case 'FETCH_ALL_STOCKS':
      return [...state, ...action.stocks];

    case 'FETCH_USER_STOCKS':
      return [...state, ...action.stocks, ...action.user];

    default:
      return state;
  }
}
