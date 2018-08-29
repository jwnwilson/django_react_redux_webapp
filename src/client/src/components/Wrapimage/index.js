import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

import '../../style/core.css';
import './WrapImage.css';

const WrapImage = (props) => {
  const { module } = props.data;
  const paras = (
    <ReactMarkdown source={module.text} />
  );
  const link = !module.link ? null : (
    <a href={module.link} target="_blank" className="wrap-image-link">
      <i className="fa fa-link mr-2" />
        Link
    </a>
  );
  const img = !module.image ? '' : module.image.file;
  // Build optional additional paragraphs
  const additionalParagraphs = module.paragraphs.map((paragraph, index) => {
    const additionalParas = (
      <ReactMarkdown source={paragraph.text} />
    );
    return (
      <div className="clear-fix">
        <div key={index} className="pull-left col-12 col-md-5 mb-3">
          <img className="img-responsive rounded" src={img} alt={module.title} width="100%" style={{ width: '100%' }} />
        </div>
        {additionalParas}
      </div>
    );
  });

  return (
    <section className="wrap-image bg-primary text-white mb-0 mt-5" id="about">
      <div className="container">
        <div className="pull-left col-12 col-md-5 mb-3">
          <img className="img-responsive rounded" src={img} alt={module.title} width="100%" style={{ width: '100%' }} />
        </div>
        <div className="pull-left col-12 col-md-7 mt-3">
          <h2>
            {module.title}
          </h2>
          {link}
          <hr />
        </div>
        {paras}
        {additionalParagraphs}
        <div className="clear-fix col-xs-12">
          <hr />
        </div>
      </div>
    </section>
  );
};

WrapImage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WrapImage;
