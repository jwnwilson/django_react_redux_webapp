import React from 'react'

import './../../style/Intro.css'

class Intro extends React.Component {
  render () {
     return (
       <header class="masthead bg-primary text-white text-center">
         <div class="container">
           <img class="img-fluid mb-5 d-block mx-auto" src="static/img/profile.png" alt="" />
           <h1 class="text-uppercase mb-0">Start Bootstrap</h1>
           <hr class="star-light" />
           <h2 class="font-weight-light mb-0">Web Developer - Graphic Artist - User Experience Designer</h2>
         </div>
       </header>
     );
  }
}

export default Intro;
