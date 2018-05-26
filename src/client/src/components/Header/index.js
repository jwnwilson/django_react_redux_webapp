import React from 'react'
import {
  NavLink
} from "react-router-dom";

import './../../style/Header.css'

// Load global jQuery
const $ = window.$;

class Header extends React.Component {
  componentDidMount () {
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (window.location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && window.location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 70)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });

    // Collapse now if page is not at top
    this.navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(this.navbarCollapse);
  }

  navbarCollapse () {
    let element = $("#mainNav");
    if (!element.offset()) return;
    if (element.offset().top > 100) {
      element.addClass("navbar-shrink");
    } else {
      element.removeClass("navbar-shrink");
    }
  }

  render () {
    let title = '';
    if (this.props.data) {
      title = this.props.data.title;
    }
    return (
     <nav className="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
       <div className="container">
         <NavLink className="navbar-brand js-scroll-trigger" to="/#page-top">{title}</NavLink>
         <button className="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
           Menu
           <i className="fa fa-bars"></i>
         </button>
         <div className="collapse navbar-collapse" id="navbarResponsive">
           <ul className="navbar-nav ml-auto">
             <li className="nav-item mx-0 mx-lg-1">
               <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#portfolio">Portfolio</a>
             </li>
             <li className="nav-item mx-0 mx-lg-1">
               <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#about">About</a>
             </li>
             <li className="nav-item mx-0 mx-lg-1">
               <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#contact">Contact</a>
             </li>
           </ul>
         </div>
       </div>
     </nav>
    );
  }
}

export default Header;
