import React from 'react'

import './../../style/About.css'

class About extends React.Component {
  render () {
     return (
       <section className="bg-primary text-white mb-0" id="about">
         <div className="container">
           <h2 className="text-center text-uppercase text-white">About</h2>
           <hr className="star-light mb-5" />
           <div className="row">
             <div className="col-lg-4 ml-auto">
               <p className="lead">Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional LESS stylesheets for easy customization.</p>
             </div>
             <div className="col-lg-4 mr-auto">
               <p className="lead">Whether you're a student looking to showcase your work, a professional looking to attract clients, or a graphic artist looking to share your projects, this template is the perfect starting point!</p>
             </div>
           </div>
           <div className="text-center mt-4">
             <a className="btn btn-xl btn-outline-light" href="#">
               <i className="fa fa-download mr-2"></i>
               Download Now!
             </a>
           </div>
         </div>
       </section>
     );
  }
}

export default About;
