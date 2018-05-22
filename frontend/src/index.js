import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import{
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

ReactDOM.render((
      <Router>
        <App>
          <div>
            <Route path='/' component={App}/>
            </div>
        </App>
      </Router>
  ),document.getElementById('root'));
registerServiceWorker();
