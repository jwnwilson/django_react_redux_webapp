import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

import './style/index.css';

let root = document.getElementById('root');
let api_data = [], pages_data = [], routes = [];

// Load initial API and Page data from server if it exists
if (typeof API_DATA !== 'undefined') {
  api_data = JSON.parse(API_DATA); // eslint-disable-line no-undef
}
if (typeof PAGE_DATA !== 'undefined') {
  pages_data = JSON.parse(PAGE_DATA); // eslint-disable-line no-undef
}

// For preview pages
if (window.location.pathname.match(/\/cms\/pages\/\d+\/edit\/preview/g)) {
  let url = window.location.pathname;
  routes = (
    <Route exact path={url} component={() =>
      <App id={api_data.pk} page={api_data}/>} />
  );
} else {
  // Generate routes from page data
  routes = pages_data.map((page_data, index) => {
    let url = page_data.url;
    let current_page_page;
    if (api_data.meta.slug === page_data.meta.slug) {
      current_page_page = api_data;
    } else {
      current_page_page = {
        header: api_data.header,
        footer: api_data.footer,
        modules: []
      };
    }
    return (
      <Route key={index} exact path={url} component={() =>
        <App id={page_data.id} page={current_page_page}/>} />
    );
  });
}


render(
  <Provider store={store}>
    <Router>
      <div>
        {routes}
      </div>
    </Router>
  </Provider>,
  root
);

if (root.hasChildNodes()) {
  hydrate( 
    <Provider store={store}>
      <Router>
        <div>
          {routes}
        </div>
      </Router>
    </Provider>, 
    root);
} else {
  render(
    <Provider store={store}>
      <Router>
        <div>
          {routes}
        </div>
      </Router>
    </Provider>, 
    root);
}

registerServiceWorker();
