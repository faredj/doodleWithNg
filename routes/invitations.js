/**
 * @fileOverview this file  contains all the routes of the requests concerning invitations.
 */
var passport = require('passport');

module.exports = function (app) {
    const invitations = require('../controllers/invitationController');

    app.post('/api/invitations/invite', passport.authenticate('jwt', {session: false}), (req, res) => {
        invitations.invite(req, res);
    });

    app.get('/api/invitations/calendars/:userId', passport.authenticate('jwt', {session: false}), (req, res) => {
        invitations.findAllCalendars(req, res);
    });

    app.get('/api/invitations/users/:calendarId', passport.authenticate('jwt', {session: false}), (req, res) => {
        invitations.findAllUsers(req, res);
    });
};