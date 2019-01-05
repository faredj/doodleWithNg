/**
 * @fileOverview this file  contains all the routes of the requests concerning users.
 * @path {POST} /api/users/register request to create new account
 * @path {POST} /api/users/login   Request user login
 * @path {POST} /api/users/logout   Request user logout
 */

var passport = require('passport');
var User = require('../models/User');
var config = require('../config/config');
const jwt = require('jsonwebtoken');
require('../config/passport')(passport);
module.exports = (app) => {
	
	const users = require('../controllers/userController');
	
	app.get('/api/users', isAuthenticated, users.findAll);

	app.post('/api/users/register', users.register);
	
	app.post('/api/users/login', passport.authenticate('local', {failureRedirect: '/'}), generateToken, users.login);
	
	app.get('/api/users/logout', users.logout);
	
	/*app.get('/api/users/:userId', users.findOne);

	app.put('/api/users', users.update);

	app.delete('/api/users/:userId', users.delete);*/
	
};
/**Generating the token*/
generateToken = (req, res, next) => {
	req.token = jwt.sign({
		id: req.user.id,
	}, config.privateKey, {
		expiresIn: 120			 /**Token validtity in seconds */
	});
	next();
};
/**User is Valid*/
isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
};