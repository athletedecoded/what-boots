let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

// DB Config
const uri ="mongodb+srv://sit725-2021:pw725@sit725.0imd3.mongodb.net/sit725?retryWrites=true&w=majority"
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

const insertBoots = (boot, callback) => {
  projectCollection.insert(boot, callback);
}

const getBoots = (callback) => {
  projectCollection.find({}).toArray(callback);
}

// Image Processing
// const multer = require('multer');
// const upload = multer({ dest: 'public/uploads/' });

// MEMORY STORAGE TEST
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

var { v4: uuidv4 } = require('uuid');
var mime = require('mime-types');
var path = require('path');
var fs = require('fs');

// Use Mutler and UUID to generate unique file name and append image extension before saving
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, 'public/uploads'))
//     },
//     filename: function (req, file, cb) {
//       uid = uuidv4();
//       cb(null, uid + '.' + mime.extension(file.mimetype))
//     }
// });
// var upload = multer({ storage: storage })

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Endpoints
app.post('/api/boots', upload.single('boot-img'), (req, res) => {
  	if(req.file) {
		console.log(req.file)

		
		// Generate unique file id (inc. file extension)
		var uid = uuidv4();
		var id = uid + '.' + mime.extension(req.file.mimetype)
		var content = req.file.buffer

		var obj = {
			id: id,
			type: mime.extension(req.file.mimetype),
			content: content
		}

	    insertBoots(obj,(err,result) => {
			if (err) {
				res.json({
					statusCode: 400,
					message: err
				})
			}
			else {				
				res.redirect('/what-boots.html');
				// res.json({
				// 	statusCode: 200,
				// 	message: "Success: object added",
				// 	data: result
				// });
			}
		});
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
  createCollection('boots');
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();