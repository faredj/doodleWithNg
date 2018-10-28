var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    LastName: String,
    gender: String,
    birthday: { type: Date },
});

module.exports = mongoose.model('User', UserSchema);