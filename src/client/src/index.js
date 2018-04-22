import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker'

import './style/index.css'

const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
