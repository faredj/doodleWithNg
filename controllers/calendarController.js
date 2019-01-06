/**
 * @fileOverview this file contains the request to create/delete/findOne calendar and find all calendars
 */
var Calendar = require('../models/Calendar'),
    Booking = require('../models/Booking'),
    Invitation = require('../models/Invitation');

/**
 * findAll calendars
 *
 * @name findAll
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} find data
 * */
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

/**
 * Add one calendar
 *
 * @name add
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} added data
 * */
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

/**
 * Find one calendar
 *
 * @name findOne
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} find data
 * */
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

/**
 * Delete a calendar
 *
 * @name delete
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} deleted data
 * */
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