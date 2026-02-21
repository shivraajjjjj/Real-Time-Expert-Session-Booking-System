const bookingRouter = require('express').Router();
const {createBooking,getBookingsByEmail,updateBookingStatus} = require('../controllers/bookingController');
// Create a new booking
bookingRouter.post('/', createBooking);

// Get all bookings for a specific email
bookingRouter.get('/', getBookingsByEmail);

// Update booking status by ID
bookingRouter.patch('/:id/status', updateBookingStatus);

module.exports = bookingRouter;