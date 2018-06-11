import React from 'react'
import {
  NavLink
} from "react-router-dom";

import './../../style/Portfolio.css'

// Load global jQuery
const $ = window.$;

class Portfolio extends React.Component {
  componentDidMount () {
    // Modal popup
    $('.portfolio-item').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#username',
      modal: true
    });

    $(document).on('click', '.portfolio-modal-dismiss', function(e) {
      $.magnificPopup.close();
    });
  }

  render () {
    let module = this.props.data.module;
    let portfolio_items = module.portfolio_items.map((item, index) => {
      return (
        <div key={index} className="col-md-6 col-lg-4">
          <a className="portfolio-item d-block mx-auto" href={"#portfolio-modal-" + index}>
            <div className="portfolio-item-caption d-flex position-absolute h-100 w-100">
              <div className="portfolio-item-caption-content my-auto w-100 text-center text-white">
                <i className="fa fa-search-plus fa-3x"></i>
              </div>
            </div>
            <img className="img-fluid" src={item.image.file} alt="" />
          </a>
        </div>
      )
    });
    let modals = module.portfolio_items.map((item, index) => {
      return (
        <div key={index} className="portfolio-modal mfp-hide" id={"portfolio-modal-" + index}>
          <div className="portfolio-modal-dialog bg-white">
            <a className="close-button d-none d-md-block portfolio-modal-dismiss" href="#">
              <i className="fa fa-3x fa-times"></i>
            </a>
            <div className="container text-center">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h2 className="text-secondary text-uppercase mb-0">{item.portfolio.title}</h2>
                  <hr className="star-dark mb-5" />
                  <img className="img-fluid mb-5" src={item.image.file} alt="" />
                  <p className="mb-5">{item.text}</p>
                  <NavLink className="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss mr-2" to={item.link.url}>
                    <i className="fa fa-external-link mr-2"></i>
                    Details</NavLink>
                  <a className="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="#">
                    <i className="fa fa-close mr-2"></i>
                    Close</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
     <div className="bg-white">
       <section className="portfolio " id="portfolio">
         <div className="container">
           <h2 className="text-center text-uppercase text-secondary mb-0">Portfolio</h2>
           <hr className="star-dark mb-5" />
           <div className="row">
             {portfolio_items}
           </div>
         </div>
       </section>
       {modals}
      </div>
    );
  }
}

export default Portfolio;
