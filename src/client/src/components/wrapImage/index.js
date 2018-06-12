import React from 'react'
import './../../style/WrapImage.css'

class WrapImage extends React.Component {
  render () {
    let module = this.props.data.module;
    let paras = module.text.split('\n').map((para, index) => {
      return (<p key={index}>{para}</p>);
    });
    let link = !module.link ? null : (
      <a href={module.link} target="_blank">
        <i className="fa fa-link mr-2"></i>Link
      </a>
    )

    return (
      <section className="wrap-image bg-primary text-white mb-0 mt-5" id="about">
        <div className="container">
          <div className="pull-left col-12 col-md-5">
            <img className="img-responsive rounded" src={module.image.file} alt={module.title} width="100%"/>
          </div>
          <div className="pull-left col-12 col-md-7 mt-3">
            <h2>{module.title}</h2>
            {link}
            <hr />
          </div>
          {paras}
          <div className="col-xs-12">
            <hr />
          </div>
        </div>
      </section>
    );
  }
}

export default WrapImage;
