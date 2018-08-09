import React from 'react';
import PropTypes from 'prop-types';

import './Footer.css';

// Load global jQuery
const { $ } = window;

class Footer extends React.Component {
  componentDidMount() {
    // Scroll to top button appear
    $(document).scroll(() => {
      const scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });
  }

  render() {
    const data = this.props.data || {};
    return (
      !data ? null
        : (
          <div>
            <footer className="footer text-center">
              <div className="container">
                <div className="row">
                  <div className="col-md-4 mb-5 mb-lg-0">
                    <h4 className="text-uppercase mb-4">
                      Location
                    </h4>
                    <p className="lead mb-0">
                      {data.address}
                    </p>
                  </div>
                  <div className="col-md-4 mb-5 mb-lg-0">
                    <h4 className="text-uppercase mb-4">
                      Around the Web
                    </h4>
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <a className="btn btn-outline-light btn-social text-center rounded-circle" href={data.google_link}>
                          <i className="fa fa-fw fa-google-plus" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="btn btn-outline-light btn-social text-center rounded-circle" href={data.github_link}>
                          <i className="fa fa-fw fa-github" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="btn btn-outline-light btn-social text-center rounded-circle" href={data.linkedin_link}>
                          <i className="fa fa-fw fa-linkedin" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="btn btn-outline-light btn-social text-center rounded-circle" href={data.instagram_link}>
                          <i className="fa fa-fw fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <h4 className="text-uppercase mb-4">
                      About Me
                    </h4>
                    <p className="lead mb-0">
                      {data.text}
                    </p>
                  </div>
                </div>
              </div>
            </footer>

            <div className="copyright py-4 text-center text-white">
              <div className="container">
                <small>
                  Copyright &copy; Noel Wilson 2018
                </small>
              </div>
            </div>

            <div className="scroll-to-top position-fixed ">
              <a className="js-scroll-trigger d-block text-center text-white rounded" href="#page-top">
                <i className="fa fa-chevron-up" />
              </a>
            </div>
          </div>
        )
    );
  }
}

Footer.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Footer;
