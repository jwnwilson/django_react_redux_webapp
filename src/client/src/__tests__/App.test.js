import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './../App';
import { Provider } from 'react-redux'

import store from './../store'

it('renders without crashing', () => {
  let pageData = {
    header: {},
    footer: {},
    modules: []
  }
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App id={1} page={pageData} />
      </Router>
    </Provider>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
