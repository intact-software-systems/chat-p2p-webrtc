require('log-timestamp')

const ExpressApp = require("./ExpressApp")
const app = ExpressApp.initialize()
module.exports = app

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

app.use('/api', )
