/**
 * @fileOverview this file contains the request to create a new booking as well as the request to delete a booking
 */

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
/**add a booking*/
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
/**delete a booking*/
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