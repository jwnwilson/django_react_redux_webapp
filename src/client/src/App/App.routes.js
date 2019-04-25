import React from 'react';
import { Route } from 'react-router-dom';

import App from './index';

/**
 * Return The App wrapped in react router components
 * @param {*} apiData
 * @param {*} pagesData
 */
function getRoutes(apiData, pagesData) {
  let routes;

  // For preview pages
  if (window.location.pathname.match(/\/cms\/pages\/\d+\/edit\/preview/g)) {
    const url = window.location.pathname;
    routes = (
      <Route
        exact
        path={url}
        component={() => <App id={apiData.pk} page={apiData} />}
      />
    );
  } else {
    // Generate routes from page data
    routes = pagesData.map((pageData, index) => {
      const { url } = pageData;
      let currentPagePage;
      if (apiData.meta.slug === pageData.meta.slug) {
        currentPagePage = apiData;
      } else {
        currentPagePage = {
          header: apiData.header,
          footer: apiData.footer,
          modules: [],
          meta: pageData.meta,
        };
      }
      return (
        <Route
          key={index}
          exact
          path={url}
          component={() => <App id={pageData.id} page={currentPagePage} />}
        />
      );
    });
  }

  // Add 404 route redirect
  let pageNotFound = pagesData.filter(page => page.meta.slug === '404');

  if (pageNotFound.length > 0) {
    [pageNotFound] = pageNotFound;
    routes.push(
      <Route
        component={() => <App id={pageNotFound.id} page={pageNotFound} />}
      />,
    );
  }

  return routes;
}

export default {
  getRoutes,
};
