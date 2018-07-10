import { combineReducers } from 'redux';
import stocks from './stocks';
import auth from './auth';
import plaid from './plaid';
import offer from './offer';
import ask from './ask';

const stockApp = combineReducers({
  stocks, auth, plaid, offer, ask
});

export default stockApp;
