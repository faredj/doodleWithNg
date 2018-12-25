const mongoose = require('mongoose');
const passport = require('passport');
let bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const User = mongoose.model('User');

module.exports = (passport) => {
	
	passport.serializeUser((user, done) => {
		done(null, user);
	});
	
	passport.deserializeUser((id, done) => {
		User.findOne({_id: id}, (err, user) => {
			done(err, user);
		});
	});
	
	passport.use(new LocalStrategy(
		{usernameField: 'email'},
		(email, password, done) => {
			User.findOne({email: email}, (err, user) => {
				if (err)
					return done(err);
				if (!user)
					return done(null, false, {message: 'Incorrect username.'});
				bcrypt.compare(password, user.password, (err, res) => {
					if (res) {
						return done(null, user);
					}
					else
						return done(null, false, {message: 'Incorrect password.'});
				});
			});
		}
	));
};

validatePassword = (password, passwordHash) => {
	bcrypt.compare(password, passwordHash, (err, res) => {
		return !!res;
	});
	
};