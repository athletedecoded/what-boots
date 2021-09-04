require('dotenv').config();

let express = require("express");
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let mongoConnect = require("./mongoConnect.js")
// let tfModel = require("./model.js")
// const { uploadFile, getFileStream } = require('./s3Connect.js')


const bodyParser = require('body-parser');

let bootsRoute = require('./routes/boots');
app.use('/api/boots', bootsRoute)

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());


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
});


http.listen(port,()=>{
  console.log("Listening on port ", port);
//   createCollection('allBoots');
});

