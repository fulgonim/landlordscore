'use strict';

const express = require('express');
const app = express();

app.use(express.static('views'));


const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
	console.info(`Server is listening on port ${PORT}`);
});

module.exports = {app};

