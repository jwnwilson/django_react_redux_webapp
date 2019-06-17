import React, { PureComponent } from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import { updateComponent } from '../actions';
import store from '../store';

import './async.css';

export default class AsyncComponent extends PureComponent {
  componentDidMount() {
    this.updateComponent();
  }

  updateComponent() {
    store.dispatch(updateComponent());
  }

  render() {
    const LoadableComponent = Loadable({
      delay: 200,
      loader: this.props.moduleProvider,
      modules: this.props.componentModule,
      webpack: this.props.componentWebpack,
      loading: () => <section className="placeholder" />,
      render(loaded, props) {
        const Component = loaded.default;
        return (
          <div className="fade-in">
            <Component {...props} />
          </div>
        );
      },
    });

    return (
      <LoadableComponent data={this.props.data} page={this.props.page} />
    );
  }
}

AsyncComponent.propTypes = {
  page: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  moduleProvider: PropTypes.func.isRequired,
  componentModule: PropTypes.func.isRequired,
  componentWebpack: PropTypes.func.isRequired,
};
