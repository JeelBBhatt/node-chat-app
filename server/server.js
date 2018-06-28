const path =require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

const publicpath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;

var app=express();
var server=http.createServer(app);
var io=socketIO(server);

io.on('connection',(socket)=>{
	console.log("New User connected");

	// socket.emit('newEmail',{
	// 	from: "jeel1232gmail.com",
	// 	text: "Hello , How r u??",
	// 	createdAt: 145
	// });
	// socket.on('createEmail',(newEmail)=>{
	// 	console.log("Created Email",newEmail);		
	// });
	socket.emit('newMessage',{
		from: "rina",
		text: "Hello , How r u??",
		createdAt: 145
	});

	socket.on('createMessage',(messsage)=>{
	console.log("Created Mesage",messsage);		
	});
	socket.on('disconnect',()=>{
	console.log("User was disconnected");		
	});
});

app.use(express.static(publicpath));
server.listen(port,()=>{
	console.log(`server strated on ${port}`);
});