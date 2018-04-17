//This JS file is the client-side controller

//Splash page event listener for button click on "register" button
//Send user to registration page

function submitRegistration() {		
	const settings = {
		url: '/api/users/register',
		type: "POST",
		dataType: 'jsonp',
		success: function(data) {
			console.log("successfully sent information to server");


		},
		error: function() {
			alert("We're sorry but we had some trouble sending you to the registration page, please try again");
			console.log("user was not sent to registration page");
		}			
	};
	$.ajax(settings);
}

/*
function listenForRegistrationButtonClick() {
	$('.js-register-button').on('click', event => {
		event.preventDefault();
		sendToRegistrationPage();
	})
};

listenForRegistrationButtonClick();

*/


function listenForRegistrationSubmit() {
	$('.js-submit-username-password').on('submit', event => {
		event.preventDefault();
		submitRegistration();
	});
}

listenForRegistrationSubmit();
