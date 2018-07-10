const initialState = [];

export default function ask(state=initialState, action){
  switch(action.type){

    case 'FETCH_ASKS':
      return [...state, ...action.asks];

    default:
      return state;
  }
}
