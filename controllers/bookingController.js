/**
 * @fileOverview this file contains the request to create/delete/findOne booking and find all bookings
 */

var Booking = require('../models/Booking');

/**
 * findAll bookings
 *
 * @name findAll
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} find data
 * */
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

/**
 * Add one booking
 *
 * @name add
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} added data
 * */
exports.add = (req, res) => {
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

/**
 * Find one booking
 *
 * @name findOne
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} find data
 * */
exports.findOne = (req, res) => {
    Booking.findOne({_id: req.params._id})
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
 * Delete a booking
 *
 * @name delete
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} deleted data
 * */
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