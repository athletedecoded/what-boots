// // SEED DB
// var allBoots = [
// 	{
// 		model: "Adidas Predator Freak",
// 		img_url: "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/d892ec3ae43941a0ada1ad4a00dc8e32_9366/predator-freak.3-soft-ground-boots.jpg"
// 	},
// 	{
// 		model: "Nike Tiempo",
// 		img_url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/156ac02d-2dbc-4b56-94e3-1c79dbb65f0b/tiempo-legend-9-elite-fg-football-boot-td9BLW.png"
// 	},
// 	{
// 		model: "Adidas Copa",
// 		img_url: "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/81a7eb6e52dd4c428617ad60011d1d43_9366/copa-sense.3-firm-ground-boots.jpg"
// 	},
// 	{
// 		model: "Nike Superfly",
// 		img_url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2e9a7ab2-5813-4131-9cef-4347fbcba860/mercurial-superfly-8-pro-fg-football-boot-hLHMhc.png"
// 	}
// ]


// allBoots.forEach(boot => {
// 	// console.log(boot)
// 	$.post('/api/seed', boot);
// });
// console.log("Seeded DB")

// const getTop3 = () => {
// 	$.get('/api/boots',(res) => {
// 		if (res.statusCode == 200){
// 			console.log(res);
// 			listBoots(response.data);
// 		}
// 		else {
// 			console.log(res)
// 		}
// 	});
// };

// connect to the socket

// let socket = io();


// socket.on('number', (msg) => {
//     console.log('Random number: ' + msg);
// })

$(document).ready(function(){
  console.log('Ready');

  $('.modal').modal();

//   seedDB(allBoots);
});