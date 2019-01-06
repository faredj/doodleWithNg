/**
 * @fileOverview this file  contains all the routes of the requests concerning users.
 * @path {POST} /api/users/register request to create new account
 * @path {POST} /api/users/login   Request user login
 * @path {POST} /api/users/logout   Request user logout
 */

module.exports = (app) => {
	
	const users = require('../controllers/userController');
	
	app.get('/api/users', users.findAll);
	
	app.post('/api/users/register', users.register);

    app.post('/api/users/login', users.login);
};
