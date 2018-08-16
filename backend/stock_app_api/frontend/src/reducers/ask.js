const initialState = [];

export default function ask(state=initialState, action){
  let askList = state.slice();
  switch(action.type){

    case 'FETCH_ASKS':
      return [...state, ...action.asks];

    case 'ADD_ASK':
      return [...state, {askTitle: action.asks}];

    case 'UPDATE_ASK':
      let askToUpdate = askList[0];
      askToUpdate.title = action.askTitle;
      askToUpdate.description = action.askDescription;
      askToUpdate.amount = action.askAmount;
      askToUpdate.weeks = action.askNumWeeks;
      askToUpdate.interest = action.askInterest;
      askList.splice(action.index, 1, askToUpdate);
      return askList;

    case 'FETCH_USER_ASKS':
      return [...state, ...action.asks];

    case 'FETCH_ASK_DETAIL':
      return [...state, ...action.asks];

    default:
      return state;
  }
}
