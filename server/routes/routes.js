const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/controllers.js');

// dashboard & index routes
router.route('/') 
    .get(controller.loadDashboard)

// get directions
router.route('/api/directions')
    .post(controller.getDirections)

// CRUD operations on an individual trip
router.route('/trips/:trips')
    .get()
    .post()
    .put()
    .delete()

module.exports = router;