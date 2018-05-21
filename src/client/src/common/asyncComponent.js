import React, { PureComponent } from 'react';

// TODO: Create singleton value to contain components
window.COMPONENTS = {};

export default class AsyncComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Component: null
    }
  }

  componentWillMount() {
    if(!this.state.Component) {
      let Component;
      let data = this.props.data.module;
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
              Component: Component.default
            });
          });
      }
      else {
        this.setState({ Component });
      }
    }
  }

  render() {
    const { Component } = this.state;

    return (
      <div>
        {Component ? <Component data={this.props.data} /> : <div></div>}
      </div>
    );
  }
};
