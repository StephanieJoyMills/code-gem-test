// App setup
require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routes/index.js")(app);

// Request logging
const morgan = require("morgan");
app.use(morgan("dev"));

app.listen(port, () => {
  console.log({ port }, "Server starting...");
});

module.exports = app;
