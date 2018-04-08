'use strict';

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();


// GET endpoint to get all entries in the database
// UNPROTECTED
router.get('/api/entries', (req, res) => {
	
}



module.exports = {router};
