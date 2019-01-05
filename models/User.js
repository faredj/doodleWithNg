/**
 * The data-layer for a User
 * @module models
 */
    //Require the dev-dependencies
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

//Exports the UserSchema for use elsewhere.

module.exports = mongoose.model('User', UserSchema);