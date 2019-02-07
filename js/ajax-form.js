$(document).ready(function(){
    // Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.ajax-response');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		if(form_validate()) {

			// Stop the browser from submitting the form.
			e.preventDefault();

			// Serialize the form data.
			var formData = $(form).serialize();

			// Submit the form using AJAX.
			$.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				data: formData
			})
			.done(function(response) {
				// Make sure that the formMessages div has the 'success' class.
				validationAlert = document.getElementById("formValidationAlerts");
				validationAlert.innerHTML = "";

				$(formMessages).removeClass('error');
				$(formMessages).addClass('success');

				// Set the message text.
				$(formMessages).text(response);

				// Clear the form.
				$('#contact-form input,#contact-form textarea').val('');
			})
			.fail(function(data) {
				// Make sure that the formMessages div has the 'error' class.
				$(formMessages).removeClass('success');
				$(formMessages).addClass('error');

				// Set the message text.
				if (data.responseText !== '') {
					$(formMessages).text(data.responseText);
				} else {
					$(formMessages).text('Oops! An error occured and your message could not be sent.');
				}
			});
		}
		return false;
	});
});

form_validate = function () {

        var name = document.forms["contact-form"]["name"].value;
        var email = document.forms["contact-form"]["email"].value;
        var subject = document.forms["contact-form"]["subject"].value;
        var message = document.forms["contact-form"]["message"].value;

        var validationAlert = document.getElementById("formValidationAlerts");
        var letterOnlyRegExp = /^[a-zA-Z\s]*$/;
        var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Check if the fields full name, E-mail and message are filled.
        if ((name == null || name == "") ||
			(email == null || email == "") ||
			(subject == null || subject == "") ||
            (message == null || message == "")) {
            validationAlert.innerHTML = "* Your Full Name, Your E-mail Address, Your Subject, and Your Message are Required fields." +
                " Please fill all of them.";
            return false;
        }

        // Check if the full name is valid (English letters only).
        if (!(name.match(letterOnlyRegExp))) {
            validationAlert.innerHTML = "* Please Enter a Valid Name (English letters only).";
            return false;
        }

        // Check if the E-mail is valid.
        if (!(email.match(emailRegExp))) {
            validationAlert.innerHTML = "* Please Enter a Valid E-mail.";
            return false;
        }

        return true;
    };
