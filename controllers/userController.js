var User = require('../models/User');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
let config = require('../config/config');
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
    if (req.body.email && req.body.password) {
        let email = req.body.email,
            password = req.body.password;
        User.findOne({email: email}, (err, user) => {
            if (err)
                res.status(500).json({
                    msg: err.message
                });
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        var token = jwt.sign({
                            user
                        }, config.jwtSecret, {
                            expiresIn: '1d'
                        });
                        res.json({
                            token: token,
                            user: user
                        });
                    }
                    else {
                        res.sendStatus(401);
                    }
                });
            }
        });
    } else {
        res.sendStatus(401);
    }
};