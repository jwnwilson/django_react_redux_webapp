import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import root from 'window-or-global';

import App from './index';

/**
 * Return JSX with App wrapped in react-router Route components
 * @param {Object} api_data initial page api data
 * @param {Object} pages_data initial list of pages data 
 */
export function getAppRoutes(api_data, pages_data){
  let routes = [];
  // For preview pages
  if (typeof root !== 'undefined' && root.location.pathname.match(/\/cms\/pages\/\d+\/edit\/preview/g)) {
    let url = root.location.pathname;
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
  return (
    <Router>
      <div>
        {routes}
      </div>
    </Router>
  );
}
