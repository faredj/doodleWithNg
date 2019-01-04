var Booking = require('../models/Booking');

exports.findAll = (req, res) => {
    Booking.find({'calendarId': req.params.calendarId})
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
    console.log(req.body);
    let bookingObj = new Booking(req.body);
    bookingObj.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        });
};

exports.findOne = (req, res) => {
    Booking.findOne({'_id': req.params._id})
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
    Booking.find({_id: req.body.bookingId}).remove()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        });
};