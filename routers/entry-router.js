'use strict';

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');


const config = require('./../config');
const router = express.Router();

const {Entry} = require('./../models');

router.use(jsonParser);

const {localStrategy, jwtStrategy} = require('../auth');


const jwtAuth = passport.authenticate('jwt', {session: false});

// GET endpoint 
// Request all entries in the database
// UNPROTECTED
router.get('/all-entries', (req, res) => {
	Entry
		.find()
		.then(entries => {
			res.json({
				entries: entries.map(
					(entry) => entry.serialize())
			});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});



//Dashboard endpoint
// Get endpoint
// Request entries by username
// NEED TO DOUBLE CHECK THIS ROUTE, ESP. THE REQ.USER PART
router.get('/dashboard', (req, res) => {
	console.log(__dirname);
	res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});


router.get('/entry-by-username', (req, res) => {
	
	console.log(req.user.id);

	Entry 
		.find(req.user)
		.then(entries => {
			res.json({
				entries: entries.map(
					(entry) => entry.serialize())
			});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal Server Error'});
		});
});

// GET Endpoint
// Request entries by address

router.get('/entry-by-address/:address', (req, res) => {
	Entry 
		.find(req.params.address)
		.then()
})



// GET Endpoint 
// Request entries by ID


// POST Endpoint
// Create a new entry - GET current user from DB and insert it into the entry object
// require: 
/*	
	location: {
		streetNumber: {type: String, required: true},
		streetName: {type: String, required: true},
		city: {type: String, required: true},

		stateOrRegion: {type: String, required: true},
		country: {type: String, required: true},
		zipcode: {type: String, required: true}
		},
	
	author: {type: Object, required: true},

	landlord: {type: String, required: true},
	postDate: {type: Date, required: true},
	reasonable: {type: Boolean, required: true},
	responsive: {type: Boolean, required: true},
	renew: {type: Boolean, required: true},
	comments: {type: String}
*/

router.post('/new-entry', (req, res) => {
	// required fields
	console.log(req.body);
	const requiredFields = ['location', 'landlord', 'reasonable', 'responsive', 'renew'];
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	Entry
		.create({
			'location': {
				'streetNumber': req.body.location.streetNumber,
				'streetName': req.body.location.streetName,
				'city': req.body.location.city,
				'stateOrRegion': req.body.location.stateOrRegion,
				'country': req.body.location.country,
				'zipcode': req.body.location.zipcode,
			},
			//
			//
			//
			// Make sure to change this to req.user.username once jwt is integrated
			//
			//
			//
			//'author': req.user.username,
			'landlord': req.body.landlord,
			'postDate': Date(),
			'reasonable': req.body.reasonable,
			'responsive': req.body.responsive,
			'renew': req.body.renew,
			'comments': req.body.comments || ""
		})
		.then(entry => res.status(201).json(entry.serialize()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});



// PUT endpoint to edit existing entries
// requires a GET request



// DELETE Endpoint



module.exports = {router};
