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

// app.get('/images/:key', (req,res) => {
// 	const key = req.params.key;
// 	const readStream = getFileStream(key)
// 	// readStream.pipe(res);


// 	if (readStream) {
// 		console.log(readStream)
// 		res.json({
// 			statusCode: 200,
// 			data: readStream,
// 			message: "Success: Image retrieved"
// 		})
// 	}
// 	else {
// 		res.json({
// 			statusCode: 400,
// 			message: "Failure: can not retrieve image by key: " + key
// 		})
// 	}
// })

// app.get("/api/boots", function (req, res) {
// 	getBoots((err,result) => {
// 		if (err) {
// 			res.json({
// 				statusCode: 400,
// 				message: err
// 			})
// 		}
// 		else {
// 			res.json({
// 				statusCode: 200,
// 				message: "Success: objects retrieved",
// 				data: result
				
// 			})
// 		}
// 	});
// });

// app.post('/api/seed', (req,res) => {
// 	var newBoot = req.body;
// 	insertBoot(newBoot,(err,result) => {
// 		if (err) {
// 			res.json({
// 				statusCode: 400,
// 				message: err
// 			})
// 		}
// 		else {				
// 			res.json({
// 				statusCode: 200,
// 				message: "Success: object added"
// 			});
// 		}
// 	}); 
// })


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
