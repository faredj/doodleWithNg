/**
 * @fileOverview this file  contains all the routes of the requests concerning calendars
 */
var passport = require('passport');

module.exports = function (app) {
    const calendars = require('../controllers/calendarController');

    app.get('/api/calendars/all/:_id', passport.authenticate('jwt', {session: false}), (req, res) => {
        calendars.findAll(req, res);
    });

    app.get('/api/calendars/:_id', passport.authenticate('jwt', {session: false}), function (req, res) {
        calendars.findOne(req, res);
    });

    app.post('/api/calendars/add', passport.authenticate('jwt', {session: false}), function (req, res) {
        calendars.add(req, res);
    });

    app.post('/api/calendars/delete', passport.authenticate('jwt', {session: false}), function (req, res) {
        calendars.delete(req, res);
    });
};