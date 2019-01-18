// App setup
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const knex = require('../db/knex.js');

// Request logging
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.listen(port, () =>
  console.log(`Express server listening on port ${port}`));


