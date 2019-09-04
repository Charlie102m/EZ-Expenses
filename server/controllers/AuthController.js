const express = require('express'),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    jwt = require('jsonwebtoken'),
    connection = require('../config/config.js').connection

const controller = {
    register: (req, res) => {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            req.body.password = hash
            connection.query('INSERT INTO users SET ?', req.body, (error, results) => {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') return res.status(400).send('User already exists with that email')
                    if (error.code === 'ER_NO_DEFAULT_FOR_FIELD') return res.status(400).send('You must register with a valid email AND password')
                    if (error.code === 'ER_BAD_NULL_ERROR') return res.status(400).send('You must complete all fields in the form')
                    res.status(400).send(error.sqlMessage)
                }
                res.send(results)
            })
        })
    },
    login: (req, res) => {
        let query = `SELECT * FROM users WHERE email = '${req.body.email}' LIMIT 1`
        connection.query(query, (error, results) => {
            // if form not correctly completed
            if (!req.body.email || !req.body.password) return res.status(400).send('You must complete all fields in the form')
            // if error when finding user
            if (error) return res.status(400).send(error.sqlMessage)
            // if no user matched
            if (results.length == 0) return res.status(401).send('Incorrect email or password used, please try again or reset your password using the link below.')
            // define user object for jwt.sign
            const user = {
                id: results[0].id,
                email: results[0].email
            }
            // verify passwords match
            bcrypt.compare(req.body.password, results[0].password, function(err, result) {
                // if error occurs when matching passwords
                if (err) return res.status(401).send('A hashing error occured during the authentication process, please try again later or contact support')
                // if passwords do not match
                if (result === false) return res.status(401).send('Incorrect email or password used, please try again or reset your password using the link below.')
                // when passwords match, sign token
                jwt.sign({user}, process.env.SECRET_KEY, { expiresIn: '12h' }, (tokenError, token) => {
                    // if error sgning token
                    if (tokenError) return res.status(403).send('An authentication error occured, please try again later or contact support')
                    // set token & user in response headers
                    res.set('authorization', `Bearer ${token}`)
                    res.set('user', JSON.stringify(user))
                    // send response with header, status and body
                    res.status(200).send('login successful')
                })
            })
        })
    }
}

module.exports = controller