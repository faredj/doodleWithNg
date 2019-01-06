/**
 * @fileOverview this file contains the request to create/delete/findOne invitation and find all invitations
 */

let Invitation = require('../models/Invitation'),
    Calendar = require('../models/Calendar'),
    User = require('../models/User');

/**
 * Invite a user to a calendar (meeting)
 *
 * @name invite
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} invitation data
 * */
exports.invite = (req, res) => {
    Calendar.findOne({'_id': req.body.refToShare})
        .then(calendar => {
            if (calendar === null) {
                res.json({'msg': 'Réunion introuvable', success: false});
            } else if (calendar.userId == req.body.userId) {
                res.json({'msg': 'La réunion est déjà existant pour cet user', success: false});
            } else {
                Invitation.findOne({invitedTo: req.body.refToShare, invitedId: req.body.userId})
                    .then(invitation => {

                        if (invitation !== null) {
                            res.json({'msg': 'Vous éte déjà invité à cette réunion', success: false});
                        } else {
                            let invitationObj = new Invitation({
                                invitedId: req.body.userId,
                                invitedTo: req.body.refToShare
                            });
                            invitationObj.save()
                                .then(invitation => {
                                    res.json({...{invitation: invitation}, ...{calendar: calendar}, ...{success: true}});
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        msg: err.message
                                    })
                                });
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            msg: err.message
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};

/**
 * find all calendars for an invitation
 *
 * @name findAllCalendars
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} find data
 * */
exports.findAllCalendars = (req, res) => {
    Invitation.find({invitedId: req.params.userId})
        .then(data => {
            let calendarsIds = data.map(i => i.invitedTo);
            Calendar.find({_id: {$in: [...calendarsIds]}})
                .then(data => {
                    res.json(data);
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};

/**
 * find all users for an invitation
 *
 * @name findAllUsers
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {JSON} find data
 * */
exports.findAllUsers = (req, res) => {
    Invitation.find({invitedTo: req.params.calendarId})
        .then(data => {
            Calendar.findOne({'_id': req.params.calendarId})
                .then(calendar => {
                    let usersIds = data.map(i => i.invitedId);
                    usersIds.push(calendar.userId);
                    User.find({_id: {$in: [...usersIds]}})
                        .then(data => {
                            res.json(data);
                        })
                        .catch(err => {
                            res.status(500).json({
                                msg: err.message
                            });
                        });
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};