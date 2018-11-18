var express = require('express');
var router = express.Router();

var authController = require('../controllers/authController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    authController.register(req, res);
});

module.exports = router;
