'use strict';

const {router: userRouter} = require('./user-router');
const {router: entryRouter} = require('./entry-router');
const {router: authRouter} = require('./auth-router');

module.exports = {userRouter, entryRouter, authRouter};