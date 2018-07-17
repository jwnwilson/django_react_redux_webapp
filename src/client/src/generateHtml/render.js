import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import ReactDOMServer from 'react-dom/server';
import store from '../store';
import {getAppRoutes} from '../App/App.routes';

export default function render (url, apiData, pagesData) {
  const routes = getAppRoutes(apiData, pagesData);

  let html, redirect;
  match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      redirect = redirectLocation.pathname;
    } else if (renderProps) {
      // Here's where the actual rendering happens
      html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
    }
  })

  if (redirect) return render(redirect, apiData, pagesData);

  const finalState = store.getState()

  return {
    html,
    finalState
  }
}