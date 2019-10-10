const express = require('express'),
    { connection } = require('../config/config.js')

const controller = {
    // get all trips
    getTrips: (req, res) => {
        let query = `SELECT id,
                            DATE_FORMAT(tripDate, '%d/%m/%Y') AS tripDate,
                            originName,
                            originAddress,
                            destinationName,
                            destinationAddress,
                            reason,
                            distance,
                            duration,
                            status,
                            value,
                            createdAt
                        FROM trips
                        WHERE createdBy = ${req.headers.user.id}
                        ORDER BY createdAt DESC`
        connection.query(query, (error, results, fields) => {
            if (error) return res.status(403).send(error)
            res.send(results)
        })
    },
    getTripsByStatus: (req, res) => {
        let status = req.params.status
        let query = `SELECT id,
                            DATE_FORMAT(tripDate, '%d/%m/%Y') AS tripDate,
                            originName,
                            originAddress,
                            destinationName,
                            destinationAddress,
                            reason,
                            distance,
                            duration,
                            status,
                            value
                        FROM trips
                        WHERE status = '${status}' AND createdBy = ${req.headers.user.id}
                        ORDER BY createdAt DESC`
        connection.query(query, (error, results) => {
            if (error) return res.status(403).send(error.sqlMessage)
            res.send(results)
        })
    },
    // CREATE trip
    addTrip: (req, res) => {
        connection.query('INSERT INTO trips SET ?', req.body, (error, results) => {
            if (error) return res.status(403).send(error.sqlMessage)
            res.send(results)
        })
    },
    // READ trip
    getTrip: (req, res) => {
        let query = `SELECT *, DATE_FORMAT(tripDate, '%Y-%m-%d') AS tripDate FROM trips WHERE id = ${req.params.tripId} AND createdBy = ${req.headers.user.id} LIMIT 1`
        connection.query(query, (error, results) => {
            if (error) return res.status(403).send(error.sqlMessage)
            res.send(results[0])
        })
    },
    // UPDATE trip
    updateTrip: (req, res) => {
        let query = `UPDATE trips
                        SET ?
                        WHERE id = ? AND createdBy = ?`
        let data = [req.body, req.params.tripId, req.headers.user.id]
        connection.query(query, data, (error, results) => {
            if (error) return res.status(403).send(error.sqlMessage)
            res.send(results)
        })
    },
    // DELETE trip
    deleteTrip: (req, res) => {
        let data = [req.params.tripId, req.headers.user.id]
        connection.query('DELETE FROM trips WHERE id = ? AND createdBy = ?', data, (error, results) => {
            if (error) return res.status(403).send(error.sqlMessage)
            res.send(results)
        })
    }
}

module.exports = controller