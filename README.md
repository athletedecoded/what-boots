## Welcome to What Boots ##
What Boots is a nodeJS application which can predict the brand and model of your football boots, using a custom built image classifier (Tensorflow JS).

Simply upload your image as .jpg or .png and wait **patiently** for the top 3 results.

What Boots is currently trained on Adidas and Nike models.

---
## Terms of Use ##
By using this app, you agree to your image upload and results being stored in our database (Amazon S3 and MongoDB).

---
## Run ##
1. Clone repo 
    
    https://github.com/athletedecoded/what-boots.git

2. Open locally and copy .env file to root path

3. Open terminal and install package.json dependencies using

    `npm install`

4. Launch the node server by running

   ` npm start`

    or 

    `npm run dev` (to launch with nodemon in development)

NB: If instead, you get something like the following, the default port is already in use:

    Server running at http://127.0.0.1:8080/

    events.js:72
        throw er; // Unhandled 'error' event
                ^
    Error: listen EADDRINUSE
        at errnoException (net.js:901:11)
        at Server._listen2 (net.js:1039:14)
        at listen (net.js:1061:10)
        at Server.listen (net.js:1127:5)
        ...

In this case, update the server.js file to an available port (try 3030,5000,5050) by modifying line 15

    eg. var port = process.env.PORT || 3030;

5. Successful connection is indicated by the following terminal messages

    Listening on port  8080
    
    MongoDB Connected...

6. Once the server is running, test it by visiting the following URL in your
browser:

    http://localhost:8080/

7. With the server running, test cases can be run in a 2nd terminal using

    `npm run test`
---
## Endpoints ##
* GET /api/boots -- returns all boots in DB
* POST /api/boots -- process boot image (req.file) and return predictions

## Cloud Function ##
* GET https://cb2fc2b4.au-syd.apigw.appdomain.cloud/api/v1/url?label= -- takes a label query parameter and returns webshop URL

## Dependencies ##
* socket.io for real time comunications
* multer for image processing
* mongodb, mongoose for database
* aws-sdk for S3 image storage
* tfjs, tfjs-node
* chai, mocha for testing frameworks

---
## Files in this Repository ##

* `server.js` -- application entry point written with node.js
* `/preprocessing` -- python files used for model development (for information purposes) 
* `/tfjs` -- tensorflowJS model files
* `model.js` -- configuration and functions for image classification using the tensorflow model
* `mongoConnect.js` -- configuration file to connect to MongoDB
* `s3Connect.js` -- configuration file to connect to Amazon S3 Bucket Storage

* `package.json` -- node package dependencies, installed with `npm install`
* `.gitignore`
* `LICENSE` -- this application is accessible under the [MIT License](./LICENSE)
* `manifest.yml`
* `Procfile` -- specifies the command `node server` should be run when the app is started.
* `README.md` -- this file!

* `docker-compose.yml` -- compose configurations for docker application
* `Dockerfile` -- Docker image build configurations
* `.dockerignore` 
