const express = require('express'),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    jwt = require('jsonwebtoken'),
    secretKey = 'I_Love_My_Son'
    connection = require('../config/config.js').connection

const controller = {
    register: (req, res) => {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            let credentials = {
                email: req.body.email,
                password: hash
            }
            connection.query('INSERT INTO users SET ?', credentials, (error, results) => {
                if (error) return res.status(403).send(error)
                connection.query('SELECT * FROM users WHERE id = ?', results.insertId, (err, results) => {
                    if (err) return res.status(403).send(err)
                    const token = jwt.sign({credentials}, secretKey)
                    return res.status(200).json({token, results})
                })
            })
        })
    },
    login: (req, res) => {
        let query = `SELECT * FROM users WHERE email = '${req.body.email}' LIMIT 1`
        connection.query(query, (error, results) => {
            if (error) return res.status(401).send(error)
            if (results.length == 0) return res.status(401).send('incorrect email')
            bcrypt.compare(req.body.password, results[0].password, function(err, result) {
                if (err) return res.status(401).send(err)
                if (result === false) return res.status(401).send('access denied')
                let credentials = {
                    email: results[0].email,
                    password: results[0].password
                }
                const token = jwt.sign({credentials}, secretKey)
                return res.status(200).json({token, results})
            })
        })
    }
}

module.exports = controller