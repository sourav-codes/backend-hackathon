const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require("mongodb");

var app = express();

app.use(cors({
  origin: '*'
}));

app.get("/", function (request, response) {
  response.send("Team crazy coopers");
});
app.listen(1000, function () {
  console.log("Started application on port %d", 1000);
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const uri =
  "mongodb+srv://hackathon:hB3ScjSnlPq06hSi@cluster0.3zzvg80.mongodb.net/?retryWrites=true&w=majority";

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});



// Require tag routes
require('./app/routes/tags.routes')(app);
require('./app/routes/emails-track.routes')(app);


