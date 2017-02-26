# What's in that Picture?

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

# Instructions for for a 2-Hour Workshop

### Prep Work

1. Sign up for a free IBM Bluemix account here: https://console.ng.bluemix.net/registration
2. Sign up for a free GitHub account here: https://github.com/join
3. Download and install GitHub Desktop (instructions here: https://desktop.github.com)
4. Download and install the Atom editor for free here: https://atom.io
5. Download and install node.js on your laptop: https://nodejs.org/en/download/
6. Verify the node.js installation: `node -v`
7. Update npm to the latest version: `sudo npm install npm@latest -g`

### Learning Path

Below are rudimentary instructions. They are not meant to be detailed enough to be followed without some face-to-face guidance.

#### Deploy a starter app and create a toolchain with a CI/CD pipeline

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

#### Make a code change and deploy the changes by using the toolchain

1. Open `index.html` and change the welcome message

2. Reload web app locally and check if the change worked

3. Commit change in GitHub Desktop

4. Watch it trigger the toolchain and deploy the change to Bluemix

   ==> We've shown that we can propagate code changes to deployment

#### Copy & paste front-end

We will not be spending much time and effort on coding or understanding the details of the front-end. It's built on the bootstrap framework and does little more than prompt for a link, which it passes (via the javascript contained in `/public/src/client-js.js` ) to the back-end node.js application.

1. Copy all files from the `/public ` directory of this repo into your `/public` directory
2. Re-start your node.js application locally and check to see if the new front-end is being served locally at at http://localhost:6015 
3. Commit the changes and deploy the app to Bluemix via the toolchain

​	==> We now have a functioning front-end for our application

#### Add a route to the back-end, ready to accept the link from the front-end

Next, we are going to "build up" the back-end application. We'll start with the simple node.js server that we already have, and add a route (API) to it that will accept the link (to the picture being analyzed) from the front-end.

1. Replace your current `app.js` with `app-with-route.js` (still using the name `app.js`)

2. Go through the `app.js ` source code to understand how the URL is being received by the back-end

3. Install all required npm modules with `npm -install —save` 

4. Re-start your node.js application locally and check to see if the new front-end is still being served locally at http://localhost:6015

5. Commit the changes and deploy the app to Bluemix via the toolchain

   ==> We now have a back-end that receives the link from the front-end

#### Instantiate the Watson service and get it's API key

Next, we need to instantiate an instance of the Watson Visual Recognition service that we will be calling to analzye the picture for us.

1. In the Bluemix dashboard, navigate to the app and (in the "connections" tab) add the Watson service to it.

2. Copy the `vcap.json` file to your directory and add the Watson API credentials to it (so that we have them accessible when running the app locally)

3. Add the Watson service to the `manifest.yml` file

   ==> We now have the Watson Visual Recognition service connected to our back-end application

#### Call the Watson service from the back-end, then pass the analysis result to the front-end

Next, we need to add code to pass our URL to the Watson service via its REST API. 

1. Replace your current `app.js` with the `app.js` from this repo

2. Go through the `app.js ` source code to understand how the Watson service is being called and the results are then passed to the front-end

3. Re-start your node.js application locally, you should now have a fully functional visual recognition app running at http://localhost:6015

4. Commit the changes and deploy the app to Bluemix via the toolchain

   ==> We're done and have a running Watson-based application on Bluemix



