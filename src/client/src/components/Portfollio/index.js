import React from 'react'

import './../../style/Portfollio.css'

class Portfollio extends React.Component {
  render () {
     return (
       <section class="portfolio" id="portfolio">
         <div class="container">
           <h2 class="text-center text-uppercase text-secondary mb-0">Portfolio</h2>
           <hr class="star-dark mb-5" />
           <div class="row">
             <div class="col-md-6 col-lg-4">
               <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-1">
                 <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                   <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                     <i class="fa fa-search-plus fa-3x"></i>
                   </div>
                 </div>
                 <img class="img-fluid" src="static/img/portfolio/cabin.png" alt="" />
               </a>
             </div>
             <div class="col-md-6 col-lg-4">
               <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-2">
                 <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                   <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                     <i class="fa fa-search-plus fa-3x"></i>
                   </div>
                 </div>
                 <img class="img-fluid" src="static/img/portfolio/cake.png" alt="" />
               </a>
             </div>
             <div class="col-md-6 col-lg-4">
               <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-3">
                 <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                   <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                     <i class="fa fa-search-plus fa-3x"></i>
                   </div>
                 </div>
                 <img class="img-fluid" src="static/img/portfolio/circus.png" alt="" />
               </a>
             </div>
             <div class="col-md-6 col-lg-4">
               <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-4">
                 <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                   <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                     <i class="fa fa-search-plus fa-3x"></i>
                   </div>
                 </div>
                 <img class="img-fluid" src="static/img/portfolio/game.png" alt="" />
               </a>
             </div>
             <div class="col-md-6 col-lg-4">
               <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-5">
                 <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                   <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                     <i class="fa fa-search-plus fa-3x"></i>
                   </div>
                 </div>
                 <img class="img-fluid" src="static/img/portfolio/safe.png" alt="" />
               </a>
             </div>
             <div class="col-md-6 col-lg-4">
               <a class="portfolio-item d-block mx-auto" href="#portfolio-modal-6">
                 <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">
                   <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">
                     <i class="fa fa-search-plus fa-3x"></i>
                   </div>
                 </div>
                 <img class="img-fluid" src="static/img/portfolio/submarine.png" alt="" />
               </a>
             </div>
           </div>
         </div>
       </section>
     );
  }
}

export default Portfollio;
