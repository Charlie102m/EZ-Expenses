const express = require('express'),
    connection = require('../config/config.js').connection
    

const controller =  {
    getUserProfile: (req, res) => {
        let query = `SELECT firstName,
                        lastName,
                        email,
                        milageValueDefualt,
                        homeAddressId,
                        workAddressId,
                        DATE_FORMAT(createdAt, '%d/%m/%Y') AS createdAt
                        FROM users
                        WHERE id = ?`
        connection.query(query, req.headers.user.id, (error, results) => {
            if (error) res.status(403).send(error)
            res.status(200).send(results)
        })
    },
    getDefualtMilageRate: (req, res) => {
        connection.query(`SELECT milageValueDefualt FROM users WHERE id = ?`, req.headers.user.id, (error, results) => {
            if (error) res.status(403).send(error)
            res.status(200).send(results)
        })
    },
    updateProfile: (req, res) => {
        let updateProperty = {};
        updateProperty[req.params.prop] = req.body[req.params.prop];
        connection.query(`UPDATE users SET ? WHERE id = ?`, [updateProperty, req.headers.user.id], (error, results) => {
            if (error) res.status(403).send(error)
            res.status(200).send(results)
        })
    }
}

module.exports = controller