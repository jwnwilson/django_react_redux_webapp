import React, { PureComponent } from 'react';
import {updateComponent} from './../actions';
import store from './../store';
import root from 'window-or-global';

import './../style/Async.css';

root.COMPONENTS = {};

export default class AsyncComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Component: null
    };
  }

  componentWillMount() {
    if(!this.state.Component) {
      let Component;
      let data = this.props.data.module;
      // Check if the component is already loaded
      if (data && data.component) {
        Component = root.COMPONENTS[data.component];
      }
      if (!Component) {
        // Dynamically load component
        this.props.moduleProvider().then(
          (Component) => {
            root.COMPONENTS[data.component] = Component.default;
            this.setState({
              Component: Component.default
            },
            this.updateComponent);
          });
      }
      else {
        this.setState(
          { Component },
          this.updateComponent);
      }
    }
  }

  updateComponent() {
    store.dispatch(updateComponent());
  }

  render() {
    const { Component } = this.state;

    return (
      <div className={!Component ? 'placeholder' : 'fade-in'}>
        {Component ? <Component data={this.props.data} /> : <section></section>}
      </div>
    );
  }
};
