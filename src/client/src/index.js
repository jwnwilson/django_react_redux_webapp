import { Switch, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import registerServiceWorker from './registerServiceWorker';
import appRoutes from './App/App.routes';
import './style/index.css';
import utils from './utils';

const root = document.getElementById('root');
const apiData = JSON.parse(root.getAttribute('data-api') || {});
const pagesData = JSON.parse(root.getAttribute('data-pages') || []);
const routes = appRoutes.getRoutes(apiData, pagesData);

window.COMPONENTS = {};

// Preact standin for hydrate
function hydrate(vnode, parent) {
  return render(vnode, parent, parent.firstElementChild);
}


// Load all components to avoid page refresh with ssr
function loadComponents(data) {
  return data.modules.map((element) => {
    const componentType = utils.capitalize(
      element.module.polymorphic_ctype.model,
    );
    const componentName = utils.capitalize(
      element.module.component,
    );
    return import(`./components/${componentType}/index`).then(
      (component) => {
        window.COMPONENTS[componentName] = component.default;
      },
    );
  });
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          {routes}
        </Switch>
      </div>
    </Router>
  </Provider>
);

if (root.children.length > 0) {
  // Import code split code before rendering if we have stuff on screen
  Promise.all(loadComponents(apiData)).then(() => {
    hydrate(
      App(),
      root,
    );
  });
} else {
  render(
    App(),
    root,
  );
}

registerServiceWorker();
