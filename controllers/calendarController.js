var Calendar = require('../models/Calendar');

exports.findAll = (req, res) => {
    console.log(req.query.userId);
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

exports.delete = (req, res) => {
    let calendarObj = new Calendar();

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