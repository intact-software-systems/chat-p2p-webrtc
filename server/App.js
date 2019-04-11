require('log-timestamp')
const AppType = require('../library/AppType')

const app = require('./express/ExpressApp').initialize()
const server = require('./express/ExpressServer').initializeServer(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
    req.io = io
    next()
})

initApp(process.env.appType || AppType.SOCKETIO)

function initApp(appType) {
    switch (appType) {
        case AppType.GRAPHQL:
            console.log(AppType.GRAPHQL + ' not supported. Defaulting to ' + AppType.SOCKETIO)
        case AppType.SOCKETIO:
        default:
            return require('./AppSocketIO').appSocketIO(io)
    }
}

const port = process.env.PORT || '4000'

app.set('port', port)
server.listen(port)

