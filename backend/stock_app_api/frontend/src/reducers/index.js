import { combineReducers } from 'redux';
import stocks from './stocks';

const stockApp = combineReducers({
  stocks,
});

export default stockApp;
