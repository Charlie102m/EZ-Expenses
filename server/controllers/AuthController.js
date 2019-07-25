const express = require('express'),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    connection = require('../config/config.js').connection

const controller = {
    register: (req, res) => {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            let credentials = {
                email: req.body.email,
                password: hash
            }
                connection.query('INSERT INTO users SET ?', credentials, (error, results, fields) => {
                    if (error) res.status(403).send(error)
                    res.send(results)
                })
        })
    },
    login: (req, res) => {
        let query = `SELECT * FROM users WHERE email = '${req.body.email}' LIMIT 1`
        connection.query(query, (error, results) => {
            if (results.length == 0) return res.status(400).send('incorrect email')
            if (error) return res.status(400).send(error)
            bcrypt.compare(req.body.password, results[0].password, function(err, result) {
                if (err) return res.status(403).send(err)
                if (result === false) return res.status(403).send('access denied')
                return res.status(200).send(result)
            })
        })
    }
}

module.exports = controller