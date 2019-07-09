const express = require('express'),
    connection = require('../config/config.js').connection;

const controller = {
    getTrips: (req, res) => {
        let query =     `SELECT id,
                            DATE_FORMAT(tripDate, '%D, %M, %Y') AS tripDate,
                            originName,
                            destinationName,
                            distance,
                            duration
                        FROM trips`
        connection.query(query, (error, results, fields) => {
            if (error) console.log(error)
            console.log('results: ', results);
            res.send(results)
        })
    },
    addTrip: (req, res) => {
        console.log(req.body);
        connection.query('INSERT INTO trips SET ?', req.body, (error, results, fields) => {
            if (error) throw error
            res.send('success')
        })
    }
}

module.exports = controller