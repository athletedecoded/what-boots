let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

// Image Upload Reqs
var multer  = require('multer');
var { v4: uuidv4 } = require('uuid');
var mime = require('mime-types');
var path = require('path');

// Use Mutler and UUID to generate unique file name and append image extension before saving
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'public/uploads'))
    },
    filename: function (req, file, cb) {
      uid = uuidv4();
      cb(null, uid + '.' + mime.extension(file.mimetype))
    }
});
   
var upload = multer({ storage: storage })

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Endpoints
app.post('/upload', upload.single('img'), (req, res) => {
  if(req.file) {
      res.json({
          statusCode: 200,
          filename: req.file.filename,
          message: "Success"
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

app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
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
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
