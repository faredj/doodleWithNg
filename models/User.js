/**
 * @fileOverview data model for User
 */
var mongoose = require('mongoose');

/**
 * @constructor User
 */
var UserSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthday: { type: Date },
});

module.exports = mongoose.model('User', UserSchema);