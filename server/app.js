const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./routes/routes.js'),
    port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

app.listen(port, () => console.log('SERVER LISTENING ON PORT : ', port))