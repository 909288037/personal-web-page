/*
封装socket.io,为了获取server以便监听.
 */
var socketio = {};
var socket_io = require('socket.io');

//获取io
socketio.getSocketio = function(server){

  var io = socket_io.listen(server);
// socket
  io.on('connection', (socket) => {
    socket.on('sendMessage', (data) => {
      console.log(data);
      io.emit('receiveMessage', data);
    })
  });
};

module.exports = socketio;
