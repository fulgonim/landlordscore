'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const entrySchema = mongoose.Schema({
	location: [
		{streetNumber: {type: String, required: true}},
		{streetName: {type: String, required: true}},
		{city: {type: String, required: true}},
		{county: {type: String}},
		{stateOrRegion: {type: String, required: true}},
		{country: {type: String, required: true}},
		{zipcode: {type: String, required: true}}
		],
	

	author: {type: String, required: true},
	landlord: {type: String, required: true},
	postDate: {type: Date, required: true},
	reasonable: {type: Boolean, required: true},
	responsive: {type: Boolean, required: true},
	renew: {type: Boolean, required: true},
	comments: {type: String}
	//LOCATION IMAGE? - save image location in the assets folder
	// locationImage: {type: String} - this is a path blah/blahblah/images/123.jpeg
});

entrySchema.virtual('address').get(function() {
	return `${this.location[0]} ${this.location[1]} ${this.location[2]} ${this.location[4]} ${this.location[5]} ${this.location[6]}`.trim();
});

entrySchema.methods.serialize = function() {
	return {
		id: this._id,
		location: this.address,
		author: this.author,
		landlord: this.landlord,
		postDate: this.postDate,
		reasonable: this.reasonable,
		responsive: this.responsive,
		renew: this.renew,
		comments: this.comments || ''
	};
}


const Entry = mongoose.model('Entry', entrySchema);

module.exports = {Entry};


