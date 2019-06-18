import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { updateComponent } from '../actions';
import store from '../store';

import './async.css';

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
          (component) => {
            window.COMPONENTS[data.component] = component.default;
            this.setState({
              Component: component.default,
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
        {Component ? <Component data={this.props.data} page={this.props.page} /> : <section />}
      </div>
    );
  }
}

AsyncComponent.propTypes = {
  page: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  moduleProvider: PropTypes.func.isRequired,
};
