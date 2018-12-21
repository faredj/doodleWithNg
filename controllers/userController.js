var User = require('../models/User');
var passport = require('passport');
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.findAll = function(req, res) {
    User.find()
        .then(users => {
            res.json(users);
        }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};

exports.register = function(req, res){
    //backend validations
    /*
    const errors = req.validationErrors();
    req.checkBody('firstName', 'Nom peut pas être vide').notEmpty();
    if(errors){
        console.log(`errors : ${JSON.stringify(errors)}`);
    }*/
    var user = req.body;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        user['password'] = hash;
        var userObj = new User(user);
        userObj.save()
            .then(data => {
                //login user /!\
                req.login(data._id, function(err){
                    console.log("login ok");
                    console.log(req.user);
                    console.log(req.isAuthenticated());
                    console.log(req.session)
                });
                res.json(data);
            }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
    });
};

exports.login = function(req, res){
    res.send(JSON.stringify('login'));
};