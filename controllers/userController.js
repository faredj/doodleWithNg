/**
 * @fileOverview this file contains the request to create a new user, to sign up as well as the request to login and logout
 */


var User = require('../models/User');
var passport = require('passport');
require('../config/passport')(passport);
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.findAll = (req, res) => {
	User.find()
	.then(users => {
		res.json(users);
	}).catch(err => {
		res.status(500).send({
			msg: err.message
		});
	});
};
/**
 * Register
 *
 * @name Registration
 * @body {String} password to secure the account
 * @response {Object} user the informations of the user
 * @code {500} if  it's a bad request
 */

exports.register = (req, res) => {
	//TODO : implementer les test back sur les champs avant save
	var user = req.body;
	bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
		user['password'] = hash;
		var userObj = new User(user);
		userObj.save()
		.then(data => {
			res.json(data);
		}).catch(err => {
			res.status(500).json({
				msg: err.message
			});
		});
	});
};

/**
 * Login
 *
 * @name Authentification
 * @response {Object} user the informations of the user
 * @response {String} token the token of the session
 */


exports.login = (req, res) => {
	res.json({
		user: req.user,
		token: req.token
	});
};

/**
 * Logout
 *
 * @name Logout
 */

exports.logout = (req, res) => {
	req.session.destroy((err) => {
		res.json({'msg': 'disconnected'});
	});
};