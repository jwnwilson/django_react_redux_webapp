import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import registerServiceWorker from './registerServiceWorker';
import getRoutes from './App/App.routes';
import './style/index.css';

const root = document.getElementById('root');
const apiData = JSON.parse(root.getAttribute('data-api'));
const pagesData = JSON.parse(root.getAttribute('data-pages'));
const routes = getRoutes(pagesData, apiData);

render(
  <Provider store={store}>
    <Router>
      <div>
        {routes}
      </div>
    </Router>
  </Provider>,
  root,
);

registerServiceWorker();
