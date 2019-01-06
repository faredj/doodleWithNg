/**
 * @fileOverview this file contains the request to create a new user, to sign up as well as the request to login
 */

var User = require('../models/User');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
let config = require('../config/config');

/**
 * findAll users
 *
 * @name findAll
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} find data
 * */
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
 * Register a user
 *
 * @name register
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} added user
 * */
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

/**
 * Login a user
 *
 * @name login
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} logged user with token
 * */
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
                            user: user,
                            success: true
                        });
                    }
                    else {
                        res.sendStatus(401);
                    }
                });
            } else {
                res.json({success: false});
            }
        });
    } else {
        res.sendStatus(401);
    }
};