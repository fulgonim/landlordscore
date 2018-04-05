'use strict';

const {router: userRouter} = require('./user-router');
const {router: entryRouter} = require('./entry-router');

module.exports = {userRouter, entryRouter};