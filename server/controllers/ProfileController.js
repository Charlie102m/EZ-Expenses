const express = require('express'),
    connection = require('../config/config.js').connection,
    aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3')

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'eu-west-2'
});

const s3 = new aws.S3(),
    upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: 'ez-expenses',
            acl: 'public-read',
            key: (req, file, cb) => {
                cb(null, req.headers.user.id + 'profile');
            }
        })
    }).single('image');
    

const controller =  {
    getUserProfile: (req, res) => {
        let query = `SELECT firstName,
                        lastName,
                        email,
                        milageValueDefualt,
                        profileImageUrl,
                        homeAddressId,
                        H.locationName AS homeName,
                        H.locationAddress AS homeAddress,
                        workAddressId,
                        W.locationName AS workName,
                        W.locationAddress AS workAddress,
                        DATE_FORMAT(users.createdAt, '%d/%m/%Y') AS createdAt
                    FROM users 
                    LEFT JOIN savedLocations H
                    ON users.homeAddressId = H.id
                    LEFT JOIN savedLocations W
                    ON users.workAddressId = W.id
                    WHERE users.id = ?;`
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
        // instead of directly accessing req.body object, below implementation is more flexible as req.body may or may not be a nested object
        let updateProperty = {};
        updateProperty[req.params.prop] = req.body[req.params.prop];

        connection.query(`UPDATE users SET ? WHERE id = ?`, [updateProperty, req.headers.user.id], (error, results) => {
            if (error) res.status(403).send(error)
            res.status(200).send(results)
        })
    },
    async uploadImage (req, res) {
        console.log('route hit');
        upload(req, res, (error) => {
            if (error) res.status(403).send(error)
            console.log('upload done');
            const imageUrl = `https://ez-expenses.s3.eu-west-2.amazonaws.com/${req.headers.user.id}profile`
            const query = 'UPDATE users SET profileImageUrl = ? WHERE id = ?'
            connection.query(query, [imageUrl, req.headers.user.id], (error, results) => {
                if (error) res.status(403).send(error)
                console.log('db update done');
                res.status(200).send('success')
            })
        })
    },
    updateAddress: (req, res) => {
        const address = {
            locationName: req.body.name,
            locationAddress: req.body.address,
            createdBy: req.headers.user.id
        }
        let addressTypeId = 'homeAddressId'
        if (req.body.type === 'work') addressTypeId = 'workAddressId';
        connection.query('INSERT INTO savedLocations SET ?', address, (error, results, fields) => {
            if (error) res.status(403).send(error)
            const joinQuery = `UPDATE users SET ${addressTypeId} = ? WHERE id = ?`
            connection.query(joinQuery, [results.insertId, req.headers.user.id], (error, results) => {
                if (error) res.status(403).send(error)
                res.status(200).send('success')
            })
        })
    }
}

module.exports = controller