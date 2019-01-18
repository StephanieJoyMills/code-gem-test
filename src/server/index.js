// App setup
require('dotenv').config();
const express = require('express');
const app = express();

require('./routes/index.js')(app);
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// Request logging
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.listen(port, () => {
  console.log({ port }, 'Server starting...');
});
  
module.exports = app;