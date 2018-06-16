'use strict';

// AJAX CALLS

function submitRegistration() {		
  const username = $('#new-username-input').val();
  const password = $('#new-password-input').val();
  const selfDescription = $('#new-self-description-input').val();
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
      console.log('Successfully created a new user:');
      console.log(data);
      renderLoginPage();
    },
    error: function() {
      alert("We're sorry but we had some trouble sending you to the registration page, please try again");
      console.error('User was not registered');
    }			
  };
  $.ajax(settings);
}

function submitLogin() {
  const username = $('#username-input').val();
  const password = $('#password-input').val();
  console.log(username);
  console.log(password);
  const settings = {
    url: '/api/auth',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({username, password}),
    success: function(data) {
      console.log('Login successful!');
    },
    error: function() {
      alert("We're sorry, but we had some trouble logging you in, please try again");
      console.error('User was not logged in');
    }
  };
  $.ajax(settings);
}

// Home Page Event Listeners

function listenForHomePageButtonClick() {
  $('.js-container-3').on('click', '.js-home-page-button', event => {
    event.preventDefault();
    renderHomePage();
  });
}

function renderHomePage() {
  $('.js-container-1').html(`
		<p>Welcome to LandLordScore!</p>
		<p>Ever wanted to know the real truth about your potential new landlord?</p>
		<p>Ever wanted a place to vent about or celebrate your landlord?</p>
		<p>Well here's your chance!</p>
		`);
  $('.js-container-2').html(`
		<form class="js-entry-search-form">
      <label for="js-entry-search-input">Search</label>
      <input id="js-entry-search-input" type="text" name=" js-entry-search-input">
      <input class="js-entry-search-submit" type="submit" name="js-entry-search-submit">
    </form>
		`);
  $('.js-container-3').html(`
		<button class="js-login-button">Login</button>
		<button class="js-register-button">New User? Register Here!</button>
		<button class="js-dashboard-button">My Dashboard</button>
		<button class="js-all-entries-button">View All Entries</button>
		`);
}

// Register New User Event Listeners

function listenForRegistrationButtonClick() {
  $('.js-container-3').on('click', '.js-register-button', event => {
    event.preventDefault();
    renderRegistrationPage();		
  });
}

function renderRegistrationPage() {
  $('.js-container-1').html(`<p class="js-registration-intro">Welcome to new user registration, to get started please fill out the form below</p>`);
  $('.js-container-2').html(`
		<form class="js-new-user-registration-form">
			<label for="new-username-input">Username</label>
			<input id="new-username-input" type="text" name="new-username-input">
			<label for="new-password-input">Password</label>
			<input id="new-password-input" type="password" name="new-password-input">
			<label for="new-self-description-input">Self Description</label>
			<input id="new-self-description-input" type="text" name="new-self-description">
			<input type="submit" name="js-registration-submit" class="js-registration-submit">
		</form>
			`);
  $('.js-container-3').html(`
		<button class="js-login-button">Login</button>
		<button class="js-register-button">New User? Register Here!</button>
		<button class="js-dashboard-button">My Dashboard</button>
		<button class="js-all-entries-button">View All Entries</button>
		<button class="js-home-page-button">Home Page</button>
		`);
}



function listenForRegistrationSubmit() {
  $('.js-container-2').on('submit', '.js-new-user-registration-form', event => {
    event.preventDefault();
    console.log('registration submit button clicked!');
    submitRegistration();
  });
}


// Login Event Listeners

function listenForLoginButtonClick() {
  $('.js-container-3').on('click', '.js-login-button',event => {
    event.preventDefault();
    console.log('login button clicked');
    renderLoginPage();
  });
}

function renderLoginPage() {
  $('.js-container-1').html(`<p class="js-login-intro">Welcome to the login page, please login below to begin</p>`);
  $('.js-container-2').html(`
		<form class="js-login">
			<label for="username-input">Username</label>
			<input id="username-input" type="text" name="username-input">
			<label for="password-input">Password</label>
			<input id="password-input" type="password" name="password-input">
			<input type="submit" name="js-login-submit" class="js-login-submit">
		</form>
		`);
  $('.js-container-3').html(`
		<button class="js-login-button">Login</button>
		<button class="js-register-button">New User? Register Here!</button>
		<button class="js-dashboard-button">My Dashboard</button>
		<button class="js-all-entries-button">View All Entries</button>
		<button class="js-home-page-button">Home Page</button>
		`);
}

function listenForLoginSubmit() {
  $('.js-container-2').on('submit', '.js-login', event => {
    event.preventDefault();
    console.log('login button clicked');
    submitLogin();
  });
}

// Dashboard Event Listeners

function listenForDashboardButtonClick() {
  $('.js-dashboard-button').on('click', event => {
    event.preventDefault();
    console.log('dashboard button clicked');
    renderDashboard();
  });
}

function renderDashboard() {
  $('.js-container-1').html(`<p class="js-dashboard-intro">Welcome to your dashboard!</p>`);
  $('.js-container-2').html();
}

function listenForSearch() {
  $('.js-container-2').on('click', '.js-entry-search-submit', event => {
    event.preventDefault();
    getUserEntries();
  })
}

function getUserEntries() {
  const searchTerm = $('#js-entry-search-input').val();
  console.log(searchTerm);
  const settings = {
    url: '/api/entries',
    type: 'GET',
    dataType: 'json',
    data: JSON.stringify({searchTerm}),
    contentType: 'application/json',
    success: function(data) {
      console.log(data);
      displayEntries(data);
      // Insert function that takes data as an argument and creates an html element to be injected
    },
    error: function() {
      alert('Sorry, we were not able to retrieve user entries');
      console.error('User entries request failed');
    }			
  };
  $.ajax(settings);
}


let dummyData = [ {
  'location': {
    'streetNumber': '449',
    'streetName': 'Grand Street',
    'city': 'Brooklyn',
    'stateOrRegion': 'New York',
    'country': 'United States of America',
    'zipcode': '11211'
  },
	
  'author': 'user2',
  'landlord': 'John Smith',
  'postDate': 'February 15, 2018',
  'reasonable': true,
  'responsive': false,
  'renew': true,
  'comments': 'He was an okay landlord, no huge complaints, just not that responsive'
},
{
  'location': {
    'streetNumber': '250',
    'streetName': 'Grand Ave',
    'city': 'Queens',
    'stateOrRegion': 'New York',
    'country': 'United States of America',
    'zipcode': '11111'
  },
	
  'author': 'user3',
  'landlord': 'John Jimboe',
  'postDate': 'February 15, 2018',
  'reasonable': true,
  'responsive': false,
  'renew': true,
  'comments': 'He was an okay landlord, no huge complaints, just not that responsive'
},
{
  'location': {
    'streetNumber': '867',
    'streetName': 'Juniper Street',
    'city': 'Chicago',
    'stateOrRegion': 'Illinois',
    'country': 'United States of America',
    'zipcode': '56894'
  },
	
  'author': 'user4',
  'landlord': 'Bob Smith',
  'postDate': 'February 15, 2018',
  'reasonable': true,
  'responsive': false,
  'renew': true,
  'comments': 'He was an okay landlord, no huge complaints, just not that responsive'
}


];


//function to take JSON entry data
// create an html element
// inject this element into the DOM
// entries will be an array of JSON objects
function displayEntries(entries) {
  console.log("displayEntries function is firing");
  let entriesArray = [];
  //console.log(entriesArray[0]);
  for (let i = 0; i < entries.length; i++) {
    generateEntryHtml(entries[i]);
    //console.log(entriesArray);
    //console.log(generateEntryHtml(entries[i]));
    //$('.js-container-1').append(generateEntryHtml(entries[i]));
  }
}

function generateEntryHtml(entry) {
  console.log("generateEntryHtml function is firing");
  const {reasonable, responsive, renew} = entry;
  let bools = [reasonable, responsive, renew];

  for (let i = 0; i < bools.length; i++) {
    if (bools[i]) {
      bools[i] = 'Yes';
    } else {
      bools[i] = 'No';
    }
  }

  console.log(bools);

  return `
		<div class="js-entry">
			<h3 class="js-address">${entry.location.streetNumber} ${entry.location.streetName}</h3>
			<h2 class="js-landlord-name">${entry.landlord}</h2>
			<p class="js-reasonable">Was ${entry.landlord} reasonable? ${bools[0]}</p>
			<p class="js-responsive">Was ${entry.landlord} responsive? ${bools[1]}</p>
			<p class="js-renew">Would you renew your lease? ${bools[2]}</p>
			<p class="js-comments">Additional Comments: \n${entry.comments}</p>
		</div>
		 `;
}

// If username matches the "entry.author" display these additional elements:
// edit, delete
/*
function generateEditEntryHtml {

}
*/

//displayEntries(dummyData);


listenForRegistrationButtonClick();
listenForRegistrationSubmit();

listenForLoginButtonClick();
listenForLoginSubmit();

listenForDashboardButtonClick();

listenForHomePageButtonClick();

listenForSearch();


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