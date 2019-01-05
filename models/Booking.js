/**
 * The data-layer for a Booking
 * @module models
 */

var mongoose = require('mongoose');
/**
 * @constructor Booking
 */

var BookingSchema = new mongoose.Schema({
    id: String,
    calendarId: String,
    userId: String,
    reservedDate: Date,
    creationDate: Date
});

module.exports = mongoose.model('Booking', BookingSchema);