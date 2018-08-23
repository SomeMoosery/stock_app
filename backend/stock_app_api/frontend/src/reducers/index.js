import { combineReducers } from 'redux';
import stocks from './stocks';
import auth from './auth';
import plaid from './plaid';
import offer from './offer';
import ask from './ask';
import transactions from './transactions'
import dwolla from './dwolla'

const stockApp = combineReducers({
  stocks, auth, plaid, offer, ask, transactions, dwolla
});

export default stockApp;
