'use strict';

require('dotenv').config();
const express = require('express');

//jsonParser import to read req/res data - will need to shift to routers eventually
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const morgan = require('morgan');

const {DATABASE_URL, PORT} = require('./config');

const app = express();

//Logs
app.use(morgan('common'));

// router
const {userRouter} = require('./routers');
app.use('/users', userRouter);

// HTML for splash page
//app.use(express.static('views'));


let server;


function runServer(databaseUrl, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}

if (require.main === module) {
	runServer(DATABASE_URL).catch(err => console.error(err));
}


module.exports = {app, runServer, closeServer};





/* OLD SERVER START

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
	console.info(`Server is listening on port ${PORT}`);
});

module.exports = {app};

*/ 