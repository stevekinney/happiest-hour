const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
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