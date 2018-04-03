'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/landlordscore';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb:localhost/landlordscore/test'

exports.PORT = process.env.PORT || 8080;



