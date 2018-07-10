const initialState = [];

export default function offer(state=initialState, action){
  switch(action.type){

    case 'FETCH_OFFERS':
      return [...state, ...action.offers];

    default:
      return state;
  }
}
