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

generateToken = (req, res, next) => {
	req.token = jwt.sign({
		id: req.user.id,
	}, config.privateKey, {
		expiresIn: 120
	});
	next();
};

isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
};