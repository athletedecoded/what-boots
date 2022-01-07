## Welcome to What Boots ##
What Boots predicts the brand and model of your football boots, using a custom image classifier model.

Simply upload your image as .jpg or .png and wait **patiently** for the top 3 results.

What Boots is currently trained on the following models:
* Adidas -- Copa, Predator Mutator-Freak, Predator 19
* Nike -- Mercurial Superfly, Tiempo Legend

The app is built on NodeJS/Express with a Model-View-Controller (MVC) architecture. The custom classifier is pretrained on Keras and and built on TensorflowJS. MongoDB and AmazonS3 (image storage) are used as the database/storage. Multer is used for server-side image processing.

This project was developed for SIT725: Software Engineering at Deakin University. 

Check it out: [What Boots on Heroku](https://what-boots.herokuapp.com/)

---
## What I Learnt ##

* Deploying a classifier model as a NodeJS/Express app
* Server-side image handling and uploading to Amazon S3
* Database management with MongoDB
* MVC architecture principles
* CI/CD deployment in Heroku

**Biggest Challenges**
* Automating image scraping to build a sufficent dataset
* Training a custom image classifier in Keras for TensorflowJS compatability

**Future Improvements**
* Improve model prediction speed -- currenty slow downloading model from cloud
* Retrain classifier on more boot brands and models

---
### Terms of Use ###
By using this app, you agree to your image upload and prediction results being stored in our database (Amazon S3 and MongoDB).

---
## Endpoints ##
* GET /api/boots -- returns all boots in DB
* POST /api/boots -- process boot image (req.file) and return predictions

---
## Dependencies ##
* socket.io for real time comunications
* multer for image processing
* mongodb, mongoose for database
* aws-sdk for S3 image storage
* tfjs, tfjs-node
* chai, mocha for testing frameworks
* nodemon for dev
---
## Run Locally ##
1. Clone repo 
    ```
    https://github.com/athletedecoded/what-boots.git
    ```

2. Open locally and copy .env file to root path

3. Open terminal and install package.json dependencies using
    ```
    npm install
    ```

4. Launch the node server by running
    ```
   npm start
   ```

5. To run the developer server, ensure nodemon is installed
    ```
    npm install -g nodemon
    ```
    Then
    ```
    npm run dev
    ```

6. Successful connection is indicated by the following terminal messages
    ```
    Listening on port  8080
    MongoDB Connected...
    ```
    NB: If you get a port error, update the server.js file to an available port (try 3030,5000,5050) by modifying line 15
    eg. `var port = process.env.PORT || 3030;`

7. Once the server is running, test it by visiting the following URL in your
browser:
    ```
    http://localhost:8080/
    ```

8. With the server running, test cases can be run in a 2nd terminal using
    ```
    npm run test
    ```
---
## Files in this Repository ##

* `server.js` -- application entry point written with node.js
* `/classifier` -- python files used for model development
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
