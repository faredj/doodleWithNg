let Invitation = require('../models/Invitation'),
    Calendar = require('../models/Calendar'),
    User = require('../models/User');

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