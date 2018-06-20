const intialState = [];

//Action is 'stock' from the map function in Home.jsx
export default function stocks(state=intialState, action){
  let stockList = state.slice();
  switch(action.type){

    case 'ADD_STOCK':
      return [...state, {text: action.text}];

    case 'UPDATE_STOCK':
      let stockToUpdate = stockList[action.id];
      stockToUpdate.text = action.text;
      stockList.splice(action.id, 1, stockToUpdate);
      return stockList;

    case 'DELETE_STOCK':
      stockList.splice(action.id, 1);
      return stockList;

    case 'FETCH_STOCKS':
      return [...state, ...action.stocks];

    default:
      return state;
  }
}
