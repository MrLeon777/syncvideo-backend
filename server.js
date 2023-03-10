var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const port = process.env.PORT || 9999;

// Отслеживание url адреса и отображение нужной HTML страницы
// app.get('/', function (request, respons) {
//   respons.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
  console.log('Успешное соединение', socket.id);
  socket.on('disconnect', () => {
    console.log('Отключился', socket.id);
  });
  socket.on('sendTime', (currentTime) => {
    socket.broadcast.emit('sync', currentTime);
  });
  socket.on('playVideo', () => {
    socket.broadcast.emit('syncPlay');
  });
  socket.on('pauseVideo', () => {
    socket.broadcast.emit('syncPause');
  });
  socket.on('requestVideo', (src) => {
    io.sockets.emit('syncRequestVideo', src);
  });
});


server.listen(port, () => {
  console.log(`connect to ${port} port`);
});
