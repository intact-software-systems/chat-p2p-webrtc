require('log-timestamp')

const AppType = require('../client/src/library/AppType').AppType
const port = process.env.PORT || '4000'

const app = require('./express/ExpressApp').initialize()
app.set('port', port)

const server = require('./express/ExpressServer').initializeServer(app, port)
const io = require('socket.io')(server)

app.use((req, res, next) => {
    req.io = io
    next()
})

initApp(process.env.appType || AppType.SOCKETIO)

function initApp(appType) {
    console.log("Starting as " + appType)

    switch (appType) {
        case AppType.GRAPHQL:
            console.log(AppType.GRAPHQL + ' not supported. Defaulting to ' + AppType.SOCKETIO)
        case AppType.SOCKETIO:
        default:
            return require('./AppSocketIO').appSocketIO(io)
    }
}

server.listen(port)

