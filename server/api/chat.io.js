/*var io = require('socket.io')(80);
var chat = io
    .of('/chat')
    .on('connection', function (socket) {
        socket.emit('a message', {
            that: 'only'
            , '/chat': 'will get'
        });
        chat.emit('a message', {
            everyone: 'in'
            , '/chat': 'will get'
        });
    });

var news = io
    .of('/news')
    .on('connection', function (socket) {
        socket.emit('item', { news: 'item' });
    });

 */

// const express = require('express')
// const router = express.Router()
// module.exports = router


module.exports = {
    initialize: app => {
        const server = require('http').Server(app)
        const io = require('socket.io')(server)



    }
}
