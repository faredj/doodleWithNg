var mongoose = require('mongoose');

var CalendarSchema = new mongoose.Schema({
    id: String,
    userId: String,
    title: String,
    dateCreation: Date,
    adress: String
});

module.exports = mongoose.model('Calendar', CalendarSchema);