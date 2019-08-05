const   express = require('express'),
        app = express(),
        cors = require('cors'),
        routes = require('./routes/routes.js'),
        bodyParser = require('body-parser'),
        APP_SECRET = require('./config/credentials.js').APP_SECRET()
        port = process.env.PORT || 3000

app.use(cors({exposedHeaders: 'authorization,user'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

app.listen(port, () => console.log('SERVER LISTENING ON PORT : ', port))