import React from 'react'
import $ from 'jquery'

import './../../style/ContactMe.css'

class ContactMe extends React.Component {
  componentDidMount () {
    // Floating label headings for the contact form
    $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    });
  }

  render () {
     return (
       <section id="contact">
         <div className="container">
           <h2 className="text-center text-uppercase text-secondary mb-0">Contact Me</h2>
           <hr className="star-dark mb-5" />
           <div className="row">
             <div className="col-lg-8 mx-auto">
               <form name="sentMessage" id="contactForm" noValidate="novalidate">
                 <div className="control-group">
                   <div className="form-group floating-label-form-group controls mb-0 pb-2">
                     <label>Name</label>
                     <input className="form-control" id="name" type="text" placeholder="Name" required="required" data-validation-required-message="Please enter your name." />
                     <p className="help-block text-danger"></p>
                   </div>
                 </div>
                 <div className="control-group">
                   <div className="form-group floating-label-form-group controls mb-0 pb-2">
                     <label>Email Address</label>
                     <input className="form-control" id="email" type="email" placeholder="Email Address" required="required" data-validation-required-message="Please enter your email address." />
                     <p className="help-block text-danger"></p>
                   </div>
                 </div>
                 <div className="control-group">
                   <div className="form-group floating-label-form-group controls mb-0 pb-2">
                     <label>Phone Number</label>
                     <input className="form-control" id="phone" type="tel" placeholder="Phone Number" required="required" data-validation-required-message="Please enter your phone number." />
                     <p className="help-block text-danger"></p>
                   </div>
                 </div>
                 <div className="control-group">
                   <div className="form-group floating-label-form-group controls mb-0 pb-2">
                     <label>Message</label>
                     <textarea className="form-control" id="message" rows="5" placeholder="Message" required="required" data-validation-required-message="Please enter a message."></textarea>
                     <p className="help-block text-danger"></p>
                   </div>
                 </div>
                 <br />
                 <div id="success"></div>
                 <div className="form-group">
                   <button type="submit" className="btn btn-primary btn-xl" id="sendMessageButton">Send</button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </section>
     );
  }
}

export default ContactMe;
