import React from 'react';
import utils from '../../utils';
import './ContactMe.css';

// Load global jQuery
const { $ } = window;

class ContactMe extends React.Component {
  componentDidMount() {
    // Floating label headings for the contact form
    $(() => {
      // eslint-disable-next-line
      $('body').on('input propertychange', '.floating-label-form-group', function (e) {
        $(this).toggleClass('floating-label-form-group-with-value', !!$(e.target).val());
      // eslint-disable-next-line
      }).on('focus', '.floating-label-form-group', function () {
        $(this).addClass('floating-label-form-group-with-focus');
      // eslint-disable-next-line
      }).on('blur', '.floating-label-form-group', function () {
        $(this).removeClass('floating-label-form-group-with-focus');
      });
    });

    $('#contactForm input,#contactForm textarea').jqBootstrapValidation({
      preventSubmit: true,
      submitError() {
        // additional error messages or events
      },
      submitSuccess($form, event) {
        event.preventDefault(); // prevent default submit behaviour
        // get values from FORM
        const name = $('input#name').val();
        const email = $('input#email').val();
        const phone = $('input#phone').val();
        const message = $('textarea#message').val();
        let firstName = name; // For Success/Failure Message
        // Check for white space in name for Success/Fail message
        if (firstName.indexOf(' ') >= 0) {
          firstName = name.split(' ').slice(0, -1).join(' ');
        }
        const elem = $('#sendMessageButton');
        elem.prop('disabled', true); // Disable submit button until AJAX call is complete to prevent duplicate messages
        $.ajax({
          url: window.location.pathname,
          type: 'POST',
          data: {
            name,
            phone,
            email,
            message,
          },
          cache: false,
          success() {
            // Success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append('</button>');
            $('#success > .alert-success')
              .append('<strong>Your message has been sent. </strong>');
            $('#success > .alert-success')
              .append('</div>');
            // clear all fields
            $('#contactForm').trigger('reset');
          },
          error() {
            // Fail message
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append('</button>');
            $('#success > .alert-danger').append($('<strong>').text('Sorry ' + firstName + ', it seems that my mail server is not responding. Please try again later!'));
            $('#success > .alert-danger').append('</div>');
            // clear all fields
            $('#contactForm').trigger('reset');
          },
          complete() {
            setTimeout(() => {
              elem.prop('disabled', false); // Re-enable submit button when AJAX call is complete
            }, 1000);
          },
        });
      },
      filter() {
        return $(this).is(':visible');
      },
    });

    // eslint-disable-next-line
    $('a[data-toggle="tab"]').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

    /* When clicking on Full hide fail/success boxes */
    $('#name').focus(() => {
      $('#success').html('');
    });

    $.ajaxSetup({
      beforeSend: (xhr, settings) => {
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
          // Only send the token to relative URLs i.e. locally.
          xhr.setRequestHeader('X-CSRFToken', utils.getCookie('csrftoken'));
        }
      },
    });
  }

  render() {
    return (
      <section id="contact" className="bg-white">
        <div className="container">
          <h2 className="text-center text-uppercase text-secondary mb-0">
Contact Me
          </h2>
          <hr className="star-dark mb-5" />
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <form name="sentMessage" id="contactForm" noValidate="novalidate">
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>
Name
                    </label>
                    <input className="form-control" id="name" type="text" placeholder="Name" required="required" data-validation-required-message="Please enter your name." />
                    <p className="help-block text-danger" />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>
Email Address
                    </label>
                    <input className="form-control" id="email" type="email" placeholder="Email Address" required="required" data-validation-required-message="Please enter your email address." />
                    <p className="help-block text-danger" />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>
Phone Number
                    </label>
                    <input className="form-control" id="phone" type="tel" placeholder="Phone Number" required="required" data-validation-required-message="Please enter your phone number." />
                    <p className="help-block text-danger" />
                  </div>
                </div>
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>
Message
                    </label>
                    <textarea className="form-control" id="message" rows="5" placeholder="Message" required="required" data-validation-required-message="Please enter a message." />
                    <p className="help-block text-danger" />
                  </div>
                </div>
                <br />
                <div id="success" />
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-xl" id="sendMessageButton">
Send
                  </button>
                </div>
              </form>
              <div id="result" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ContactMe;
