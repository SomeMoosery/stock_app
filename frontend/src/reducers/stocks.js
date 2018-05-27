const initialState = [
  {text: "Add a stock"}
];

export default function notes(state=initialState, action){
  let stockList = state.slice();

  switch(action.type){
    case 'ADD_STOCK':
      return [...state, {text: action.text}];

    case 'UPDATE_STOCK':
      let stockToUpdate = stockList[action.id];
      stockToUpdate.count = action.count;
      stockList.splice(action.id, 1, stockToUpdate);
      return stockList;

    case 'DELETE_STOCK':
      stockList.splice(action.id, 1);
      return stockList;

    default:
      return state;
  }
}
