var passport = require('passport');
module.exports = function(app) {
    const calendars = require('../controllers/calendarController');

    app.get('/api/calendars', (req, res) => {
        calendars.findAll(req, res);
    });

    app.post('/api/calendars/add', function(req, res, next) {
        calendars.add(req, res);
    });

    app.post('/api/calendars/delete', function(req, res, next) {
        calendars.delete(req, res);
    });
};