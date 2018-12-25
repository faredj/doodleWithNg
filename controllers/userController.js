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

exports.login = (req, res) => {
	res.json({
		user: req.user,
		token: req.token
	});
};

exports.logout = (req, res) => {
	req.session.destroy((err) => {
		res.json({'msg': 'disconnected'});
	});
};