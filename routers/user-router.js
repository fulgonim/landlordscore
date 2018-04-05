'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('./../models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.use(jsonParser);

// Post to register a new user

/* 
router.post('/', jsonParser, (req, res) => {

})

*/

// get all users
router.get('/all-users', (req, res) => {
	return User.find()
		.then(users => res.json(users.map(user => user.serialize())))
		.catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};