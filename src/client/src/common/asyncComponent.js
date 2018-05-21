import React, { PureComponent } from 'react';

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
      // Check if the component is already loaded
      if (this.props.data && this.props.data.component) {
        Component = window[this.props.data.component];
      }
      if (!Component) {
        // Dynamically load component
        this.props.moduleProvider().then(
          (Component) => {
            this.setState({ Component: Component.default });
            window[this.props.data.component] = Component.default;
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
