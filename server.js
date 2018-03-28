'use strict';

const express = require('express');
const app = express();

app.use(express.static('views'));

app.listen(process.env.PORT || 8080);

