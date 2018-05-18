import React, { Component } from 'react'
import { connect } from 'react-redux'

import AsyncComponent from './common/asyncComponent'
import logo from './media/img/logo.svg'
import About from './components/About'
import ContactMe from './components/ContactMe'
import Footer from './components/Footer'
import Header from './components/Header'
import Portfollio from './components/Portfollio'
import {getApiData} from './actions'
import store from './store'

import './style/App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      components: props.modules
    }
  }

  componentWillMount() {
    // Attempt to load data from data attribute
    if(this.state.components.length === 0) {
      this.props.dispatch(getApiData(this.props.id));
    }
    else {
      this.loadComponents(this.state.components);
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.id !==  this.props.id) {
      this.props.dispatch(getApiData(this.props.id));
    }
    if(newProps.modules !== this.props.modules) {
      this.loadComponents(newProps.modules);
    }
  }

  loadComponents(components) {
    this.setState({components});
  }

  render() {
    let components = [];
    for (let i=0; i<this.state.components.length;i++ ) {
      let component = this.state.components[i];
      let componentType = component.module.polymorphic_ctype.model;
      let componentImport = () => {
        return import(`./components/${componentType}/index`);
      }
      components.push((<AsyncComponent moduleProvider={componentImport} data={component} />));
    }

    return (
      <div>
        {components}
      </div>
    );
  }
}

export default connect(
  state => ({
    components: state.components
  })
)(App);
