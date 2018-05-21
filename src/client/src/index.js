import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'
import registerServiceWorker from './registerServiceWorker'

import './style/index.css'

let root = document.getElementById('root');
let page_data = JSON.parse(root.getAttribute('data-page'));

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={() =>
        <App id="3" components={page_data.modules} header={page_data.header} footer={page_data.footer} page={page_data}/>} />
    </Router>
  </Provider>,
  root
);

registerServiceWorker();
