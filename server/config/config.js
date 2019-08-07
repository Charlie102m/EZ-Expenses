const mysql = require('mysql')

if (process.env.NODE_ENV === 'production') {
    
} else { 
    module.exports ={
        connection: mysql.createConnection({
            host: 'localhost',
            user: 'nodeuser',
            password: 'nodeuser',
            database: 'the_expenses_app',
            multipleStatements: true
        })
    }
}

