const express = require('express'),
    router = express.Router(),
    Controller = require('../controllers/controllers.js'),
    ApiController = require('../controllers/ApiController.js'),
    MapsApiController = require('../controllers/MapsApiController.js'),
    TripsController = require('../controllers/TripsController.js');

// INDEX
router.route('/') 
    .get(Controller.loadDashboard)

// GOOGLE API - get directions between origin & destination utilising google directions api
router.route('/api/directions')
    .post(ApiController.getDirections)

// GOOGLE MAPS API - get directions and render on map
router.route('/api/maps')
    .post(MapsApiController.getDirections)

// TRIPS
router.route('/trips')
    .get(TripsController.getTrips)
    .post(TripsController.addTrip)
    
router.route('/trips/:tripId')
    .get(TripsController.getTrip)
    .put(TripsController.updateTrip)
    .delete(TripsController.deleteTrip)

module.exports = router;