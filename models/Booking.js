var mongoose = require('mongoose');

var BookingSchema = new mongoose.Schema({
    id: String,
    calendarId: String,
    userId: String,
    reservedDate: Date,
    creationDate: Date
});

module.exports = mongoose.model('Booking', BookingSchema);