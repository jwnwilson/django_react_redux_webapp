import React from 'react'

import './../../style/Footer.css'

class Footer extends React.Component {
  render () {
     return (
       <div>
         <footer class="footer text-center">
           <div class="container">
             <div class="row">
               <div class="col-md-4 mb-5 mb-lg-0">
                 <h4 class="text-uppercase mb-4">Location</h4>
                 <p class="lead mb-0">2215 John Daniel Drive
                   <br />Clark, MO 65243</p>
               </div>
               <div class="col-md-4 mb-5 mb-lg-0">
                 <h4 class="text-uppercase mb-4">Around the Web</h4>
                 <ul class="list-inline mb-0">
                   <li class="list-inline-item">
                     <a class="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                       <i class="fa fa-fw fa-facebook"></i>
                     </a>
                   </li>
                   <li class="list-inline-item">
                     <a class="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                       <i class="fa fa-fw fa-google-plus"></i>
                     </a>
                   </li>
                   <li class="list-inline-item">
                     <a class="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                       <i class="fa fa-fw fa-twitter"></i>
                     </a>
                   </li>
                   <li class="list-inline-item">
                     <a class="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                       <i class="fa fa-fw fa-linkedin"></i>
                     </a>
                   </li>
                   <li class="list-inline-item">
                     <a class="btn btn-outline-light btn-social text-center rounded-circle" href="#">
                       <i class="fa fa-fw fa-dribbble"></i>
                     </a>
                   </li>
                 </ul>
               </div>
               <div class="col-md-4">
                 <h4 class="text-uppercase mb-4">About Freelancer</h4>
                 <p class="lead mb-0">Freelance is a free to use, open source Bootstrap theme created by
                   <a href="http://startbootstrap.com">Start Bootstrap</a>.</p>
               </div>
             </div>
           </div>
         </footer>

         <div class="copyright py-4 text-center text-white">
           <div class="container">
             <small>Copyright &copy; Your Website 2018</small>
           </div>
         </div>

         <div class="scroll-to-top d-lg-none position-fixed ">
           <a class="js-scroll-trigger d-block text-center text-white rounded" href="#page-top">
             <i class="fa fa-chevron-up"></i>
           </a>
         </div>
        </div>
     );
  }
}

export default Footer;
