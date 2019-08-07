const   express = require('express'),
        router = express.Router(),
        AuthController = require('../controllers/AuthController.js'),
        IndexController = require('../controllers/IndexController.js'),
        ProfileController = require('../controllers/ProfileController.js'),
        TripsController = require('../controllers/TripsController.js'),
        ApiController = require('../controllers/ApiController.js'),
        ExpensesController = require('../controllers/ExpensesController.js'),
        ClaimsController = require('../controllers/ClaimsController.js'),
        Mid = require('../middleware/auth.js')
    
// AUTH - AuthController
router.route('/api/register')
    .post(AuthController.register)

router.route('/api/login')
    .post(AuthController.login)

// INDEX - IndexController
router.route('/api/') 
    .get(Mid.authenticate, IndexController.loadDashboard)

// PROFILE/SETTINGS - ProfileController
router.route('/api/profile')
    .get(Mid.authenticate, ProfileController.getUserProfile)


// TRIPS - TripsController
router.route('/api/trips')
    .get(Mid.authenticate, TripsController.getTrips)
    .post(Mid.authenticate, TripsController.addTrip)

router.route('/api/trips/status/:status')
    .get(Mid.authenticate, TripsController.getTripsByStatus)
    
router.route('/api/trips/:tripId')
    .get(Mid.authenticate, TripsController.getTrip)
    .put(Mid.authenticate, TripsController.updateTrip)
    .delete(Mid.authenticate, TripsController.deleteTrip)

// GOOGLE DIRECTIONS API - ApiController
router.route('/api/directions')
    .post(Mid.authenticate, ApiController.getDirections)

// EXPENSES - ExpensesController
router.route('/api/expenses')
    .get(Mid.authenticate, ExpensesController.getExpenses)
    .post(Mid.authenticate, ExpensesController.addExpense)

router.route('/api/expenses/status/:status')
    .get(Mid.authenticate, ExpensesController.getExpensesByStatus)

router.route('/api/expenses/:expenseId')
    .get(Mid.authenticate, ExpensesController.getExpense)
    .put(Mid.authenticate, ExpensesController.updateExpense)
    .delete(Mid.authenticate, ExpensesController.deleteExpense)

// CLAIMS - ClaimsController
router.route('/api/claims')
    .get(Mid.authenticate, ClaimsController.getClaims)
    .post(Mid.authenticate, ClaimsController.addClaim)

router.route('/api/claims/:claimType/:claimId')
    .get(Mid.authenticate, ClaimsController.getClaim)

module.exports = router;