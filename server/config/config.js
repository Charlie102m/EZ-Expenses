const mysql = require('mysql')

if (process.env.NODE_ENV === 'production') {
    module.exports ={
        connection: mysql.createConnection({
            host: 'c584md9egjnm02sk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'ebvwv8qmyj5z29m9',
            password: 'me3qgdpcts4ti79m',
            port: '3306',
            database: 'jxa8oq1hxejjpr7c',
            multipleStatements: true
        })
    }
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

