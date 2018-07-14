const initialState = [];

export default function offer(state=initialState, action){
  let offerList = state.slice();
  switch(action.type){

    case 'FETCH_OFFERS':
      return [...state, ...action.offers];

    case 'ADD_OFFER':
      return [...state, {offerTitle: action.offers}];

    case 'UPDATE_OFFER':
      let offerToUpdate = offerList[action.index];
      offerToUpdate.title = action.offer.title;
      offerList.splice(action.index, 1, offerToUpdate);
      return offerList;

    case 'FETCH_USER_OFFERS':
      return [...state, ...action.offers];

    default:
      return state;
  }
}
