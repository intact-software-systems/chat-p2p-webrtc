require('log-timestamp')

const app = require('./ExpressApp').initialize()
const server = require('./ExpressServer').initializeServer(app)
const io = require('./ExpressSocketIO').initializeSocketIO(server)

app.use((req, res, next) => {
    req.io = io
    next()
})

const port = process.env.PORT || '4000'

app.set('port', port)
server.listen(port)

