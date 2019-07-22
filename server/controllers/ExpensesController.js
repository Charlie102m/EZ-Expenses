const express = require('express'),
    connection = require('../config/config.js').connection
    

const controller =  {
    addExpense: (req, res) => {
        // let expense = {
        //     expenseDate: Date,
        //     expenseType: 'Travel, Accomodation, Sustinence, Other',
        //     status: 'unclaimed',
        //     net: 10.00,
        //     vat: 2.00,
        //     total: 12.00,
        //     createdBy: 5
        // }
        connection.query(`INSERT INTO expenses SET ?`, req.body, (error, results) => {
            if (error) throw error
            return res.send(results)
        })
    },
    getExpenses: (req, res) => {
        connection.query(`SELECT * FROM expenses`, (error, results) => {
            if (error) throw error
            return res.send(results)
        })
    },
    getExpense: (req, res) => {
        let query = `SELECT * FROM expenses WHERE id = ${req.params.expenseId}`
        connection.query(query, (error, results) => {
            if (error) throw error
            return res.send(results)
        })
    },
    updateExpense: (req, res) => {
        let query = `UPDATE expenses
                        SET ?
                        WHERE id = ?`
        let data = [req.body, req.params.expenseId]
        connection.query(query, data, (error, results) => {
            if (error) throw error
            return res.send(results)
        })
    },
    deleteExpense: (req, res) => {
        connection.query(`DELETE FROM expenses WHERE id = ?`, req.params.expenseId, (error, results) => {
            if (error) throw error
            return res.send(results)
        })
    }
}

module.exports = controller