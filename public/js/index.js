// AJAX CALLS

function submitRegistration() {		
	const username = $("#new-username-input").val();
	const password = $("#new-password-input").val();
	const selfDescription = $("#new-self-description-input").val();
	console.log(username);
	console.log(password);
	console.log(selfDescription);
	const settings = {
		url: '/api/users',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({username, password, selfDescription}),
		success: function(data) {
			console.log("Successfully created a new user:");
			console.log(data);
		},
		error: function() {
			alert("We're sorry but we had some trouble sending you to the registration page, please try again");
			console.error("User was not registered");
		}			
	};
	$.ajax(settings);
}

function submitLogin() {
	const username = $("#username-input");
	const password = $("#password-input");
	const settings = {
		url: '/api/auth',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({username, password}),
		success: function(data) {
			console.log("Login successful!");
		},
		error: function() {
			alert("We're sorry, but we had some trouble logging you in, please try again");
			console.error("User was not logged in");
		}
	};
	$.ajax(settings);
}


// EVENT LISTENERS
// Register Event Listeners
//
//
// MAKE SURE TO USE .HTML()
//
//

function listenForHomePageRedirect() {
	$('.js-home-page').on('click', event => {
		event.preventDefault();

	});
}


function listenForRegistrationRedirect() {
	$('.js-register-button').on('click', event => {
		event.preventDefault();
		$('.js-container-1').html(`<p class="js-registration-intro">Welcome to new user registration, to get started please fill out the form below</p>`);
		$('.js-container-2').html(`
			<form class="js-new-user-registration-form">
				<label for="new-username-input">Username</label>
				<input id="new-username-input" type="text" name="new-username-input">
				<label for="new-password-input">Password</label>
				<input id="new-username-input" type="text" name="new-password-input">
				<label for="new-self-description-input">Self Description</label>
				<input id="new-self-description-input" type="text" name="new-self-description">
				<input type="submit" name="js-registration-submit" class="js-registration-submit">
			</form>
				`);
	});
}

function listenForRegistrationSubmit() {
	console.log('this function is running');
	$('.js-container-2').on('submit', '.js-new-user-registration-form', event => {
		event.preventDefault();
		console.log('registration submit button clicked!');
		submitRegistration();
	});
}


// Login Event Listeners

function listenForLoginButtonRedirect() {
	$('.js-login-button').on('click', event => {
		event.preventDefault();
		console.log('login button clicked');
		$('.js-container-1').html(`<p class="js-login-intro">Welcome to the login page, please login below to begin</p>`);
		$('.js-container-2').html(`
			<form class="js-login">
				<label for="username-input">Username</label>
				<input id="username-input" type="text" name="username-input">
				<label for="password-input">Password</label>
				<input id="password-input" type="text" name="password-input">
				<input type="submit" name="js-login-submit" class="js-login-submit">
			</form>

			`)

	})
}

function listenForLoginSubmit() {
	$('.js-login-submit').on('submit', event => {
		event.preventDefault();
		submitLogin();
	})
}

// Dashboard Event Listeners

function listenForDashboardRedirect() {
	$('.js-dashboard-button').on('click', event => {
		event.preventDefault();
		console.log('dashboard button clicked');
		$('.js-container-1').html(`<p class="js-dashboard-intro">Welcome to your dashboard!</p>`);
		$('.js-container-2').html()
	});
}

function getUserEntries() {
	const settings = {
		url: '/api/entries',
		type: 'GET',
		dataType: 'json',
		contentType: 'application/json',
		success: function(data) {
			// Insert function that takes data as an argument and creates an html element to be injected
		},
		error: function() {
			alert("Sorry, we were not able to display user entries");
			console.error("User entries request failed");
		}			
	};
	$.ajax(settings);
}


//function to take JSON entry data
// create an html element
// inject this element into the DOM
function displayEntries(entryJsonp) {

}


listenForRegistrationRedirect();
listenForLoginButtonRedirect();
listenForDashboardRedirect();

listenForRegistrationSubmit();


/*

jquery methods to remember:
.empty()
.append()
.text()
document.createElement()
*/


/* REGISTER NEW USER FORM HTML TO APPEND
<form>
		<div class="js-registration-form">
			<label for="input-username">Username</label>
			<input id="input-username" type="text" name="username">
		</div>
		<div>
			<label for="input-password">Password</label>
			<input id="input-password" type="text" name="password">
		</div>
		<div>
			<label for="input-self-description">Self Description</label>
			<input id="input-self-description" type="text" name="self-description">
		</div>
		<div>
			<input type="submit" name="submit-username-password" class="js-submit-username-password">
		</div>
	</form>

	*/