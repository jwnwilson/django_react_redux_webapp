import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AsyncComponent from '../common/asyncComponent';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getApiData } from '../actions';
import utils from '../utils';

import './App.css';
import '../style/core.css';

class App extends Component {
  constructor(props) {
    super(props);
    let initComponents = [];
    let initHeader = null;
    let initFooter = null;
    if (props.page) {
      initComponents = props.page.modules;
      initHeader = props.page.header;
      initFooter = props.page.footer;
    }
    this.state = {
      componentsData: initComponents,
      header: initHeader,
      footer: initFooter,
    };
  }

  componentWillMount() {
    // Attempt to load data from data attribute
    if (this.state.componentsData.length === 0) {
      this.props.dispatch(getApiData(this.props.id));
    } else {
      this.loadComponents(this.state.componentsData);
    }
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(newProps) {
    // Dispatch action to change the page with new data if id changes
    if (newProps.id !== this.props.id) {
      this.props.dispatch(getApiData(this.props.id));
    }
    // If we have recieved new components load them
    if (newProps.components !== this.props.components) {
      this.loadComponents(newProps.components);
    }
    // Update header & footer
    if (newProps.header !== this.props.header) {
      this.setState({
        header: newProps.header,
      });
    }
    if (newProps.footer !== this.props.footer) {
      this.setState({
        footer: newProps.footer,
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      componentsData: [],
    });
  }

  loadComponents(componentsData) {
    this.setState({ componentsData });
  }

  dynamicallyLoadComponents() {
    const components = [];
    for (let i = 0; i < this.state.componentsData.length; i++) {
      const componentData = this.state.componentsData[i];
      const pageData = this.props.page;
      const componentType = utils.capitalize(
        componentData.module.polymorphic_ctype.model,
      );
      // Use webpack dynamic import to get the module
      const componentImport = () => import(`../components/${componentType}/index`);
      components.push((
        <AsyncComponent
          moduleProvider={componentImport}
          data={componentData}
          page={pageData}
          key={i}
        />));
    }
    return components;
  }

  render() {
    let components = this.dynamicallyLoadComponents();
    if (components.length === 0) {
      components = (
        <div className="placeholder" />
      );
    }

    return (
      <div>
        <Header data={this.state.header} />
        {components}
        <Footer data={this.state.footer} />
      </div>
    );
  }
}

App.defaultProps = {
  header: {},
  footer: {},
};

App.propTypes = {
  page: PropTypes.object.isRequired,
  header: PropTypes.object,
  footer: PropTypes.object,
  components: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(
  state => ({
    components: state.components,
    footer: state.footer,
    header: state.header,
  }),
)(App);
