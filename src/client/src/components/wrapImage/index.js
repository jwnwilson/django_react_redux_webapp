import React from 'react'
import './../../style/WrapImage.css'

class WrapImage extends React.Component {
  render () {
    let module = this.props.data.module;
    return (
      <section className="bg-primary text-white mb-0" id="about">
        <div className="container">
          <div className="col-xs-12 col-sm-5">
            <img className="img-responsive" src={module.image.file} alt={module.title} width="100%"/>
          </div>
          <div className="col-xs-12 col-sm-7">
            <div className="row">
              <div className="col-sm-6">
                <h2>{module.title}</h2>
              </div>
          </div>
          </div>
          {module.text}
          <div className="col-xs-12">
            <hr />
          </div>
        </div>
      </section>
    );
  }
}

export default WrapImage;
