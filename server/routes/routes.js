const   express = require('express'),
        router = express.Router(),
        AuthController = require('../controllers/AuthController.js'),
        IndexController = require('../controllers/IndexController.js'),
        ProfileController = require('../controllers/ProfileController.js'),
        TripsController = require('../controllers/TripsController.js'),
        ApiController = require('../controllers/ApiController.js'),
        ExpensesController = require('../controllers/ExpensesController.js'),
        ClaimsController = require('../controllers/ClaimsController.js')
    
// AUTH - AuthController
// Implement me for register, de-register, login & logout
router.route('/register')
    .post(AuthController.register)

router.route('/login')
    .post(AuthController.login)
// INDEX - IndexController
// Implement index API for dashboard data
router.route('/') 
    .get(IndexController.loadDashboard)


// PROFILE/SETTINGS - ProfileController
// Implement Profile & Settings


// TRIPS - TripsController
router.route('/trips')
    .get(TripsController.getTrips)
    .post(TripsController.addTrip)
    
router.route('/trips/:tripId')
    .get(TripsController.getTrip)
    .put(TripsController.updateTrip)
    .delete(TripsController.deleteTrip)

// GOOGLE DIRECTIONS API - ApiController
router.route('/api/directions')
    .post(ApiController.getDirections)

// EXPENSES - ExpensesController
// Implement full CRUD for Expenses


// CLAIMS - ClaimsController
// Implement full CRUD for Claims


module.exports = router;