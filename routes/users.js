var passport = require('passport');
var User = require('../models/User');
const jwt = require('jsonwebtoken');
require('../config/passport')(passport);
module.exports = (app) => {
	
	const users = require('../controllers/userController');
	
	app.get('/api/users', isAuthenticated, (req, res, next) => {
		console.log(req.isAuthenticated());
		users.findAll(req, res);
	});
	
	app.post('/api/users/register', (req, res) => {
		users.register(req, res);
	});
	
	app.post('/api/users/login', passport.authenticate('local', {failureRedirect: '/'}),
		generateToken, (req, res) => {
			res.json({
				user: req.user,
				token: req.token
			});
		});
	
	app.get('/api/users/logout', (req, res) => {
		req.session.destroy(function (err) {
			console.log('session destroyed');
			res.json({'msg': 'desconnected'});
		});
	});
	
	app.get('/profile', isAuthenticated, (req, res) => {
		console.log('profile');
	});
	
	/*app.get('/api/users/:userId', users.findOne);

	app.put('/api/users', users.update);

	app.delete('/api/users/:userId', users.delete);*/
};

generateToken = (req, res, next) => {
	req.token = jwt.sign({
		id: req.user.id,
	}, 'server secret', {
		expiresIn: 120
	});
	next();
};

isAuthenticated = (req, res, next) => {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
};