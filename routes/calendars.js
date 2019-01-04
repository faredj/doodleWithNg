var passport = require('passport');
module.exports = function (app) {
    const calendars = require('../controllers/calendarController');

    app.get('/api/calendars', (req, res) => {
        calendars.findAll(req, res);
    });

    app.get('/api/calendars/:_id', function (req, res) {
        calendars.findOne(req, res);
    });

    app.post('/api/calendars/add', function (req, res) {
        calendars.add(req, res);
    });

    app.post('/api/calendars/delete', function (req, res) {
        calendars.delete(req, res);
    });
};