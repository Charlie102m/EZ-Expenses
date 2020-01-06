const express = require('express'),
    app = express(),
    cors = require('cors'),
    routes = require('./routes/routes.js'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    helmet = require('helmet'),
    xss = require('xss-clean'),
    hpp = require('hpp')

// production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'))
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

// config
app.use(bodyParser.json())

// security
app.use(helmet())
app.use(hpp())
app.use(xss())
app.use(cors({ exposedHeaders: 'authorization,user' }))

// routers
app.use(routes)

// server
app.listen(port, () => console.log('SERVER LISTENING ON PORT : ', port))

// failsafe
process.on('unhandledRejection', (error, promise) => {
    console.log(`Error: ${error.message}`.red);
    server.close(() => process.exit(1))
})