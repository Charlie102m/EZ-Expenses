const express = require('express'),
    jwt = require('jsonwebtoken')

module.exports = {
    authenticate: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).send('Invalid token, access denied - please login again')
        }
        const token = req.headers.authorization.replace('Bearer ', '')
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) return res.status(401).send('invalid token, access denied - please login again')
            req.headers.user = decoded.user
            next()
        })
    }
}