const   express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        routes = require('./routes/routes.js'),
        port = process.env.PORT || 3000;

// CONFIG
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

// SERVER
app.listen(port, () => console.log('SERVER LISTENING ON PORT : ', port))