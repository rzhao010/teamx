## What's in that Picture?

This is a simple web application running on Bluemix that:

- uses a [bootstrap](https://v4-alpha.getbootstrap.com/) front-end (asking for a link to a picture)
- passes that link to a [node.js](https://nodejs.org/en/) back-end application running on the [IBM Bluemix platform](https://www.ibm.com/cloud-computing/bluemix/)
- then uses the Watson [Visual Recognition service](https://www.ibm.com/watson/developercloud/doc/visual-recognition/index.html) API to analyze the pictures content
- passes the result back to front-end
- displays the result in the front-end

I'm using this application to illustrate the mechanics of how front-end, back-end and an API interact, it is **not** meant to be production worthy … use at your own risk.

If you are looking for a detailed "getting started" guide for the Watson Visual Recognition service, head on over [here](https://www.ibm.com/watson/developercloud/doc/visual-recognition/getting-started.html).

Looking for a demo of the service? [Go here](https://visual-recognition-demo.mybluemix.net/).