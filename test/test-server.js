'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Index HTML Page', function() {
	it('should exist', function() {
		return chai.request(app)
			.get('/')
			.then(function(res) {
				expect(res).to.have.status(200);
			});
	});
});
