var Calendar = require('../models/Calendar');

exports.findAll = (req, res) => {
    Calendar.find({'userId': req.query.userId})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};

exports.add = (req, res) => {
    let calendarObj = new Calendar(req.body);
    calendarObj.save()
        .then(
            data => {
                res.json(data);
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    msg: err.message
                })
            }
        );
};

exports.findOne = (req, res) => {
    Calendar.findOne({'_id': req.params._id})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};

exports.delete = (req, res) => {
    Calendar.find({_id: req.body.calendarId}).remove()
        .then(
            data => {
                res.json(data);
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    msg: err.message
                })
            }
        )
};