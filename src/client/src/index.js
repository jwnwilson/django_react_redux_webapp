import { Switch, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import registerServiceWorker from './registerServiceWorker';
import appRoutes from './App/App.routes';
import './style/index.css';

const root = document.getElementById('root');
const apiData = JSON.parse(root.getAttribute('data-api') || {});
const pagesData = JSON.parse(root.getAttribute('data-pages') || []);
const routes = appRoutes.getRoutes(apiData, pagesData);

if (root.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            {routes}
          </Switch>
        </div>
      </Router>
    </Provider>,
    root,
  );
} else {
  render(
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            {routes}
          </Switch>
        </div>
      </Router>
    </Provider>,
    root,
  );
}


registerServiceWorker();
