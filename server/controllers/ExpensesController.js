const express = require('express'),
    connection = require('../config/config.js').connection
    

const controller =  {
    addExpense: (req, res) => {
        connection.query(`INSERT INTO expenses SET ?`, req.body, (error, results) => {
            if (error) return res.status(403).send(error)
            return res.send(results)
        })
    },
    getExpenses: (req, res) => {
        let query =     `SELECT id,
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
                        FROM expenses 
                        ORDER BY createdAt DESC`
        connection.query(query, (error, results) => {
            if (error) return res.status(403).send(error)
            return res.send(results)
        })
    },
    getExpensesByStatus: (req, res) => {
        let query =     `SELECT id,
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
                        FROM expenses
                        WHERE status = '${req.params.status}'
                        ORDER BY createdAt DESC`
        connection.query(query, (error, results) => {
            if (error) return res.status(403).send(error)
            return res.send(results)
        })
    },
    getExpense: (req, res) => {
        let query = `SELECT * FROM expenses WHERE id = ${req.params.expenseId}`
        connection.query(query, (error, results) => {
            if (error) return res.status(403).send(error)
            return res.send(results)
        })
    },
    updateExpense: (req, res) => {
        let query = `UPDATE expenses
                        SET ?
                        WHERE id = ?`
        let data = [req.body, req.params.expenseId]
        connection.query(query, data, (error, results) => {
            if (error) return res.status(403).send(error)
            return res.send(results)
        })
    },
    deleteExpense: (req, res) => {
        connection.query(`DELETE FROM expenses WHERE id = ?`, req.params.expenseId, (error, results) => {
            if (error) return res.status(403).send(error)
            return res.send(results)
        })
    }
}

module.exports = controller