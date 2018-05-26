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
      <div>
        <Route exact path="/home/" component={() =>
          <App id="3" page={page_data.id === 3 ? page_data : null}/>} />
        <Route path="/home/web-development/" component={() =>
          <App id="5" page={page_data.id === 5 ? page_data : null}/>} />
      </div>
    </Router>
  </Provider>,
  root
);

registerServiceWorker();
