## What's in that Picture?

This is a simple web application running on Bluemix that:

- uses a [bootstrap](https://v4-alpha.getbootstrap.com/) front-end (asking for a link to a picture)
- passes that link to a [node.js](https://nodejs.org/en/) back-end application running on the [IBM Bluemix platform](https://www.ibm.com/cloud-computing/bluemix/)
- then uses the Watson [Visual Recognition service](https://www.ibm.com/watson/developercloud/doc/visual-recognition/index.html) API to analyze the pictures content
- passes the result back to front-end
- displays the result in the front-end

I'm using this application during workshops to quickly illustrate:

- code hosting on GitHub
- the IBM Open Toolchain for CI/CD
- deployment of a node.js back-end on IBM Bluemix
- the mechanics of how front-end, back-end and an API interact

This code is **not** meant to be production worthy, so don't use any of it for real-life applications.

If you are looking for a detailed "getting started" guide for the Watson Visual Recognition service, head on over [here](https://www.ibm.com/watson/developercloud/doc/visual-recognition/getting-started.html). Looking for a demo of the service? [Go here](https://visual-recognition-demo.mybluemix.net/).

------

### Instructions for for a 2-Hour Workshop

#### Prep Work

1. Sign up for a free IBM Bluemix account here: https://console.ng.bluemix.net/registration
2. Sign up for a free GitHub account here: https://github.com/join
3. Download and install GitHub Desktop (instructions here: https://desktop.github.com )
4. Download and install the Atom editor for free here: https://atom.io
5. Download and install node.js on your laptop: https://nodejs.org/en/download/
6. Verify node.js installation: `node -v`
7. Update npm to the latest version: `sudo npm install npm@latest -g`

#### Learning Path

##### Deploy a starter app and create a toolchain with a CI/CD pipeline

1. Log into Bluemix

2. Create and deploy a node.js starter app at https://console.ng.bluemix.net/catalog/starters/sdk-for-nodejs

3. Add a toolchain to it (from the app overview page) and configure it

4. Check that a repo has been created at https://github.com

5. Download the source code to the GitHub desktop tool

6. Run `npm install --save` to have npm modules installed locally

7. Copy and paste the provided `.gitignore` , `.cfignore` and `.eslintrc` files

8. Start the node.js back-end locally: `node app.js`

9. Check if the web app is served locally at http://localhost:6015

   ==> We now have a functional development environment set up

##### Make a code change and deploy the changes by using the toolchain

1. Open `index.html` and change the welcome message

2. Reload web app locally and check if the change worked

3. Commit change in GitHub Desktop

4. Watch it trigger the toolchain and deploy the change to Bluemix

   ==> We've shown that we can propagate code changes to deployment

##### Copy & paste html and CSS code to have a static front-end

1. ...

##### Copy & paste node.js code to serve the front-end

##### Add javascript to the front-end, passing the link to the back-end

##### Add a route to the back-end, ready to accept the link from the front-end

##### Instantiate the Watson service and get it's API key

1. Add it to manifest.yml

##### Call the Watson service from the back-end, passing the link

##### Receive analysis data from the Watson service

##### Pass analysis data to the front end and display it





