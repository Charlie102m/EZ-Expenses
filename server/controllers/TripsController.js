const express = require('express'),
    connection = require('../config/config.js').connection;

const controller = {
    // get all trips
    getTrips: (req, res) => {
        let query =     `SELECT id,
                            DATE_FORMAT(tripDate, '%d/%m/%Y') AS tripDate,
                            originName,
                            originAddress,
                            destinationName,
                            destinationAddress,
                            distance,
                            duration,
                            status,
                            value
                        FROM trips 
                        ORDER BY createdAt DESC`
        connection.query(query, (error, results, fields) => {
            if (error) return res.status(403).send(error)
            res.send(results)
        })
    },
    getTripsByStatus: (req, res) => {
        let status = req.params.status
        let query =     `SELECT id,
                            DATE_FORMAT(tripDate, '%d/%m/%Y') AS tripDate,
                            originName,
                            originAddress,
                            destinationName,
                            destinationAddress,
                            distance,
                            duration,
                            status,
                            value
                        FROM trips
                        WHERE status = '${status}'
                        ORDER BY createdAt DESC`
        connection.query(query, (error, results, fields) => {
            if (error) return res.status(403).send(error)
            res.send(results)
        })
    },
    // CREATE trip
    addTrip: (req, res) => {
        connection.query('INSERT INTO trips SET ?', req.body, (error, results, fields) => {
            if (error) return res.status(403).send(error)
            res.send(results)
        })
    },
    // READ trip
    getTrip: (req, res) => {
        let query = `SELECT *, DATE_FORMAT(tripDate, '%Y-%m-%d') AS tripDate FROM trips WHERE id = ${req.params.tripId} LIMIT 1`
        connection.query(query, (error, results, fields) => {
            if (error) return res.status(403).send(error)
            res.send(results[0])
        })
    },
    // UPDATE trip
    updateTrip: (req, res) => {
        let query = `UPDATE trips
                        SET ?
                        WHERE id = ?`
        let data = [req.body, req.params.tripId]
        connection.query(query, data, (error, results, fields) => {
            if (error) return res.status(403).send(error)
            res.send(results)
        })
    },
    // DELETE trip
    deleteTrip: (req, res) => {
        connection.query('DELETE FROM trips WHERE id = ?', req.params.tripId, (error, results, fields) => {
            if (error) return res.status(403).send(error)
            res.send(results)
        })
    }
}

module.exports = controller