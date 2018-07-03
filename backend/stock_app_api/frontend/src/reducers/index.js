import { combineReducers } from 'redux';
import stocks from './stocks';
import auth from './auth';
import plaid from './plaid';

const stockApp = combineReducers({
  stocks, auth, plaid
});

export default stockApp;
