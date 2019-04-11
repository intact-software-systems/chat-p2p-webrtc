module.exports = {
    initializeServer: app => {
        const server = require('http').createServer(app)

        server.on('error', error => {
            if (error.syscall !== 'listen') {
                throw error
            }

            var bind = typeof port === 'string'
                ? 'Pipe ' + port
                : 'Port ' + port

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges')
                    process.exit(1)
                    break
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use')
                    process.exit(1)
                    break
                default:
                    throw error
            }
        })

        server.on('listening', () => {
            var env = process.env.NODE_ENV
            console.info(env === undefined ? 'Application started in DEVELOPMENT mode' : 'Application started in ' + env.toUpperCase() + ' mode')
            var addr = server.address()
            var bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port
            console.debug('Listening on ' + bind)
        })

        return server
    }
}
