require('dotenv').config();

let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
let projectCollection;

// MongoDB Config
const uri = process.env.MONGO_URI;
const client = new mongoClient(uri,{ useNewUrlParser : true });

const createCollection = (collectionName) => {
  client.connect((err,db) => {
    projectCollection = client.db().collection(collectionName);
    if (!err) {
      console.log("MongoDB Connected...");
    }
    else {
      console.log("DB error", err);
      process.exit(1);
    }
  })
}

const insertBoot = (boot, callback) => {
  	projectCollection.insert(boot, callback);
}

const getBoots = (callback) => {
  	projectCollection.find({}).toArray(callback);
}

// Image Processing
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });


var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Endpoints
app.post('/api/boots', upload.single('boot-img'), (req, res) => {
  	if(req.file) {
		console.log(req.file)    
	}
	else {
		res.json({
			statusCode: 400,
			data: req.file,
			message: "Failed to upload"
		})
	};
});

app.get("/api/boots", function (req, res) {
	getBoots((err,result) => {
		if (err) {
			res.json({
				statusCode: 400,
				message: err
			})
		}
		else {
			res.json({
				statusCode: 200,
				message: "Success: objects retrieved",
				data: result
				
			})
		}
	});
});

app.post('/api/seed', (req,res) => {
	var newBoot = req.body;
	insertBoot(newBoot,(err,result) => {
		if (err) {
			res.json({
				statusCode: 400,
				message: err
			})
		}
		else {				
			res.json({
				statusCode: 200,
				message: "Success: object added"
			});
		}
	}); 
})


//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});


http.listen(port,()=>{
  console.log("Listening on port ", port);
  createCollection('allBoots');
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
