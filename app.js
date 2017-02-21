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


    // -------------------- snip ----------------------------------------------

    // get the API keys for Watson
    var visualRecognitionKey = appEnv.getServiceCreds('uwe-visual-recognition');
    if (!visualRecognitionKey) {
      throw new Error('Could not find a configuration for the recognition service');
    }
    // require the axios library for http REST calls
    const axios = require('axios');

    // set up parameters for the GET request
    var axiosConfig = {
      method: 'get',
      url: 'https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify',
      timeout: 20000,
      withCredentials: true,
      key: visualRecognitionKey,
      params: {
        url: req.body.link,
        version: '2016-05-20'
      }
    };

    // make the GET request
    axios(axiosConfig)
      .then(function(response) {
        console.log('Response status: ' + response.status);
        console.log(JSON.stringify(response.data));

        // check to see if Watson found the image
        if (response.data.images[0].error) {
          console.log('Error from visual recognition service:');
          console.log(response.data.images[0].error.description);
          return res.sendStatus(300);
        }

        return res.send(response.data);

      })
      .catch(function(error) {
        console.log(error);
      });

    // -------------------- snip ----------------------------------------------


    // return res.send(response.data);
  }
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log('Server starting on ' + appEnv.url);
});
