import React from 'react'
import utils from './../../utils'
import './../../style/ImageText.css'

class WrapImage extends React.Component {
  render () {
    let module = this.props.data.module;
    return (
      <section className="bg-primary text-white mb-0" id="about">
        <div className="container">
          <div class="col-xs-12 col-sm-5">
            <img class="img-responsive" src={module.image} width="100%">
          </div>
          <div class="col-xs-12 col-sm-7">
            <div class="row">
              <div class="col-sm-6">
                <h2>{module.title}</h2>
              </div>
            <div class="col-sm-6">
              <h3 class="pull-right">
                {{$blogPost->created_at}}
              </h3>
            </div>
          </div>
          </div>
          {module.text}
          <div class="col-xs-12">
            <hr />
          </div>
        </div>
      </section>
    );
  }
}

export default WrapImage;
