const AppTopics = require('../client-tests/src/library/AppTopics').AppTopics

module.exports = {
    appSocketIO: io => {
        io.on('connection', socket => {
                console.log('user connected ' + socket.id)

                socket.on('disconnected', () => {
                    console.log('user disconnected')
                })

                socket.on(
                    AppTopics.ROOM.name,
                    room => {
                        console.log('Room ' + JSON.stringify(room))
                    }
                )

                socket.on(
                    AppTopics.CHAT_MESSAGE,
                    chat => {
                        console.log('Chat ' + JSON.stringify(chat))
                    }
                )

                // WEB RTC signalling data

                socket.on(
                    'offer',
                    details => {
                        socket.emit('offer', details)
                        console.log('offer: ' + JSON.stringify(details))
                    }
                )

                socket.on(
                    'answer',
                    details => {
                        socket.emit('answer', details)
                        console.log('answer: ' + JSON.stringify(details))
                    }
                )

                socket.on(
                    'candidate',
                    details => {
                        socket.emit('candidate', details)
                        console.log('candidate: ' + JSON.stringify(details))
                    }
                )

                // TODO: What does this mean?
                //socket.emit('createoffer', {})
            }
        )

        return io
    }
}
