/**
 * @fileOverview data model for Calendar
 */

var mongoose = require('mongoose');

/**
 * @constructor Calendar
 */
var CalendarSchema = new mongoose.Schema({
    id: String,
    userId: String,
    title: String,
    description: String,
    dateCreation: Date,
    startDate: Date,
    endDate: Date,
    address: String
});

module.exports = mongoose.model('Calendar', CalendarSchema);