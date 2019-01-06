/**
 * @fileOverview this file  contains all the routes of the requests concerning users.
 */
module.exports = (app) => {
	
	const users = require('../controllers/userController');
	
	app.get('/api/users', users.findAll);
	
	app.post('/api/users/register', users.register);

    app.post('/api/users/login', users.login);
};
