'use strict';

const mongoose = require('mongoose');

const bycrypt = require('bcryptjs');

//make mongoose promises ES6 promises
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	entries: [{type: Object}],
	selfDescription: {type: String}
});

UserSchema.methods.serialize = function() {
	return {
		id: this._id,
		username: this.username,
		entries: this.entries,
		selfDescription: this.selfDescription || ''
	};
}

UserSchema.methods.validatePassword = function(password) {
	return bycrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
	return bycrypt.hash(password, 8);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};