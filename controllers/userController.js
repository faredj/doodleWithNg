var User = require('../models/User');

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
    const user = new User(req.body);
    user.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
        res.status(500).json({
            msg: err.message
        });
    });
};

exports.login = function(req, res){
    res.send(JSON.stringify('login'));
};