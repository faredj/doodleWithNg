/**
 * @fileOverview this file  contains all the routes of the requests concerning booking.
 */
var passport = require('passport');
module.exports = function (app) {
    const bookings = require('../controllers/bookingController');

    app.get('/api/bookings/:calendarId', (req, res) => {
        bookings.findAll(req, res);
    });

    app.get('/api/bookings/:_id', function (req, res) {
        bookings.findOne(req, res);
    });

    app.post('/api/bookings/add', function (req, res) {
        bookings.add(req, res);
    });

    app.post('/api/bookings/delete', function (req, res) {
        bookings.delete(req, res);
    });
};