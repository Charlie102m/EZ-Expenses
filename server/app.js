const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    fetch = require('fetch'),
    port = process.env.PORT || 3000;

app.listen(port, () => console.log('SERVER LISTENING ON PORT : ', port))