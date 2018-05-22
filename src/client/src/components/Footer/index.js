import React from 'react'
import $ from 'jquery'

import './../../style/Footer.css'

class Footer extends React.Component {
  componentDidMount () {
    // Scroll to top button appear
    $(document).scroll(function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });
  }

  render () {
     return (
       <div>
         <footer className="footer text-center">
           <div className="container">
             <div className="row">
               <div className="col-md-4 mb-5 mb-lg-0">
                 <h4 className="text-uppercase mb-4">Location</h4>
                 <p className="lead mb-0">2215 John Daniel Drive
                   <br />Clark, MO 65243</p>
               </div>
               <div className="col-md-4 mb-5 mb-lg-0">
                 <h4 className="text-uppercase mb-4">Around the Web</h4>
                 <ul className="list-inline mb-0">
                   <li className="list-inline-item">
                     <a className="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                       <i className="fa fa-fw fa-facebook"></i>
                     </a>
                   </li>
                   <li className="list-inline-item">
                     <a className="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                       <i className="fa fa-fw fa-google-plus"></i>
                     </a>
                   </li>
                   <li className="list-inline-item">
                     <a className="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                       <i className="fa fa-fw fa-twitter"></i>
                     </a>
                   </li>
                   <li className="list-inline-item">
                     <a className="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                       <i className="fa fa-fw fa-linkedin"></i>
                     </a>
                   </li>
                   <li className="list-inline-item">
                     <a className="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                       <i className="fa fa-fw fa-dribbble"></i>
                     </a>
                   </li>
                 </ul>
               </div>
               <div className="col-md-4">
                 <h4 className="text-uppercase mb-4">About Freelancer</h4>
                 <p className="lead mb-0">Freelance is a free to use, open source Bootstrap theme created by
                   <a href="http://startbootstrap.com">Start Bootstrap</a>.</p>
               </div>
             </div>
           </div>
         </footer>

         <div className="copyright py-4 text-center text-white">
           <div className="container">
             <small>Copyright &copy; Your Website 2018</small>
           </div>
         </div>

         <div className="scroll-to-top position-fixed ">
           <a className="js-scroll-trigger d-block text-center text-white rounded" href="#page-top">
             <i className="fa fa-chevron-up"></i>
           </a>
         </div>
        </div>
     );
  }
}

export default Footer;
