// use strict mode
'use strict';

// ----------------------------------------------------------------------------
// Setup all the required node modules we'll need
// ----------------------------------------------------------------------------


// This application uses express as its web server
const express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
const cfenv = require('cfenv');

// create body parser
const bodyParser = require('body-parser');

// path module allows safe path operations (using it for joining)
const path = require('path');


// ----------------------------------------------------------------------------
// Initialize variables
// ----------------------------------------------------------------------------

// Check to see if we are running locally

var appEnv = cfenv.getAppEnv();

// If we are running locally, we need to get the service creds
// from the local config file
console.log('appEnv.isLocal: ' + appEnv.isLocal);

if (appEnv.isLocal === true) {
  console.log('We are running locally');
  try {
    var localVCAP = require('./vcap.json');
  } catch (err) {
    localVCAP = {};
  }
} else {
  localVCAP = {};
  console.log('We are running on Cloud Foundry');
}

appEnv = cfenv.getAppEnv({
  vcap: localVCAP
});
console.log('appEnv:');
console.log(appEnv);

// ----------------------------------------------------------------------------
// Set up express
// ----------------------------------------------------------------------------

// create a new express server
const app = express();

// serve the files out of ./public as our main files
app.use(express.static(path.join(__dirname, 'public')));

// use the bodyParser for all routes
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handle post request

app.post('/data', function(req, res) {

  if (!req.body) {
    console.log('Server did not receive data');
    console.log('req: ' + req);
    return res.sendStatus(400);

  } else {
    console.log('I will be analyzing:');
    console.log(req.body.link);

    // This is where we will add code to analyze the picture

    return res.sendStatus(200);

  }
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log('Server starting on ' + appEnv.url);
});
