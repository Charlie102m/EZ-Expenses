const express = require('express'),
    request = require('request'),
    api_key = 'AIzaSyDnJgJ47aAzdam5S4F5X6PNhQt_MW5MJvM'
    
const controller = {
    getDirections: (req, res) => {
        // If missing parametes, return error
        if (!req.body.origin || !req.body.destination) return res.status(400).send('You must have a valid origin and destination before a route can be calulated')
        let waypoints = {
            origin: req.body.origin,
            destination: req.body.destination
        }
        const options = {
            uri: `https://maps.googleapis.com/maps/api/directions/json?origin=${waypoints.origin}&destination=${waypoints.destination}&units=imperial&key=${api_key}&alternatives=true`,
            method: 'GET'
        }
        request(options, (error, response, body) => {
            if (error) {
                return res.status(403).send(error)
            }
            let result = JSON.parse(body)
            if (result.status === "ZERO_RESULTS" || result.status === "INVALID_REQUEST") return res.status(400).send('Unable to calulate route, please check your origin and destination before trying again')
            res.status(200).send(body)
        })
    }
}

module.exports = controller