import { combineReducers } from 'redux';
import stocks from './stocks';
import auth from './auth';

const stockApp = combineReducers({
  stocks, auth,
});

export default stockApp;
