/**
 * @fileOverview this file contains the request to create a new calendar as well as the request to delete a calendar
 */
var Calendar = require('../models/Calendar'),
    Booking = require('../models/Booking'),
    Invitation = require('../models/Invitation');

/**Get all the existing calendars*/
exports.findAll = (req, res) => {
    Calendar.find({'userId': req.params._id})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};
/**Get a  specific  calendar*/
exports.add = (req, res) => {
    let calendarObj = new Calendar(req.body);
    calendarObj.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        });
};
/**add a calendar*/
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
/**delete a calendar*/
exports.delete = (req, res) => {
    Calendar.find({_id: req.body.calendarId}).remove()
        .then(calendar => {
            Invitation.find({invitedTo: req.body.calendarId}).remove()
                .then(invitation => {
                    Booking.find({calendarId: req.body.calendarId}).remove()
                        .then(booking => {
                            res.json(calendar);
                        })
                        .catch(err => {
                            res.status(500).json({
                                msg: err.message
                            })
                        });
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                });
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        });
};