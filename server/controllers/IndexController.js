const express = require('express'),
    connection = require('../config/config.js').connection
    

const controller =  {
    loadDashboard: (req, res) => {
        let chartData = {
            labels: [],
            datasets: [{
                label: 'Number of trips per month',
                backgroundColor: '#26A69A',
                data: []
            }]
        }
        let query =     `SELECT COUNT(*) AS totalTrips,
                                SUM(distance) AS totalMiles,
                                SUM(duration) AS totalTime,
                                SUM(value) AS totalValue 
                            FROM trips
                            WHERE createdBy = ${req.headers.user.id};
                        SELECT COUNT(*) AS tripClaims,
                            SUM(totalMiles) AS totalMiles,
                            SUM(countTrips) AS totalTripsClaimed,
                            SUM(totalValue) AS totalValue
                            FROM tripClaims 
                            WHERE createdBy = ${req.headers.user.id};
                        SELECT COUNT(*) AS totalExpenses,
                                SUM(total) AS totalValue 
                            FROM expenses 
                            WHERE createdBy = ${req.headers.user.id};
                        SELECT COUNT(*) AS expenseClaims,
                                SUM(countExpenses) AS totalExpensesClaimed,
                                SUM(netValue) AS totalNetValue,
                                SUM(totalValue) AS totalValue
                            FROM expenseClaims 
                            WHERE createdBy = ${req.headers.user.id};
                        SELECT MONTHNAME(tripDate) AS 'Month', COUNT(*) AS 'Trips' 
                            FROM trips
                            WHERE createdBy = ${req.headers.user.id}
                            GROUP BY Month
                            ORDER BY FIELD(Month, 'January','February','March','April','May','June','July','August','September','October','November','December');
                            `
        connection.query(query, [1,2,3,4,5], (error, results, fields) => {
            if (error) return res.status(403).send(error)
            results[4].forEach(e => {
                chartData.labels.push(e.Month)
                chartData.datasets[0].data.push(e.Trips)
            });
            results[4] = chartData;
            res.send(results)
        })
    }
}

module.exports = controller