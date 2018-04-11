// 封装socket
var socketio = {};
var socket_io = require('socket.io');
socketio.getSocket = function (server) {
    var io = socket_io.listen(server)
    io.sockets.on('connection', function (socket) {
        console.log('连接成功')
        socket.on('commitFun', function (info) {
            console.log(msg)
            socket.broadcast.emit('emitFun', { data: info })
        })
    })
}
module.exports = socketio;