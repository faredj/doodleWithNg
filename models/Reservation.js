var mongoose= require('mongoose');

var ReservationSchema = new mongoose.Schema({
    id: String,
    title: String,
    calendarId: String,
    userId: String,
    creationDate: Date,
    startDate: Date,
    endDate: Date,
    address: String
});

module.exports =mongoose.model('Reservation', ReservationSchema);