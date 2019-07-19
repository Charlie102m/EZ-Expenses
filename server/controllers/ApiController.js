const express = require('express'),
    request = require('request'),
    api_key = 'AIzaSyDnJgJ47aAzdam5S4F5X6PNhQt_MW5MJvM'
    
const controller = {
    getDirections: (req, res) => {
        let waypoints = {
            origin: req.body.origin,
            destination: req.body.destination
        }
        const options = {
            uri: `https://maps.googleapis.com/maps/api/directions/json?origin=${waypoints.origin}&destination=${waypoints.destination}&units=imperial&key=${api_key}`,
            method: 'GET'
        }
        request(options, (error, response, body) => {
            if (error) throw error
            res.send(body)
        })
    }
}

module.exports = controller