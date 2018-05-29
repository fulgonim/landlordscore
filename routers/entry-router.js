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


router.get('/', (req, res) => {
	const {searchTerm} = req.query;

	let filter = {};
	let projection = {};
	let sort = 'created';

  // if there is a search term when making the request, add to filter
	if (searchTerm) {
		filter.$text = { $search: searchTerm};
		projection.score = {$meta: 'textScore'};
		sort = projection;
	}



  Entry
    .find(filter, projection)
    .sort(sort)
    .then(entries => {
      res.json({
        entries: entries.map(
          (entry) => entry)
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

// GET request for entry by id

router.get('/:id', (req, res) => {
	
  console.log(req.params.id);

  Entry 
    .findById(req.params.id)
    .then(entry => {
      res.json({
        entry: entry
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal Server Error'});
    });
});

// GET Endpoint
// Request entries by address

/* location: {
		streetNumber: {type: String, required: true},
		streetName: {type: String, required: true},
		city: {type: String, required: true},
		stateOrRegion: {type: String, required: true},
		country: {type: String, required: true},
		zipcode: {type: String, required: true}
		},

*/

/*
router.get('/', (req, res) => {

	res.json(req.query);

	const queryFields = ['streetName', 'city']

	// if req.params.address in 
	// Entry.find(req.params.address)



	Entry 
		.find(req.params.address)
		.then(entries => {
			res.json({
				entries: entries.map(
					(entry) => entry)
			});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal Server Error'});
		});
		
});

*/


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


// Create new landlord/address entry
// PROTECTED ROUTE

router.post('/', /*jwtAuth, */(req, res) => {
  // required fields
  console.log(req.user);
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
      'author': /*req.user.username || */req.body.author,
      'landlord': req.body.landlord,
      'postDate': Date(),
      'reasonable': req.body.reasonable,
      'responsive': req.body.responsive,
      'renew': req.body.renew,
      'comments': req.body.comments || ''
    })
    .then(entry => res.status(201).json(entry))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});



// PUT endpoint to edit existing entries
// requires a GET request

router.put('/:id', jwtAuth, (req, res) => {
  if (!(req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`
    );
    console.error(message);
    return res.status(400).json({message: message});
  }

  const toUpdate = {};
  const updateableFields = ['location', 'landlord', 'reasonable', 'responsive', 'renew', 'comments'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Entry
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(entry => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));

});

// DELETE Endpoint

router.delete('/:id', (req, res) => {
  Entry
    .findByIdAndRemove(req.params.id)
    .then(entry => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
})


module.exports = {router};
