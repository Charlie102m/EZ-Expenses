const express = require('express'),
    request = require('request'),
    api_key = 'AIzaSyDnJgJ47aAzdam5S4F5X6PNhQt_MW5MJvM'
    

const controller = {
    loadDashboard: (req, res) => {
        res.send('index route hit')
    },
    trips: (req, res) => {
        res.send('trips route hit')
    },
    getDirections: (req, res) => {
        let waypoint = {
            origin: req.body.origin,
            destination: req.body.destination
        }
        const options = {
            uri: `https://maps.googleapis.com/maps/api/directions/json?origin=${waypoint.origin}&destination=${waypoint.destination}&units=imperial&key=${api_key}`,
            method: 'GET'
        }
        request(options, (error, response, body) => {
            if (error) res.send(error)
            res.send(body)
        })
    }
}

module.exports = controller