var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  var x = 1;
  setInterval(function () {
    console.log('Send shit:', ++x);
    socket.emit('message', x);
  }, 1000);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});