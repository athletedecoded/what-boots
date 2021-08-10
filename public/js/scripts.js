const getImage = (key) => {
	$.get(`/images/${key}`,(res) => {
		if (res.statusCode == 200){
			console.log(res);
			// listBoots(res.data);
		}
		else {
			console.log(res)
		}
	});
};


// connect to the socket

// let socket = io();


// socket.on('number', (msg) => {
//     console.log('Random number: ' + msg);
// })

$(document).ready(function(){
  console.log('Ready');

  $('.modal').modal();

  getImage("8b65a807a354d2aef7ab96e4193bd6d9")
});