const express = require('express'),
    mysql = require('mysql'),
    { json2excel } = require('js2excel'),
    connection = require('../config/config.js').connection
    
const controller =  {
    // get all claims
    getClaims: (req, res) => {
        let query = `SELECT id,
                            status,
                            totalValue,
                            createdAt AS timeStamp,
                            DATE_FORMAT(createdAt, '%d/%m/%Y') AS createdAt,
                            CASE
                            WHEN id > 0 THEN 'Milage'
                            END AS type
                            FROM tripClaims
                            WHERE createdBy = ${req.headers.user.id};
                        SELECT id,
                            status,
                            totalValue,
                            createdAt AS timeStamp,
                            DATE_FORMAT(createdAt, '%d/%m/%Y') AS createdAt,
                            CASE
                                WHEN id > 0 THEN 'Expenses'
                            END AS type
                        FROM expenseClaims
                        WHERE createdBy = ${req.headers.user.id};`

        connection.query(query, [1,2], (error, claims) => {
            if (error) return res.status(403).send(error)
            let allClaims = claims[0].concat(claims[1])
            allClaims.sort(function(a,b){return b.timeStamp - a.timeStamp})
            res.send(allClaims)
        })
    },
    // CREATE trip
    addClaim: (req, res) => {
        let claimQuery = ''
        let joinTableQuery = ''
        let updateQuery = ''
        // Check whether claim is for milage or expenses
        if (typeof req.body[0].netValue !== 'undefined') {
            claimQuery = 'INSERT INTO expenseClaims SET ?',
            joinTableQuery = 'INSERT INTO expenseClaimsJoin (expenseId, claimId) VALUES ?',
            updateQuery = "UPDATE expenses SET status = 'claimed' WHERE id = ?; "
        } else {
            claimQuery = 'INSERT INTO tripClaims SET ?'
            joinTableQuery = 'INSERT INTO tripClaimsJoin (tripId, claimId) VALUES ?'
            updateQuery = "UPDATE trips SET status = 'claimed' WHERE id = ?; "
        }
        connection.query(claimQuery, req.body, (error, results, fields) => {
            if (error) return res.status(403).send(error)
            let items = []
            req.body[1].forEach(item => {
                items.push([ item.id, results.insertId ])
            })
            connection.query(joinTableQuery, [items], (error, results) => {
                if (error) return res.status(403).send(error)
                let updates = ''
                req.body[1].forEach(item => {
                    updates += mysql.format(updateQuery, item.id)
                })
                connection.query(updates, (error, results) => {
                    if (error) return res.status(403).send(error)
                    res.status(200).send('Claim successfully added!')
                })
            })
        })
    },
    getClaim: (req, res) => {
        let claimId = req.params.claimId
        let type = ""
        let claimTable = ""
        let joinTable = ""
        let query = ""
        if (req.params.claimType === 'Milage') {
            claimTable = "tripClaims"
            joinTable = "tripClaimsJoin"
            type = "trip"
        } else {
            claimTable = "expenseClaims"
            joinTable = "expenseClaimsJoin"
            type = "expense"
        }
        let baseQuery = `SELECT * FROM ${claimTable} WHERE id = ${claimId};`
        let tripsJoinQuery = `SELECT id,
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
                            FROM ${joinTable} 
                            RIGHT JOIN ${type}s
                                ON ${type}s.id = ${joinTable}.${type}Id 
                                WHERE claimId = ${claimId};`
        let expensesJoinQuery = `SELECT                             
                                    DATE_FORMAT(expenseDate, '%d/%m/%Y') AS expenseDate,
                                    expenseType,
                                    status,
                                    net,
                                    vat,
                                    total,
                                    createdBy,
                                    status,
                                    createdAt,
                                    comment
                                    FROM ${joinTable} 
                                    RIGHT JOIN ${type}s
                                        ON ${type}s.id = ${joinTable}.${type}Id 
                                        WHERE claimId = ${claimId};`
        if (req.params.claimType === 'Milage') {
            query = baseQuery + tripsJoinQuery
        } else {
            query = baseQuery + expensesJoinQuery
        }
        connection.query(query, [1,2], (error, results) => {
            if (error) return res.status(403).send(error)
            if (results[0].length === 0) return res.status(403).send('Claim not found')
            if (results[1].length === 0) return res.status(403).send('Claim found but associated expenses/trips no longer exist')
            res.status(200).send(results)
        })
    }
}

module.exports = controller