require('dotenv').config();

let express = require("express");
let app = express();
let mongoConnect = require("./mongoConnect.js")
const { uploadFile, getFileStream } = require('./s3Connect')

let http = require('http').createServer(app);
let io = require('socket.io')(http);
const bodyParser = require('body-parser');

let bootsRoute = require('./routes/boots');
app.use('/api/boots', bootsRoute)

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Image Processing
// var { v4: uuidv4 } = require('uuid');
// var mime = require('mime-types');
// var path = require('path');

// const multer = require('multer');

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

// Endpoints
// app.post('/api/boots', upload.single('bootImg'), async (req, res) => {
// 	console.log(req.file)
// 	if(req.file) {
// 		const result = await uploadFile(req.file);
// 		console.log(result);
// 		res.json({
// 			statusCode: 200,
// 			url: result,
// 			message: "Success: Image uploaded to S3"
// 		}) 
// 	}

// 	else {
// 		res.json({
// 			statusCode: 400,
// 			data: req.file,
// 			message: "Failed to upload"
// 		})
// 	};
// });


app.get('/images/:key', (req,res) => {
	const key = req.params.key;
	const readStream = getFileStream(key)
	// readStream.pipe(res);


	if (readStream) {
		console.log(readStream)
		res.json({
			statusCode: 200,
			data: readStream,
			message: "Success: Image retrieved"
		})
	}
	else {
		res.json({
			statusCode: 400,
			message: "Failure: can not retrieve image by key: " + key
		})
	}
})

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
//   createCollection('allBoots');
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
