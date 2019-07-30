const   express = require('express'),
        app = express(),
        cors = require('cors'),
        bodyParser = require('body-parser'),
        routes = require('./routes/routes.js'),
        corsOptions = {
            origin: 'http://localhost:8080',
            credentials: true,
            allowedHeaders: 'Authorization, Common'
        },
        port = process.env.PORT || 3000;

// CONFIG
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Common");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    req.header('Access-Control-Allow-Credentials', true);
    next();
});
// app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

// SERVER
app.listen(port, () => console.log('SERVER LISTENING ON PORT : ', port))