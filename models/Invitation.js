/**
 * @fileOverview data model for Invitation
 */
var mongoose = require('mongoose');

/**
 * @constructor Invitation
 */
var InvitationSchema = new mongoose.Schema({
    id: String,
    invitedId: String,
    invitedTo: String
});

module.exports = mongoose.model('Invitation', InvitationSchema);