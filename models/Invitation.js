var mongoose = require('mongoose');

var InvitationSchema = new mongoose.Schema({
    id: String,
    invitedId: String,
    invitedTo: String
});

module.exports = mongoose.model('Invitation', InvitationSchema);