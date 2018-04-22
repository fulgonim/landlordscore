//This JS file is the client-side controller


function submitRegistration() {		
	const username = $("#input-username").val();
	const password = $("#input-password").val();
	const selfDescription = $("#input-self-description").val();
	const settings = {
		url: '/api/users/register',
		type: "POST",
		dataType: 'jsonp',
		data: {username: username, password: password, selfDescription: selfDescription},
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


// Event listener for submission of new user details
function listenForRegistrationSubmit() {
	$('.js-submit-username-password').on('click', event => {
		event.preventDefault();
		console.log("it's running!");
		submitRegistration();
	});
}

listenForRegistrationSubmit();
