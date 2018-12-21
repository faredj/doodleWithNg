var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthday: { type: Date },
});

module.exports = mongoose.model('User', UserSchema)