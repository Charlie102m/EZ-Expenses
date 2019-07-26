const express = require('express'),
    connection = require('../config/config.js').connection
    

const controller =  {
    loadDashboard: (req, res) => {
        let query =     `SELECT COUNT(*) AS totalTrips,
                                SUM(distance) AS totalMiles,
                                SUM(duration) AS totalTime
                        FROM trips`
        connection.query(query, (error, results, fields) => {
            if (error) return res.status(403).send(error)
            res.send(results)
        })
    }
}

module.exports = controller