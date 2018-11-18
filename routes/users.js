module.exports = function(app) {

    const users = require('../controllers/userController');

    app.get('/api/users', function(req, res, next) {
        users.findAll(req, res);
    });

    app.post('/api/users/register', function(req, res, next) {
        users.register(req, res);
    });

    app.post('/api/users/login', function(req, res, next) {
        users.login(req, res);
    });


    /*app.get('/api/users/:userId', users.findOne);

    app.put('/api/users', users.update);

    app.delete('/api/users/:userId', users.delete);*/
};