import React from 'react';
import { connect } from 'react-redux';
import {
  NavLink,
} from 'react-router-dom';
import Scrollspy from 'react-scrollspy';
import PropTypes from 'prop-types';

import './Header.css';
import { componentUpdated } from '../../actions';

// Load global jQuery
const { $ } = window;

class Header extends React.Component {
  componentDidMount() {
    this.smoothScrolling();

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(() => {
      $('.navbar-collapse').collapse('hide');
    });

    // Collapse now if page is not at top
    this.navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(this.navbarCollapse);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.updateComponents) {
      this.smoothScrolling();
      this.props.componentUpdated();
    }
  }

  smoothScrolling() {
    // Smooth scrolling using jQuery easing
    const selector = 'a.js-scroll-trigger[href*="#"]:not([href="#"])';
    $(selector).unbind('click');
    $(selector).click(function () {   // eslint-disable-line
      if (window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && window.location.hostname === this.hostname) {
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 70),
          }, 1000, 'easeInOutExpo');
          return false;
        }
      }
      return null;
    });
  }

  navbarCollapse() {
    const element = $('#mainNav');
    if (!element.offset()) return;
    if (element.offset().top > 100) {
      element.addClass('navbar-shrink');
    } else {
      element.removeClass('navbar-shrink');
    }
  }

  render() {
    const { data } = this.props;
    const { title } = data;
    let links = [];
    const selectors = [];
    let headerLinks = null;

    if (data && data.ctas) {
      links = data.ctas.map((cta, index) => {
        let link;
        selectors.push(cta.selector);
        if (cta.link) {
          link = (
            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href={cta.link.url}>
              {cta.text}
            </a>
          );
        } else {
          link = (
            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href={'#' + cta.selector}>
              {cta.text}
            </a>
          );
        }
        return (
          <li className="nav-item mx-0 mx-lg-1" key={index}>
            {link}
          </li>
        );
      });
      headerLinks = (
        <Scrollspy
          className="navbar-nav ml-auto"
          items={selectors}
          currentClassName="active"
          offset={-100}
        >
          {links}
        </Scrollspy>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
        <div className="container">
          <NavLink className="navbar-brand js-scroll-trigger" to="/#intro">
            {title}
          </NavLink>
          <button className="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            {headerLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = {
  componentUpdated,
};

const mapStateToProps = state => ({
  updateComponents: state.updateComponents,
});

Header.propTypes = {
  data: PropTypes.object.isRequired,
  componentUpdated: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
