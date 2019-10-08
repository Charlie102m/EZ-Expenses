const mysql = require('mysql')

module.exports ={
    connection: mysql.createConnection(JSON.parse(process.env.DB_CONNECTION_STRING))
}