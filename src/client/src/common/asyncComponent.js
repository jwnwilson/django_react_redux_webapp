import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { updateComponent } from '../actions';
import store from '../store';

import './async.css';

window.COMPONENTS = {};

export default class AsyncComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Component: null,
    };
  }

  componentWillMount() {
    if (!this.state.Component) {
      let Component;
      const data = this.props.data.module;
      // Check if the component is already loaded
      if (data && data.component) {
        Component = window.COMPONENTS[data.component];
      }
      if (!Component) {
        // Dynamically load component
        this.props.moduleProvider().then(
          (Component) => {
            window.COMPONENTS[data.component] = Component.default;
            this.setState({
              Component: Component.default,
            },
            this.updateComponent);
          },
        );
      } else {
        this.setState(
          { Component },
          this.updateComponent,
        );
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
        {Component ? <Component data={this.props.data} /> : <section />}
      </div>
    );
  }
}

AsyncComponent.propTypes = {
  data: PropTypes.object.isRequired,
  moduleProvider: PropTypes.func.isRequired,
};
