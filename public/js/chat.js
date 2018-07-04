var socket=io();
socket.on('connect',()=>{
	console.log("Connected to server");
  var params= $.deparam(window.location.search);

  socket.emit('join',params,(err)=>{
    if(err) {
      alert(err);
      window.location.href='/';
    } else{
      console.log('No error');
    }
  });
});
socket.on('disconnect',()=>{
	console.log("Disconnected to server");
});

socket.on('updateUserList', function (users) {
  var ol = $('<ol></ol>');

  users.forEach(function (user) {
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
});


socket.on('newMessage',(message)=>{
 var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
   var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url:message.url,
    createdAt: formattedTime
  });
    $('#messages').append(html);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {
     messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
  	locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
  	locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});