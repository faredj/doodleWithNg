module.exports = function(app) {

    app.get('/test', function(req, res, next) {
        console.log(req.user);
        console.log(req.isAuthenticated());
        res.send(JSON.stringify(req.session));
    });

};