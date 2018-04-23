import React, { Component } from 'react'
import logo from './media/img/logo.svg'
import About from './components/About'
import ContactMe from './components/ContactMe'
import Footer from './components/Footer'
import Header from './components/Header'
import Intro from './components/Intro'
import Portfollio from './components/Portfollio'

import './style/App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Intro />
        <Portfollio />
        <About />
        <ContactMe />
        <Footer />
      </div>
    );
  }
}

export default App;
