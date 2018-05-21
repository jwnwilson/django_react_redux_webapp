import React from 'react'

import './../../style/Intro.css'

class HeroImage extends React.Component {
  render () {
    var data = this.props.data.module;
    return (
     <header className="masthead bg-primary text-white text-center">
       <div className="container">
         <img className="img-fluid mb-5 d-block mx-auto" src={data.image.file} alt="" />
         <h1 className="text-uppercase mb-0">{data.title}</h1>
         <hr className="star-light" />
         <h2 className="font-weight-light mb-0">{data.text}</h2>
       </div>
     </header>
    );
  }
}

export default HeroImage;
