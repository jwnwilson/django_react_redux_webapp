import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import registerServiceWorker from './registerServiceWorker';
import {getAppRoutes} from './App/App.routes';
import './style/index.css';

let root = document.getElementById('root');
let api_data, pages_data, routes;

// Load initial API and Page data from server if it exists
if (typeof API_DATA !== 'undefined') {
  api_data = JSON.parse(API_DATA); // eslint-disable-line no-undef
}
if (typeof PAGE_DATA !== 'undefined') {
  pages_data = JSON.parse(PAGE_DATA); // eslint-disable-line no-undef
}

routes = getAppRoutes(api_data, pages_data);

if (root.hasChildNodes()) {
  hydrate( 
    <Provider store={store}>
      {routes}
    </Provider>, 
    root);
} else {
  render(
    <Provider store={store}>
      {routes}
    </Provider>, 
    root);
}

registerServiceWorker();
