import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'
import registerServiceWorker from './registerServiceWorker'

import './style/index.css'

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={() => <App id="3" />} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
