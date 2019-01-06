var passport = require('passport');

module.exports = function (app) {
    const invitations = require('../controllers/invitationController');

    app.post('/api/invite', passport.authenticate('jwt', {session: false}), (req, res) => {
        invitations.invite(req, res);
    });
};