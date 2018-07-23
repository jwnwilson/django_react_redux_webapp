import React from 'react';
import PropTypes from 'prop-types';

import '../../style/Intro.css';

const HeroImage = (props) => {
  const data = props.data.module;
  return (
    <header id="intro" className="masthead bg-primary text-white text-center">
      <div className="container">
        <img
          className="img-fluid rounded-circle col-10 col-sm-8 col-md-6 col-lg-4 mb-5 d-block mx-auto"
          src={data.image.file}
          alt=""
        />
        <h1 className="text-uppercase mb-0">
          {data.title}
        </h1>
        <hr className="star-light" />
        <h2 className="font-weight-light mb-0">
          {data.text}
        </h2>
      </div>
    </header>
  );
};

HeroImage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HeroImage;
