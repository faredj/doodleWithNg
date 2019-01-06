let Invitation = require('../models/Invitation'),
    Calendar = require('../models/Calendar');

exports.invite = (req, res) => {
    Calendar.findOne({'_id': req.body.refToShare})
        .then(data => {
            if (data === null) {
                res.json({'msg': 'Réunion introuvable', success: false});
            } else if (data.userId == req.body.userId) {
                res.json({'msg': 'La réunion est déjà existant pour cet user', success: false});
            } else {
                Invitation.findOne({invitedTo: req.body.refToShare, invitedId: req.body.userId})
                    .then(data => {

                        if (data !== null) {
                            res.json({'msg': 'Vous éte déjà invité a cette réunion', success: false});
                        } else {
                            let invitationObj = new Invitation({
                                invitedId: req.body.userId,
                                invitedTo: req.body.refToShare
                            });
                            invitationObj.save()
                                .then(data => {
                                    res.json({...{invitation: data}, ...{success: true}});
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
