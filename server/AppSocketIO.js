const AppTopics = require('../library/AppTopics')

module.exports = {
    appSocketIO: io => {
        io.on('connection', socket => {
                console.log('a user connected')

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
            }
        )

        return io
    }
}
