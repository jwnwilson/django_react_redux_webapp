import React from 'react'

import './../../style/core.css'
import './../../style/WrapImage.css'

class WrapImage extends React.Component {
  render () {
    let module = this.props.data.module;
    let paras = module.text.split('\n\n').map((para, index) => {
      return (<p key={index}>{para}</p>);
    });
    let link = !module.link ? null : (
      <a href={module.link} target="_blank">
        <i className="fa fa-link mr-2"></i>Link
      </a>
    )
    let img = !module.image ? '' : module.image.file;
    // Build optional additional paragraphs
    let additional_paragraphs = module.paragraphs.map((paragraph, index) => {
      let additional_paras = paragraph.text.split('\n').map((para) => {
        return (<p>{para}</p>);
      });
      return (
        <div className="clear-fix">
          <div key={index} className="pull-left col-12 col-md-5 mb-3">
            <img className="img-responsive rounded" src={img} alt={module.title} width="100%"/>
          </div>
          {additional_paras}
        </div>
      )
    })

    return (
      <section className="wrap-image bg-primary text-white mb-0 mt-5" id="about">
        <div className="container">
          <div className="pull-left col-12 col-md-5 mb-3">
            <img className="img-responsive rounded" src={img} alt={module.title} width="100%"/>
          </div>
          <div className="pull-left col-12 col-md-7 mt-3">
            <h2>{module.title}</h2>
            {link}
            <hr />
          </div>
          {paras}
          {additional_paragraphs}
          <div className="clear-fix col-xs-12">
            <hr />
          </div>
        </div>
      </section>
    );
  }
}

export default WrapImage;
