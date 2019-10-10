const express = require('express'),
    { connection } = require('../config/config.js')


const controller = {
    addExpense: (req, res) => {
        connection.query(`INSERT INTO expenses SET ?`, req.body, (error, results) => {
            if (error) return res.status(403).send(error.sqlMessage)
            return res.send(results)
        })
    },
    getExpenses: (req, res) => {
        let query = `SELECT id,
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
                        WHERE createdBy = ${req.headers.user.id} 
                        ORDER BY createdAt DESC`
        connection.query(query, (error, results) => {
            if (error) return res.status(403).send(error.sqlMessage)
            return res.send(results)
        })
    },
    getExpensesByStatus: (req, res) => {
        let query = `SELECT id,
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
                        AND createdBy = ${req.headers.user.id}
                        ORDER BY createdAt DESC`
        connection.query(query, (error, results) => {
            if (error) return res.status(403).send(error.sqlMessage)
            return res.send(results)
        })
    },
    getExpense: (req, res) => {
        let query = `SELECT *, DATE_FORMAT(expenseDate, '%Y-%m-%d') AS expenseDate FROM expenses WHERE id = ${req.params.expenseId} AND createdBy = ${req.headers.user.id}`
        connection.query(query, (error, results) => {
            if (error) return res.status(403).send(error.sqlMessage)
            return res.send(results)
        })
    },
    updateExpense: (req, res) => {
        let query = `UPDATE expenses
                        SET ?
                        WHERE id = ? AND createdBy = ?`
        let data = [req.body, req.body.id, req.headers.user.id]
        connection.query(query, data, (error, results) => {
            if (error) return res.status(403).send(error.sqlMessage)
            return res.send(results)
        })
    },
    deleteExpense: (req, res) => {
        connection.query(`DELETE FROM expenses WHERE id = ? AND createdBy = ${req.headers.user.id}`, req.params.expenseId, (error, results) => {
            if (error) return res.status(403).send(error.sqlMessage)
            return res.send(results)
        })
    }
}

module.exports = controller