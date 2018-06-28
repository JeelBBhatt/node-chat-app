var socket=io();
socket.on('connect',()=>{
	console.log("Connected to server");

	// socket.emit('createEmail',{
	// 	to: "jeelk1232gmail.com",
	// 	text: "Hello , How r u??",
	// 	createdAt: 135
	// });

	socket.emit('createMessage',{
		to: "Jeel",
		text: "Hello , How r u??",
		createdAt: 135
	});
});
socket.on('disconnect',()=>{
	console.log("Disconnected to server");
});
// socket.on('newEmail',(email)=>{
// 	console.log("New Email",email);
// });
socket.on('newMessage',(message)=>{
	console.log("New message",message);
});