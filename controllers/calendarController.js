var Calendar = require('../models/Calendar');

exports.findAll = (req, res) => {
    Calendar.find()
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
    var calendarObj = new Calendar(req.body);

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

exports.delete = (req, res) => {
    var calendarObj = new Calendar();

    calendarObj.findByIdAndRemove(req.param.calendatId)
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