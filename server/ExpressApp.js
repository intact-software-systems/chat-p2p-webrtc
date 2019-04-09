const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const hbs = require('hbs')

module.exports = {
    initialize: () => {
        const app = express()

        app.set('views', path.join(__dirname, 'views'))
        app.set('view engine', 'hbs')

        hbs.registerHelper('json', function (value) {
            return '<pre style="text-align: left">' + JSON.stringify(value, null, 2) + '</pre>'
        })

        hbs.registerHelper('console', function (value) {
            return console.log(value)
        })

        app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(cookieParser())
        app.use(express.static(path.join(__dirname, '../public')))
        app.use(helmet())

        return app
    }
}
