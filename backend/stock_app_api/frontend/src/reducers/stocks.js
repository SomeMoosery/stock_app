const intialState = [];

//Action is 'stock' from the map function in Home.jsx
export default function stocks(state=intialState, action){
  let stockList = state.slice();
  switch(action.type){

    case 'ADD_STOCK':
      return [...state, {name: action.stock}];

    case 'UPDATE_STOCK':
      let stockToUpdate = stockList[action.index];
      stockToUpdate.name = action.stock.name;
      stockList.splice(action.index, 1, stockToUpdate);
      return stockList;

    case 'DELETE_STOCK':
      stockList.splice(action.index, 1);
      return stockList;

    case 'FETCH_STOCKS':
      return [...state, ...action.stocks];

    case 'FETCH_USER_STOCKS':
      return [...state, ...action.stocks];

    default:
      return state;
  }
}
