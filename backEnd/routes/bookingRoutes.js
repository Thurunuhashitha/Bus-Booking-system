const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');

// Route for confirming a booking
router.post('/confirm', bookingController.confirmBooking);

// Route for getting dashboard data
router.get('/dashboard', bookingController.getDashboardData);

module.exports = router;
