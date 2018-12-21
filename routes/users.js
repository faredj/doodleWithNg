var passport = require('passport');
module.exports = function(app) {

    const users = require('../controllers/userController');

    app.get('/api/users', isAuthenticated, function(req, res, next) {
        console.log(req.isAuthenticated());
        users.findAll(req, res);
    });

    app.post('/api/users/register', function(req, res, next) {
        users.register(req, res);
    });

    app.post('/api/users/login', passport.authenticate('local'), function(req, res, next) {
        users.login(req, res);
    });


    /*app.get('/api/users/:userId', users.findOne);

    app.put('/api/users', users.update);

    app.delete('/api/users/:userId', users.delete);*/
};

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}