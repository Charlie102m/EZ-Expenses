const mysql = require('mysql')

module.exports = {
    connection: mysql.createConnection({
        host: 'localhost',
        user: 'nodeuser',
        password: 'nodeuser',
        database: 'the_expenses_app',
        multipleStatements: true
    })
}