import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './index';
import store from '../store';

it('renders without crashing', () => {
  const pageData = {
    header: {},
    footer: {},
    modules: [],
  };
  const div = document.createElement('div');
  render(
    <Provider store={store}>
      <Router>
        <App id={1} page={pageData} />
      </Router>
    </Provider>,
    div,
  );
  unmountComponentAtNode(div);
});
