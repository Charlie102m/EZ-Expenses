const express = require('express'),
    connection = require('../config/config.js').connection
    

const controller =  {
    getUserProfile: (req, res) => {
        let query = `SELECT firstName,
                        lastName,
                        email,
                        homeAddressId,
                        workAddressId,
                        DATE_FORMAT(createdAt, '%d/%m/%Y') AS createdAt
                        FROM users
                        WHERE id = ?`
        connection.query(query, req.headers.user.id, (error, results) => {
            if (error) res.status(403).send(error)
            res.status(200).send(results)
        })
    }
}

module.exports = controller