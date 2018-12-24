var User = require('../models/User');
var passport = require('passport');
require('../config/passport')(passport);
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.findAll = function (req, res) {
	User.find()
	.then(users => {
		res.json(users);
	}).catch(err => {
		res.status(500).send({
			msg: err.message
		});
	});
};

exports.register = function (req, res) {
	//TODO : implementer les test back sur les champs
	var user = req.body;
	bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
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

exports.login = function (req, res, next) {
	console.log('login process ...');
	passport.authenticate('local', {
		successRedirect: '/profile',
		failureRedirect: '/',
	});
	/*
	passport.authenticate('local', (err, user, info) => {
		if (info)
			return res.json(info.message);
		if (err)
			return err;
		if (!user)
			return res.send(JSON.stringify('login KO'));
		req.login(user, (err) => {
			if (err)
				return err;
			console.log(user);
			return res.send(JSON.stringify('login OK'));
		})
	});*/
};