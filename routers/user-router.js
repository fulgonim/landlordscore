'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('./../models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.use(jsonParser);

// Post to register a new user

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['username', 'password'];
	const missingField = requiredFields.find(field => !(field in req.body));

	if (missingField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Missing field',
			location: missingField
		});
	}

	//check to make sure the fields that should be strings are strings
	const stringFields = ['username', 'password', 'selfDescription'];
	const nonStringField = stringFields.find(
		field => field in req.body && typeof req.body[field] !== 'string'
	);

	if (nonStringField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Incorrect field type: expected string',
			location: nonStringField
		});
	}

	//Don't allow users to begin or end a username or password with whitespace
	const explicitlyTrimmedFields = ['username', 'password'];
	const nonTrimmedField = explicitlyTrimmedFields.find(
		field => req.body[field].trim() !== req.body[field]
	);

	if (nonTrimmedField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: 'Cannot start or end with a whitespace',
			location: nonTrimmedField
		});
	}

	const sizedFields = {
		username: {
			min: 1
		},
		password: {
			min: 10,
			max: 72
		}
	};

	const tooSmallField = Object.keys(sizedFields).find(
		field =>
			'min' in sizedFields[field] &&
				req.body[field].trim().length < sizedFields[field].min
		);
	const tooLargeField = Object.keys(sizedFields).find(
		field =>
			'max' in sizedFields[field] &&
				req.body[field].trim().length > sizedFields[field].max
	);

	if (tooSmallField || tooLargeField) {
		return res.status(422).json({
			code: 422,
			reason: 'ValidationError',
			message: tooSmallField
				? `Must be at least ${sizedFields[tooSmallField].min} characters long`
				: `Must be at most ${sizedFields[tooLargeField].max} characters long`,
			location: tooSmallField || tooLargeField
		});
	}

	let {username, password, entries, selfDescription} = req.body;

	return User.find({username})
		.count()
		.then(count => {
			if (count > 0) {
				// There's an existing user with this username already
				return Promise.reject({
					code: 422,
					reason: 'ValidationError',
					message: 'Username already taken',
					location: 'username'
				});
			}
			// if no existing user, hash password
			return User.hashPassword(password);
		})
		.then(hash => {
			return User.create({
				username,
				password: hash,
				entries,
				selfDescription
			});
		})
		.then(user => {
			return res.status(201).json(user.serialize());
		})
		.catch(err => {
			if (err.reason === 'ValidationError') {
				return res.status(err.code).json(err);
			}
			res.status(500).json({code: 500, message: 'Internal server error'});
		});
});







/* 
router.post('/', jsonParser, (req, res) => {

})

*/

// get all users DELETE THIS BEFORE FINALIZING

router.get('/all-users', (req, res) => {
	return User.find()
		.then(users => res.json(users.map(user => user.serialize())))
		.catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};