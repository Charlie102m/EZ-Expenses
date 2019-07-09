const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/controllers.js'),
    ApiController = require('../controllers/ApiController.js'),
    TripsController = require('../controllers/TripsController.js');

// dashboard & index routes
router.route('/') 
    .get(controller.loadDashboard)

// get directions between origin & destination utilising google directions api
router.route('/api/directions')
    .post(ApiController.getDirections)

// 
router.route('/trips')
    .get(TripsController.getTrips)
    .post(TripsController.addTrip)

module.exports = router;