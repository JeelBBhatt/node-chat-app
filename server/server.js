const path =require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicpath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;

var app=express();
var server=http.createServer(app);
var io=socketIO(server);

io.on('connection',(socket)=>{
	console.log("New User connected");
	// socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
	// socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('join',(params,callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			callback('Name and Room are required');
		}
		socket.join(params.room);
		socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', 'New user joined'));
		callback();
	});

	socket.on('createMessage',(message,callback)=>{
		console.log("Created Mesage",message);	

	//****send message to all user itself also*******
	io.emit('newMessage', generateMessage(message.from, message.text));
	callback();
});
	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});
	socket.on('disconnect',()=>{
		console.log("User was disconnected");		
	});
});

app.use(express.static(publicpath));
server.listen(port,()=>{
	console.log(`server strated on ${port}`);
});